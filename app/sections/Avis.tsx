"use client";

import Image from 'next/image';
import FadeInUp from '../animation/FadeInUp';
import ScrollLinked from '../animation/ScrollLinked';
import { useLanguage } from '../i18n/LanguageContext';

export default function Avis() {
  const { t } = useLanguage();
  const service = [
    { etoile: 4, image: "/lucas.png" },
    { etoile: 4, image: "/david.png" },
    { etoile: 4, image: "/sophie.png" },
    { etoile: 4, image: "/sophia.svg" },
    { etoile: 4, image: "/liam.svg" },
    { etoile: 4, image: "/ethan.svg" },
  ];

  return (
    <section id='Avis' className="py-20 bg-[#FCF6F6] flex scroll-mt-40 overflow-hidden">
      <div className='bg-[#FCF6F6] flex flex-col mx-auto px-4 w-full max-w-7xl'>
        
        <h1 className="text-3xl md:text-4xl text-center mb-12 text-black font-extrabold px-2">
          {t("avis.heading")}
        </h1>

        <FadeInUp>
          {/* On s'assure que ScrollLinked gère bien le débordement sur mobile */}
          <ScrollLinked>
            <div className="flex gap-6 pb-8"> 
              {service.map((s, i) => (
                // w-[85vw] sur mobile pour voir un bout de la carte suivante, w-80 sur PC
                <div key={i} className="flex-none w-[85vw] md:w-80">
                  <div className="bg-white p-6 rounded-2xl shadow-sm h-full flex flex-col justify-between">
                    <div>
                      <div className='flex gap-1 mb-4'>
                        {Array.from({ length: s.etoile }).map((_, index) => (
                          <Image key={index} src="/star.png" width={18} height={18} alt="star" />
                        ))}
                      </div>
                      <p className="text-gray-600 text-lg md:text-xl italic">
                        "{t(`avis.${i}.desc`)}"
                      </p>
                    </div>

                    <div className='flex items-center gap-4 mt-8'>
                      <Image 
                        src={s.image} 
                        width={60} 
                        height={60} 
                        alt={t(`avis.${i}.name`)} 
                        className="rounded-full object-cover border-2 border-gray-100" 
                      />
                      <div className='flex flex-col'>
                        <p className='text-black font-bold text-lg leading-tight'>{t(`avis.${i}.name`)}</p>
                        <p className='text-gray-500 text-sm'>{t(`avis.${i}.role`)}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollLinked>
        </FadeInUp>
      </div>
    </section>
  );
}