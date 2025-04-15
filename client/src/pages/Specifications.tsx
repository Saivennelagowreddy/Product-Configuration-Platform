import React from 'react';
import ProductConfigurator from '@/components/ProductConfigurator';
import SpecificationForm from '@/components/SpecificationForm';
import ProductAlternatives from '@/components/ProductAlternatives';
import { useProductConfiguration } from '@/hooks/useProductConfiguration';

const SpecificationsPage: React.FC = () => {
  const { 
    config, 
    updateConfiguration, 
    performanceMetrics, 
    isCalculating,
    selectAlternativeProduct 
  } = useProductConfiguration();

  return (
    <ProductConfigurator 
      title="Step 2: Technical Specifications" 
      description="Configure the technical parameters for your product"
    >
      <SpecificationForm 
        config={config} 
        onConfigChange={updateConfiguration}
        performanceMetrics={performanceMetrics}
        isCalculating={isCalculating}
      />
      
      <ProductAlternatives 
        metrics={performanceMetrics}
        isLoading={isCalculating}
        onSelectAlternative={selectAlternativeProduct}
      />
    </ProductConfigurator>
  );
};

export default SpecificationsPage;
