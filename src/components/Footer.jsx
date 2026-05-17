import React from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../context/DataContext.jsx';

export default function Footer() {
  const { resetAll } = useData();
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-inner">
          <div>
            <div className="brand" style={{ marginBottom: 14 }}>
              <span className="brand-dot" />
              Hasmath's Agency
            </div>
            <p>Crafting modern, lightning-fast web experiences. Founded and led by <strong>Muhammad Ifran</strong>.</p>
          </div>
          <div>
            <h5>Navigate</h5>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/services">Services</Link></li>
              <li><Link to="/skills">Skills</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h5>Connect</h5>
            <ul>
              <li><a href="mailto:hello@hasmaths.agency">hello@hasmaths.agency</a></li>
              <li><a href="#">GitHub</a></li>
              <li><a href="#">LinkedIn</a></li>
              <li><a href="#">Twitter / X</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Hasmath's Agency — All rights reserved.</span>
          <button className="btn btn-ghost btn-small" onClick={resetAll}>↻ Reset content</button>
        </div>
      </div>
    </footer>
  );
}