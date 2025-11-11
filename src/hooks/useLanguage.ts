import { useState, useEffect } from 'react';

export type Language = 'fr' | 'en';

export const translations = {
  fr: {
    title: 'Jibe',
    subtitle: 'Backend & Data Engineer',
    description: '👾 Backend & Data Engineer explorant l\'intersection des systèmes, données et intelligence.\n\nJe construis des backends scalables et pipelines de données avec Golang, Python, PHP et TypeScript. Passionné par l\'IA, ML/DL, IoT et Web3.\n\n🔥 Agentic enthusiast — je crois en la collaboration entre humains et systèmes intelligents, pas l\'automatisation aveugle mais l\'augmentation avec un but.',
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
    subtitle: 'Backend & Data Engineer',
    description: '👾 Backend & Data Engineer exploring the intersection of systems, data, and intelligence.\n\nI build scalable backends and data pipelines with Golang, Python, PHP, and TypeScript. Passionate about AI, ML/DL, IoT, and Web3.\n\n🔥 Agentic enthusiast — I believe in collaboration between humans and intelligent systems, not blind automation but augmentation with purpose.',
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
