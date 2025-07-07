import type { Notification } from '@/types'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

/**
 * 获取所有通知
 */
export const getNotifications = async (): Promise<Notification[]> => {
  const response = await fetch(`${API_BASE_URL}/notifications`);
  if (!response.ok) {
    throw new Error('Failed to fetch notifications');
  }
  return response.json();
} 