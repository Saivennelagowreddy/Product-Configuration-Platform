import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  getProductCategories, 
  getApplicationTypes,
  calculatePerformanceMetrics
} from "./products/service";
import { ProductConfiguration, productConfigurationSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes for product configuration
  
  // Get all product categories
  app.get("/api/product-categories", async (_req, res) => {
    try {
      const categories = await getProductCategories();
      res.json(categories);
    } catch (error) {
      res.status(500).json({ 
        message: "Failed to fetch product categories", 
        error: (error as Error).message 
      });
    }
  });

  // Get application types for a specific product category
  app.get("/api/application-types/:categoryId?", async (req, res) => {
    try {
      const categoryId = req.params.categoryId ? parseInt(req.params.categoryId) : undefined;
      const applicationTypes = await getApplicationTypes(categoryId);
      res.json(applicationTypes);
    } catch (error) {
      res.status(500).json({ 
        message: "Failed to fetch application types", 
        error: (error as Error).message 
      });
    }
  });

  // Calculate performance metrics based on product configuration
  app.post("/api/products/calculate", async (req, res) => {
    try {
      // Validate the request body
      const result = productConfigurationSchema.safeParse(req.body);
      
      if (!result.success) {
        return res.status(400).json({ 
          message: "Invalid product configuration", 
          errors: result.error.errors 
        });
      }

      const config = result.data as ProductConfiguration;
      const performanceMetrics = await calculatePerformanceMetrics(config);
      
      res.json(performanceMetrics);
    } catch (error) {
      res.status(500).json({ 
        message: "Failed to calculate performance metrics", 
        error: (error as Error).message 
      });
    }
  });

  // User routes (preserved from original)
  app.post("/api/users", async (req, res) => {
    try {
      const user = await storage.createUser(req.body);
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ 
        message: "Failed to create user", 
        error: (error as Error).message 
      });
    }
  });

  app.get("/api/users/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const user = await storage.getUser(id);
      
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      
      res.json(user);
    } catch (error) {
      res.status(500).json({ 
        message: "Failed to fetch user", 
        error: (error as Error).message 
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
