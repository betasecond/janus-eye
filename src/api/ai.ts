import type { StatusVO } from '@/types'
import { AI_CONFIG } from '@/config/ai'

// 如果需要embedding功能，可以在这里添加
// 目前主要关注聊天功能，所以暂时注释掉embedding相关代码

/*


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
*/

// 流式AI聊天响应类型
export interface StreamChatResponse {
  content: string
  done: boolean
}

/**
 * 直接调用通义千问API（流式输出）
 */
export const getAIChatResponseStream = async (
  message: string, 
  onChunk: (chunk: string) => void,
  onComplete: (fullResponse: string) => void,
  onError: (error: string) => void
): Promise<void> => {
  try {
    console.log('Sending message to AI:', message);
    
    const response = await fetch(AI_CONFIG.DASHSCOPE.BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${AI_CONFIG.DASHSCOPE.API_KEY}`,
      },
      body: JSON.stringify({
        model: AI_CONFIG.DASHSCOPE.MODEL,
        messages: [
          {
            role: 'system',
            content: AI_CONFIG.SYSTEM_PROMPT
          },
          {
            role: 'user',
            content: message
          }
        ],
        stream: true,
        temperature: AI_CONFIG.DASHSCOPE.TEMPERATURE,
        max_tokens: AI_CONFIG.DASHSCOPE.MAX_TOKENS
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`${AI_CONFIG.ERROR_MESSAGES.API_FAILED}: ${response.status} - ${errorText}`);
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
    onError(error instanceof Error ? error.message : AI_CONFIG.ERROR_MESSAGES.UNKNOWN_ERROR);
  }
};

/**
 * 直接调用通义千问API（非流式）
 */
export const getAIChatResponse = async (message: string): Promise<string> => {
  try {
    console.log('Sending message to AI:', message);
    
    const response = await fetch(AI_CONFIG.DASHSCOPE.BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${AI_CONFIG.DASHSCOPE.API_KEY}`,
      },
      body: JSON.stringify({
        model: AI_CONFIG.DASHSCOPE.MODEL,
        messages: [
          {
            role: 'system',
            content: AI_CONFIG.SYSTEM_PROMPT
          },
          {
            role: 'user',
            content: message
          }
        ],
        temperature: AI_CONFIG.DASHSCOPE.TEMPERATURE,
        max_tokens: AI_CONFIG.DASHSCOPE.MAX_TOKENS
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`${AI_CONFIG.ERROR_MESSAGES.API_FAILED}: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    const aiResponse = data.choices?.[0]?.message?.content || '抱歉，AI暂时无法回复。';
    
    console.log('Received AI response:', aiResponse);
    return aiResponse;
  } catch (error) {
    console.error('AI chat error:', error);
    throw new Error(error instanceof Error ? error.message : AI_CONFIG.ERROR_MESSAGES.UNKNOWN_ERROR);
  }
};
