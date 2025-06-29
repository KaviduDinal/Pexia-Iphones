import React, { useState } from 'react';
import { 
  Smartphone, 
  User, 
  ShoppingCart, 
  Menu, 
  X, 
  Store,
  Search,
  Mail,
  CheckCircle
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useApp } from '../contexts/AppContext';
import AuthModal from './AuthModal';
import EmailVerification from './EmailVerification';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showVerification, setShowVerification] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const { user, logout, isAuthenticated } = useAuth();
  const { cart, setCurrentPage, currentPage } = useApp();

  const cartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const navigation = [
    { name: 'Home', key: 'home' },
    { name: 'Products', key: 'products' },
    { name: 'Shops', key: 'shops' },
    { name: 'About', key: 'about' },
  ];

  const handleNavClick = (page: string) => {
    setCurrentPage(page);
    setIsMenuOpen(false);
  };

  const handleAuthClick = (mode: 'login' | 'register') => {
    setAuthMode(mode);
    setShowAuthModal(true);
  };

  const handleVerificationClick = () => {
    setShowVerification(true);
  };

  return (
    <>
      <header className="bg-white/95 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div 
              className="flex items-center space-x-2 cursor-pointer hover:scale-105 transition-transform duration-200"
              onClick={() => handleNavClick('home')}
            >
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-xl">
                <Smartphone className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Pexia
              </span>
            </div>

            {/* Search Bar - Desktop */}
            <div className="hidden md:flex items-center max-w-md mx-8 flex-1">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search iPhones..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
                />
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navigation.map((item) => (
                <button
                  key={item.key}
                  onClick={() => handleNavClick(item.key)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-gray-100 ${
                    currentPage === item.key
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-gray-700 hover:text-blue-600'
                  }`}
                >
                  {item.name}
                </button>
              ))}
            </nav>

            {/* User Actions */}
            <div className="flex items-center space-x-4">
              {/* Cart */}
              <button 
                onClick={() => handleNavClick('cart')}
                className="relative p-2 text-gray-600 hover:text-blue-600 transition-colors duration-200 hover:bg-gray-100 rounded-lg"
              >
                <ShoppingCart className="h-6 w-6" />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                    {cartItemsCount}
                  </span>
                )}
              </button>

              {/* User Menu */}
              {isAuthenticated && user ? (
                <div className="relative group">
                  <button className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                    <User className="h-6 w-6 text-gray-600" />
                    <div className="hidden sm:block text-left">
                      <div className="text-sm font-medium text-gray-700 flex items-center">
                        {user.name}
                        {user.isEmailVerified ? (
                          <CheckCircle className="h-4 w-4 text-green-500 ml-1" />
                        ) : (
                          <Mail className="h-4 w-4 text-orange-500 ml-1" />
                        )}
                      </div>
                      {!user.isEmailVerified && (
                        <div className="text-xs text-orange-600">Unverified</div>
                      )}
                    </div>
                  </button>
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    <div className="py-2">
                      {!user.isEmailVerified && (
                        <>
                          <button 
                            onClick={handleVerificationClick}
                            className="block w-full text-left px-4 py-2 text-sm text-orange-600 hover:bg-orange-50 flex items-center"
                          >
                            <Mail className="inline h-4 w-4 mr-2" />
                            Verify Email
                          </button>
                          <hr className="my-1" />
                        </>
                      )}
                      <button 
                        onClick={() => handleNavClick('profile')}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      >
                        Profile
                      </button>
                      {user.isShopOwner && (
                        <button 
                          onClick={() => handleNavClick('shop-dashboard')}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        >
                          Shop Dashboard
                        </button>
                      )}
                      <button 
                        onClick={() => handleNavClick('register-shop')}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      >
                        <Store className="inline h-4 w-4 mr-2" />
                        Register Shop
                      </button>
                      <hr className="my-1" />
                      <button
                        onClick={logout}
                        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                      >
                        Sign Out
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleAuthClick('login')}
                    className="px-4 py-2 text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => handleAuthClick('register')}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105"
                  >
                    Sign Up
                  </button>
                </div>
              )}

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 rounded-lg text-gray-600 hover:text-blue-600 hover:bg-gray-100 transition-colors duration-200"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 shadow-lg">
            <div className="px-4 py-3 space-y-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search iPhones..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
                />
              </div>
              {navigation.map((item) => (
                <button
                  key={item.key}
                  onClick={() => handleNavClick(item.key)}
                  className={`block w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                    currentPage === item.key
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                  }`}
                >
                  {item.name}
                </button>
              ))}
              
              {!isAuthenticated && (
                <div className="pt-3 border-t border-gray-200 space-y-2">
                  <button
                    onClick={() => handleAuthClick('login')}
                    className="block w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => handleAuthClick('register')}
                    className="block w-full text-left px-3 py-2 rounded-lg text-sm font-medium bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                  >
                    Sign Up
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Auth Modal */}
      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)}
        initialMode={authMode}
      />

      {/* Email Verification Modal */}
      {showVerification && user && (
        <EmailVerification 
          email={user.email} 
          onClose={() => setShowVerification(false)} 
        />
      )}
    </>
  );
};

export default Header;