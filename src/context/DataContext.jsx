import React, { createContext, useContext, useEffect, useState } from 'react';

/* =========================================================
   DataContext — central editable store
   All projects, services, experience entries are stored in
   localStorage so they persist across page reloads.

   ⭐ TO EDIT DEFAULT CONTENT:
      Update the DEFAULT_* constants below.
   ========================================================= */

// ⭐ EDITABLE — Default services (Hasmath's Agency offers these)
const DEFAULT_SERVICES = [
  {
    id: 's1',
    icon: '🎨',
    title: 'Web Design',
    description: 'Pixel-perfect, modern interfaces with a focus on user experience, accessibility, and brand identity.'
  },
  {
    id: 's2',
    icon: '⚛️',
    title: 'Frontend Development',
    description: 'Fast, responsive websites built with React, Next.js, and modern CSS — optimized for every device.'
  },
  {
    id: 's3',
    icon: '🛠️',
    title: 'Backend & APIs',
    description: 'Scalable Node.js / Express servers, REST & GraphQL APIs, authentication, and database design.'
  },
  {
    id: 's4',
    icon: '📱',
    title: 'Responsive & PWA',
    description: 'Mobile-first builds with offline support, installable PWAs, and Core Web Vitals tuning.'
  },
  {
    id: 's5',
    icon: '🚀',
    title: 'Performance & SEO',
    description: 'Lighthouse audits, image optimization, lazy loading, and on-page SEO for top search visibility.'
  },
  {
    id: 's6',
    icon: '🔧',
    title: 'Maintenance & Support',
    description: 'Ongoing bug fixes, content updates, security patches, and feature additions for live websites.'
  }
];

// ⭐ EDITABLE — Default projects shown on Home page
const DEFAULT_PROJECTS = [
  {
    id: 'p1',
    title: 'Aurora Dashboard',
    description: 'Analytics dashboard with real-time charts, dark/light themes, and role-based access.',
    tags: ['React', 'Node.js', 'MongoDB'],
    link: '#',
    accent: '#6366F1'
  },
  {
    id: 'p2',
    title: 'GreenCart E-commerce',
    description: 'Headless commerce store with Stripe checkout, search, and a custom CMS.',
    tags: ['Next.js', 'Stripe', 'Tailwind'],
    link: '#',
    accent: '#10B981'
  },
  {
    id: 'p3',
    title: 'Loop Music App',
    description: 'A streaming app prototype with playlists, audio visualizer, and PWA support.',
    tags: ['React', 'Web Audio', 'PWA'],
    link: '#',
    accent: '#F59E0B'
  }
];

// ⭐ EDITABLE — Default experience timeline
const DEFAULT_EXPERIENCE = [
  {
    id: 'e1',
    date: '2024 — Present',
    role: 'Founder & Lead Developer',
    company: "Hasmath's Agency",
    description: 'Building modern web experiences for startups and creators across the globe.'
  },
  {
    id: 'e2',
    date: '2022 — 2024',
    role: 'Full-stack Developer',
    company: 'Freelance',
    description: 'Delivered 20+ client projects ranging from landing pages to full-scale SaaS dashboards.'
  },
  {
    id: 'e3',
    date: '2021 — 2022',
    role: 'Junior Web Developer',
    company: 'Local Tech Studio',
    description: 'Worked on UI components, REST integrations, and WordPress customizations.'
  }
];

const DataContext = createContext(null);

const useLocal = (key, fallback) => {
  const [val, setVal] = useState(() => {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch { return fallback; }
  });
  useEffect(() => {
    try { localStorage.setItem(key, JSON.stringify(val)); } catch {}
  }, [key, val]);
  return [val, setVal];
};

export function DataProvider({ children }) {
  const [services, setServices] = useLocal('ha_services', DEFAULT_SERVICES);
  const [projects, setProjects] = useLocal('ha_projects', DEFAULT_PROJECTS);
  const [experience, setExperience] = useLocal('ha_experience', DEFAULT_EXPERIENCE);
  const [toast, setToast] = useState(null);

  const notify = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  };

  // --- CRUD: Projects ---
  const addProject = (p) => {
    const np = { ...p, id: 'p' + Date.now() };
    setProjects(prev => [np, ...prev]);
    notify('✓ Project added');
  };
  const updateProject = (id, p) => {
    setProjects(prev => prev.map(x => x.id === id ? { ...x, ...p } : x));
    notify('✓ Project updated');
  };
  const removeProject = (id) => {
    setProjects(prev => prev.filter(x => x.id !== id));
    notify('✓ Project removed');
  };

  // --- CRUD: Services ---
  const addService = (s) => {
    setServices(prev => [...prev, { ...s, id: 's' + Date.now() }]);
    notify('✓ Service added');
  };
  const updateService = (id, s) => {
    setServices(prev => prev.map(x => x.id === id ? { ...x, ...s } : x));
    notify('✓ Service updated');
  };
  const removeService = (id) => {
    setServices(prev => prev.filter(x => x.id !== id));
    notify('✓ Service removed');
  };

  // --- CRUD: Experience ---
  const addExperience = (e) => {
    setExperience(prev => [{ ...e, id: 'e' + Date.now() }, ...prev]);
    notify('✓ Experience added');
  };
  const updateExperience = (id, e) => {
    setExperience(prev => prev.map(x => x.id === id ? { ...x, ...e } : x));
    notify('✓ Experience updated');
  };
  const removeExperience = (id) => {
    setExperience(prev => prev.filter(x => x.id !== id));
    notify('✓ Experience removed');
  };

  const resetAll = () => {
    if (!confirm('Reset all content back to defaults? This will erase your edits.')) return;
    setServices(DEFAULT_SERVICES);
    setProjects(DEFAULT_PROJECTS);
    setExperience(DEFAULT_EXPERIENCE);
    notify('✓ Restored defaults');
  };

  return (
    <DataContext.Provider value={{
      services, projects, experience,
      addProject, updateProject, removeProject,
      addService, updateService, removeService,
      addExperience, updateExperience, removeExperience,
      resetAll, notify,
      toast
    }}>
      {children}
    </DataContext.Provider>
  );
}

export const useData = () => useContext(DataContext);