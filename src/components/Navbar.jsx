import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';

const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/services', label: 'Services' },
  { to: '/skills', label: 'Skills' },
  { to: '/contact', label: 'Contact' }
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  // Close mobile menu when route changes (via click anywhere on link)
  useEffect(() => {
    const close = () => setOpen(false);
    window.addEventListener('resize', close);
    return () => window.removeEventListener('resize', close);
  }, []);

  return (
    <nav className="navbar">
      <div className="container nav-inner">
        <Link to="/" className="brand" onClick={() => setOpen(false)}>
          <span className="brand-dot" />
          Hasmath's Agency
        </Link>

        <ul className={`nav-links ${open ? 'open' : ''}`}>
          {links.map(l => (
            <li key={l.to}>
              <NavLink
                to={l.to}
                end={l.to === '/'}
                onClick={() => setOpen(false)}
                className={({ isActive }) => isActive ? 'active' : ''}
              >
                {l.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <button
          className="menu-toggle"
          onClick={() => setOpen(o => !o)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </div>
    </nav>
  );
}