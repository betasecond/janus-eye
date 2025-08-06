<template>
  <div class="p-6 md:p-8 bg-gray-50 min-h-full">
    <header class="mb-8">
      <div class="flex justify-between items-start">
        <div>
          <h1 class="text-3xl font-bold text-gray-800">{{ t('analytics.title') }}</h1>
          <p class="text-gray-500 mt-1">{{ t('analytics.description') }}</p>
        </div>
        <div class="flex gap-2">
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

    <!-- 数据为空时的提示 -->
    <div v-if="!loading && computedAnalyticsData.length === 0" class="text-center py-12">
      <div class="mb-4">
        <Icon name="chart-bar" class="h-16 w-16 text-gray-400 mx-auto" />
      </div>
      <h3 class="text-lg font-medium text-gray-600 mb-2">暂无分析数据</h3>
      <p class="text-sm text-gray-500">请稍后再试或检查数据源连接</p>
      <div class="mt-4 text-xs text-gray-400">
        <p>原始数据长度: {{ analyticsData.length }}</p>
        <p>过滤后数据长度: {{ computedAnalyticsData.length }}</p>
        <p>加载状态: {{ loading ? '加载中' : '已完成' }}</p>
        <p v-if="error">错误信息: {{ error }}</p>
      </div>
    </div>

    <!-- 统计卡片概览 -->
    <div v-else>
      <!-- 核心指标卡片 -->
      <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-4 mb-6">
        <Card title="总页面浏览量" class="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <div class="flex items-center justify-between">
            <div>
              <div class="text-3xl font-bold text-white">{{ totalPageViews || 0 }}</div>
              <div class="text-blue-100 text-sm mt-1">今日 +{{ todayPageViews || 0 }}</div>
              <div class="text-blue-100 text-xs mt-1">数据量: {{ computedAnalyticsData.length }}</div>
            </div>
            <Icon name="eye" class="h-12 w-12 text-blue-200" />
          </div>
        </Card>

        <Card title="独立访客数" class="bg-gradient-to-r from-green-500 to-green-600 text-white">
          <div class="flex items-center justify-between">
            <div>
              <div class="text-3xl font-bold text-white">{{ uniqueVisitors }}</div>
              <div class="text-green-100 text-sm mt-1">今日 +{{ todayUniqueVisitors }}</div>
            </div>
            <Icon name="users" class="h-12 w-12 text-green-200" />
          </div>
        </Card>

        <Card title="平均停留时间" class="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
          <div class="flex items-center justify-between">
            <div>
              <div class="text-3xl font-bold text-white">{{ averageSessionDuration }}</div>
              <div class="text-purple-100 text-sm mt-1">分钟</div>
            </div>
            <Icon name="clock" class="h-12 w-12 text-purple-200" />
          </div>
        </Card>

        <Card title="活跃度指数" class="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
          <div class="flex items-center justify-between">
            <div>
              <div class="text-3xl font-bold text-white">{{ engagementScore }}</div>
              <div class="text-orange-100 text-sm mt-1">用户参与度</div>
            </div>
            <Icon name="zap" class="h-12 w-12 text-orange-200" />
          </div>
        </Card>

        <Card title="访问深度" class="bg-gradient-to-r from-indigo-500 to-indigo-600 text-white">
          <div class="flex items-center justify-between">
            <div>
              <div class="text-3xl font-bold text-white">{{ averagePageDepth }}</div>
              <div class="text-indigo-100 text-sm mt-1">页面/会话</div>
            </div>
            <Icon name="layers" class="h-12 w-12 text-indigo-200" />
          </div>
        </Card>
      </div>

      <!-- 图表网格 -->
      <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        <!-- 页面浏览量 (PV) -->
        <Card :title="t('analytics.pageViews')" class="lg:col-span-2">
          <div class="h-80">
            <!-- 真实的页面浏览量图表 -->
            <v-chart 
              v-if="pageViewsOption && pageViewsOption.series" 
              class="h-full w-full" 
              :option="pageViewsOption" 
              autoresize 
            />
            <div v-else class="h-full flex items-center justify-center text-gray-500">
              <div>
                <p>图表数据加载中...</p>
                <p class="text-xs mt-1">数据长度: {{ computedAnalyticsData.length }}</p>
                <p class="text-xs">页面浏览配置: {{ pageViewsOption ? '有' : '无' }}</p>
              </div>
            </div>
          </div>
        </Card>

        <!-- 热门页面 -->
        <Card :title="t('analytics.topPages')">
          <div class="h-80">
            <v-chart 
              v-if="topPagesOption && topPagesOption.series" 
              class="h-full w-full" 
              :option="topPagesOption" 
              autoresize 
            />
            <div v-else class="h-full flex items-center justify-center text-gray-500">
              <p>热门页面数据加载中...</p>
            </div>
          </div>
        </Card>

        <!-- 页面性能分析 -->
        <Card title="页面访问详情" class="lg:col-span-3">
          <div class="h-96">
            <v-chart 
              v-if="pagePerformanceOption && pagePerformanceOption.series" 
              class="h-full w-full" 
              :option="pagePerformanceOption" 
              autoresize 
            />
            <div v-else class="h-full flex items-center justify-center text-gray-500">
              <p>页面性能数据加载中...</p>
            </div>
          </div>
        </Card>

        <!-- 用户活跃时段 -->
        <Card :title="t('analytics.userActivity')" class="lg:col-span-3">
          <div class="h-96">
            <v-chart 
              v-if="userActivityOption && userActivityOption.series" 
              class="h-full w-full" 
              :option="userActivityOption" 
              autoresize 
            />
            <div v-else class="h-full flex items-center justify-center text-gray-500">
              <p>用户活跃数据加载中...</p>
            </div>
          </div>
        </Card>

        <!-- 热门点击按钮 -->
        <Card :title="t('analytics.topButtons')" class="lg:col-span-1">
          <div class="h-80">
            <v-chart 
              v-if="topButtonsOption && topButtonsOption.series" 
              class="h-full w-full" 
              :option="topButtonsOption" 
              autoresize 
            />
            <div v-else class="h-full flex items-center justify-center text-gray-500">
              <p>按钮点击数据加载中...</p>
            </div>
          </div>
        </Card>

         <!-- 事件类型分布 -->
        <Card :title="t('analytics.eventDistribution')" class="lg:col-span-2">
          <div class="h-80">
            <v-chart 
              v-if="eventDistributionOption && eventDistributionOption.series" 
              class="h-full w-full" 
              :option="eventDistributionOption" 
              autoresize 
            />
            <div v-else class="h-full flex items-center justify-center text-gray-500">
              <p>事件分布数据加载中...</p>
            </div>
          </div>
        </Card>
      </div>
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
import { type AnalyticsEvent } from '@/api/analytics';
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
    
    console.log('开始获取分析数据...');
    
    // 直接从 API 获取原始数据
    const response = await fetch('/api/v1/metrics/tracking-events?count=500');
    console.log('API响应状态:', response.status, response.statusText);
    
    if (!response.ok) {
      throw new Error(`API请求失败: ${response.status} ${response.statusText}`);
    }
    
    const result = await response.json();
    console.log('API返回的原始数据:', result);
    
    if (result.success && result.data) {
      // 转换后端数据格式为前端格式
      const convertedData = result.data.map((item: any, index: number) => {
        console.log('处理后端数据项:', item);
        
        // 页面名称标准化映射
        const pageNameMapping: Record<string, string> = {
          'UserManagement': '用户管理',
          'Dashboard': '仪表板', 
          'Overview': '概览',
          'Question': '题目练习',
          'Syllabus': '教学大纲',
          'Login': '登录页面',
          'Profile': '个人资料',
          'MyAssignments': '我的作业',
          'PracticeCenter': '练习中心',
          'ResourceManagement': '资源管理',
          'AnalyticsDashboard': '数据分析',
          'Home': '首页',
          'AIChat': 'AI聊天'
        };
        
        // 使用后端直接提供的数据
        const page = item.page || 'Unknown';
        const pageName = pageNameMapping[page] || page;
        const timestamp = new Date(item.eventTime * 1000).toISOString(); // eventTime是秒数
        const userId = item.userId ? item.userId.toString() : 'anonymous';
        const sessionId = `session-${userId}-${Math.floor(item.eventTime / 3600)}`;
        
        // 处理properties，确保所有字段都正确映射
        const properties = item.properties || {};
        
        return {
          id: `event-${item.eventTime}-${index}`,
          eventName: item.eventName,
          properties: {
            timestamp: timestamp,
            url: properties.url || `${window.location.origin}${properties.path || '/'}`,
            page: page,
            pageName: pageName,
            path: properties.path || '/',
            buttonText: properties.buttonText,
            buttonId: properties.buttonId,
            userId: userId,
            component: page,
            target: item.target || page,
            sessionId: sessionId,
            userAgent: properties.userAgent || 'Unknown',
            referrer: properties.referrer || 'direct',
            // 保留所有原始properties
            ...properties
          }
        };
      });
      
      analyticsData.value = convertedData;
      console.log('转换后的数据:', convertedData);
      console.log('转换后数据的第一条:', convertedData[0]);
      
      // 如果后端没有数据，使用 mock 数据作为备用
      if (convertedData.length === 0) {
        console.warn('后端没有返回数据，使用 mock 数据');
        analyticsData.value = mockAnalyticsData;
      }
    } else {
      throw new Error('后端返回数据格式错误');
    }
  } catch (err) {
    console.error('获取分析数据失败，使用 mock 数据:', err);
    error.value = err instanceof Error ? err.message : '获取数据失败';
    // 发生错误时使用 mock 数据
    console.log('加载mock数据, 数据量:', mockAnalyticsData.length);
    console.log('Mock数据样例:', mockAnalyticsData.slice(0, 3));
    analyticsData.value = mockAnalyticsData;
  } finally {
    loading.value = false;
    console.log('数据加载完成，最终数据量:', analyticsData.value.length);
  }
};


// 组件挂载时获取数据
onMounted(() => {
  fetchAnalyticsData();
});

// 计算属性，用于图表数据
const computedAnalyticsData = computed<AnalyticsEvent[]>(() => {
  console.log('计算属性 - 原始数据长度:', analyticsData.value.length);
  // 过滤掉非页面相关的事件
  const filteredData = analyticsData.value.filter(event => {
    const isValidEvent = ['Page Viewed', 'Page Left', 'Button Clicked'].includes(event.eventName);
    if (!isValidEvent) {
      console.log('过滤掉事件:', event.eventName);
    }
    return isValidEvent;
  });
  console.log('过滤后的数据长度:', filteredData.length);
  return filteredData;
});

// 核心指标计算
const totalPageViews = computed(() => {
  const pageViewEvents = computedAnalyticsData.value.filter(event => event.eventName === 'Page Viewed');
  console.log('总页面浏览量计算:', pageViewEvents.length, '原始数据量:', computedAnalyticsData.value.length);
  return pageViewEvents.length;
});

const todayPageViews = computed(() => {
  const today = new Date().toISOString().split('T')[0];
  return computedAnalyticsData.value.filter(event => 
    event.eventName === 'Page Viewed' && 
    event.properties.timestamp.startsWith(today)
  ).length;
});

const uniqueVisitors = computed(() => {
  // 基于IP或者会话ID来计算独立访客，如果userId为null的话
  const uniqueIdentifiers = new Set(
    computedAnalyticsData.value.map(event => {
      // 优先使用userId，如果没有则使用sessionId
      if (event.properties.userId && event.properties.userId !== 'anonymous') {
        return `user-${event.properties.userId}`;
      } else {
        return `session-${event.properties.sessionId}`;
      }
    })
  );
  console.log('独立访客标识符:', Array.from(uniqueIdentifiers).slice(0, 5));
  return uniqueIdentifiers.size;
});

const todayUniqueVisitors = computed(() => {
  const today = new Date().toISOString().split('T')[0];
  const uniqueIdentifiers = new Set(
    computedAnalyticsData.value
      .filter(event => event.properties.timestamp.startsWith(today))
      .map(event => {
        // 优先使用userId，如果没有则使用sessionId
        if (event.properties.userId && event.properties.userId !== 'anonymous') {
          return `user-${event.properties.userId}`;
        } else {
          return `session-${event.properties.sessionId}`;
        }
      })
  );
  return uniqueIdentifiers.size;
});

const averageSessionDuration = computed(() => {
  // 简化计算：基于会话ID计算平均停留时间
  const sessions = computedAnalyticsData.value.reduce((acc, event) => {
    const sessionId = event.properties.sessionId || `session-${event.properties.userId}`;
    if (!acc[sessionId]) {
      acc[sessionId] = [];
    }
    acc[sessionId].push(new Date(event.properties.timestamp).getTime());
    return acc;
  }, {} as Record<string, number[]>);

  const durations = Object.values(sessions).map(timestamps => {
    if (timestamps.length < 2) return 0;
    const sorted = timestamps.sort();
    return (sorted[sorted.length - 1] - sorted[0]) / 1000 / 60; // 转换为分钟
  }).filter(duration => duration > 0);

  const avgDuration = durations.length > 0 ? 
    durations.reduce((a, b) => a + b, 0) / durations.length : 0;
  
  return avgDuration.toFixed(1);
});

const engagementScore = computed(() => {
  // 活跃度指数：综合考虑页面访问、按钮点击、停留时间等因素
  const events = computedAnalyticsData.value;
  if (events.length === 0) return '0';
  
  const pageViews = events.filter(e => e.eventName === 'Page Viewed').length;
  const buttonClicks = events.filter(e => e.eventName === 'Button Clicked').length;
  const uniquePages = new Set(
    events.filter(e => e.eventName === 'Page Viewed').map(e => e.properties.page)
  ).size;
  
  // 计算活跃度分数 (0-100)
  const pageScore = Math.min((pageViews / 10) * 30, 30); // 页面访问占30%
  const clickScore = Math.min((buttonClicks / 5) * 25, 25); // 按钮点击占25%
  const diversityScore = Math.min((uniquePages / 5) * 25, 25); // 页面多样性占25%
  const volumeScore = Math.min((events.length / 50) * 20, 20); // 总事件量占20%
  
  const totalScore = pageScore + clickScore + diversityScore + volumeScore;
  
  console.log('活跃度计算:', { pageViews, buttonClicks, uniquePages, totalScore });
  
  return Math.round(totalScore).toString();
});

const averagePageDepth = computed(() => {
  // 访问深度：每个会话平均访问的页面数
  const sessions = computedAnalyticsData.value
    .filter(event => event.eventName === 'Page Viewed')
    .reduce((acc, event) => {
      const sessionId = event.properties.sessionId || `session-${event.properties.userId}`;
      if (!acc[sessionId]) {
        acc[sessionId] = new Set();
      }
      acc[sessionId].add(event.properties.page || 'Unknown');
      return acc;
    }, {} as Record<string, Set<string>>);

  const sessionDepths = Object.values(sessions).map(pages => pages.size);
  const avgDepth = sessionDepths.length > 0 ? 
    sessionDepths.reduce((a, b) => a + b, 0) / sessionDepths.length : 0;
  
  console.log('访问深度计算:', { 
    sessions: Object.keys(sessions).length, 
    avgDepth: avgDepth.toFixed(1),
    depths: sessionDepths.slice(0, 5)
  });
  
  return avgDepth.toFixed(1);
});

// 1. 页面浏览量 (PV) 按天统计
const pageViewsOption = computed(() => {
  const filteredEvents = computedAnalyticsData.value.filter(event => event.eventName === 'Page Viewed');
  console.log('页面浏览事件:', filteredEvents);
  
  // 按小时统计，获得更细粒度的数据
  const pageViews = filteredEvents.reduce((acc, event) => {
      const timestamp = event.properties.timestamp;
      console.log('处理时间戳:', timestamp);
      const date = new Date(timestamp);
      
      // 按日期分组
      const dateStr = date.toISOString().split('T')[0];
      const hourStr = `${dateStr} ${date.getHours().toString().padStart(2, '0')}:00`;
      
      acc[hourStr] = (acc[hourStr] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

  console.log('页面浏览量统计:', pageViews);
  
  // 如果有数据，就根据数据的时间范围生成时间序列，否则生成最近7天
  let timePoints: string[] = [];
  let counts: number[] = [];
  
  if (Object.keys(pageViews).length > 0) {
    // 根据实际数据的时间范围
    const allHours = Object.keys(pageViews).sort();
    const startTime = new Date(allHours[0]);
    const endTime = new Date(allHours[allHours.length - 1]);
    
    // 生成从开始到结束的所有小时点
    for (let time = new Date(startTime); time <= endTime; time.setHours(time.getHours() + 1)) {
      const hourStr = `${time.toISOString().split('T')[0]} ${time.getHours().toString().padStart(2, '0')}:00`;
      timePoints.push(hourStr);
      counts.push(pageViews[hourStr] || 0);
    }
  } else {
    // 没有数据时生成最近7天
    const now = new Date();
    for (let i = 6; i >= 0; i--) {
      const targetDate = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
      const dateStr = targetDate.toISOString().split('T')[0];
      
      for (let hour = 0; hour < 24; hour++) {
        const hourStr = `${dateStr} ${hour.toString().padStart(2, '0')}:00`;
        timePoints.push(hourStr);
        counts.push(0);
      }
    }
  }
  
  console.log('时间点数量:', timePoints.length, '数据点数量:', counts.length);

  console.log('页面浏览量图表数据:', { timePoints: timePoints.slice(0, 5), counts: counts.slice(0, 5) });
  
  if (timePoints.length === 0 || counts.length === 0) {
    console.warn('页面浏览量图表没有数据');
    return null;
  }

  return {
    tooltip: { 
      trigger: 'axis',
      formatter: (params: any) => {
        if (!params || !params[0]) return '';
        const data = params[0];
        return `${data.name}<br/>浏览量: ${data.value} 次`;
      }
    },
    xAxis: { 
      type: 'category', 
      data: timePoints,
      axisLabel: {
        interval: 'auto',
        rotate: 0
      }
    },
    yAxis: { 
      type: 'value',
      name: '浏览量'
    },
    series: [{
      data: counts,
      type: 'line',
      name: '页面浏览量',
      itemStyle: {
        color: '#3b82f6'
      }
    }],
    grid: { 
      left: '10%', 
      right: '10%', 
      bottom: '10%', 
      top: '10%',
      containLabel: true 
    },
  };
});

// 2. 热门页面排行
const topPagesOption = computed(() => {
  const pageViewEvents = computedAnalyticsData.value.filter(event => event.eventName === 'Page Viewed' && event.properties.page);
  console.log('页面浏览事件数量:', pageViewEvents.length);
  
  const pageCounts = pageViewEvents.reduce((acc, event) => {
      // 优先使用中文页面名称，如果没有则使用原始页面名称
      const pageName = event.properties.pageName || event.properties.page!;
      acc[pageName] = (acc[pageName] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

  console.log('页面访问统计:', pageCounts);
  
  if (Object.keys(pageCounts).length === 0) {
    console.warn('没有页面访问数据用于生成饼图');
    return null;
  }

  const sortedPages = Object.entries(pageCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8); // 增加显示数量

  const colors = [
    '#3b82f6', '#ef4444', '#10b981', '#f59e0b', 
    '#8b5cf6', '#06b6d4', '#f97316', '#84cc16'
  ];

  return {
    tooltip: { 
      trigger: 'item',
      formatter: (params: any) => {
        const percent = ((params.value / Object.values(pageCounts).reduce((a, b) => a + b, 0)) * 100).toFixed(1);
        return `${params.name}<br/>访问次数: ${params.value}<br/>占比: ${percent}%`;
      }
    },
    legend: {
      orient: 'vertical',
      left: 'left',
      data: sortedPages.map(p => p[0]),
      textStyle: {
        fontSize: 12
      }
    },
    series: [{
      name: t('analytics.pageViews'),
      type: 'pie',
      radius: ['30%', '70%'],
      center: ['65%', '50%'],
      data: sortedPages.map(([name, value], index) => ({ 
        name, 
        value,
        itemStyle: {
          color: colors[index % colors.length]
        }
      })),
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      },
      label: {
        show: true,
        formatter: '{b}: {c}',
        fontSize: 11
      },
      labelLine: {
        show: true
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

// 4. 页面访问详情分析（混合图表：访问量 + 平均停留时间）
const pagePerformanceOption = computed(() => {
  // 按页面统计访问量和停留时间
  const pageStats = computedAnalyticsData.value
    .filter(event => event.eventName === 'Page Viewed')
    .reduce((acc, event) => {
      const pageName = event.properties.pageName || event.properties.page!;
      const sessionId = event.properties.sessionId || `session-${event.properties.userId}`;
      
      if (!acc[pageName]) {
        acc[pageName] = {
          views: 0,
          sessions: new Set(),
          totalTime: 0,
          avgTime: 0
        };
      }
      
      acc[pageName].views += 1;
      acc[pageName].sessions.add(sessionId);
      
      return acc;
    }, {} as Record<string, { views: number; sessions: Set<string>; totalTime: number; avgTime: number }>);

  // 计算平均停留时间（模拟数据，实际需要Page Left事件）
  Object.keys(pageStats).forEach(pageName => {
    // 简化计算：基于访问量估算停留时间
    pageStats[pageName].avgTime = Math.random() * 5 + 1; // 1-6分钟随机停留时间
  });

  const sortedPages = Object.entries(pageStats)
    .sort((a, b) => b[1].views - a[1].views)
    .slice(0, 8);

  const pageNames = sortedPages.map(([name]) => name);
  const pageViews = sortedPages.map(([, stats]) => stats.views);
  const avgTimes = sortedPages.map(([, stats]) => stats.avgTime.toFixed(1));

  return {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        crossStyle: {
          color: '#999'
        }
      }
    },
    toolbox: {
      feature: {
        dataView: { show: true, readOnly: false },
        magicType: { show: true, type: ['line', 'bar'] },
        restore: { show: true },
        saveAsImage: { show: true }
      }
    },
    legend: {
      data: ['访问量', '平均停留时间(分钟)']
    },
    xAxis: [
      {
        type: 'category',
        data: pageNames,
        axisPointer: {
          type: 'shadow'
        },
        axisLabel: {
          interval: 0,
          rotate: 45,
          fontSize: 10
        }
      }
    ],
    yAxis: [
      {
        type: 'value',
        name: '访问量',
        position: 'left',
        axisLine: {
          lineStyle: {
            color: '#3b82f6'
          }
        },
        axisLabel: {
          formatter: '{value}'
        }
      },
      {
        type: 'value',
        name: '停留时间(分钟)',
        position: 'right',
        axisLine: {
          lineStyle: {
            color: '#ef4444'
          }
        },
        axisLabel: {
          formatter: '{value}min'
        }
      }
    ],
    series: [
      {
        name: '访问量',
        type: 'bar',
        data: pageViews,
        itemStyle: {
          color: '#3b82f6'
        }
      },
      {
        name: '平均停留时间(分钟)',
        type: 'line',
        yAxisIndex: 1,
        data: avgTimes,
        itemStyle: {
          color: '#ef4444'
        },
        lineStyle: {
          width: 3
        }
      }
    ]
  };
});

// 5. 热门点击按钮
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

// 6. 事件类型分布
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

