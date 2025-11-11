import { useState, useEffect } from 'react';

export type Language = 'fr' | 'en';

export const translations = {
  fr: {
    title: 'Jibe',
    subtitle: 'Backend & Data Engineer',
    description: '👾 Backend & Data Engineer explorant l\'intersection des systèmes, données et intelligence. Je travaille avec Golang, Python, PHP et TypeScript, construisant des backends scalables et des pipelines de données efficaces. Infiniment curieux et toujours en apprentissage — des architectures backend aux frontières de l\'IA, ML/DL et IA Générative. Également fasciné par l\'IoT et le Web3, j\'aime expérimenter là où la technologie rencontre l\'impact réel. 🔥 Passionné d\'agentic, je crois que l\'avenir du logiciel réside dans la collaboration entre humains et systèmes intelligents — pas l\'automatisation pour elle-même, mais l\'augmentation avec un but.',
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
    description: '👾 Backend & Data Engineer exploring the intersection of systems, data, and intelligence. I work with Golang, Python, PHP, and TypeScript, building scalable backends and efficient data pipelines. I\'m endlessly curious and always learning — from backend architectures to the frontiers of AI, ML/DL, and Generative AI. Equally fascinated by IoT and Web3, I like experimenting where technology meets real-world impact. 🔥 Agentic enthusiast, I believe the future of software lies in collaboration between humans and intelligent systems — not automation for its own sake, but augmentation with purpose.',
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
