import { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

const translations = {
  en: {
    nav: {
      home: 'Home',
      about: 'About',
      skills: 'Skills',
      projects: 'Projects',
      experience: 'Experience',
      education: 'Education',
      contact: 'Contact',
    },
    hero: {
      greeting: "Hi, I'm",
      name: 'Yanick ASSOGBA',
      title: 'Full Stack Developer',
      subtitle: 'Passionate about creating amazing web experiences',
      cta: 'View My Work',
      cta2: 'Get In Touch',
    },
    about: {
      title: 'About Me',
      description: 'A passionate developer with a love for creating innovative solutions and beautiful user experiences.',
      experience: 'Years Experience',
      projects: 'Projects Completed',
      clients: 'Happy Clients',
    },
    skills: {
      title: 'Skills & Technologies',
      subtitle: 'Technologies I work with',
    },
    projects: {
      title: 'My Projects',
      subtitle: 'Some of my recent work',
      viewDemo: 'View Demo',
      viewCode: 'View Code',
      all: 'All',
    },
    experience: {
      title: 'Experience',
      subtitle: 'My professional journey',
    },
    education: {
      title: 'Education',
      subtitle: 'My academic background',
    },
    contact: {
      title: 'Get In Touch',
      subtitle: 'Let\'s work together',
      name: 'Full Name',
      namePlaceholder: 'John Doe',
      email: 'Email Address',
      emailPlaceholder: 'john@example.com',
      message: 'Message',
      messagePlaceholder: 'Tell me about your project or inquiry...',
      send: 'Send Message',
      sending: 'Sending...',
      success: 'Message sent successfully! I\'ll get back to you soon.',
      error: 'Failed to send message. Please try again.',
      emailLabel: 'Email',
      phoneLabel: 'Phone',
      locationLabel: 'Location',
      required: 'This field is required',
      invalidEmail: 'Please enter a valid email address',
      minLength: 'Message must be at least 10 characters',
      info: 'Contact Information',
      social: 'Social Networks',
      getInTouch: 'Don\'t hesitate to reach out!',
    },
    footer: {
      rights: 'All rights reserved.',
      madeWith: 'Made with',
      by: 'by',
      quickLinks: 'Quick Links',
      social: 'Social Networks',
    },
  },
  fr: {
    nav: {
      home: 'Accueil',
      about: 'À propos',
      skills: 'Compétences',
      projects: 'Projets',
      experience: 'Expérience',
      education: 'Formation',
      contact: 'Contact',
    },
    hero: {
      greeting: 'Salut, je suis',
      name: 'Yanick ASSOGBA',
      title: 'Développeur Full Stack',
      subtitle: 'Passionné par la création d\'expériences web exceptionnelles',
      cta: 'Voir mes projets',
      cta2: 'Me contacter',
    },
    about: {
      title: 'À propos de moi',
      description: 'Un développeur passionné avec un amour pour la création de solutions innovantes et de belles expériences utilisateur.',
      experience: 'Années d\'expérience',
      projects: 'Projets réalisés',
      clients: 'Clients satisfaits',
    },
    skills: {
      title: 'Compétences & Technologies',
      subtitle: 'Les technologies avec lesquelles je travaille',
    },
    projects: {
      title: 'Mes Projets',
      subtitle: 'Quelques-uns de mes travaux récents',
      viewDemo: 'Voir la démo',
      viewCode: 'Voir le code',
      all: 'Tous',
    },
    experience: {
      title: 'Expérience',
      subtitle: 'Mon parcours professionnel',
    },
    education: {
      title: 'Formation',
      subtitle: 'Mon parcours académique',
    },
    contact: {
      title: 'Contactez-moi',
      subtitle: 'Travaillons ensemble',
      name: 'Nom complet',
      namePlaceholder: 'Yanick ASSOGBA',
      email: 'Adresse e-mail',
      emailPlaceholder: 'assogbayanick2003@gmail.com',
      message: 'Message',
      messagePlaceholder: 'Parlez-moi de votre projet ou de votre demande...',
      send: 'Envoyer le message',
      sending: 'Envoi en cours...',
      success: 'Message envoyé avec succès ! Je vous répondrai bientôt.',
      error: 'Échec de l\'envoi du message. Veuillez réessayer.',
      emailLabel: 'E-mail',
      phoneLabel: 'Téléphone',
      locationLabel: 'Localisation',
      required: 'Ce champ est requis',
      invalidEmail: 'Veuillez entrer une adresse e-mail valide',
      minLength: 'Le message doit contenir au moins 10 caractères',
      info: 'Informations de contact',
      social: 'Réseaux sociaux',
      getInTouch: 'N\'hésitez pas à me contacter !',
    },
    footer: {
      rights: 'Tous droits réservés.',
      madeWith: 'Fait avec',
      by: 'par',
      quickLinks: 'Liens rapides',
      social: 'Réseaux sociaux',
    },
  },
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    const saved = localStorage.getItem('language');
    return saved || 'fr';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const t = (key) => {
    const keys = key.split('.');
    let value = translations[language];
    for (const k of keys) {
      value = value?.[k];
    }
    return value || key;
  };

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'en' ? 'fr' : 'en'));
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

