const API_BASE_URL = 'http://localhost:5000/api';

class ApiService {
  constructor() {
    this.token = localStorage.getItem('token');
  }

  setToken(token) {
    this.token = token;
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }

  getHeaders() {
    const headers = {
      'Content-Type': 'application/json',
    };

    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`;
    }

    return headers;
  }

  async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const config = {
      headers: this.getHeaders(),
      ...options,
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      return data;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Auth methods
  async register(userData) {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async login(credentials) {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  }

  async verifyEmail(token) {
    return this.request('/auth/verify-email', {
      method: 'POST',
      body: JSON.stringify({ token }),
    });
  }

  async resendVerification(email) {
    return this.request('/auth/resend-verification', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  }

  // User methods
  async getProfile() {
    return this.request('/users/profile');
  }

  async updateProfile(profileData) {
    return this.request('/users/profile', {
      method: 'PUT',
      body: JSON.stringify(profileData),
    });
  }

  // Shop methods
  async getShops(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/shops${queryString ? `?${queryString}` : ''}`);
  }

  async registerShop(shopData) {
    return this.request('/shops/register', {
      method: 'POST',
      body: JSON.stringify(shopData),
    });
  }

  async getShop(id) {
    return this.request(`/shops/${id}`);
  }

  // iPhone methods
  async getIPhones(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/iphones${queryString ? `?${queryString}` : ''}`);
  }

  async getIPhone(id) {
    return this.request(`/iphones/${id}`);
  }

  async addIPhone(iphoneData) {
    return this.request('/iphones', {
      method: 'POST',
      body: JSON.stringify(iphoneData),
    });
  }

  // Order methods
  async createOrder(orderData) {
    return this.request('/orders', {
      method: 'POST',
      body: JSON.stringify(orderData),
    });
  }

  async getMyOrders() {
    return this.request('/orders/my-orders');
  }
}

export default new ApiService();