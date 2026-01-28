import FadeInUp from '../animation/FadeInUp';
import BlurInText from '../animation/BlurInText';
import { useLanguage } from '../i18n/LanguageContext';

export default function About() {
  const { t } = useLanguage();
  return (

    <section id='about' className="py-20 min-h-fit md:h-80 bg-[#FCF6F6] scroll-mt-40 flex items-center">
    
      <div className="w-full md:w-9xl mx-auto px-6 flex flex-col md:flex-row justify-center items-center gap-10 md:gap-20">
        <h1 className="text-3xl md:text-5xl tracking-tight text-slate-900 font-extrabold text-center md:text-left mb-8">
          <div>{t("about.title")}</div>
          <div>{t("about.title2")}</div>
        </h1>

        <FadeInUp>
          <BlurInText 
            text={t("about.text")} 
            // w-full sur mobile pour utiliser tout l'espace, md:w-3xl sur PC
            className="text-gray-600 text-xl md:text-2xl w-full md:w-3xl text-center md:text-left" 
          />
        </FadeInUp>
        
      </div>
    </section>
  );
}