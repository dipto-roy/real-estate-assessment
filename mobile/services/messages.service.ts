import apiClient from './api';

export interface Message {
  id: string;
  chatId: string;
  senderId: string;
  content: string;
  timestamp: string;
  sender?: any;
  chat?: any;
}

export interface PaginatedMessages {
  data: Message[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export const messagesService = {
  async getAll(chatId?: string, page: number = 1, limit: number = 50): Promise<PaginatedMessages> {
    const params = new URLSearchParams();
    if (chatId) params.append('chatId', chatId);
    params.append('page', page.toString());
    params.append('limit', limit.toString());

    const response = await apiClient.get(`/messages?${params.toString()}`);
    return response.data;
  },

  async create(data: {
    chatId: string;
    senderId: string;
    content: string;
  }): Promise<Message> {
    const response = await apiClient.post('/messages', data);
    return response.data;
  },
};
