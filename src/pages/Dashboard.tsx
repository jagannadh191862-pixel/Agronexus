import React from 'react';
import { useApp } from '../context/AppContext';
import { t } from '../i18n/translations';
import { 
  Network, FileCheck, Scale, Cpu, Sparkles, MapPin, 
  Sprout, AlertTriangle, ShieldCheck, ArrowRight, 
  Thermometer, Droplets, CloudRain, Activity, ExternalLink 
} from 'lucide-react';
import { SpeechSpeaker } from '../components/multimodal/SpeechSpeaker';

export const Dashboard: React.FC = () => {
  const { 
    language, navigateTo, selectedState, selectedDistrict, 
    selectedCrop, temperature, humidity, rainfall, 
    environmentAnalysis, diseaseAnalysis, cropRecommendations, 
    sensors, isQuarantined 
  } = useApp();

  const primaryDisease = diseaseAnalysis.potentialDiseases[0];
  const topCrop = cropRecommendations[0];

  return (
    <div className="space-y-8 pb-16">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-800 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              {t('dashboard.title', language)}
            </h1>
            <span className="px-2 py-0.5 rounded-full bg-emerald-950 border border-emerald-700/50 text-emerald-300 text-[10px] font-mono uppercase">
              Live Core
            </span>
          </div>
          <p className="text-xs text-stone-300 mt-1">
            {t('dashboard.subtitle', language)}
          </p>
        </div>

        {/* Quick Context Switch Button */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigateTo('/field-analysis')}
            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs shadow-md shadow-emerald-950 flex items-center gap-2 cursor-pointer transition-colors"
          >
            <span>Run Deep Field Analysis</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 5 Primary System Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
        {/* Metric 1 */}
        <div 
          onClick={() => navigateTo('/knowledge-graph')}
          className="p-4 rounded-2xl bg-stone-900 border border-stone-800 hover:border-emerald-500/40 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-mono text-stone-300 uppercase tracking-wider">
              {t('metric.knowledgeNodes', language)}
            </span>
            <Network className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-2xl font-black text-white">12,480</div>
          <span className="text-[10px] text-emerald-400/80 font-mono mt-0.5 block">
            +32 nodes indexed today
          </span>
        </div>

        {/* Metric 2 */}
        <div 
          onClick={() => navigateTo('/evidence')}
          className="p-4 rounded-2xl bg-stone-900 border border-stone-800 hover:border-emerald-500/40 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-mono text-stone-300 uppercase tracking-wider">
              {t('metric.evidenceRecords', language)}
            </span>
            <FileCheck className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-2xl font-black text-white">3,842</div>
          <span className="text-[10px] text-emerald-400/80 font-mono mt-0.5 block">
            100% Provenance verified
          </span>
        </div>

        {/* Metric 3 */}
        <div 
          onClick={() => navigateTo('/conflicts')}
          className="p-4 rounded-2xl bg-stone-900 border border-stone-800 hover:border-emerald-500/40 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-mono text-stone-300 uppercase tracking-wider">
              {t('metric.activeConflicts', language)}
            </span>
            <Scale className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-2xl font-black text-amber-400">17</div>
          <span className="text-[10px] text-amber-400/80 font-mono mt-0.5 block">
            Condition-conditioned
          </span>
        </div>

        {/* Metric 4 */}
        <div 
          onClick={() => navigateTo('/sensor-monitor')}
          className="p-4 rounded-2xl bg-stone-900 border border-stone-800 hover:border-emerald-500/40 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-mono text-stone-300 uppercase tracking-wider">
              {t('metric.sensorHealth', language)}
            </span>
            <Cpu className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
          </div>
          <div className={`text-2xl font-black ${isQuarantined ? 'text-amber-400' : 'text-emerald-400'}`}>
            {isQuarantined ? '87.5%' : '96.8%'}
          </div>
          <span className="text-[10px] text-stone-300 font-mono mt-0.5 block">
            {isQuarantined ? '1 node quarantined' : '8/8 sensors healthy'}
          </span>
        </div>

        {/* Metric 5 */}
        <div 
          onClick={() => navigateTo('/analytics')}
          className="p-4 rounded-2xl bg-stone-900 border border-stone-800 hover:border-emerald-500/40 transition-all cursor-pointer group col-span-2 sm:col-span-1"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-mono text-stone-300 uppercase tracking-wider">
              {t('metric.knowledgeQuality', language)}
            </span>
            <Sparkles className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-2xl font-black text-white">94.2%</div>
          <span className="text-[10px] text-emerald-400/80 font-mono mt-0.5 block">
            Prototype Benchmark
          </span>
        </div>
      </div>

      {/* Current Field Context Banner */}
      <div className="p-5 rounded-3xl bg-gradient-to-r from-stone-900 via-stone-900 to-emerald-950/40 border border-stone-800 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 uppercase tracking-wider">
            <MapPin className="w-3.5 h-3.5" />
            <span>Active Field Station Telemetry</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white">
            {selectedDistrict}, {selectedState} • {selectedCrop}
          </h2>
          <div className="flex flex-wrap items-center gap-3 pt-1 text-xs text-stone-300">
            <span className="flex items-center gap-1">
              <Thermometer className="w-3.5 h-3.5 text-amber-400" /> {temperature}°C
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Droplets className="w-3.5 h-3.5 text-cyan-400" /> {humidity}% RH
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <CloudRain className="w-3.5 h-3.5 text-blue-400" /> {rainfall} mm
            </span>
          </div>
        </div>

        {/* Live Diagnostics Pill Indicators */}
        <div className="grid grid-cols-3 gap-2.5 sm:gap-3 shrink-0">
          <div className="p-3 rounded-2xl bg-stone-950/80 border border-stone-800 text-center">
            <span className="text-[10px] font-mono text-stone-300 uppercase block">Environment</span>
            <span className="text-base font-bold text-emerald-400 mt-0.5 block">
              {environmentAnalysis.overallScore}%
            </span>
            <span className="text-[9px] text-stone-300 uppercase">{environmentAnalysis.status}</span>
          </div>

          <div className="p-3 rounded-2xl bg-stone-950/80 border border-stone-800 text-center">
            <span className="text-[10px] font-mono text-stone-300 uppercase block">Disease Risk</span>
            <span className={`text-base font-bold mt-0.5 block ${
              diseaseAnalysis.overallRisk === 'HIGH' || diseaseAnalysis.overallRisk === 'CRITICAL' ? 'text-rose-400' : 'text-emerald-400'
            }`}>
              {diseaseAnalysis.overallRisk}
            </span>
            <span className="text-[9px] text-stone-300 uppercase truncate">
              {primaryDisease?.disease.name || 'Normal'}
            </span>
          </div>

          <div className="p-3 rounded-2xl bg-stone-950/80 border border-stone-800 text-center">
            <span className="text-[10px] font-mono text-stone-300 uppercase block">Sensor Grid</span>
            <span className={`text-base font-bold mt-0.5 block ${isQuarantined ? 'text-amber-400' : 'text-emerald-400'}`}>
              {isQuarantined ? 'Quarantine' : '96.8%'}
            </span>
            <span className="text-[9px] text-stone-300 uppercase">
              {isQuarantined ? 'Protected' : 'Nominal'}
            </span>
          </div>
        </div>
      </div>

      {/* Main Grid: Disease Risk Monitor & Crop Recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Left Column: Crop Disease & Pathogen Monitor */}
        <div className="p-6 rounded-3xl bg-stone-900 border border-stone-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-rose-400" />
                <h3 className="text-base font-bold text-white">Crop Pathology Risk Monitor</h3>
              </div>
              <span className="text-xs px-2.5 py-1 rounded-full bg-rose-950/70 text-rose-300 border border-rose-800/40 font-mono">
                {diseaseAnalysis.overallRisk} RISK
              </span>
            </div>

            {primaryDisease ? (
              <div className="p-4 rounded-2xl bg-stone-950/80 border border-stone-800 mb-4 space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="text-lg font-bold text-white">{primaryDisease.disease.name}</h4>
                    <p className="text-xs text-stone-300 italic">{primaryDisease.disease.scientificName}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xl font-black text-rose-400">
                      {(primaryDisease.confidence * 100).toFixed(0)}%
                    </span>
                    <span className="text-[10px] font-mono text-stone-300 block">Confidence</span>
                  </div>
                </div>

                <p className="text-xs text-stone-300 leading-relaxed">
                  {diseaseAnalysis.aiReasoningText}
                </p>

                {/* Factors checklist */}
                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-stone-800/80 text-[11px]">
                  <div className="flex items-center gap-1.5 text-stone-300">
                    <span className="w-2 h-2 rounded-full bg-rose-400" />
                    <span>Humidity: {humidity}% (Critical &gt;80%)</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-stone-300">
                    <span className="w-2 h-2 rounded-full bg-amber-400" />
                    <span>Temperature: {temperature}°C (Optimal match)</span>
                  </div>
                </div>
              </div>
            ) : null}

            <div className="flex items-center justify-between text-xs text-stone-300">
              <span>Scientific Evidence: {primaryDisease?.supportingEvidence.length || 2} supporting studies</span>
              <SpeechSpeaker text={diseaseAnalysis.aiReasoningText} />
            </div>
          </div>

          <div className="pt-4 mt-4 border-t border-stone-800 flex items-center justify-between">
            <button
              onClick={() => navigateTo('/field-analysis')}
              className="text-xs font-medium text-emerald-400 hover:text-emerald-300 flex items-center gap-1.5 cursor-pointer"
            >
              <span>View Full Pathological Diagnosis</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => navigateTo('/knowledge-graph')}
              className="text-xs text-stone-300 hover:text-white flex items-center gap-1 cursor-pointer"
            >
              <span>Graph Links</span>
              <ExternalLink className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Right Column: Agronomic Crop Recommendations */}
        <div className="p-6 rounded-3xl bg-stone-900 border border-stone-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Sprout className="w-5 h-5 text-emerald-400" />
                <h3 className="text-base font-bold text-white">Top Field Crop Suitability</h3>
              </div>
              <span className="text-xs font-mono text-emerald-400">7-Factor Weighted</span>
            </div>

            <div className="space-y-3 mb-4">
              {cropRecommendations.slice(0, 3).map((rec, idx) => (
                <div 
                  key={rec.crop.id}
                  className="p-3.5 rounded-2xl bg-stone-950/80 border border-stone-800 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-emerald-950 text-emerald-400 font-bold text-xs flex items-center justify-center border border-emerald-800/40">
                      0{idx + 1}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">{rec.crop.name}</h4>
                      <p className="text-[11px] text-stone-300">
                        {rec.crop.category} • {rec.suitabilityLevel}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-24 bg-stone-800 rounded-full h-2 overflow-hidden hidden sm:block">
                      <div 
                        className="bg-emerald-500 h-full rounded-full" 
                        style={{ width: `${rec.totalScore}%` }}
                      />
                    </div>
                    <span className="text-sm font-black text-emerald-400 w-10 text-right">
                      {rec.totalScore}%
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <p className="text-xs text-stone-300 leading-relaxed">
              Suitability is calculated from local soil texture, soil pH, hydrologic supply, 
              and seasonal temperature windows.
            </p>
          </div>

          <div className="pt-4 mt-4 border-t border-stone-800 flex items-center justify-between">
            <button
              onClick={() => navigateTo('/crop-suggestor')}
              className="text-xs font-medium text-emerald-400 hover:text-emerald-300 flex items-center gap-1.5 cursor-pointer"
            >
              <span>Explore Crop Suggestor &amp; Comparisons</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <span className="text-[11px] text-stone-300 font-mono">100% Deterministic</span>
          </div>
        </div>

      </div>

      {/* Bottom Section: Recent Evidence Activity & Telemetry Status */}
      <div className="p-6 rounded-3xl bg-stone-900 border border-stone-800">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <FileCheck className="w-5 h-5 text-emerald-400" />
            <h3 className="text-base font-bold text-white">Recent Evidence Activity &amp; Literature Feeds</h3>
          </div>
          <button
            onClick={() => navigateTo('/evidence')}
            className="text-xs text-emerald-400 hover:text-emerald-300 font-medium cursor-pointer"
          >
            View All 3,842 Records →
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-stone-950/70 border border-stone-800/80">
            <div className="flex items-center justify-between text-xs text-stone-300 mb-1.5">
              <span className="font-mono text-emerald-400">EVD-101 • ICAR-IIRR Hyderabad</span>
              <span>2023</span>
            </div>
            <p className="text-xs text-stone-200 font-medium leading-relaxed">
              &quot;Relative humidity (&gt;82%) combined with 28-32°C temperature significantly accelerates Bipolaris oryzae sporulation in Kharif Paddy.&quot;
            </p>
            <div className="mt-3 flex items-center justify-between text-[11px]">
              <span className="text-stone-300">Section 4.2 • Reliability 96%</span>
              <button 
                onClick={() => navigateTo('/evidence')}
                className="text-emerald-400 hover:underline cursor-pointer"
              >
                Inspect Provenance
              </button>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-stone-950/70 border border-stone-800/80">
            <div className="flex items-center justify-between text-xs text-stone-300 mb-1.5">
              <span className="font-mono text-amber-400">CONF-01 • Active Disagreement</span>
              <span>ICAR vs UAS Dharwad</span>
            </div>
            <p className="text-xs text-stone-200 font-medium leading-relaxed">
              "Copper Oxychloride efficacy against bacterial wilt in neutral soil (82%) drops below 34% in alkaline black soils (pH &gt; 7.8)."
            </p>
            <div className="mt-3 flex items-center justify-between text-[11px]">
              <span className="text-stone-300">Conditioned on soil pH</span>
              <button 
                onClick={() => navigateTo('/conflicts')}
                className="text-amber-400 hover:underline cursor-pointer"
              >
                View Disagreement
              </button>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};
