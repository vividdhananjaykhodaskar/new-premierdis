import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';
import logoImage from '../../assets/images/logo.png';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleNavigation = (path) => {
    navigate(path);
    closeMenu();
  };

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  return (
    <header className="header">
      <div className="header-container">
        <button className="mobile-menu-toggle" onClick={toggleMenu} aria-label="Toggle menu">
          <span className="material-symbols-outlined">
            {isMenuOpen ? 'close' : 'menu'}
          </span>
        </button>

        <div className="logo">
          <Link to="/" onClick={closeMenu}>
            <img src={logoImage} alt="Premier Logo" className="logo-full" />
          </Link>
        </div>

        {isMenuOpen && <div className="menu-overlay" onClick={closeMenu}></div>}

        <nav className={`nav ${isMenuOpen ? 'nav-open' : ''}`}>
          <Link to="/" className="nav-link" onClick={closeMenu}>Home</Link>
          <Link to="/what-we-do" className="nav-link" onClick={closeMenu}>What We DO</Link>
          <Link to="/contact-us" className="nav-link" onClick={closeMenu}>Contact Us</Link>
          <Link to="/login" className="nav-link" onClick={closeMenu}>Login</Link>
          <button className="btn-free-trial" onClick={() => handleNavigation('/free-trial')}>
            Free Trial
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;