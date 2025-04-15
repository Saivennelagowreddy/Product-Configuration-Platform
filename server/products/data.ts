import { ProductCategory, ApplicationType } from "@shared/schema";

/**
 * Sample product categories
 */
export const productCategories: ProductCategory[] = [
  {
    id: 1,
    name: "Industrial Pumps",
    description: "Heavy-duty pumps for various industrial applications"
  },
  {
    id: 2,
    name: "Hydraulic Systems",
    description: "High-pressure fluid power transmission systems"
  },
  {
    id: 3,
    name: "Pneumatic Controls",
    description: "Compressed air-based control systems"
  },
  {
    id: 4,
    name: "Compressors",
    description: "Air and gas compression equipment"
  }
];

/**
 * Sample application types
 */
export const applicationTypes: ApplicationType[] = [
  {
    id: 1,
    categoryId: 1,
    name: "Water Treatment",
    description: "Municipal and industrial water processing"
  },
  {
    id: 2,
    categoryId: 1,
    name: "Chemical Processing",
    description: "Handling corrosive substances"
  },
  {
    id: 3,
    categoryId: 1,
    name: "Oil & Gas",
    description: "Extraction and refinery processes"
  },
  {
    id: 4,
    categoryId: 1,
    name: "Food & Beverage",
    description: "Sanitary processing requirements"
  },
  {
    id: 5,
    categoryId: 2,
    name: "Manufacturing",
    description: "Assembly and production lines"
  },
  {
    id: 6,
    categoryId: 2,
    name: "Mobile Equipment",
    description: "Construction and agricultural machinery"
  },
  {
    id: 7,
    categoryId: 2,
    name: "Marine Applications",
    description: "Offshore and shipping equipment"
  },
  {
    id: 8,
    categoryId: 2,
    name: "Metal Forming",
    description: "Presses and industrial processing"
  },
  {
    id: 9,
    categoryId: 3,
    name: "Automation",
    description: "Robotic and automated systems"
  },
  {
    id: 10,
    categoryId: 3,
    name: "Instrumentation",
    description: "Precision control systems"
  },
  {
    id: 11,
    categoryId: 3,
    name: "Material Handling",
    description: "Conveying and sorting systems"
  },
  {
    id: 12,
    categoryId: 3,
    name: "Safety Systems",
    description: "Emergency shutdown and control"
  },
  {
    id: 13,
    categoryId: 4,
    name: "HVAC",
    description: "Heating, ventilation, and air conditioning"
  },
  {
    id: 14,
    categoryId: 4,
    name: "Refrigeration",
    description: "Commercial and industrial cooling"
  },
  {
    id: 15,
    categoryId: 4,
    name: "Industrial Processes",
    description: "Manufacturing and processing plants"
  },
  {
    id: 16,
    categoryId: 4,
    name: "Energy Production",
    description: "Power generation applications"
  }
];

/**
 * Sample product data
 */
export const productData = [
  {
    id: 1,
    categoryId: 1,
    name: "IP-X240",
    series: "Standard Series",
    description: "General-purpose industrial pump for water treatment applications",
    minFlowRate: 100,
    maxFlowRate: 200,
    minPressure: 2,
    maxPressure: 8,
    minTemperature: -10,
    maxTemperature: 90,
    efficiency: 78,
    powerConsumption: 7.2,
    noiseLevel: 72,
    price: 12450,
    maintenanceInterval: 8,
    estimatedLifetime: 15,
    specifications: {
      impellerType: "Closed",
      material: "Stainless Steel 316",
      connectionSize: "DN80",
      certifications: ["ISO 9001", "CE"],
      motorPower: 7.5,
      voltage: 380,
      ipRating: "IP55"
    }
  },
  {
    id: 2,
    categoryId: 1,
    name: "IP-X350 Pro",
    series: "Premium Series",
    description: "High-performance industrial pump for demanding applications",
    minFlowRate: 150,
    maxFlowRate: 300,
    minPressure: 2,
    maxPressure: 10,
    minTemperature: -15,
    maxTemperature: 110,
    efficiency: 83,
    powerConsumption: 8.1,
    noiseLevel: 69,
    price: 15980,
    maintenanceInterval: 10,
    estimatedLifetime: 18,
    specifications: {
      impellerType: "Semi-open",
      material: "Duplex Stainless Steel",
      connectionSize: "DN100",
      certifications: ["ISO 9001", "CE", "ATEX"],
      motorPower: 9.0,
      voltage: 380,
      ipRating: "IP66"
    }
  },
  {
    id: 3,
    categoryId: 1,
    name: "IP-X180 Eco",
    series: "Economy Series",
    description: "Cost-effective industrial pump for standard applications",
    minFlowRate: 75,
    maxFlowRate: 150,
    minPressure: 1.5,
    maxPressure: 6,
    minTemperature: 0,
    maxTemperature: 80,
    efficiency: 72,
    powerConsumption: 6.5,
    noiseLevel: 74,
    price: 9850,
    maintenanceInterval: 6,
    estimatedLifetime: 12,
    specifications: {
      impellerType: "Closed",
      material: "Cast Iron",
      connectionSize: "DN65",
      certifications: ["ISO 9001", "CE"],
      motorPower: 5.5,
      voltage: 380,
      ipRating: "IP54"
    }
  },
  {
    id: 4,
    categoryId: 1,
    name: "IP-X450 Ultra",
    series: "Ultra Series",
    description: "Ultra-high performance industrial pump for critical applications",
    minFlowRate: 200,
    maxFlowRate: 400,
    minPressure: 3,
    maxPressure: 12,
    minTemperature: -20,
    maxTemperature: 150,
    efficiency: 87,
    powerConsumption: 9.6,
    noiseLevel: 71,
    price: 21500,
    maintenanceInterval: 12,
    estimatedLifetime: 20,
    specifications: {
      impellerType: "Semi-open",
      material: "Super Duplex Stainless Steel",
      connectionSize: "DN125",
      certifications: ["ISO 9001", "CE", "ATEX", "API 610"],
      motorPower: 11.0,
      voltage: 380,
      ipRating: "IP67"
    }
  },
  {
    id: 5,
    categoryId: 1,
    name: "IP-X120 Mini",
    series: "Compact Series",
    description: "Compact industrial pump for space-constrained applications",
    minFlowRate: 40,
    maxFlowRate: 120,
    minPressure: 1,
    maxPressure: 5,
    minTemperature: 0,
    maxTemperature: 70,
    efficiency: 69,
    powerConsumption: 4.8,
    noiseLevel: 68,
    price: 7650,
    maintenanceInterval: 6,
    estimatedLifetime: 10,
    specifications: {
      impellerType: "Closed",
      material: "Stainless Steel 304",
      connectionSize: "DN50",
      certifications: ["ISO 9001", "CE"],
      motorPower: 4.0,
      voltage: 220,
      ipRating: "IP54"
    }
  },
  {
    id: 6,
    categoryId: 1,
    name: "IP-X280 Chem",
    series: "Chemical Series",
    description: "Specialized industrial pump for chemical processing",
    minFlowRate: 100,
    maxFlowRate: 250,
    minPressure: 2,
    maxPressure: 9,
    minTemperature: -15,
    maxTemperature: 120,
    efficiency: 76,
    powerConsumption: 7.8,
    noiseLevel: 73,
    price: 14250,
    maintenanceInterval: 7,
    estimatedLifetime: 14,
    specifications: {
      impellerType: "Closed",
      material: "Hastelloy C",
      connectionSize: "DN80",
      certifications: ["ISO 9001", "CE", "ATEX"],
      motorPower: 7.5,
      voltage: 380,
      ipRating: "IP65"
    }
  },
  {
    id: 7,
    categoryId: 2,
    name: "HS-200",
    series: "Standard Series",
    description: "Standard hydraulic system for industrial applications",
    minFlowRate: 80,
    maxFlowRate: 180,
    minPressure: 150,
    maxPressure: 250,
    minTemperature: -10,
    maxTemperature: 80,
    efficiency: 75,
    powerConsumption: 15.0,
    noiseLevel: 78,
    price: 18500,
    maintenanceInterval: 6,
    estimatedLifetime: 12,
    specifications: {
      pumpType: "Piston",
      tankCapacity: 100,
      material: "Steel",
      filterRating: "10 micron",
      certifications: ["ISO 9001", "CE"],
      motorPower: 15.0,
      voltage: 380,
      ipRating: "IP54"
    }
  },
  {
    id: 8,
    categoryId: 3,
    name: "PC-150",
    series: "Standard Series",
    description: "Standard pneumatic control system for automation",
    minFlowRate: 150,
    maxFlowRate: 300,
    minPressure: 4,
    maxPressure: 8,
    minTemperature: 0,
    maxTemperature: 60,
    efficiency: 72,
    powerConsumption: 5.5,
    noiseLevel: 70,
    price: 9800,
    maintenanceInterval: 8,
    estimatedLifetime: 14,
    specifications: {
      valveType: "Directional",
      material: "Aluminum",
      connectionSize: "G1/2",
      certifications: ["ISO 9001", "CE"],
      airConsumption: 350,
      voltage: 24,
      ipRating: "IP54"
    }
  },
  {
    id: 9,
    categoryId: 4,
    name: "CP-250",
    series: "Standard Series",
    description: "Standard compressor for industrial applications",
    minFlowRate: 200,
    maxFlowRate: 400,
    minPressure: 6,
    maxPressure: 10,
    minTemperature: 0,
    maxTemperature: 40,
    efficiency: 76,
    powerConsumption: 22.0,
    noiseLevel: 82,
    price: 15600,
    maintenanceInterval: 9,
    estimatedLifetime: 15,
    specifications: {
      compressorType: "Screw",
      tankCapacity: 500,
      material: "Steel",
      airQuality: "Class 2",
      certifications: ["ISO 9001", "CE"],
      motorPower: 22.0,
      voltage: 380,
      ipRating: "IP54"
    }
  }
];
