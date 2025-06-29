import React from 'react';
import { ArrowRight, Star, Shield, Truck } from 'lucide-react';
import { useApp } from '../contexts/AppContext';

const Hero: React.FC = () => {
  const { setCurrentPage } = useApp();

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Content */}
          <div className="space-y-8 animate-fade-in-up">
            <div className="space-y-4">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 text-sm font-medium">
                <Star className="h-4 w-4 mr-2" />
                India's #1 iPhone Marketplace
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 leading-tight">
                Find Your Perfect
                <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  iPhone
                </span>
              </h1>
              
              <p className="text-xl text-gray-600 max-w-2xl leading-relaxed">
                Discover the best deals from verified sellers across the country. 
                From the latest iPhone 15 to classic models, all in one place.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => setCurrentPage('products')}
                className="group bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl"
              >
                Explore iPhones
                <ArrowRight className="inline-block ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
              </button>
              
              <button 
                onClick={() => setCurrentPage('register-shop')}
                className="group border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-xl font-semibold text-lg hover:border-blue-500 hover:text-blue-600 transition-all duration-300 transform hover:scale-105"
              >
                Sell Your iPhone
              </button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8">
              <div className="flex items-center space-x-3 p-4 rounded-xl bg-white/50 backdrop-blur-sm border border-white/20 hover:scale-105 transition-transform duration-200">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Shield className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Verified Sellers</p>
                  <p className="text-sm text-gray-600">100% Authentic</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-4 rounded-xl bg-white/50 backdrop-blur-sm border border-white/20 hover:scale-105 transition-transform duration-200">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Star className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Best Prices</p>
                  <p className="text-sm text-gray-600">Compare & Save</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-4 rounded-xl bg-white/50 backdrop-blur-sm border border-white/20 hover:scale-105 transition-transform duration-200">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Truck className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Fast Delivery</p>
                  <p className="text-sm text-gray-600">India Wide</p>
                </div>
              </div>
            </div>
          </div>

          {/* 3D iPhone Display */}
          <div className="relative lg:h-[600px] flex items-center justify-center">
            <div className="relative group">
              {/* Main iPhone */}
              <div className="relative z-10 transform rotate-12 hover:rotate-6 transition-transform duration-700 hover:scale-110">
                <div className="w-64 h-96 bg-gradient-to-br from-gray-800 to-black rounded-3xl shadow-2xl overflow-hidden border-4 border-gray-700">
                  {/* Screen */}
                  <div className="m-2 h-[calc(100%-16px)] bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl relative overflow-hidden">
                    {/* Dynamic Island */}
                    <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-24 h-6 bg-black rounded-full"></div>
                    
                    {/* Screen Content */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-500 opacity-90">
                      <div className="absolute top-16 left-4 right-4">
                        <div className="text-white text-xs font-medium mb-2">Pexia</div>
                        <div className="space-y-2">
                          <div className="h-2 bg-white/30 rounded-full w-3/4"></div>
                          <div className="h-2 bg-white/20 rounded-full w-1/2"></div>
                          <div className="h-2 bg-white/25 rounded-full w-2/3"></div>
                        </div>
                      </div>
                      
                      {/* App Icons */}
                      <div className="absolute bottom-8 left-4 right-4">
                        <div className="grid grid-cols-4 gap-2">
                          {[...Array(8)].map((_, i) => (
                            <div key={i} className="w-8 h-8 bg-white/20 rounded-lg backdrop-blur-sm animate-pulse" style={{animationDelay: `${i * 0.1}s`}}></div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Background iPhones */}
              <div className="absolute -top-8 -left-8 transform -rotate-12 opacity-60 z-0 hover:opacity-80 transition-opacity duration-500">
                <div className="w-48 h-72 bg-gradient-to-br from-gray-700 to-gray-900 rounded-2xl shadow-xl"></div>
              </div>
              
              <div className="absolute -bottom-8 -right-8 transform rotate-24 opacity-40 z-0 hover:opacity-60 transition-all duration-500">
                <div className="w-52 h-80 bg-gradient-to-br from-purple-800 to-blue-800 rounded-2xl shadow-xl"></div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 right-8 w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full animate-bounce opacity-80"></div>
              <div className="absolute -bottom-4 left-8 w-8 h-8 bg-gradient-to-br from-green-400 to-blue-500 rounded-full animate-pulse opacity-70"></div>
              <div className="absolute top-1/2 -right-8 w-6 h-6 bg-gradient-to-br from-pink-400 to-red-500 rounded-full animate-bounce opacity-60" style={{animationDelay: '1s'}}></div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mt-20 animate-fade-in-up animation-delay-1000">
          <div className="text-center p-6 rounded-xl bg-white/60 backdrop-blur-sm border border-white/20 hover:scale-105 transition-transform duration-200">
            <div className="text-3xl font-bold text-gray-900 mb-2">50K+</div>
            <div className="text-gray-600">Happy Customers</div>
          </div>
          <div className="text-center p-6 rounded-xl bg-white/60 backdrop-blur-sm border border-white/20 hover:scale-105 transition-transform duration-200">
            <div className="text-3xl font-bold text-gray-900 mb-2">500+</div>
            <div className="text-gray-600">Verified Shops</div>
          </div>
          <div className="text-center p-6 rounded-xl bg-white/60 backdrop-blur-sm border border-white/20 hover:scale-105 transition-transform duration-200">
            <div className="text-3xl font-bold text-gray-900 mb-2">25+</div>
            <div className="text-gray-600">Cities Covered</div>
          </div>
          <div className="text-center p-6 rounded-xl bg-white/60 backdrop-blur-sm border border-white/20 hover:scale-105 transition-transform duration-200">
            <div className="text-3xl font-bold text-gray-900 mb-2">4.9★</div>
            <div className="text-gray-600">Customer Rating</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;