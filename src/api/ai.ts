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

// 流式AI聊天响应类型
export interface StreamChatResponse {
  content: string
  done: boolean
}

/**
 * 获取AI聊天回复（流式输出）
 */
export const getAIChatResponseStream = async (
  message: string, 
  onChunk: (chunk: string) => void,
  onComplete: (fullResponse: string) => void,
  onError: (error: string) => void
): Promise<void> => {
  try {
    console.log('Sending message to AI:', message);
    
    const response = await fetch(`${API_BASE_URL}/ai/chat/stream`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message,
        model: 'qwen-turbo-latest', // 使用您配置的模型
        temperature: 0.7,
        maxTokens: 2000
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    if (!response.body) {
      throw new Error('Response body is null');
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let fullResponse = '';

    try {
      while (true) {
        const { done, value } = await reader.read();
        
        if (done) {
          break;
        }

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6);
            
            if (data === '[DONE]') {
              onComplete(fullResponse);
              return;
            }

            try {
              const parsed = JSON.parse(data);
              if (parsed.choices && parsed.choices[0] && parsed.choices[0].delta && parsed.choices[0].delta.content) {
                const content = parsed.choices[0].delta.content;
                fullResponse += content;
                onChunk(content);
              }
            } catch (e) {
              console.warn('Failed to parse SSE data:', e);
            }
          }
        }
      }
    } finally {
      reader.releaseLock();
    }

    onComplete(fullResponse);
  } catch (error) {
    console.error('AI chat stream error:', error);
    onError(error instanceof Error ? error.message : '未知错误');
  }
};

/**
 * 获取AI聊天回复（非流式，兼容旧版本）
 */
export const getAIChatResponse = async (message: string): Promise<string> => {
  try {
    console.log('Sending message to AI:', message);
    
    const response = await fetch(`${API_BASE_URL}/ai/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message,
        model: 'qwen-turbo-latest',
        temperature: 0.7,
        maxTokens: 2000
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    const aiResponse = data.choices?.[0]?.message?.content || '抱歉，AI暂时无法回复。';
    
    console.log('Received AI response:', aiResponse);
    return aiResponse;
  } catch (error) {
    console.error('AI chat error:', error);
    throw new Error(error instanceof Error ? error.message : 'AI服务暂时不可用');
  }
};
