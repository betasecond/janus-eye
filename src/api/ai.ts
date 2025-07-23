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

export const getAIChatResponse = async (message: string): Promise<string> => {
  console.log('Sending message to AI:', message);
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1500));

  const response = `这是对您消息“${message}”的模拟AI回复。真实的回复将来自您配置的大语言模型。`;
  
  console.log('Received AI response:', response);
  return response;
};
