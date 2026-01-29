"use client";

import { useState } from 'react';
import FadeInUp from '../animation/FadeInUp';
import { motion } from 'framer-motion';
import { useLanguage } from '../i18n/LanguageContext';
import ContactForm from './ContactForm';

export default function Services() {
  const { t } = useLanguage();
  const service = [
    { title: t("service.0.title"), desc: t("service.0.desc") },
    { title: t("service.1.title"), desc: t("service.1.desc") },
    { title: t("service.2.title"), desc: t("service.2.desc") },
    { title: t("service.3.title"), desc: t("service.3.desc") },
    { title: t("service.4.title"), desc: t("service.4.desc") },
    { title: t("service.5.title"), desc: t("service.5.desc") },
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    // Structure : flex-col (mobile) -> lg:flex-row (PC)
    // On centre le tout et on ajoute du padding pour que ça ne touche pas les bords
    <section  className="py-20 bg-white flex flex-col lg:flex-row justify-center items-start gap-10 lg:gap-24 px-6 max-w-350 mx-auto scroll-mt-40">
      
      {/* --- BLOC SERVICES (GAUCHE SUR PC / HAUT SUR MOBILE) --- */}
      {/* w-full sur mobile, w-[700px] environ sur PC */}
      <div className='flex w-full lg:w-3/2 flex-col'>
        <h2 className="text-3xl md:text-5xl tracking-tight text-slate-900 font-extrabold mb-5">
          {t("services.heading")}
        </h2>
        <p className='text-gray-600 text-xl md:text-2xl'>
          {t("services.description")}
        </p>

        {/* On enlève le -mx-8 qui fait déborder sur mobile */}
        <div className="space-y-4 mt-10">
          {service.map((service, index) => (
            <FadeInUp key={index} delay={index * 0.06}>
              <motion.div
                className={`transition-all duration-300 ease-in-out border rounded-2xl p-6 flex-col overflow-hidden
                  ${openIndex === index ? 'bg-white shadow-lg' : 'bg-gray-50'} cursor-pointer`}
                onClick={() => toggleAccordion(index)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if ((e as React.KeyboardEvent).key === 'Enter') toggleAccordion(index); }}
                whileHover={{ scale: 1.02, y: -4 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex justify-between items-start">
                  <h3 className={`font-bold text-lg md:text-xl uppercase transition-colors ${openIndex === index ? 'text-black' : 'text-gray-800'}`}>
                    {service.title}
                  </h3>
                </div>

                <div
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    openIndex === index ? 'max-h-60 opacity-100 mt-4' : 'max-h-0 opacity-0'
                  }`}
                >
                  <p className="text-gray-600 leading-relaxed text-lg">
                    {service.desc}
                  </p>
                </div>
              </motion.div>
            </FadeInUp>
          ))}
        </div>
      </div>

      {/* --- BLOC CONTACT (DROITE SUR PC / BAS SUR MOBILE) --- */}
      {/* mt-12 pour espacer sur mobile, mt-30 comme tu avais sur PC */}
      <div className='w-full lg:w-112.5 mt-12 lg:mt-30'>
        <h1 className='text-3xl md:text-4xl uppercase font-extrabold text-black mb-8'>
          {t("faq.prompt")}
        </h1> 
        <ContactForm action="https://formspree.io/f/mdagggdo" compact />
      </div>

    </section>
  );
}