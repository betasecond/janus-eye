// src/services/tracking.ts

/**
 * @description
 * This is a simplified tracking service for demonstration purposes.
 * In a real-world application, this would send data to a service like Google Analytics, Mixpanel, etc.
 */

interface TrackingEvent {
  eventName: string;
  properties: Record<string, any>;
}

/**
 * Tracks an event.
 * @param eventName - The name of the event to track.
 * @param properties - An object of properties to associate with the event.
 */
export function trackEvent(eventName: string, properties: Record<string, any> = {}) {
  const event: TrackingEvent = {
    eventName,
    properties: {
      ...properties,
      timestamp: new Date().toISOString(),
      url: window.location.href,
    },
  };

  // In a real app, you'd send this to your analytics backend.
  // For this demo, we'll just log it to the console.
  console.log('[Tracking Event]', event);
}

