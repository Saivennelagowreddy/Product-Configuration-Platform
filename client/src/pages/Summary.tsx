import React from 'react';
import { useLocation } from 'wouter';
import ProductConfigurator from '@/components/ProductConfigurator';
import { useProductConfiguration } from '@/hooks/useProductConfiguration';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { Check, Download, Mail, Printer } from 'lucide-react';

const SummaryPage: React.FC = () => {
  const [_, setLocation] = useLocation();
  const { config, performanceMetrics, isCalculating } = useProductConfiguration();

  const handleStartOver = () => {
    setLocation('/configurator/requirements');
  };

  // Find the selected product
  const selectedProduct = performanceMetrics?.alternativeProducts.find(p => p.isSelected);

  // Generate specification list items
  const getSpecifications = () => {
    return [
      { label: 'Product Category', value: getCategoryName(config.categoryId) },
      { label: 'Application Type', value: getApplicationTypeName(config.applicationType) },
      { label: 'Flow Rate', value: `${config.flowRate} m³/h` },
      { label: 'System Pressure', value: `${config.pressure} bar` },
      { label: 'Medium Temperature', value: `${config.temperature} °C` }
    ];
  };

  // Get category name based on ID (normally would come from API)
  const getCategoryName = (id: number) => {
    const categories: Record<number, string> = {
      1: 'Industrial Pumps',
      2: 'Hydraulic Systems',
      3: 'Pneumatic Controls',
      4: 'Compressors'
    };
    return categories[id] || 'Unknown Category';
  };

  // Get application type name based on ID (normally would come from API)
  const getApplicationTypeName = (id: number) => {
    const types: Record<number, string> = {
      1: 'Water Treatment',
      2: 'Chemical Processing',
      3: 'Oil & Gas',
      4: 'Food & Beverage'
    };
    return types[id] || 'Unknown Application Type';
  };

  // Get recommendation text based on efficiency
  const getRecommendationText = () => {
    if (!performanceMetrics) return '';
    
    if (performanceMetrics.efficiency >= 80) {
      return 'Excellent choice! This configuration offers optimal performance for your requirements.';
    } else if (performanceMetrics.efficiency >= 70) {
      return 'Good choice. This configuration meets your requirements with good efficiency.';
    } else {
      return 'This configuration meets your basic requirements, but you might want to consider alternatives for better efficiency.';
    }
  };

  return (
    <ProductConfigurator
      title="Step 5: Configuration Summary"
      description="Review your product configuration and performance details"
    >
      {isCalculating || !performanceMetrics ? (
        <div className="space-y-6">
          <Skeleton className="h-[200px] w-full rounded-lg" />
          <Skeleton className="h-[300px] w-full rounded-lg" />
        </div>
      ) : (
        <>
          <Card className="mb-6 border-green-100 bg-green-50">
            <CardHeader className="pb-3">
              <CardTitle className="text-green-800 flex items-center">
                <Check className="mr-2 h-5 w-5" />
                Configuration Complete
              </CardTitle>
              <CardDescription className="text-green-700">
                Your product has been successfully configured based on your requirements
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-green-800 font-medium">{getRecommendationText()}</p>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Selected Product</CardTitle>
                <CardDescription>
                  Based on your specifications and requirements
                </CardDescription>
              </CardHeader>
              <CardContent>
                {selectedProduct && (
                  <div className="flex flex-col md:flex-row md:items-start gap-6">
                    <div className="flex-shrink-0 flex items-center justify-center bg-blue-100 rounded-lg h-32 w-32 text-primary">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                      </svg>
                    </div>
                    <div className="flex-grow">
                      <h3 className="text-xl font-bold text-gray-800 mb-1">{selectedProduct.name}</h3>
                      <p className="text-gray-500 mb-3">{selectedProduct.series} Series</p>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                          {selectedProduct.efficiency}% Efficiency
                        </Badge>
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          {selectedProduct.powerConsumption} kW
                        </Badge>
                        <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                          {selectedProduct.flowRate} m³/h
                        </Badge>
                      </div>
                      
                      <div className="text-lg font-bold text-gray-900 mb-4">
                        ${selectedProduct.price.toLocaleString()}
                      </div>
                      
                      <p className="text-gray-600">
                        This product is designed for {getApplicationTypeName(config.applicationType)} applications 
                        and provides excellent performance with {performanceMetrics.maintenanceInterval} month 
                        maintenance intervals and an estimated lifetime of {performanceMetrics.estimatedLifetime}+ years.
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Performance Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Efficiency Rating</div>
                    <div className="flex items-center">
                      <div className="text-2xl font-bold mr-2">{performanceMetrics.efficiency}%</div>
                      <div className={performanceMetrics.comparedToAverage >= 0 ? "text-green-600 text-sm" : "text-amber-600 text-sm"}>
                        {performanceMetrics.comparedToAverage >= 0 ? 
                          `+${performanceMetrics.comparedToAverage}% above average` : 
                          `${performanceMetrics.comparedToAverage}% below average`}
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Power Consumption</div>
                    <div className="flex items-center">
                      <div className="text-2xl font-bold mr-2">{performanceMetrics.powerConsumption} kW</div>
                      <div className={performanceMetrics.isWithinTargetPower ? "text-green-600 text-sm" : "text-amber-600 text-sm"}>
                        {performanceMetrics.isWithinTargetPower ? "Within target" : "Above target"}
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Noise Level</div>
                    <div className="flex items-center">
                      <div className="text-2xl font-bold mr-2">{performanceMetrics.noiseLevel} dB</div>
                      <div className={!performanceMetrics.isAboveTargetNoise ? "text-green-600 text-sm" : "text-amber-600 text-sm"}>
                        {!performanceMetrics.isAboveTargetNoise ? "Within target" : "Above target"}
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Est. Lifetime</div>
                    <div className="text-2xl font-bold">{performanceMetrics.estimatedLifetime}+ years</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Technical Specifications</CardTitle>
              <CardDescription>
                Detailed configuration parameters
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {getSpecifications().map((spec, index) => (
                  <div key={index} className="flex justify-between border-b border-gray-100 py-2">
                    <span className="text-gray-500">{spec.label}</span>
                    <span className="font-medium">{spec.value}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Next Steps</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button variant="outline" className="w-full flex items-center justify-center gap-2">
                  <Download className="h-4 w-4" />
                  Download Specification
                </Button>
                <Button variant="outline" className="w-full flex items-center justify-center gap-2">
                  <Mail className="h-4 w-4" />
                  Email Configuration
                </Button>
                <Button variant="outline" className="w-full flex items-center justify-center gap-2">
                  <Printer className="h-4 w-4" />
                  Print Summary
                </Button>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between pt-6">
              <Button variant="ghost" onClick={handleStartOver}>
                Start Over
              </Button>
              <Button>
                Request Quotation
              </Button>
            </CardFooter>
          </Card>
        </>
      )}
    </ProductConfigurator>
  );
};

export default SummaryPage;
