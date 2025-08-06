import type { Resource } from '@/types'
import { apiGet } from '@/config/api'

/**
 * 获取所有资源
 * 注意：新API文档中未提供资源管理相关接口，需要补充
 */
export const getResources = (currentUserId: string): Promise<Resource[]> => {
  return apiGet(`/api/resources`, { currentUserId })
}
