import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Change this to your actual backend URL
// Update this with your backend server IP (use your machine's IP, not localhost, for physical devices)
const API_BASE_URL = 'http://192.168.0.146:3000';

const TOKEN_KEY = 'auth_token';
const USER_KEY = 'user_data';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to include JWT token
apiClient.interceptors.request.use(
  async (config) => {
    try {
      const token = await AsyncStorage.getItem(TOKEN_KEY);
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error('Error getting token:', error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// Auth helpers
export const authService = {
  async login(email: string, password: string) {
    const response = await apiClient.post('/auth/login', { email, password });
    const { access_token, user } = response.data;
    await AsyncStorage.setItem(TOKEN_KEY, access_token);
    await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
    return response.data;
  },

  async register(name: string, email: string, password: string, role: string) {
    const response = await apiClient.post('/auth/register', { name, email, password, role });
    const { access_token, user } = response.data;
    await AsyncStorage.setItem(TOKEN_KEY, access_token);
    await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
    return response.data;
  },

  async logout() {
    await AsyncStorage.removeItem(TOKEN_KEY);
    await AsyncStorage.removeItem(USER_KEY);
  },

  async getToken() {
    return await AsyncStorage.getItem(TOKEN_KEY);
  },

  async getUser() {
    const userStr = await AsyncStorage.getItem(USER_KEY);
    return userStr ? JSON.parse(userStr) : null;
  },

  async isAuthenticated() {
    const token = await AsyncStorage.getItem(TOKEN_KEY);
    return !!token;
  }
};

export default apiClient;
