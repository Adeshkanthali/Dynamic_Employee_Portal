import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GiHamburgerMenu } from 'react-icons/gi';
import { FaSun, FaMoon } from 'react-icons/fa';
import './Header.css';

const Navbar = () => {
  const [showMediaIcons, setShowMediaIcons] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle('dark-theme');
  };

  return (
    <nav className="main-nav fixed-nav"> {/* Added 'fixed-nav' for fixed positioning */}

      <div className="navbar-section">

        {/* Logo */}
        <div className="logo">
          <h1 className="text-xl font-bold text-yellow-200">👨🏼‍💻 EM Service</h1>
        </div>

        {/* Menu Links (Home and Add Employee) */}
        <div className="menu-link">
          <button onClick={() => navigate('/')} className="btn">Home</button>
          <button onClick={() => navigate('/addEmployee')} className="btn">Add Employee</button>
        </div>
      </div>

      {/* Theme Toggle */}
      <div className="social-media">
        <div className="theme-toggle" onClick={toggleDarkMode}>
          {darkMode ? <FaSun /> : <FaMoon />}
        </div>

        {/* Hamburger Menu (Mobile view) */}
        <div className="hamburger-menu" onClick={() => setShowMediaIcons(!showMediaIcons)}>
          <GiHamburgerMenu />
        </div>
      </div>

      {/* Mobile Menu */}
      {showMediaIcons && (
        <div className="mobile-menu">
          <button onClick={() => { navigate('/'); setShowMediaIcons(false); }}>Home</button>
          <button onClick={() => { navigate('/addEmployee'); setShowMediaIcons(false); }}>Add Employee</button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
