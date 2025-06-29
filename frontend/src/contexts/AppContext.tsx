import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { iPhone, CartItem, Shop } from '../types';
import apiService from '../services/api.js';

interface AppContextType {
  iphones: iPhone[];
  shops: Shop[];
  cart: CartItem[];
  addToCart: (iphone: iPhone) => void;
  removeFromCart: (id: string) => void;
  updateCartQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  currentPage: string;
  setCurrentPage: (page: string) => void;
  loadIPhones: (params?: any) => Promise<void>;
  loadShops: (params?: any) => Promise<void>;
  isLoading: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentPage, setCurrentPage] = useState('home');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [iphones, setIPhones] = useState<iPhone[]>([]);
  const [shops, setShops] = useState<Shop[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('pexia_cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (error) {
        console.error('Failed to load cart from localStorage:', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('pexia_cart', JSON.stringify(cart));
  }, [cart]);

  // Load initial data
  useEffect(() => {
    loadIPhones();
    loadShops();
  }, []);

  const loadIPhones = async (params = {}) => {
    try {
      setIsLoading(true);
      const response = await apiService.getIPhones(params);
      if (response.success) {
        setIPhones(response.iphones);
      }
    } catch (error) {
      console.error('Failed to load iPhones:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadShops = async (params = {}) => {
    try {
      const response = await apiService.getShops(params);
      if (response.success) {
        setShops(response.shops);
      }
    } catch (error) {
      console.error('Failed to load shops:', error);
    }
  };

  const addToCart = (iphone: iPhone) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === iphone.id);
      if (existing) {
        return prev.map(item =>
          item.id === iphone.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { id: iphone.id, iphone, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateCartQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCart(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <AppContext.Provider value={{
      iphones,
      shops,
      cart,
      addToCart,
      removeFromCart,
      updateCartQuantity,
      clearCart,
      currentPage,
      setCurrentPage,
      loadIPhones,
      loadShops,
      isLoading
    }}>
      {children}
    </AppContext.Provider>
  );
};