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
    <section id='Avis' className="py-20 bg-[#FCF6F6] flex scroll-mt-40 ">

      <div className='bg-[#FCF6F6] flex  flex-col  mx-auto px-4 w-full '>
        <h2 className="text-4xl  text-center mb-12 text-black font-extrabold">{t("avis.heading")}</h2>
        <FadeInUp>
          <div className="flex justify-center mb-10">
          
          </div>
     
        <ScrollLinked>
          {service.map((s, i) => (
            <li key={i} className="flex-none w-80">
              <div className="divs w-100 h-100 bg-white p-6">
                <div className='flex gap-2 mb-4'>
                  {Array.from({ length: s.etoile }).map((_, index) => (
                    <Image key={index} src="/star.png" width={20} height={20} alt="star" />
                  ))}
                </div>
                <p className="text-gray-600 text-xl">{t(`avis.${i}.desc`)}</p>
                <div className='flex items-center gap-4 mt-6'>
                  <Image src={s.image} width={70} height={70} alt={t(`avis.${i}.name`)} className="rounded-full " />
                  <div className='flex flex-col'>
                    <p className='text-black font-bold text-xl'>{t(`avis.${i}.name`)}</p>
                    <p className='text-gray-600'>{t(`avis.${i}.role`)}</p>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ScrollLinked>
           </FadeInUp>
      </div>
    </section>
  );
}
