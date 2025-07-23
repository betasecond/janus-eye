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
import type { Question, PageVO } from '@/types';
import { getQuestions } from '@/api';
import { transformQuestionsData } from '@/utils/questionTransformer';

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
    
    // Get questions from API
    const response = await getQuestions();
    
    // Check if we got a PageVO response or a direct array
    let questionData;
    if (response && 'content' in response) {
      // It's a PageVO response
      questionData = (response as PageVO<any>).content;
    } else if (Array.isArray(response)) {
      // It's a direct array
      questionData = response;
    } else {
      // Try to parse it as JSON if it's a string
      try {
        const parsedData = typeof response === 'string' ? JSON.parse(response) : response;
        questionData = Array.isArray(parsedData) ? parsedData : [];
      } catch (e) {
        console.error('Failed to parse question data:', e);
        questionData = [];
      }
    }
    
    // For testing with the provided JSON data
    if (questionData.length === 0) {
      // Use the provided JSON data as fallback
      const testData = `[{"id": "e4eebc99-9c0b-4ef8-bb6d-6bb9bd380a15","type": "SINGLE_CHOICE","difficulty": "EASY","content": "Python中声明变量的关键字是什么？","explanation": "Python中不需要特殊关键字声明变量，直接赋值即可","knowledgePoints": [{"id": "g6eebc99-9c0b-4ef8-bb6d-6bb9bd380a17","name": "变量","description": "Python变量声明","subject": "Python基础"}],"creator": {"id": "a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11","displayName": "张老师","avatarUrl": "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face","role": "TEACHER"},"createdAt": "2025-07-05T11:00:00Z","updatedAt": "2025-07-05T11:00:00Z"},{"id": "f5eebc99-9c0b-4ef8-bb6d-6bb9bd380a16","type": "MULTIPLE_CHOICE","difficulty": "MEDIUM","content": "Python中哪些是可变数据类型？","explanation": "list, dict, set是可变数据类型","knowledgePoints": [{"id": "h7eebc99-9c0b-4ef8-bb6d-6bb9bd380a18","name": "数据结构","description": "Python数据结构","subject": "Python基础"}],"creator": {"id": "a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11","displayName": "张老师","avatarUrl": "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face","role": "TEACHER"},"createdAt": "2025-07-05T11:00:00Z","updatedAt": "2025-07-05T11:00:00Z"},{"id": "g6eebc99-9c0b-4ef8-bb6d-6bb9bd380a17","type": "TRUE_FALSE","difficulty": "EASY","content": "Python是一种解释型语言","explanation": "Python是解释型语言，代码在运行时逐行解释执行","knowledgePoints": [{"id": "g6eebc99-9c0b-4ef8-bb6d-6bb9bd380a17","name": "变量","description": "Python变量声明","subject": "Python基础"}],"creator": {"id": "a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11","displayName": "张老师","avatarUrl": "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face","role": "TEACHER"},"createdAt": "2025-07-05T11:00:00Z","updatedAt": "2025-07-05T11:00:00Z"}]`;
      try {
        questionData = JSON.parse(testData);
      } catch (e) {
        console.error('Failed to parse test data:', e);
      }
    }
    
    // Transform the questions to the expected format
    questions.value = transformQuestionsData(questionData);
    
    // Set the first question as current if available
    if (questions.value.length > 0) {
      currentIndex.value = 0;
      currentQuestion.value = questions.value[0];
    } else {
      currentQuestion.value = null;
      error.value = '没有找到题目';
    }
  } catch (e) {
    console.error('Error fetching questions:', e);
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