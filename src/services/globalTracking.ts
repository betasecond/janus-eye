import { analyticsApi } from '@/api/analytics';
import { reactive } from 'vue';

/**
 * 全局跟踪状态
 */
interface TrackingState {
  currentPage: string;
  currentUserId: number | null;
  isEnabled: boolean;
}

/**
 * 全局跟踪服务
 */
class GlobalTrackingService {
  private state: TrackingState = reactive({
    currentPage: '',
    currentUserId: null,
    isEnabled: true
  });

  /**
   * 设置当前用户ID
   */
  setUserId(userId: number | null) {
    this.state.currentUserId = userId;
  }

  /**
   * 设置当前页面
   */
  setCurrentPage(page: string) {
    if (this.state.currentPage && this.state.currentPage !== page) {
      // 发送页面离开事件
      this.trackPageLeave(this.state.currentPage);
    }
    
    this.state.currentPage = page;
    // 发送页面浏览事件
    this.trackPageView(page);
  }

  /**
   * 启用/禁用跟踪
   */
  setEnabled(enabled: boolean) {
    this.state.isEnabled = enabled;
  }

  /**
   * 跟踪页面浏览事件
   */
  async trackPageView(page: string, additionalProps?: Record<string, any>) {
    if (!this.state.isEnabled) return;

    try {
      await analyticsApi.trackPageView(page, this.state.currentUserId || undefined, {
        referrer: document.referrer,
        userAgent: navigator.userAgent,
        timestamp: new Date().toISOString(),
        ...additionalProps
      });
    } catch (error) {
      console.warn('Failed to track page view:', error);
    }
  }

  /**
   * 跟踪按钮点击事件
   */
  async trackButtonClick(
    buttonText: string, 
    buttonId: string, 
    additionalProps?: Record<string, any>
  ) {
    if (!this.state.isEnabled) return;

    try {
      await analyticsApi.trackButtonClick(
        buttonText, 
        buttonId, 
        this.state.currentPage, 
        this.state.currentUserId || undefined,
        {
          timestamp: new Date().toISOString(),
          ...additionalProps
        }
      );
    } catch (error) {
      console.warn('Failed to track button click:', error);
    }
  }

  /**
   * 跟踪页面离开事件
   */
  async trackPageLeave(page: string, additionalProps?: Record<string, any>) {
    if (!this.state.isEnabled) return;

    try {
      await analyticsApi.trackPageLeave(page, this.state.currentUserId || undefined, {
        timeOnPage: Date.now() - (this.state as any).pageStartTime,
        timestamp: new Date().toISOString(),
        ...additionalProps
      });
    } catch (error) {
      console.warn('Failed to track page leave:', error);
    }
  }

  /**
   * 跟踪自定义事件
   */
  async trackCustomEvent(
    eventName: string,
    target: string,
    properties?: Record<string, any>
  ) {
    if (!this.state.isEnabled) return;

    try {
      await analyticsApi.sendTrackingEvent({
        eventName,
        eventTime: new Date().toISOString(),
        page: this.state.currentPage,
        target,
        userId: this.state.currentUserId || undefined,
        properties: {
          timestamp: new Date().toISOString(),
          ...properties
        }
      });
    } catch (error) {
      console.warn('Failed to track custom event:', error);
    }
  }

  /**
   * 获取当前状态
   */
  getState() {
    return { ...this.state };
  }
}

// 创建全局实例
export const globalTracking = new GlobalTrackingService();

/**
 * Vue 指令，用于自动跟踪按钮点击
 */
export const trackClickDirective = {
  mounted(el: HTMLElement, binding: any) {
    const { value } = binding;
    const buttonText = value?.text || el.textContent?.trim() || 'Unknown Button';
    const buttonId = value?.id || el.id || `btn-${Date.now()}`;

    const clickHandler = () => {
      globalTracking.trackButtonClick(buttonText, buttonId, value?.props);
    };

    el.addEventListener('click', clickHandler);
    // 保存处理器以便后续清理
    (el as any)._trackClickHandler = clickHandler;
  },

  unmounted(el: HTMLElement) {
    if ((el as any)._trackClickHandler) {
      el.removeEventListener('click', (el as any)._trackClickHandler);
      delete (el as any)._trackClickHandler;
    }
  }
};

/**
 * 组合式函数，用于在组件中使用跟踪功能
 */
export function useTracking() {
  return {
    trackPageView: globalTracking.trackPageView.bind(globalTracking),
    trackButtonClick: globalTracking.trackButtonClick.bind(globalTracking),
    trackPageLeave: globalTracking.trackPageLeave.bind(globalTracking),
    trackCustomEvent: globalTracking.trackCustomEvent.bind(globalTracking),
    setCurrentPage: globalTracking.setCurrentPage.bind(globalTracking),
    setUserId: globalTracking.setUserId.bind(globalTracking),
    getState: globalTracking.getState.bind(globalTracking)
  };
}