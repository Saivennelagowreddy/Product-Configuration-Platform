import React from 'react';

interface NavigationButtonsProps {
  onPrevious: () => void;
  onNext: () => void;
  isPreviousDisabled?: boolean;
  isNextDisabled?: boolean;
  previousLabel?: string;
  nextLabel?: string;
}

const NavigationButtons: React.FC<NavigationButtonsProps> = ({
  onPrevious,
  onNext,
  isPreviousDisabled = false,
  isNextDisabled = false,
  previousLabel = "Previous",
  nextLabel = "Next"
}) => {
  return (
    <div className="flex justify-between">
      <button 
        className={`inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md ${
          isPreviousDisabled 
            ? 'text-gray-400 bg-gray-100 cursor-not-allowed' 
            : 'text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary'
        }`}
        onClick={onPrevious}
        disabled={isPreviousDisabled}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        {previousLabel}
      </button>
      <button 
        className={`inline-flex items-center px-4 py-2 border ${
          isNextDisabled 
            ? 'border-gray-300 text-gray-400 bg-gray-100 cursor-not-allowed' 
            : 'border-transparent text-white bg-primary hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary'
        } text-sm font-medium rounded-md shadow-sm`}
        onClick={onNext}
        disabled={isNextDisabled}
      >
        {nextLabel}
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </button>
    </div>
  );
};

export default NavigationButtons;
