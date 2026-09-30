import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { ShieldCheck, Activity, Cpu, Sparkles } from 'lucide-react';

export const OpeningAnimation: React.FC = () => {
  const { isOpeningAnimationVisible, dismissOpeningAnimation } = useApp();
  const [step, setStep] = useState<number>(0);

  useEffect(() => {
    if (!isOpeningAnimationVisible) return;

    const timer1 = setTimeout(() => setStep(1), 500); // Field silhouette & sensors
    const timer2 = setTimeout(() => setStep(2), 1100); // Telemetry & data streams
    const timer3 = setTimeout(() => setStep(3), 1700); // Knowledge graph & evidence
    const timer4 = setTimeout(() => setStep(4), 2300); // AGRO NEXUS brand
    const timer5 = setTimeout(() => {
      dismissOpeningAnimation();
    }, 3200); // Auto complete

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
      clearTimeout(timer5);
    };
  }, [isOpeningAnimationVisible]);

  if (!isOpeningAnimationVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-stone-950 text-white overflow-hidden select-none transition-opacity duration-500">
      {/* Dynamic Background Grid and Topographic Lines */}
      <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#15803d_1px,transparent_1px)] [background-size:24px_24px]" />
      
      {/* Floating Decorative Rings */}
      <div className="absolute w-[500px] h-[500px] rounded-full border border-emerald-500/20 animate-ping opacity-30 pointer-events-none" />
      <div className="absolute w-[350px] h-[350px] rounded-full border border-emerald-400/30 animate-pulse pointer-events-none" />

      {/* Animation Sequence Stage */}
      <div className="relative z-10 flex flex-col items-center max-w-md px-6 text-center">
        {/* Step 1: Field Silhouette & Sensors */}
        <div className={`transition-all duration-500 transform ${step >= 1 ? 'scale-100 opacity-100' : 'scale-75 opacity-0'}`}>
          <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-tr from-emerald-900 to-emerald-600 p-0.5 shadow-2xl shadow-emerald-900/60 flex items-center justify-center">
            <div className="w-full h-full rounded-2xl bg-stone-900/90 flex items-center justify-center">
              {step === 1 && <Activity className="w-10 h-10 text-emerald-400 animate-bounce" />}
              {step === 2 && <Cpu className="w-10 h-10 text-emerald-400 animate-pulse" />}
              {step >= 3 && <ShieldCheck className="w-10 h-10 text-emerald-300" />}
            </div>
          </div>
        </div>

        {/* Phase Subtitle Status Indicator */}
        <div className="h-8 mb-4">
          {step === 0 && <span className="text-sm font-mono text-stone-400 tracking-widest uppercase">Initializing Agro-Ecosystem...</span>}
          {step === 1 && <span className="text-sm font-mono text-emerald-400 tracking-widest uppercase">Field Silhouette & IoT Sensors Online</span>}
          {step === 2 && <span className="text-sm font-mono text-emerald-300 tracking-widest uppercase">Streaming Soil & Weather Telemetry</span>}
          {step === 3 && <span className="text-sm font-mono text-emerald-200 tracking-widest uppercase">Synthesizing Knowledge Graph & Evidence</span>}
          {step >= 4 && <span className="text-sm font-mono text-emerald-400 tracking-widest uppercase font-semibold flex items-center justify-center gap-1.5"><Sparkles className="w-4 h-4 text-emerald-400" /> Evidence-Driven Intelligence Ready</span>}
        </div>

        {/* Brand Reveal */}
        <div className={`transition-all duration-700 transform ${step >= 4 ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white mb-2">
            AGRO <span className="text-emerald-400">NEXUS</span>
          </h1>
          <p className="text-xs md:text-sm text-stone-300 uppercase tracking-widest font-medium">
            Evidence-Driven Agricultural Intelligence
          </p>
        </div>

        {/* Skip Button */}
        <button
          onClick={dismissOpeningAnimation}
          className="mt-8 px-4 py-1.5 rounded-full border border-stone-700 hover:border-emerald-500 text-stone-400 hover:text-white text-xs tracking-wider transition-colors cursor-pointer"
        >
          Skip Intro →
        </button>
      </div>
    </div>
  );
};
