import React from 'react';
import { MapPin, Database, Calculator, FileText } from 'lucide-react';
import './Methodology.css';

const steps = [
    {
        icon: <MapPin size={24} />,
        step: "Step 1",
        title: "Site Assessment",
        description: "Comprehensive evaluation of roof characteristics, drainage systems, and environmental factors affecting water collection efficiency.",
        points: ["Roof area measurement", "Material assessment", "Slope analysis", "Drainage evaluation"]
    },
    {
        icon: <Database size={24} />,
        step: "Step 2",
        title: "Data Collection",
        description: "Systematic gathering of rainfall data, soil conditions, and local regulations to ensure accurate calculations and compliance.",
        points: ["Rainfall pattern analysis", "Soil permeability testing", "Regulatory compliance", "Historical data review"]
    },
    {
        icon: <Calculator size={24} />,
        step: "Step 3",
        title: "Calculation & Analysis",
        description: "Advanced computational methods to determine optimal system design, storage requirements, and expected performance metrics.",
        points: ["Volume calculations", "System sizing", "Performance modeling", "Cost-benefit analysis"]
    },
    {
        icon: <FileText size={24} />,
        step: "Step 4",
        title: "Report Generation",
        description: "Professional documentation with technical specifications, recommendations, and implementation guidelines for stakeholders.",
        points: ["Technical specifications", "Implementation plan", "Maintenance guidelines", "ROI projections"]
    }
];

const Methodology = () => {
    return (
        <section className="methodology">
            <div className="container">
                <div className="pill-badge-center">
                    <span className="dot"></span> Technical Methodology
                </div>

                <h2 className="section-title">
                    Scientific Approach to <br />
                    <span className="highlight">Water Assessment</span>
                </h2>

                <p className="section-subtitle">
                    Our platform employs rigorous scientific methodologies and industry-standard protocols
                    to deliver accurate, reliable assessments for sustainable water management projects.
                </p>

                <div className="steps-grid">
                    {steps.map((item, index) => (
                        <div className="step-card" key={index}>
                            <div className="step-header">
                                <div className="step-icon-wrapper">
                                    {item.icon}
                                </div>
                                <div className="step-info">
                                    <h3 className="step-title">{item.title}</h3>
                                    <span className="step-number">{item.step}</span>
                                </div>
                            </div>

                            <p className="step-description">{item.description}</p>

                            <ul className="step-points">
                                {item.points.map((point, idx) => (
                                    <li key={idx}>
                                        <span className="bullet">•</span> {point}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Methodology;
