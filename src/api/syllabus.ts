import type { Syllabus } from '@/types'
import { apiGet } from '@/config/api'

/**
 * 获取教学大纲
 * 注意：新API文档中未提供教学大纲相关接口，需要补充
 */
export const getSyllabus = (): Promise<Syllabus> => {
  return apiGet(`/api/syllabus`)
}
