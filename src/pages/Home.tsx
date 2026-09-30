import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { t } from '../i18n/translations';
import { 
  Sprout, Network, ShieldCheck, Scale, ArrowRight, 
  Sparkles, ChevronRight, Activity, 
  MapPin, CloudSun, Microscope, Bot, Thermometer, 
  Droplets, CloudRain, FlaskConical, Globe2,
  Zap, TrendingUp, AlertTriangle, CheckCircle
} from 'lucide-react';

// ── Animated stat counter hook
function useCounter(target: number, duration = 1200, startDelay = 0) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    let startTime: number | null = null;
    const delayTimeout = setTimeout(() => {
      const step = (timestamp: number) => {
        if (startTime === null) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setValue(Math.round(eased * target));
        if (progress < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }, startDelay);
    return () => clearTimeout(delayTimeout);
  }, [target, duration, startDelay]);
  return value;
}

// ── Live pulse indicator
const PulseDot: React.FC<{ color?: string }> = ({ color = '#10b981' }) => (
  <span className="relative flex items-center justify-center w-3 h-3 shrink-0">
    <span className="absolute w-3 h-3 rounded-full opacity-50" style={{ background: color, animation: 'radarPing 1.8s ease-out infinite' }} />
    <span className="relative inline-flex w-2 h-2 rounded-full" style={{ background: color }} />
  </span>
);

// ── Mini sparkline
const Sparkline: React.FC<{ data: number[]; color?: string }> = ({ data, color = '#10b981' }) => {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const w = 80;
  const h = 28;
  const points = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - ((v - min) / range) * h;
    return `${x},${y}`;
  }).join(' ');
  return (
    <svg width={w} height={h} className="overflow-visible">
      <polyline points={points} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.8" />
      <circle cx={w} cy={h - ((data[data.length-1] - min) / range) * h} r="3" fill={color} />
    </svg>
  );
};

export const Home: React.FC = () => {
  const { navigateTo, language, selectedState, selectedDistrict, selectedCrop, temperature, humidity, rainfall } = useApp();

  // Animated counters
  const nodesCount = useCounter(12480, 1400, 300);
  const evidenceCount = useCounter(3842, 1200, 500);
  const languagesCount = useCounter(12, 800, 200);
  const sensorsCount = useCounter(8, 600, 100);

  // Sparkline data (simulated 7-day trend)
  const tempTrend = [27, 28, 30, 29, 31, 28, temperature];
  const humidTrend = [78, 81, 85, 82, 87, 84, humidity];
  const riskTrend = [42, 55, 68, 61, 75, 71, 78];

  return (
    <div className="space-y-10 pb-20">
      
      {/* ══════════════════════════════════════════════════════
          HERO SECTION
          ══════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden rounded-3xl border border-stone-800 p-6 sm:p-10 lg:p-14"
        style={{ background: 'linear-gradient(135deg, #0c0a09 0%, #111710 50%, #0a1a0e 100%)' }}>
        
        {/* Decorative: animated grid dots */}
        <div className="absolute inset-0 grid-pattern rounded-3xl" />
        <div className="absolute inset-0 topo-overlay rounded-3xl" />
        
        {/* Decorative: glow spheres */}
        <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full opacity-20"
          style={{ background: 'radial-gradient(circle, #10b981 0%, transparent 70%)', animation: 'float 8s ease-in-out infinite' }} />
        <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #059669 0%, transparent 70%)', animation: 'float 10s ease-in-out infinite', animationDelay: '3s' }} />

        {/* Decorative: orbit rings */}
        <div className="absolute top-8 right-8 hidden lg:block pointer-events-none">
          {[80, 120, 160].map((r, i) => (
            <div key={i} className="absolute rounded-full border border-emerald-500/10"
              style={{ width: r*2, height: r*2, top: -r, right: -r, animation: `radarPing ${3 + i}s ease-out infinite`, animationDelay: `${i * 0.8}s` }} />
          ))}
        </div>

        <div className="relative z-10 max-w-3xl anim-fadeInUp">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-500/30 text-emerald-300 text-xs font-medium mb-6"
            style={{ background: 'rgba(6,78,59,0.4)' }}>
            <PulseDot />
            <span>Next-Gen Agricultural Intelligence Platform — Live System Active</span>
          </div>

          <h1 className="text-display text-white mb-4">
            Agriculture Has Data{' '}
            <span className="block">Everywhere.{' '}
              <span className="gradient-text">Intelligence Shouldn't Be Fragmented.</span>
            </span>
          </h1>

          <p className="text-subtitle mb-8 max-w-2xl">
            AgroNexus connects crops, diseases, soil, weather, IoT sensors, and peer-reviewed research 
            into one explainable, evidence-aware agricultural intelligence system.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-4 mb-10">
            <button
              onClick={() => navigateTo('/field-analysis')}
              className="btn-primary text-sm"
            >
              <Microscope className="w-4 h-4" />
              <span>{t('action.exploreIntelligence', language)}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => navigateTo('/knowledge-graph')}
              className="btn-secondary"
            >
              <Network className="w-4 h-4 text-emerald-400" />
              <span>{t('action.viewGraph', language)}</span>
            </button>

            <button
              onClick={() => navigateTo('/ai-farmer')}
              className="btn-secondary"
            >
              <Bot className="w-4 h-4 text-emerald-400" />
              <span>AI Farmer</span>
            </button>
          </div>

          {/* Live Context Status Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-emerald-900/40">
            {[
              { icon: <MapPin className="w-3.5 h-3.5 text-emerald-400" />, label: 'Active Region', value: `${selectedDistrict}, ${selectedState}` },
              { icon: <Sprout className="w-3.5 h-3.5 text-emerald-400" />, label: 'Monitored Crop', value: `${selectedCrop} (Kharif)` },
              { icon: <Activity className="w-3.5 h-3.5 text-emerald-400" />, label: 'Telemetry Health', value: '96.8% Operational', valueClass: 'text-emerald-400' },
              { icon: <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />, label: 'Evidence Records', value: '3,842 Peer-Reviewed' },
            ].map((item, i) => (
              <div key={i} className={`anim-fadeInUp delay-${(i+1)*100}`}>
                <span className="text-[10px] font-mono text-stone-400 uppercase tracking-wider block mb-0.5">{item.label}</span>
                <span className={`text-sm font-semibold flex items-center gap-1 ${item.valueClass || 'text-stone-100'}`}>
                  {item.icon} {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          LIVE TELEMETRY MINI DASHBOARD
          ══════════════════════════════════════════════════════ */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Temp */}
        <div className="p-5 rounded-2xl border border-stone-800 card-hover anim-fadeInUp delay-100"
          style={{ background: 'linear-gradient(135deg, #1c1917, #1e2218)' }}>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Thermometer className="w-4 h-4 text-amber-400" />
              <span className="text-xs font-mono text-stone-400 uppercase">Air Temperature</span>
            </div>
            <PulseDot color="#f59e0b" />
          </div>
          <div className="flex items-end justify-between">
            <div>
              <span className="text-3xl font-black text-white">{temperature}</span>
              <span className="text-sm text-stone-400 ml-1">°C</span>
              <p className="text-[11px] text-amber-400 font-mono mt-0.5">▲ Optimal Range: 25–35°C</p>
            </div>
            <Sparkline data={tempTrend} color="#f59e0b" />
          </div>
        </div>

        {/* Humidity */}
        <div className="p-5 rounded-2xl border border-stone-800 card-hover anim-fadeInUp delay-200"
          style={{ background: 'linear-gradient(135deg, #1c1917, #171e22)' }}>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Droplets className="w-4 h-4 text-cyan-400" />
              <span className="text-xs font-mono text-stone-400 uppercase">Relative Humidity</span>
            </div>
            <PulseDot color="#06b6d4" />
          </div>
          <div className="flex items-end justify-between">
            <div>
              <span className="text-3xl font-black text-white">{humidity}</span>
              <span className="text-sm text-stone-400 ml-1">%</span>
              <p className="text-[11px] text-rose-400 font-mono mt-0.5">⚠ Critical: &gt;82% triggers risk</p>
            </div>
            <Sparkline data={humidTrend} color="#06b6d4" />
          </div>
        </div>

        {/* Disease Risk Trend */}
        <div className="p-5 rounded-2xl border border-stone-800 card-hover anim-fadeInUp delay-300"
          style={{ background: 'linear-gradient(135deg, #1c1917, #221918)' }}>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-400" />
              <span className="text-xs font-mono text-stone-400 uppercase">Disease Risk Score</span>
            </div>
            <PulseDot color="#f43f5e" />
          </div>
          <div className="flex items-end justify-between">
            <div>
              <span className="text-3xl font-black text-rose-400">78</span>
              <span className="text-sm text-stone-400 ml-1">/ 100</span>
              <p className="text-[11px] text-rose-400 font-mono mt-0.5">HIGH • Brown Spot Primary</p>
            </div>
            <Sparkline data={riskTrend} color="#f43f5e" />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          ANIMATED PLATFORM STATS
          ══════════════════════════════════════════════════════ */}
      <section className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { value: nodesCount.toLocaleString(), label: 'Knowledge Nodes', suffix: '+', color: '#10b981', icon: <Network className="w-5 h-5" />, route: '/knowledge-graph' },
          { value: evidenceCount.toLocaleString(), label: 'Evidence Records', suffix: '', color: '#3b82f6', icon: <ShieldCheck className="w-5 h-5" />, route: '/evidence' },
          { value: languagesCount.toString(), label: 'Indian Languages', suffix: '', color: '#8b5cf6', icon: <Globe2 className="w-5 h-5" />, route: '/ai-farmer' },
          { value: sensorsCount.toString(), label: 'IoT Sensor Nodes', suffix: '', color: '#f59e0b', icon: <Zap className="w-5 h-5" />, route: '/sensor-monitor' },
        ].map((stat, i) => (
          <button
            key={i}
            onClick={() => navigateTo(stat.route)}
            className={`p-5 rounded-2xl border border-stone-800 text-left card-hover cursor-pointer anim-scalePop delay-${(i+1)*100}`}
            style={{ background: `linear-gradient(135deg, #1c1917, ${stat.color}18)` }}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: `${stat.color}20`, color: stat.color }}>
                {stat.icon}
              </div>
              <ChevronRight className="w-4 h-4 text-stone-600" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-white tracking-tight" style={{ color: stat.color }}>
              {stat.value}{stat.suffix}
            </div>
            <div className="text-xs text-stone-400 mt-1 font-medium">{stat.label}</div>
          </button>
        ))}
      </section>

      {/* ══════════════════════════════════════════════════════
          THREE PILLAR CARDS
          ══════════════════════════════════════════════════════ */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-semibold">Core Architecture</span>
            <h2 className="text-title text-white mt-1">Engineered for Scientific Verifiability</h2>
          </div>
          <span className="text-xs text-stone-400">Never generic chatbot guessing. Always contextual evidence.</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            {
              badge: 'CONNECT', icon: <Network className="w-6 h-6" />, color: '#10b981',
              title: 'Semantic Knowledge Graph',
              desc: 'Interlinks 12,480 nodes spanning crop genomes, pathogen microclimates, soil chemistry, and verified field trials with explicit typed relationships.',
              cta: 'Explore Graph', route: '/knowledge-graph',
              stats: [{ label: 'Nodes', value: '12,480' }, { label: 'Edges', value: '28,640' }]
            },
            {
              badge: 'VERIFY', icon: <ShieldCheck className="w-6 h-6" />, color: '#3b82f6',
              title: 'Evidence & Provenance',
              desc: 'Every advisory references exact scientific literature, university trials, publication year, page numbers, and statistical reliability scores.',
              cta: 'View Provenance', route: '/evidence',
              stats: [{ label: 'Studies', value: '3,842' }, { label: 'Reliability', value: '96%' }]
            },
            {
              badge: 'PROTECT', icon: <Scale className="w-6 h-6" />, color: '#f59e0b',
              title: 'Conflict & Anomaly Quarantine',
              desc: 'Contradictory studies are retained, conditioned on microclimate. Erroneous sensor spikes are quarantined before contaminating the core graph.',
              cta: 'Inspect Engine', route: '/conflicts',
              stats: [{ label: 'Active Conflicts', value: '17' }, { label: 'Auto-Resolved', value: '234' }]
            },
          ].map((card, i) => (
            <div
              key={i}
              onClick={() => navigateTo(card.route)}
              className={`p-6 rounded-2xl border border-stone-800 cursor-pointer group flex flex-col justify-between card-hover anim-fadeInUp delay-${(i+1)*200}`}
              style={{ background: 'linear-gradient(160deg, #1c1917, #1a1a1a)' }}
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform"
                    style={{ background: `${card.color}15`, color: card.color, border: `1px solid ${card.color}30` }}>
                    {card.icon}
                  </div>
                  <span className="text-xs font-mono font-bold uppercase tracking-widest" style={{ color: card.color }}>
                    {card.badge}
                  </span>
                </div>

                <h3 className="text-base font-bold text-white mb-2">{card.title}</h3>
                <p className="text-xs text-stone-400 leading-relaxed mb-4">{card.desc}</p>

                {/* Mini stats */}
                <div className="grid grid-cols-2 gap-2 mb-4">
                  {card.stats.map((s, si) => (
                    <div key={si} className="p-2 rounded-xl text-center" style={{ background: `${card.color}08`, border: `1px solid ${card.color}15` }}>
                      <div className="text-sm font-bold" style={{ color: card.color }}>{s.value}</div>
                      <div className="text-[10px] text-stone-500 font-mono">{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center text-xs font-medium gap-1" style={{ color: card.color }}>
                <span>{card.cta}</span>
                <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          INTELLIGENCE PIPELINE (7 STEPS)
          ══════════════════════════════════════════════════════ */}
      <section className="p-6 sm:p-8 rounded-3xl border border-stone-800"
        style={{ background: 'linear-gradient(135deg, #111110, #0f1a12)' }}>
        <div className="text-center max-w-xl mx-auto mb-8">
          <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-semibold">Closed-Loop Workflow</span>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-1">
            How AgroNexus Generates Explainable Intelligence
          </h2>
        </div>

        {/* Steps with connecting arrows */}
        <div className="flex items-start justify-center flex-wrap gap-y-4">
          {[
            { step: '01', title: 'Location', desc: 'State & District', icon: <MapPin className="w-4 h-4" />, color: '#8b5cf6' },
            { step: '02', title: 'Telemetry', desc: 'IoT & Weather', icon: <Activity className="w-4 h-4" />, color: '#06b6d4' },
            { step: '03', title: 'Multimodal', desc: 'Voice & Camera', icon: <Microscope className="w-4 h-4" />, color: '#3b82f6' },
            { step: '04', title: 'Knowledge', desc: 'Graph Query', icon: <Network className="w-4 h-4" />, color: '#10b981' },
            { step: '05', title: 'Validation', desc: 'Evidence Check', icon: <ShieldCheck className="w-4 h-4" />, color: '#10b981' },
            { step: '06', title: 'Reasoning', desc: 'Hybrid AI Rules', icon: <Sparkles className="w-4 h-4" />, color: '#f59e0b' },
            { step: '07', title: 'Explanation', desc: '12-Lang Voice', icon: <Globe2 className="w-4 h-4" />, color: '#f43f5e' },
          ].map((item, idx) => (
            <React.Fragment key={idx}>
              <div className={`flex flex-col items-center gap-2 w-24 anim-fadeInUp delay-${(idx+1)*100}`}>
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg"
                  style={{ background: `${item.color}18`, border: `1px solid ${item.color}40`, color: item.color }}>
                  {item.icon}
                </div>
                <div className="text-center">
                  <div className="text-[10px] font-mono text-stone-500 font-bold">{item.step}</div>
                  <div className="text-xs font-bold text-stone-200">{item.title}</div>
                  <div className="text-[10px] text-stone-500">{item.desc}</div>
                </div>
              </div>
              {idx < 6 && (
                <div className="flex items-center self-start pt-4">
                  <ChevronRight className="w-4 h-4 text-stone-700" />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          QUICK LAUNCH GRID
          ══════════════════════════════════════════════════════ */}
      <section className="space-y-4">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-semibold">Quick Launch</span>
          <h2 className="text-title text-white mt-1">Platform Modules</h2>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { icon: <Microscope className="w-5 h-5 text-rose-400" />, title: 'Multi-modal Field Analysis', desc: 'Combine leaf photo, voice, and sensor data.', route: '/field-analysis', color: '#f43f5e', badge: 'Camera + Voice' },
            { icon: <Sprout className="w-5 h-5 text-emerald-400" />, title: 'AI Crop Suggestor', desc: '7-factor weighted agronomic scoring.', route: '/crop-suggestor', color: '#10b981', badge: '7-Factor AI' },
            { icon: <CloudSun className="w-5 h-5 text-cyan-400" />, title: 'Environment Analyzer', desc: '9-factor validation with stress warnings.', route: '/environment-analyzer', color: '#06b6d4', badge: '9-Factor Validation' },
            { icon: <Bot className="w-5 h-5 text-purple-400" />, title: 'Farmer AI Companion', desc: 'Speak in 12 Indian languages with voice output.', route: '/ai-farmer', color: '#8b5cf6', badge: '12 Languages' },
            { icon: <Network className="w-5 h-5 text-emerald-400" />, title: 'Knowledge Graph', desc: '12,480-node semantic network explorer.', route: '/knowledge-graph', color: '#10b981', badge: 'Interactive' },
            { icon: <ShieldCheck className="w-5 h-5 text-blue-400" />, title: 'Evidence Explorer', desc: 'Peer-reviewed study provenance chain.', route: '/evidence', color: '#3b82f6', badge: '3,842 Studies' },
            { icon: <Scale className="w-5 h-5 text-amber-400" />, title: 'Conflict Center', desc: 'Research disagreement resolution engine.', route: '/conflicts', color: '#f59e0b', badge: '17 Active' },
            { icon: <Activity className="w-5 h-5 text-teal-400" />, title: 'Sensor Monitor', desc: 'IoT telemetry validation & quarantine.', route: '/sensor-monitor', color: '#14b8a6', badge: 'Live' },
          ].map((item, i) => (
            <button
              key={i}
              onClick={() => navigateTo(item.route)}
              className={`p-5 rounded-2xl border border-stone-800 text-left card-hover cursor-pointer group anim-fadeInUp delay-${((i % 4) + 1) * 100}`}
              style={{ background: 'linear-gradient(160deg, #1c1917, #171717)' }}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform"
                  style={{ background: `${item.color}15`, border: `1px solid ${item.color}25` }}>
                  {item.icon}
                </div>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full" 
                  style={{ background: `${item.color}15`, color: item.color, border: `1px solid ${item.color}25` }}>
                  {item.badge}
                </span>
              </div>
              <h4 className="text-sm font-bold text-white mb-1 group-hover:text-emerald-300 transition-colors">{item.title}</h4>
              <p className="text-xs text-stone-400">{item.desc}</p>
            </button>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          BOTTOM PROOF BAR
          ══════════════════════════════════════════════════════ */}
      <section className="p-6 rounded-2xl border border-emerald-900/30"
        style={{ background: 'linear-gradient(135deg, rgba(6,78,59,0.2), rgba(0,0,0,0))' }}>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          {[
            { icon: <CheckCircle className="w-4 h-4 text-emerald-400" />, text: '100% Deterministic — No Hallucination' },
            { icon: <CheckCircle className="w-4 h-4 text-emerald-400" />, text: 'Every Advisory Has a Scientific Source' },
            { icon: <CheckCircle className="w-4 h-4 text-emerald-400" />, text: 'Corrupt Data Quarantined Automatically' },
            { icon: <CheckCircle className="w-4 h-4 text-emerald-400" />, text: 'Works in 12 Indian Languages + Voice' },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              {item.icon}
              <span className="text-xs text-stone-300 font-medium leading-snug">{item.text}</span>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};
