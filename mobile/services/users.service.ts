import apiClient from './api';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'buyer' | 'seller' | 'realtor';
  createdAt: string;
  updatedAt: string;
}

export const usersService = {
  /**
   * Get all users (requires authentication)
   */
  async getAll(): Promise<User[]> {
    const response = await apiClient.get('/users');
    return response.data;
  },

  /**
   * Get user by ID (requires authentication)
   */
  async getById(id: string): Promise<User> {
    const response = await apiClient.get(`/users/${id}`);
    return response.data;
  },

  /**
   * Create a new user (no authentication required)
   * Note: For authentication, use authService.register() instead
   */
  async create(data: {
    name: string;
    email: string;
    password: string;
    role: 'buyer' | 'seller' | 'realtor';
  }): Promise<User> {
    const response = await apiClient.post('/users', data);
    return response.data;
  },
};
