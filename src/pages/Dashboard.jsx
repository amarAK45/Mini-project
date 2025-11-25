import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Plus, FileText, MapPin, Calendar, Trash2, ArrowRight } from 'lucide-react';
import Navbar from '../components/Navbar';
import './Dashboard.css';

const Dashboard = () => {
    const [assessments, setAssessments] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAssessments = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/assessments');
                if (response.ok) {
                    const data = await response.json();
                    // Sort by date (newest first)
                    const sortedData = data.sort((a, b) => new Date(b.date) - new Date(a.date));
                    setAssessments(sortedData);
                } else {
                    throw new Error('Failed to fetch from server');
                }
            } catch (error) {
                console.error("Error fetching assessments:", error);
                // Fallback to local storage if server fails
                const localData = JSON.parse(localStorage.getItem('assessments') || '[]');
                const sortedLocalData = localData.sort((a, b) => new Date(b.date) - new Date(a.date));
                setAssessments(sortedLocalData);
            }
        };

        fetchAssessments();
    }, []);

    const handleViewReport = (assessment) => {
        localStorage.setItem('currentAssessment', JSON.stringify(assessment));
        navigate('/reports');
    };

    const handleDelete = async (e, id) => {
        e.stopPropagation();
        if (window.confirm('Are you sure you want to delete this assessment?')) {
            try {
                // Try to delete from server
                const response = await fetch(`http://localhost:5000/api/assessments/${id}`, {
                    method: 'DELETE',
                });

                if (response.ok) {
                    const updatedAssessments = assessments.filter(a => a.id !== id);
                    setAssessments(updatedAssessments);
                } else {
                    throw new Error('Failed to delete from server');
                }
            } catch (error) {
                console.error("Error deleting assessment:", error);
                // Fallback to local storage
                const updatedAssessments = assessments.filter(a => a.id !== id);
                setAssessments(updatedAssessments);
                localStorage.setItem('assessments', JSON.stringify(updatedAssessments));
            }
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    return (
        <div className="dashboard-page">
            <Navbar />

            <div className="dashboard-header">
                <div className="container header-content">
                    <div>
                        <h1>My Assessments</h1>
                        <p>Manage your rainwater harvesting projects</p>
                    </div>
                    <Link to="/assessment" className="new-assessment-btn">
                        <Plus size={20} /> New Assessment
                    </Link>
                </div>
            </div>

            <div className="container dashboard-content">
                {assessments.length === 0 ? (
                    <div className="empty-state">
                        <div className="empty-icon">
                            <FileText size={48} />
                        </div>
                        <h3>No Assessments Yet</h3>
                        <p>Start your first rainwater harvesting assessment to see it here.</p>
                        <Link to="/assessment" className="start-btn">
                            Start Assessment
                        </Link>
                    </div>
                ) : (
                    <div className="assessments-grid">
                        {assessments.map(assessment => (
                            <div key={assessment.id} className="assessment-card" onClick={() => handleViewReport(assessment)}>
                                <div className="card-header">
                                    <h3>{assessment.projectName || 'Untitled Project'}</h3>
                                    <button
                                        className="delete-btn"
                                        onClick={(e) => handleDelete(e, assessment.id)}
                                        title="Delete Assessment"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>

                                <div className="card-details">
                                    <div className="detail-item">
                                        <MapPin size={14} />
                                        <span>{assessment.step1.selectedCity}, {assessment.step1.selectedState}</span>
                                    </div>
                                    <div className="detail-item">
                                        <Calendar size={14} />
                                        <span>{formatDate(assessment.date)}</span>
                                    </div>
                                </div>

                                <div className="card-metrics">
                                    <div className="metric">
                                        <span className="label">Collection</span>
                                        <span className="value">{assessment.metrics.annualCollection.toLocaleString()} L</span>
                                    </div>
                                    <div className="metric">
                                        <span className="label">Savings</span>
                                        <span className="value">₹{assessment.metrics.savings.toLocaleString()}</span>
                                    </div>
                                </div>

                                <div className="card-footer">
                                    <span>View Report</span>
                                    <ArrowRight size={16} />
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
