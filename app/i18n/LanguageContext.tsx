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
    "nav.services": "EXPERTISES",
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

    "faq.prompt": "Vous ne trouvez pas votre réponse ?",
    "contact.heading": "Contactez-nous",
    "contact.subtitle": "Obtenez un devis gratuit",
    "contact.paragraph": "Discutons de votre projet !Contactez-nous en envoyant un message, et notre équipe vous répondra dans un délai d'un jour ouvré. Que vous ayez des questions ou ayez besoin d'une solution sur mesure, nous sommes là pour vous aider à concrétiser votre vision.",
    "contact.label.name": "Nom",
    "contact.label.email": "Email",
    "contact.label.subject": "Sujet",
    "contact.label.message": "Message",
    "contact.send": "Envoyer",
    "contact.social.facebook": "Facebook",
    "contact.social.instagram": "Instagram",
    "contact.social.youtube": "YouTube",
    "contact.metric.satisfaction": "Taux de satisfaction des clients",
    "contact.metric.campaignImpact": "Portée et impact de la campagne",
    "contact.metric.monthlyReach": "Portée mensuelle des réseaux",
  "contact.success": "Message envoyé — merci ! Nous vous répondrons bientôt.",
  "contact.error.fill": "Veuillez remplir tous les champs requis.",
  "contact.error.network": "Erreur d'envoi. Veuillez réessayer plus tard.",

    "avis.heading": "L’IMPACT DE NOS STRATÉGIES",
    "avis.0.desc": "VISIOAD a conçu notre site avec un design soigné et une expérience optimale, renforçant notre présence en ligne.",
    "avis.0.name": "Lucas Martin",
    "avis.0.role": "Responsable de la marque",
    "avis.1.desc": "De la conception au marketing, l’expertise et la stratégie de VISIOAD ont renforcé notre succès numérique.",
    "avis.1.name": "David Carter",
    "avis.1.role": "Responsable de la stratégie",
    "avis.2.desc": "Grâce à VISIOAD, notre entreprise a connu un essor significatif de sa présence en ligne grâce à leurs campagnes digitales ciblées.",
    "avis.2.name": "Sophie Lambert",
    "avis.2.role": "Directeur du marketing",
    "avis.3.desc": "L'équipe de VISIOAD a aidé à élever nos efforts marketing avec des idées innovantes et des stratégies qui ont généré une croissance significative !",
    "avis.3.name": "Sophia Miller",
    "avis.3.role": "Responsable Marketing de Croissance",
    "avis.4.desc": "Travailler avec VISIOAD a révolutionné notre stratégie de contenu. Leur expertise nous a aidés à créer du contenu percutant !",
    "avis.4.name": "Liam Matthews",
    "avis.4.role": "Stratège en Contenu",
    "avis.5.desc": "Collaborer avec VISIOAD a été une décision clé pour notre entreprise. Leur équipe a fourni des stratégies marketing exceptionnelles.",
    "avis.5.name": "Ethan Parker",
    "avis.5.role": "PDG",
    "footer.copyright": "visioad. Tous droits réservés.",
  "footer.newsletter.title": "Restez connecté",
  "footer.newsletter.desc": "Inscrivez-vous pour nos dernières mises à jour.",
  "footer.newsletter.placeholder": "Votre email",
  "footer.newsletter.submit": "Envoyer",
  },
  en: {
    "nav.home": "Home",
    "nav.about": "About",
    "nav.services": "EXPERTISE",
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
    "contact.paragraph": "Let’s discuss your project! Contact us by sending a message, and our team will get back to you within one business day. Whether you have questions or need a tailored solution, we are here to help you bring your vision to life.",
    "contact.label.name": "Name",
    "contact.label.email": "Email",
    "contact.label.subject": "Subject",
    "contact.label.message": "Message",
    "contact.send": "Send",
    "contact.social.facebook": "Facebook",
    "contact.social.instagram": "Instagram",
    "contact.social.youtube": "YouTube",
    "contact.metric.satisfaction": "Customer satisfaction rate",
    "contact.metric.campaignImpact": "Campaign reach & impact",
    "contact.metric.monthlyReach": "Monthly social reach",
  "contact.success": "Message sent — thank you! We'll get back to you soon.",
  "contact.error.fill": "Please fill in all required fields.",
  "contact.error.network": "Error sending message. Please try again later.",

    "avis.heading": "THE IMPACT OF OUR STRATEGIES",
    "avis.0.desc": "VISIOAD designed our website with a polished design and an optimal experience, strengthening our online presence.",
    "avis.0.name": "Lucas Martin",
    "avis.0.role": "Brand Manager",
    "avis.1.desc": "From design to marketing, VISIOAD's expertise and strategy have strengthened our digital success.",
    "avis.1.name": "David Carter",
    "avis.1.role": "Head of Strategy",
    "avis.2.desc": "Thanks to VISIOAD, our business experienced significant growth in online presence thanks to their targeted digital campaigns.",
    "avis.2.name": "Sophie Lambert",
    "avis.2.role": "Director of Marketing",
    "avis.3.desc": "The VISIOAD team helped elevate our marketing efforts with innovative ideas and strategies that generated significant growth!",
    "avis.3.name": "Sophia Miller",
    "avis.3.role": "Growth Marketing Manager",
    "avis.4.desc": "Working with VISIOAD revolutionized our content strategy. Their expertise helped us create impactful content!",
    "avis.4.name": "Liam Matthews",
    "avis.4.role": "Content Strategist",
    "avis.5.desc": "Collaborating with VISIOAD was a key decision for our company. Their team delivered outstanding marketing strategies.",
    "avis.5.name": "Ethan Parker",
    "avis.5.role": "CEO",
    "footer.copyright": "visioad. All rights reserved.",
  "footer.newsletter.title": "Stay connected",
  "footer.newsletter.desc": "Sign up for our latest updates.",
  "footer.newsletter.placeholder": "Your email",
  "footer.newsletter.submit": "Send",
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
