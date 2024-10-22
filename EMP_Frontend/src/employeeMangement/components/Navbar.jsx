import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GiHamburgerMenu } from 'react-icons/gi';
import { FaSun, FaMoon } from 'react-icons/fa';
import './Header.css';

const Navbar = ({ handleLogout }) => {
  const [showMediaIcons, setShowMediaIcons] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle('dark-theme');
  };

  return (
    <nav className="main-nav fixed-nav">
      <div className="navbar-section">
        <div className="logo">
          <h1 className="text-xl font-bold text-yellow-200">👨🏼‍💻 EM Service</h1>
        </div>

        <div className="menu-link">
          <button onClick={() => navigate('/employeelist')} className="btn">Home</button>
          <button onClick={() => navigate('/addEmployee')} className="btn">Add Employee</button>
        </div>
      </div>

      <div className="social-media">
        <div className="theme-toggle" onClick={toggleDarkMode}>
          {darkMode ? <FaSun /> : <FaMoon />}
        </div>

        {/* Logout button positioned to the right of the theme toggle, visible on large screens */}
        <button 
          onClick={() => { handleLogout(); navigate('/'); }} 
          className="btn logout-button"
        >
          Logout
        </button>

        <div className="hamburger-menu" onClick={() => setShowMediaIcons(!showMediaIcons)}>
          <GiHamburgerMenu />
        </div>
      </div>

      {showMediaIcons && (
        <div className="mobile-menu">
          <button onClick={() => { navigate('/employeelist'); setShowMediaIcons(false); }}>Home</button>
          <button onClick={() => { navigate('/addEmployee'); setShowMediaIcons(false); }}>Add Employee</button>
          {/* Logout button in the mobile menu */}
          <button onClick={() => { handleLogout(); navigate('/'); setShowMediaIcons(false); }}>Logout</button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
