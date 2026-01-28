"use client";

import Image from "next/image";
import { useLanguage } from "../i18n/LanguageContext";
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from "react";

export const Header = () => {
  const { lang, setLang, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { href: '#home', label: t('nav.home') },
    { href: '#about', label: t('nav.about') },
    { href: '#services', label: t('nav.services').toUpperCase() },
    { href: '#Avis', label: t('nav.reviews') },
  ];

  return (
    <>
      {/* --- VERSION PC (Noir Pur, Sticky) --- */}
      <header className="hidden lg:block bg-black w-full sticky top-0 z-[200] border-b border-white/5">
        <div className="max-w-7xl mx-auto flex items-center h-24 px-6 justify-between">
          <div className="flex items-center">
            <Image src="/logo.png" alt="Logo" width={80} height={50} className="object-contain" priority />
          </div>

          <nav className="flex items-center justify-center">
            <ul className="flex items-center space-x-12">
              {navLinks.map((item, idx) => (
                <motion.li 
                  key={idx}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="uppercase tracking-widest font-bold text-[13px]"
                >
                  <a href={item.href} className="text-white hover:text-red-500 transition-colors">
                    {item.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </nav>
          
          <div className="flex items-center gap-6">
            <select
              value={lang}
              onChange={(e) => setLang(e.target.value as "fr" | "en")}
              className="text-white bg-transparent border border-white/30 rounded-md px-2 py-1 text-sm font-bold outline-none hover:border-red-500 transition-all cursor-pointer"
            >
              <option value="fr" className="text-black">FR</option>
              <option value="en" className="text-black">EN</option>
            </select>
          </div>
        </div>
      </header>

      {/* --- VERSION MOBILE (Flou Backdrop, Fixed) --- */}
      <header className="lg:hidden fixed top-0 left-0 w-full z-[100] bg-black/60 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="relative w-32 h-12">
            <Image src="/logo.png" alt="Logo" fill className="object-contain" priority />
          </div>

          <div className="flex items-center gap-6">
            <select
              value={lang}
              onChange={(e) => setLang(e.target.value as "fr" | "en")}
              className="appearance-none bg-transparent text-white border border-white/30 rounded-full px-4 py-1 text-xs font-bold outline-none"
            >
              <option value="fr" className="text-black">FR</option>
              <option value="en" className="text-black">EN</option>
            </select>

            <button className="text-white flex flex-col gap-1.5" onClick={() => setIsOpen(!isOpen)}>
              <span className={`w-6 h-0.5 bg-white transition-all ${isOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`w-6 h-0.5 bg-white transition-all ${isOpen ? 'opacity-0' : ''}`} />
              <span className={`w-6 h-0.5 bg-white transition-all ${isOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </button>
          </div>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-black border-t border-white/10 overflow-hidden"
            >
              <ul className="flex flex-col p-6 space-y-4">
                {navLinks.map((item, idx) => (
                  <li key={idx}>
                    <a href={item.href} onClick={() => setIsOpen(false)} className="text-white text-lg font-bold uppercase block hover:text-red-500 transition-colors">
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
};