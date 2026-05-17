import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../context/DataContext.jsx';
import ScrollReveal from '../components/ScrollReveal.jsx';
import Modal from '../components/Modal.jsx';

/* Home page — hero + featured projects (with Add Project) */
export default function Home() {
  const { projects, addProject, updateProject, removeProject } = useData();
  const [modal, setModal] = useState(null); // { mode: 'add'|'edit', data?: project }

  const openAdd = () => setModal({ mode: 'add', data: { title: '', description: '', tags: '', link: '', accent: '#6366F1' } });
  const openEdit = (p) => setModal({ mode: 'edit', data: { ...p, tags: p.tags.join(', ') } });

  const submit = (e) => {
    e.preventDefault();
    const f = e.target;
    const payload = {
      title: f.title.value.trim(),
      description: f.description.value.trim(),
      tags: f.tags.value.split(',').map(t => t.trim()).filter(Boolean),
      link: f.link.value.trim() || '#',
      accent: f.accent.value
    };
    if (!payload.title) return;
    if (modal.mode === 'add') addProject(payload);
    else updateProject(modal.data.id, payload);
    setModal(null);
  };

  return (
    <>
      {/* ---------- HERO ---------- */}
      <section className="hero">
        <div className="container">
          <ScrollReveal>
            <div className="hero-content">
              <span className="eyebrow">Hasmath's Agency</span>
              <h1>
                Hi, I'm <span className="gradient">Muhammad Ifran</span><br />
                I build modern websites.
              </h1>
              <p>
                Full-stack developer crafting fast, elegant, and responsive web
                experiences. From idea to launch — design, code, ship.
              </p>
              <div className="hero-cta">
                <Link to="/contact" className="btn btn-primary">Start a project →</Link>
                <Link to="/services" className="btn btn-ghost">Explore services</Link>
              </div>

              <div className="hero-stats">
                <div>
                  <div className="stat-num">20+</div>
                  <div className="stat-label">Projects delivered</div>
                </div>
                <div>
                  <div className="stat-num">3+</div>
                  <div className="stat-label">Years experience</div>
                </div>
                <div>
                  <div className="stat-num">100%</div>
                  <div className="stat-label">Client satisfaction</div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ---------- PROJECTS ---------- */}
      <section className="page" style={{ paddingTop: 40 }}>
        <div className="container">
          <ScrollReveal>
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, marginBottom: 40 }}>
              <div>
                <span className="eyebrow">Portfolio</span>
                <h2 className="section-title">Selected projects</h2>
                <p className="section-subtitle" style={{ marginBottom: 0 }}>
                  A curated showcase of work — fully editable. Add your own.
                </p>
              </div>
              <button className="btn btn-primary" onClick={openAdd}>+ Add Project</button>
            </div>
          </ScrollReveal>

          <div className="grid-3">
            {projects.map((p, i) => (
              <ScrollReveal key={p.id} delay={i * 80}>
                <div className="card project-card">
                  <div className="project-img" style={{ background: `linear-gradient(135deg, ${p.accent || '#6366F1'} 0%, #06B6D4 100%)` }}>
                    {p.title.split(' ').map(w => w[0]).slice(0, 2).join('')}
                  </div>
                  <div className="project-body">
                    <h3>{p.title}</h3>
                    <p>{p.description}</p>
                    <div className="project-tags">
                      {p.tags.map(t => <span key={t} className="project-tag">{t}</span>)}
                    </div>
                  </div>
                  <div className="project-actions">
                    <a href={p.link} target="_blank" rel="noreferrer" className="btn btn-ghost btn-small">View →</a>
                    <button className="btn btn-ghost btn-small" onClick={() => openEdit(p)}>Edit</button>
                    <button
                      className="btn btn-danger btn-small"
                      onClick={() => confirm(`Delete "${p.title}"?`) && removeProject(p.id)}
                    >Delete</button>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {projects.length === 0 && (
            <p style={{ textAlign: 'center', color: 'var(--muted)', padding: '60px 0' }}>
              No projects yet. Click <strong>+ Add Project</strong> to create one.
            </p>
          )}
        </div>
      </section>

      {/* ---------- MODAL ---------- */}
      {modal && (
        <Modal title={modal.mode === 'add' ? 'Add new project' : 'Edit project'} onClose={() => setModal(null)}>
          <form className="form" onSubmit={submit}>
            <div className="form-group">
              <label>Title *</label>
              <input name="title" defaultValue={modal.data.title} required placeholder="My amazing project" />
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea name="description" defaultValue={modal.data.description} placeholder="What this project does..." />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Tags (comma-separated)</label>
                <input name="tags" defaultValue={modal.data.tags} placeholder="React, Node.js, MongoDB" />
              </div>
              <div className="form-group">
                <label>Accent color</label>
                <input name="accent" type="color" defaultValue={modal.data.accent || '#6366F1'} />
              </div>
            </div>
            <div className="form-group">
              <label>Link (URL)</label>
              <input name="link" defaultValue={modal.data.link} placeholder="https://..." />
            </div>
            <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', marginTop: 6 }}>
              <button type="button" className="btn btn-ghost" onClick={() => setModal(null)}>Cancel</button>
              <button type="submit" className="btn btn-primary">
                {modal.mode === 'add' ? 'Add Project' : 'Save changes'}
              </button>
            </div>
          </form>
        </Modal>
      )}
    </>
  );
}