import type { Course } from '@/types'

const API_BASE_URL = 'http://localhost:3001/api';

/**
 * 获取所有课程
 */
export const getCourses = async (): Promise<Course[]> => {
  const response = await fetch(`${API_BASE_URL}/courses`);
  if (!response.ok) {
    throw new Error('Failed to fetch courses');
  }
  return response.json();
} 