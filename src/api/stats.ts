import type { PerformanceStats } from '@/types'

const API_BASE_URL = 'http://localhost:3001/api';

/**
 * 获取性能统计数据
 */
export const getPerformanceStats = async (): Promise<PerformanceStats> => {
  const response = await fetch(`${API_BASE_URL}/stats`);
  if (!response.ok) {
    throw new Error('Failed to fetch performance stats');
  }
  return response.json();
} 