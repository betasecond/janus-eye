<template>
  <div class="layout-content-container flex flex-col max-w-[960px] flex-1">
    <div class="flex flex-wrap justify-between gap-3 p-4">
      <p class="text-[#0d131c] tracking-light text-[32px] font-bold leading-tight min-w-72">Questions</p>
      <button class="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-8 px-4 bg-[#e7ecf4] text-[#0d131c] text-sm font-medium leading-normal">
        <span class="truncate">New Question</span>
      </button>
    </div>

    <!-- Filters -->
    <div class="flex gap-3 p-3 flex-wrap pr-4">
      <!-- Filter Dropdowns would go here -->
    </div>

    <h2 class="text-[#0d131c] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Question List</h2>

    <!-- Question List -->
    <div v-for="question in filteredQuestions" :key="question.id" class="flex gap-4 bg-[#f8f9fc] px-4 py-3 justify-between border-b border-gray-200">
      <div class="flex flex-1 flex-col justify-center">
        <p class="text-[#0d131c] text-base font-medium leading-normal">{{ question.title }}</p>
        <p v-if="question.options" class="text-[#49699c] text-sm font-normal leading-normal">
          {{ question.options.map((o, i) => `${String.fromCharCode(65 + i)}. ${o}`).join(' ') }}
        </p>
        <p class="text-[#49699c] text-sm font-normal leading-normal">Type: {{ question.type }}, Difficulty: {{ question.difficulty }}</p>
      </div>
      <div class="shrink-0">
        <div class="text-[#0d131c] flex size-7 items-center justify-center cursor-pointer" @click="toggleQuestion(question.id)">
          <Icon name="caretDown" size="24" />
        </div>
      </div>
    </div>
    
    <!-- Pagination -->
    <div class="flex items-center justify-center p-4">
       <!-- Pagination controls would go here -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import type { Question } from '@/types';
import { mockQuestions } from '@/data/mockData';
import Icon from '@/components/base/Icon.vue';

const questions = ref<Question[]>(mockQuestions);
const selectedQuestion = ref<string | null>(null);

// Basic filtering logic (can be expanded)
const filteredQuestions = computed(() => {
  return questions.value;
});

const toggleQuestion = (id: string) => {
  if (selectedQuestion.value === id) {
    selectedQuestion.value = null;
  } else {
    selectedQuestion.value = id;
  }
};
</script> 