"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import { useLanguage } from "../i18n/LanguageContext";


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
setOpenIndex(openIndex === index ? null : index)};

    export default function ServicesSection() {
        return (
            <section className="py-20 bg-slate-900">
                

                    {/* Titre qui descend */}
                    <motion.h2
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl font-bold text-center mb-12 text-white"
                    >
                        Nos Services
                    </motion.h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {service.map((service, index) => (
                            <motion.div
                                key={index}
                                // Départ : Invisible et décalé vers le bas
                                initial={{ opacity: 0, y: 50 }}
                                // Arrivée quand on scrolle dessus
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                // L'astuce : chaque carte attend un peu plus (0.2s, 0.4s, 0.6s)
                                transition={{ duration: 0.5, delay: index * 0.2 }}

                                className="p-6 bg-slate-800 rounded-xl border border-slate-700 hover:border-blue-500 transition-colors"
                            >
                                <div
                                    key={index}
                                    className={`transition-all duration-300 ease-in-out border rounded-2xl p-6 cursor-pointer flex-col  overflow-hidden
                  ${openIndex === index ? 'flex-2 bg-white shadow-lg' : 'flex-1 bg-gray-50'}`}
                                    onClick={() => toggleAccordion(index)}
                                >
                                    <div className="flex justify-between items-start">
                                        <h3 className={`font-bold text-xl uppercase transition-colors ${openIndex === index ? 'text-black' : 'text-gray-800'}`}>
                                            {service.title}
                                        </h3>
                                    </div>

                                    <div
                                        className={`transition-all duration-300 ease-in-out overflow-hidden ${openIndex === index ? 'max-h-40 opacity-100 mt-4' : 'max-h-0 opacity-0'
                                            }`}>
                                        <p className="text-gray-600 leading-relaxed text-xl">
                                            {service.desc}
                                        </p>
                                    </div>
                                </div>
                        
                        </motion.div>
          ))}
                </div>
    </section >
  )};
