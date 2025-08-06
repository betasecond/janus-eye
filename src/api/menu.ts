import type { MenuItem } from '@/types'
import { apiGet } from '@/config/api'

/**
 * 获取教师导航菜单
 * 注意：新API文档中未提供菜单相关接口，需要补充
 */
export const getTeacherMenu = (): Promise<MenuItem[]> => {
  return apiGet(`/api/menu/teacher`)
}

/**
 * 获取学生导航菜单
 */
export const getStudentMenu = (): Promise<MenuItem[]> => {
  return apiGet(`/api/menu/student`)
}

/**
 * 获取管理员导航菜单
 */
export const getAdminMenu = (): Promise<MenuItem[]> => {
  return apiGet(`/api/menu/admin`)
}
