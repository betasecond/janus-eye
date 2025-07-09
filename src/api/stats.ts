import type { PerformanceStatsVO } from '@/types'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

/**
 * 获取性能统计数据
 */
export const getPerformanceStats = async (): Promise<PerformanceStatsVO> => {
  const response = await fetch(`${API_BASE_URL}/api/stats`)
  if (!response.ok) {
    throw new Error('Failed to fetch performance stats')
  }
  return response.json()
} 