import React from 'react';
import { ArrowRight, Info } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Hero.css';

const Hero = () => {
    return (
        <section className="hero">
            <div className="container hero-content">
                <div className="pill-badge">
                    <span className="dot"></span>
                    Professional Water Assessment Platform
                </div>

                <h1 className="hero-title">
                    Rooftop Rainwater <br />
                    <span className="highlight">Harvesting Assessment</span>
                </h1>

                <p className="hero-description">
                    Comprehensive digital platform for environmental engineers to conduct on-site
                    assessments, calculate water collection potential, and generate detailed
                    technical reports for sustainable water management projects.
                </p>

                <div className="hero-features-pill">
                    <span className="pill-item"><span className="icon">📊</span> Volume Calculations</span>
                    <span className="pill-item"><span className="icon">🌍</span> Site Analysis</span>
                    <span className="pill-item"><span className="icon">📄</span> Technical Reports</span>
                </div>

                <div className="hero-actions">
                    <Link to="/assessment" className="btn btn-primary">
                        Start Assessment <ArrowRight size={18} />
                    </Link>
                    <button className="btn btn-outline">
                        <Info size={18} /> Learn More
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Hero;
