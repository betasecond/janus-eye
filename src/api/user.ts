import type { User } from '@/types'
import { apiGet } from '@/config/api'

/**
 * 获取所有用户
 * 注意：新API文档中未提供用户管理相关接口，需要补充
 */
export const getUsers = (): Promise<User[]> => {
  return apiGet(`/api/users`)
}
