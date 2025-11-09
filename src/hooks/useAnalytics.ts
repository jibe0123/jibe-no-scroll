import { useCookieConsent } from './useCookieConsent';

export const useAnalytics = () => {
  const { hasConsent } = useCookieConsent();

  const trackEvent = (eventName: string, eventParams?: Record<string, any>) => {
    // Only track if user has given consent
    if (!hasConsent) return;
    
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
