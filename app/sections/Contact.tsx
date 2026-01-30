"use client";

import Image from 'next/image';
import FadeInUp from '../animation/FadeInUp';
import ContactForm from './ContactForm';
import { motion } from 'framer-motion';
import { useLanguage } from '../i18n/LanguageContext';
import { useState } from 'react';

export default function Contact() {
    const [loading, setLoading] = useState(false);
    const { t } = useLanguage();

    return (
        // flex-col sur mobile, lg:flex-row sur PC. On enlève h-full pour éviter les bugs de scroll mobile.
        <section id='Contact' className="py-20 bg-white flex flex-col lg:flex-row justify-center items-start scroll-mt-40 gap-12 px-6 w-full mx-auto">
            
            {/* BLOC TEXTE ET RÉSEAUX : w-full sur mobile, lg:w-2xl sur PC */}
            <FadeInUp className='flex w-full lg:w-2xl flex-col h-full'>
                <div className='flex flex-col'>
                    <h1 className="text-3xl md:text-4xl mb-8 lg:mb-12 text-black uppercase font-extrabold">{t("contact.heading")}</h1>
                    <h2 className="text-xl md:text-2xl font-semibold mb-4 text-black">{t("contact.subtitle")}</h2>
                    <p className='text-black text-lg md:text-2xl'>{t("contact.paragraph")}</p>
                    <br />
                </div>

                <div id="taux" className='flex justify-between gap-4 md:gap-8 mb-10'>
                    <div className='flex flex-col items-center text-center'>
                        <p className='text-lg md:text-xl'>{t('contact.metric.satisfaction')}</p>
                        <p className='text-4xl md:text-5xl font-extrabold'>80%</p>
                    </div>
                    <div className='flex flex-col items-center text-center'>
                        <p className='text-lg md:text-xl'>{t('contact.metric.campaignImpact')}</p>
                        <p className='text-4xl md:text-5xl font-extrabold'>+500</p>
                    </div>
                </div>

                <hr className="border-gray-200 mb-8" />

                {/* RÉSEAUX SOCIAUX : gap-50 remplacé par un gap flexible et justification adaptative */}
                <div className='flex flex-wrap lg:flex-nowrap justify-between  mt-4 w-full'>
                    <div className="flex flex-col items-center lg:items-start">
                        <motion.a href="https://www.facebook.com/visioad/" whileHover={{ scale: 1.06, y: -6 }} whileTap={{ scale: 0.97 }} aria-label="Facebook">
                            <Image src="/facebook.png" width={24} height={24} alt="facebook" />
                        </motion.a>
                        <p className='mt-2 text-lg md:text-2xl text-black'>{t('contact.social.facebook')}</p>
                    </div>

                    <div className="flex flex-col items-center lg:items-start">
                        <motion.a href="https://www.instagram.com/ste_visioad/" whileHover={{ scale: 1.06, y: -6 }} whileTap={{ scale: 0.97 }} aria-label="Instagram">
                            <Image src="/instagram.png" width={24} height={24} alt="instagram" />
                        </motion.a>
                        <p className='mt-2 text-lg md:text-2xl text-black'>{t('contact.social.instagram')}</p>
                    </div>

                    <div className="flex flex-col items-center lg:items-start">
                        <motion.a href="https://www.youtube.com/@visoad" whileHover={{ scale: 1.06, y: -6 }} whileTap={{ scale: 0.97 }} aria-label="YouTube">
                            <Image src="/youtube.png" width={24} height={24} alt="youtube" />
                        </motion.a>
                        <p className='mt-2 text-lg md:text-2xl text-black'>{t('contact.social.youtube')}</p>
                    </div>
                </div>
            </FadeInUp>

            {/* BLOC FORMULAIRE : w-full sur mobile, lg:w-xl sur PC */}
            <FadeInUp className='w-full lg:w-xl mb-8 lg:mr-5 rounded-2xl text-black font-bold text-xl bg-[#FCF6F6] lg:ml-15'>
                <div className='p-6 md:p-10 flex flex-col '>
                    <ContactForm action="https://formspree.io/f/meeggebj" />
                </div>
            </FadeInUp>
        </section>
    );
}
