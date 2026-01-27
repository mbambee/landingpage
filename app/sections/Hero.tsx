"use client";

import Image from 'next/image';
import { useRef, useState } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { motion } from 'framer-motion';
import FadeInUp from '../animation/FadeInUp';

export default function Hero() {
  const { t } = useLanguage();

  // Magnetic red CTA button: follows cursor when hovering and springs back on leave
  const btnRef = useRef<HTMLAnchorElement | null>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMagnetMove = (e: React.MouseEvent) => {
    const el = (e.currentTarget as HTMLElement);
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const max = 18; // max drift in px
    // scale down influence so movement is subtle
    const x = Math.max(-max, Math.min(max, dx * 0.22));
    const y = Math.max(-max, Math.min(max, dy * 0.22));
    setOffset({ x, y });
  };

  const handleMagnetLeave = () => setOffset({ x: 0, y: 0 });

  return (
    <section id='home' className=" flex items-center justify-center bg-white px-6 py-10 relative  h-screen scroll-mt-20">

      <div className='w-1/2 h-full absolute right-0 top-0  '>
        <Image src="/HeroPic.jpg" alt="Hero Image" fill className="object-cover  " priority />
      </div>
      <div className="absolute inset-0 bg-linear-to-r from-white via-white to-transparent min-h-175"></div>

      <div className="container mx-auto px-6 md:px-12 z-10 " >
        <h1 className="mt-6 text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight leading-18 flex flex-col ">
          <div>{t("hero.title.line1")}</div><div>{t("hero.title.line2")}</div><div>{t("hero.title.line3")}</div><div>{t("hero.title.line4")}</div><div>{t("hero.title.line5")}</div>
        </h1>
        <FadeInUp>
        <p className="mt-15 text-2xl text-gray-600 leading-3  flex flex-col ">
          <span>{t("hero.subtitle")}</span>
          <span>{t("hero.subtitle2")}</span>
        </p>
        <div className="mt-10 flex  gap-x-6">
          <div
            onMouseMove={handleMagnetMove}
            onMouseLeave={handleMagnetLeave}
            className="inline-block"
            aria-hidden={false}
          >
            <motion.a
              ref={btnRef}
              href="#Contact"
              className="btn font-extrabold inline-block bg-red-600 text-white hover:bg-red-700"
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
