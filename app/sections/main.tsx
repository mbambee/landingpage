"use client";
import Image from 'next/image';
import { useState } from "react";
import { useLanguage } from "../i18n/LanguageContext";
import ServicesSection from "../animation/servicstyle";


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
        <button type="submit" disabled={status === 'loading'} className={compact ? 'btn' : 'border-2 border-red-500 bg-white text-black text-lg rounded-md p-2 w-30 hover:text-red-500'}>
          {t('contact.send')}
        </button>
        {status === 'loading' && <span className="text-gray-600">...</span>}
      </div>

      {status === 'success' && <p className="mt-3 text-green-600">{t('contact.success')}</p>}
      {status === 'error' && error && <p className="mt-3 text-red-600">{error}</p>}
    </form>
  );
}


function Hero() {
  const { t } = useLanguage();

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
        <p className="mt-15 text-2xl text-gray-600 leading-3  flex flex-col ">
          <span>{t("hero.subtitle")}</span>
          <span>{t("hero.subtitle2")}</span>
        </p>
        <div className="mt-10 flex  gap-x-6">
          <button className="btn font-extrabold"><a href="#Contact">{t("hero.cta")}</a>
          </button>
        </div>
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
        <p className="text-gray-600  text-2xl w-3xl">
          {t("about.text")}
        </p>
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
    { etoile: 4, desc: "VISIOAD a conçu notre site avec un design soigné et une expérience optimale, renforçant notre présence en ligne.", image: "/lucas.png", name: "Lucas Martin", dis: "Responsable de la marque" },
    { etoile: 4, desc: "De la conception au marketing, l’expertise et la stratégie de VISIOAD ont renforcé notre succès numérique.", image: "/david.png", name: "David Carter", dis: "Responsable de la stratégie" },
    { etoile: 4, desc: "Grâce à VISIOAD, notre entreprise a connu un essor significatif de sa présence en ligne grâce à leurs campagnes digitales ciblées.", image: "/sophie.png", name: "Sophie Lambert", dis: "Directeur du marketing" },
  ];
  return (
    <section id='Avis' className="py-20 bg-[#FCF6F6] flex scroll-mt-40 ">

      <div className='bg-[#FCF6F6] flex  flex-col  mx-auto px-4 w-full '>
        <h2 className="text-4xl  text-center mb-12 text-black font-extrabold">{t("avis.heading")}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 ml-30 gap-8  bg-[#FCF6F6]">
          {service.map((s, i) => (
            <div key={i} className="divs w-100 h-100 bg-white  ">
              <div className='flex gap-2 mb-4'>
                {Array.from({ length: s.etoile }).map((_, index) => (
                  <Image key={index} src="/star.png" width={20} height={20} alt="star" />
                ))}
              </div>
              <p className="text-gray-600 text-xl">{s.desc}</p>
              <div className='flex items-center gap-4 mt-6'>
                <Image src={s.image} width={70} height={70} alt={s.name} className="rounded-full " />
                <div className='flex flex-col'>
                  <p className='text-black font-bold text-xl'>{s.name}</p>
                  <p className='text-gray-600'>{s.dis}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}




function Contact() {
  const [loading, setLoading] = useState(false);
  const { t } = useLanguage();
  return (
    <section id='Contact' className="py-20 bg-white flex scroll-mt-40 ">


      <div className='flex w-2xl  flex-col  mx-auto px-4 h-full mt-25 '>
        <div className='mb-8 flex flex-col'>
          <h2 className="text-4xl  mb-12 text-black uppercase font-extrabold">{t("contact.heading")}</h2>
          <h4 className="text-2xl font-semibold mb-4 text-black">{t("contact.subtitle")}</h4>
          <p className='text-black text-2xl'>{t("contact.paragraph")}</p>
          <br />
        </div>
        <hr />
        <div className='flex  gap-50 mt-4 w-full '>
          <div className=''>
            <a href="https://www.facebook.com/visioad/"><Image src="/facebook.png" width={24} height={24} alt="facebook image" /></a>
            <p className=' mt-2 text-2xl text-black'>facebook</p>
          </div>
          <div>
            <a href="https://www.instagram.com/ste_visioad/"><Image src="/instagram.png" width={24} height={24} alt="instagram image" /></a>
            <p className=' mt-2 text-2xl text-black'>instagram</p>
          </div>
          <div>
            <a href="https://www.youtube.com/@visoad "><Image src="/youtube.png" width={24} height={24} alt="youtube image" /></a>
            <p className=' mt-2 text-2xl text-black '>youtube</p>
          </div>
        </div>


      </div>
      <div className=' w-xl  mb-8 mr-5 rounded-2xl  text-black font-bold text-xl  bg-[#FCF6F6] '>
        <div className='  p-10 flex flex-col '>
          <ContactForm action="https://formspree.io/f/meeggebj" />
        </div>
      </div>
    </section>
  );
}