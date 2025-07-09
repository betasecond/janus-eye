import type { Assignment } from '@/types'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

/**
 * 获取所有作业
 */
export const getAssignments = async (): Promise<Assignment[]> => {
  const response = await fetch(`${API_BASE_URL}/assignments`);
  if (!response.ok) {
    throw new Error('Failed to fetch assignments');
  }
  return response.json();
} 