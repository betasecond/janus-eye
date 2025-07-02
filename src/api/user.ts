import type { User } from '@/types'

const API_BASE_URL = 'http://localhost:3001/api';

/**
 * 获取所有用户
 */
export const getUsers = async (): Promise<User[]> => {
  const response = await fetch(`${API_BASE_URL}/users`);
  if (!response.ok) {
    throw new Error('Failed to fetch users');
  }
  return response.json();
} 