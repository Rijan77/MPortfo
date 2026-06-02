import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  images: string[];
  title: string;
}

const SLIDE_DURATION = 3500;

const variants = {
  enter: (dir: number) => ({ x: dir > 0 ? '100%' : '-100%', opacity: 0 }),
  center: { x: 0, opacity: 1, transition: { duration: 0.42, ease: [0.25, 0.46, 0.45, 0.94] as [number,number,number,number] } },
  exit:  (dir: number) => ({ x: dir < 0 ? '100%' : '-100%', opacity: 0, transition: { duration: 0.32, ease: 'easeIn' as const } }),
};

export default function ImageCarousel({ images, title }: Props) {
  const [[idx, dir], setPage] = useState([0, 0]);
  const [paused, setPaused] = useState(false);

  const paginate = useCallback((newDir: number) => {
    setPage(([cur]) => {
      const next = (cur + newDir + images.length) % images.length;
      return [next, newDir];
    });
  }, [images.length]);

  useEffect(() => {
    if (paused || images.length <= 1) return;
    const id = setInterval(() => paginate(1), SLIDE_DURATION);
    return () => clearInterval(id);
  }, [paused, paginate, images.length]);

  if (!images.length) return null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>
      {/* Phone frame */}
      <div
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap', justifyContent: 'center' }}
      >
        {/* Prev button */}
        {images.length > 1 && (
          <button onClick={() => { setPaused(true); paginate(-1); }} aria-label="Previous"
            style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(13,21,37,0.9)', border: '1px solid #1C2A3A', color: '#94A3B8', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'border-color 0.2s, color 0.2s' }}
            onMouseEnter={e => { const el = e.currentTarget; el.style.borderColor = '#06B6D4'; el.style.color = '#06B6D4'; }}
            onMouseLeave={e => { const el = e.currentTarget; el.style.borderColor = '#1C2A3A'; el.style.color = '#94A3B8'; }}>
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" /></svg>
          </button>
        )}

        {/* Phone */}
        <div style={{ position: 'relative', width: '260px', flexShrink: 0 }}>
          {/* Glow behind phone */}
          <div style={{ position: 'absolute', inset: '-20px', borderRadius: '3rem', background: 'radial-gradient(ellipse, rgba(6,182,212,0.12) 0%, transparent 70%)', pointerEvents: 'none', zIndex: 0 }} />

          {/* Outer phone shell */}
          <div style={{
            position: 'relative', zIndex: 1,
            width: '260px', height: '520px',
            borderRadius: '2.5rem',
            background: 'linear-gradient(145deg, #1a2535 0%, #0d1525 100%)',
            border: '2px solid #2a3a50',
            boxShadow: '0 0 0 1px #0d1525, 0 24px 80px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.06)',
            overflow: 'hidden',
            padding: '12px 8px 14px',
          }}>
            {/* Notch */}
            <div style={{ position: 'absolute', top: '10px', left: '50%', transform: 'translateX(-50%)', width: '70px', height: '20px', background: '#0a0f1a', borderRadius: '9999px', zIndex: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#1C2A3A' }} />
              <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#1C2A3A' }} />
            </div>

            {/* Screen area with rounded clip */}
            <div style={{ width: '100%', height: '100%', borderRadius: '2rem', overflow: 'hidden', background: '#060A14', position: 'relative' }}>
              <AnimatePresence initial={false} custom={dir} mode="popLayout">
                <motion.img
                  key={idx}
                  custom={dir}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  src={images[idx]}
                  alt={`${title} screenshot ${idx + 1}`}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center', display: 'block', position: 'absolute', inset: 0 }}
                  draggable={false}
                />
              </AnimatePresence>
            </div>

            {/* Side buttons (decorative) */}
            <div style={{ position: 'absolute', right: '-3px', top: '100px', width: '3px', height: '32px', background: '#2a3a50', borderRadius: '2px 0 0 2px' }} />
            <div style={{ position: 'absolute', right: '-3px', top: '144px', width: '3px', height: '32px', background: '#2a3a50', borderRadius: '2px 0 0 2px' }} />
            <div style={{ position: 'absolute', left: '-3px', top: '120px', width: '3px', height: '48px', background: '#2a3a50', borderRadius: '0 2px 2px 0' }} />
          </div>
        </div>

        {/* Next button */}
        {images.length > 1 && (
          <button onClick={() => { setPaused(true); paginate(1); }} aria-label="Next"
            style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(13,21,37,0.9)', border: '1px solid #1C2A3A', color: '#94A3B8', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'border-color 0.2s, color 0.2s' }}
            onMouseEnter={e => { const el = e.currentTarget; el.style.borderColor = '#06B6D4'; el.style.color = '#06B6D4'; }}
            onMouseLeave={e => { const el = e.currentTarget; el.style.borderColor = '#1C2A3A'; el.style.color = '#94A3B8'; }}>
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
          </button>
        )}
      </div>

      {/* Dot indicators + counter */}
      {images.length > 1 && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setPage([i, i > idx ? 1 : -1])}
                aria-label={`Go to screenshot ${i + 1}`}
                style={{ width: i === idx ? '20px' : '8px', height: '8px', borderRadius: '9999px', background: i === idx ? '#06B6D4' : '#1C2A3A', border: 'none', cursor: 'pointer', padding: 0, transition: 'all 0.3s ease', flexShrink: 0 }}
              />
            ))}
          </div>
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.72rem', color: '#64748B' }}>
            {idx + 1} / {images.length}
          </span>
        </div>
      )}

      {/* Thumbnail strip */}
      {images.length > 1 && (
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          {images.map((src, i) => (
            <button
              key={i}
              onClick={() => setPage([i, i > idx ? 1 : -1])}
              style={{ padding: 0, border: `2px solid ${i === idx ? '#06B6D4' : 'transparent'}`, borderRadius: '0.5rem', overflow: 'hidden', cursor: 'pointer', background: 'none', transition: 'border-color 0.2s, transform 0.2s', transform: i === idx ? 'scale(1.05)' : 'scale(1)' }}
              aria-label={`View screenshot ${i + 1}`}
            >
              <img src={src} alt={`${title} thumbnail ${i + 1}`} style={{ width: '56px', height: '100px', objectFit: 'cover', objectPosition: 'top', display: 'block' }} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
