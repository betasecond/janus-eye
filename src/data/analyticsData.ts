// src/data/analyticsData.ts

// This file simulates the data that would be returned from a backend analytics API.
import { mockUsers } from './mockData';

export interface AnalyticsEvent {
  id: string;
  eventName: 'Page Viewed' | 'Page Left' | 'Button Clicked';
  properties: {
    timestamp: string; // ISO 8601 format
    url: string;
    page?: string; // e.g., 'Dashboard', 'Login'
    path?: string; // e.g., '/dashboard', '/login'
    buttonText?: string;
    buttonId?: string;
    userId: string;
    component?: string;
  };
}

// Generate more realistic mock data
const users = mockUsers.map(u => u.id); // Use real UUIDs from mockData
const pages = [
  { name: 'Login', path: '/login' },
  { name: 'Dashboard', path: '/dashboard' },
  { name: 'Syllabus', path: '/syllabus' },
  { name: 'Home', path: '/home' },
  { name: 'Profile', path: '/profile' },
  { name: 'AIChat', path: '/ai-chat' },
  { name: 'UserManagement', path: '/admin/users' },
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
  const timestamp = new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString();
  const user = users[Math.floor(Math.random() * users.length)];

  if (eventType < 0.6) { // 60% Page Viewed
    const page = pages[Math.floor(Math.random() * pages.length)];
    return {
      id: `evt-${id}`,
      eventName: 'Page Viewed',
      properties: {
        timestamp,
        url: `http://localhost:5173${page.path}`,
        page: page.name,
        path: page.path,
        userId: user,
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
        path: page.path,
        userId: user,
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
        path: page.path,
        buttonText: button.text,
        buttonId: button.id,
        userId: user,
        component: page.name,
      },
    };
  }
};

export const mockAnalyticsData: AnalyticsEvent[] = Array.from({ length: 500 }, (_, i) => generateRandomEvent(i));
