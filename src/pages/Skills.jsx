import React from 'react';
import ScrollReveal from '../components/ScrollReveal.jsx';

/* ⭐ EDITABLE — skill levels & tech stacks */
const SKILLS = [
  {
    category: 'Frontend',
    icon: '🎨',
    items: [
      { name: 'HTML / CSS', level: 95 },
      { name: 'JavaScript (ES6+)', level: 92 },
      { name: 'React.js', level: 90 },
      { name: 'Next.js', level: 80 },
      { name: 'Tailwind / SCSS', level: 88 }
    ]
  },
  {
    category: 'Backend',
    icon: '⚙️',
    items: [
      { name: 'Node.js / Express', level: 85 },
      { name: 'REST APIs', level: 88 },
      { name: 'MongoDB', level: 82 },
      { name: 'PostgreSQL', level: 75 },
      { name: 'Authentication / JWT', level: 80 }
    ]
  },
  {
    category: 'Tools & DevOps',
    icon: '🛠️',
    items: [
      { name: 'Git / GitHub', level: 92 },
      { name: 'Docker', level: 70 },
      { name: 'Vercel / Netlify', level: 90 },
      { name: 'Figma', level: 78 },
      { name: 'Linux CLI', level: 82 }
    ]
  }
];

const STACK = [
  'React', 'Next.js', 'TypeScript', 'Node.js', 'Express', 'MongoDB',
  'PostgreSQL', 'Tailwind CSS', 'Redux', 'Vite', 'GraphQL', 'Docker',
  'Git', 'Figma', 'Three.js', 'Framer Motion'
];

export default function Skills() {
  return (
    <section className="page">
      <div className="container">
        <ScrollReveal>
          <span className="eyebrow">Skills</span>
          <h1 className="section-title">Full-stack developer toolkit</h1>
          <p className="section-subtitle">
            Below is a snapshot of the technologies I use every day to design,
            build, and ship modern web products. Comfortable across the entire
            stack — from pixel-perfect UI to scalable backend.
          </p>
        </ScrollReveal>

        <div className="grid-3">
          {SKILLS.map((cat, i) => (
            <ScrollReveal key={cat.category} delay={i * 80}>
              <div className="card">
                <div className="service-icon">{cat.icon}</div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', marginBottom: 18 }}>
                  {cat.category}
                </h3>
                <div style={{ display: 'grid', gap: 14 }}>
                  {cat.items.map((s, idx) => (
                    <SkillRow key={s.name} skill={s} delay={i * 80 + idx * 50} />
                  ))}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* ---------- Tech chip cloud ---------- */}
        <ScrollReveal>
          <div style={{ marginTop: 80 }}>
            <h2 className="section-title" style={{ fontSize: 'clamp(1.6rem, 4vw, 2.4rem)' }}>
              Tech stack
            </h2>
            <p className="section-subtitle">Day-to-day tools in my workflow.</p>
            <div className="skill-stack">
              {STACK.map(t => <span key={t} className="tech-chip">{t}</span>)}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

function SkillRow({ skill, delay }) {
  return (
    <div className="skill-card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <h4 style={{ fontSize: '.95rem' }}>{skill.name}</h4>
        <span className="pct">{skill.level}%</span>
      </div>
      <div className="skill-bar">
        <div
          className="skill-fill"
          style={{ width: `${skill.level}%`, transitionDelay: `${delay}ms` }}
        />
      </div>
    </div>
  );
}