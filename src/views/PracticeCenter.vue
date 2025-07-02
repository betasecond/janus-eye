<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">练习中心</h1>

    <div class="max-w-2xl mx-auto bg-white shadow rounded-lg p-6">
      <!-- 问题 -->
      <div class="mb-6">
        <p class="text-gray-500 mb-1">题目 1/10</p>
        <h2 class="text-xl font-semibold">{{ currentQuestion.title }}</h2>
      </div>

      <!-- 选项 -->
      <div class="space-y-4 mb-8">
        <div 
          v-for="(option, index) in currentQuestion.options" 
          :key="index"
          @click="selectedOption = index"
          class="p-4 border rounded-lg cursor-pointer transition-colors"
          :class="{ 
            'bg-blue-100 border-blue-500': selectedOption === index,
            'hover:bg-gray-100': selectedOption !== index
          }"
        >
          {{ option }}
        </div>
      </div>

      <!-- 操作按钮 -->
      <div class="flex justify-between">
        <button class="px-6 py-2 bg-gray-300 rounded-lg hover:bg-gray-400">上一题</button>
        <button 
          class="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          :disabled="selectedOption === null"
          :class="{ 'opacity-50 cursor-not-allowed': selectedOption === null }"
        >
          提交答案
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const currentQuestion = ref({
  title: '在Vue 3中，用于定义响应式数据的最佳实践是什么？',
  options: [
    '使用 `Vue.set`',
    '直接修改 `data` 对象',
    '使用 `ref` 或 `reactive`',
    '将所有数据放在 `methods` 中'
  ],
  correctAnswer: 2
});

const selectedOption = ref<number | null>(null);
</script> 