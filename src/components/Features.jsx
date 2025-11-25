import React from 'react';
import { Calculator, MapPin, FileText, BarChart3, ShieldCheck, Users, ArrowRight } from 'lucide-react';
import './Features.css';

const featuresData = [
    {
        icon: <Calculator size={24} />,
        title: "Volume Calculations",
        description: "Advanced algorithms to calculate rainwater collection potential based on roof area, rainfall data, and system efficiency parameters.",
        points: ["Precise volume estimates", "Multiple calculation methods", "Historical data analysis"]
    },
    {
        icon: <MapPin size={24} />,
        title: "Site Analysis",
        description: "Comprehensive site evaluation including topography, drainage patterns, soil conditions, and optimal placement recommendations.",
        points: ["Topographic assessment", "Drainage analysis", "Placement optimization"]
    },
    {
        icon: <FileText size={24} />,
        title: "Technical Reports",
        description: "Generate detailed professional reports with calculations, recommendations, and compliance documentation for stakeholders.",
        points: ["Professional formatting", "Compliance documentation", "Stakeholder ready"]
    },
    {
        icon: <BarChart3 size={24} />,
        title: "Data Visualization",
        description: "Interactive charts and graphs to visualize rainfall patterns, collection efficiency, and system performance metrics.",
        points: ["Interactive charts", "Performance metrics", "Trend analysis"]
    },
    {
        icon: <ShieldCheck size={24} />,
        title: "Quality Assurance",
        description: "Built-in validation checks and quality control measures to ensure accurate assessments and reliable results.",
        points: ["Validation checks", "Quality control", "Reliable results"]
    },
    {
        icon: <Users size={24} />,
        title: "Collaboration Tools",
        description: "Multi-user support with role-based access, project sharing, and team collaboration features for complex assessments.",
        points: ["Multi-user support", "Role-based access", "Team collaboration"]
    }
];

const Features = () => {
    return (
        <section className="features">
            <div className="container">
                <div className="pill-badge-center">
                    <span className="dot"></span> Platform Capabilities
                </div>

                <h2 className="section-title">
                    Comprehensive Assessment <br />
                    <span className="highlight">Features</span>
                </h2>

                <p className="section-subtitle">
                    Professional-grade tools designed for environmental engineers and water management
                    consultants to conduct thorough rainwater harvesting assessments.
                </p>

                <div className="grid-3">
                    {featuresData.map((feature, index) => (
                        <div className="feature-card" key={index}>
                            <div className="feature-icon">
                                {feature.icon}
                            </div>
                            <h3 className="feature-title">{feature.title}</h3>
                            <p className="feature-description">{feature.description}</p>

                            <ul className="feature-points">
                                {feature.points.map((point, idx) => (
                                    <li key={idx}>
                                        <span className="check-icon">✓</span> {point}
                                    </li>
                                ))}
                            </ul>

                            <a href="#" className="explore-link">
                                Explore Feature <ArrowRight size={14} />
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;
