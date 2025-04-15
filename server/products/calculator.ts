import { ProductConfiguration } from "@shared/schema";

/**
 * Calculate efficiency percentage based on configuration
 * @param config Product configuration parameters
 * @returns Efficiency percentage (0-100)
 */
export function calculateEfficiency(config: ProductConfiguration): number {
  // Base efficiency
  let efficiency = 75;
  
  // Adjust based on flow rate
  if (config.flowRate < 100) {
    // Smaller flow rates are less efficient
    efficiency -= 5 * (1 - config.flowRate / 100);
  } else if (config.flowRate > 300) {
    // Very high flow rates reduce efficiency
    efficiency -= 5 * ((config.flowRate - 300) / 200);
  } else {
    // Optimal flow rate range
    efficiency += 5 * (1 - Math.abs(config.flowRate - 200) / 100);
  }
  
  // Adjust based on pressure
  if (config.pressure < 3) {
    // Low pressure is less efficient
    efficiency -= 3;
  } else if (config.pressure > 7) {
    // Very high pressure reduces efficiency
    efficiency -= (config.pressure - 7) * 2;
  } else {
    // Optimal pressure range
    efficiency += 3 * (1 - Math.abs(config.pressure - 5) / 2);
  }
  
  // Adjust based on temperature
  if (config.temperature < 0 || config.temperature > 90) {
    // Extreme temperatures reduce efficiency
    efficiency -= 5;
  } else if (config.temperature < 15 || config.temperature > 60) {
    // Sub-optimal temperature range
    efficiency -= 2;
  }
  
  // Adjust based on application type
  // Different applications have different optimal configurations
  switch (config.applicationType) {
    case 1: // Water Treatment
      efficiency += 3; // Generally more efficient
      break;
    case 2: // Chemical Processing
      efficiency -= 2; // More challenging requirements
      break;
    case 3: // Oil & Gas
      // No adjustment
      break;
    case 4: // Food & Beverage
      efficiency += 1; // Slightly more efficient
      break;
  }
  
  // Ensure efficiency is within realistic bounds
  return Math.max(60, Math.min(90, Math.round(efficiency)));
}

/**
 * Calculate power consumption based on configuration
 * @param config Product configuration parameters
 * @returns Power consumption in kW
 */
export function calculatePower(config: ProductConfiguration): number {
  // Base formula: Power is proportional to flow rate and pressure
  // P = k * Q * H, where k is a coefficient, Q is flow rate, H is pressure
  const k = 0.00272; // Coefficient for unit conversion
  
  // Apply efficiency factor
  const efficiency = calculateEfficiency(config) / 100;
  
  // Calculate raw power
  let power = k * config.flowRate * config.pressure / efficiency;
  
  // Add adjustments for temperature
  if (config.temperature < 0 || config.temperature > 80) {
    // Extreme temperatures increase power needs
    power *= 1.15;
  }
  
  // Round to 1 decimal place for readability
  return parseFloat(power.toFixed(1));
}

/**
 * Calculate noise level based on configuration
 * @param config Product configuration parameters
 * @returns Noise level in dB
 */
export function calculateNoise(config: ProductConfiguration): number {
  // Base noise level
  let noise = 65; // dB
  
  // Flow rate affects noise
  noise += (config.flowRate / 50) * 2;
  
  // Higher pressure means more noise
  noise += config.pressure * 1.5;
  
  // Adjust based on application type
  switch (config.applicationType) {
    case 1: // Water Treatment
      noise -= 2; // Generally quieter
      break;
    case 2: // Chemical Processing
      noise += 3; // Usually louder
      break;
    case 3: // Oil & Gas
      noise += 5; // Typically louder
      break;
    case 4: // Food & Beverage
      // No adjustment
      break;
  }
  
  // Ensure noise level is within realistic bounds
  return Math.max(50, Math.min(95, Math.round(noise)));
}

/**
 * Calculate performance percentage at a specific load
 * @param config Product configuration
 * @param loadPercentage Load percentage (e.g., 50 for 50%)
 * @returns Performance percentage
 */
export function calculateProductPerformance(config: ProductConfiguration, loadPercentage: number): number {
  // Base efficiency at optimal load
  const baseEfficiency = calculateEfficiency(config);
  
  // Performance curve - typically pumps and similar equipment have peak efficiency
  // around 70-80% of their full load and drop off at very low or very high loads
  let performanceFactor;
  
  if (loadPercentage < 50) {
    // Reduced performance at low loads
    performanceFactor = 0.7 + (loadPercentage / 50) * 0.3;
  } else if (loadPercentage <= 90) {
    // Peak performance range
    performanceFactor = 1.0;
  } else {
    // Reduced performance at very high loads
    performanceFactor = 1.0 - ((loadPercentage - 90) / 35) * 0.2;
  }
  
  // Calculate actual performance
  let performance = baseEfficiency * performanceFactor;
  
  // Add some application-specific factors
  if (config.applicationType === 2 && loadPercentage > 100) {
    // Chemical processing performs worse at very high loads
    performance *= 0.9;
  }
  
  if (config.applicationType === 3 && loadPercentage < 40) {
    // Oil & Gas performs worse at very low loads
    performance *= 0.92;
  }
  
  // Ensure performance is within realistic bounds
  return Math.max(30, Math.min(95, Math.round(performance)));
}
