"use client";

import Image from 'next/image';
import { useRef, useState } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { motion } from 'framer-motion';
import FadeInUp from '../animation/FadeInUp';

export default function Hero() {
  const { t } = useLanguage();
  const btnRef = useRef<HTMLAnchorElement | null>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMagnetMove = (e: React.MouseEvent) => {
    const el = (e.currentTarget as HTMLElement);
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const max = 18; 
    const x = Math.max(-max, Math.min(max, dx * 0.22));
    const y = Math.max(-max, Math.min(max, dy * 0.22));
    setOffset({ x, y });
  };

  const handleMagnetLeave = () => setOffset({ x: 0, y: 0 });

  return (
    <section  className="relative flex items-center justify-center min-h-screen md:h-screen overflow-hidden bg-black pt-24 md:pt-0">
      
      {/* IMAGE DE FOND - Mode immersif pro */}
      <div className='absolute inset-0 z-0'>
        <Image 
          src="/HeroPic.jpg" 
          alt="Hero Image" 
          fill 
          className="object-cover opacity-70 md:opacity-100" 
          priority 
        />
        
        {/* DÉGRADÉ ADAPTATIF */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black md:bg-linear-to-r md:from-white md:via-white/90 md:to-transparent"></div>
      </div>

      <div className="container mx-auto px-6 md:px-12 z-10 w-full text-center md:text-left">
        
        {/* TITRE - Blanc sur mobile, Noir sur PC */}
        <h1 className="mt-10 md:mt-0 text-4xl md:text-6xl font-extrabold text-white md:text-gray-900 tracking-tight leading-tight md:leading-18 uppercase md:normal-case">
          <div>{t("hero.title.line1")}</div>
          <div>{t("hero.title.line2")}</div>
          <div>{t("hero.title.line3")}</div>
          <div>{t("hero.title.line4")}</div>
          <div>{t("hero.title.line5")}</div>
        </h1>
        
        <FadeInUp>
          {/* PARAGRAPHE - Blanc sur mobile, Gris sur PC */}
          <div className="mt-8 md:mt-15 text-xl md:text-2xl text-gray-300 md:text-gray-500 leading-normal md:leading-tight flex flex-col font-medium max-w-2xl mx-auto md:mx-0">
            <span>{t("hero.subtitle")}</span>
            <span>{t("hero.subtitle2")}</span>
          </div>
          
          <div className="mt-10 flex justify-center md:justify-start">
            <div
              onMouseMove={handleMagnetMove}
              onMouseLeave={handleMagnetLeave}
              className="inline-block"
            >
              <motion.a
                ref={btnRef}
                href="#Contact"
                className="btn font-extrabold inline-block bg-red-600 text-white hover:bg-red-700 px-10 py-4 rounded-full transition-colors shadow-lg"
                animate={{ x: offset.x, y: offset.y }}
                transition={{ type: 'spring', stiffness: 250, damping: 22 }}
                whileTap={{ scale: 0.96 }}
                aria-label={t("hero.cta")}
              >
                {t("hero.cta")}
              </motion.a>
            </div>
          </div>
        </FadeInUp>
      </div>
    </section>
  );
}


