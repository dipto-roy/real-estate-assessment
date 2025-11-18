import apiClient from './api';

export interface Project {
  id: string;
  name: string;
  description?: string;
  createdById: string;
  createdAt: string;
  updatedAt: string;
  createdBy?: any;
  _count?: any;
}

export const projectsService = {
  async getAll(): Promise<Project[]> {
    const response = await apiClient.get('/projects');
    return response.data;
  },

  async getById(id: string): Promise<Project> {
    const response = await apiClient.get(`/projects/${id}`);
    return response.data;
  },

  async create(data: { name: string; description?: string; createdById: string }): Promise<Project> {
    const response = await apiClient.post('/projects', data);
    return response.data;
  },
};
