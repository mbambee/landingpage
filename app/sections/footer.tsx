"use client";

import Image from "next/image";
import { motion, useReducedMotion } from 'framer-motion';
import { useLanguage } from "../i18n/LanguageContext";


export const Footer = () => {
  const { t } = useLanguage();
  const reduce = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0, scaleY: 0.96 },
    show: {
      opacity: 1,
      scaleY: 1,
      transition: {
        // shorter duration for a snappier first paint while keeping a subtle unfold
        duration: reduce ? 0.28 : 0.9,
        ease: [0.22, 1, 0.36, 1],
        when: 'beforeChildren',
        staggerChildren: reduce ? 0 : 0.08,
      },
    },
  } as const;

  const item = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { duration: reduce ? 0.28 : 0.6, ease: [0.2, 1, 0.3, 1] } },
  } as const;

  return (
    <motion.footer
      className="bg-black text-white py-12 px-6 h-60 flex"
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{  amount: 0.2 }} //once: true,
      style={{ transformOrigin: 'top center' }}
    >
      <motion.div className=" flex  gap-4  -my-6  w-full h-30 flex-col   " variants={item}>

        <motion.div className="flex  justify-between  " variants={item}>
          <Image src="/logo.png" alt="Logo" width={140} height={90} loading="lazy" />                    
          <motion.div variants={item}>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider">Restez connecté</h4>
            <p className="mt-4 text-sm text-white">Inscrivez-vous pour nos dernières mises à jour.</p>
            <div className="mt-4 flex">
              <form action="https://formspree.io/f/xgokkkrn" method="post" className="flex w-full">
                <input
                  type="email"
                  name="email"
                  placeholder="Votre email"
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-l-lg focus:outline-none focus:ring-1 focus:ring-red-500"
                />
              
              <button className="bg-red-600 text-white px-4 py-2 text-sm font-medium rounded-r-lg hover:bg-red-700 transition-colors">
                Envoyer
              </button>  
              </form>
            </div>
          </motion.div>
          <motion.div variants={item}>
            <h1 className="text-red-500 ">{t("contact.heading")}</h1>
            <address className=" text-sm flex flex-col mt-4 ">
              <div>Adresse : Immeuble Centre Ibrahim,</div><div>Av. Habib Bourguiba,</div><div>Sousse 4000</div>
              <div>Téléphone : +216 31 439 350 </div>
              <div>Email : Info@visioad.com </div>
            </address>
          </motion.div>


        </motion.div>
        <motion.hr className="border-white " variants={item} />
        <motion.div className=" flex justify-between  items-center my-2" variants={item}>
          <h3 className="text-sm">&copy; {new Date().getFullYear()} {t("footer.copyright")}</h3>
          <div className=" flex items-center justify-center gap-4  w-30">
            <motion.a href="https://www.instagram.com/ste_visioad/" whileHover={{ scale: 1.08, y: -6 }} whileTap={{ scale: 0.97 }} aria-label="Instagram">
              <Image src="/instagram.png" alt="Instagram" width={60} height={50} loading="lazy" />
            </motion.a>
            <motion.a href="https://www.facebook.com/visioad/" whileHover={{ scale: 1.08, y: -6 }} whileTap={{ scale: 0.97 }} aria-label="Facebook">
              <Image src="/facebook.png" alt="Facebook" width={60} height={50} loading="lazy" />
            </motion.a>
            <motion.a href="https://www.youtube.com/@visoad" whileHover={{ scale: 1.08, y: -6 }} whileTap={{ scale: 0.97 }} aria-label="YouTube">
              <Image src="/youtube.png" alt="YouTube" width={60} height={50} loading="lazy" />
            </motion.a>
            <motion.a href="https://www.tiktok.com/@visioad" whileHover={{ scale: 1.08, y: -6 }} whileTap={{ scale: 0.97 }} aria-label="TikTok">
              <Image src="/tik-tok (1).png" alt="TikTok" width={60} height={50} loading="lazy" />
            </motion.a>
          </div>
        </motion.div>
      </motion.div>

    </motion.footer>
  );
};
