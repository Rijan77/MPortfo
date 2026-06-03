import { Link } from 'react-router-dom';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer style={{
      borderTop: '1px solid #1E293B',
      background: '#080C16',
      padding: '2.5rem 1.5rem',
      marginTop: 'auto',
    }}>
      <div className="footer-inner" style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
        <div>
          <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: '1.1rem', color: '#F1F5F9' }}>
            <span style={{ color: '#06B6D4' }}>R</span>ijan Acharya<span style={{ color: '#8B5CF6' }}>.</span>
          </span>
          <p style={{ color: '#64748B', fontSize: '0.82rem', marginTop: '0.3rem', fontFamily: "'DM Sans', sans-serif" }}>
            © {year} · Flutter Developer · Kathmandu, Nepal
          </p>
        </div>

        <nav style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
          {[
            { to: '/about',    label: 'About'    },
            { to: '/projects', label: 'Projects' },
            { to: '/contact',  label: 'Contact'  },
          ].map(({ to, label }) => (
            <Link key={to} to={to} style={{ color: '#64748B', fontSize: '0.85rem', textDecoration: 'none', fontFamily: "'DM Sans', sans-serif", transition: 'color 0.2s' }}
              onMouseEnter={e => ((e.target as HTMLElement).style.color = '#94A3B8')}
              onMouseLeave={e => ((e.target as HTMLElement).style.color = '#64748B')}
            >
              {label}
            </Link>
          ))}
        </nav>

        <div style={{ display: 'flex', gap: '1rem' }}>
          <a href="https://github.com/Rijan77" target="_blank" rel="noopener noreferrer" aria-label="GitHub" style={{ color: '#64748B', transition: 'color 0.2s' }}
            onMouseEnter={e => ((e.target as HTMLElement).style.color = '#06B6D4')}
            onMouseLeave={e => ((e.target as HTMLElement).style.color = '#64748B')}
          >
            <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
          </a>
          <a href="https://www.linkedin.com/in/rijan-acharya/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" style={{ color: '#64748B', transition: 'color 0.2s' }}
            onMouseEnter={e => ((e.target as HTMLElement).style.color = '#06B6D4')}
            onMouseLeave={e => ((e.target as HTMLElement).style.color = '#64748B')}
          >
            <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </a>
          <a href="mailto:rijanacharya73@gmail.com" aria-label="Email" style={{ color: '#64748B', transition: 'color 0.2s' }}
            onMouseEnter={e => ((e.target as HTMLElement).style.color = '#06B6D4')}
            onMouseLeave={e => ((e.target as HTMLElement).style.color = '#64748B')}
          >
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
            </svg>
          </a>
        </div>
      </div>
      <style>{`
        @media (max-width: 640px) {
          .footer-inner { flex-direction: column; align-items: center; text-align: center; }
          .footer-inner nav { justify-content: center; }
        }
      `}</style>
    </footer>
  );
}

