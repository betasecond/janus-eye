import type { Resource } from '@/types'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

/**
 * 获取所有资源
 * 注意：新API文档中未提供资源管理相关接口，需要补充
 */
export const getResources = async (): Promise<Resource[]> => {
  const response = await fetch(`${API_BASE_URL}/api/resources`)
  if (!response.ok) {
    throw new Error('Failed to fetch resources')
  }
  return response.json()
} 