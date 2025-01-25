import { api } from './interceptor';

interface ListItemRequest {
  status: 'TODO' | 'DOING' | 'DONE';
  offset: number;
  limit: number;
  sortBy: string;
  sortDirection: 'ASC' | 'DESC';
}

export interface Task {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  status: string;
}

interface ListItemResponse {
  tasks: Task[];
  pageNumber: number;
  totalPages: number;
}
export const getListItem = async ({
  status,
  offset = 0,
  limit = 10,
  sortBy = 'createAt',
  sortDirection = 'ASC',
}: ListItemRequest): Promise<ListItemResponse> => {
  const query = `offset=${offset}&limit=${limit}&sortBy=${sortBy}&isAsc=${
    sortDirection === 'ASC'
  }&status=${status}`;
  const response = await api.get(`todo-list?${query}`);
  return response.data;
};
