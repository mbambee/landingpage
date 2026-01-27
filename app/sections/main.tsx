"use client";

import Hero from './Hero';
import About from './About';
import Services from './Services';
import Avis from './Avis';
import Contact from './Contact';

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