import React from 'react';
import { PerformanceMetrics } from '@shared/schema';
import { Skeleton } from '@/components/ui/skeleton';

interface PerformanceVisualizerProps {
  metrics: PerformanceMetrics | null;
  isLoading: boolean;
}

const PerformanceVisualizer: React.FC<PerformanceVisualizerProps> = ({ 
  metrics, 
  isLoading 
}) => {
  if (isLoading || !metrics) {
    return (
      <div className="rounded-lg animate-pulse">
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            <h4 className="text-sm font-medium text-gray-700">System Efficiency</h4>
            <Skeleton className="h-5 w-24" />
          </div>
          <Skeleton className="h-8 w-full mb-2" />
          <Skeleton className="h-2 w-full mb-4" />
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-8">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm">
              <Skeleton className="h-4 w-24 mb-2" />
              <Skeleton className="h-7 w-16 mb-1" />
              <Skeleton className="h-3 w-28" />
            </div>
          ))}
        </div>
        
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-4">Performance Under Load</h4>
          <div className="h-48 flex items-end justify-between space-x-2 border-b border-l border-gray-200 relative">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex-1 flex items-end justify-between">
                <div className="flex flex-col items-center w-full">
                  <Skeleton className="w-10 mb-1 rounded-t" style={{ height: `${30 + Math.random() * 40}%` }} />
                  <Skeleton className="h-3 w-12 mt-1" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Determine efficiency color classes
  const getEfficiencyColorClasses = (value: number) => {
    if (value >= 85) return { bg: 'bg-green-500', text: 'text-green-700', light: 'bg-green-100' };
    if (value >= 75) return { bg: 'bg-blue-500', text: 'text-blue-700', light: 'bg-blue-100' };
    if (value >= 65) return { bg: 'bg-amber-500', text: 'text-amber-700', light: 'bg-amber-100' };
    return { bg: 'bg-red-500', text: 'text-red-700', light: 'bg-red-100' };
  };

  const efficiencyColors = getEfficiencyColorClasses(metrics.efficiency);

  return (
    <div className="rounded-lg">
      {/* Efficiency Chart */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
          <h4 className="text-sm font-medium text-gray-700">System Efficiency</h4>
          <div className="mt-1 sm:mt-0">
            <span className={`text-sm font-medium ${metrics.comparedToAverage > 0 ? 'text-green-700' : 'text-red-700'} flex items-center`}>
              {metrics.comparedToAverage > 0 ? (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                  +{metrics.comparedToAverage}% above average
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  {Math.abs(metrics.comparedToAverage)}% below average
                </>
              )}
            </span>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
          <div className="flex items-center justify-center mb-4">
            <div className="relative w-32 h-32">
              {/* Circular background */}
              <div className={`absolute inset-0 rounded-full ${efficiencyColors.light} opacity-30`}></div>
              
              {/* Efficiency value */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className={`text-4xl font-bold ${efficiencyColors.text}`}>{metrics.efficiency}%</span>
                <span className="text-xs text-gray-500">Efficiency</span>
              </div>
              
              {/* Circular progress */}
              <svg className="absolute inset-0 w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle 
                  cx="50" cy="50" r="45" 
                  fill="none" 
                  stroke="#f3f4f6" 
                  strokeWidth="8"
                />
                <circle 
                  cx="50" cy="50" r="45" 
                  fill="none" 
                  stroke={efficiencyColors.bg.replace('bg-', 'text-')} 
                  strokeWidth="8"
                  strokeDasharray="283"
                  strokeDashoffset={283 - (283 * metrics.efficiency / 100)}
                  strokeLinecap="round"
                  className="transition-all duration-1000 ease-out"
                />
              </svg>
            </div>
          </div>
          
          <div className="w-full bg-gray-100 rounded-full h-1.5 mb-1">
            <div 
              className={`h-1.5 rounded-full ${efficiencyColors.bg}`}
              style={{ width: `${metrics.efficiency}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-xs text-gray-400">
            <span>0%</span>
            <span>50%</span>
            <span>100%</span>
          </div>
        </div>
      </div>
      
      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        <div className="group bg-white p-4 rounded-lg border border-gray-100 shadow-sm hover:shadow transition-shadow">
          <div className="flex justify-between items-start mb-3">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div className="text-sm text-gray-700">Power Consumption</div>
            </div>
            <div className={`text-xs ${metrics.isWithinTargetPower ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'} py-1 px-2 rounded-full font-medium`}>
              {metrics.isWithinTargetPower ? 'Within Target' : 'Above Target'}
            </div>
          </div>
          <div className="text-2xl font-bold text-gray-800">{metrics.powerConsumption} kW</div>
          <div className="mt-2 h-1 w-full bg-gray-100 rounded">
            <div 
              className={metrics.isWithinTargetPower ? 'bg-green-500 h-1 rounded' : 'bg-amber-500 h-1 rounded'} 
              style={{ width: `${Math.min(100, (metrics.powerConsumption / 10) * 100)}%` }}
            ></div>
          </div>
        </div>
        
        <div className="group bg-white p-4 rounded-lg border border-gray-100 shadow-sm hover:shadow transition-shadow">
          <div className="flex justify-between items-start mb-3">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600 mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="text-sm text-gray-700">Estimated Lifetime</div>
            </div>
            <div className={`text-xs ${metrics.isExceedsLifetime ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'} py-1 px-2 rounded-full font-medium`}>
              {metrics.isExceedsLifetime ? 'Exceeds Req.' : 'Below Req.'}
            </div>
          </div>
          <div className="text-2xl font-bold text-gray-800">{metrics.estimatedLifetime}+ years</div>
          <div className="mt-2 h-1 w-full bg-gray-100 rounded">
            <div 
              className={metrics.isExceedsLifetime ? 'bg-green-500 h-1 rounded' : 'bg-amber-500 h-1 rounded'} 
              style={{ width: `${Math.min(100, (metrics.estimatedLifetime / 20) * 100)}%` }}
            ></div>
          </div>
        </div>
        
        <div className="group bg-white p-4 rounded-lg border border-gray-100 shadow-sm hover:shadow transition-shadow">
          <div className="flex justify-between items-start mb-3">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15.536a5 5 0 01.707-7.072m-2.82 9.9a9 9 0 010-12.728" />
                </svg>
              </div>
              <div className="text-sm text-gray-700">Noise Level</div>
            </div>
            <div className={`text-xs ${metrics.isAboveTargetNoise ? 'bg-amber-100 text-amber-700' : 'bg-green-100 text-green-700'} py-1 px-2 rounded-full font-medium`}>
              {metrics.isAboveTargetNoise ? 'Above Target' : 'Within Target'}
            </div>
          </div>
          <div className="text-2xl font-bold text-gray-800">{metrics.noiseLevel} dB</div>
          <div className="mt-2 h-1 w-full bg-gray-100 rounded">
            <div 
              className={metrics.isAboveTargetNoise ? 'bg-amber-500 h-1 rounded' : 'bg-green-500 h-1 rounded'} 
              style={{ width: `${Math.min(100, (metrics.noiseLevel / 100) * 100)}%` }}
            ></div>
          </div>
        </div>
        
        <div className="group bg-white p-4 rounded-lg border border-gray-100 shadow-sm hover:shadow transition-shadow">
          <div className="flex justify-between items-start mb-3">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <div className="text-sm text-gray-700">Maintenance Interval</div>
            </div>
            <div className={`text-xs ${metrics.isExtendedMaintenance ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'} py-1 px-2 rounded-full font-medium`}>
              {metrics.isExtendedMaintenance ? 'Extended' : 'Regular'}
            </div>
          </div>
          <div className="text-2xl font-bold text-gray-800">{metrics.maintenanceInterval} months</div>
          <div className="mt-2 h-1 w-full bg-gray-100 rounded">
            <div 
              className={metrics.isExtendedMaintenance ? 'bg-green-500 h-1 rounded' : 'bg-amber-500 h-1 rounded'} 
              style={{ width: `${Math.min(100, (metrics.maintenanceInterval / 12) * 100)}%` }}
            ></div>
          </div>
        </div>
      </div>
      
      {/* Performance Chart */}
      <div className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm">
        <h4 className="text-sm font-medium text-gray-700 mb-4">Performance Under Load</h4>
        <div className="h-48 flex items-end justify-between space-x-2 border-b border-l border-gray-200 relative px-6">
          {/* Y-axis labels */}
          <div className="absolute -left-1 top-0 bottom-0 flex flex-col justify-between text-xs text-gray-500">
            <span>100%</span>
            <span>75%</span>
            <span>50%</span>
            <span>25%</span>
            <span>0%</span>
          </div>
          
          {/* Bars */}
          <div className="flex-1 flex items-end justify-between">
            {metrics.performanceByLoad && metrics.performanceByLoad.map((data, index) => {
              const barColor = data.performance > 80 ? 'bg-green-500' : 
                            data.performance > 65 ? 'bg-blue-500' : 
                            data.performance > 50 ? 'bg-amber-500' : 'bg-red-500';
              
              return (
                <div key={index} className="flex flex-col items-center group">
                  <div className="relative">
                    {/* Performance value tooltip */}
                    <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded transition-opacity">
                      {data.performance}%
                    </div>
                    
                    {/* Bar */}
                    <div 
                      className={`w-12 rounded-t ${barColor}`}
                      style={{ 
                        height: `${data.performance}%`,
                        boxShadow: '0 0 15px rgba(0,0,0,0.1)' 
                      }}
                    ></div>
                  </div>
                  <span className="text-xs text-gray-500 mt-2 font-medium">{data.load}%</span>
                </div>
              );
            })}
          </div>
        </div>
        <div className="text-center text-sm text-gray-500 mt-4">Load Percentage</div>
      </div>
    </div>
  );
};

export default PerformanceVisualizer;
