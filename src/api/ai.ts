import type { StatusVO } from '@/types'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

/**
 * 文本向量化并存储
 */
export const storeEmbedding = async (message: string): Promise<StatusVO> => {
  const response = await fetch(`${API_BASE_URL}/ai/embedding/store`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ message }),
  })
  if (!response.ok) {
    throw new Error('Failed to store embedding')
  }
  return response.json()
}

/**
 * 文本向量化
 */
export const createEmbedding = async (message: string): Promise<any> => {
  const response = await fetch(`${API_BASE_URL}/ai/embedding`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ message }),
  })
  if (!response.ok) {
    throw new Error('Failed to create embedding')
  }
  return response.json()
}
