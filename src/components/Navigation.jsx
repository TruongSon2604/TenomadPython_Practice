import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Navigation = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Don't show navigation on login page
  if (location.pathname === '/login') {
    return null;
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">Book Management</Link>

        {currentUser && (
          <div className="navbar-nav">
            <div className="nav-item">
              <Link
                to="/books"
                className={`nav-link ${location.pathname.startsWith('/books') ? 'active' : ''}`}
              >
                Books
              </Link>
            </div>
            <div className="nav-item">
              <button onClick={handleLogout} className="logout-btn">
                Logout ({currentUser.name})
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
