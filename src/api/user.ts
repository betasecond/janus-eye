import type { User } from '@/types'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

/**
 * 获取所有用户
 * 注意：新API文档中未提供用户管理相关接口，需要补充
 */
export const getUsers = async (): Promise<User[]> => {
  const response = await fetch(`${API_BASE_URL}/api/users`)
  if (!response.ok) {
    throw new Error('Failed to fetch users')
  }
  return response.json()
} 