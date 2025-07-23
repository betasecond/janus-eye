<template>
  <div class="flex-1 flex flex-col h-full p-4 md:p-6 lg:p-8 gap-4">
    <h1 class="text-3xl font-bold text-gray-800">AI 助教</h1>
    <div class="flex-1 flex flex-col bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
      <!-- 消息显示区域 -->
      <div ref="messageContainer" class="flex-1 p-6 space-y-6 overflow-y-auto">
        <!-- 对话消息 -->
        <div v-for="(message, index) in messages" :key="index" :class="message.isUser ? 'justify-end' : 'justify-start'" class="flex items-start gap-4">
          <!-- AI头像 -->
          <div v-if="!message.isUser" class="flex items-center justify-center shrink-0 size-10 rounded-full bg-blue-500 text-white font-bold">
            AI
          </div>
          
          <!-- 消息气泡 -->
          <div :class="message.isUser ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-800'" class="rounded-xl p-4 max-w-lg">
            <p v-if="message.isUser">{{ message.text }}</p>
            <div v-else v-html="message.html" class="markdown-content"></div>
          </div>

           <!-- 用户头像 -->
          <div v-if="message.isUser" class="flex items-center justify-center shrink-0 size-10 rounded-full bg-gray-200 text-gray-600 font-bold">
            我
          </div>
        </div>
         <!-- 流式输出光标 -->
        <div v-if="isStreaming" class="flex items-start gap-4 justify-start">
          <div class="flex items-center justify-center shrink-0 size-10 rounded-full bg-blue-500 text-white font-bold">
            AI
          </div>
          <div class="bg-gray-100 rounded-xl p-4 max-w-lg relative">
            <div class="text-gray-800 markdown-content" v-html="currentStreamingHtml + '<span class=\'typing-cursor\'>|</span>'"></div>
            <button 
              @click="stopStreaming" 
              class="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600 transition-colors"
              title="停止生成"
            >
              ×
            </button>
          </div>
        </div>
         <!-- 加载提示 -->
        <div v-if="isLoading && !isStreaming" class="flex items-start gap-4 justify-start">
          <div class="flex items-center justify-center shrink-0 size-10 rounded-full bg-blue-500 text-white font-bold">
            AI
          </div>
          <div class="bg-gray-100 rounded-xl p-4 max-w-lg">
            <div class="flex items-center gap-2">
              <span class="dot-loader"></span>
              <span class="dot-loader animation-delay-200"></span>
              <span class="dot-loader animation-delay-400"></span>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 输入区域 -->
      <div class="p-4 bg-white border-t border-gray-200">
        <div class="flex items-center gap-4">
          <textarea
            v-model="userInput"
            @keydown.enter.prevent="handleSendMessage"
            placeholder="在这里输入你的问题..."
            class="flex-1 resize-none border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-blue-300 focus:border-blue-300 transition-all"
            rows="1"
            :disabled="isLoading || isStreaming"
          ></textarea>
          <button @click="handleSendMessage" :disabled="isLoading || isStreaming || !userInput.trim()" class="px-6 py-3 bg-blue-500 text-white font-semibold rounded-xl hover:bg-blue-600 transition-colors disabled:bg-blue-300 disabled:cursor-not-allowed">
            发送
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick } from 'vue';
import { getAIChatResponseStream, getAIChatResponse } from '@/api/ai';
import { parseMarkdownSync } from '@/utils/markdown';

interface Message {
  text: string;
  isUser: boolean;
  html?: string; // 添加HTML字段用于存储解析后的Markdown
}

const userInput = ref('');
const messages = ref<Message[]>([
  { 
    text: '你好！我是你的 AI 助教。关于课程的任何问题，随时都可以问我。比如："请解释一下冯·诺依曼体系结构的基本组成部分？"', 
    isUser: false,
    html: '你好！我是你的 AI 助教。关于课程的任何问题，随时都可以问我。比如："请解释一下冯·诺依曼体系结构的基本组成部分？"'
  }
]);

const isLoading = ref(false);
const isStreaming = ref(false);
const currentStreamingText = ref('');
const currentStreamingHtml = ref('');
const messageContainer = ref<HTMLElement | null>(null);
const streamController = ref<AbortController | null>(null);

const scrollToBottom = () => {
  nextTick(() => {
    if (messageContainer.value) {
      messageContainer.value.scrollTop = messageContainer.value.scrollHeight;
    }
  });
};

// 使用真实AI流式输出
const streamFromAI = async (message: string) => {
  currentStreamingText.value = '';
  currentStreamingHtml.value = '';
  isStreaming.value = true;
  
  try {
    await getAIChatResponseStream(
      message,
      // onChunk: 处理每个流式数据块
      (chunk: string) => {
        currentStreamingText.value += chunk;
        // 实时解析Markdown
        currentStreamingHtml.value = parseMarkdownSync(currentStreamingText.value);
        scrollToBottom();
      },
      // onComplete: 流式输出完成
      (fullResponse: string) => {
        isStreaming.value = false;
        const html = parseMarkdownSync(fullResponse);
        messages.value.push({ 
          text: fullResponse, 
          isUser: false,
          html: html
        });
        scrollToBottom();
      },
      // onError: 错误处理
      (error: string) => {
        isStreaming.value = false;
        const errorMessage = `抱歉，AI服务出现错误：${error}`;
        messages.value.push({ 
          text: errorMessage, 
          isUser: false,
          html: errorMessage
        });
        scrollToBottom();
      }
    );
  } catch (error) {
    console.error('Stream error:', error);
    isStreaming.value = false;
    const errorMessage = '抱歉，AI服务暂时不可用，请稍后重试。';
    messages.value.push({ 
      text: errorMessage, 
      isUser: false,
      html: errorMessage
    });
    scrollToBottom();
  }
};

// 模拟流式输出（备用方案）
const streamText = async (fullText: string) => {
  currentStreamingText.value = '';
  currentStreamingHtml.value = '';
  
  // 创建新的 AbortController 用于中断流式输出
  streamController.value = new AbortController();
  
  try {
    // 按字符输出，提供更自然的打字效果
    for (let i = 0; i < fullText.length; i++) {
      // 检查是否被中断
      if (streamController.value.signal.aborted) {
        break;
      }
      
      currentStreamingText.value += fullText[i];
      // 实时解析Markdown
      currentStreamingHtml.value = parseMarkdownSync(currentStreamingText.value);
      scrollToBottom();
      
      // 根据字符类型调整延迟
      let delay = 30; // 基础延迟
      
      // 标点符号稍作停顿
      if (['。', '！', '？', '.', '!', '?', '，', ',', '；', ';'].includes(fullText[i])) {
        delay = 200;
      }
      // 换行符稍作停顿
      else if (fullText[i] === '\n') {
        delay = 300;
      }
      // 添加一些随机性，让打字更自然
      else {
        delay += Math.random() * 20;
      }
      
      await new Promise(resolve => setTimeout(resolve, delay));
    }
    
    // 流式输出完成
    isStreaming.value = false;
    const html = parseMarkdownSync(currentStreamingText.value);
    messages.value.push({ 
      text: currentStreamingText.value, 
      isUser: false,
      html: html
    });
    scrollToBottom();
  } catch (error: any) {
    if (error.name === 'AbortError') {
      // 流式输出被中断
      isStreaming.value = false;
      const html = parseMarkdownSync(currentStreamingText.value + '...');
      messages.value.push({ 
        text: currentStreamingText.value + '...', 
        isUser: false,
        html: html
      });
      scrollToBottom();
    }
  } finally {
    streamController.value = null;
  }
};

// 中断流式输出
const stopStreaming = () => {
  if (streamController.value) {
    streamController.value.abort();
  }
  // 对于真实AI流式输出，我们无法直接中断，但可以标记状态
  isStreaming.value = false;
};

const handleSendMessage = async () => {
  const text = userInput.value.trim();
  if (!text || isLoading.value || isStreaming.value) return;

  // 1. 将用户消息添加到对话列表
  messages.value.push({ text, isUser: true, html: text });
  userInput.value = '';
  scrollToBottom();

  // 2. 显示加载状态
  isLoading.value = true;
  
  try {
    // 3. 尝试使用真实AI流式输出
    isLoading.value = false;
    await streamFromAI(text);
  } catch (error) {
    console.error("AI chat error:", error);
    isLoading.value = false;
    
    // 如果真实AI不可用，回退到模拟流式输出
    try {
      const fallbackResponse = await getAIChatResponse(text);
      isStreaming.value = true;
      await streamText(fallbackResponse);
    } catch (fallbackError) {
      const errorMessage = '抱歉，AI服务暂时不可用，请稍后重试。';
      messages.value.push({ 
        text: errorMessage, 
        isUser: false,
        html: errorMessage
      });
      scrollToBottom();
    }
  }
};
</script>

<style scoped>
/* 自动调整textarea高度 */
textarea {
  field-sizing: content;
}

.dot-loader {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #A0AEC0; /* gray-400 */
  animation: bounce 1.4s infinite ease-in-out both;
}

.animation-delay-200 {
  animation-delay: -0.16s;
}

.animation-delay-400 {
  animation-delay: -0.32s;
}

@keyframes bounce {
  0%, 80%, 100% {
    transform: scale(0);
  }
  40% {
    transform: scale(1.0);
  }
}

/* 打字光标动画 */
.typing-cursor {
  animation: blink 1s infinite;
  color: #3B82F6; /* blue-500 */
  font-weight: bold;
}

@keyframes blink {
  0%, 50% {
    opacity: 1;
  }
  51%, 100% {
    opacity: 0;
  }
}

/* Markdown 样式优化 */
.markdown-content {
  line-height: 1.6;
}

.markdown-content h1,
.markdown-content h2,
.markdown-content h3,
.markdown-content h4,
.markdown-content h5,
.markdown-content h6 {
  margin-top: 1rem;
  margin-bottom: 0.5rem;
  font-weight: 600;
}

.markdown-content p {
  margin-bottom: 0.75rem;
}

.markdown-content ul,
.markdown-content ol {
  margin-left: 1.5rem;
  margin-bottom: 0.75rem;
}

.markdown-content li {
  margin-bottom: 0.25rem;
}

.markdown-content code {
  background-color: #f3f4f6;
  padding: 0.125rem 0.25rem;
  border-radius: 0.25rem;
  font-size: 0.875rem;
  font-family: 'Courier New', monospace;
}

.markdown-content pre {
  background-color: #f3f4f6;
  padding: 1rem;
  border-radius: 0.5rem;
  overflow-x: auto;
  margin: 0.75rem 0;
}

.markdown-content pre code {
  background: none;
  padding: 0;
}

.markdown-content blockquote {
  border-left: 4px solid #3b82f6;
  padding-left: 1rem;
  margin: 0.75rem 0;
  font-style: italic;
  color: #6b7280;
}

.markdown-content a {
  color: #3b82f6;
  text-decoration: underline;
}

.markdown-content a:hover {
  color: #1d4ed8;
}

.markdown-content hr {
  border: none;
  border-top: 1px solid #e5e7eb;
  margin: 1rem 0;
}
</style> 