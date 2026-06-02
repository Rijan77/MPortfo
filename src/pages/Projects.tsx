import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import PageTransition from '../components/PageTransition';
import ProjectCard from '../components/ProjectCard';
import { projects } from '../data/projects';

export default function Projects() {
  return (
    <PageTransition>
      <Helmet>
        <title>Projects — Rijan Acharya</title>
        <meta name="description" content="Flutter mobile apps by Rijan Acharya — AR furniture shopping, smart waste management, and flight booking." />
        <meta property="og:title" content="Projects — Rijan Acharya" />
      </Helmet>

      <section style={{ padding: 'clamp(3rem, 8vw, 6rem) 1.5rem', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 0, right: 0, width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(6,182,212,0.05) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.5 } }}
            style={{ marginBottom: '3.5rem', maxWidth: '600px' }}
          >
            <p style={{ color: '#06B6D4', fontFamily: "'DM Sans', sans-serif", fontSize: '0.78rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>Portfolio</p>
            <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: 'clamp(2rem, 5vw, 3rem)', color: '#F1F5F9', margin: '0 0 1rem', lineHeight: 1.1, letterSpacing: '-0.02em' }}>
              Things I've Built
            </h1>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 'clamp(0.95rem, 2vw, 1.05rem)', color: '#94A3B8', lineHeight: 1.75, margin: 0 }}>
              A collection of Flutter mobile applications — from AR-powered shopping to healthcare workflows.
            </p>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
            {projects.map((project, i) => (
              <ProjectCard key={project.slug} project={project} index={i} />
            ))}
          </div>
        </div>
      </section>
    </PageTransition>
  );
}

