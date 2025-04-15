import {
  ProductCategory,
  ApplicationType,
  ProductConfiguration,
  PerformanceMetrics
} from "@shared/schema";
import { 
  productCategories, 
  applicationTypes, 
  productData 
} from "./data";
import { calculateEfficiency, calculatePower, calculateNoise, calculateProductPerformance } from "./calculator";

/**
 * Get all available product categories
 */
export async function getProductCategories(): Promise<ProductCategory[]> {
  // In a real app, this would fetch from database
  return productCategories;
}

/**
 * Get application types, optionally filtered by category
 */
export async function getApplicationTypes(categoryId?: number): Promise<ApplicationType[]> {
  // In a real app, this would fetch from database with a filter
  if (categoryId) {
    return applicationTypes.filter(type => type.categoryId === categoryId);
  }
  return applicationTypes;
}

/**
 * Calculate performance metrics based on product configuration
 */
export async function calculatePerformanceMetrics(config: ProductConfiguration): Promise<PerformanceMetrics> {
  // Calculate core performance metrics
  const efficiency = calculateEfficiency(config);
  const powerConsumption = calculatePower(config);
  const noiseLevel = calculateNoise(config);
  
  // Calculate derived metrics
  const maintenanceInterval = calculateMaintenanceInterval(config, efficiency);
  const estimatedLifetime = calculateEstimatedLifetime(efficiency);
  const comparedToAverage = efficiency - 73; // 73% is our baseline "average" efficiency
  
  // Generate performance by load data points
  const performanceByLoad = generatePerformanceByLoad(config);
  
  // Get alternative products including the current selection
  const alternativeProducts = getAlternativeProducts(config);
  
  // Status indicators
  const isWithinTargetPower = powerConsumption < 8.5; // Within target if < 8.5 kW
  const isExceedsLifetime = estimatedLifetime >= 15; // Exceeds if 15+ years
  const isAboveTargetNoise = noiseLevel > 75; // Above target if > 75 dB
  const isExtendedMaintenance = maintenanceInterval >= 8; // Extended if 8+ months

  return {
    efficiency,
    powerConsumption,
    noiseLevel,
    maintenanceInterval,
    estimatedLifetime,
    performanceByLoad,
    alternativeProducts,
    isWithinTargetPower,
    isExceedsLifetime,
    isAboveTargetNoise,
    isExtendedMaintenance,
    comparedToAverage
  };
}

/**
 * Calculate maintenance interval based on configuration and efficiency
 */
function calculateMaintenanceInterval(config: ProductConfiguration, efficiency: number): number {
  // Base maintenance interval
  let interval = 6;
  
  // Adjust based on efficiency
  if (efficiency > 80) {
    interval += 2;
  } else if (efficiency < 70) {
    interval -= 1;
  }
  
  // Adjust based on application type (some applications are more demanding)
  if (config.applicationType === 2) { // Chemical processing
    interval -= 1;
  } else if (config.applicationType === 4) { // Food & Beverage
    interval += 1;
  }
  
  // Ensure interval is within reasonable bounds
  return Math.max(3, Math.min(12, interval));
}

/**
 * Calculate estimated lifetime based on efficiency
 */
function calculateEstimatedLifetime(efficiency: number): number {
  // Base lifetime in years
  let lifetime = 10;
  
  // Adjust based on efficiency
  if (efficiency >= 85) {
    lifetime += 8;
  } else if (efficiency >= 75) {
    lifetime += 5;
  } else if (efficiency < 70) {
    lifetime -= 2;
  }
  
  return Math.max(5, lifetime);
}

/**
 * Generate performance data at different load percentages
 */
function generatePerformanceByLoad(config: ProductConfiguration): { load: number, performance: number }[] {
  const loadPercentages = [25, 50, 75, 100, 125];
  
  return loadPercentages.map(load => {
    // Calculate performance at this load percentage
    let performance = calculateProductPerformance(config, load);
    
    // Ensure performance is within bounds
    performance = Math.max(30, Math.min(95, performance));
    
    return { load, performance };
  });
}

/**
 * Get alternative products based on configuration
 */
function getAlternativeProducts(config: ProductConfiguration): any[] {
  // In a real app, this would query the database for similar products
  // For now, we'll use the sample data and filter based on the config
  
  // Get products that match the category and are suitable for the flow rate
  const filteredProducts = productData.filter(product => 
    product.categoryId === config.categoryId &&
    product.minFlowRate <= config.flowRate &&
    product.maxFlowRate >= config.flowRate
  );
  
  // If we don't have enough matches, add some from the sample data
  const products = filteredProducts.length >= 3 ? 
    filteredProducts.slice(0, 3) : 
    [...filteredProducts, ...productData.slice(0, 3 - filteredProducts.length)];
  
  // Format the products for the frontend
  return products.map((product, index) => {
    // The first product is the current selection by default
    const isSelected = index === 0;
    
    // Calculate actual power consumption and efficiency for this product
    const efficiency = product.efficiency || 
      calculateEfficiency({ ...config, flowRate: product.maxFlowRate * 0.8 });
    
    const powerConsumption = product.powerConsumption || 
      calculatePower({ ...config, flowRate: product.maxFlowRate * 0.8 });
    
    return {
      id: product.id,
      name: product.name,
      series: product.series,
      efficiency: Math.round(efficiency),
      powerConsumption: Number(powerConsumption.toFixed(1)),
      flowRate: product.maxFlowRate * 0.8,
      price: product.price,
      isSelected
    };
  });
}
