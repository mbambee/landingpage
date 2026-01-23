"use client";
import Image from 'next/image';
import { useState } from "react";


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


function Hero() {
  return (
    <section id='home' className=" flex items-center justify-center bg-white px-6 py-10 relative  h-screen scroll-mt-20">

      <div className='w-1/2 h-full absolute right-0 top-0  '>
        <Image src="/HeroPic.jpg" alt="Hero Image" fill className="object-cover  " priority />
      </div>
      <div className="absolute inset-0 bg-linear-to-r from-white via-white to-transparent min-h-175"></div>

      <div className="container mx-auto px-6 md:px-12 z-10 " >
        <h1 className="mt-6 text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight leading-18 ">
          NOTRE MARKETING <br /> DIGITAL GÉNÈRE <br /> DES PROSPECTS <br /> POUR VOTRE <br /> ENTREPRISE
        </h1>
        <p className="mt-15 text-2xl text-gray-600 leading-3  ">
          Nous optimisons votre marketing digital pour de meilleurs <br /> résultats, en vous faisant gagner temps et argent !
        </p>
        <div className="mt-10 flex  gap-x-6">
          <button className="btn font-extrabold"><a href="#Contact">Commencer maintenant</a>
          </button>
        </div>
      </div>
    </section>
  );
}


function About() {
  return (
    <section id='about' className="py-20 h-80 bg-[#FCF6F6] scroll-mt-40">
      <div className="w-9xl bg-[#FCF6F6] mx-auto px-4  flex justify-center items-center gap-20 ">
        <h1 className="text-3xl md:text-5xl tracking-tight text-slate-900 font-extrabold">NOTRE MISSION: <br /> VOTRE SUCCES</h1>
        <p className="text-gray-600  text-2xl w-3xl _my-6 ">
          Nous sommes dédiés à accélérer la croissance des entreprises grâce à des stratégies complètes de publicité numérique et en ligne.
          Notre équipe d’experts excelle en stratégies marketing, SEO, marketing de contenu et réseaux sociaux.
          Partenaire avec VISIOAD et découvrez une approche sur mesure du marketing digital qui transforme votre entreprise.
        </p>
      </div>
    </section>
  );

}




function Services() {
  const service = [
    { title: "Marketing Digital", desc: "Nos services de marketing digital sont conçus pour améliorer votre présence en ligne et engager efficacement votre audience." },
    { title: "Création de contenu & production multimédia", desc: "Nous livrons du contenu de haute qualité et une production médiatique conçue pour raconter l’histoire de votre marque." },
    { title: "Services de design", desc: "Élevez votre marque avec des designs créatifs et fonctionnels, alliant innovation et praticité pour réussir." },
    { title: "Développement web & app", desc: "Création de sites web et d’applications responsives conçus pour offrir des expériences utilisateur fluides et générer des résultats." },
    { title: "Ventes et gestion de comptes", desc: "Stimuler la croissance grâce à des stratégies de vente expertes et une gestion de compte dédiée pour établir des relations clients durables." },
    { title: "Surveillance CCTV", desc: "Assurez la sécurité avec surveillance CCTV 24/7, alertes en temps réel et accès à distance, partout et à tout moment.." },
  ];
 
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  return (
    <section id='services' className="py-20 bg-white flex scroll-mt-40">
      <div className='flex  w-3xl  flex-col   mx-auto px-4 '>
        <h2 className="text-3xl md:text-5xl tracking-tight text-slate-900 font-extrabold mb-5">NOS DOMAINES D’EXPERTISE</h2>
        <p className='text-gray-600 text-2xl'>Chez VisioAd, nous offrons des services complets pour booster la portée de votre marque, de la stratégie marketing à la création de contenu et production média, pour stimuler croissance et engagement.</p><br />
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
            className={`transition-all duration-300 ease-in-out overflow-hidden ${
              openIndex === index ? 'max-h-40 opacity-100 mt-4' : 'max-h-0 opacity-0'
            }`}
          >
            <p className="text-gray-600 leading-relaxed text-xl">
              {service.desc}
            </p>
          </div>
        </div>
      ))}
    </div>
  </div>

      

      <div className=' w-lg h-100 mb-8 mt-30  text-black font-bold text-2xl '>
        <h1 className='text-4xl uppercase font-extrabold'>tu trouves pas <br /> ta réponse ?</h1> <br /> <br />
        <label htmlFor="">nom</label>
        <input type="text" className='block border-2 border-gray-300 rounded-md p-2 w-[80%] mb-4' />
        <label htmlFor="">email</label>
        <input type="email" className='block border-2 border-gray-300 rounded-md p-2 w-[80%] mb-4' />
        <label htmlFor="">message</label>
        <textarea className='block border-2 border-gray-300 rounded-md p-2 w-[80%] mb-4' rows={4}></textarea>
        <button className='btn'>Envoyer</button>
      </div>

    </section>
  );
}


function Avis() {
  const service = [
    { etoile: 4, desc: "VISIOAD a conçu notre site avec un design soigné et une expérience optimale, renforçant notre présence en ligne.", image: "/lucas.png", name: "Lucas Martin", dis: "Responsable de la marque" },
    { etoile: 4, desc: "De la conception au marketing, l’expertise et la stratégie de VISIOAD ont renforcé notre succès numérique.", image: "/david.png", name: "David Carter", dis: "Responsable de la stratégie" },
    { etoile: 4, desc: "Grâce à VISIOAD, notre entreprise a connu un essor significatif de sa présence en ligne grâce à leurs campagnes digitales ciblées.", image: "/sophie.png", name: "Sophie Lambert", dis: "Directeur du marketing" },
  ];
  return (
    <section id='Avis' className="py-20 bg-[#FCF6F6] flex scroll-mt-40 ">

      <div className='bg-[#FCF6F6] flex  flex-col  mx-auto px-4 w-full '>
        <h2 className="text-4xl  text-center mb-12 text-black font-extrabold">L’IMPACT DE NOS STRATÉGIES</h2>
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
                  <p className='text-black font-bold'>{s.name}</p>
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
  return (
    <section id='Contact' className="py-20 bg-white flex scroll-mt-40 ">


      <div className='flex w-2xl  flex-col  mx-auto px-4 h-full mt-25 '>
        <div className='mb-8 flex flex-col'>
          <h2 className="text-4xl  mb-12 text-black uppercase font-extrabold">Contactez-nous</h2>
          <h4 className="text-2xl font-semibold mb-4 text-black">Obtenez un devis gratuit</h4>
          <p className='text-black text-2xl'>Nous sommes impatients de vous rencontrer ! Remplissez le formulaire ci-dessous
            et transformons votre vision en réalité.</p>
          <br />
        </div>
        <hr />
        <div className='flex  gap-50 mt-4 w-full '>
          <div className=''>
            <a href="https://www.facebook.com/visioad/"><Image src="/facebook.png" width={24} height={24} alt="facebook image" /></a>
            <p className=' mt-2 text-xl text-black'>facebook</p>
          </div>
          <div>
            <a href="https://www.instagram.com/ste_visioad/"><Image src="/instagram.png" width={24} height={24} alt="instagram image" /></a>
            <p className=' mt-2 text-xl text-black'>instagram</p>
          </div>
          <div>
            <a href="https://www.youtube.com/@visoad "><Image src="/youtube.png" width={24} height={24} alt="youtube image" /></a>
            <p className=' mt-2 text-xl text-black'>youtube</p>
          </div>
        </div>


      </div>
      <div className=' w-xl  mb-8 mr-5 rounded-2xl  text-black font-bold text-xl  bg-[#FCF6F6] '>
        <div className='  p-10 flex flex-col '>
          <label htmlFor="">nom</label>
          <input type="text" className='block border-2 border-gray-300 bg-white rounded-md p-2 w-[80%] mb-4' />
          <label htmlFor="">email</label>
          <input type="email" required className='block border-2 border-gray-300 bg-white rounded-md p-2 w-[80%] mb-4' />
          <label htmlFor="">sujet</label>
          <input type="text" className='block border-2 border-gray-300 bg-white rounded-md p-2 w-[80%] mb-4' />
          <label htmlFor="">message</label>
          <textarea required className='block border-2 border-gray-300 bg-white rounded-md p-2 w-[80%] mb-4' rows={4}></textarea>
          <button className='border-2 border-red-500 bg-white text-black text-lg rounded-md p-2 w-30 hover:text-red-500 '>Envoyer</button>
        </div>
      </div>
    </section> 
  );
}