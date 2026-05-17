import React, { useState } from 'react';
import { useData } from '../context/DataContext.jsx';
import ScrollReveal from '../components/ScrollReveal.jsx';
import Modal from '../components/Modal.jsx';

/* About page — story + editable Experience timeline */
export default function About() {
  const { experience, addExperience, updateExperience, removeExperience } = useData();
  const [modal, setModal] = useState(null);

  const openAdd = () => setModal({ mode: 'add', data: { date: '', role: '', company: '', description: '' } });
  const openEdit = (e) => setModal({ mode: 'edit', data: { ...e } });

  const submit = (ev) => {
    ev.preventDefault();
    const f = ev.target;
    const payload = {
      date: f.date.value.trim(),
      role: f.role.value.trim(),
      company: f.company.value.trim(),
      description: f.description.value.trim()
    };
    if (!payload.role) return;
    if (modal.mode === 'add') addExperience(payload);
    else updateExperience(modal.data.id, payload);
    setModal(null);
  };

  return (
    <section className="page">
      <div className="container">
        <ScrollReveal>
          <span className="eyebrow">About</span>
          <h1 className="section-title">A developer with a story.</h1>
          <p className="section-subtitle">
            Hi, I'm <strong>Muhammad Ifran</strong> — founder of <strong>Hasmath's Agency</strong>.
            I'm a full-stack web developer passionate about turning ideas into
            interactive, scalable digital products. I love clean code, calm
            design, and shipping things that delight users.
          </p>
        </ScrollReveal>

        <div className="grid-2" style={{ alignItems: 'start', marginBottom: 80 }}>
          <ScrollReveal>
            <div className="card">
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', marginBottom: 12 }}>The mission</h3>
              <p style={{ color: 'var(--muted)' }}>
                Hasmath's Agency was founded with one belief: every business — big or
                small — deserves a website that feels alive, fast, and unmistakably
                theirs. We pair thoughtful design with engineering excellence to
                build products people actually enjoy using.
              </p>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <div className="card">
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', marginBottom: 12 }}>The approach</h3>
              <p style={{ color: 'var(--muted)' }}>
                Discover → design → develop → deliver. Every project starts with a
                conversation about your goals. We prototype quickly, iterate
                tightly, and ship code that's clean, tested, and built to last.
              </p>
            </div>
          </ScrollReveal>
        </div>

        {/* ---------- EXPERIENCE TIMELINE ---------- */}
        <ScrollReveal>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, marginBottom: 40 }}>
            <div>
              <span className="eyebrow">Journey</span>
              <h2 className="section-title">Experience</h2>
              <p className="section-subtitle" style={{ marginBottom: 0 }}>
                Editable timeline — add your own milestones.
              </p>
            </div>
            <button className="btn btn-primary" onClick={openAdd}>+ Add Experience</button>
          </div>
        </ScrollReveal>

        <div className="timeline">
          {experience.map((e, i) => (
            <ScrollReveal key={e.id} delay={i * 70}>
              <div className="timeline-item">
                <div className="timeline-date">{e.date}</div>
                <h4>{e.role}</h4>
                <div className="company">{e.company}</div>
                <p style={{ color: 'var(--muted)', fontSize: '.95rem' }}>{e.description}</p>
                <div className="timeline-actions">
                  <button className="btn btn-ghost btn-small" onClick={() => openEdit(e)}>Edit</button>
                  <button
                    className="btn btn-danger btn-small"
                    onClick={() => confirm(`Delete "${e.role}"?`) && removeExperience(e.id)}
                  >Delete</button>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {modal && (
        <Modal title={modal.mode === 'add' ? 'Add experience' : 'Edit experience'} onClose={() => setModal(null)}>
          <form className="form" onSubmit={submit}>
            <div className="form-row">
              <div className="form-group">
                <label>Date / Period</label>
                <input name="date" defaultValue={modal.data.date} placeholder="2024 — Present" />
              </div>
              <div className="form-group">
                <label>Role *</label>
                <input name="role" defaultValue={modal.data.role} required placeholder="Full-stack Developer" />
              </div>
            </div>
            <div className="form-group">
              <label>Company</label>
              <input name="company" defaultValue={modal.data.company} placeholder="Hasmath's Agency" />
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea name="description" defaultValue={modal.data.description} placeholder="What you did, achievements..." />
            </div>
            <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
              <button type="button" className="btn btn-ghost" onClick={() => setModal(null)}>Cancel</button>
              <button type="submit" className="btn btn-primary">
                {modal.mode === 'add' ? 'Add' : 'Save'}
              </button>
            </div>
          </form>
        </Modal>
      )}
    </section>
  );
}