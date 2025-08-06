<template>
  <div class="p-6 md:p-8 bg-gray-50 min-h-full">
    <header class="mb-8">
      <div class="flex justify-between items-start">
        <div>
          <h1 class="text-3xl font-bold text-gray-800">{{ t('analytics.title') }}</h1>
          <p class="text-gray-500 mt-1">{{ t('analytics.description') }}</p>
        </div>
        <button 
          @click="fetchAnalyticsData"
          :disabled="loading"
          class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          <Icon 
            :name="loading ? 'spin' : 'refresh'" 
            :class="{ 'animate-spin': loading }" 
            class="h-4 w-4" 
          />
          {{ loading ? '加载中...' : '刷新数据' }}
        </button>
      </div>
      
      <!-- 错误和状态提示 -->
      <div v-if="error" class="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <div class="flex">
          <div class="flex-shrink-0">
            <Icon name="exclamation-triangle" class="h-5 w-5 text-yellow-400" />
          </div>
          <div class="ml-3">
            <p class="text-sm text-yellow-700">
              {{ error }} - 当前显示模拟数据
            </p>
          </div>
        </div>
      </div>
      
      <div v-if="loading" class="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <div class="flex items-center">
          <div class="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
          <p class="ml-3 text-sm text-blue-700">正在加载分析数据...</p>
        </div>
      </div>
    </header>

    <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      <!-- 页面浏览量 (PV) -->
      <Card class="lg:col-span-2">
        <h2 class="text-xl font-semibold text-gray-700 mb-4">{{ t('analytics.pageViews') }}</h2>
        <v-chart class="h-80" :option="pageViewsOption" autoresize />
      </Card>

      <!-- 热门页面 -->
      <Card>
        <h2 class="text-xl font-semibold text-gray-700 mb-4">{{ t('analytics.topPages') }}</h2>
        <v-chart class="h-80" :option="topPagesOption" autoresize />
      </Card>

      <!-- 用户活跃时段 -->
      <Card class="lg:col-span-3">
        <h2 class="text-xl font-semibold text-gray-700 mb-4">{{ t('analytics.userActivity') }}</h2>
        <v-chart class="h-96" :option="userActivityOption" autoresize />
      </Card>

      <!-- 热门点击按钮 -->
      <Card class="lg:col-span-1">
        <h2 class="text-xl font-semibold text-gray-700 mb-4">{{ t('analytics.topButtons') }}</h2>
        <v-chart class="h-80" :option="topButtonsOption" autoresize />
      </Card>

       <!-- 事件类型分布 -->
      <Card class="lg:col-span-2">
        <h2 class="text-xl font-semibold text-gray-700 mb-4">{{ t('analytics.eventDistribution') }}</h2>
        <v-chart class="h-80" :option="eventDistributionOption" autoresize />
      </Card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue';
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { BarChart, LineChart, PieChart, HeatmapChart } from 'echarts/charts';
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
  VisualMapComponent,
  ToolboxComponent,
} from 'echarts/components';
import VChart from 'vue-echarts';
import { useI18n } from 'vue-i18n';
import Card from '@/components/base/Card.vue';
import Icon from '@/components/base/Icon.vue';
import { analyticsApi, type AnalyticsEvent } from '@/api/analytics';
import { mockAnalyticsData } from '@/data/analyticsData';

use([
  CanvasRenderer,
  BarChart,
  LineChart,
  PieChart,
  HeatmapChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
  VisualMapComponent,
  ToolboxComponent,
]);

const { t } = useI18n();

// 响应式数据
const analyticsData = ref<AnalyticsEvent[]>([]);
const loading = ref(true);
const error = ref<string | null>(null);

// 从后端获取数据
const fetchAnalyticsData = async () => {
  try {
    loading.value = true;
    error.value = null;
    // 获取后端数据
    const data = await analyticsApi.getTrackingEvents(500);
    analyticsData.value = data;
    console.log(data);
    // 如果后端没有数据，使用 mock 数据作为备用
    if (data.length === 0) {
      console.warn('后端没有返回数据，使用 mock 数据');
      analyticsData.value = mockAnalyticsData;
    }
  } catch (err) {
    console.error('获取分析数据失败，使用 mock 数据:', err);
    error.value = err instanceof Error ? err.message : '获取数据失败';
    // 发生错误时使用 mock 数据
    analyticsData.value = mockAnalyticsData;
  } finally {
    loading.value = false;
  }
};

// 组件挂载时获取数据
onMounted(() => {
  fetchAnalyticsData();
});

// 计算属性，用于图表数据
const computedAnalyticsData = computed<AnalyticsEvent[]>(() => analyticsData.value);

// 1. 页面浏览量 (PV) 按天统计
const pageViewsOption = computed(() => {
  const pageViews = computedAnalyticsData.value
    .filter(event => event.eventName === 'Page Viewed')
    .reduce((acc, event) => {
      const date = new Date(event.properties.timestamp).toISOString().split('T')[0];
      acc[date] = (acc[date] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

  const dates = Object.keys(pageViews).sort();
  const counts = dates.map(date => pageViews[date]);

  return {
    tooltip: { trigger: 'axis' },
    xAxis: { type: 'category', data: dates },
    yAxis: { type: 'value' },
    series: [{
      data: counts,
      type: 'line',
      smooth: true,
      name: t('analytics.pageViews'),
    }],
    grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
  };
});

// 2. 热门页面排行
const topPagesOption = computed(() => {
  const pageCounts = computedAnalyticsData.value
    .filter(event => event.eventName === 'Page Viewed' && event.properties.page)
    .reduce((acc, event) => {
      const pageName = event.properties.page!;
      acc[pageName] = (acc[pageName] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

  const sortedPages = Object.entries(pageCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  return {
    tooltip: { trigger: 'item' },
    legend: {
      orient: 'vertical',
      left: 'left',
      data: sortedPages.map(p => p[0])
    },
    series: [{
      name: t('analytics.pageViews'),
      type: 'pie',
      radius: '50%',
      data: sortedPages.map(([name, value]) => ({ name, value })),
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }]
  };
});

// 3. 用户活跃时段 (热力图)
const userActivityOption = computed(() => {
  const activity = computedAnalyticsData.value.reduce((acc, event) => {
    const date = new Date(event.properties.timestamp);
    const day = date.getDay(); // 0 = Sunday, 1 = Monday, ...
    const hour = date.getHours();
    const key = `${day}-${hour}`;
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const data = Object.entries(activity).map(([key, value]) => {
    const [day, hour] = key.split('-').map(Number);
    return [hour, day, value];
  });
  
  const hours = Array.from({length: 24}, (_, i) => `${i}:00`);
  const days = [t('analytics.days.sun'), t('analytics.days.mon'), t('analytics.days.tue'), t('analytics.days.wed'), t('analytics.days.thu'), t('analytics.days.fri'), t('analytics.days.sat')];

  return {
    tooltip: { position: 'top' },
    grid: { height: '50%', top: '10%' },
    xAxis: { type: 'category', data: hours, splitArea: { show: true } },
    yAxis: { type: 'category', data: days, splitArea: { show: true } },
    visualMap: {
      min: 0,
      max: Math.max(...(Object.values(activity) as number[])),
      calculable: true,
      orient: 'horizontal',
      left: 'center',
      bottom: '15%'
    },
    series: [{
      name: t('analytics.activityCount'),
      type: 'heatmap',
      data: data,
      label: { show: true },
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }]
  };
});


// 4. 热门点击按钮
const topButtonsOption = computed(() => {
    const buttonCounts = computedAnalyticsData.value
        .filter(event => event.eventName === 'Button Clicked' && event.properties.buttonText)
        .reduce((acc, event) => {
            const buttonText = event.properties.buttonText!;
            acc[buttonText] = (acc[buttonText] || 0) + 1;
            return acc;
        }, {} as Record<string, number>);

    const sortedButtons = Object.entries(buttonCounts).sort((a, b) => a[1] - b[1]).slice(0, 10);

    return {
        tooltip: {
            trigger: 'axis',
            axisPointer: { type: 'shadow' }
        },
        xAxis: { type: 'value' },
        yAxis: {
            type: 'category',
            data: sortedButtons.map(item => item[0]),
            axisLabel: {
                interval: 0,
                rotate: 0,
            }
        },
        series: [{
            name: t('analytics.clickCount'),
            type: 'bar',
            data: sortedButtons.map(item => item[1]),
        }],
        grid: { left: '25%', right: '4%', bottom: '3%', containLabel: false },
    };
});

// 5. 事件类型分布
const eventDistributionOption = computed(() => {
    const eventCounts = computedAnalyticsData.value
        .reduce((acc, event) => {
            const eventName = event.eventName;
            acc[eventName] = (acc[eventName] || 0) + 1;
            return acc;
        }, {} as Record<string, number>);
    
    const translatedEventNames = {
        'Page Viewed': t('analytics.eventTypes.pageViewed'),
        'Page Left': t('analytics.eventTypes.pageLeft'),
        'Button Clicked': t('analytics.eventTypes.buttonClicked'),
    };

    const data = Object.entries(eventCounts).map(([name, value]) => ({
        name: translatedEventNames[name as keyof typeof translatedEventNames] || name,
        value
    }));

    return {
        tooltip: { trigger: 'item' },
        legend: { top: '5%', left: 'center' },
        series: [{
            name: t('analytics.eventCount'),
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: '#fff',
              borderWidth: 2
            },
            label: {
                show: false,
                position: 'center'
            },
            emphasis: {
                label: {
                    show: true,
                    fontSize: '20',
                    fontWeight: 'bold'
                }
            },
            labelLine: {
                show: false
            },
            data: data
        }]
    };
});

</script>

