import React, { useState } from 'react';
import { useData } from '../context/DataContext.jsx';
import ScrollReveal from '../components/ScrollReveal.jsx';

export default function Contact() {
  const { notify } = useData();
  const [sending, setSending] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const f = e.target;
    const data = {
      name: f.name.value, email: f.email.value, subject: f.subject.value,
      budget: f.budget.value, message: f.message.value
    };
    setSending(true);
    // simulate sending — in production wire this to your backend / form service
    setTimeout(() => {
      console.log('📩 Contact form submission:', data);
      setSending(false);
      setSubmitted(true);
      notify('✓ Message sent — I will get back to you soon!');
      f.reset();
      setTimeout(() => setSubmitted(false), 4000);
    }, 900);
  };

  return (
    <section className="page">
      <div className="container">
        <div className="grid-2" style={{ alignItems: 'start', gap: 60 }}>
          <ScrollReveal>
            <span className="eyebrow">Contact</span>
            <h1 className="section-title">Let's build something great.</h1>
            <p className="section-subtitle">
              Have a project in mind, a question, or just want to say hi?
              Drop a message — I read every email and reply within 24 hours.
            </p>

            <div style={{ display: 'grid', gap: 20, marginTop: 30 }}>
              <ContactItem icon="✉️" label="Email" value="hello@hasmaths.agency" />
              <ContactItem icon="📍" label="Based in" value="Global • Remote-first" />
              <ContactItem icon="⏱️" label="Response time" value="Within 24 hours" />
              <ContactItem icon="🤝" label="Available for" value="Freelance, contracts, full-time" />
            </div>
          </ScrollReveal>

          <ScrollReveal delay={120}>
            <div className="card">
              <form className="form" onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label>Your name *</label>
                    <input name="name" required placeholder="John Doe" />
                  </div>
                  <div className="form-group">
                    <label>Email *</label>
                    <input name="email" type="email" required placeholder="you@example.com" />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Subject</label>
                    <input name="subject" placeholder="Project inquiry" />
                  </div>
                  <div className="form-group">
                    <label>Budget</label>
                    <select name="budget" defaultValue="">
                      <option value="">Select range</option>
                      <option>Under $500</option>
                      <option>$500 — $2,000</option>
                      <option>$2,000 — $10,000</option>
                      <option>$10,000+</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label>Message *</label>
                  <textarea name="message" required placeholder="Tell me about your project, goals, timeline..." />
                </div>

                <button type="submit" className="btn btn-primary" disabled={sending} style={{ justifySelf: 'start' }}>
                  {sending ? 'Sending…' : submitted ? '✓ Sent!' : 'Send message →'}
                </button>
              </form>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

function ContactItem({ icon, label, value }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
      <div className="service-icon" style={{ width: 48, height: 48, fontSize: '1.3rem', marginBottom: 0 }}>
        {icon}
      </div>
      <div>
        <div style={{ fontSize: '.8rem', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '.1em' }}>
          {label}
        </div>
        <div style={{ fontWeight: 600 }}>{value}</div>
      </div>
    </div>
  );
}