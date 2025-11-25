import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Features from '../components/Features';
import CTA from '../components/CTA';
import Methodology from '../components/Methodology';
import Footer from '../components/Footer';

const Landing = () => {
    return (
        <>
            <Navbar />
            <main>
                <Hero />
                <Features />
                <CTA />
                <Methodology />
            </main>
            <Footer />
        </>
    );
};

export default Landing;
