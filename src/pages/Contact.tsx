import { useState, lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { QRCodeSVG } from 'qrcode.react';
import PageTransition from '../components/PageTransition';
import { submitMessage } from '../lib/supabase';

const ContactScene = lazy(() => import('../components/ContactScene'));

type FormState = 'idle' | 'loading' | 'success' | 'error';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<FormState>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const supabaseConfigured = !!(import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY);

  const handleSubmit = async (e: { preventDefault(): void }) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');

    if (!supabaseConfigured) {
      window.location.href = `mailto:rijanacharya73@gmail.com?subject=Message from ${encodeURIComponent(form.name)}&body=${encodeURIComponent(form.message)}`;
      setStatus('idle');
      return;
    }

    const { error } = await submitMessage(form);
    if (error) {
      setStatus('error');
      setErrorMsg(error);
    } else {
      setStatus('success');
      setForm({ name: '', email: '', message: '' });
    }
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '0.75rem 1rem',
    background: '#162032',
    border: '1px solid #1E293B',
    borderRadius: '0.6rem',
    color: '#F1F5F9',
    fontFamily: "'DM Sans', sans-serif",
    fontSize: '0.92rem',
    outline: 'none',
    transition: 'border-color 0.2s',
    boxSizing: 'border-box',
  };

  return (
    <PageTransition>
      <Helmet>
        <title>Contact — Rijan Acharya</title>
        <meta name="description" content="Get in touch with Rijan Acharya — Flutter Developer based in Kathmandu, Nepal." />
        <meta property="og:title" content="Contact — Rijan Acharya" />
      </Helmet>

      {/* ── 3D Hero banner ─────────────────────────────────────────────── */}
      <section style={{ position: 'relative', overflow: 'hidden', background: 'linear-gradient(180deg, #060A14 0%, #0a0f1e 100%)', borderBottom: '1px solid #1C2A3A' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: 'clamp(4rem, 8vw, 6rem) 1.5rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'center' }} className="contact-hero-grid">
          {/* Text */}
          <motion.div initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0, transition: { duration: 0.55 } }}>
            <p style={{ color: '#06B6D4', fontFamily: "'DM Sans', sans-serif", fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>Let's connect</p>
            <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', color: '#F1F5F9', margin: '0 0 1.25rem', lineHeight: 1.05, letterSpacing: '-0.03em' }}>
              Get in Touch<span style={{ color: '#8B5CF6' }}>.</span>
            </h1>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 'clamp(0.95rem, 2vw, 1.05rem)', color: '#94A3B8', lineHeight: 1.8, margin: '0 0 2rem', maxWidth: '420px' }}>
              Open to opportunities, collaborations, and interesting problems. My inbox is always open.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
              <a href="mailto:rijanacharya73@gmail.com" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.65rem 1.25rem', background: 'rgba(6,182,212,0.08)', border: '1px solid rgba(6,182,212,0.25)', borderRadius: '0.6rem', textDecoration: 'none', color: '#06B6D4', fontFamily: "'DM Sans', sans-serif", fontSize: '0.85rem', fontWeight: 600, transition: 'background 0.2s' }}
                onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = 'rgba(6,182,212,0.15)')}
                onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = 'rgba(6,182,212,0.08)')}>
                <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg>
                rijanacharya73@gmail.com
              </a>
            </div>
          </motion.div>

          {/* 3D Sphere */}
          <motion.div initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1, transition: { duration: 0.7, delay: 0.1 } }} style={{ height: '380px', position: 'relative' }} className="contact-3d">
            <Suspense fallback={null}><ContactScene /></Suspense>
          </motion.div>
        </div>
        <style>{`
          @media (max-width: 768px) {
            .contact-hero-grid { grid-template-columns: 1fr !important; }
            .contact-3d { height: 240px !important; }
          }
          @media (max-width: 540px) {
            .contact-3d { display: none !important; }
          }
        `}</style>
      </section>

      <section style={{ padding: 'clamp(3rem, 6vw, 5rem) 1.5rem', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 0, right: 0, width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(139,92,246,0.06) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

          {/* (no separate header — it's in the banner above) */}
          <div style={{ marginBottom: '3rem' }} />

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'start' }} className="contact-grid">

            {/* Left — QR codes + contact info */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              {/* Contact info */}
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0, transition: { delay: 0.08 } }}>
                <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '1rem', color: '#F1F5F9', margin: '0 0 1.25rem' }}>Direct Contact</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {[
                    {
                      icon: <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg>,
                      label: 'Email',
                      value: 'rijanacharya73@gmail.com',
                      href: 'mailto:rijanacharya73@gmail.com',
                    },
                    {
                      icon: <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" /></svg>,
                      label: 'Phone',
                      value: '+977 9840870441',
                      href: 'tel:+9779840870441',
                    },
                  ].map(({ icon, label, value, href }) => (
                    <a key={label} href={href} style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.875rem',
                      padding: '0.875rem 1.25rem',
                      background: '#0F1524',
                      border: '1px solid #1E293B',
                      borderRadius: '0.75rem',
                      textDecoration: 'none',
                      transition: 'border-color 0.2s',
                    }}
                      onMouseEnter={e => ((e.currentTarget as HTMLElement).style.borderColor = 'rgba(6,182,212,0.3)')}
                      onMouseLeave={e => ((e.currentTarget as HTMLElement).style.borderColor = '#1E293B')}
                    >
                      <div style={{ color: '#06B6D4', flexShrink: 0 }}>{icon}</div>
                      <div>
                        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.72rem', color: '#64748B', margin: '0 0 0.1rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{label}</p>
                        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.88rem', color: '#94A3B8', margin: 0, fontWeight: 500 }}>{value}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </motion.div>

              {/* QR codes */}
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0, transition: { delay: 0.14 } }}>
                <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '1rem', color: '#F1F5F9', margin: '0 0 1.25rem' }}>Scan to Connect</h2>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  {[
                    { url: 'https://www.linkedin.com/in/rijan-acharya/', label: 'LinkedIn', color: '#0A66C2' },
                    { url: 'https://github.com/Rijan77', label: 'GitHub', color: '#06B6D4' },
                  ].map(({ url, label, color }) => (
                    <a key={label} href={url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                      <div style={{
                        background: '#0F1524',
                        border: '1px solid #1E293B',
                        borderRadius: '1rem',
                        padding: '1.25rem',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '0.75rem',
                        transition: 'border-color 0.2s, transform 0.2s',
                        cursor: 'pointer',
                      }}
                        onMouseEnter={e => { const el = e.currentTarget; el.style.borderColor = `${color}50`; el.style.transform = 'translateY(-2px)'; }}
                        onMouseLeave={e => { const el = e.currentTarget; el.style.borderColor = '#1E293B'; el.style.transform = ''; }}
                      >
                        <div style={{ background: '#fff', padding: '0.6rem', borderRadius: '0.5rem', lineHeight: 0 }}>
                          <QRCodeSVG
                            value={url}
                            size={100}
                            bgColor="#ffffff"
                            fgColor="#0a0e1a"
                            level="M"
                          />
                        </div>
                        <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: '0.82rem', color: '#94A3B8' }}>{label}</span>
                      </div>
                    </a>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Right — Contact form */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0, transition: { delay: 0.1 } }}>
              <div style={{ background: '#0F1524', border: '1px solid #1E293B', borderRadius: '1.25rem', padding: '2rem' }}>
                <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '1rem', color: '#F1F5F9', margin: '0 0 0.5rem' }}>Send a Message</h2>
                {!supabaseConfigured && (
                  <div style={{ background: 'rgba(6,182,212,0.06)', border: '1px solid rgba(6,182,212,0.2)', borderRadius: '0.5rem', padding: '0.6rem 0.9rem', marginBottom: '1.25rem' }}>
                    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.77rem', color: '#94A3B8', margin: 0, lineHeight: 1.6 }}>
                      Supabase not configured — submitting will open your email client. Add <code style={{ background: '#162032', padding: '1px 5px', borderRadius: '3px', color: '#06B6D4' }}>VITE_SUPABASE_URL</code> and <code style={{ background: '#162032', padding: '1px 5px', borderRadius: '3px', color: '#06B6D4' }}>VITE_SUPABASE_ANON_KEY</code> to enable direct submission.
                    </p>
                  </div>
                )}

                {status === 'success' ? (
                  <div style={{ textAlign: 'center', padding: '2.5rem 1rem' }}>
                    <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>✓</div>
                    <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '1.1rem', color: '#06B6D4', margin: '0 0 0.5rem' }}>Message sent!</h3>
                    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.9rem', color: '#94A3B8', margin: '0 0 1.5rem' }}>Thanks for reaching out. I'll get back to you soon.</p>
                    <button onClick={() => setStatus('idle')} style={{ padding: '0.5rem 1.25rem', borderRadius: '0.5rem', background: 'transparent', border: '1px solid #1E293B', color: '#94A3B8', fontFamily: "'DM Sans', sans-serif", fontSize: '0.85rem', cursor: 'pointer' }}>
                      Send another
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1.25rem' }}>
                    <div>
                      <label style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.78rem', color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '0.4rem' }}>Name</label>
                      <input
                        type="text"
                        required
                        placeholder="Your name"
                        value={form.name}
                        onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                        style={inputStyle}
                        onFocus={e => (e.target.style.borderColor = 'rgba(6,182,212,0.5)')}
                        onBlur={e => (e.target.style.borderColor = '#1E293B')}
                      />
                    </div>
                    <div>
                      <label style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.78rem', color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '0.4rem' }}>Email</label>
                      <input
                        type="email"
                        required
                        placeholder="your@email.com"
                        value={form.email}
                        onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                        style={inputStyle}
                        onFocus={e => (e.target.style.borderColor = 'rgba(6,182,212,0.5)')}
                        onBlur={e => (e.target.style.borderColor = '#1E293B')}
                      />
                    </div>
                    <div>
                      <label style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.78rem', color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '0.4rem' }}>Message</label>
                      <textarea
                        required
                        rows={5}
                        placeholder="What's on your mind?"
                        value={form.message}
                        onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                        style={{ ...inputStyle, resize: 'vertical', minHeight: '130px' }}
                        onFocus={e => (e.target.style.borderColor = 'rgba(6,182,212,0.5)')}
                        onBlur={e => (e.target.style.borderColor = '#1E293B')}
                      />
                    </div>

                    {status === 'error' && (
                      <div style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.25)', borderRadius: '0.5rem', padding: '0.6rem 0.9rem' }}>
                        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.82rem', color: '#FCA5A5', margin: 0 }}>Something went wrong: {errorMsg}</p>
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={status === 'loading'}
                      style={{
                        padding: '0.8rem',
                        borderRadius: '0.6rem',
                        background: status === 'loading' ? 'rgba(6,182,212,0.5)' : 'linear-gradient(135deg, #06B6D4, #0891B2)',
                        border: 'none',
                        color: '#080C16',
                        fontFamily: "'DM Sans', sans-serif",
                        fontWeight: 700,
                        fontSize: '0.92rem',
                        cursor: status === 'loading' ? 'not-allowed' : 'pointer',
                        transition: 'opacity 0.2s, transform 0.2s',
                        boxShadow: '0 4px 16px rgba(6,182,212,0.25)',
                      }}
                      onMouseEnter={e => { if (status !== 'loading') (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)'; }}
                      onMouseLeave={e => ((e.currentTarget as HTMLElement).style.transform = '')}
                    >
                      {status === 'loading' ? 'Sending…' : supabaseConfigured ? 'Send Message' : 'Open Email Client'}
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </div>

        <style>{`
          @media (max-width: 768px) {
            .contact-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </section>
    </PageTransition>
  );
}

