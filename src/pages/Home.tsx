import React from 'react';
import { useApp } from '../context/AppContext';
import { t } from '../i18n/translations';
import { 
  Sprout, Network, ShieldCheck, Scale, ArrowRight, 
  Sparkles, CheckCircle2, ChevronRight, Activity, 
  MapPin, CloudSun, Microscope, Bot 
} from 'lucide-react';

export const Home: React.FC = () => {
  const { navigateTo, language, selectedState, selectedDistrict, selectedCrop } = useApp();

  return (
    <div className="space-y-12 pb-16">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-stone-900 via-stone-900 to-stone-950 border border-stone-800 p-6 sm:p-10 lg:p-16">
        {/* Subtle Topographic / Grid Pattern */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
        
        {/* Glow Spheres */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-emerald-600/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-emerald-900/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl">
          {/* Eyebrow Pill */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-300 text-xs font-medium mb-6">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>Next-Gen Agricultural Intelligence Platform</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1] mb-6">
            Agriculture Has Data Everywhere.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-200">
              Intelligence Shouldn't Be Fragmented.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-stone-300 font-normal leading-relaxed mb-8 max-w-2xl">
            AgroNexus connects crops, diseases, soil, weather, IoT sensors, and research into one 
            explainable, evidence-aware agricultural intelligence system.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={() => navigateTo('/field-analysis')}
              className="px-6 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm shadow-xl shadow-emerald-950/50 flex items-center gap-2 cursor-pointer transition-all hover:gap-3"
            >
              <span>{t('action.exploreIntelligence', language)}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => navigateTo('/knowledge-graph')}
              className="px-6 py-3.5 rounded-2xl bg-stone-800/90 hover:bg-stone-800 border border-stone-700/80 text-stone-200 hover:text-white font-medium text-sm flex items-center gap-2 cursor-pointer transition-colors"
            >
              <Network className="w-4 h-4 text-emerald-400" />
              <span>{t('action.viewGraph', language)}</span>
            </button>
          </div>
        </div>

        {/* Live Active Context Status Ribbon */}
        <div className="mt-10 pt-6 border-t border-stone-800/80 grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div>
            <span className="text-[11px] font-mono text-stone-300 uppercase block">Active Region</span>
            <span className="text-sm font-semibold text-stone-100 flex items-center gap-1 mt-0.5">
              <MapPin className="w-3.5 h-3.5 text-emerald-400" /> {selectedDistrict}, {selectedState}
            </span>
          </div>
          <div>
            <span className="text-[11px] font-mono text-stone-300 uppercase block">Monitored Crop</span>
            <span className="text-sm font-semibold text-stone-100 flex items-center gap-1 mt-0.5">
              <Sprout className="w-3.5 h-3.5 text-emerald-400" /> {selectedCrop} (Kharif)
            </span>
          </div>
          <div>
            <span className="text-[11px] font-mono text-stone-300 uppercase block">Telemetry Health</span>
            <span className="text-sm font-semibold text-emerald-400 flex items-center gap-1 mt-0.5">
              <Activity className="w-3.5 h-3.5 text-emerald-400" /> 96.8% Operational
            </span>
          </div>
          <div>
            <span className="text-[11px] font-mono text-stone-300 uppercase block">Evidence Records</span>
            <span className="text-sm font-semibold text-stone-100 flex items-center gap-1 mt-0.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> 3,842 Peer-Reviewed
            </span>
          </div>
        </div>
      </section>

      {/* Three Major Pillar Cards */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-semibold">
              Core Architecture
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">
              Engineered for Scientific Verifiability
            </h2>
          </div>
          <span className="text-xs text-stone-300">
            Never generic chatbot guessing. Always contextual evidence.
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: CONNECT */}
          <div 
            onClick={() => navigateTo('/knowledge-graph')}
            className="p-6 rounded-2xl bg-stone-900 border border-stone-800 hover:border-emerald-500/50 transition-all hover:-translate-y-1 cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-950/80 border border-emerald-800/40 text-emerald-400 flex items-center justify-center group-hover:scale-105 transition-transform">
                  <Network className="w-6 h-6" />
                </div>
                <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest">
                  CONNECT
                </span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Semantic Knowledge Graph</h3>
              <p className="text-xs text-stone-300 leading-relaxed mb-4">
                Interlinks 12,480 nodes spanning crop genomes, pathogen microclimates, soil chemistry, 
                and verified field trials with explicit typed relationships.
              </p>
            </div>
            <div className="flex items-center text-xs font-medium text-emerald-400 group-hover:gap-1.5 transition-all">
              <span>Explore Knowledge Graph</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Card 2: VERIFY */}
          <div 
            onClick={() => navigateTo('/evidence')}
            className="p-6 rounded-2xl bg-stone-900 border border-stone-800 hover:border-emerald-500/50 transition-all hover:-translate-y-1 cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-950/80 border border-emerald-800/40 text-emerald-400 flex items-center justify-center group-hover:scale-105 transition-transform">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest">
                  VERIFY
                </span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Evidence & Provenance</h3>
              <p className="text-xs text-stone-300 leading-relaxed mb-4">
                Every advisory and disease diagnostic decision references exact scientific literature, 
                university trials, publication year, page numbers, and statistical reliability.
              </p>
            </div>
            <div className="flex items-center text-xs font-medium text-emerald-400 group-hover:gap-1.5 transition-all">
              <span>View Provenance Explorer</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Card 3: PROTECT */}
          <div 
            onClick={() => navigateTo('/conflicts')}
            className="p-6 rounded-2xl bg-stone-900 border border-stone-800 hover:border-emerald-500/50 transition-all hover:-translate-y-1 cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-950/80 border border-emerald-800/40 text-emerald-400 flex items-center justify-center group-hover:scale-105 transition-transform">
                  <Scale className="w-6 h-6" />
                </div>
                <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest">
                  PROTECT
                </span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Conflict & Anomaly Quarantine</h3>
              <p className="text-xs text-stone-300 leading-relaxed mb-4">
                Contradictory research studies are retained and conditioned on microclimate variables. 
                Erroneous sensor spikes are quarantined before contaminating the core graph.
              </p>
            </div>
            <div className="flex items-center text-xs font-medium text-emerald-400 group-hover:gap-1.5 transition-all">
              <span>Inspect Conflict Engine</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>
      </section>

      {/* The Intelligence Loop Visual Pipeline */}
      <section className="p-6 sm:p-8 rounded-3xl bg-stone-900/60 border border-stone-800">
        <div className="text-center max-w-xl mx-auto mb-8">
          <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-semibold">
            Closed-Loop Workflow
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-1">
            How AgroNexus Generates Explainable Intelligence
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 text-center">
          {[
            { step: '01', title: 'Location', desc: 'State & District Context' },
            { step: '02', title: 'Telemetry', desc: 'IoT Sensors & Weather' },
            { step: '03', title: 'Observations', desc: 'Voice & Camera Image' },
            { step: '04', title: 'Knowledge', desc: 'Semantic Graph Query' },
            { step: '05', title: 'Validation', desc: 'Evidence & Conflict Check' },
            { step: '06', title: 'Reasoning', desc: 'Hybrid AI Rules Engine' },
            { step: '07', title: 'Explanation', desc: 'Farmer Multilingual Voice' }
          ].map((item, idx) => (
            <div key={idx} className="p-3 rounded-xl bg-stone-900 border border-stone-800 flex flex-col items-center">
              <span className="w-6 h-6 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800/50 text-[10px] font-mono font-bold flex items-center justify-center mb-1.5">
                {item.step}
              </span>
              <span className="text-xs font-bold text-stone-200">{item.title}</span>
              <span className="text-[10px] text-stone-400 mt-0.5">{item.desc}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Interactive Quick Launch Feature Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <button
          onClick={() => navigateTo('/field-analysis')}
          className="p-5 rounded-2xl bg-stone-900 border border-stone-800 hover:border-emerald-500/50 text-left transition-all hover:bg-stone-800/60 cursor-pointer group"
        >
          <Microscope className="w-5 h-5 text-emerald-400 mb-3 group-hover:scale-110 transition-transform" />
          <h4 className="text-sm font-bold text-white">Multi-modal Field Analysis</h4>
          <p className="text-xs text-stone-300 mt-1">Combine camera leaf photo, Telugu voice, and sensor data.</p>
        </button>

        <button
          onClick={() => navigateTo('/crop-suggestor')}
          className="p-5 rounded-2xl bg-stone-900 border border-stone-800 hover:border-emerald-500/50 text-left transition-all hover:bg-stone-800/60 cursor-pointer group"
        >
          <Sprout className="w-5 h-5 text-emerald-400 mb-3 group-hover:scale-110 transition-transform" />
          <h4 className="text-sm font-bold text-white">AI Crop Suggestor</h4>
          <p className="text-xs text-stone-300 mt-1">7-factor weighted agronomic scoring for optimal yield.</p>
        </button>

        <button
          onClick={() => navigateTo('/environment-analyzer')}
          className="p-5 rounded-2xl bg-stone-900 border border-stone-800 hover:border-emerald-500/50 text-left transition-all hover:bg-stone-800/60 cursor-pointer group"
        >
          <CloudSun className="w-5 h-5 text-emerald-400 mb-3 group-hover:scale-110 transition-transform" />
          <h4 className="text-sm font-bold text-white">AI Environment Analyzer</h4>
          <p className="text-xs text-stone-300 mt-1">9-factor validation with thermal and humidity stress warnings.</p>
        </button>

        <button
          onClick={() => navigateTo('/ai-farmer')}
          className="p-5 rounded-2xl bg-stone-900 border border-stone-800 hover:border-emerald-500/50 text-left transition-all hover:bg-stone-800/60 cursor-pointer group"
        >
          <Bot className="w-5 h-5 text-emerald-400 mb-3 group-hover:scale-110 transition-transform" />
          <h4 className="text-sm font-bold text-white">Farmer AI Companion</h4>
          <p className="text-xs text-stone-300 mt-1">Speak in 12 Indian languages with audio voice responses.</p>
        </button>
      </section>

    </div>
  );
};
