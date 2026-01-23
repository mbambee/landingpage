"use client";

import Image from "next/image";
import { useLanguage } from "../i18n/LanguageContext";

export const Header = () => {
  const { lang, setLang, t } = useLanguage();

  return (
    <header className="bg-black flex items-center h-30 px-8 py-4 sticky top-0 z-200 justify-center  gap-50 ">
      <div className=" mb-8 -mx-20  w-50 h-15 " >
          <Image src="/logo.png" alt="Logo" width={90} height={60}  />
      </div>

      <nav  className=" flex items-center justify-center space-x-30 sticky w-xl uppercase tracking-tight font-semibold text-[15px]">
          <div className="space-x-8">
              <a href="#home" className="text-red-500 hover:text-white">{t("nav.home")}</a>

              <a href="#about" className="text-red-500 hover:text-white">{t("nav.about")}</a>
          </div>
          <div className="space-x-8 ">
              <a href="#services" className=" text-red-500 hover:text-white">{t("nav.services").toUpperCase()}</a>

              <a href="#Avis" className="text-red-500 hover:text-white">{t("nav.reviews")}</a>
          </div>
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
