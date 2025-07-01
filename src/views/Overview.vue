<template>
  <div class="layout-content-container flex flex-col max-w-[960px] flex-1">
    <div class="flex flex-wrap justify-between gap-3 p-4">
      <div class="flex min-w-72 flex-col gap-3">
        <p class="text-[#0d131c] tracking-light text-[32px] font-bold leading-tight">Class Performance Overview</p>
        <p class="text-[#49699c] text-sm font-normal leading-normal">Analyze student performance across different subjects and time periods.</p>
      </div>
    </div>

    <!-- Stats Cards -->
    <div class="flex flex-wrap gap-4 p-4">
      <div class="flex min-w-[158px] flex-1 flex-col gap-2 rounded-lg p-6 border border-[#ced8e8]">
        <p class="text-[#0d131c] text-base font-medium leading-normal">Average Accuracy</p>
        <p class="text-[#0d131c] tracking-light text-2xl font-bold leading-tight">{{ stats.averageAccuracy }}%</p>
      </div>
      <div class="flex min-w-[158px] flex-1 flex-col gap-2 rounded-lg p-6 border border-[#ced8e8]">
        <p class="text-[#0d131c] text-base font-medium leading-normal">Frequently Missed Concepts</p>
        <p class="text-[#0d131c] tracking-light text-2xl font-bold leading-tight">{{ stats.frequentlyMissedConcepts[0] }}</p>
      </div>
      <div class="flex min-w-[158px] flex-1 flex-col gap-2 rounded-lg p-6 border border-[#ced8e8]">
        <p class="text-[#0d131c] text-base font-medium leading-normal">Class Ranking</p>
        <p class="text-[#0d131c] tracking-light text-2xl font-bold leading-tight">{{ stats.classRanking }}</p>
      </div>
    </div>

    <h2 class="text-[#0d131c] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Performance Charts</h2>

    <!-- Charts -->
    <div class="flex flex-wrap gap-4 px-4 py-6">
      <!-- Knowledge Point Mastery -->
      <div class="flex min-w-72 flex-1 flex-col gap-2 rounded-lg border border-[#ced8e8] p-6">
        <p class="text-[#0d131c] text-base font-medium leading-normal">Knowledge Point Mastery</p>
        <div class="grid min-h-[180px] grid-flow-col gap-6 grid-rows-[1fr_auto] items-end justify-items-center px-3">
          <div v-for="(mastery, concept) in stats.knowledgePointMastery" :key="concept" class="flex flex-col items-center w-full">
            <div class="border-[#49699c] bg-[#e7ecf4] border-t-2 w-full" :style="{ height: mastery + '%' }"></div>
            <p class="text-[#49699c] text-[13px] font-bold leading-normal tracking-[0.015em] mt-2">{{ concept }}</p>
          </div>
        </div>
      </div>
      <!-- Accuracy Trends Over Time -->
      <div class="flex min-w-72 flex-1 flex-col gap-2 rounded-lg border border-[#ced8e8] p-6">
        <p class="text-[#0d131c] text-base font-medium leading-normal">Accuracy Trends Over Time</p>
        <div class="flex min-h-[180px] flex-1 flex-col gap-8 py-4">
          <svg width="100%" height="148" viewBox="-3 0 478 150" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <defs>
              <linearGradient id="paint0_linear_1131_5935" x1="236" y1="1" x2="236" y2="149" gradientUnits="userSpaceOnUse">
                <stop stop-color="#e7ecf4"></stop>
                <stop offset="1" stop-color="#e7ecf4" stop-opacity="0"></stop>
              </linearGradient>
            </defs>
             <path
              d="M0 109C18.1538 109 18.1538 21 36.3077 21C54.4615 21 54.4615 41 72.6154 41C90.7692 41 90.7692 93 108.923 93C127.077 93 127.077 33 145.231 33C163.385 33 163.385 101 181.538 101C199.692 101 199.692 61 217.846 61C236 61 236 45 254.154 45C272.308 45 272.308 121 290.462 121C308.615 121 308.615 149 326.769 149C344.923 149 344.923 1 363.077 1C381.231 1 381.231 81 399.385 81C417.538 81 417.538 129 435.692 129C453.846 129 453.846 25 472 25V149H326.769H0V109Z"
              fill="url(#paint0_linear_1131_5935)"
            ></path>
            <path
              d="M0 109C18.1538 109 18.1538 21 36.3077 21C54.4615 21 54.4615 41 72.6154 41C90.7692 41 90.7692 93 108.923 93C127.077 93 127.077 33 145.231 33C163.385 33 163.385 101 181.538 101C199.692 101 199.692 61 217.846 61C236 61 236 45 254.154 45C272.308 45 272.308 121 290.462 121C308.615 121 308.615 149 326.769 149C344.923 149 344.923 1 363.077 1C381.231 1 381.231 81 399.385 81C417.538 81 417.538 129 435.692 129C453.846 129 453.846 25 472 25"
              stroke="#49699c"
              stroke-width="3"
              stroke-linecap="round"
            ></path>
          </svg>
          <div class="flex justify-around">
            <p v-for="trend in stats.accuracyTrends" :key="trend.week" class="text-[#49699c] text-[13px] font-bold leading-normal tracking-[0.015em]">{{ trend.week }}</p>
          </div>
        </div>
      </div>
    </div>

    <h2 class="text-[#0d131c] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Detailed Student Analysis</h2>

    <!-- Student Analysis Table -->
    <div class="px-4 py-3">
      <div class="overflow-hidden rounded-lg border border-[#ced8e8] bg-[#f8f9fc]">
        <table class="min-w-full">
          <thead>
            <tr class="bg-[#f8f9fc]">
              <th class="px-4 py-3 text-left text-[#0d131c] text-sm font-medium leading-normal">Student</th>
              <th class="px-4 py-3 text-left text-[#0d131c] text-sm font-medium leading-normal">Incorrect Questions</th>
              <th class="px-4 py-3 text-left text-[#0d131c] text-sm font-medium leading-normal">Error Location</th>
              <th class="px-4 py-3 text-left text-[#0d131c] text-sm font-medium leading-normal">Suggested Correction</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in studentAnalysis" :key="item.id" class="border-t border-t-[#ced8e8]">
              <td class="h-[72px] px-4 py-2 text-[#0d131c] text-sm font-normal leading-normal">{{ item.studentName }}</td>
              <td class="h-[72px] px-4 py-2 text-[#49699c] text-sm font-normal leading-normal">{{ item.incorrectQuestions }}</td>
              <td class="h-[72px] px-4 py-2 text-[#49699c] text-sm font-normal leading-normal">{{ item.errorLocation }}</td>
              <td class="h-[72px] px-4 py-2 text-[#49699c] text-sm font-normal leading-normal">{{ item.suggestedCorrection }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { PerformanceStats, StudentAnalysis } from '@/types';
import { mockPerformanceStats, mockStudentAnalysis } from '@/data/mockData';

const stats = ref<PerformanceStats>(mockPerformanceStats);
const studentAnalysis = ref<StudentAnalysis[]>(mockStudentAnalysis);
</script> 