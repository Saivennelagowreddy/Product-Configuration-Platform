import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { ProductConfiguration, ApplicationType } from '@shared/schema';
import PerformanceVisualizer from './PerformanceVisualizer';

interface SpecificationFormProps {
  config: ProductConfiguration;
  onConfigChange: (updates: Partial<ProductConfiguration>) => void;
  performanceMetrics: any | null;
  isCalculating: boolean;
}

const SpecificationForm: React.FC<SpecificationFormProps> = ({ 
  config, 
  onConfigChange,
  performanceMetrics,
  isCalculating
}) => {
  // Fetch application types
  const { data: applicationTypes = [] } = useQuery<ApplicationType[]>({
    queryKey: ['/api/application-types', config.categoryId],
  });

  // Update flow rate value
  const handleFlowRateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    onConfigChange({ flowRate: value });
  };

  // Update pressure value
  const handlePressureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    onConfigChange({ pressure: value });
  };

  // Update temperature value
  const handleTemperatureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    onConfigChange({ temperature: value });
  };

  // Update application type
  const handleApplicationTypeChange = (applicationTypeId: number) => {
    onConfigChange({ applicationType: applicationTypeId });
  };

  // Update product category
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = parseInt(e.target.value);
    onConfigChange({ categoryId: value });
  };

  // Get card color for application type based on ID
  const getTypeCardColor = (typeId: number) => {
    const colors = {
      1: { bg: 'bg-blue-50', border: 'border-blue-300', ring: 'ring-blue-300' },
      2: { bg: 'bg-green-50', border: 'border-green-300', ring: 'ring-green-300' },
      3: { bg: 'bg-amber-50', border: 'border-amber-300', ring: 'ring-amber-300' },
      4: { bg: 'bg-purple-50', border: 'border-purple-300', ring: 'ring-purple-300' }
    };
    return colors[typeId as keyof typeof colors] || { bg: 'bg-gray-50', border: 'border-gray-300', ring: 'ring-gray-300' };
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Form Fields - Left Column */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-7">
        <div className="border-b border-gray-100 pb-5 mb-1">
          <h3 className="text-lg font-semibold">
            <span className="gradient-text">Technical Parameters</span>
          </h3>
          <p className="text-sm text-gray-500">Configure the technical specifications for optimal performance</p>
        </div>
        
        {/* Product Category */}
        <div className="group">
          <label htmlFor="product-category" className="block text-sm font-medium text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline-block mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
            </svg>
            Product Category
          </label>
          <div className="relative">
            <select
              id="product-category"
              className="block w-full pl-3 pr-10 py-2.5 text-base border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400 rounded-lg shadow-sm transition-colors"
              value={config.categoryId}
              onChange={handleCategoryChange}
            >
              <option value={1}>Industrial Pumps</option>
              <option value={2}>Hydraulic Systems</option>
              <option value={3}>Pneumatic Controls</option>
              <option value={4}>Compressors</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </div>
          </div>
        </div>
        
        {/* Application Type */}
        <div>
          <label className="block text-sm font-medium text-gray-800 mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline-block mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
            </svg>
            Application Type
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {applicationTypes.length > 0 ? (
              applicationTypes.map((type) => {
                const isSelected = config.applicationType === type.id;
                const colors = getTypeCardColor(type.id);
                
                return (
                  <div 
                    key={type.id}
                    className={`relative rounded-lg ${isSelected ? `${colors.bg} ${colors.border} ring-2 ${colors.ring}` : 'border-gray-200 bg-white hover:bg-gray-50'} 
                    border px-4 py-3 shadow-sm hover:shadow cursor-pointer transition-all duration-200`}
                    onClick={() => handleApplicationTypeChange(type.id)}
                  >
                    <label className="flex items-start cursor-pointer">
                      <div className="flex items-center h-5">
                        <input 
                          type="radio" 
                          name="application-type" 
                          className={`h-4 w-4 ${isSelected ? 'text-blue-600' : 'text-gray-300'} focus:ring-blue-400 border-gray-300`}
                          checked={isSelected}
                          onChange={() => {}}
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <span className={`font-medium ${isSelected ? 'text-gray-900' : 'text-gray-700'}`}>{type.name}</span>
                        <p className={`${isSelected ? 'text-gray-700' : 'text-gray-500'} text-xs mt-1`}>{type.description}</p>
                      </div>
                    </label>
                  </div>
                );
              })
            ) : (
              <>
                {/* Placeholders for application types while loading */}
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="relative rounded-lg border border-gray-200 bg-white px-4 py-3 shadow-sm animate-pulse">
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <div className="h-4 w-4 rounded-full bg-gray-200"></div>
                      </div>
                      <div className="ml-3 text-sm">
                        <div className="h-4 w-24 bg-gray-200 rounded mb-2"></div>
                        <div className="h-3 w-32 bg-gray-100 rounded"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
        
        {/* Required Flow Rate */}
        <div className="group">
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-medium text-gray-800 group-hover:text-blue-600 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline-block mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Required Flow Rate
            </label>
            <span className="text-sm font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
              {config.flowRate} m³/h
            </span>
          </div>
          <div className="relative pt-1">
            <input 
              type="range" 
              min="50" 
              max="500" 
              value={config.flowRate} 
              onChange={handleFlowRateChange}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer focus:outline-none" 
            />
            <div className="w-full h-2 rounded-lg bg-gradient-to-r from-blue-200 to-blue-400 opacity-30 absolute top-1 pointer-events-none"></div>
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>50 m³/h</span>
            <span>500 m³/h</span>
          </div>
        </div>
        
        {/* System Pressure */}
        <div className="group">
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-medium text-gray-800 group-hover:text-blue-600 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline-block mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              System Pressure
            </label>
            <span className="text-sm font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
              {config.pressure} bar
            </span>
          </div>
          <div className="relative pt-1">
            <input 
              type="range" 
              min="1" 
              max="10" 
              step="0.5" 
              value={config.pressure}
              onChange={handlePressureChange}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer focus:outline-none" 
            />
            <div className="w-full h-2 rounded-lg bg-gradient-to-r from-green-200 to-green-400 opacity-30 absolute top-1 pointer-events-none"></div>
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>1 bar</span>
            <span>10 bar</span>
          </div>
        </div>
        
        {/* Medium Temperature */}
        <div className="group">
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-medium text-gray-800 group-hover:text-blue-600 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline-block mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Medium Temperature
            </label>
            <span className={`text-sm font-medium px-2 py-0.5 rounded-full ${
              config.temperature < 0 ? 'text-purple-600 bg-purple-50' :
              config.temperature > 80 ? 'text-red-600 bg-red-50' :
              'text-amber-600 bg-amber-50'
            }`}>
              {config.temperature} °C
            </span>
          </div>
          <div className="relative pt-1">
            <input 
              type="range" 
              min="-20" 
              max="120" 
              value={config.temperature}
              onChange={handleTemperatureChange}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer focus:outline-none" 
            />
            <div className="w-full h-2 rounded-lg bg-gradient-to-r from-purple-400 via-amber-300 to-red-400 opacity-30 absolute top-1 pointer-events-none"></div>
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>-20 °C</span>
            <span>120 °C</span>
          </div>
        </div>
      </div>
      
      {/* Real-time Performance - Right Column */}
      <div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-4">
          <h3 className="text-lg font-semibold border-b border-gray-100 pb-3 mb-4">
            <span className="gradient-text">Real-time Performance</span>
          </h3>
          <PerformanceVisualizer 
            metrics={performanceMetrics} 
            isLoading={isCalculating} 
          />
        </div>
        
        <div className="text-xs text-gray-500 bg-blue-50 p-4 rounded-lg flex items-start">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-500 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          <p>Performance metrics are calculated in real-time based on your specifications. Adjusting parameters will immediately update the performance visualizations to help you find the optimal configuration.</p>
        </div>
      </div>
    </div>
  );
};

export default SpecificationForm;
