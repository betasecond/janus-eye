import type { StudentAnalysis } from '@/types'

const API_BASE_URL = 'http://localhost:3001/api';

/**
 * 获取学生分析数据
 */
export const getStudentAnalysis = async (): Promise<StudentAnalysis[]> => {
  const response = await fetch(`${API_BASE_URL}/analysis`);
  if (!response.ok) {
    throw new Error('Failed to fetch student analysis');
  }
  return response.json();
} 