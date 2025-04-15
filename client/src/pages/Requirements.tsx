import React from 'react';
import ProductConfigurator from '@/components/ProductConfigurator';
import { useProductConfiguration } from '@/hooks/useProductConfiguration';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { useQuery } from '@tanstack/react-query';

const RequirementsPage: React.FC = () => {
  const { config, updateConfiguration } = useProductConfiguration();
  
  // Fetch available product categories
  const { data: categories = [] } = useQuery({
    queryKey: ['/api/product-categories'],
  });
  
  // Fetch application types for the selected category
  const { data: applicationTypes = [] } = useQuery({
    queryKey: ['/api/application-types', config.categoryId],
  });

  const handleCategoryChange = (categoryId: number) => {
    updateConfiguration({ categoryId });
  };

  const handleApplicationTypeChange = (applicationTypeId: number) => {
    updateConfiguration({ applicationType: applicationTypeId });
  };

  return (
    <ProductConfigurator 
      title="Step 1: Define Your Requirements" 
      description="Select the product category and application type for your needs"
    >
      <div className="space-y-8">
        {/* Product Category Selection */}
        <div>
          <h3 className="text-lg font-medium text-gray-800 mb-4">Select Product Category</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.length > 0 ? (
              <RadioGroup
                value={String(config.categoryId)}
                onValueChange={(value) => handleCategoryChange(parseInt(value))}
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
              >
                {categories.map((category: any) => (
                  <div key={category.id} className="relative">
                    <RadioGroupItem
                      value={String(category.id)}
                      id={`category-${category.id}`}
                      className="sr-only"
                    />
                    <Label
                      htmlFor={`category-${category.id}`}
                      className={`flex flex-col p-4 border-2 rounded-lg ${
                        config.categoryId === category.id
                          ? "border-primary bg-blue-50"
                          : "border-gray-200 hover:border-blue-200"
                      } cursor-pointer transition-colors`}
                    >
                      <div className="flex items-center space-x-2">
                        <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-primary">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                          </svg>
                        </div>
                        <span className="text-lg font-medium">{category.name}</span>
                      </div>
                      <p className="text-gray-500 mt-2">{category.description}</p>
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            ) : (
              // Loading state
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[...Array(4)].map((_, index) => (
                  <Card key={index} className="animate-pulse">
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-2">
                        <div className="h-10 w-10 rounded-full bg-gray-200"></div>
                        <div className="h-5 w-32 bg-gray-200 rounded"></div>
                      </div>
                      <div className="h-4 w-full bg-gray-100 rounded mt-3"></div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Application Type Selection */}
        <div>
          <h3 className="text-lg font-medium text-gray-800 mb-4">Select Application Type</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {applicationTypes.length > 0 ? (
              <RadioGroup
                value={String(config.applicationType)}
                onValueChange={(value) => handleApplicationTypeChange(parseInt(value))}
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
              >
                {applicationTypes.map((type: any) => (
                  <div key={type.id} className="relative">
                    <RadioGroupItem
                      value={String(type.id)}
                      id={`app-type-${type.id}`}
                      className="sr-only"
                    />
                    <Label
                      htmlFor={`app-type-${type.id}`}
                      className={`flex flex-col p-4 border-2 rounded-lg ${
                        config.applicationType === type.id
                          ? "border-primary bg-blue-50"
                          : "border-gray-200 hover:border-blue-200"
                      } cursor-pointer transition-colors`}
                    >
                      <span className="font-medium text-gray-800">{type.name}</span>
                      <p className="text-gray-500 text-sm mt-1">{type.description}</p>
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            ) : (
              // Loading state
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[...Array(4)].map((_, index) => (
                  <Card key={index} className="animate-pulse">
                    <CardContent className="p-4">
                      <div className="h-5 w-32 bg-gray-200 rounded mb-2"></div>
                      <div className="h-4 w-full bg-gray-100 rounded"></div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </ProductConfigurator>
  );
};

export default RequirementsPage;
