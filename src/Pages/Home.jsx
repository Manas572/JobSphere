import React from 'react';
import Navbar from '../Components/NavbarComp';
import Feature from '../Components/Feature';
import Footer from '../Components/Footer';
import Head from '../Components/Hero1';

const Home = () => {
  return (
    <>
        <Navbar />
        <Head />
        <Feature />
        <Footer />
    </>
  );
};

export default Home;