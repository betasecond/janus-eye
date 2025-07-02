<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">练习中心</h1>

    <div v-if="currentQuestion" class="max-w-2xl mx-auto bg-white shadow rounded-lg p-6">
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
    <div v-else class="text-center text-gray-500">
      <p>Loading question...</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { Question } from '@/types';
import { getQuestions } from '@/api';

const questions = ref<Question[]>([]);
const currentQuestion = ref<Question | null>(null);
const selectedOption = ref<number | null>(null);

onMounted(async () => {
  questions.value = await getQuestions();
  if (questions.value.length > 0) {
    currentQuestion.value = questions.value[0];
  }
});

</script> 