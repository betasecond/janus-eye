<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">练习中心</h1>

    <div v-if="loading" class="text-center text-gray-500">
      <p>正在加载题目...</p>
    </div>
    
    <div v-else-if="error" class="text-center text-red-500">
      <p>{{ error }}</p>
      <button @click="loadQuestions" class="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
        重试
      </button>
    </div>
    
    <div v-else-if="currentQuestion" class="max-w-2xl mx-auto bg-white shadow rounded-lg p-6">
      <!-- 问题 -->
      <div class="mb-6">
        <p class="text-gray-500 mb-1">题目 {{ currentIndex + 1 }}/{{ questions.length }}</p>
        <h2 class="text-xl font-semibold">{{ currentQuestion.content || currentQuestion.title }}</h2>
        <p class="text-sm text-gray-500 mt-2">难度: {{ getDifficultyText(currentQuestion.difficulty) }}</p>
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
        <button 
          class="px-6 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
          @click="previousQuestion"
          :disabled="currentIndex === 0"
          :class="{ 'opacity-50 cursor-not-allowed': currentIndex === 0 }"
        >
          上一题
        </button>
        <button 
          v-if="currentIndex < questions.length - 1"
          class="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          @click="nextQuestion"
        >
          下一题
        </button>
        <button 
          v-else
          class="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
          :disabled="selectedOption === null"
          :class="{ 'opacity-50 cursor-not-allowed': selectedOption === null }"
        >
          提交答案
        </button>
      </div>
    </div>
    <div v-else class="text-center text-gray-500">
      <p>没有可用的题目</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { Question } from '@/types';
import { getQuestions } from '@/api';
import { parseComplexQuestionData } from '@/utils/questionTransformer';

const questions = ref<Question[]>([]);
const currentQuestion = ref<Question | null>(null);
const selectedOption = ref<number | null>(null);
const loading = ref<boolean>(true);
const error = ref<string | null>(null);
const currentIndex = ref<number>(0);

// Load questions from API
const loadQuestions = async () => {
  try {
    loading.value = true;
    error.value = null;
    selectedOption.value = null;
    
    console.log('PracticeCenter: 开始加载题目...');
    
    // Get questions from API
    const response = await getQuestions();
    console.log('PracticeCenter: 获取到的原始响应:', response);
    
    // Use the new parsing function to handle the complex data structure
    questions.value = parseComplexQuestionData(response);
    console.log('PracticeCenter: 解析后的题目数组:', questions.value);
    
    // Set the first question as current if available
    if (questions.value.length > 0) {
      currentIndex.value = 0;
      currentQuestion.value = questions.value[0];
      console.log('PracticeCenter: 设置当前题目:', currentQuestion.value);
    } else {
      currentQuestion.value = null;
      error.value = '没有找到题目';
      console.warn('PracticeCenter: 没有找到任何题目');
    }
  } catch (e) {
    console.error('PracticeCenter: 加载题目时出错:', e);
    error.value = '加载题目失败，请重试';
  } finally {
    loading.value = false;
  }
};

// Navigate to the next question
const nextQuestion = () => {
  if (currentIndex.value < questions.value.length - 1) {
    currentIndex.value++;
    currentQuestion.value = questions.value[currentIndex.value];
    selectedOption.value = null;
  }
};

// Navigate to the previous question
const previousQuestion = () => {
  if (currentIndex.value > 0) {
    currentIndex.value--;
    currentQuestion.value = questions.value[currentIndex.value];
    selectedOption.value = null;
  }
};

// Get difficulty text in Chinese
const getDifficultyText = (difficulty: string): string => {
  const difficultyMap: Record<string, string> = {
    'EASY': '简单',
    'MEDIUM': '中等',
    'HARD': '困难'
  };
  return difficultyMap[difficulty] || '未知';
};

onMounted(() => {
  loadQuestions();
});

</script>
