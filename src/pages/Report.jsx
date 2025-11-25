import React, { useEffect, useState } from 'react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
    PieChart, Pie, Cell
} from 'recharts';
import { FileText, Download, ArrowLeft, Droplets, Zap, DollarSign, Calendar } from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import Navbar from '../components/Navbar';
import './Report.css';

const Report = () => {
    const [assessmentData, setAssessmentData] = useState(null);
    const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

    useEffect(() => {
        const data = localStorage.getItem('currentAssessment');
        if (data) {
            setAssessmentData(JSON.parse(data));
        }
    }, []);

    const handleDownloadPDF = async () => {
        setIsGeneratingPDF(true);
        const input = document.getElementById('report-content');

        try {
            const canvas = await html2canvas(input, {
                scale: 2,
                useCORS: true,
                logging: false
            });

            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();
            const imgWidth = pdfWidth;
            const imgHeight = (canvas.height * imgWidth) / canvas.width;

            let heightLeft = imgHeight;
            let position = 0;

            pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
            heightLeft -= pdfHeight;

            while (heightLeft >= 0) {
                position = heightLeft - imgHeight;
                pdf.addPage();
                pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
                heightLeft -= pdfHeight;
            }

            pdf.save(`JalNetra_Report_${assessmentData.projectName || 'Project'}.pdf`);
        } catch (error) {
            console.error("Error generating PDF:", error);
            alert("Failed to generate PDF. Please try again.");
        } finally {
            setIsGeneratingPDF(false);
        }
    };

    if (!assessmentData) {
        return (
            <div className="report-page">
                <Navbar />
                <div className="container empty-state">
                    <div className="empty-icon">
                        <FileText size={48} />
                    </div>
                    <h2>No Report Found</h2>
                    <p>Please complete an assessment to generate a report.</p>
                    <button className="start-btn" onClick={() => window.location.href = '/assessment'}>
                        Start Assessment
                    </button>
                </div>
            </div>
        );
    }

    const { step1, step2, step3, step4, metrics } = assessmentData;

    // Data for Monthly Collection Chart
    const monthlyData = Object.keys(step3.monthlyRainfall).map(month => ({
        name: month.charAt(0).toUpperCase() + month.slice(1, 3),
        rainfall: parseInt(step3.monthlyRainfall[month]) || 0,
        collection: Math.round((parseInt(step3.monthlyRainfall[month]) || 0) * metrics.effectiveArea * 0.001) // Simplified collection calc
    }));

    // Data for Cost Breakdown (Estimated)
    const costData = [
        { name: 'Storage System', value: 45 },
        { name: 'Filtration', value: 25 },
        { name: 'Piping & Pumps', value: 20 },
        { name: 'Labor & Install', value: 10 },
    ];

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

    return (
        <div className="report-page">
            <Navbar />

            <div className="report-header">
                <div className="container">
                    <button className="back-btn" onClick={() => window.location.href = '/dashboard'}>
                        <ArrowLeft size={16} /> Back to Dashboard
                    </button>
                    <div className="header-content">
                        <div>
                            <h1>Rainwater Harvesting Report</h1>
                            <p>Project: {assessmentData.projectName || 'Untitled Project'}</p>
                        </div>
                        <button
                            className="download-btn"
                            onClick={handleDownloadPDF}
                            disabled={isGeneratingPDF}
                        >
                            {isGeneratingPDF ? (
                                <>Generating PDF...</>
                            ) : (
                                <><Download size={18} /> Download PDF Report</>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            <div className="container report-content" id="report-content">
                {/* PDF Header (Visible in PDF) */}
                <div className="pdf-header" style={{ marginBottom: '20px', borderBottom: '2px solid #eee', paddingBottom: '10px' }}>
                    <h1>JalNetra Assessment Report</h1>
                    <div className="pdf-meta" style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
                        <div>
                            <p><strong>Project:</strong> {assessmentData.projectName || 'Untitled Project'}</p>
                            <p><strong>Date:</strong> {new Date(assessmentData.date).toLocaleDateString()}</p>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                            <p><strong>Generated By:</strong> {JSON.parse(localStorage.getItem('user') || '{}').name || 'Guest User'}</p>
                            <p><strong>Organization:</strong> {JSON.parse(localStorage.getItem('user') || '{}').organization || 'N/A'}</p>
                        </div>
                    </div>
                </div>

                {/* Executive Summary */}
                <section className="report-section summary-section">
                    <h2>Executive Summary</h2>
                    <div className="metrics-grid">
                        <div className="metric-card">
                            <div className="icon-box blue"><Droplets size={24} /></div>
                            <div>
                                <h3>{metrics.annualCollection.toLocaleString()} L</h3>
                                <p>Annual Water Collection</p>
                            </div>
                        </div>
                        <div className="metric-card">
                            <div className="icon-box green"><Zap size={24} /></div>
                            <div>
                                <h3>{metrics.efficiency}%</h3>
                                <p>System Efficiency</p>
                            </div>
                        </div>
                        <div className="metric-card">
                            <div className="icon-box orange"><DollarSign size={24} /></div>
                            <div>
                                <h3>₹{metrics.savings.toLocaleString()}</h3>
                                <p>Annual Savings</p>
                            </div>
                        </div>
                        <div className="metric-card">
                            <div className="icon-box purple"><Calendar size={24} /></div>
                            <div>
                                <h3>{step3.rainyDays} Days</h3>
                                <p>Rainy Days / Year</p>
                            </div>
                        </div>
                    </div>
                </section>

                <div className="charts-grid">
                    {/* Monthly Collection Chart */}
                    <section className="report-section chart-section">
                        <h3>Monthly Collection Potential</h3>
                        <div className="chart-container">
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={monthlyData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="rainfall" name="Rainfall (mm)" fill="#8884d8" />
                                    <Bar dataKey="collection" name="Collection (kL)" fill="#82ca9d" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </section>

                    {/* Cost Breakdown Chart */}
                    <section className="report-section chart-section">
                        <h3>Estimated Cost Breakdown</h3>
                        <div className="chart-container">
                            <ResponsiveContainer width="100%" height={300}>
                                <PieChart>
                                    <Pie
                                        data={costData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={80}
                                        fill="#8884d8"
                                        paddingAngle={5}
                                        dataKey="value"
                                        label
                                    >
                                        {costData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                    <Legend />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </section>
                </div>

                {/* System Specifications */}
                <section className="report-section specs-section">
                    <h3>System Specifications</h3>
                    <div className="specs-grid">
                        <div className="spec-item">
                            <label>Storage Type</label>
                            <span>{step4.storageType}</span>
                        </div>
                        <div className="spec-item">
                            <label>Capacity</label>
                            <span>{step4.storageCapacity} Liters</span>
                        </div>
                        <div className="spec-item">
                            <label>Filtration</label>
                            <span>{step4.filtrationSystem}</span>
                        </div>
                        <div className="spec-item">
                            <label>Pump Type</label>
                            <span>{step4.pumpType}</span>
                        </div>
                        <div className="spec-item">
                            <label>Pump Capacity</label>
                            <span>{step4.pumpCapacity} LPH</span>
                        </div>
                        <div className="spec-item">
                            <label>Pressure</label>
                            <span>{step4.distributionPressure} PSI</span>
                        </div>
                    </div>

                    <div className="features-list">
                        <h4>Additional Features Included:</h4>
                        <ul>
                            {Object.entries(step4.additionalFeatures)
                                .filter(([_, value]) => value)
                                .map(([key, _]) => (
                                    <li key={key}>{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</li>
                                ))
                            }
                            {Object.values(step4.additionalFeatures).every(v => !v) && <li>None selected</li>}
                        </ul>
                    </div>
                </section>

                {/* Site Details */}
                <section className="report-section details-section">
                    <h3>Site & Roof Details</h3>
                    <div className="details-grid">
                        <div className="detail-row">
                            <span>Location:</span>
                            <strong>{step1.selectedCity}, {step1.selectedState}</strong>
                        </div>
                        <div className="detail-row">
                            <span>Building Type:</span>
                            <strong>{step1.buildingType}</strong>
                        </div>
                        <div className="detail-row">
                            <span>Roof Area:</span>
                            <strong>{metrics.roofArea} sq ft</strong>
                        </div>
                        <div className="detail-row">
                            <span>Roof Material:</span>
                            <strong>{step2.roofMaterial} (Runoff Coeff: {metrics.runoffCoefficient})</strong>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Report;
