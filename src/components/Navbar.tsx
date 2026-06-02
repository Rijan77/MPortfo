import { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const links = [
  { to: '/',        label: 'Home'     },
  { to: '/about',   label: 'About'    },
  { to: '/projects',label: 'Projects' },
  { to: '/contact', label: 'Contact'  },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <header
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
        borderBottom: scrolled ? '1px solid #1E293B' : '1px solid transparent',
        background: scrolled ? 'rgba(8,12,22,0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        transition: 'all 0.3s ease',
      }}
    >
      <nav style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '4rem' }}>
        {/* Logo */}
        <Link to="/" style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: '1.2rem', color: '#F1F5F9', textDecoration: 'none', letterSpacing: '-0.02em' }}>
          <span style={{ color: '#06B6D4' }}>R</span>ijan<span style={{ color: '#8B5CF6' }}>.</span>
        </Link>

        {/* Desktop nav */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }} className="desktop-nav">
          {links.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              style={({ isActive }: { isActive: boolean }) => ({
                padding: '0.4rem 0.85rem',
                borderRadius: '0.5rem',
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 500,
                fontSize: '0.9rem',
                textDecoration: 'none',
                color: isActive ? '#06B6D4' : '#94A3B8',
                background: isActive ? 'rgba(6,182,212,0.08)' : 'transparent',
                transition: 'all 0.2s',
              })}
            >
              {label}
            </NavLink>
          ))}
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              marginLeft: '0.75rem',
              padding: '0.4rem 1rem',
              borderRadius: '0.5rem',
              border: '1px solid #06B6D4',
              color: '#06B6D4',
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 600,
              fontSize: '0.85rem',
              textDecoration: 'none',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => { (e.target as HTMLElement).style.background = 'rgba(6,182,212,0.12)'; }}
            onMouseLeave={e => { (e.target as HTMLElement).style.background = 'transparent'; }}
          >
            Resume ↗
          </a>
        </div>

        {/* Mobile burger */}
        <button
          onClick={() => setMenuOpen(v => !v)}
          aria-label="Toggle menu"
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0.5rem', color: '#94A3B8', display: 'none' }}
          className="mobile-menu-btn"
        >
          <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {menuOpen ? (
              <>
                <line x1="4" y1="4" x2="18" y2="18" />
                <line x1="18" y1="4" x2="4" y2="18" />
              </>
            ) : (
              <>
                <line x1="3" y1="7" x2="19" y2="7" />
                <line x1="3" y1="12" x2="19" y2="12" />
                <line x1="3" y1="17" x2="19" y2="17" />
              </>
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            style={{ overflow: 'hidden', borderTop: '1px solid #1E293B', background: 'rgba(8,12,22,0.97)', backdropFilter: 'blur(12px)' }}
          >
            <div style={{ padding: '1rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              {links.map(({ to, label }) => (
                <NavLink
                  key={to}
                  to={to}
                  end={to === '/'}
                  onClick={() => setMenuOpen(false)}
                  style={({ isActive }: { isActive: boolean }) => ({
                    padding: '0.7rem 1rem',
                    borderRadius: '0.5rem',
                    fontFamily: "'DM Sans', sans-serif",
                    fontWeight: 500,
                    fontSize: '0.95rem',
                    textDecoration: 'none',
                    color: isActive ? '#06B6D4' : '#94A3B8',
                    background: isActive ? 'rgba(6,182,212,0.08)' : 'transparent',
                  })}
                >
                  {label}
                </NavLink>
              ))}
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMenuOpen(false)}
                style={{
                  marginTop: '0.5rem',
                  padding: '0.7rem 1rem',
                  borderRadius: '0.5rem',
                  border: '1px solid #06B6D4',
                  color: '#06B6D4',
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  textDecoration: 'none',
                  textAlign: 'center',
                }}
              >
                Resume ↗
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </header>
  );
}

