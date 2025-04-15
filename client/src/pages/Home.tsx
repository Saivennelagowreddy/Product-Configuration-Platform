import React from 'react';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const Home: React.FC = () => {
  const [_, setLocation] = useLocation();

  const startConfiguring = () => {
    setLocation('/configurator/requirements');
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className="flex flex-col md:flex-row items-center mb-16 gap-8">
          <div className="md:w-1/2 space-y-6">
            <h1 className="text-5xl font-bold leading-tight">
              <span className="gradient-text">Industry-Leading</span> Product Configuration Platform
            </h1>
            <p className="text-xl text-gray-600 max-w-xl">
              Find the perfect industrial solution with our advanced configuration tool. Engineered for precision and performance.
            </p>
            <div className="pt-4">
              <Button onClick={startConfiguring} size="lg" className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg text-white">
                Configure Your Solution
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Button>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <div className="relative">
              <div className="w-72 h-72 rounded-full animated-gradient-bg absolute -z-10 blur-xl opacity-20"></div>
              <div className="bg-white p-6 rounded-xl shadow-xl">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg bg-blue-50 flex flex-col items-center text-center">
                    <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mb-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <span className="text-sm font-medium text-blue-800">High Performance</span>
                  </div>
                  <div className="p-4 rounded-lg bg-green-50 flex flex-col items-center text-center">
                    <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center text-green-600 mb-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <span className="text-sm font-medium text-green-800">Cost Effective</span>
                  </div>
                  <div className="p-4 rounded-lg bg-purple-50 flex flex-col items-center text-center">
                    <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 mb-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <span className="text-sm font-medium text-purple-800">Reliable & Safe</span>
                  </div>
                  <div className="p-4 rounded-lg bg-amber-50 flex flex-col items-center text-center">
                    <div className="h-12 w-12 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 mb-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                      </svg>
                    </div>
                    <span className="text-sm font-medium text-amber-800">High Efficiency</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <h2 className="text-3xl font-bold text-center mb-10">
          <span className="gradient-text">Advanced Features</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <Card className="card-hover overflow-hidden border-t-4 border-blue-500">
            <CardHeader className="pb-2">
              <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <CardTitle className="text-xl text-blue-700">Interactive Selection</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Guided step-by-step configuration through complex technical specifications for precise product selection.
              </p>
            </CardContent>
          </Card>

          <Card className="card-hover overflow-hidden border-t-4 border-green-500">
            <CardHeader className="pb-2">
              <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center text-green-600 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <CardTitle className="text-xl text-green-700">Real-time Calculations</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                View instant performance metrics with detailed visualizations based on your specific input parameters.
              </p>
            </CardContent>
          </Card>

          <Card className="card-hover overflow-hidden border-t-4 border-purple-500">
            <CardHeader className="pb-2">
              <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                </svg>
              </div>
              <CardTitle className="text-xl text-purple-700">Intuitive Interface</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Expertly designed interactive controls with clear visual indicators that minimize selection errors.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <Card className="mb-8 overflow-hidden border-none shadow-xl bg-gradient-to-r from-blue-500 to-blue-700">
          <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
          <CardHeader className="relative z-10">
            <CardTitle className="text-2xl text-white font-bold">Start Configuring Your Industrial Solution</CardTitle>
            <CardDescription className="text-blue-100">
              Follow our industry-leading configuration process to find the optimal product based on your exact requirements.
            </CardDescription>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="bg-white/20 backdrop-blur-sm p-5 rounded-lg mb-6">
              <p className="text-white font-medium mb-3">Our configuration platform helps you:</p>
              <ul className="space-y-2 text-blue-50">
                <li className="flex items-center">
                  <svg className="h-5 w-5 mr-2 text-blue-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Define precise application requirements
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 mr-2 text-blue-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Configure detailed technical specifications
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 mr-2 text-blue-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Analyze comprehensive performance metrics
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 mr-2 text-blue-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Compare alternative solutions side-by-side
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 mr-2 text-blue-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Receive tailored recommendations with detailed specifications
                </li>
              </ul>
            </div>
          </CardContent>
          <CardFooter className="relative z-10">
            <Button onClick={startConfiguring} size="lg" className="bg-white text-blue-700 hover:bg-blue-50 w-full sm:w-auto shadow-lg">
              Begin Configuration Process
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Home;
