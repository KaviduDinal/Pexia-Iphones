import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types';
import apiService from '../services/api.js';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  verifyEmail: (token: string) => Promise<void>;
  resendVerification: (email: string) => Promise<void>;
  isLoading: boolean;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check for existing token on mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      apiService.setToken(token);
      loadUserProfile();
    }
  }, []);

  const loadUserProfile = async () => {
    try {
      setIsLoading(true);
      const response = await apiService.getProfile();
      if (response.success) {
        setUser(response.user);
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error('Failed to load user profile:', error);
      logout();
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await apiService.login({ email, password });
      
      if (response.success) {
        apiService.setToken(response.token);
        setUser(response.user);
        setIsAuthenticated(true);
      } else {
        throw new Error(response.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await apiService.register({ name, email, password });
      
      if (response.success) {
        apiService.setToken(response.token);
        setUser(response.user);
        setIsAuthenticated(true);
      } else {
        throw new Error(response.message || 'Registration failed');
      }
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const verifyEmail = async (token: string) => {
    setIsLoading(true);
    try {
      const response = await apiService.verifyEmail(token);
      
      if (response.success) {
        // Reload user profile to get updated verification status
        await loadUserProfile();
      } else {
        throw new Error(response.message || 'Email verification failed');
      }
    } catch (error) {
      console.error('Email verification error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const resendVerification = async (email: string) => {
    setIsLoading(true);
    try {
      const response = await apiService.resendVerification(email);
      
      if (!response.success) {
        throw new Error(response.message || 'Failed to resend verification email');
      }
    } catch (error) {
      console.error('Resend verification error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    apiService.setToken(null);
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      register,
      logout,
      verifyEmail,
      resendVerification,
      isLoading,
      isAuthenticated
    }}>
      {children}
    </AuthContext.Provider>
  );
};