"use client";

import Image from "next/image";
import { useLanguage } from "../i18n/LanguageContext";
import { motion } from 'framer-motion'

export const Header = () => {
  const { lang, setLang, t } = useLanguage();

  return (
    <header className="bg-black flex items-center h-30 px-8 py-4 sticky top-0 z-200 justify-center  gap-50 ">
      <div className=" mb-8 -mx-20  w-50 h-15 " >
          <Image src="/logo.png" alt="Logo" width={90} height={60}  />
      </div>

      <nav className="flex items-center justify-center sticky w-xl uppercase tracking-tight font-semibold text-[15px]">
        <motion.ul
          className="flex items-center space-x-15"
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.06 } }
          }}
        >
          {[
            { href: '#home', label: t('nav.home') },
            { href: '#about', label: t('nav.about') },
            { href: '#services', label: t('nav.services').toUpperCase() },
            { href: '#Avis', label: t('nav.reviews') },
          ].map((item, idx) => (
            <motion.li key={idx} variants={{ hidden: { opacity: 0, y: -6 }, show: { opacity: 1, y: 0, transition: { duration: 0.18 } } }}>
              <a href={item.href} className="text-white hover:text-red-500">
                {item.label}
              </a>
            </motion.li>
          ))}
        </motion.ul>
      </nav>
      
      <div>
          <label htmlFor="lang-select" className="sr-only">Langue</label>
          <select
            id="lang-select"
            value={lang}
            onChange={(e) => setLang(e.target.value as "fr" | "en")}
            className="text-black bg-white border border-gray-300 rounded-md w-30 h-8 pl-2"
          >
            <option value="fr">FR</option>
            <option value="en">EN</option>
          </select>
      </div>

  </header>
  );
};
