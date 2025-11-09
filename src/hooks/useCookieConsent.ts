import { useState, useEffect } from 'react';

export type ConsentStatus = 'pending' | 'accepted' | 'rejected';

const CONSENT_KEY = 'cookie-consent';

export const useCookieConsent = () => {
  const [consentStatus, setConsentStatus] = useState<ConsentStatus>('pending');

  useEffect(() => {
    const stored = localStorage.getItem(CONSENT_KEY);
    if (stored === 'accepted' || stored === 'rejected') {
      setConsentStatus(stored as ConsentStatus);
      
      // Load Google Analytics if consent was previously given
      if (stored === 'accepted') {
        loadGoogleAnalytics();
      }
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem(CONSENT_KEY, 'accepted');
    setConsentStatus('accepted');
    loadGoogleAnalytics();
  };

  const rejectCookies = () => {
    localStorage.setItem(CONSENT_KEY, 'rejected');
    setConsentStatus('rejected');
  };

  const resetConsent = () => {
    localStorage.removeItem(CONSENT_KEY);
    setConsentStatus('pending');
  };

  return {
    consentStatus,
    acceptCookies,
    rejectCookies,
    resetConsent,
    hasConsent: consentStatus === 'accepted',
  };
};

const loadGoogleAnalytics = () => {
  // Replace with your actual GA measurement ID
  const GA_MEASUREMENT_ID = 'G-XXXXXXXXXX';
  
  // Load gtag.js script
  const script = document.createElement('script');
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  script.async = true;
  document.head.appendChild(script);

  // Initialize gtag
  (window as any).dataLayer = (window as any).dataLayer || [];
  function gtag(...args: any[]) {
    (window as any).dataLayer.push(args);
  }
  (window as any).gtag = gtag;
  gtag('js', new Date());
  gtag('config', GA_MEASUREMENT_ID, {
    anonymize_ip: true, // Anonymize IP for GDPR compliance
  });
};
