import React from 'react';
import { LayoutDashboard, LogIn, Home, ClipboardCheck } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    const [user, setUser] = React.useState(null);
    const location = useLocation();
    const navigate = useNavigate();

    React.useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        } else {
            setUser(null);
        }
    }, [location]);

    const handleLogout = () => {
        localStorage.removeItem('user');
        setUser(null);
        navigate('/');
    };

    return (
        <nav className="navbar">
            <div className="container navbar-content">
                <Link to="/" className="logo">
                    <div className="logo-icon">
                        <LayoutDashboard size={20} color="white" />
                    </div>
                    <span>RainHarvest</span>
                </Link>

                <div className="nav-links">
                    <Link to="/" className="nav-link">
                        <Home size={16} />
                        <span>Home</span>
                    </Link>
                    <Link to="/dashboard" className="nav-link">
                        <LayoutDashboard size={16} />
                        <span>Dashboard</span>
                    </Link>
                    <Link to="/reports" className="nav-link">
                        <ClipboardCheck size={16} />
                        <span>Reports</span>
                    </Link>
                </div>

                <div className="auth-action">
                    {user ? (
                        <button onClick={handleLogout} className="login-btn" style={{ background: 'rgba(255,255,255,0.1)', border: 'none' }}>
                            <LogIn size={16} style={{ transform: 'rotate(180deg)' }} />
                            <span>Logout</span>
                        </button>
                    ) : (
                        <Link to="/login" className="login-btn">
                            <LogIn size={16} />
                            <span>Login</span>
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
