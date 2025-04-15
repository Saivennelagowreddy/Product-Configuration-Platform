import React, { useState } from 'react';
import ProductConfigurator from '@/components/ProductConfigurator';
import { useProductConfiguration } from '@/hooks/useProductConfiguration';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Skeleton } from '@/components/ui/skeleton';
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const ComparePage: React.FC = () => {
  const { performanceMetrics, isCalculating } = useProductConfiguration();
  const [selectedProducts, setSelectedProducts] = useState<number[]>([]);

  const handleProductToggle = (productId: number) => {
    setSelectedProducts(prev => 
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  // Generate radar chart data for product comparison
  const generateRadarData = () => {
    if (!performanceMetrics?.alternativeProducts) return [];
    
    // Define metrics for radar chart
    const metrics = [
      { name: 'Efficiency', key: 'efficiency', fullMark: 100 },
      { name: 'Flow Rate', key: 'flowRate', fullMark: 200 },
      { name: 'Power Efficiency', key: 'powerEfficiency', fullMark: 100 },
      { name: 'Cost Efficiency', key: 'costEfficiency', fullMark: 100 },
      { name: 'Maintenance', key: 'maintenance', fullMark: 100 },
      { name: 'Noise Level', key: 'noiseEfficiency', fullMark: 100 },
    ];
    
    // Calculate derived metrics
    const products = performanceMetrics.alternativeProducts.map(product => {
      // Normalize flow rate to 0-100 scale
      const normalizedFlowRate = Math.min(100, (product.flowRate / 500) * 100);
      
      // Calculate power efficiency (inverse of power consumption)
      const powerEfficiency = Math.max(10, 100 - (product.powerConsumption / 10) * 100);
      
      // Calculate cost efficiency (inverse of price)
      const maxPrice = Math.max(...performanceMetrics.alternativeProducts.map(p => p.price));
      const costEfficiency = 100 - ((product.price / maxPrice) * 100);
      
      // Maintenance score - derived from maintenance interval
      const maintenance = performanceMetrics.maintenanceInterval <= 6 ? 60 : 90;
      
      // Noise efficiency (inverse of noise level)
      const noiseEfficiency = 100 - (performanceMetrics.noiseLevel / 100) * 100;
      
      return {
        ...product,
        normalizedFlowRate,
        powerEfficiency,
        costEfficiency,
        maintenance,
        noiseEfficiency
      };
    });
    
    // Format data for radar chart
    return metrics.map(metric => {
      const entry: any = { metric: metric.name };
      
      products.forEach(product => {
        let value = 0;
        
        // Map the appropriate value based on metric key
        switch(metric.key) {
          case 'efficiency':
            value = product.efficiency;
            break;
          case 'flowRate':
            value = product.normalizedFlowRate;
            break;
          case 'powerEfficiency':
            value = product.powerEfficiency;
            break;
          case 'costEfficiency':
            value = product.costEfficiency;
            break;
          case 'maintenance':
            value = product.maintenance;
            break;
          case 'noiseEfficiency':
            value = product.noiseEfficiency;
            break;
        }
        
        entry[product.name] = value;
      });
      
      return entry;
    });
  };

  const radarData = generateRadarData();
  const availableProducts = performanceMetrics?.alternativeProducts || [];
  const filteredProducts = availableProducts.filter(
    product => product.isSelected || selectedProducts.includes(product.id)
  );

  // Generate feature comparison table data
  const featureComparisonData = [
    { feature: 'Maximum Flow Rate', unit: 'm³/h' },
    { feature: 'Maximum Pressure', unit: 'bar' },
    { feature: 'Temperature Range', unit: '°C' },
    { feature: 'Material', unit: '' },
    { feature: 'Efficiency Rating', unit: '%' },
    { feature: 'Power Consumption', unit: 'kW' },
    { feature: 'Noise Level', unit: 'dB' },
    { feature: 'Maintenance Interval', unit: 'months' },
    { feature: 'Warranty', unit: 'years' },
    { feature: 'Price', unit: '$' }
  ];

  return (
    <ProductConfigurator
      title="Step 4: Product Comparison"
      description="Compare different product models side by side"
    >
      {isCalculating || !performanceMetrics ? (
        <div className="space-y-6">
          <Skeleton className="h-[300px] w-full rounded-lg" />
          <Skeleton className="h-[200px] w-full rounded-lg" />
        </div>
      ) : (
        <>
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Product Selection</CardTitle>
              <CardDescription>
                Select products to compare with your current selection
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-4">
                {availableProducts.map(product => {
                  // Always show the selected product but make it disabled
                  const isSelected = product.isSelected;
                  return (
                    <div key={product.id} className="flex items-start space-x-2">
                      <Checkbox 
                        id={`product-${product.id}`} 
                        checked={isSelected || selectedProducts.includes(product.id)}
                        disabled={isSelected}
                        onCheckedChange={() => handleProductToggle(product.id)}
                      />
                      <div className="grid gap-1.5 leading-none">
                        <Label
                          htmlFor={`product-${product.id}`}
                          className={isSelected ? "font-medium text-primary" : ""}
                        >
                          {product.name} {isSelected && "(Selected)"}
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          {product.series} - ${product.price.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Performance Comparison</CardTitle>
              <CardDescription>
                Radar chart showing relative strengths of each product
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart outerRadius="80%" data={radarData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="metric" />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} />
                    
                    {filteredProducts.map((product, index) => (
                      <Radar
                        key={product.id}
                        name={product.isSelected ? `${product.name} (Selected)` : product.name}
                        dataKey={product.name}
                        stroke={product.isSelected ? "#3B82F6" : ["#10B981", "#8B5CF6", "#F59E0B"][index % 3]}
                        fill={product.isSelected ? "#3B82F6" : ["#10B981", "#8B5CF6", "#F59E0B"][index % 3]}
                        fillOpacity={0.2}
                      />
                    ))}
                    
                    <Legend />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Feature Comparison</CardTitle>
              <CardDescription>
                Detailed comparison of technical specifications and features
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Feature
                      </th>
                      {filteredProducts.map(product => (
                        <th key={product.id} scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {product.name} {product.isSelected && "(Selected)"}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {featureComparisonData.map((row, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {row.feature} {row.unit && <span className="text-gray-500">({row.unit})</span>}
                        </td>
                        
                        {filteredProducts.map(product => {
                          // Generate feature values based on the product and feature
                          let value = "";
                          
                          switch (row.feature) {
                            case 'Maximum Flow Rate':
                              value = `${product.flowRate * 1.2}`;
                              break;
                            case 'Maximum Pressure':
                              value = `${(Math.random() * 5 + 8).toFixed(1)}`;
                              break;
                            case 'Temperature Range':
                              value = `-20 to 120`;
                              break;
                            case 'Material':
                              value = ['Stainless Steel', 'Cast Iron', 'Aluminum'][index % 3];
                              break;
                            case 'Efficiency Rating':
                              value = `${product.efficiency}`;
                              break;
                            case 'Power Consumption':
                              value = `${product.powerConsumption}`;
                              break;
                            case 'Noise Level':
                              value = `${performanceMetrics.noiseLevel}`;
                              break;
                            case 'Maintenance Interval':
                              value = `${performanceMetrics.maintenanceInterval}`;
                              break;
                            case 'Warranty':
                              value = `${Math.floor(Math.random() * 3) + 2}`;
                              break;
                            case 'Price':
                              value = product.price.toLocaleString();
                              break;
                          }
                          
                          return (
                            <td 
                              key={`${product.id}-${index}`} 
                              className={`px-6 py-4 whitespace-nowrap text-sm text-gray-500 ${product.isSelected ? 'font-medium text-primary' : ''}`}
                            >
                              {value}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </ProductConfigurator>
  );
};

export default ComparePage;
