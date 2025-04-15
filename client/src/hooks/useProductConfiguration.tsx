import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { apiRequest } from '@/lib/queryClient';
import { ProductConfiguration, PerformanceMetrics } from '@shared/schema';
import { useToast } from "@/hooks/use-toast";

const defaultConfig: ProductConfiguration = {
  categoryId: 1, // Default to Industrial Pumps
  applicationType: 1, // Default to Water Treatment
  flowRate: 150,
  pressure: 4.5,
  temperature: 45
};

export function useProductConfiguration() {
  const [location, setLocation] = useLocation();
  const [step, setStep] = useState<number>(1);
  const [config, setConfig] = useState<ProductConfiguration>(defaultConfig);
  const [performanceMetrics, setPerformanceMetrics] = useState<PerformanceMetrics | null>(null);
  const [isCalculating, setIsCalculating] = useState<boolean>(false);
  const { toast } = useToast();

  const updateConfiguration = (updates: Partial<ProductConfiguration>) => {
    const newConfig = { ...config, ...updates };
    setConfig(newConfig);
    calculatePerformance(newConfig);
  };

  const calculatePerformance = async (configData: ProductConfiguration) => {
    setIsCalculating(true);
    try {
      const response = await apiRequest('POST', '/api/products/calculate', configData);
      const data = await response.json() as PerformanceMetrics;
      setPerformanceMetrics(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to calculate performance metrics",
        variant: "destructive",
      });
      console.error('Failed to calculate performance metrics:', error);
    } finally {
      setIsCalculating(false);
    }
  };

  const nextStep = () => {
    if (step < 5) {
      const newStep = step + 1;
      setStep(newStep);
      navigateToStep(newStep);
    }
  };

  const previousStep = () => {
    if (step > 1) {
      const newStep = step - 1;
      setStep(newStep);
      navigateToStep(newStep);
    }
  };

  const goToStep = (stepNumber: number) => {
    if (stepNumber >= 1 && stepNumber <= 5) {
      setStep(stepNumber);
      navigateToStep(stepNumber);
    }
  };

  const navigateToStep = (stepNumber: number) => {
    const paths = [
      '/configurator/requirements',
      '/configurator/specifications',
      '/configurator/performance',
      '/configurator/compare',
      '/configurator/summary'
    ];
    
    setLocation(paths[stepNumber - 1]);
  };

  const selectAlternativeProduct = (productId: number) => {
    if (performanceMetrics && performanceMetrics.alternativeProducts) {
      const updatedAlternatives = performanceMetrics.alternativeProducts.map(product => ({
        ...product,
        isSelected: product.id === productId
      }));
      
      setPerformanceMetrics({
        ...performanceMetrics,
        alternativeProducts: updatedAlternatives
      });
    }
  };

  // Initialize performance calculation on load
  useEffect(() => {
    calculatePerformance(config);
  }, []);

  // Determine step based on current URL
  useEffect(() => {
    const pathToStepMap: Record<string, number> = {
      '/configurator/requirements': 1,
      '/configurator/specifications': 2,
      '/configurator/performance': 3,
      '/configurator/compare': 4,
      '/configurator/summary': 5
    };
    
    if (pathToStepMap[location]) {
      setStep(pathToStepMap[location]);
    }
  }, [location]);

  return {
    step,
    config,
    performanceMetrics,
    isCalculating,
    updateConfiguration,
    calculatePerformance,
    nextStep,
    previousStep,
    goToStep,
    selectAlternativeProduct
  };
}
