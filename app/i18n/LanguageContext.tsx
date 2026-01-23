"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type Lang = "fr" | "en";

type I18nContext = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string) => string;
};

const translations: Record<Lang, Record<string, string>> = {
  fr: {
    "nav.home": "Accueil",
    "nav.about": "À propos",
    "nav.services": "Services",
    "nav.reviews": "Avis",

    "hero.title.line1": "NOTRE MARKETING",
    "hero.title.line2": "DIGITAL GÉNÈRE",
    "hero.title.line3": "DES PROSPECTS ",
    "hero.title.line4": "POUR VOTRE ",
    "hero.title.line5": "ENTREPRISE",
    "hero.subtitle": "Nous optimisons votre marketing digital pour de meilleurs résultats,",
    "hero.subtitle2": "en vous faisant gagner temps et argent !",
    "hero.cta": "Commencer maintenant",

    "about.title": "NOTRE MISSION: ",
    "about.title2": "VOTRE SUCCÈS",
    "about.text": "Nous sommes dédiés à accélérer la croissance des entreprises grâce à des stratégies complètes de publicité numérique et en ligne. Notre équipe d’experts excelle en stratégies marketing, SEO, marketing de contenu et réseaux sociaux. Partenaire avec VISIOAD et découvrez une approche sur mesure du marketing digital qui transforme votre entreprise.",

    "services.heading": "NOS DOMAINES D’EXPERTISE",
    "services.description": "Chez VisioAd, nous offrons des services complets pour booster la portée de votre marque, de la stratégie marketing à la création de contenu et production média, pour stimuler croissance et engagement.",
    "service.0.title": "Marketing Digital",
    "service.0.desc": "Nos services de marketing digital sont conçus pour améliorer votre présence en ligne et engager efficacement votre audience.",
    "service.1.title": "Création de contenu & production multimédia",
    "service.1.desc": "Nous livrons du contenu de haute qualité et une production médiatique conçue pour raconter l’histoire de votre marque.",
    "service.2.title": "Services de design",
    "service.2.desc": "Élevez votre marque avec des designs créatifs et fonctionnels, alliant innovation et praticité pour réussir.",
    "service.3.title": "Développement web & app",
    "service.3.desc": "Création de sites web et d’applications responsives conçus pour offrir des expériences utilisateur fluides et générer des résultats.",
    "service.4.title": "Ventes et gestion de comptes",
    "service.4.desc": "Stimuler la croissance grâce à des stratégies de vente expertes et une gestion de compte dédiée pour établir des relations clients durables.",
    "service.5.title": "Surveillance CCTV",
    "service.5.desc": "Assurez la sécurité avec surveillance CCTV 24/7, alertes en temps réel et accès à distance, partout et à tout moment.",

    "faq.prompt": "Tu ne trouves pas ta réponse ?",
    "contact.heading": "Contactez-nous",
    "contact.subtitle": "Obtenez un devis gratuit",
    "contact.paragraph": "Nous sommes impatients de vous rencontrer ! Remplissez le formulaire ci-dessous et transformons votre vision en réalité.",
    "contact.label.name": "nom",
    "contact.label.email": "email",
    "contact.label.subject": "sujet",
    "contact.label.message": "message",
    "contact.send": "Envoyer",

    "avis.heading": "L’IMPACT DE NOS STRATÉGIES",
    "footer.copyright": "visioad. Tous droits réservés.",
  },
  en: {
    "nav.home": "Home",
    "nav.about": "About",
    "nav.services": "Services",
    "nav.reviews": "Reviews",

    "hero.title.line1": "OUR MARKETING",
    "hero.title.line2": "DIGITAL GENERATES",
    "hero.title.line3": "LEADS ",
    "hero.title.line4": "FOR YOUR",
    "hero.title.line5": "BUSINESS",
    "hero.subtitle": "We optimize your digital marketing for better results,",
    "hero.subtitle2": "saving you time and money!",
    "hero.cta": "Get started",

    "about.title": "OUR MISSION:",
    "about.title2": " YOUR SUCCESS",
    "about.text": "We are dedicated to accelerating business growth through comprehensive digital advertising and online strategies. Our team of experts excels in marketing strategies, SEO, content marketing, and social media. Partner with VISIOAD and discover a tailored digital marketing approach that transforms your business.",

    "services.heading": "OUR AREAS OF EXPERTISE",
    "services.description": "At VisioAd we provide full services to boost your brand reach, from marketing strategy to content creation and media production to drive growth and engagement.",
    "service.0.title": "Digital Marketing",
    "service.0.desc": "Our digital marketing services are designed to improve your online presence and effectively engage your audience.",
    "service.1.title": "Content Creation & Multimedia Production",
    "service.1.desc": "We deliver high-quality content and media production designed to tell your brand's story.",
    "service.2.title": "Design Services",
    "service.2.desc": "Elevate your brand with creative and functional designs that combine innovation and practicality to succeed.",
    "service.3.title": "Web & App Development",
    "service.3.desc": "Building responsive websites and applications designed to deliver smooth user experiences and produce results.",
    "service.4.title": "Sales & Account Management",
    "service.4.desc": "Drive growth through expert sales strategies and dedicated account management to build lasting customer relationships.",
    "service.5.title": "CCTV Monitoring",
    "service.5.desc": "Ensure safety with 24/7 CCTV monitoring, real-time alerts and remote access from anywhere.",

    "faq.prompt": "Can't find your answer?",
    "contact.heading": "Contact Us",
    "contact.subtitle": "Get a free quote",
    "contact.paragraph": "We look forward to meeting you! Fill out the form below and let's turn your vision into reality.",
    "contact.label.name": "name",
    "contact.label.email": "email",
    "contact.label.subject": "subject",
    "contact.label.message": "message",
    "contact.send": "Send",

    "avis.heading": "THE IMPACT OF OUR STRATEGIES",
    "footer.copyright": "visioad. All rights reserved.",
  },
};

const I18nContext = createContext<I18nContext | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<Lang>("fr");

  useEffect(() => {
    try {
      const stored = localStorage.getItem("lang");
      if (stored === "en" || stored === "fr") setLangState(stored);
    } catch (e) {
      
    }
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem("lang", l);
    } catch (e) {
      
    }
  };

  const t = (key: string) => {
    return translations[lang][key] ?? key;
  };

  return <I18nContext.Provider value={{ lang, setLang, t }}>{children}</I18nContext.Provider>;
};

export const useLanguage = () => {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
};
