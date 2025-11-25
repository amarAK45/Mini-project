import React from 'react';
import { LayoutDashboard } from 'lucide-react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container footer-content">
                <div className="footer-brand">
                    <div className="logo-icon-sm">
                        <LayoutDashboard size={16} color="white" />
                    </div>
                    <span>RainHarvest</span>
                </div>

                <div className="footer-copyright">
                    &copy; {new Date().getFullYear()} RainHarvest Platform. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
