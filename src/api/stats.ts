import type { PerformanceStats } from '@/types'
import { transformAndValidateStats } from '@/utils/dataTransformers'
import { apiGet } from '@/config/api'

/**
 * 获取性能统计数据
 * 返回经过转换和验证的数据，确保所有必要的属性都存在
 */
export const getPerformanceStats = async (): Promise<PerformanceStats> => {
  try {
    const data = await apiGet(`/api/stats`)
    return transformAndValidateStats(data)
  } catch (error) {
    console.error('Error fetching performance stats:', error)
    // Return default stats in case of error
    return transformAndValidateStats(null)
  }
}
