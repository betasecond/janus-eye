import type { Question } from '@/types'

const API_BASE_URL = 'http://localhost:3001/api';

/**
 * 获取所有题目
 */
export const getQuestions = async (): Promise<Question[]> => {
  const response = await fetch(`${API_BASE_URL}/questions`);
  if (!response.ok) {
    throw new Error('Failed to fetch questions');
  }
  return response.json();
} 