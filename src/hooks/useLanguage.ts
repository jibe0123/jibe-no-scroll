import { useState, useEffect } from 'react';

export type Language = 'fr' | 'en';

export const translations = {
  fr: {
    title: 'Jibe',
    subtitle: 'Développeur full-stack',
    description: 'Développeur full-stack passionné par la création d\'expériences web modernes et performantes. Spécialisé en React, TypeScript et architecture cloud.',
    available: 'Disponible',
    location: 'Remote EU / Paris',
    github: 'Profil GitHub',
    linkedin: 'Profil LinkedIn',
    email: 'Envoyer un email',
    play: 'Jouer',
    stop: 'Stop',
  },
  en: {
    title: 'Jibe',
    subtitle: 'Full-stack developer',
    description: 'Full-stack developer passionate about creating modern and performant web experiences. Specialized in React, TypeScript and cloud architecture.',
    available: 'Available',
    location: 'Remote EU / Paris',
    github: 'GitHub profile',
    linkedin: 'LinkedIn profile',
    email: 'Send email',
    play: 'Play',
    stop: 'Stop',
  },
};

export const useLanguage = () => {
  const [language, setLanguage] = useState<Language>('fr');

  useEffect(() => {
    // Detect browser language
    const browserLang = navigator.language.toLowerCase();
    
    if (browserLang.startsWith('fr')) {
      setLanguage('fr');
    } else {
      setLanguage('en');
    }
  }, []);

  const t = translations[language];

  return { language, setLanguage, t };
};
