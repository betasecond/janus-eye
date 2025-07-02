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
    <div class="flex flex-wrap gap-4 p-4">
      <!-- Knowledge Point Mastery -->
      <div class="flex min-w-72 flex-1 flex-col gap-2 rounded-lg border border-[#ced8e8] p-6">
        <p class="text-[#0d131c] text-base font-medium leading-normal">知识点掌握度</p>
        <v-chart class="h-[220px]" :option="masteryChartOption" autoresize />
      </div>
      <!-- Accuracy Trends Over Time -->
      <div class="flex min-w-72 flex-1 flex-col gap-2 rounded-lg border border-[#ced8e8] p-6">
        <p class="text-[#0d131c] text-base font-medium leading-normal">准确率趋势</p>
        <v-chart class="h-[220px]" :option="trendsChartOption" autoresize />
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
import { ref, computed } from 'vue';
import type { PerformanceStats, StudentAnalysis } from '@/types';
import { mockPerformanceStats, mockStudentAnalysis } from '@/data/mockData';
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { BarChart, LineChart } from 'echarts/charts';
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
} from 'echarts/components';
import VChart from 'vue-echarts';

use([
  CanvasRenderer,
  BarChart,
  LineChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
]);

const stats = ref<PerformanceStats>(mockPerformanceStats);
const studentAnalysis = ref<StudentAnalysis[]>(mockStudentAnalysis);

const masteryChartOption = computed(() => ({
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: {
    type: 'category',
    data: Object.keys(stats.value.knowledgePointMastery),
  },
  yAxis: {
    type: 'value',
    axisLabel: {
      formatter: '{value}%'
    }
  },
  series: [{
    name: '掌握度',
    type: 'bar',
    data: Object.values(stats.value.knowledgePointMastery),
    barWidth: '40%',
  }]
}));

const trendsChartOption = computed(() => ({
  tooltip: {
    trigger: 'axis'
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: stats.value.accuracyTrends.map(t => t.week),
  },
  yAxis: {
    type: 'value',
    axisLabel: {
      formatter: '{value}%'
    }
  },
  series: [{
    name: '准确率',
    type: 'line',
    data: stats.value.accuracyTrends.map(t => t.accuracy),
    smooth: true,
    areaStyle: {}
  }]
}));
</script> 