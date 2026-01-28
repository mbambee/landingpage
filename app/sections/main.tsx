"use client";

import Hero from './Hero';
import HeroPc from './heroPc';
import About from './About';
import Services from './ServicesPc';
import ServicesMobile from './Services';

import Avis from './Avis';
import Contact from './Contact';

export const MainSection = () => {
  return (
    <div>
      <div id="acceuil">
      <section className='hidden lg:block w-full '>
      <HeroPc />
      </section>
      <section className='block lg:hidden w_full '>
      <Hero />
      </section>
      </div>
      <About />
      <div id='services'>
      <section className='hidden lg:block w-full '>
      <Services />
      </section>
      <section className='block lg:hidden w_full '>
      <ServicesMobile />
      </section>
      </div>
      <Avis />
      <Contact />
    </div>
  )
};