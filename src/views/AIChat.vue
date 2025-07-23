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
            <p>{{ message.text }}</p>
          </div>

           <!-- 用户头像 -->
          <div v-if="message.isUser" class="flex items-center justify-center shrink-0 size-10 rounded-full bg-gray-200 text-gray-600 font-bold">
            我
          </div>
        </div>
         <!-- 加载提示 -->
        <div v-if="isLoading" class="flex items-start gap-4 justify-start">
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
            :disabled="isLoading"
          ></textarea>
          <button @click="handleSendMessage" :disabled="isLoading || !userInput.trim()" class="px-6 py-3 bg-blue-500 text-white font-semibold rounded-xl hover:bg-blue-600 transition-colors disabled:bg-blue-300 disabled:cursor-not-allowed">
            发送
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick } from 'vue';
import { getAIChatResponse } from '@/api/ai';

interface Message {
  text: string;
  isUser: boolean;
}

const userInput = ref('');
const messages = ref<Message[]>([
  { text: '你好！我是你的 AI 助教。关于课程的任何问题，随时都可以问我。比如：“请解释一下什么是Vue的响应式系统？”', isUser: false }
]);
const isLoading = ref(false);
const messageContainer = ref<HTMLElement | null>(null);

const scrollToBottom = () => {
  nextTick(() => {
    if (messageContainer.value) {
      messageContainer.value.scrollTop = messageContainer.value.scrollHeight;
    }
  });
};

const handleSendMessage = async () => {
  const text = userInput.value.trim();
  if (!text || isLoading.value) return;

  // 1. 将用户消息添加到对话列表
  messages.value.push({ text, isUser: true });
  userInput.value = '';
  scrollToBottom();

  // 2. 显示加载状态并调用API
  isLoading.value = true;
  try {
    const aiResponse = await getAIChatResponse(text);
    // 3. 将AI回复添加到对话列表
    messages.value.push({ text: aiResponse, isUser: false });
  } catch (error) {
    console.error("AI chat error:", error);
    messages.value.push({ text: '抱歉，AI开小差了，请稍后再试。', isUser: false });
  } finally {
    // 4. 结束加载状态
    isLoading.value = false;
    scrollToBottom();
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
</style> 