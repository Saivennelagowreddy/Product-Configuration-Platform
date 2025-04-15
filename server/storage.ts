import { users, type User, type InsertUser, productCategories, applicationTypes, products, type InsertProductCategory, type ProductCategory, type InsertApplicationType, type ApplicationType, type InsertProduct, type Product } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

// Interface with CRUD methods for all data types
export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Product category operations
  getProductCategories(): Promise<ProductCategory[]>;
  getProductCategory(id: number): Promise<ProductCategory | undefined>;
  createProductCategory(category: InsertProductCategory): Promise<ProductCategory>;
  
  // Application type operations
  getApplicationTypes(categoryId?: number): Promise<ApplicationType[]>;
  getApplicationType(id: number): Promise<ApplicationType | undefined>;
  createApplicationType(applicationType: InsertApplicationType): Promise<ApplicationType>;
  
  // Product operations
  getProducts(categoryId?: number): Promise<Product[]>;
  getProduct(id: number): Promise<Product | undefined>;
  createProduct(product: InsertProduct): Promise<Product>;
}

// DatabaseStorage implementation for when the database is available
export class DatabaseStorage implements IStorage {
  // User operations
  async getUser(id: number): Promise<User | undefined> {
    if (!db) return undefined;
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    if (!db) return undefined;
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    if (!db) throw new Error("Database not available");
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }
  
  // Product category operations
  async getProductCategories(): Promise<ProductCategory[]> {
    if (!db) return [];
    return await db.select().from(productCategories);
  }
  
  async getProductCategory(id: number): Promise<ProductCategory | undefined> {
    if (!db) return undefined;
    const [category] = await db.select().from(productCategories).where(eq(productCategories.id, id));
    return category;
  }
  
  async createProductCategory(category: InsertProductCategory): Promise<ProductCategory> {
    if (!db) throw new Error("Database not available");
    const [newCategory] = await db.insert(productCategories).values(category).returning();
    return newCategory;
  }
  
  // Application type operations
  async getApplicationTypes(categoryId?: number): Promise<ApplicationType[]> {
    if (!db) return [];
    if (categoryId) {
      return await db.select().from(applicationTypes).where(eq(applicationTypes.categoryId, categoryId));
    }
    return await db.select().from(applicationTypes);
  }
  
  async getApplicationType(id: number): Promise<ApplicationType | undefined> {
    if (!db) return undefined;
    const [applicationType] = await db.select().from(applicationTypes).where(eq(applicationTypes.id, id));
    return applicationType;
  }
  
  async createApplicationType(applicationType: InsertApplicationType): Promise<ApplicationType> {
    if (!db) throw new Error("Database not available");
    const [newApplicationType] = await db.insert(applicationTypes).values(applicationType).returning();
    return newApplicationType;
  }
  
  // Product operations
  async getProducts(categoryId?: number): Promise<Product[]> {
    if (!db) return [];
    if (categoryId) {
      return await db.select().from(products).where(eq(products.categoryId, categoryId));
    }
    return await db.select().from(products);
  }
  
  async getProduct(id: number): Promise<Product | undefined> {
    if (!db) return undefined;
    const [product] = await db.select().from(products).where(eq(products.id, id));
    return product;
  }
  
  async createProduct(product: InsertProduct): Promise<Product> {
    if (!db) throw new Error("Database not available");
    const [newProduct] = await db.insert(products).values(product).returning();
    return newProduct;
  }
}

// MemStorage for fallback when database is not available
export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private categories: Map<number, ProductCategory>;
  private applicationTypes: Map<number, ApplicationType>;
  private productItems: Map<number, Product>;
  private currentIds: {
    users: number;
    categories: number;
    applicationTypes: number;
    products: number;
  };

  constructor() {
    this.users = new Map();
    this.categories = new Map();
    this.applicationTypes = new Map();
    this.productItems = new Map();
    this.currentIds = {
      users: 1,
      categories: 1,
      applicationTypes: 1,
      products: 1
    };
    
    // Initialize with sample data
    this.initializeSampleData();
  }
  
  // User operations
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentIds.users++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  // Product category operations
  async getProductCategories(): Promise<ProductCategory[]> {
    return Array.from(this.categories.values());
  }
  
  async getProductCategory(id: number): Promise<ProductCategory | undefined> {
    return this.categories.get(id);
  }
  
  async createProductCategory(category: InsertProductCategory): Promise<ProductCategory> {
    const id = this.currentIds.categories++;
    const newCategory: ProductCategory = { ...category, id };
    this.categories.set(id, newCategory);
    return newCategory;
  }
  
  // Application type operations
  async getApplicationTypes(categoryId?: number): Promise<ApplicationType[]> {
    if (categoryId) {
      return Array.from(this.applicationTypes.values()).filter(type => type.categoryId === categoryId);
    }
    return Array.from(this.applicationTypes.values());
  }
  
  async getApplicationType(id: number): Promise<ApplicationType | undefined> {
    return this.applicationTypes.get(id);
  }
  
  async createApplicationType(applicationType: InsertApplicationType): Promise<ApplicationType> {
    const id = this.currentIds.applicationTypes++;
    const newType: ApplicationType = { ...applicationType, id };
    this.applicationTypes.set(id, newType);
    return newType;
  }
  
  // Product operations
  async getProducts(categoryId?: number): Promise<Product[]> {
    if (categoryId) {
      return Array.from(this.productItems.values()).filter(product => product.categoryId === categoryId);
    }
    return Array.from(this.productItems.values());
  }
  
  async getProduct(id: number): Promise<Product | undefined> {
    return this.productItems.get(id);
  }
  
  async createProduct(product: InsertProduct): Promise<Product> {
    const id = this.currentIds.products++;
    const newProduct: Product = { ...product, id };
    this.productItems.set(id, newProduct);
    return newProduct;
  }
  
  // Initialize with sample data
  private initializeSampleData() {
    // Add product categories
    const categories = [
      { id: 1, name: "Industrial Pumps", description: "Heavy-duty pumps for various industrial applications" },
      { id: 2, name: "Hydraulic Systems", description: "High-pressure fluid power transmission systems" },
      { id: 3, name: "Pneumatic Controls", description: "Compressed air-based control systems" },
      { id: 4, name: "Compressors", description: "Air and gas compression equipment" }
    ];
    
    categories.forEach(category => {
      this.categories.set(category.id, category);
      this.currentIds.categories = Math.max(this.currentIds.categories, category.id + 1);
    });
    
    // Add application types
    const appTypes = [
      { id: 1, categoryId: 1, name: "Water Treatment", description: "Municipal and industrial water processing" },
      { id: 2, categoryId: 1, name: "Chemical Processing", description: "Handling corrosive substances" },
      { id: 3, categoryId: 1, name: "Oil & Gas", description: "Extraction and refinery processes" },
      { id: 4, categoryId: 1, name: "Food & Beverage", description: "Sanitary processing requirements" },
      { id: 5, categoryId: 2, name: "Manufacturing", description: "Assembly and production lines" },
      { id: 6, categoryId: 2, name: "Mobile Equipment", description: "Construction and agricultural machinery" },
      { id: 7, categoryId: 2, name: "Marine Applications", description: "Offshore and shipping equipment" },
      { id: 8, categoryId: 2, name: "Metal Forming", description: "Presses and industrial processing" },
      { id: 9, categoryId: 3, name: "Automation", description: "Robotic and automated systems" },
      { id: 10, categoryId: 3, name: "Instrumentation", description: "Precision control systems" },
      { id: 11, categoryId: 3, name: "Material Handling", description: "Conveying and sorting systems" },
      { id: 12, categoryId: 3, name: "Safety Systems", description: "Emergency shutdown and control" },
      { id: 13, categoryId: 4, name: "HVAC", description: "Heating, ventilation, and air conditioning" },
      { id: 14, categoryId: 4, name: "Refrigeration", description: "Commercial and industrial cooling" },
      { id: 15, categoryId: 4, name: "Industrial Processes", description: "Manufacturing and processing plants" },
      { id: 16, categoryId: 4, name: "Energy Production", description: "Power generation applications" }
    ];
    
    appTypes.forEach(type => {
      this.applicationTypes.set(type.id, type);
      this.currentIds.applicationTypes = Math.max(this.currentIds.applicationTypes, type.id + 1);
    });
  }
}

// Check if database is available and use DatabaseStorage, otherwise fall back to MemStorage
import { checkDatabaseConnection } from "./db";

// Initialize with MemStorage as fallback
export let storage: IStorage = new MemStorage();

// Try to connect to database and switch to DatabaseStorage if available
checkDatabaseConnection().then(isConnected => {
  if (isConnected) {
    console.log("Using database storage");
    storage = new DatabaseStorage();
  } else {
    console.log("Using in-memory storage");
  }
});
