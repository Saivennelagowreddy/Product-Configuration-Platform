import React from 'react';
import ProgressTracker from './ProgressTracker';
import NavigationButtons from './NavigationButtons';
import { useProductConfiguration } from '@/hooks/useProductConfiguration';

interface ProductConfiguratorProps {
  children: React.ReactNode;
  title: string;
  description: string;
}

const ProductConfigurator: React.FC<ProductConfiguratorProps> = ({ 
  children, 
  title, 
  description 
}) => {
  const { 
    step, 
    nextStep, 
    previousStep,
    goToStep
  } = useProductConfiguration();

  return (
    <>
      <ProgressTracker currentStep={step} onStepClick={goToStep} />
      
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <div className="border-b border-gray-200 pb-4 mb-6">
          <h2 className="text-xl font-bold text-gray-800">{title}</h2>
          <p className="text-gray-600 mt-1">{description}</p>
        </div>
        
        {children}
      </div>
      
      <NavigationButtons 
        onPrevious={previousStep} 
        onNext={nextStep} 
        isPreviousDisabled={step === 1}
      />
    </>
  );
};

export default ProductConfigurator;
