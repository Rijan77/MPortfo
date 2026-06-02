import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import PageTransition from '../components/PageTransition';
import { skillCategories } from '../data/skills';
import { experiences, education, certifications } from '../data/experience';
import profileImg   from '../assets/profile.png';
import mediishaLogo from '../assets/mediisha.png';
import diyaloLogo   from '../assets/diyalo.jpg';
import pcpsLogo     from '../assets/pcps.png';
import advanceLogo  from '../assets/advance.jpg';

const LOGOS: Record<string, string> = {
  mediisha: mediishaLogo,
  diyalo:   diyaloLogo,
  pcps:     pcpsLogo,
  advance:  advanceLogo,
};

const sectionHead = (label: string, title: string) => (
  <div style={{ marginBottom: '2.5rem' }}>
    <p style={{ color: '#06B6D4', fontFamily: "'DM Sans', sans-serif", fontSize: '0.76rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', margin: '0 0 0.5rem' }}>{label}</p>
    <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)', color: '#F1F5F9', margin: 0, letterSpacing: '-0.02em' }}>{title}</h2>
  </div>
);

export default function About() {
  return (
    <PageTransition>
      <Helmet>
        <title>About — Rijan Acharya</title>
        <meta name="description" content="Flutter Developer from Kathmandu. My experience, skills, education, and the story behind the work." />
        <meta property="og:title" content="About — Rijan Acharya" />
      </Helmet>

      {/* Hero */}
      <section style={{ padding: 'clamp(3rem, 8vw, 6rem) 1.5rem 0', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 0, right: 0, width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(139,92,246,0.07) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '3rem', alignItems: 'start' }} className="about-grid">
            <div>
              <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0, transition: { delay: 0.05 } }} style={{ color: '#06B6D4', fontFamily: "'DM Sans', sans-serif", fontSize: '0.78rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>About Me</motion.p>
              <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0, transition: { delay: 0.1 } }} style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: 'clamp(2rem, 5vw, 3.2rem)', color: '#F1F5F9', margin: '0 0 1.5rem', lineHeight: 1.1, letterSpacing: '-0.02em' }}>
                Flutter developer<br /><span className="gradient-text">solving real problems</span>
              </motion.h1>
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0, transition: { delay: 0.15 } }} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '580px' }}>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '1.02rem', color: '#94A3B8', lineHeight: 1.8, margin: 0 }}>
                  Flutter developer specializing in cross-platform mobile apps for healthcare. At Mediisha, I maintain and enhance a Flutter app that scans barcodes and captures photos of required patient documents (doctor prescriptions and other records) for the hospital's insurance (BIMA) submission workflow, and I support Laboratory Information System (LIS) integration for the lab.
                </p>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '1.02rem', color: '#94A3B8', lineHeight: 1.8, margin: 0 }}>
                  Proficient with Firebase, REST APIs, and Cubit state management within Clean Architecture, with a focus on scalable, reliable, and user-friendly solutions.
                </p>
              </motion.div>
            </div>

            {/* Photo */}
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1, transition: { delay: 0.12 } }} className="about-photo" style={{ flexShrink: 0 }}>
              <div style={{ position: 'relative', width: '200px', height: '200px', borderRadius: '1rem', overflow: 'hidden', border: '2px solid rgba(6,182,212,0.25)', boxShadow: '0 8px 40px rgba(6,182,212,0.15)' }}>
                <img
                  src={profileImg}
                  alt="Rijan Acharya"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  onError={e => {
                    const img = e.target as HTMLImageElement;
                    img.style.display = 'none';
                    const parent = img.parentElement!;
                    parent.style.background = 'linear-gradient(135deg, #162032, #0F1524)';
                    parent.innerHTML = `<div style="display:flex;align-items:center;justify-content:center;width:100%;height:100%;font-size:3.5rem;font-family:Syne,sans-serif;color:#64748B;">RA</div>`;
                  }}
                />
              </div>
            </motion.div>
          </div>
        </div>

        <style>{`
          @media (max-width: 768px) {
            .about-grid { grid-template-columns: 1fr !important; }
            .about-photo { display: none !important; }
          }
        `}</style>
      </section>

      {/* Skills */}
      <section style={{ padding: 'clamp(3rem, 6vw, 5rem) 1.5rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          {sectionHead('Toolbox', 'Skills & Technologies')}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}>
            {skillCategories.map((cat, i) => (
              <motion.div
                key={cat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07, duration: 0.4 }}
                style={{ background: '#0F1524', border: '1px solid #1E293B', borderRadius: '1rem', padding: '1.5rem' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
                  <span style={{ fontFamily: 'monospace', fontSize: '1rem', color: '#06B6D4' }}>{cat.icon}</span>
                  <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '0.95rem', color: '#F1F5F9', margin: 0 }}>{cat.label}</h3>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>
                  {cat.skills.map(skill => (
                    <span key={skill} style={{
                      padding: '0.25rem 0.7rem',
                      borderRadius: '9999px',
                      background: 'rgba(6,182,212,0.06)',
                      border: '1px solid rgba(6,182,212,0.15)',
                      color: '#94A3B8',
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: '0.78rem',
                      fontWeight: 500,
                    }}>
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience */}
      <section style={{ padding: '0 1.5rem clamp(3rem, 6vw, 5rem)', borderTop: '1px solid #1E293B' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', paddingTop: 'clamp(3rem, 6vw, 5rem)' }}>
          {sectionHead('Career', 'Experience')}
          <div style={{ position: 'relative', paddingLeft: '1.5rem' }}>
            {/* Timeline line */}
            <div style={{ position: 'absolute', left: 0, top: '0.75rem', bottom: 0, width: '2px', background: 'linear-gradient(to bottom, #06B6D4, rgba(139,92,246,0.3), transparent)' }} />

            <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
              {experiences.map((exp, i) => (
                <motion.div
                  key={`${exp.company}-${i}`}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.45 }}
                  style={{ position: 'relative' }}
                >
                  {/* Logo dot */}
                  <div style={{
                    position: 'absolute',
                    left: '-2.25rem',
                    top: '0',
                    width: '44px',
                    height: '44px',
                    borderRadius: '50%',
                    background: '#fff',
                    border: `2px solid ${exp.current ? '#06B6D4' : '#334155'}`,
                    boxShadow: exp.current ? '0 0 14px rgba(6,182,212,0.5)' : '0 2px 8px rgba(0,0,0,0.4)',
                    overflow: 'hidden',
                    padding: '3px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    {LOGOS[exp.logoKey]
                      ? <img src={LOGOS[exp.logoKey]} alt={exp.company} style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: '50%' }} />
                      : <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: '0.9rem', color: '#060A14' }}>{exp.company[0]}</span>
                    }
                  </div>

                  <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.5rem', marginBottom: '0.75rem' }}>
                    <div>
                      <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '1.1rem', color: '#F1F5F9', margin: '0 0 0.15rem' }}>{exp.role}</h3>
                      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.9rem', color: '#06B6D4', margin: 0, fontWeight: 600 }}>{exp.company}</p>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.25rem' }}>
                      <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.78rem', color: '#64748B', background: '#162032', border: '1px solid #1E293B', borderRadius: '0.4rem', padding: '0.2rem 0.6rem' }}>{exp.period}</span>
                      {exp.current && <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.7rem', color: '#06B6D4', fontWeight: 600 }}>● Current</span>}
                    </div>
                  </div>
                  <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {exp.bullets.map((b, j) => (
                      <li key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                        <span style={{ color: '#06B6D4', fontSize: '0.7rem', marginTop: '0.32rem', flexShrink: 0, lineHeight: 1 }}>▸</span>
                        <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.88rem', color: '#94A3B8', lineHeight: 1.7 }}>{b}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Education & Certifications */}
      <section style={{ padding: '0 1.5rem clamp(4rem, 8vw, 7rem)', borderTop: '1px solid #1E293B' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', paddingTop: 'clamp(3rem, 6vw, 5rem)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '3rem' }}>
          {/* Education */}
          <div>
            {sectionHead('Background', 'Education')}
            {education.map((edu, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                style={{ background: '#0F1524', border: '1px solid #1E293B', borderRadius: '1rem', padding: '1.5rem' }}
              >
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '0.75rem', background: '#fff', border: '1px solid rgba(139,92,246,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, overflow: 'hidden', padding: '3px', boxShadow: '0 0 12px rgba(139,92,246,0.25)' }}>
                    {LOGOS[edu.logoKey]
                      ? <img src={LOGOS[edu.logoKey]} alt={edu.institution} style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: '0.5rem' }} />
                      : <svg width="20" height="20" fill="none" stroke="#8B5CF6" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" /></svg>
                    }
                  </div>
                  <div>
                    <h4 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '0.95rem', color: '#F1F5F9', margin: '0 0 0.25rem', lineHeight: 1.4 }}>{edu.degree}</h4>
                    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.85rem', color: '#06B6D4', margin: '0 0 0.2rem', fontWeight: 600 }}>{edu.institution}</p>
                    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.78rem', color: '#64748B', margin: 0 }}>{edu.period}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Certifications */}
          <div>
            {sectionHead('Learning', 'Certifications')}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {certifications.map((cert, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: '#0F1524', border: '1px solid #1E293B', borderRadius: '0.75rem', padding: '1rem 1.25rem' }}
                >
                  <div style={{ width: '36px', height: '36px', borderRadius: '0.5rem', background: 'rgba(139,92,246,0.1)', border: '1px solid rgba(139,92,246,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <svg width="16" height="16" fill="none" stroke="#8B5CF6" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" /></svg>
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: '0.88rem', color: '#F1F5F9', margin: 0 }}>{cert.name}</p>
                    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.76rem', color: '#64748B', margin: '0.1rem 0 0' }}>{cert.issuer} · {cert.year}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}

