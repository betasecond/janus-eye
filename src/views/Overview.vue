<template>
  <div class="layout-content-container flex flex-col max-w-[960px] flex-1 animate-fade-in">
    <div v-if="!loading && stats">
      <div class="flex flex-wrap justify-between gap-3 p-4 animate-slide-in-up">
        <div class="flex min-w-72 flex-col gap-3">
          <p class="text-[#0d131c] tracking-light text-[32px] font-bold leading-tight animate-fade-in-up">Class Performance Overview</p>
          <p class="text-[#49699c] text-sm font-normal leading-normal animate-fade-in-up" style="animation-delay: 0.1s;">Analyze student performance across different subjects and time periods.</p>
        </div>
      </div>
      
      <!-- Stats Cards -->
      <div class="flex flex-wrap gap-4 p-4 animate-slide-in-up" style="animation-delay: 0.2s;">
        <div class="stat-card flex min-w-[158px] flex-1 flex-col gap-3 rounded-xl p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group">
          <div class="flex items-center gap-2">
            <div class="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
            <p class="text-[#0d131c] text-base font-medium leading-normal">Average Accuracy</p>
          </div>
          <div class="flex items-center gap-2">
            <p class="text-[#0d131c] tracking-light text-3xl font-bold leading-tight counter-animation">{{ stats.averageAccuracy }}%</p>
            <div class="text-green-500 text-sm font-medium flex items-center gap-1">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" clip-rule="evenodd" />
              </svg>
              <span>+2.4%</span>
            </div>
          </div>
        </div>
        <div class="stat-card flex min-w-[158px] flex-1 flex-col gap-3 rounded-xl p-6 bg-gradient-to-br from-orange-50 to-red-50 border border-orange-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group" style="animation-delay: 0.1s;">
          <div class="flex items-center gap-2">
            <div class="w-3 h-3 bg-orange-500 rounded-full animate-pulse"></div>
            <p class="text-[#0d131c] text-base font-medium leading-normal">Most Challenging</p>
          </div>
          <p class="text-[#0d131c] tracking-light text-xl font-bold leading-tight">{{ stats.frequentlyMissedConcepts[0] }}</p>
          <div class="flex gap-1">
            <span class="px-2 py-1 bg-orange-100 text-orange-700 text-xs rounded-full">需要关注</span>
          </div>
        </div>
        <div class="stat-card flex min-w-[158px] flex-1 flex-col gap-3 rounded-xl p-6 bg-gradient-to-br from-green-50 to-emerald-50 border border-green-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group" style="animation-delay: 0.2s;">
          <div class="flex items-center gap-2">
            <div class="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <p class="text-[#0d131c] text-base font-medium leading-normal">Class Ranking</p>
          </div>
          <div class="flex items-center gap-2">
            <p class="text-[#0d131c] tracking-light text-3xl font-bold leading-tight">{{ stats.classRanking }}</p>
            <div class="text-green-500 text-sm font-medium">
              🏆
            </div>
          </div>
        </div>
      </div>
      
      <h2 class="text-[#0d131c] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5 animate-fade-in-up" style="animation-delay: 0.3s;">Performance Charts</h2>
      
      <!-- Charts -->
      <div class="flex flex-wrap gap-4 p-4 animate-slide-in-up" style="animation-delay: 0.4s;">
        <!-- Knowledge Point Mastery -->
        <div class="chart-container flex min-w-72 flex-1 flex-col gap-4 rounded-xl border border-gray-200 p-6 bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
          <div class="flex items-center gap-2">
            <div class="w-3 h-3 bg-purple-500 rounded-full animate-pulse"></div>
            <p class="text-[#0d131c] text-lg font-semibold leading-normal">知识点掌握度</p>
          </div>
          <div class="chart-wrapper relative">
            <v-chart class="h-[280px]" :option="masteryChartOption" autoresize />
            <div v-if="chartLoading" class="absolute inset-0 bg-white bg-opacity-50 flex items-center justify-center">
              <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
            </div>
          </div>
        </div>
        <!-- Accuracy Trends Over Time -->
        <div class="chart-container flex min-w-72 flex-1 flex-col gap-4 rounded-xl border border-gray-200 p-6 bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
          <div class="flex items-center gap-2">
            <div class="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
            <p class="text-[#0d131c] text-lg font-semibold leading-normal">准确率趋势</p>
          </div>
          <div class="chart-wrapper relative">
            <v-chart class="h-[280px]" :option="trendsChartOption" autoresize />
            <div v-if="chartLoading" class="absolute inset-0 bg-white bg-opacity-50 flex items-center justify-center">
              <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            </div>
          </div>
        </div>
      </div>
      
      <h2 class="text-[#0d131c] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5 animate-fade-in-up" style="animation-delay: 0.5s;">Detailed Student Analysis</h2>
      
      <!-- Student Analysis Table -->
      <div class="px-4 py-3 animate-slide-in-up" style="animation-delay: 0.6s;">
        <div class="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg">
          <table class="min-w-full">
            <thead>
              <tr class="bg-gradient-to-r from-gray-50 to-gray-100">
                <th class="px-6 py-4 text-left text-[#0d131c] text-sm font-semibold leading-normal">Student</th>
                <th class="px-6 py-4 text-left text-[#0d131c] text-sm font-semibold leading-normal">Incorrect Questions</th>
                <th class="px-6 py-4 text-left text-[#0d131c] text-sm font-semibold leading-normal">Error Location</th>
                <th class="px-6 py-4 text-left text-[#0d131c] text-sm font-semibold leading-normal">Suggested Correction</th>
              </tr>
            </thead>
            <tbody>
              <tr 
                v-for="(item, index) in studentAnalysis" 
                :key="item.id" 
                class="border-t border-gray-100 hover:bg-gray-50 transition-colors duration-200 animate-fade-in-up"
                :style="`animation-delay: ${0.1 * index}s;`"
              >
                <td class="px-6 py-4 text-[#0d131c] text-sm font-medium leading-normal">{{ item.studentName }}</td>
                <td class="px-6 py-4 text-[#49699c] text-sm font-normal leading-normal">{{ item.incorrectQuestions }}</td>
                <td class="px-6 py-4 text-[#49699c] text-sm font-normal leading-normal">{{ item.errorLocation }}</td>
                <td class="px-6 py-4 text-[#49699c] text-sm font-normal leading-normal">{{ item.suggestedCorrection }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div v-else class="flex items-center justify-center flex-1 animate-pulse">
      <div class="text-center">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
        <p class="text-gray-500 text-lg">Loading performance data...</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import type { PerformanceStats, StudentAnalysis } from '@/types';
import { getPerformanceStats, getStudentAnalysis } from '@/api';
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

const loading = ref(true);
const chartLoading = ref(false);
const stats = ref<PerformanceStats | null>(null);
const studentAnalysis = ref<StudentAnalysis[]>([]);

onMounted(async () => {
  chartLoading.value = true;
  stats.value = await getPerformanceStats();
  studentAnalysis.value = await getStudentAnalysis();
  
  // 模拟图表加载延迟
  setTimeout(() => {
    chartLoading.value = false;
  }, 1000);
  
  loading.value = false;
});

const masteryChartOption = computed(() => {
  if (!stats.value) return {};
  return {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      },
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      borderColor: '#ccc',
      textStyle: {
        color: '#fff'
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
      axisLabel: {
        color: '#666'
      }
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        formatter: '{value}%',
        color: '#666'
      }
    },
    series: [{
      name: '掌握度',
      type: 'bar',
      data: Object.values(stats.value.knowledgePointMastery),
      barWidth: '50%',
      itemStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [{
            offset: 0, color: '#8b5cf6'
          }, {
            offset: 1, color: '#3b82f6'
          }]
        },
        borderRadius: [4, 4, 0, 0]
      },
      animationDelay: (idx: number) => idx * 100,
    }]
  }
});

const trendsChartOption = computed(() => {
  if (!stats.value) return {};
  return {
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      borderColor: '#ccc',
      textStyle: {
        color: '#fff'
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
      boundaryGap: false,
      data: stats.value.accuracyTrends.map(t => t.week),
      axisLabel: {
        color: '#666'
      }
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        formatter: '{value}%',
        color: '#666'
      }
    },
    series: [{
      name: '准确率',
      type: 'line',
      data: stats.value.accuracyTrends.map(t => t.accuracy),
      smooth: true,
      areaStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [{
            offset: 0, color: 'rgba(59, 130, 246, 0.3)'
          }, {
            offset: 1, color: 'rgba(59, 130, 246, 0.1)'
          }]
        }
      },
      lineStyle: {
        color: '#3b82f6',
        width: 3
      },
      itemStyle: {
        color: '#3b82f6'
      },
      animationDelay: 0,
    }]
  }
});
</script>

<style scoped>
@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slide-in-up {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes counter {
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.animate-fade-in {
  animation: fade-in 0.6s ease-out;
}

.animate-fade-in-up {
  animation: fade-in-up 0.6s ease-out;
  animation-fill-mode: both;
}

.animate-slide-in-up {
  animation: slide-in-up 0.8s ease-out;
  animation-fill-mode: both;
}

.counter-animation {
  animation: counter 0.8s ease-out;
}

.stat-card {
  position: relative;
  overflow: hidden;
}

.stat-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
  transition: left 0.5s ease;
}

.stat-card:hover::before {
  left: 100%;
}

.chart-container {
  position: relative;
}

.chart-wrapper {
  border-radius: 8px;
  overflow: hidden;
}
</style> 