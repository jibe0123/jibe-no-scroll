export const useAnalytics = () => {
  const trackEvent = (eventName: string, eventParams?: Record<string, any>) => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', eventName, eventParams);
    }
  };

  const trackSocialClick = (platform: string, url: string) => {
    trackEvent('social_click', {
      platform,
      url,
      timestamp: new Date().toISOString(),
    });
  };

  return { trackEvent, trackSocialClick };
};
