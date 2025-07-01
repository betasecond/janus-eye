<template>
  <div class="gap-1 px-6 flex flex-1 justify-center py-5">
    <!-- Left Panel: Syllabus Chapters -->
    <div class="layout-content-container flex flex-col w-80">
      <h2 class="text-[#0d131c] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Syllabus</h2>
      <div class="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
        <select class="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#0d131c] focus:outline-0 focus:ring-0 border border-[#ced8e8] bg-[#f8f9fc] focus:border-[#ced8e8] h-14 p-[15px] text-base font-normal leading-normal">
          <option v-for="course in courses" :key="course.id">{{ course.name }}</option>
        </select>
      </div>
      <div v-for="chapter in syllabus.chapters" :key="chapter.id" @click="selectChapter(chapter)"
           class="flex items-center gap-4 bg-[#f8f9fc] px-4 min-h-[72px] py-2 cursor-pointer hover:bg-gray-100"
           :class="{ 'bg-gray-200': selectedChapter && selectedChapter.id === chapter.id }">
        <div class="text-[#0d131c] flex items-center justify-center rounded-lg bg-[#e7ecf4] shrink-0 size-12">
          <Icon name="book" size="24" />
        </div>
        <div class="flex flex-col justify-center">
          <p class="text-[#0d131c] text-base font-medium leading-normal line-clamp-1">{{ chapter.title }}</p>
          <p class="text-[#49699c] text-sm font-normal leading-normal line-clamp-2">Chapter {{ chapter.order }}</p>
        </div>
      </div>
    </div>

    <!-- Right Panel: Chapter Details -->
    <div class="layout-content-container flex flex-col max-w-[960px] flex-1" v-if="selectedChapter">
      <div class="flex justify-between gap-2 px-4 py-3">
        <div class="flex gap-2">
          <!-- Action Buttons -->
        </div>
        <button class="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 bg-[#2071f3] text-[#f8f9fc] gap-2 text-sm font-bold leading-normal tracking-[0.015em] min-w-0 px-4">
          <Icon name="magicWand" size="20" color="white" />
          <span class="truncate">Generate Content</span>
        </button>
      </div>

      <div class="flex flex-col gap-3 p-4" v-if="syllabus.isGenerating">
        <p class="text-[#0d131c] text-base font-medium leading-normal">Generating Content</p>
        <div class="rounded bg-[#ced8e8]">
          <div class="h-2 rounded bg-[#2071f3]" :style="{ width: syllabus.progress + '%' }"></div>
        </div>
        <p class="text-[#49699c] text-sm font-normal leading-normal">This may take a few minutes...</p>
      </div>

      <h2 class="text-[#0d131c] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Knowledge Explanation</h2>
      <div class="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
        <textarea class="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#0d131c] focus:outline-0 focus:ring-0 border border-[#ced8e8] bg-[#f8f9fc] min-h-36 p-[15px] text-base"
                  v-model="selectedChapter.content"></textarea>
      </div>

      <h2 class="text-[#0d131c] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Practice Exercises</h2>
      <div v-for="exercise in selectedChapter.exercises" :key="exercise.id" class="flex items-center gap-4 bg-[#f8f9fc] px-4 min-h-14">
        <div class="text-[#0d131c] flex items-center justify-center rounded-lg bg-[#e7ecf4] shrink-0 size-10">
          <Icon name="listBullets" size="24" />
        </div>
        <p class="text-[#0d131c] text-base font-normal leading-normal flex-1 truncate">{{ exercise.title }}</p>
      </div>
    </div>
     <div v-else class="flex flex-1 items-center justify-center text-gray-500">
      Select a chapter to see the details.
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { Syllabus, Chapter, Course } from '@/types';
import { mockSyllabus, mockCourses } from '@/data/mockData';
import Icon from '@/components/base/Icon.vue';

const syllabus = ref<Syllabus>(mockSyllabus);
const courses = ref<Course[]>(mockCourses);
const selectedChapter = ref<Chapter | null>(syllabus.value.chapters[0]);

const selectChapter = (chapter: Chapter) => {
  selectedChapter.value = chapter;
};
</script> 