import React from "react";
import { Link, useLocation } from "wouter";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [location] = useLocation();
  
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-blue-700 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <div className="bg-white p-2 rounded-full shadow-lg mr-3">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="text-blue-600 w-6 h-6"
              >
                <path d="M12 9v6"></path>
                <circle cx="12" cy="5" r="1"></circle>
                <path d="M19.071 19.071c-3.505 3.505-9.193 3.505-12.698 0-3.505-3.505-3.505-9.193 0-12.698s9.193-3.505 12.698 0"></path>
                <circle cx="7" cy="17" r="1"></circle>
                <circle cx="17" cy="7" r="1"></circle>
                <circle cx="17" cy="17" r="1"></circle>
              </svg>
            </div>
            <Link href="/">
              <div className="cursor-pointer">
                <h1 className="text-xl font-bold text-white">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-100">
                    TechSpec Configurator
                  </span>
                </h1>
                <p className="text-xs text-blue-100">Industrial Solutions</p>
              </div>
            </Link>
          </div>
          <div className="flex space-x-1">
            <button className="text-blue-100 hover:text-white px-3 py-2 text-sm font-medium rounded-md hover:bg-blue-500 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline-block w-4 h-4 mr-1">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                <line x1="12" y1="17" x2="12.01" y2="17"></line>
              </svg>
              Help
            </button>
            <button className="bg-white text-blue-600 hover:bg-blue-50 px-3 py-2 text-sm font-medium rounded-md shadow-sm transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline-block w-4 h-4 mr-1">
                <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
                <polyline points="17 21 17 13 7 13 7 21"></polyline>
                <polyline points="7 3 7 8 15 8"></polyline>
              </svg>
              Save Configuration
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-gray-50">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <div className="mr-3 bg-blue-100 p-2 rounded-full">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  className="text-blue-600 w-4 h-4"
                >
                  <path d="M12 9v6"></path>
                  <circle cx="12" cy="5" r="1"></circle>
                  <path d="M19.071 19.071c-3.505 3.505-9.193 3.505-12.698 0-3.505-3.505-3.505-9.193 0-12.698s9.193-3.505 12.698 0"></path>
                </svg>
              </div>
              <div>
                <div className="text-sm font-medium text-gray-900">TechSpec Configurator</div>
                <div className="text-xs text-gray-500">© {new Date().getFullYear()} All rights reserved</div>
              </div>
            </div>
            <div className="flex space-x-6">
              <button className="text-gray-500 hover:text-blue-600 text-sm transition-colors">Terms of Service</button>
              <button className="text-gray-500 hover:text-blue-600 text-sm transition-colors">Privacy Policy</button>
              <button className="text-gray-500 hover:text-blue-600 text-sm transition-colors">Customer Support</button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
