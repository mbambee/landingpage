"use client";
import Image from 'next/image';
import { useState, useRef } from "react";
import { useLanguage } from "../i18n/LanguageContext";
import FadeInUp from "../animation/FadeInUp";
import BlurInText from "../animation/BlurInText";
import ScrollLinked from "../animation/ScrollLinked";
import { motion } from 'framer-motion';


export const MainSection = () => {
  return (
    <div>
      <Hero />
      <About />
      <Services />
      <Avis />
      <Contact />
    </div>
  )
};

// Reusable contact form used in Services (compact) and Contact sections
function ContactForm({ action, compact }: { action: string; compact?: boolean }) {
  const { t } = useLanguage();
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setStatus('loading');

    const form = e.currentTarget;
    const fd = new FormData(form);
    const email = (fd.get('email') || '').toString().trim();
    const message = (fd.get('message') || '').toString().trim();

    if (!email || !message) {
      setError(t('contact.error.fill') as string);
      setStatus('error');
      return;
    }

    try {
      const res = await fetch(action, {
        method: form.method || 'POST',
        headers: { Accept: 'application/json' },
        body: fd,
      });

      if (res.ok) {
        setStatus('success');
        form.reset();
      } else {
        // try to read JSON error if available
        let msg = t('contact.error.network') as string;
        try {
          const json = await res.json();
          if (json && json.error) msg = json.error;
        } catch (_) { }
        setError(msg);
        setStatus('error');
      }
    } catch (err) {
      setError(t('contact.error.network') as string);
      setStatus('error');
    }
  };

  const inputClass = "block border-2 border-gray-300 rounded-md p-2 w-[80%] mb-4";
  return (
    <form method="POST" action={action} onSubmit={handleSubmit} className={compact ? 'p-0' : ''}>
      <label htmlFor="name">{t('contact.label.name')}</label>
      <input name="name" type="text" className={inputClass} />

      <label htmlFor="email">{t('contact.label.email')}</label>
      <input name="email" type="email" className={inputClass} />

      {!compact && (
        <>
          <label htmlFor="subject">{t('contact.label.subject')}</label>
          <input name="subject" type="text" className={inputClass} />
        </>
      )}

      <label htmlFor="message">{t('contact.label.message')}</label>
      <textarea name="message" className={inputClass} rows={4}></textarea>

      <div className="flex items-center gap-4">
        <motion.button
          type="submit"
          disabled={status === 'loading'}
          className={compact ? 'btn' : 'border-2 border-red-500 bg-white text-black text-lg rounded-md p-2 w-30 hover:text-red-500'}
          whileHover={{ scale: 1.04, y: -4, transition: { duration: 0.14 } }}
          whileTap={{ scale: 0.97 }}
        >
          {t('contact.send')}
        </motion.button>

        {status === 'loading' && <span className="text-gray-600">...</span>}
      </div>

      {status === 'success' && <p className="mt-3 text-green-600">{t('contact.success')}</p>}
      {status === 'error' && error && <p className="mt-3 text-red-600">{error}</p>}
    </form>
  );
}


function Hero() {
  const { t } = useLanguage();

  // Magnetic red CTA button: follows cursor when hovering and springs back on leave
  const btnRef = useRef<HTMLAnchorElement | null>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMagnetMove = (e: React.MouseEvent) => {
    const el = (e.currentTarget as HTMLElement);
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const max = 18; // max drift in px
    // scale down influence so movement is subtle
    const x = Math.max(-max, Math.min(max, dx * 0.22));
    const y = Math.max(-max, Math.min(max, dy * 0.22));
    setOffset({ x, y });
  };

  const handleMagnetLeave = () => setOffset({ x: 0, y: 0 });

  return (
    <section id='home' className=" flex items-center justify-center bg-white px-6 py-10 relative  h-screen scroll-mt-20">

      <div className='w-1/2 h-full absolute right-0 top-0  '>
        <Image src="/HeroPic.jpg" alt="Hero Image" fill className="object-cover  " priority />
      </div>
      <div className="absolute inset-0 bg-linear-to-r from-white via-white to-transparent min-h-175"></div>

      <div className="container mx-auto px-6 md:px-12 z-10 " >
        <h1 className="mt-6 text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight leading-18 flex flex-col ">
          <div>{t("hero.title.line1")}</div><div>{t("hero.title.line2")}</div><div>{t("hero.title.line3")}</div><div>{t("hero.title.line4")}</div><div>{t("hero.title.line5")}</div>
        </h1>
        <FadeInUp>
        <p className="mt-15 text-2xl text-gray-600 leading-3  flex flex-col ">
          <span>{t("hero.subtitle")}</span>
          <span>{t("hero.subtitle2")}</span>
        </p>
        <div className="mt-10 flex  gap-x-6">
          <div
            onMouseMove={handleMagnetMove}
            onMouseLeave={handleMagnetLeave}
            className="inline-block"
            aria-hidden={false}
          >
            <motion.a
              ref={btnRef}
              href="#Contact"
              className="btn font-extrabold inline-block bg-red-600 text-white hover:bg-red-700"
              animate={{ x: offset.x, y: offset.y }}
              transition={{ type: 'spring', stiffness: 250, damping: 22 }}
              whileTap={{ scale: 0.96 }}
              aria-label={t("hero.cta")}
            >
              {t("hero.cta")}
            </motion.a>
          </div>
        </div>
        </FadeInUp>
      </div>
    </section>
  );
}


function About() {
  const { t } = useLanguage();
  return (
    <section id='about' className="py-20 h-80 bg-[#FCF6F6] scroll-mt-40">
      <div className="w-9xl bg-[#FCF6F6] mx-auto px-4  flex justify-center items-center gap-20 ">
        <h1 className="text-3xl md:text-5xl tracking-tight text-slate-900 font-extrabold"><div>{t("about.title")}</div><div>{t("about.title2")}</div></h1>
        <FadeInUp>
          <BlurInText text={t("about.text")} className="text-gray-600 text-2xl w-3xl" />
        </FadeInUp>
      </div>
    </section>
  );

}




function Services() {
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
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${openIndex === index ? 'max-h-40 opacity-100 mt-4' : 'max-h-0 opacity-0'
                    }`}>
                  <p className="text-gray-600 leading-relaxed text-xl">
                    {service.desc}
                  </p>
                </div>
              </motion.div>
              
            </FadeInUp>
          ))}
        </div>
        
      </div>



      <div className=' w-lg h-100 mb-8 mt-30  text-black font-bold text-2xl '>
        <h1 className='text-4xl uppercase font-extrabold'>{t("faq.prompt")}</h1> <br /> <br />
        <ContactForm action="https://formspree.io/f/mdagggdo" compact />
      </div>

    </section>
  );
}

function Avis() {
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




function Contact() {
  const [loading, setLoading] = useState(false);
  const { t } = useLanguage();
  return (
    <section id='Contact' className="py-20 bg-white flex scroll-mt-40 ">


  <FadeInUp className='flex w-2xl  flex-col  mx-auto px-4 h-full mt-25 '>
        <div className='mb-8 flex flex-col'>
          <h2 className="text-4xl  mb-12 text-black uppercase font-extrabold">{t("contact.heading")}</h2>
          <h4 className="text-2xl font-semibold mb-4 text-black">{t("contact.subtitle")}</h4>
          <p className='text-black text-2xl'>{t("contact.paragraph")}</p>
          <br />
        </div>
        <hr />
        <div className='flex  gap-50 mt-4 w-full '>
          <div className="flex flex-col ">
            <motion.a
              href="https://www.facebook.com/visioad/"
              whileHover={{ scale: 1.06, y: -6, transition: { duration: 0.18 } }}
              whileTap={{ scale: 0.97 }}
              aria-label="Facebook"
              className="inline-block"
            >
              <Image src="/facebook.png" width={24} height={24} alt="facebook image" />
            </motion.a>
            <p className=' mt-2 text-2xl text-black'>facebook</p>
          </div>

          <div className="flex flex-col ">
            <motion.a
              href="https://www.instagram.com/ste_visioad/"
              whileHover={{ scale: 1.06, y: -6, transition: { duration: 0.18 } }}
              whileTap={{ scale: 0.97 }}
              aria-label="Instagram"
              className="inline-block"
            >
              <Image src="/instagram.png" width={24} height={24} alt="instagram image" />
            </motion.a>
            <p className=' mt-2 text-2xl text-black'>instagram</p>
          </div>

          <div className="flex flex-col ">
            <motion.a
              href="https://www.youtube.com/@visoad"
              whileHover={{ scale: 1.06, y: -6, transition: { duration: 0.18 } }}
              whileTap={{ scale: 0.97 }}
              aria-label="YouTube"
              className="inline-block"
            >
              <Image src="/youtube.png" width={24} height={24} alt="youtube image" />
            </motion.a>
            <p className=' mt-2 text-2xl text-black '>youtube</p>
          </div>
        </div>


      </FadeInUp>
      <FadeInUp className=' w-xl  mb-8 mr-5 rounded-2xl  text-black font-bold text-xl  bg-[#FCF6F6] '>
        <div className='  p-10 flex flex-col '>
          <ContactForm action="https://formspree.io/f/meeggebj" />
        </div>
      </FadeInUp>
    </section>
  );
}