import apiClient from './api';

export interface GroupChat {
  id: string;
  projectId?: string;
  mlsId?: string;
  propertyId?: string;
  createdAt: string;
  project?: any;
  groupChatUsers?: any[];
  _count?: any;
}

export const groupChatsService = {
  async getAll(): Promise<GroupChat[]> {
    const response = await apiClient.get('/group-chats');
    return response.data;
  },

  async getById(id: string): Promise<GroupChat> {
    const response = await apiClient.get(`/group-chats/${id}`);
    return response.data;
  },

  async create(data: {
    projectId?: string;
    mlsId?: string;
    propertyId?: string;
  }): Promise<GroupChat> {
    const response = await apiClient.post('/group-chats', data);
    return response.data;
  },

  async addUser(chatId: string, userId: string): Promise<any> {
    const response = await apiClient.post(`/group-chats/${chatId}/users`, { userId });
    return response.data;
  },
};
