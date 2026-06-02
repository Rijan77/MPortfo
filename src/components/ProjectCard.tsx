import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useMotionValue, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import type { Project } from '../data/projects';

/* ── Auto-cycling mini slideshow for the phone frame ── */
const slideV = {
  enter:  { x: '100%', opacity: 0 },
  center: { x: 0,      opacity: 1, transition: { duration: 0.5, ease: 'easeOut' as const } },
  exit:   { x: '-100%',opacity: 0, transition: { duration: 0.35, ease: 'easeIn'  as const } },
};

function MiniSlideshow({ images, title }: { images: string[]; title: string }) {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const id = setInterval(() => setIdx(i => (i + 1) % images.length), 2600);
    return () => clearInterval(id);
  }, [images.length]);

  if (!images.length) return <div style={{ fontSize: '1.8rem', textAlign: 'center', paddingTop: '1rem' }}>📱</div>;

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
      <AnimatePresence mode="popLayout">
        <motion.img
          key={idx}
          variants={slideV}
          initial="enter"
          animate="center"
          exit="exit"
          src={images[idx]}
          alt={`${title} screenshot ${idx + 1}`}
          loading="lazy"
          decoding="async"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }}
          draggable={false}
        />
      </AnimatePresence>
      {/* Tiny dot indicator */}
      {images.length > 1 && (
        <div style={{ position: 'absolute', bottom: '4px', left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: '3px', zIndex: 2 }}>
          {images.map((_, i) => (
            <div key={i} style={{ width: i === idx ? '10px' : '4px', height: '4px', borderRadius: '9999px', background: i === idx ? '#06B6D4' : 'rgba(255,255,255,0.4)', transition: 'all 0.3s' }} />
          ))}
        </div>
      )}
    </div>
  );
}

interface Props {
  project: Project;
  index?: number;
}

const techColors: Record<string, string> = {
  Flutter:  '#54C5F8',
  Firebase: '#FFA000',
  Supabase: '#3ECF8E',
  Dart:     '#0175C2',
  FastAPI:  '#009688',
};

export default function ProjectCard({ project, index = 0 }: Props) {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { stiffness: 250, damping: 25 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), { stiffness: 250, damping: 25 });
  const glowX   = useTransform(x, [-0.5, 0.5], ['0%', '100%']);
  const glowY   = useTransform(y, [-0.5, 0.5], ['0%', '100%']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = cardRef.current!.getBoundingClientRect();
    x.set((e.clientX - r.left) / r.width - 0.5);
    y.set((e.clientY - r.top) / r.height - 0.5);
  };

  const handleMouseLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: index * 0.1, ease: 'easeOut' as const }}
      style={{ perspective: '900px' }}
    >
      <motion.div
        ref={cardRef}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d', height: '100%' }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <Link to={`/projects/${project.slug}`} style={{ textDecoration: 'none', display: 'block', height: '100%' }}>
          <div style={{
            position: 'relative',
            background: 'rgba(13,21,37,0.7)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: '1.25rem',
            overflow: 'hidden',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '0 8px 40px rgba(0,0,0,0.35)',
            transition: 'border-color 0.25s, box-shadow 0.25s',
          }}
            onMouseEnter={e => { const el = e.currentTarget; el.style.borderColor = 'rgba(6,182,212,0.35)'; el.style.boxShadow = '0 16px 56px rgba(6,182,212,0.15)'; }}
            onMouseLeave={e => { const el = e.currentTarget; el.style.borderColor = 'rgba(255,255,255,0.07)'; el.style.boxShadow = '0 8px 40px rgba(0,0,0,0.35)'; }}
          >
            {/* Moving glow highlight */}
            <motion.div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1, background: `radial-gradient(circle at ${glowX} ${glowY}, rgba(6,182,212,0.07) 0%, transparent 60%)` }} />

            {/* Phone-frame screenshot — first image from project */}
            <div style={{ padding: '1.5rem 1.5rem 0', display: 'flex', justifyContent: 'center', position: 'relative', zIndex: 2 }}>
              <div className="phone-frame" style={{ width: '110px', height: '185px', flexShrink: 0 }}>
                <div style={{ width: '100%', height: '100%', paddingTop: '1.4rem', background: 'linear-gradient(135deg, #14202E 0%, #0D1525 100%)', overflow: 'hidden', position: 'relative' }}>
                  <MiniSlideshow images={project.images} title={project.title} />
                </div>
              </div>
            </div>

            {/* Info */}
            <div style={{ padding: '1.25rem 1.5rem 1.5rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem', position: 'relative', zIndex: 2 }}>
              <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '1.05rem', color: '#F1F5F9', margin: 0 }}>{project.title}</h3>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.8rem', color: '#64748B', margin: 0 }}>{project.subtitle}</p>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.82rem', color: '#94A3B8', margin: '0.25rem 0 0', lineHeight: 1.6, flex: 1 }}>{project.description[0]}</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginTop: '0.75rem' }}>
                {project.tech.slice(0, 3).map(t => (
                  <span key={t} style={{ padding: '0.18rem 0.55rem', borderRadius: '9999px', fontSize: '0.7rem', fontWeight: 600, fontFamily: "'DM Sans', sans-serif", background: `${techColors[t] ?? '#8B5CF6'}15`, color: techColors[t] ?? '#8B5CF6', border: `1px solid ${techColors[t] ?? '#8B5CF6'}28` }}>
                    {t}
                  </span>
                ))}
              </div>
              <div style={{ marginTop: '1rem', display: 'flex', alignItems: 'center', gap: '0.3rem', color: '#06B6D4', fontSize: '0.8rem', fontWeight: 600, fontFamily: "'DM Sans', sans-serif" }}>
                View Project
                <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
              </div>
            </div>
          </div>
        </Link>
      </motion.div>
    </motion.div>
  );
}
