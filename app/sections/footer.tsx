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
      className="bg-black text-white py-16 px-6 min-h-fit flex flex-col justify-center"
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ amount: 0.2 }}
      style={{ transformOrigin: 'top center' }}
    >
      <motion.div className="max-w-7xl mx-auto w-full flex flex-col gap-12" variants={item}>
        
        <motion.div className="flex flex-col lg:flex-row justify-between items-center lg:items-start gap-12 text-center lg:text-left" variants={item}>
          
          {/* LOGO : Masqué sur mobile avec 'hidden lg:block' */}
          <div className="hidden lg:block shrink-0">
            <Image src="/logo.png" alt="Logo" width={140} height={90} loading="lazy" />
          </div>

          {/* NEWSLETTER */}
            <motion.div variants={item} className="w-full max-w-sm">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider">{t('footer.newsletter.title')}</h4>
            <p className="mt-4 text-sm text-gray-400">{t('footer.newsletter.desc')}</p>
            <div className="mt-4">
              <form action="https://formspree.io/f/xgokkkrn" method="post" className="flex">
                <input
                  type="email"
                  name="email"
                  placeholder={t('footer.newsletter.placeholder')}
                  // Bordure changée en gris foncé/ardoise pour être plus "pro"
                  className="w-full px-3 py-2 text-sm text-black bg-white border border-slate-700 rounded-l-lg focus:ring-2 focus:ring-red-500 outline-none"
                />
                <button className="bg-red-600 text-white px-4 py-2 text-sm font-bold rounded-r-lg hover:bg-red-700 transition-colors">
                  {t('footer.newsletter.submit')}
                </button>
              </form>
            </div>
          </motion.div>

          {/* ADRESSE */}
          <motion.div variants={item} className="flex flex-col">
            <h1 className="text-red-500 font-bold uppercase mb-4">{t("contact.heading")}</h1>
            <address className="text-sm text-white  space-y-1">
              <div>Immeuble Centre Ibrahim,</div>
              <div>Av. Habib Bourguiba, Sousse 4000</div>
              <div className="pt-2 text-white">Tél : +216 31 439 350</div>
              <div className="text-white">Email : Info@visioad.com</div>
            </address>
          </motion.div>
        </motion.div>

        <motion.hr className="border-gray-400" variants={item} />

        {/* SECTION BASSE */}
        <motion.div className="flex flex-col-reverse lg:flex-row justify-between items-center gap-8" variants={item}>
          <h3 className="text-sm text-white italic">
            &copy; {new Date().getFullYear()} {t("footer.copyright")}
          </h3>

          {/* RÉSEAUX SOCIAUX : On garde tes tailles originales (60x50) */}
          <div className="flex items-center justify-center gap-4">
            {[
              { href: "https://www.instagram.com/ste_visioad/", src: "/instagram.png", key: 'instagram', label: t('contact.social.instagram') },
              { href: "https://www.facebook.com/visioad/", src: "/facebook.png", key: 'facebook', label: t('contact.social.facebook') },
              { href: "https://www.youtube.com/@visoad", src: "/youtube.png", key: 'youtube', label: t('contact.social.youtube') },
              { href: "https://www.tiktok.com/@visioad", src: "/tik-tok (1).png", key: 'tiktok', label: t('contact.social.tiktok') }
            ].map((social, idx) => (
              <motion.a 
                key={idx}
                href={social.href} 
                whileHover={{ scale: 1.08, y: -6 }} 
                whileTap={{ scale: 0.97 }} 
                aria-label={social.label}
              >
                <Image src={social.src} alt={social.label} width={20} height={20} loading="lazy" />
              </motion.a>
            ))}
          </div>
        </motion.div>

      </motion.div>
    </motion.footer>
  );
};