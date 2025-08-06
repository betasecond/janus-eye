// src/data/analyticsData.ts

// This file simulates the data that would be returned from a backend analytics API.
import { mockUsers } from './mockData';
import { type AnalyticsEvent } from '@/api/analytics';

// Generate more realistic mock data
const users = mockUsers.map(u => u.id); // Use real UUIDs from mockData
const pages: Array<{name: string, pageName: string, path: string}> = [
  { name: 'Login', pageName: '登录页面', path: '/login' },
  { name: 'Dashboard', pageName: '仪表板', path: '/dashboard' },
  { name: 'Syllabus', pageName: '教学大纲', path: '/syllabus' },
  { name: 'Home', pageName: '首页', path: '/home' },
  { name: 'Profile', pageName: '个人资料', path: '/profile' },
  { name: 'AIChat', pageName: 'AI聊天', path: '/ai-chat' },
  { name: 'UserManagement', pageName: '用户管理', path: '/admin/users' },
  { name: 'Question', pageName: '题目练习', path: '/question' },
  { name: 'Overview', pageName: '概览', path: '/overview' },
  { name: 'AnalyticsDashboard', pageName: '数据分析', path: '/analytics' },
];
const buttons = [
  { text: 'Log In', id: 'login-button' },
  { text: 'Submit', id: 'submit-quiz' },
  { text: 'View Details', id: 'view-details-btn' },
  { text: 'Next Page', id: 'next-page' },
  { text: 'Logout', id: 'logout-btn' }
];

const generateRandomEvent = (id: number): AnalyticsEvent => {
  const eventType = Math.random();
  const timestamp = new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(); // 最近7天
  const user = users[Math.floor(Math.random() * users.length)];
  const sessionId = `session-${user}-${Math.floor(Date.parse(timestamp) / (1000 * 60 * 60))}`; // 按小时生成会话ID

  if (eventType < 0.6) { // 60% Page Viewed
    const page = pages[Math.floor(Math.random() * pages.length)];
    return {
      id: `evt-${id}`,
      eventName: 'Page Viewed',
      properties: {
        timestamp,
        url: `http://localhost:5173${page.path}`,
        page: page.name,
        pageName: page.pageName,
        path: page.path,
        userId: user,
        component: page.name,
        sessionId: sessionId,
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        referrer: Math.random() > 0.5 ? 'https://google.com' : 'direct',
        target: page.name,
      },
    };
  } else if (eventType < 0.8) { // 20% Page Left
     const page = pages[Math.floor(Math.random() * pages.length)];
     return {
      id: `evt-${id}`,
      eventName: 'Page Left',
      properties: {
        timestamp,
        url: `http://localhost:5173${page.path}`,
        page: page.name,
        pageName: page.pageName,
        path: page.path,
        userId: user,
        component: page.name,
        sessionId: sessionId,
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        referrer: Math.random() > 0.5 ? 'https://google.com' : 'direct',
        target: page.name,
      },
    };
  } else { // 20% Button Clicked
    const button = buttons[Math.floor(Math.random() * buttons.length)];
    const page = pages[Math.floor(Math.random() * pages.length)];
    return {
      id: `evt-${id}`,
      eventName: 'Button Clicked',
      properties: {
        timestamp,
        url: `http://localhost:5173${page.path}`,
        page: page.name,
        pageName: page.pageName,
        path: page.path,
        buttonText: button.text,
        buttonId: button.id,
        userId: user,
        component: page.name,
        sessionId: sessionId,
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        referrer: Math.random() > 0.5 ? 'https://google.com' : 'direct',
        target: button.id,
      },
    };
  }
};

export const mockAnalyticsData: AnalyticsEvent[] = Array.from({ length: 500 }, (_, i) => generateRandomEvent(i));
