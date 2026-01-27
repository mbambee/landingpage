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
        <section id='Contact' className="py-20 bg-white flex scroll-mt-40 h-full ">
            <FadeInUp className='flex w-2xl flex-col mx-auto px-4 h-full '>
                <div className=' flex flex-col'>
                    <h2 className="text-4xl mb-12 text-black uppercase font-extrabold">{t("contact.heading")}</h2>
                    <h4 className="text-2xl font-semibold mb-4 text-black">{t("contact.subtitle")}</h4>
                    <p className='text-black text-2xl'>{t("contact.paragraph")}</p>
                    <br />
                </div>
                <div id="taux" className='flex justify-between gap-8 '>
                    <div className='flex flex-col items-center text-center'>
                        <p className='text-xl'>{t('contact.metric.satisfaction')}</p>
                        <p className='text-5xl  items-center font-extrabold '>80%</p>
                    </div>
                    <div className='flex flex-col items-center text-center'>
                        <p className='text-xl'>{t('contact.metric.campaignImpact')}</p>
                        <p className='text-5xl  font-extrabold '>+500</p>
                    </div>
                </div>
                <hr />
                <div className='flex gap-50 mt-4 w-full  '>

                    <div className="flex flex-col ">
                        <motion.a href="https://www.facebook.com/visioad/" whileHover={{ scale: 1.06, y: -6, transition: { duration: 0.18 } }} whileTap={{ scale: 0.97 }} aria-label="Facebook" className="inline-block">
                            <Image src="/facebook.png" width={24} height={24} alt="facebook image" />
                        </motion.a>
                        <p className=' mt-2 text-2xl text-black'>{t('contact.social.facebook')}</p>
                    </div>

                    <div className="flex flex-col ">
                        <motion.a href="https://www.instagram.com/ste_visioad/" whileHover={{ scale: 1.06, y: -6, transition: { duration: 0.18 } }} whileTap={{ scale: 0.97 }} aria-label="Instagram" className="inline-block">
                            <Image src="/instagram.png" width={24} height={24} alt="instagram image" />
                        </motion.a>
                        <p className=' mt-2 text-2xl text-black'>{t('contact.social.instagram')}</p>
                    </div>

                    <div className="flex flex-col ">
                        <motion.a href="https://www.youtube.com/@visoad" whileHover={{ scale: 1.06, y: -6, transition: { duration: 0.18 } }} whileTap={{ scale: 0.97 }} aria-label="YouTube" className="inline-block">
                            <Image src="/youtube.png" width={24} height={24} alt="youtube image" />
                        </motion.a>
                        <p className=' mt-2 text-2xl text-black '>{t('contact.social.youtube')}</p>
                    </div>
                </div>
            </FadeInUp>

            <FadeInUp className=' w-xl mb-8 mr-5 rounded-2xl text-black font-bold text-xl bg-[#FCF6F6] '>
                <div className=' p-10 flex flex-col '>
                    <ContactForm action="https://formspree.io/f/meeggebj" />
                </div>
            </FadeInUp>
        </section>
    );
}
