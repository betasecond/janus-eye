<template>
  <div class="layout-content-container flex flex-col max-w-[960px] flex-1 animate-fade-in">
    <div v-if="loading || !stats" class="flex items-center justify-center flex-1 animate-pulse">
      <div class="text-center">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
        <p class="text-gray-500 text-lg">加载数据中...</p>
      </div>
    </div>
    
    <div v-else>
      <div class="flex flex-wrap justify-between gap-3 p-4 animate-slide-in-up">
        <div class="flex min-w-72 flex-col gap-3">
          <p class="text-[#0d131c] tracking-light text-[32px] font-bold leading-tight animate-fade-in-up">学习表现概览</p>
          <p class="text-[#49699c] text-sm font-normal leading-normal animate-fade-in-up" style="animation-delay: 0.1s;">分析不同科目和时期的学习表现</p>
        </div>
      </div>
      
      <!-- Stats Cards -->
      <div class="flex flex-wrap gap-4 p-4 animate-slide-in-up" style="animation-delay: 0.2s;">
        <div class="stat-card flex min-w-[158px] flex-1 flex-col gap-3 rounded-xl p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group">
          <div class="flex items-center gap-2">
            <div class="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
            <p class="text-[#0d131c] text-base font-medium leading-normal">平均准确率</p>
          </div>
          <div class="flex items-center gap-2">
            <p class="text-[#0d131c] tracking-light text-3xl font-bold leading-tight counter-animation">{{ stats.averageAccuracy || 0 }}%</p>
            <div class="text-green-500 text-sm font-medium flex items-center gap-1">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" clip-rule="evenodd" />
              </svg>
              <span>+2.4%</span>
            </div>
          </div>
        </div>
        <div class="stat-card flex min-w-[158px] flex-1 flex-col gap-3 rounded-xl p-6 bg-gradient-to-br from-orange-50 to-red-50 border border-orange-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group">
          <div class="flex items-center gap-2">
            <div class="w-3 h-3 bg-orange-500 rounded-full animate-pulse"></div>
            <p class="text-[#0d131c] text-base font-medium leading-normal">最具挑战知识点</p>
          </div>
          <p class="text-[#0d131c] tracking-light text-xl font-bold leading-tight">{{ stats.frequentlyMissedConcepts && stats.frequentlyMissedConcepts.length > 0 ? stats.frequentlyMissedConcepts[0] : '暂无数据' }}</p>
          <div class="flex gap-1">
            <span class="px-2 py-1 bg-orange-100 text-orange-700 text-xs rounded-full">需要关注</span>
          </div>
        </div>
        <div class="stat-card flex min-w-[158px] flex-1 flex-col gap-3 rounded-xl p-6 bg-gradient-to-br from-green-50 to-emerald-50 border border-green-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group">
          <div class="flex items-center gap-2">
            <div class="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <p class="text-[#0d131c] text-base font-medium leading-normal">班级排名</p>
          </div>
          <div class="flex items-center gap-2">
            <p class="text-[#0d131c] tracking-light text-3xl font-bold leading-tight">{{ stats.classRanking || 'N/A' }}</p>
            <div class="text-green-500 text-sm font-medium">
              🏆
            </div>
          </div>
        </div>
      </div>
      
      <h2 class="text-[#0d131c] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5 animate-fade-in-up" style="animation-delay: 0.3s;">学习表现图表</h2>
      
      <!-- Charts -->
      <div class="flex flex-wrap gap-4 p-4 animate-slide-in-up" style="animation-delay: 0.4s;">
        <!-- Knowledge Point Mastery -->
        <div class="chart-container flex min-w-72 flex-1 flex-col gap-4 rounded-xl border border-gray-200 p-6 bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
          <div class="flex items-center gap-2">
            <div class="w-3 h-3 bg-purple-500 rounded-full animate-pulse"></div>
            <p class="text-[#0d131c] text-lg font-semibold leading-normal">知识点掌握度</p>
          </div>
          <div class="chart-wrapper relative h-[280px]">
            <div v-if="chartLoading" class="absolute inset-0 bg-white bg-opacity-50 flex items-center justify-center">
              <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
            </div>
            <v-chart v-else class="h-full w-full" :option="masteryChartOption" autoresize />
          </div>
        </div>
        <!-- Accuracy Trends Over Time -->
        <div class="chart-container flex min-w-72 flex-1 flex-col gap-4 rounded-xl border border-gray-200 p-6 bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
          <div class="flex items-center gap-2">
            <div class="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
            <p class="text-[#0d131c] text-lg font-semibold leading-normal">准确率趋势</p>
          </div>
          <div class="chart-wrapper relative h-[280px]">
            <div v-if="chartLoading" class="absolute inset-0 bg-white bg-opacity-50 flex items-center justify-center">
              <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            </div>
            <v-chart v-else class="h-full w-full" :option="trendsChartOption" autoresize />
          </div>
        </div>
      </div>
      
      <!-- Student Analysis Table -->
      <h2 class="text-[#0d131c] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5 animate-fade-in-up" style="animation-delay: 0.5s;">详细学生分析</h2>
      <div class="px-4 py-3 animate-slide-in-up" style="animation-delay: 0.6s;">
        <div class="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg">
          <table class="min-w-full">
            <thead>
              <tr class="bg-gradient-to-r from-gray-50 to-gray-100">
                <th class="px-6 py-4 text-left text-[#0d131c] text-sm font-semibold leading-normal">学生</th>
                <th class="px-6 py-4 text-left text-[#0d131c] text-sm font-semibold leading-normal">错误题目</th>
                <th class="px-6 py-4 text-left text-[#0d131c] text-sm font-semibold leading-normal">错误位置</th>
                <th class="px-6 py-4 text-left text-[#0d131c] text-sm font-semibold leading-normal">建议修正</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="!studentAnalysis || studentAnalysis.length === 0">
                <td colspan="4" class="px-6 py-4 text-center text-gray-500">暂无分析数据</td>
              </tr>
              <tr 
                v-else
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

const loading = ref(false); // 改为false，直接显示数据
const chartLoading = ref(false); // 改为false，直接显示数据

// 模拟的 PerformanceStats 数据
const mockStats: PerformanceStats = {
  averageAccuracy: 85,
  frequentlyMissedConcepts: ['指令集', 'CPU设计', '数据通路'],
  classRanking: '前15%',
  knowledgePointMastery: {
    '指令集': 90,
    'CPU设计': 85,
    '数据通路': 78,
    '控制器': 88,
    '存储系统': 82,
  },
  accuracyTrends: [
    { week: '第一周', accuracy: 78 },
    { week: '第二周', accuracy: 82 },
    { week: '第三周', accuracy: 81 },
    { week: '第四周', accuracy: 85 },
  ],
};

// 模拟的 StudentAnalysis 数据
const mockStudentAnalysis: StudentAnalysis[] = [
  { id: '1', studentName: '张三', incorrectQuestions: '指令集练习题3', errorLocation: 'MIPS指令格式混淆', suggestedCorrection: '复习R-型和I-型指令的区别' },
  { id: '2', studentName: '李四', incorrectQuestions: 'CPU设计大题1', errorLocation: '单周期CPU数据通路理解错误', suggestedCorrection: '重新学习数据通路中各个组件的功能' },
  { id: '3', studentName: '王五', incorrectQuestions: '存储系统选择题5', errorLocation: 'Cache映射方式计算错误', suggestedCorrection: '应使用直接映射地址计算公式' },
];

const stats = ref<PerformanceStats | null>(mockStats);
const studentAnalysis = ref<StudentAnalysis[]>(mockStudentAnalysis);

onMounted(async () => {
  // try {
  //   const [statsData, analysisData] = await Promise.all([
  //     getPerformanceStats(),
  //     getStudentAnalysis()
  //   ]);
    
  //   stats.value = statsData;
  //   studentAnalysis.value = analysisData;
  //   console.log('Stats loaded:', stats.value);
  //   console.log('Analysis loaded:', studentAnalysis.value);
    
  // } catch (error) {
  //   console.error("Failed to load overview data:", error);
  // } finally {
  //   loading.value = false;
  //   chartLoading.value = false;
  // }
});

const masteryChartOption = computed(() => {
  if (!stats.value?.knowledgePointMastery) return {};
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
      top: '3%',
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: Object.keys(stats.value.knowledgePointMastery),
      axisLabel: {
        color: '#666',
        interval: 0,
        rotate: 30
      }
    },
    yAxis: {
      type: 'value',
      max: 100,
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
      label: {
        show: true,
        position: 'top',
        formatter: '{c}%'
      }
    }]
  };
});

const trendsChartOption = computed(() => {
  if (!stats.value?.accuracyTrends) return {};
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
      top: '3%',
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
      min: 0,
      max: 100,
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
      symbolSize: 8,
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
        color: '#3b82f6',
        borderWidth: 2,
        borderColor: '#fff'
      },
      label: {
        show: true,
        position: 'top',
        formatter: '{c}%'
      }
    }]
  };
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

