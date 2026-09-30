import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  Sprout, ShieldCheck, Network, Scale, Bot, 
  MapPin, ArrowRight, CheckCircle2, Cpu 
} from 'lucide-react';

export const About: React.FC = () => {
  const { navigateTo } = useApp();

  return (
    <div className="max-w-4xl mx-auto space-y-10 pb-16">
      
      {/* Header Banner */}
      <div className="text-center space-y-3 py-6 border-b border-stone-800">
        <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold">
          Foundational Philosophy
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          "Agricultural AI Should Not Just Answer.{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-200">
            It Should Show Why."
          </span>
        </h1>
        <p className="text-xs sm:text-sm text-stone-300 max-w-2xl mx-auto leading-relaxed">
          AgroNexus was founded to eliminate black-box hallucinations in farming decisions by anchoring every recommendation to semantic knowledge graphs, field telemetry, and peer-reviewed provenance.
        </p>
      </div>

      {/* Core Mission Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="p-6 rounded-3xl bg-stone-900 border border-stone-800 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-950 text-emerald-400 border border-emerald-800/40 flex items-center justify-center">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-white">Trust &amp; Provenance First</h3>
          <p className="text-xs text-stone-300 leading-relaxed">
            Generic LLMs invent pesticide dosages and hallucinate nonexistent diseases. AgroNexus pairs hybrid deterministic agronomic rules with exact citations to ICAR, IIRR, and state agricultural university bulletins.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-stone-900 border border-stone-800 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-950 text-emerald-400 border border-emerald-800/40 flex items-center justify-center">
            <Network className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-white">Semantic Knowledge Memory</h3>
          <p className="text-xs text-stone-300 leading-relaxed">
            Relationships between crops, soil textures, pathogens, thermal humidity windows, and chemical interventions are modeled as a living graph with 12,480 explicit, typed nodes.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-stone-900 border border-stone-800 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-950 text-emerald-400 border border-emerald-800/40 flex items-center justify-center">
            <Scale className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-white">Conflict-Aware Intelligence</h3>
          <p className="text-xs text-stone-300 leading-relaxed">
            When research studies disagree (e.g. fungicide efficacy in alkaline vs neutral soil), AgroNexus preserves both claims and resolves the discrepancy by conditioning on microclimatic variables.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-stone-900 border border-stone-800 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-950 text-emerald-400 border border-emerald-800/40 flex items-center justify-center">
            <Bot className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-white">Multimodal &amp; Multilingual Accessibility</h3>
          <p className="text-xs text-stone-300 leading-relaxed">
            Empowering Indian farmers in 12 languages with native voice recognition, audio speech synthesis, and smartphone camera leaf lesion scanning.
          </p>
        </div>
      </div>

      {/* Production-Ready Architecture Stack */}
      <div className="p-6 sm:p-8 rounded-3xl bg-stone-900 border border-stone-800 space-y-5">
        <h2 className="text-xl font-bold text-white">System Architecture &amp; Technology Stack</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
          <div className="p-3 rounded-xl bg-stone-950 border border-stone-800">
            <span className="text-stone-300 block mb-1">Frontend UI</span>
            <span className="text-emerald-400 font-bold">React 19 + TypeScript + Tailwind</span>
          </div>
          <div className="p-3 rounded-xl bg-stone-950 border border-stone-800">
            <span className="text-stone-300 block mb-1">Knowledge Graph</span>
            <span className="text-emerald-400 font-bold">Neo4j Ready / Interactive SVG</span>
          </div>
          <div className="p-3 rounded-xl bg-stone-950 border border-stone-800">
            <span className="text-stone-300 block mb-1">API &amp; Reasoning</span>
            <span className="text-emerald-400 font-bold">FastAPI / Pydantic / Hybrid Rules</span>
          </div>
          <div className="p-3 rounded-xl bg-stone-950 border border-stone-800">
            <span className="text-stone-300 block mb-1">Multimodal</span>
            <span className="text-emerald-400 font-bold">Web Speech + Camera Vision</span>
          </div>
        </div>
      </div>

      {/* Roadmap */}
      <div className="p-6 sm:p-8 rounded-3xl bg-stone-900 border border-stone-800 space-y-4">
        <h2 className="text-xl font-bold text-white">Product Roadmap</h2>
        <div className="space-y-3 text-xs text-stone-300">
          <div className="flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <span>Phase 1 (Complete): 12-language multilingual engine, dynamic State-to-District selector, 25+ crops, 36+ diseases, interactive knowledge graph, sensor anomaly quarantine chamber.</span>
          </div>
          <div className="flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <span>Phase 2: Edge-deployable on-device quantized neural vision models for offline rural leaf lesion diagnosis without internet.</span>
          </div>
          <div className="flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <span>Phase 3: Direct integration with AgriStack farmer land registry and national drone multispectral NDVI imagery feeds.</span>
          </div>
        </div>
      </div>

    </div>
  );
};
