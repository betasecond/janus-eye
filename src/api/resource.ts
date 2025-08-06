import type { Resource } from '@/types'



/**
 * 获取所有资源
 * 注意：新API文档中未提供资源管理相关接口，需要补充
 */
export const getResources = async (currentUserId: string): Promise<Resource[]> => {
  const response = await fetch(`/api/resources?currentUserId=${currentUserId}`)
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: 'Failed to fetch resources' }));
    throw new Error(errorData.message || 'Failed to fetch resources');
  }
  return response.json()
} 