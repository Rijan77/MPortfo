import { lazy, Suspense, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import PageTransition from '../components/PageTransition';
import ProjectCard from '../components/ProjectCard';
import { projects } from '../data/projects';
import { experiences, education, certifications } from '../data/experience';
import profileImg  from '../assets/profile.png';
import profileImg2 from '../assets/profile1.png';
import mediishaLogo from '../assets/mediisha.png';
import diyaloLogo   from '../assets/diyalo.jpg';
import pcpsLogo     from '../assets/pcps.png';
import advanceLogo  from '../assets/advance.jpg';
import SkillsShowcase from '../components/SkillsShowcase';

const LOGOS: Record<string, string> = {
  mediisha: mediishaLogo,
  diyalo:   diyaloLogo,
  pcps:     pcpsLogo,
  advance:  advanceLogo,
};

const HeroScene = lazy(() => import('../components/HeroScene'));
const CTAScene  = lazy(() => import('../components/CTAScene'));

const EASE = 'easeOut' as const;
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.55, delay, ease: EASE } },
});

/* ─── Tilt Photo (FIXED: image inside gradient border) ─── */
const PHOTOS = [
  { src: profileImg,  pos: 'center top',    label: 'Flutter Dev',    badge: '📱' },
  { src: profileImg2, pos: 'center center',  label: 'Software Eng.',  badge: '💻' },
];

function TiltPhoto() {
  const [photoIdx, setPhotoIdx] = useState(0);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [12, -12]), { stiffness: 200, damping: 22 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-12, 12]), { stiffness: 200, damping: 22 });
  const glowX = useTransform(x, [-0.5, 0.5], ['0%', '100%']);
  const glowY = useTransform(y, [-0.5, 0.5], ['0%', '100%']);

  useEffect(() => {
    const id = setInterval(() => setPhotoIdx(i => (i + 1) % PHOTOS.length), 4000);
    return () => clearInterval(id);
  }, []);

  const current = PHOTOS[photoIdx];

  return (
    <motion.div
      onMouseMove={e => {
        const r = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - r.left) / r.width - 0.5);
        y.set((e.clientY - r.top) / r.height - 0.5);
      }}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d', perspective: 900, position: 'relative', display: 'inline-block' }}
      className="hero-photo"
    >
      {/* Gradient border */}
      <div style={{ padding: '2px', borderRadius: '1.5rem', background: 'linear-gradient(135deg, rgba(6,182,212,0.7) 0%, rgba(139,92,246,0.7) 100%)', boxShadow: '0 24px 80px rgba(6,182,212,0.22), 0 8px 40px rgba(0,0,0,0.55)', display: 'inline-block' }}>
        <div style={{ width: '260px', height: '310px', borderRadius: 'calc(1.5rem - 2px)', overflow: 'hidden', position: 'relative', background: '#060A14' }}>

          {/* Preload both profile images so swapping is instant */}
          {PHOTOS.map((p, i) => (
            <link key={i} rel="preload" as="image" href={p.src} />
          ))}

          {/* Cross-fading photos */}
          <AnimatePresence mode="sync">
            <motion.img
              key={photoIdx}
              src={current.src}
              alt="Rijan Acharya"
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore — fetchpriority is valid HTML but TS types lag behind
              fetchpriority="high"
              decoding="async"
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1, transition: { duration: 0.9, ease: 'easeOut' as const } }}
              exit={{ opacity: 0, scale: 0.97, transition: { duration: 0.6, ease: 'easeIn' as const } }}
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: current.pos, display: 'block' }}
            />
          </AnimatePresence>

          {/* Subtle dark gradient at bottom for readability */}
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '60px', background: 'linear-gradient(to top, rgba(6,10,20,0.45), transparent)', pointerEvents: 'none', zIndex: 2 }} />

          {/* Moving light sheen */}
          <motion.div style={{
            position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 3,
            background: `radial-gradient(circle at ${glowX} ${glowY}, rgba(255,255,255,0.07) 0%, transparent 55%)`,
          }} />

          {/* Photo indicator dots — bottom center */}
          <div style={{ position: 'absolute', bottom: '10px', left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: '5px', zIndex: 4 }}>
            {PHOTOS.map((_, i) => (
              <button
                key={i}
                onClick={() => setPhotoIdx(i)}
                style={{ width: i === photoIdx ? '18px' : '6px', height: '6px', borderRadius: '9999px', background: i === photoIdx ? '#06B6D4' : 'rgba(255,255,255,0.35)', border: 'none', cursor: 'pointer', padding: 0, transition: 'all 0.35s ease' }}
                aria-label={`Photo ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Floating badge — Open to work */}
      <motion.div animate={{ y: [0, -6, 0] }} transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
        style={{ position: 'absolute', bottom: '-1rem', left: '-1rem', background: 'rgba(6,10,20,0.92)', backdropFilter: 'blur(12px)', border: '1px solid rgba(6,182,212,0.35)', borderRadius: '0.75rem', padding: '0.5rem 0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem', boxShadow: '0 8px 24px rgba(0,0,0,0.5)', zIndex: 10 }}>
        <span className="badge-dot" style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#22C55E', flexShrink: 0 }} />
        <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: '0.73rem', color: '#94A3B8', whiteSpace: 'nowrap' }}>Open to work</span>
      </motion.div>

      {/* Floating badge — animates label with the photo */}
      <AnimatePresence mode="wait">
        <motion.div
          key={photoIdx}
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 0.4, delay: 0.3 } }}
          exit={{ opacity: 0, y: 4, transition: { duration: 0.25 } }}
          style={{ position: 'absolute', top: '-0.75rem', right: '-1rem', background: 'rgba(6,10,20,0.92)', backdropFilter: 'blur(12px)', border: '1px solid rgba(84,197,248,0.35)', borderRadius: '0.75rem', padding: '0.4rem 0.8rem', display: 'flex', alignItems: 'center', gap: '0.4rem', boxShadow: '0 8px 24px rgba(0,0,0,0.5)', zIndex: 10 }}
        >
          <span style={{ fontSize: '0.8rem' }}>{current.badge}</span>
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: '0.7rem', color: '#54C5F8', whiteSpace: 'nowrap' }}>{current.label}</span>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}

/* ─── Alternating timeline item ─── */
function TimelineItem({ left, right, dot, index }: { left: React.ReactNode; right: React.ReactNode; dot: React.ReactNode; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.12, duration: 0.5, ease: EASE }}
      style={{ display: 'grid', gridTemplateColumns: '1fr 72px 1fr', gap: '1.5rem', alignItems: 'center', marginBottom: '2.5rem' }}
      className="timeline-row"
    >
      {left}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0, position: 'relative', zIndex: 2 }}>
        {dot}
      </div>
      {right}
    </motion.div>
  );
}

function LogoDot({ logoKey, glowColor, fallback }: { logoKey: string; glowColor: string; fallback: string }) {
  const src = LOGOS[logoKey];
  return (
    <div style={{
      width: '56px', height: '56px', borderRadius: '50%',
      background: '#fff',
      border: `2.5px solid ${glowColor}`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      overflow: 'hidden', flexShrink: 0,
      boxShadow: `0 0 18px ${glowColor}55, 0 4px 16px rgba(0,0,0,0.4)`,
      padding: '4px',
      position: 'relative', zIndex: 3,
    }}>
      {src
        ? <img src={src} alt={logoKey} style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: '50%' }} />
        : <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: '1.1rem', color: glowColor }}>{fallback}</span>
      }
    </div>
  );
}

function DateLabel({ text, align }: { text: string; align: 'left' | 'right' }) {
  return (
    <div style={{ textAlign: align }}>
      <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: 'clamp(0.78rem, 1.5vw, 0.92rem)', color: '#64748B', background: '#0D1525', border: '1px solid #1C2A3A', borderRadius: '0.5rem', padding: '0.3rem 0.7rem', display: 'inline-block' }}>{text}</span>
    </div>
  );
}

function ExpCard({ role, company, bullets, current }: { role: string; company: string; bullets: string[]; current: boolean }) {
  return (
    <div className="glass" style={{ padding: '1.5rem', height: '100%' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.5rem', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
        <div>
          <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 'clamp(0.9rem, 2vw, 1.05rem)', color: '#F1F5F9', margin: '0 0 0.2rem' }}>{role}</h3>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.84rem', color: '#06B6D4', margin: 0, fontWeight: 600 }}>{company}</p>
        </div>
        {current && <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.68rem', color: '#22C55E', fontWeight: 700, background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.25)', borderRadius: '9999px', padding: '0.15rem 0.55rem', whiteSpace: 'nowrap' }}>Current</span>}
      </div>
      <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {bullets.map((b, i) => (
          <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
            <span style={{ color: '#06B6D4', fontSize: '0.7rem', marginTop: '0.32rem', flexShrink: 0, lineHeight: 1 }}>▸</span>
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 'clamp(0.8rem, 1.6vw, 0.86rem)', color: '#94A3B8', lineHeight: 1.7 }}>{b}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function EduCard({ degree, institution, period }: { degree: string; institution: string; period: string }) {
  return (
    <div className="glass" style={{ padding: '1.5rem', height: '100%' }}>
      <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 'clamp(0.88rem, 2vw, 1rem)', color: '#F1F5F9', margin: '0 0 0.3rem', lineHeight: 1.35 }}>{degree}</h3>
      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.84rem', color: '#8B5CF6', margin: '0 0 0.15rem', fontWeight: 600 }}>{institution}</p>
      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.75rem', color: '#64748B', margin: 0 }}>{period}</p>
    </div>
  );
}

/* ─── Section heading ─── */
function SectionHead({ sup, title, accent = '.' }: { sup: string; title: string; accent?: string }) {
  return (
    <div style={{ marginBottom: '3rem' }}>
      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#06B6D4', margin: '0 0 0.75rem' }}>{sup}</p>
      <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 'clamp(2rem, 5vw, 3.2rem)', color: '#F1F5F9', margin: 0, letterSpacing: '-0.03em', lineHeight: 1.05 }}>
        {title}<span style={{ color: '#06B6D4' }}>{accent}</span>
      </h2>
    </div>
  );
}

/* ════════════════════════════════════════════════════════ */
export default function Home() {
  return (
    <PageTransition>
      <Helmet>
        <title>Rijan Acharya — Flutter Developer</title>
        <meta name="description" content="Flutter Developer and Software Engineer based in Kathmandu, Nepal, specializing in cross-platform mobile apps for healthcare." />
        <meta property="og:title" content="Rijan Acharya — Flutter Developer" />
      </Helmet>

      {/* ══ HERO ══════════════════════════════════════════════════════════ */}
      <section className="dot-grid" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', padding: '5rem 1.5rem 3rem', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-10%', right: '-5%', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(6,182,212,0.08) 0%, transparent 65%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '-5%', left: '-5%', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(139,92,246,0.07) 0%, transparent 65%)', pointerEvents: 'none' }} />

        <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'center' }} className="hero-main-grid">
          {/* Left text */}
          <div>
            <motion.div {...fadeUp(0.05)} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(6,182,212,0.07)', border: '1px solid rgba(6,182,212,0.2)', borderRadius: '9999px', padding: '0.3rem 1rem', marginBottom: '1.5rem' }}>
              <span className="badge-dot" style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#06B6D4', display: 'inline-block' }} />
              <span style={{ color: '#06B6D4', fontSize: '0.75rem', fontWeight: 600, fontFamily: "'DM Sans', sans-serif", letterSpacing: '0.05em' }}>Available for opportunities</span>
            </motion.div>

            <motion.h1 {...fadeUp(0.1)} style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 'clamp(3rem, 6.5vw, 5.2rem)', lineHeight: 1.0, letterSpacing: '-0.03em', color: '#F1F5F9', margin: '0 0 0.75rem' }}>
              Rijan<br /><span className="gradient-text">Acharya</span>
            </motion.h1>

            <motion.p {...fadeUp(0.16)} style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 500, fontSize: 'clamp(0.95rem, 2vw, 1.15rem)', color: '#94A3B8', margin: '0 0 1.25rem', letterSpacing: '-0.01em' }}>
              Flutter Developer · Software Engineer
            </motion.p>

            <motion.p {...fadeUp(0.22)} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 'clamp(0.9rem, 1.8vw, 1rem)', color: '#64748B', lineHeight: 1.8, margin: '0 0 2rem', maxWidth: '450px' }}>
              Building cross-platform mobile apps that matter — currently crafting healthcare workflows at{' '}
              <span style={{ color: '#06B6D4', fontWeight: 600 }}>Mediisha</span> with Flutter &amp; Clean Architecture.
            </motion.p>

            <motion.div {...fadeUp(0.28)} style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
              <Link to="/projects"
                style={{ padding: '0.75rem 1.75rem', borderRadius: '0.6rem', background: 'linear-gradient(135deg, #06B6D4, #0891B2)', color: '#060A14', fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: '0.9rem', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.4rem', boxShadow: '0 4px 24px rgba(6,182,212,0.35)', transition: 'transform 0.2s, box-shadow 0.2s' }}
                onMouseEnter={e => { const el = e.currentTarget; el.style.transform = 'translateY(-2px)'; el.style.boxShadow = '0 10px 32px rgba(6,182,212,0.45)'; }}
                onMouseLeave={e => { const el = e.currentTarget; el.style.transform = ''; el.style.boxShadow = '0 4px 24px rgba(6,182,212,0.35)'; }}>
                View My Work
                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
              </Link>
              <Link to="/contact"
                style={{ padding: '0.75rem 1.75rem', borderRadius: '0.6rem', border: '1px solid rgba(255,255,255,0.1)', color: '#94A3B8', fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: '0.9rem', textDecoration: 'none', background: 'rgba(255,255,255,0.03)', backdropFilter: 'blur(4px)', transition: 'border-color 0.2s, color 0.2s' }}
                onMouseEnter={e => { const el = e.currentTarget; el.style.borderColor = 'rgba(6,182,212,0.4)'; el.style.color = '#06B6D4'; }}
                onMouseLeave={e => { const el = e.currentTarget; el.style.borderColor = 'rgba(255,255,255,0.1)'; el.style.color = '#94A3B8'; }}>
                Get in Touch
              </Link>
            </motion.div>

            <motion.div {...fadeUp(0.33)} style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              {[
                { href: 'https://github.com/Rijan77', label: 'GitHub', icon: <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" /></svg> },
                { href: 'https://www.linkedin.com/in/rijan-acharya/', label: 'LinkedIn', icon: <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg> },
                { href: 'mailto:rijanacharya73@gmail.com', label: 'Email', icon: <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg> },
              ].map(({ href, label, icon }) => (
                <a key={label} href={href} target={href.startsWith('mailto') ? undefined : '_blank'} rel="noopener noreferrer" aria-label={label}
                  style={{ color: '#64748B', transition: 'color 0.2s, transform 0.2s', display: 'flex' }}
                  onMouseEnter={e => { const el = e.currentTarget; el.style.color = '#06B6D4'; el.style.transform = 'translateY(-2px)'; }}
                  onMouseLeave={e => { const el = e.currentTarget; el.style.color = '#64748B'; el.style.transform = ''; }}>
                  {icon}
                </a>
              ))}
            </motion.div>
          </div>

          {/* Right — 3D + Photo */}
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '400px' }} className="hero-right">
            <div style={{ position: 'absolute', inset: '-60px', zIndex: 0, opacity: 0.9 }}>
              <Suspense fallback={null}><HeroScene /></Suspense>
            </div>
            <div style={{ position: 'relative', zIndex: 1 }}>
              <TiltPhoto />
            </div>
          </div>
        </div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 1.4 } }}
          style={{ position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.3rem' }}>
          <motion.div animate={{ y: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}>
            <svg width="20" height="20" fill="none" stroke="#1C2A3A" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>
          </motion.div>
        </motion.div>

        <style>{`
          @media (max-width: 860px) {
            .hero-main-grid { grid-template-columns: 1fr !important; }
            .hero-right { display: none !important; }
          }
        `}</style>
      </section>

      {/* ══ STATS ═════════════════════════════════════════════════════════ */}
      <section style={{ borderTop: '1px solid #1C2A3A', borderBottom: '1px solid #1C2A3A', background: '#0D1525', padding: '2.5rem 1.5rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1px' }}>
          {[
            { value: '1+',      label: 'Years Experience',   icon: '⚡' },
            { value: '4+',       label: 'Apps Shipped',        icon: '📱' },
            { value: 'Flutter', label: 'Primary Stack',       icon: '🚀' },
            { value: 'KTM',     label: 'Kathmandu, Nepal',    icon: '📍' },
          ].map(({ value, label, icon }, i) => (
            <motion.div key={label} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
              style={{ textAlign: 'center', padding: '1.5rem 1rem', borderRight: i < 3 ? '1px solid #1C2A3A' : 'none', position: 'relative' }}
              className={`stat-col-${i}`}>
              <div style={{ fontSize: '1.4rem', marginBottom: '0.5rem', lineHeight: 1 }}>{icon}</div>
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '1.8rem', color: '#06B6D4', lineHeight: 1, marginBottom: '0.3rem' }}>{value}</div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.76rem', color: '#64748B', fontWeight: 500 }}>{label}</div>
            </motion.div>
          ))}
        </div>
        <style>{`@media (max-width: 640px) { .stat-col-1, .stat-col-3 { border-right: none !important; } }`}</style>
      </section>

      {/* ══ WORK EXPERIENCE — Alternating Timeline ═══════════════════════ */}
      <section style={{ padding: 'clamp(4rem, 8vw, 6rem) 1.5rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <SectionHead sup="What I have done so far" title="Work Experience" />

          {/* Center line */}
          <div style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: '2px', transform: 'translateX(-50%)', background: 'linear-gradient(to bottom, #06B6D4, rgba(139,92,246,0.3), transparent)', zIndex: 0 }} className="center-line" />

            {experiences.map((exp, i) => {
              const isLeft = i % 2 === 0;
              return (
                <TimelineItem
                  key={i}
                  index={i}
                  dot={<LogoDot logoKey={exp.logoKey} glowColor={exp.current ? '#06B6D4' : '#334155'} fallback={exp.company[0]} />}
                  left={isLeft
                    ? <ExpCard role={exp.role} company={exp.company} bullets={exp.bullets} current={exp.current} />
                    : <DateLabel text={exp.period} align="right" />
                  }
                  right={isLeft
                    ? <DateLabel text={exp.period} align="left" />
                    : <ExpCard role={exp.role} company={exp.company} bullets={exp.bullets} current={exp.current} />
                  }
                />
              );
            })}
          </div>
        </div>

        <style>{`
          @media (max-width: 700px) {
            .center-line { display: none !important; }
            .timeline-row { grid-template-columns: 44px 1fr !important; gap: 1rem !important; }
          }
        `}</style>
      </section>

      {/* ══ SKILLS ════════════════════════════════════════════════════════ */}
      <section style={{ padding: '0 1.5rem clamp(4rem, 8vw, 6rem)', borderTop: '1px solid #1C2A3A' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', paddingTop: 'clamp(4rem, 8vw, 6rem)' }}>
          <SectionHead sup="Toolbox" title="Skills & Technologies" />
          <SkillsShowcase />
        </div>
      </section>

      {/* ══ EDUCATION — Alternating Timeline ════════════════════════════ */}
      <section style={{ padding: '0 1.5rem clamp(4rem, 8vw, 6rem)', borderTop: '1px solid #1C2A3A' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', paddingTop: 'clamp(4rem, 8vw, 6rem)' }}>
          <SectionHead sup="What I studied so far" title="Education Experience" accent="." />

          <div style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: '2px', transform: 'translateX(-50%)', background: 'linear-gradient(to bottom, #8B5CF6, rgba(6,182,212,0.3), transparent)', zIndex: 0 }} className="center-line" />

            {education.map((edu, i) => {
              const isLeft = i % 2 === 0;
              return (
                <TimelineItem
                  key={i}
                  index={i}
                  dot={<LogoDot logoKey={edu.logoKey} glowColor="#8B5CF6" fallback={edu.institution[0]} />}
                  left={isLeft
                    ? <EduCard degree={edu.degree} institution={edu.institution} period={edu.period} />
                    : <DateLabel text={edu.period} align="right" />
                  }
                  right={isLeft
                    ? <DateLabel text={edu.period} align="left" />
                    : <EduCard degree={edu.degree} institution={edu.institution} period={edu.period} />
                  }
                />
              );
            })}
          </div>

          {/* Certifications compact row */}
          <div style={{ marginTop: '3rem' }}>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#64748B', marginBottom: '1rem' }}>Certifications</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
              {certifications.map((cert, i) => (
                <motion.div key={i} initial={{ opacity: 0, scale: 0.92 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                  style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', background: 'rgba(139,92,246,0.06)', border: '1px solid rgba(139,92,246,0.18)', borderRadius: '0.75rem', padding: '0.6rem 1rem' }}>
                  <svg width="14" height="14" fill="none" stroke="#8B5CF6" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" /></svg>
                  <div>
                    <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: '0.82rem', color: '#F1F5F9', margin: 0 }}>{cert.name}</p>
                    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.7rem', color: '#64748B', margin: 0 }}>{cert.issuer} · {cert.year}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ FEATURED PROJECTS ═════════════════════════════════════════════ */}
      <section style={{ padding: '0 1.5rem clamp(4rem, 8vw, 6rem)', borderTop: '1px solid #1C2A3A' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', paddingTop: 'clamp(4rem, 8vw, 6rem)' }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '3rem' }}>
            <SectionHead sup="Portfolio" title="Featured Projects" />
            <Link to="/projects" style={{ color: '#94A3B8', fontFamily: "'DM Sans', sans-serif", fontSize: '0.84rem', fontWeight: 600, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.3rem', transition: 'color 0.2s', marginBottom: '3rem' }}
              onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = '#06B6D4')}
              onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = '#94A3B8')}>
              All projects <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
            </Link>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))', gap: '1.5rem' }}>
            {projects.map((p, i) => <ProjectCard key={p.slug} project={p} index={i} />)}
          </div>
        </div>
      </section>

      {/* ══ CTA ═══════════════════════════════════════════════════════════ */}
      <section style={{ padding: '0 1.5rem clamp(4rem, 8vw, 7rem)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="glass" style={{ position: 'relative', overflow: 'hidden', minHeight: '320px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {/* 3D background */}
            <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
              <Suspense fallback={null}><CTAScene /></Suspense>
            </div>
            {/* Dark overlay so text stays readable */}
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(6,10,20,0.72) 0%, rgba(10,6,30,0.72) 100%)', zIndex: 1 }} />
            {/* Text content */}
            <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', padding: 'clamp(2.5rem, 5vw, 4rem)' }}>
              <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', color: '#F1F5F9', margin: '0 0 1rem', letterSpacing: '-0.03em', textShadow: '0 2px 20px rgba(0,0,0,0.5)' }}>
                Let's build something great<span style={{ color: '#06B6D4' }}>.</span>
              </h2>
              <p style={{ fontFamily: "'DM Sans', sans-serif", color: '#94A3B8', fontSize: '1rem', maxWidth: '420px', margin: '0 auto 2rem', lineHeight: 1.7 }}>
                Open to new opportunities, collaborations, and interesting problems.
              </p>
              <Link to="/contact"
                style={{ padding: '0.8rem 2.2rem', borderRadius: '0.6rem', background: 'linear-gradient(135deg, #06B6D4, #0891B2)', color: '#060A14', fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: '0.92rem', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.4rem', boxShadow: '0 4px 24px rgba(6,182,212,0.4)', transition: 'transform 0.2s, box-shadow 0.2s' }}
                onMouseEnter={e => { const el = e.currentTarget; el.style.transform = 'translateY(-2px)'; el.style.boxShadow = '0 10px 32px rgba(6,182,212,0.5)'; }}
                onMouseLeave={e => { const el = e.currentTarget; el.style.transform = ''; el.style.boxShadow = '0 4px 24px rgba(6,182,212,0.4)'; }}>
                Get in Touch
                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </PageTransition>
  );
}
