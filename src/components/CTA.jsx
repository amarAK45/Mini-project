import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import './CTA.css';

const CTA = () => {
    return (
        <section className="cta-section">
            <div className="container">
                <div className="cta-card">
                    <h2 className="cta-title">Ready to Start Your Assessment?</h2>
                    <p className="cta-description">
                        Join hundreds of environmental professionals using our platform to conduct
                        comprehensive rainwater harvesting assessments.
                    </p>
                    <Link to="/assessment" className="btn btn-primary">
                        Begin Assessment <ArrowRight size={18} />
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default CTA;
