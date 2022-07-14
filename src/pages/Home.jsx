import React from 'react';
import About from '../components/About';
import AllInOne from '../components/AllInOne';
import Hero from '../components/Hero';
import Pricing from '../components/Pricing';
import Support from '../components/Support';

const Home = () => {
  return (
    <div>
      <Hero />
      <About />
      <Support />
      <AllInOne />
      <Pricing />
    </div>
  );
};

export default Home;
