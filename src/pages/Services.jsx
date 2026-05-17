import React, { useState } from 'react';
import { useData } from '../context/DataContext.jsx';
import ScrollReveal from '../components/ScrollReveal.jsx';
import Modal from '../components/Modal.jsx';

/* Services page — fully editable */
export default function Services() {
  const { services, addService, updateService, removeService } = useData();
  const [modal, setModal] = useState(null);

  const openAdd = () => setModal({ mode: 'add', data: { icon: '✨', title: '', description: '' } });
  const openEdit = (s) => setModal({ mode: 'edit', data: { ...s } });

  const submit = (e) => {
    e.preventDefault();
    const f = e.target;
    const payload = {
      icon: f.icon.value.trim() || '✨',
      title: f.title.value.trim(),
      description: f.description.value.trim()
    };
    if (!payload.title) return;
    if (modal.mode === 'add') addService(payload);
    else updateService(modal.data.id, payload);
    setModal(null);
  };

  return (
    <section className="page">
      <div className="container">
        <ScrollReveal>
          <span className="eyebrow">What we do</span>
          <h1 className="section-title">
            Services
            {/* ⭐ EDITABLE — this whole section is fully customizable */}
            <span className="editable-hint">✎ EDITABLE</span>
          </h1>
          <p className="section-subtitle">
            Hasmath's Agency is a young, hungry web-development studio. Below are
            the services we currently offer — feel free to add new ones as we
            grow. All entries are saved in your browser.
          </p>

          <button className="btn btn-primary" style={{ marginBottom: 40 }} onClick={openAdd}>
            + Add Service
          </button>
        </ScrollReveal>

        <div className="grid-3">
          {services.map((s, i) => (
            <ScrollReveal key={s.id} delay={i * 60}>
              <div className="card service-card">
                <span className="editable-tag">EDITABLE</span>
                <div className="service-icon">{s.icon}</div>
                <h3>{s.title}</h3>
                <p>{s.description}</p>
                <div style={{ display: 'flex', gap: 8, marginTop: 18 }}>
                  <button className="btn btn-ghost btn-small" onClick={() => openEdit(s)}>Edit</button>
                  <button
                    className="btn btn-danger btn-small"
                    onClick={() => confirm(`Remove "${s.title}"?`) && removeService(s.id)}
                  >Remove</button>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {services.length === 0 && (
          <p style={{ textAlign: 'center', color: 'var(--muted)', padding: '60px 0' }}>
            No services yet. Click <strong>+ Add Service</strong> above.
          </p>
        )}
      </div>

      {modal && (
        <Modal title={modal.mode === 'add' ? 'Add a service' : 'Edit service'} onClose={() => setModal(null)}>
          <form className="form" onSubmit={submit}>
            <div className="form-row">
              <div className="form-group">
                <label>Icon (emoji)</label>
                <input name="icon" defaultValue={modal.data.icon} placeholder="✨" maxLength={2} />
              </div>
              <div className="form-group">
                <label>Title *</label>
                <input name="title" defaultValue={modal.data.title} required placeholder="UI/UX Design" />
              </div>
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea name="description" defaultValue={modal.data.description} placeholder="What's included..." />
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