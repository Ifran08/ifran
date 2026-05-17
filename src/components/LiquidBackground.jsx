import React, { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame, extend } from '@react-three/fiber';
import { Effects } from '@react-three/drei';
import { UnrealBloomPass } from 'three-stdlib';
import * as THREE from 'three';

extend({ UnrealBloomPass });

/* =========================================================
   LiquidBackground — adapted from _iquid_4.jsx
   ------------------------------------------------------------
   • Original liquid-core particle sphere is preserved.
   • Colors retuned for a light-theme (indigo + cyan palette).
   • Camera ZOOMS IN as you scroll DOWN, ZOOMS OUT as you scroll UP.
   ========================================================= */

const ParticleSwarm = ({ scrollRef }) => {
  const meshRef = useRef();
  const count = 8000;            // lighter for performance on portfolios
  const speedMult = 0.7;
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const target = useMemo(() => new THREE.Vector3(), []);
  const pColor = useMemo(() => new THREE.Color(), []);
  const color = pColor;

  const positions = useMemo(() => {
    const pos = [];
    for (let i = 0; i < count; i++)
      pos.push(new THREE.Vector3((Math.random() - 0.5) * 100, (Math.random() - 0.5) * 100, (Math.random() - 0.5) * 100));
    return pos;
  }, []);

  const material = useMemo(() => new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.9 }), []);
  const geometry = useMemo(() => new THREE.TetrahedronGeometry(0.22), []);

  const PARAMS = useMemo(() => ({ size: 70, speed: 0.8, pulse: 0.9 }), []);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime() * speedMult;

    // ---------- Scroll-driven zoom ----------
    const scrollY = scrollRef.current || 0;
    const docH = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    const scrollP = Math.min(1, Math.max(0, scrollY / docH));

    // Camera dollies from z=140 (far, zoomed out) → z=55 (close, zoomed in)
    const targetZ = 140 - scrollP * 85;
    state.camera.position.z += (targetZ - state.camera.position.z) * 0.06;

    // Slight gentle rotation while scrolling
    state.camera.position.x = Math.sin(time * 0.1) * 6;
    state.camera.position.y = Math.cos(time * 0.08) * 4;
    state.camera.lookAt(0, 0, 0);

    for (let i = 0; i < count; i++) {
      const size = PARAMS.size;
      const speed = PARAMS.speed;
      const pulse = PARAMS.pulse;

      const t = time * speed;
      const f = i / count;

      const phi = Math.acos(1.0 - 2.0 * f);
      const theta = Math.PI * 2.0 * Math.sqrt(count * f);

      const r =
        size +
        Math.sin(theta * 6.0 + t * 2.0) * 8.0 +
        Math.cos(phi * 8.0 - t) * 8.0;

      const breathing = 1.0 + Math.sin(t * 2.0) * pulse * 0.15;

      const x = Math.sin(phi) * Math.cos(theta) * r * breathing;
      const y = Math.sin(phi) * Math.sin(theta) * r * breathing;
      const z = Math.cos(phi) * r * breathing;

      target.set(x, y, z);

      // Indigo → cyan → amber hue range (matches light-theme palette)
      const hue = 0.62 + Math.sin(f * 20.0 + t) * 0.12; // ~indigo to cyan
      const light = 0.55 + Math.sin(theta * 2.0 - t * 3.0) * 0.18;

      color.setHSL(hue, 0.85, light);

      positions[i].lerp(target, 0.08);
      dummy.position.copy(positions[i]);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
      meshRef.current.setColorAt(i, pColor);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
    if (meshRef.current.instanceColor) meshRef.current.instanceColor.needsUpdate = true;
  });

  return <instancedMesh ref={meshRef} args={[geometry, material, count]} />;
};

export default function LiquidBackground() {
  const scrollRef = useRef(0);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    // Respect prefers-reduced-motion
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const handler = (e) => setReduced(e.matches);
    mq.addEventListener?.('change', handler);

    const onScroll = () => {
      scrollRef.current = window.scrollY;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      mq.removeEventListener?.('change', handler);
    };
  }, []);

  if (reduced) return null;

  return (
    <div className="liquid-bg" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 140], fov: 55 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <fog attach="fog" args={['#F7F8FB', 0.005]} />
        <ParticleSwarm scrollRef={scrollRef} />
        <Effects disableGamma>
          <unrealBloomPass threshold={0} strength={1.1} radius={0.5} />
        </Effects>
      </Canvas>
    </div>
  );
}