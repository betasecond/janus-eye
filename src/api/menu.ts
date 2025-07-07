import type { MenuItem } from '@/types'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

/**
 * 获取教师导航菜单
 */
export const getTeacherMenu = async (): Promise<MenuItem[]> => {
  const response = await fetch(`${API_BASE_URL}/menu/teacher`);
  if (!response.ok) {
    throw new Error('Failed to fetch teacher menu');
  }
  return response.json();
}

/**
 * 获取学生导航菜单
 */
export const getStudentMenu = async (): Promise<MenuItem[]> => {
  const response = await fetch(`${API_BASE_URL}/menu/student`);
  if (!response.ok) {
    throw new Error('Failed to fetch student menu');
  }
  return response.json();
}

/**
 * 获取管理员导航菜单
 */
export const getAdminMenu = async (): Promise<MenuItem[]> => {
  const response = await fetch(`${API_BASE_URL}/menu/admin`);
  if (!response.ok) {
    throw new Error('Failed to fetch admin menu');
  }
  return response.json();
} 