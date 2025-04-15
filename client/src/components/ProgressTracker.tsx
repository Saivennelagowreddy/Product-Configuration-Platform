import React from 'react';

interface ProgressTrackerProps {
  currentStep: number;
  onStepClick?: (step: number) => void;
}

const ProgressTracker: React.FC<ProgressTrackerProps> = ({ currentStep, onStepClick }) => {
  const steps = [
    { number: 1, title: 'Requirements' },
    { number: 2, title: 'Specifications' },
    { number: 3, title: 'Performance' },
    { number: 4, title: 'Compare' },
    { number: 5, title: 'Summary' }
  ];

  const handleStepClick = (step: number) => {
    if (onStepClick && step <= currentStep) {
      onStepClick(step);
    }
  };

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between max-w-3xl mx-auto mb-2">
        {steps.map((step, index) => {
          const isActive = step.number <= currentStep;
          const isCurrentStep = step.number === currentStep;
          
          return (
            <React.Fragment key={step.number}>
              <div 
                className="flex flex-col items-center transition-all duration-300 ease-in-out" 
                onClick={() => handleStepClick(step.number)}
                style={{ 
                  cursor: isActive ? 'pointer' : 'default',
                  transform: isCurrentStep ? 'scale(1.05)' : 'scale(1)'
                }}
              >
                <div className={`w-10 h-10 rounded-full 
                  ${isActive 
                    ? 'bg-primary text-white shadow-lg' 
                    : 'bg-gray-200 text-gray-500'}
                  ${isCurrentStep 
                    ? 'ring-4 ring-blue-100' 
                    : ''}
                  flex items-center justify-center font-semibold transition-all duration-300`}>
                  {step.number}
                </div>
                <span className={`text-sm font-medium mt-2 
                  ${isActive 
                    ? 'text-primary' 
                    : 'text-gray-500'
                  } ${isCurrentStep ? 'font-bold' : ''}`}>
                  {step.title}
                </span>
              </div>
              
              {index < steps.length - 1 && (
                <div className="relative w-16 h-0.5 bg-gray-200 mx-1 sm:mx-2">
                  <div 
                    className="absolute top-0 left-0 h-full bg-primary transition-all duration-500 ease-in-out"
                    style={{ width: index < currentStep - 1 ? '100%' : '0%' }}
                  ></div>
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
      <div className="relative pt-1">
        <div className="overflow-hidden h-2 text-xs flex rounded-full bg-gray-200">
          <div 
            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-500 ease-in-out" 
            style={{ width: `${Math.max(5, Math.min(100, (currentStep / steps.length) * 100))}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default ProgressTracker;
