"use client";

import FadeInUp from '../animation/FadeInUp';
import BlurInText from '../animation/BlurInText';
import { useLanguage } from '../i18n/LanguageContext';

export default function About() {
  const { t } = useLanguage();
  return (
    <section id='about' className="py-20 h-80 bg-[#FCF6F6] scroll-mt-40">
      <div className="w-9xl bg-[#FCF6F6] mx-auto px-4  flex justify-center items-center gap-20 ">
        <h1 className="text-3xl md:text-5xl tracking-tight text-slate-900 font-extrabold"><div>{t("about.title")}</div><div>{t("about.title2")}</div></h1>
        <FadeInUp>
          <BlurInText text={t("about.text")} className="text-gray-600 text-2xl w-3xl" />
        </FadeInUp>
      </div>
    </section>
  );
}
