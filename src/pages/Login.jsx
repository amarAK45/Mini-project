import React, { useState } from 'react';
import { LayoutDashboard, CheckCircle2, ShieldCheck, Lock, Eye, EyeOff, Globe, Building2, Users } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const professionalRoles = [
        "Environmental Engineer",
        "Water Management Consultant",
        "Government Official",
        "Research Professional",
        "Construction Professional",
        "Property Developer",
        "Municipal Planner"
    ];

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        organization: '',
        role: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isLogin && formData.password !== formData.confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        const endpoint = isLogin ? 'http://localhost:5000/api/login' : 'http://localhost:5000/api/register';
        const payload = isLogin
            ? { email: formData.email, password: formData.password }
            : {
                name: formData.name,
                email: formData.email,
                password: formData.password,
                organization: formData.organization,
                role: formData.role
            };

        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            const data = await response.json();

            if (response.ok) {
                if (isLogin) {
                    localStorage.setItem('user', JSON.stringify(data.user));
                    navigate('/');
                } else {
                    alert("Account created successfully! Please sign in.");
                    setIsLogin(true);
                    setFormData({ ...formData, password: '', confirmPassword: '' });
                }
            } else {
                alert(data.message || "Authentication failed");
            }
        } catch (error) {
            console.error("Auth Error:", error);
            alert("Server error. Please try again.");
        }
    };

    return (
        <div className="login-page">
            <div className="login-container">
                {/* Left Panel - Form */}
                <div className="login-left">
                    <div className="login-header">
                        <Link to="/" className="login-logo">
                            <div className="logo-icon-md">
                                <LayoutDashboard size={24} color="white" />
                            </div>
                            <span>JalNetra</span>
                        </Link>
                    </div>

                    <div className="auth-content">
                        <div className="auth-icon-wrapper">
                            <div className="auth-icon-circle">
                                <span className="water-drop-icon">💧</span>
                            </div>
                        </div>

                        <h1 className="auth-title">Welcome to JalNetra</h1>
                        <p className="auth-subtitle">
                            {isLogin ? "Sign in to access your environmental assessment tools" : "Create your account to start conducting assessments"}
                        </p>

                        <div className="auth-toggle">
                            <button
                                className={`toggle-btn ${isLogin ? 'active' : ''}`}
                                onClick={() => setIsLogin(true)}
                            >
                                → Sign In
                            </button>
                            <button
                                className={`toggle-btn ${!isLogin ? 'active' : ''}`}
                                onClick={() => setIsLogin(false)}
                            >
                                + Create Account
                            </button>
                        </div>

                        <form className="auth-form" onSubmit={handleSubmit}>
                            {!isLogin && (
                                <>
                                    <div className="form-group">
                                        <label>Full Name <span className="required">*</span></label>
                                        <input
                                            type="text"
                                            name="name"
                                            placeholder="Enter your full name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required={!isLogin}
                                        />
                                    </div>
                                </>
                            )}

                            <div className="form-group">
                                <label>Email Address <span className="required">*</span></label>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Enter your email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            {!isLogin && (
                                <>
                                    <div className="form-group">
                                        <label>Organization <span className="required">*</span></label>
                                        <input
                                            type="text"
                                            name="organization"
                                            placeholder="Enter your organization name"
                                            value={formData.organization}
                                            onChange={handleChange}
                                            required={!isLogin}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Professional Role <span className="required">*</span></label>
                                        <div className="select-wrapper">
                                            <select
                                                name="role"
                                                value={formData.role}
                                                onChange={handleChange}
                                                required={!isLogin}
                                            >
                                                <option value="" disabled>Select your role</option>
                                                {professionalRoles.map((role, index) => (
                                                    <option key={index} value={role}>{role}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </>
                            )}

                            <div className="form-group">
                                <label>Password <span className="required">*</span></label>
                                <div className="password-input">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        placeholder={isLogin ? "Enter your password" : "Create a password"}
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                    />
                                    <button
                                        type="button"
                                        className="toggle-password"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                            </div>

                            {!isLogin && (
                                <div className="form-group">
                                    <label>Confirm Password <span className="required">*</span></label>
                                    <div className="password-input">
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            name="confirmPassword"
                                            placeholder="Confirm your password"
                                            value={formData.confirmPassword}
                                            onChange={handleChange}
                                            required={!isLogin}
                                        />
                                        <button
                                            type="button"
                                            className="toggle-password"
                                            onClick={() => setShowPassword(!showPassword)}
                                        >
                                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                        </button>
                                    </div>
                                </div>
                            )}

                            {isLogin ? (
                                <div className="form-footer">
                                    <label className="checkbox-label">
                                        <input type="checkbox" /> Remember me
                                    </label>
                                    <a href="#" className="forgot-password">Forgot password?</a>
                                </div>
                            ) : (
                                <div className="form-footer">
                                    <label className="checkbox-label">
                                        <input type="checkbox" required /> I accept the terms and conditions and privacy policy <span className="required">*</span>
                                    </label>
                                </div>
                            )}

                            <button type="submit" className="submit-btn">
                                {isLogin ? "→ Sign In" : "+ Create Account"}
                            </button>
                        </form>

                        <p className="demo-text">
                            {isLogin ? "Demo credentials: admin@rainharvest.com / password123" : "Demo registration: Use any valid email format"}
                        </p>

                        {/* Social Login and SSO removed */}
                    </div>

                    <div className="login-footer-links">
                        <span>Need help? Contact our <a href="#" className="link-green">support team</a></span>
                        <div className="legal-links">
                            <a href="#">Privacy Policy</a> • <a href="#">Terms of Service</a>
                        </div>
                    </div>
                </div>

                {/* Right Panel - Info */}
                <div className="login-right">
                    <div className="info-card">
                        <div className="card-header">
                            <div className="card-icon-box">
                                <LayoutDashboard size={20} color="#2E7D32" />
                            </div>
                            <div>
                                <h3>Professional Platform</h3>
                                <p>Built for environmental professionals</p>
                            </div>
                        </div>
                        <ul className="check-list">
                            <li><CheckCircle2 size={16} className="check-icon" /> Comprehensive assessment tools</li>
                            <li><CheckCircle2 size={16} className="check-icon" /> Real-time data visualization</li>
                            <li><CheckCircle2 size={16} className="check-icon" /> Professional report generation</li>
                            <li><CheckCircle2 size={16} className="check-icon" /> Collaborative project management</li>
                            <li><CheckCircle2 size={16} className="check-icon" /> Regulatory compliance tracking</li>
                        </ul>
                    </div>

                    <div className="info-card">
                        <div className="card-header">
                            <div className="card-icon-box">
                                <ShieldCheck size={20} color="#2E7D32" />
                            </div>
                            <div>
                                <h3>Enterprise Security</h3>
                                <p>Your data is protected with industry standards</p>
                            </div>
                        </div>

                        <div className="security-verification">
                            <div className="security-header">
                                <span>Security Verification</span>
                                <span className="refresh-icon">↻</span>
                            </div>
                            <div className="security-code-box">
                                <span className="security-code">2QE4FW</span>
                                <span className="security-label">Enter code above</span>
                            </div>
                        </div>

                        <div className="security-grid">
                            <div className="security-item">
                                <ShieldCheck size={16} className="sec-icon" />
                                <div>
                                    <h4>Advanced Security</h4>
                                    <p>Multi-factor authentication and encryption</p>
                                </div>
                            </div>
                            <div className="security-item">
                                <Lock size={16} className="sec-icon" />
                                <div>
                                    <h4>Account Protection</h4>
                                    <p>Automatic lockout after failed attempts</p>
                                </div>
                            </div>
                            <div className="security-item">
                                <Eye size={16} className="sec-icon" />
                                <div>
                                    <h4>Activity Monitoring</h4>
                                    <p>Real-time session and access tracking</p>
                                </div>
                            </div>
                            <div className="security-item">
                                <Lock size={16} className="sec-icon" />
                                <div>
                                    <h4>Secure Access</h4>
                                    <p>Industry-standard authentication protocols</p>
                                </div>
                            </div>
                        </div>

                        <div className="security-footer">
                            <span><ShieldCheck size={12} /> SSL Secured</span>
                            <span><Lock size={12} /> GDPR Compliant</span>
                            <span><CheckCircle2 size={12} /> ISO 27001</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
