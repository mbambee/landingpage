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

        <section id='services' className="py-20 bg-white flex scroll-mt-40">
            <div className='flex  w-3xl  flex-col   mx-auto px-4 '>
                <h2 className="text-3xl md:text-5xl tracking-tight text-slate-900 font-extrabold mb-5">{t("services.heading")}</h2>
                <p className='text-gray-600 text-2xl'>{t("services.description")}</p><br />
                <div className=" space-y-4 gap-4 p-6 -mx-8">
                    {service.map((service, index) => (
                        <FadeInUp key={index} delay={index * 0.06}>
                            <motion.div
                                className={`transition-all duration-300 ease-in-out border rounded-2xl p-6 flex-col  overflow-hidden
                                    ${openIndex === index ? 'flex-2 bg-white shadow-lg' : 'flex-1 bg-gray-50'} cursor-pointer`}
                                onClick={() => toggleAccordion(index)}
                                role="button"
                                tabIndex={0}
                                onKeyDown={(e) => { if ((e as React.KeyboardEvent).key === 'Enter') toggleAccordion(index); }}
                                whileHover={{ scale: 1.05, y: -8, transition: { duration: 0.18 } }}
                                whileTap={{ scale: 0.97 }}
                            >
                                <div className="flex justify-between items-start">
                                    <h3 className={`font-bold text-xl uppercase transition-colors ${openIndex === index ? 'text-black' : 'text-gray-800'}`}>
                                        {service.title}
                                    </h3>
                                </div>
                                <div
                                    className={`transition-all duration-300 ease-in-out overflow-hidden ${openIndex === index ? 'max-h-40 opacity-100 mt-4' : 'max-h-0 opacity-0'}`}>
                                    <p className="text-gray-600 leading-relaxed text-xl">
                                        {service.desc}
                                    </p>

                                </div>

                            </motion.div>
                        </FadeInUp>
                    ))}
                </div>
            </div>
            <div className=' w-lg h-100 mb-8 mt-30  text-black font-bold text-2xl mr-6 '>
                <h1 className='text-4xl uppercase font-extrabold'>{t("faq.prompt")}</h1> <br /> <br />
                <ContactForm action="https://formspree.io/f/mdagggdo" compact />
            </div>
        </section>

    );

}