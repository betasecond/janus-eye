import type { Syllabus } from '@/types'

const API_BASE_URL = 'http://localhost:3001/api';

/**
 * 获取教学大纲
 */
export const getSyllabus = async (): Promise<Syllabus> => {
  const response = await fetch(`${API_BASE_URL}/syllabus`);
  if (!response.ok) {
    throw new Error('Failed to fetch syllabus');
  }
  return response.json();
} 