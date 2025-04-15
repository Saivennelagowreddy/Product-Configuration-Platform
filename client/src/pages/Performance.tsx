import React from 'react';
import ProductConfigurator from '@/components/ProductConfigurator';
import { useProductConfiguration } from '@/hooks/useProductConfiguration';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Skeleton } from '@/components/ui/skeleton';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const PerformancePage: React.FC = () => {
  const { config, performanceMetrics, isCalculating } = useProductConfiguration();

  // Generate simulated performance data for charts
  const generatePerformanceData = () => {
    if (!performanceMetrics) return [];
    
    // Create simulated data points based on configuration
    const points = [];
    const baseEfficiency = performanceMetrics.efficiency;
    
    for (let i = 1; i <= 12; i++) {
      const variation = Math.sin(i * 0.5) * 5;
      points.push({
        month: i,
        efficiency: Math.max(0, Math.min(100, baseEfficiency + variation)),
        powerUsage: Math.max(0, performanceMetrics.powerConsumption * (1 + Math.sin(i * 0.4) * 0.2)),
        maintenance: i % 3 === 0 ? performanceMetrics.maintenanceInterval : 0,
      });
    }
    
    return points;
  };

  // Generate comparison data for selected vs alternatives
  const generateComparisonData = () => {
    if (!performanceMetrics?.alternativeProducts) return [];
    
    const comparisonMetrics = [
      { name: 'Efficiency (%)', key: 'efficiency' },
      { name: 'Power (kW)', key: 'powerConsumption' },
      { name: 'Flow Rate (m³/h)', key: 'flowRate' },
      { name: 'Price ($)', key: 'price' }
    ];
    
    return comparisonMetrics.map(metric => {
      const result: any = { name: metric.name };
      
      performanceMetrics.alternativeProducts.forEach(product => {
        const productName = product.isSelected ? `${product.name} (Selected)` : product.name;
        result[productName] = product[metric.key as keyof typeof product];
      });
      
      return result;
    });
  };

  const performanceData = generatePerformanceData();
  const comparisonData = generateComparisonData();

  return (
    <ProductConfigurator
      title="Step 3: Performance Analysis"
      description="Detailed performance metrics and analysis based on your specifications"
    >
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid grid-cols-3 mb-6">
          <TabsTrigger value="overview">Performance Overview</TabsTrigger>
          <TabsTrigger value="trends">Efficiency Trends</TabsTrigger>
          <TabsTrigger value="comparison">Product Comparison</TabsTrigger>
        </TabsList>
        
        {isCalculating || !performanceMetrics ? (
          <div className="space-y-6">
            <Skeleton className="h-[300px] w-full rounded-lg" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Skeleton className="h-[150px] w-full rounded-lg" />
              <Skeleton className="h-[150px] w-full rounded-lg" />
            </div>
          </div>
        ) : (
          <>
            <TabsContent value="overview" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Overall Performance Metrics</CardTitle>
                  <CardDescription>
                    Based on {config.flowRate} m³/h flow rate, {config.pressure} bar pressure, and {config.temperature}°C temperature
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                      <div className="text-sm text-blue-600 font-medium uppercase">System Efficiency</div>
                      <div className="flex items-end mt-2">
                        <div className="text-3xl font-bold text-blue-700">{performanceMetrics.efficiency}%</div>
                        <div className="text-sm text-blue-600 ml-2 pb-1">{performanceMetrics.comparedToAverage > 0 ? `+${performanceMetrics.comparedToAverage}%` : `${performanceMetrics.comparedToAverage}%`} vs. avg</div>
                      </div>
                      <div className="mt-2 h-2 w-full bg-blue-100 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-600 rounded-full" style={{ width: `${performanceMetrics.efficiency}%` }}></div>
                      </div>
                    </div>
                    
                    <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                      <div className="text-sm text-green-600 font-medium uppercase">Power Consumption</div>
                      <div className="flex items-end mt-2">
                        <div className="text-3xl font-bold text-green-700">{performanceMetrics.powerConsumption} kW</div>
                      </div>
                      <div className="mt-2 text-sm text-green-600">
                        {performanceMetrics.isWithinTargetPower ? 
                          'Within target range' : 
                          'Above target range'}
                      </div>
                    </div>
                    
                    <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
                      <div className="text-sm text-purple-600 font-medium uppercase">Estimated Lifetime</div>
                      <div className="flex items-end mt-2">
                        <div className="text-3xl font-bold text-purple-700">{performanceMetrics.estimatedLifetime}+ years</div>
                      </div>
                      <div className="mt-2 text-sm text-purple-600">
                        {performanceMetrics.isExceedsLifetime ? 
                          'Exceeds requirements' : 
                          'Below requirements'}
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <h4 className="text-sm font-medium text-gray-700 mb-3">Performance Under Load</h4>
                    <ResponsiveContainer width="100%" height={250}>
                      <BarChart data={performanceMetrics.performanceByLoad}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="load" label={{ value: 'Load (%)', position: 'insideBottom', offset: -5 }} />
                        <YAxis label={{ value: 'Performance (%)', angle: -90, position: 'insideLeft' }} />
                        <Tooltip formatter={(value) => [`${value}%`, 'Performance']} />
                        <Bar dataKey="performance" name="Performance" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Noise Level</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center">
                      <div className="text-4xl font-bold mb-2">{performanceMetrics.noiseLevel} dB</div>
                      <div className={`text-sm ${performanceMetrics.isAboveTargetNoise ? 'text-amber-600' : 'text-green-600'}`}>
                        {performanceMetrics.isAboveTargetNoise ? 'Above target' : 'Within target'}
                      </div>
                      <div className="mt-4 h-4 w-full bg-gray-100 rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${performanceMetrics.isAboveTargetNoise ? 'bg-amber-500' : 'bg-green-500'} rounded-full`} 
                          style={{ width: `${Math.min(100, (performanceMetrics.noiseLevel / 100) * 100)}%` }}>
                        </div>
                      </div>
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>Quiet (40dB)</span>
                        <span>Loud (100dB)</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Maintenance Schedule</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center">
                      <div className="text-4xl font-bold mb-2">{performanceMetrics.maintenanceInterval} months</div>
                      <div className={`text-sm ${performanceMetrics.isExtendedMaintenance ? 'text-green-600' : 'text-amber-600'}`}>
                        {performanceMetrics.isExtendedMaintenance ? 'Extended maintenance interval' : 'Regular maintenance interval'}
                      </div>
                      <div className="mt-4 grid grid-cols-12 gap-1">
                        {Array(12).fill(0).map((_, i) => (
                          <div 
                            key={i} 
                            className={`h-8 rounded ${i < performanceMetrics.maintenanceInterval ? 'bg-blue-500' : 'bg-gray-200'}`}>
                          </div>
                        ))}
                      </div>
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>1 month</span>
                        <span>12 months</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="trends">
              <Card>
                <CardHeader>
                  <CardTitle>Performance Trends</CardTitle>
                  <CardDescription>
                    Simulated performance metrics over time based on your configuration
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={400}>
                    <LineChart data={performanceData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" label={{ value: 'Month', position: 'insideBottom', offset: -5 }} />
                      <YAxis yAxisId="left" label={{ value: 'Efficiency (%)', angle: -90, position: 'insideLeft' }} />
                      <YAxis yAxisId="right" orientation="right" label={{ value: 'Power (kW)', angle: 90, position: 'insideRight' }} />
                      <Tooltip />
                      <Legend verticalAlign="top" height={36} />
                      <Line yAxisId="left" type="monotone" dataKey="efficiency" name="Efficiency %" stroke="#3B82F6" activeDot={{ r: 8 }} />
                      <Line yAxisId="right" type="monotone" dataKey="powerUsage" name="Power Usage (kW)" stroke="#10B981" />
                      <Line yAxisId="right" type="monotone" dataKey="maintenance" name="Maintenance Check" stroke="#F59E0B" strokeDasharray="5 5" />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="comparison">
              <Card>
                <CardHeader>
                  <CardTitle>Product Comparison</CardTitle>
                  <CardDescription>
                    Compare the selected product with alternatives
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={400}>
                    <BarChart
                      data={comparisonData}
                      layout="vertical"
                      margin={{ top: 20, right: 30, left: 40, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" />
                      <YAxis dataKey="name" type="category" />
                      <Tooltip />
                      <Legend />
                      {performanceMetrics.alternativeProducts.map((product, index) => (
                        <Bar 
                          key={product.id}
                          dataKey={product.isSelected ? `${product.name} (Selected)` : product.name} 
                          fill={product.isSelected ? '#3B82F6' : ['#10B981', '#8B5CF6', '#F59E0B'][index % 3]} 
                        />
                      ))}
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>
          </>
        )}
      </Tabs>
    </ProductConfigurator>
  );
};

export default PerformancePage;
