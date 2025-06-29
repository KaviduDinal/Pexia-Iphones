import React, { useState } from 'react';
import { AuthProvider } from './contexts/AuthContext';
import { AppProvider, useApp } from './contexts/AppContext';
import Header from './components/Header';
import Hero from './components/Hero';
import Products from './components/Products';
import Cart from './components/Cart';

const AppContent: React.FC = () => {
  const { currentPage } = useApp();

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return <Hero />;
      case 'products':
        return <Products />;
      case 'cart':
        return <Cart />;
      case 'shops':
        return (
          <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center py-16">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">Shops</h1>
                <p className="text-lg text-gray-600">Browse verified iPhone sellers in your area</p>
                <p className="text-sm text-gray-500 mt-4">Coming soon...</p>
              </div>
            </div>
          </div>
        );
      case 'about':
        return (
          <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center py-16">
                <h1 className="text-4xl font-bold text-gray-900 mb-8">About Pexia</h1>
                <div className="prose prose-lg mx-auto text-left">
                  <p className="text-lg text-gray-600 mb-6">
                    Pexia is India's premier iPhone marketplace, connecting buyers with verified sellers across the country. 
                    We provide a secure platform where you can find the best deals on new and pre-owned iPhones.
                  </p>
                  <div className="grid md:grid-cols-2 gap-8 mt-12">
                    <div className="bg-white p-6 rounded-xl shadow-lg">
                      <h3 className="font-bold text-xl mb-4">Our Mission</h3>
                      <p className="text-gray-600">
                        To make iPhone shopping simple, secure, and affordable for everyone in India.
                      </p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-lg">
                      <h3 className="font-bold text-xl mb-4">Our Vision</h3>
                      <p className="text-gray-600">
                        To become the most trusted marketplace for Apple products in India.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'register-shop':
        return (
          <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-6">Register Your Shop</h1>
                <p className="text-gray-600 mb-8">
                  Join thousands of verified sellers on Pexia and reach customers across India.
                </p>
                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Shop Name
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter your shop name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Owner Name
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter owner name"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Location
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="City, State"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description
                    </label>
                    <textarea
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Describe your shop and specialization"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105"
                  >
                    Register Shop
                  </button>
                </form>
              </div>
            </div>
          </div>
        );
      default:
        return <Hero />;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        {renderCurrentPage()}
      </main>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <AppContent />
      </AppProvider>
    </AuthProvider>
  );
}

export default App;