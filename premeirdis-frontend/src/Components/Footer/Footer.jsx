import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div className="cta">
          <h2>Ready to get started with<br/> <span>Premier?</span></h2>
          <button className="cta-btn">Get a Consultation</button>
        </div>

        <nav className="footer-nav">
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/what-we-do">What We DO</Link></li>
            <li><Link to="/contact-us">Contact Us</Link></li>
            <li>Login</li>
            <li>Get A Free Trial</li>
          </ul>

          <ul>
            <li>Privacy</li>
            <li>Compliance</li>
            <li>Network Policy</li>
            <li>Government Capability Statement</li>
            <li>Scanner Software</li>
            <li>Remote Support</li>
          </ul>
        </nav>
      </div>

      <div className="footer-bottom">
        <div className="copyright">
          <p>Made with love for great people.</p>
          <p>© Copyright {new Date().getFullYear()} - JCAR LLC dba Premier Document Imaging Solutions - Serving you since 2007</p>
        </div>
      </div>
    </footer>
  );
}
