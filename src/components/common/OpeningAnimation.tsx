import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';

const PHASES = [
  { icon: '🌾', label: 'Field Silhouette & IoT Sensors Online', color: '#6ee7b7' },
  { icon: '📡', label: 'Streaming Soil & Weather Telemetry', color: '#34d399' },
  { icon: '🧬', label: 'Synthesizing Knowledge Graph & Evidence', color: '#10b981' },
  { icon: '🤖', label: 'Evidence-Driven Intelligence Ready', color: '#059669' },
];

const BOOT_LINES = [
  '> Connecting IoT sensor grid...',
  '> Loading 12,480 knowledge nodes...',
  '> Indexing 3,842 evidence records...',
  '> Validating telemetry integrity...',
  '> Multilingual engine (12 langs) ready.',
  '> AgroNexus Intelligence Platform v2.0',
];

export const OpeningAnimation: React.FC = () => {
  const { isOpeningAnimationVisible, dismissOpeningAnimation } = useApp();
  const [step, setStep] = useState<number>(0);
  const [bootLines, setBootLines] = useState<string[]>([]);
  const [showBrand, setShowBrand] = useState(false);

  useEffect(() => {
    if (!isOpeningAnimationVisible) {
      setStep(0);
      setBootLines([]);
      setShowBrand(false);
      return;
    }

    // Stagger boot lines
    BOOT_LINES.forEach((line, i) => {
      setTimeout(() => {
        setBootLines(prev => [...prev, line]);
      }, 200 + i * 280);
    });

    // Phase transitions
    const t1 = setTimeout(() => setStep(1), 400);
    const t2 = setTimeout(() => setStep(2), 900);
    const t3 = setTimeout(() => setStep(3), 1450);
    const t4 = setTimeout(() => setStep(4), 1950);
    const t5 = setTimeout(() => setShowBrand(true), 2200);
    const t6 = setTimeout(() => dismissOpeningAnimation(), 3600);

    return () => {
      [t1,t2,t3,t4,t5,t6].forEach(clearTimeout);
    };
  }, [isOpeningAnimationVisible]);

  if (!isOpeningAnimationVisible) return null;

  const currentPhase = PHASES[Math.min(step - 1, PHASES.length - 1)];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-stone-950 overflow-hidden select-none">
      {/* ── Background: animated grid ── */}
      <div className="absolute inset-0 grid-pattern" />
      <div className="absolute inset-0 topo-overlay" />

      {/* ── Decorative glow spheres ── */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full bg-emerald-600/10 blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-emerald-800/8 blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      
      {/* ── Radar rings ── */}
      {[180, 280, 380].map((size, i) => (
        <div
          key={i}
          className="absolute rounded-full border border-emerald-500/10"
          style={{
            width: size, height: size,
            animation: `radarPing ${2 + i * 0.5}s ease-out infinite`,
            animationDelay: `${i * 0.6}s`,
          }}
        />
      ))}

      {/* ── Main container ── */}
      <div className="relative z-10 flex flex-col items-center w-full max-w-lg px-6">

        {/* Center Icon */}
        <div
          className="w-24 h-24 rounded-3xl mb-8 flex items-center justify-center relative"
          style={{
            background: 'linear-gradient(135deg, #064e3b, #10b981)',
            boxShadow: '0 0 40px rgba(16, 185, 129, 0.3)',
            opacity: step >= 1 ? 1 : 0,
            transform: step >= 1 ? 'scale(1)' : 'scale(0.7)',
            transition: 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
          }}
        >
          <div className="w-20 h-20 rounded-[22px] bg-stone-950/80 flex items-center justify-center">
            <span className="text-4xl" style={{ filter: 'drop-shadow(0 0 8px rgba(16,185,129,0.6))' }}>
              {step >= 1 ? (currentPhase?.icon ?? '🌿') : '🌿'}
            </span>
          </div>
          {/* Orbit dot */}
          <div
            className="absolute w-3 h-3 rounded-full bg-emerald-400"
            style={{ animation: 'orbit 2s linear infinite' }}
          />
        </div>

        {/* Phase label */}
        <div className="h-8 mb-6 flex items-center justify-center">
          <div
            className="text-sm font-mono text-emerald-300 tracking-widest uppercase text-center transition-all duration-400"
            style={{
              opacity: step >= 1 ? 1 : 0,
              transform: step >= 1 ? 'translateY(0)' : 'translateY(8px)',
            }}
          >
            {step >= 4
              ? '✓ Evidence-Driven Intelligence Ready'
              : step >= 1
              ? currentPhase?.label
              : 'Initializing Agro-Ecosystem...'}
          </div>
        </div>

        {/* Terminal boot log */}
        <div
          className="w-full bg-stone-900/80 border border-stone-800 rounded-2xl p-4 mb-8 h-32 overflow-hidden font-mono text-[11px] leading-relaxed"
          style={{ opacity: step >= 1 ? 1 : 0, transition: 'opacity 0.5s ease 0.3s' }}
        >
          {bootLines.map((line, i) => (
            <div
              key={i}
              className="text-emerald-400/90 mb-0.5"
              style={{
                animation: 'fadeInUp 0.3s ease-out both',
                animationDelay: `${i * 0.05}s`,
              }}
            >
              {line}
              {i === bootLines.length - 1 && (
                <span className="inline-block w-1.5 h-3.5 bg-emerald-400 ml-0.5 align-middle"
                  style={{ animation: 'blink 0.8s step-end infinite' }} />
              )}
            </div>
          ))}
        </div>

        {/* Progress track */}
        <div className="w-full bg-stone-800 rounded-full h-1 mb-8 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-emerald-600 to-emerald-400 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${Math.min(step * 25, 100)}%` }}
          />
        </div>

        {/* Brand reveal */}
        <div
          className="text-center transition-all duration-700"
          style={{
            opacity: showBrand ? 1 : 0,
            transform: showBrand ? 'translateY(0) scale(1)' : 'translateY(16px) scale(0.96)',
          }}
        >
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white mb-1">
            AGRO <span className="gradient-text">NEXUS</span>
          </h1>
          <p className="text-xs text-stone-400 uppercase tracking-[0.2em] font-medium">
            Evidence-Driven Agricultural Intelligence
          </p>
        </div>

        {/* Skip button */}
        <button
          onClick={dismissOpeningAnimation}
          className="mt-8 px-5 py-2 rounded-full border border-stone-700 hover:border-emerald-500/60 text-stone-500 hover:text-stone-300 text-xs tracking-wider transition-all cursor-pointer hover:bg-emerald-950/20"
        >
          Skip →
        </button>
      </div>
    </div>
  );
};
