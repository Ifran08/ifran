import React, { useEffect, useRef, useState } from 'react';

/* ScrollReveal — wraps children with a zoom-in/out scroll animation.
   • As element enters viewport → scales up to 1 and fades in.
   • As element leaves viewport (scrolling further) → slightly scales down.
*/
export default function ScrollReveal({ children, delay = 0, className = '' }) {
  const ref = useRef(null);
  const [state, setState] = useState('hidden'); // hidden | visible | leaving

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const ratio = entry.intersectionRatio;
          if (entry.isIntersecting && ratio > 0.15) {
            setState('visible');
          } else if (ratio < 0.05) {
            // out of viewport → reset so it can re-animate
            setState('hidden');
          }
        });
      },
      { threshold: [0, 0.05, 0.15, 0.3, 0.6, 1] }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`scroll-fade ${state === 'visible' ? 'visible' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}