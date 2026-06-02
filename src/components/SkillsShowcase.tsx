import { motion } from 'framer-motion';
import {
  SiFlutter, SiDart, SiFirebase, SiSupabase, SiPython, SiFastapi,
} from 'react-icons/si';
import type { IconType } from 'react-icons';
import { primarySkills, skillCategories } from '../data/skills';

const ICONS: Record<string, IconType> = {
  flutter:  SiFlutter,
  dart:     SiDart,
  firebase: SiFirebase,
  supabase: SiSupabase,
  python:   SiPython,
  fastapi:  SiFastapi,
};

function PrimaryCard({ skill, index }: { skill: typeof primarySkills[0]; index: number }) {
  const Icon = ICONS[skill.iconKey];
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.45, ease: 'easeOut' as const }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      style={{
        background: skill.bg,
        border: `1px solid ${skill.color}25`,
        borderRadius: '1.25rem',
        padding: '1.5rem',
        cursor: 'default',
        position: 'relative',
        overflow: 'hidden',
        backdropFilter: 'blur(8px)',
        transition: 'border-color 0.25s, box-shadow 0.25s',
      }}
      onMouseEnter={e => { const el = e.currentTarget; el.style.borderColor = `${skill.color}55`; el.style.boxShadow = `0 12px 40px ${skill.color}18`; }}
      onMouseLeave={e => { const el = e.currentTarget; el.style.borderColor = `${skill.color}25`; el.style.boxShadow = 'none'; }}
    >
      {/* Corner glow */}
      <div style={{ position: 'absolute', top: '-30px', right: '-30px', width: '100px', height: '100px', borderRadius: '50%', background: `radial-gradient(circle, ${skill.color}18 0%, transparent 70%)`, pointerEvents: 'none' }} />

      {/* Icon */}
      <div style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ width: '48px', height: '48px', borderRadius: '0.75rem', background: `${skill.color}18`, border: `1px solid ${skill.color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {Icon && <Icon size={26} color={skill.color} />}
        </div>
        {/* Level badge */}
        <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '0.8rem', color: skill.color, background: `${skill.color}15`, border: `1px solid ${skill.color}30`, borderRadius: '9999px', padding: '0.2rem 0.6rem' }}>
          {skill.level}%
        </span>
      </div>

      {/* Name */}
      <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '1.05rem', color: '#F1F5F9', margin: '0 0 0.3rem', letterSpacing: '-0.01em' }}>{skill.name}</h3>
      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.78rem', color: '#64748B', margin: '0 0 1rem', lineHeight: 1.5 }}>{skill.desc}</p>

      {/* Progress bar */}
      <div style={{ height: '4px', background: 'rgba(255,255,255,0.06)', borderRadius: '9999px', overflow: 'hidden' }}>
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: index * 0.08 + 0.3, ease: 'easeOut' as const }}
          style={{ height: '100%', borderRadius: '9999px', background: `linear-gradient(90deg, ${skill.color}90, ${skill.color})` }}
        />
      </div>
    </motion.div>
  );
}

export default function SkillsShowcase() {
  return (
    <div>
      {/* Primary stack grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2.5rem' }}>
        {primarySkills.map((s, i) => <PrimaryCard key={s.name} skill={s} index={i} />)}
      </div>

      {/* Supporting categories */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
        {skillCategories.map((cat, i) => (
          <motion.div
            key={cat.label}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.4 }}
            className="glass"
            style={{ padding: '1.25rem' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <span style={{ fontFamily: 'monospace', fontSize: '0.9rem', color: '#06B6D4' }}>{cat.icon}</span>
              <h4 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '0.86rem', color: '#F1F5F9', margin: 0 }}>{cat.label}</h4>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
              {cat.skills.map(s => (
                <motion.span
                  key={s}
                  whileHover={{ scale: 1.05, y: -1 }}
                  style={{ padding: '0.22rem 0.65rem', borderRadius: '9999px', background: 'rgba(6,182,212,0.06)', border: '1px solid rgba(6,182,212,0.15)', color: '#94A3B8', fontFamily: "'DM Sans', sans-serif", fontSize: '0.74rem', fontWeight: 500, cursor: 'default', display: 'inline-block' }}
                >
                  {s}
                </motion.span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
