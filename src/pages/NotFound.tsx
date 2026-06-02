import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import PageTransition from '../components/PageTransition';

export default function NotFound() {
  return (
    <PageTransition>
      <Helmet>
        <title>404 — Page Not Found</title>
      </Helmet>
      <section style={{ minHeight: 'calc(100vh - 4rem)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem 1.5rem', textAlign: 'center' }}>
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0, transition: { duration: 0.5 } }}>
          <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: '6rem', color: '#1E293B', margin: '0 0 0.5rem', lineHeight: 1 }}>404</p>
          <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: 'clamp(1.5rem, 4vw, 2.2rem)', color: '#F1F5F9', margin: '0 0 1rem', letterSpacing: '-0.02em' }}>
            Page not found
          </h1>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '1rem', color: '#64748B', margin: '0 0 2.5rem', maxWidth: '380px' }}>
            This page doesn't exist. Let's get you back to something real.
          </p>
          <Link to="/" style={{
            padding: '0.75rem 1.75rem',
            borderRadius: '0.6rem',
            background: 'linear-gradient(135deg, #06B6D4, #0891B2)',
            color: '#080C16',
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 700,
            fontSize: '0.92rem',
            textDecoration: 'none',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            boxShadow: '0 4px 20px rgba(6,182,212,0.3)',
          }}>
            Back to Home
          </Link>
        </motion.div>
      </section>
    </PageTransition>
  );
}

