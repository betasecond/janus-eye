<template>
  <div class="flex-1 flex flex-col h-full p-4 md:p-6 lg:p-8 gap-4">
    <h1 class="text-3xl font-bold text-gray-800">AI 助教</h1>
    <div class="flex-1 flex flex-col bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
      <!-- 消息显示区域 -->
      <div class="flex-1 p-6 space-y-6 overflow-y-auto">
        <!-- 欢迎消息 -->
        <div class="flex items-start gap-4">
          <div class="flex items-center justify-center shrink-0 size-10 rounded-full bg-blue-500 text-white font-bold">
            AI
          </div>
          <div class="bg-gray-100 rounded-xl p-4 max-w-lg">
            <p class="font-medium text-gray-800">你好！我是你的 AI 助教。</p>
            <p class="text-gray-600">关于课程的任何问题，随时都可以问我。比如：“请解释一下什么是Vue的响应式系统？”</p>
          </div>
        </div>

        <!-- 用户消息示例 -->
        <div class="flex items-start gap-4 justify-end">
           <div class="bg-blue-500 text-white rounded-xl p-4 max-w-lg">
            <p>Vue的响应式系统是如何工作的？</p>
          </div>
          <div class="flex items-center justify-center shrink-0 size-10 rounded-full bg-gray-200 text-gray-600 font-bold">
            我
          </div>
        </div>
      </div>
      
      <!-- 输入区域 -->
      <div class="p-4 bg-white border-t border-gray-200">
        <div class="flex items-center gap-4">
          <textarea
            placeholder="在这里输入你的问题..."
            class="flex-1 resize-none border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-blue-300 focus:border-blue-300 transition-all"
            rows="1"
          ></textarea>
          <button class="px-6 py-3 bg-blue-500 text-white font-semibold rounded-xl hover:bg-blue-600 transition-colors disabled:bg-blue-300">
            发送
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const userInput = ref('');
const messages = ref([]);
const isLoading = ref(false);

// 后续将在这里实现发送消息和处理AI回复的逻辑
</script>

<style scoped>
/* 自动调整textarea高度 */
textarea {
  field-sizing: content;
}
</style> 