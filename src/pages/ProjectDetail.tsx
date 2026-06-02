import { Link, useParams, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import PageTransition from '../components/PageTransition';
import { getProject, getAdjacentProjects } from '../data/projects';
import ImageCarousel from '../components/ImageCarousel';

const techColors: Record<string, string> = {
  Flutter:  '#54C5F8',
  Firebase: '#FFA000',
  Supabase: '#3ECF8E',
  Dart:     '#0175C2',
  FastAPI:  '#009688',
};

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const project = getProject(slug ?? '');
  const { prev, next } = getAdjacentProjects(slug ?? '');

  if (!project) return <Navigate to="/projects" replace />;

  return (
    <PageTransition>
      <Helmet>
        <title>{project.title} — Rijan Acharya</title>
        <meta name="description" content={`${project.subtitle}. ${project.description[0]}`} />
        <meta property="og:title" content={`${project.title} — Rijan Acharya`} />
      </Helmet>

      <section style={{ padding: 'clamp(3rem, 8vw, 5rem) 1.5rem', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-100px', left: '-100px', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(6,182,212,0.05) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>

          {/* Breadcrumb */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Link to="/projects" style={{ color: '#64748B', fontFamily: "'DM Sans', sans-serif", fontSize: '0.83rem', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.35rem', transition: 'color 0.2s' }}
              onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = '#06B6D4')}
              onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = '#64748B')}
            >
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" /></svg>
              Projects
            </Link>
            <span style={{ color: '#1E293B' }}>/</span>
            <span style={{ color: '#94A3B8', fontFamily: "'DM Sans', sans-serif", fontSize: '0.83rem' }}>{project.title}</span>
          </motion.div>

          {/* Header */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0, transition: { delay: 0.05 } }} style={{ marginBottom: '2.5rem' }}>
            <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: 'clamp(2rem, 5vw, 3rem)', color: '#F1F5F9', margin: '0 0 0.5rem', letterSpacing: '-0.02em' }}>
              {project.title}
            </h1>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '1.1rem', color: '#64748B', margin: '0 0 1.5rem' }}>{project.subtitle}</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {project.tech.map(t => (
                <span key={t} style={{
                  padding: '0.3rem 0.8rem',
                  borderRadius: '9999px',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  fontFamily: "'DM Sans', sans-serif",
                  background: `${techColors[t] ?? '#8B5CF6'}15`,
                  color: techColors[t] ?? '#8B5CF6',
                  border: `1px solid ${techColors[t] ?? '#8B5CF6'}30`,
                }}>
                  {t}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Animated screenshot carousel */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 0.1 } }}
            style={{ marginBottom: '3rem', display: 'flex', justifyContent: 'center' }}
          >
            <ImageCarousel images={project.images} title={project.title} />
          </motion.div>

          {/* Description */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 0.15 } }}
            style={{ marginBottom: '3rem' }}
          >
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '1.2rem', color: '#F1F5F9', margin: '0 0 1.25rem' }}>About the Project</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {project.description.map((para, i) => (
                <p key={i} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '1rem', color: '#94A3B8', lineHeight: 1.8, margin: 0 }}>{para}</p>
              ))}
            </div>
          </motion.div>

          {/* Links */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 0.2 } }}
            style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '4rem', paddingTop: '1rem', borderTop: '1px solid #1E293B' }}
          >
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                padding: '0.65rem 1.5rem',
                borderRadius: '0.6rem',
                background: '#0F1524',
                border: '1px solid #1E293B',
                color: '#94A3B8',
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 600,
                fontSize: '0.88rem',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                transition: 'border-color 0.2s, color 0.2s',
              }}
              onMouseEnter={e => { const el = e.currentTarget; el.style.borderColor = 'rgba(6,182,212,0.3)'; el.style.color = '#06B6D4'; }}
              onMouseLeave={e => { const el = e.currentTarget; el.style.borderColor = '#1E293B'; el.style.color = '#94A3B8'; }}
            >
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" /></svg>
              View on GitHub
            </a>

            {project.demo && (
              <a
                href={project.demo === 'DEMO_PLACEHOLDER' ? '#' : project.demo}
                target="_blank"
                rel="noopener noreferrer"
                onClick={project.demo === 'DEMO_PLACEHOLDER' ? (e) => e.preventDefault() : undefined}
                title={project.demo === 'DEMO_PLACEHOLDER' ? 'Demo link — add YouTube URL in src/data/projects.ts' : undefined}
                style={{
                  padding: '0.65rem 1.5rem',
                  borderRadius: '0.6rem',
                  background: 'linear-gradient(135deg, #06B6D4, #0891B2)',
                  color: '#080C16',
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 700,
                  fontSize: '0.88rem',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  opacity: project.demo === 'DEMO_PLACEHOLDER' ? 0.6 : 1,
                  boxShadow: '0 4px 16px rgba(6,182,212,0.25)',
                  cursor: project.demo === 'DEMO_PLACEHOLDER' ? 'not-allowed' : 'pointer',
                }}
              >
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M19.59 7a2.996 2.996 0 00-2.12-.88H6.53A3 3 0 003.5 9.07v5.86a3 3 0 003.03 2.95h10.94A3 3 0 0020.5 14.93V9.07a3 3 0 00-.91-2.07zM9.75 15.02V9.02l5.5 3-5.5 3z" /></svg>
                {project.demo === 'DEMO_PLACEHOLDER' ? 'Watch Demo (add link)' : 'Watch Demo'}
              </a>
            )}
          </motion.div>

          {/* Prev / Next navigation */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 0.25 } }}
            style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', borderTop: '1px solid #1E293B', paddingTop: '2rem' }}
          >
            {prev ? (
              <Link to={`/projects/${prev.slug}`} style={{ textDecoration: 'none', background: '#0F1524', border: '1px solid #1E293B', borderRadius: '0.75rem', padding: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.75rem', transition: 'border-color 0.2s' }}
                onMouseEnter={e => ((e.currentTarget as HTMLElement).style.borderColor = 'rgba(6,182,212,0.3)')}
                onMouseLeave={e => ((e.currentTarget as HTMLElement).style.borderColor = '#1E293B')}
              >
                <svg width="16" height="16" fill="none" stroke="#06B6D4" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" /></svg>
                <div>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.72rem', color: '#64748B', margin: '0 0 0.15rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Previous</p>
                  <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '0.9rem', color: '#F1F5F9', margin: 0 }}>{prev.title}</p>
                </div>
              </Link>
            ) : <div />}

            {next ? (
              <Link to={`/projects/${next.slug}`} style={{ textDecoration: 'none', background: '#0F1524', border: '1px solid #1E293B', borderRadius: '0.75rem', padding: '1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '0.75rem', textAlign: 'right', transition: 'border-color 0.2s' }}
                onMouseEnter={e => ((e.currentTarget as HTMLElement).style.borderColor = 'rgba(6,182,212,0.3)')}
                onMouseLeave={e => ((e.currentTarget as HTMLElement).style.borderColor = '#1E293B')}
              >
                <div>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.72rem', color: '#64748B', margin: '0 0 0.15rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Next</p>
                  <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '0.9rem', color: '#F1F5F9', margin: 0 }}>{next.title}</p>
                </div>
                <svg width="16" height="16" fill="none" stroke="#06B6D4" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
              </Link>
            ) : <div />}
          </motion.div>
        </div>
      </section>
    </PageTransition>
  );
}

