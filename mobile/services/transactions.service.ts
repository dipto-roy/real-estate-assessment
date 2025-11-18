import apiClient from './api';

export interface Transaction {
  id: string;
  projectId: string;
  buyerId: string;
  sellerId: string;
  amount: number;
  timestamp: string;
  buyer?: any;
  seller?: any;
  project?: any;
}

export interface PaginatedTransactions {
  data: Transaction[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export const transactionsService = {
  async getAll(projectId?: string, page: number = 1, limit: number = 10): Promise<PaginatedTransactions> {
    const params = new URLSearchParams();
    if (projectId) params.append('projectId', projectId);
    params.append('page', page.toString());
    params.append('limit', limit.toString());

    const response = await apiClient.get(`/transactions?${params.toString()}`);
    return response.data;
  },

  async create(data: {
    projectId: string;
    buyerId: string;
    sellerId: string;
    amount: number;
  }): Promise<Transaction> {
    const response = await apiClient.post('/transactions', data);
    return response.data;
  },
};
