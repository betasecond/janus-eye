<template>
  <div class="p-6 md:p-8 bg-gray-50 min-h-full">
    <header class="mb-8">
      <h1 class="text-3xl font-bold text-gray-800">{{ t('analytics.title') }}</h1>
      <p class="text-gray-500 mt-1">{{ t('analytics.description') }}</p>
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
import { computed } from 'vue';
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
import { mockAnalyticsData } from '@/data/analyticsData';
import type { AnalyticsEvent } from '@/data/analyticsData';

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

const analyticsData = computed<AnalyticsEvent[]>(() => mockAnalyticsData);

// 1. 页面浏览量 (PV) 按天统计
const pageViewsOption = computed(() => {
  const pageViews = analyticsData.value
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
  const pageCounts = analyticsData.value
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
  const activity = analyticsData.value.reduce((acc, event) => {
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
    const buttonCounts = analyticsData.value
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
    const eventCounts = analyticsData.value
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

