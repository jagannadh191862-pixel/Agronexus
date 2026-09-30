import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { t } from '../i18n/translations';
import { getStates, getDistricts } from '../data/locations';
import { CROPS_DATA } from '../data/crops';
import { SoilType, SeasonType, WaterAvailability } from '../types';
import { SpeechSpeaker } from '../components/multimodal/SpeechSpeaker';
import { 
  CloudSun, RefreshCw, CheckCircle2, AlertTriangle, 
  ArrowRight, ShieldCheck, Thermometer, Droplets, 
  CloudRain, Wind, Sparkles 
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const EnvironmentAnalyzer: React.FC = () => {
  const { 
    language, selectedState, setSelectedState, selectedDistrict, 
    setSelectedDistrict, selectedCrop, setSelectedCrop, selectedSoil, 
    setSelectedSoil, selectedSeason, setSelectedSeason, waterAvailability, 
    setWaterAvailability, temperature, setTemperature, humidity, setHumidity, 
    rainfall, setRainfall, soilPh, setSoilPh, environmentAnalysis, 
    runEnvironmentAnalysis, isAnalyzing, navigateTo 
  } = useApp();

  const [hasAnalyzed, setHasAnalyzed] = useState<boolean>(true);

  const states = getStates();
  const districts = getDistricts(selectedState);

  const handleRunAnalysis = () => {
    runEnvironmentAnalysis();
    setHasAnalyzed(true);
    setTimeout(() => {
      confetti({
        particleCount: 30,
        spread: 60,
        origin: { y: 0.6 }
      });
    }, 450);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-emerald-400 stroke-emerald-500';
    if (score >= 60) return 'text-teal-400 stroke-teal-500';
    if (score >= 45) return 'text-amber-400 stroke-amber-500';
    return 'text-rose-400 stroke-rose-500';
  };

  return (
    <div className="space-y-8 pb-16">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-800 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2">
              <CloudSun className="w-7 h-7 text-emerald-400" />
              <span>{t('env.title', language)}</span>
            </h1>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-950 border border-emerald-700/50 text-emerald-300 text-[10px] font-mono uppercase">
              9-Factor Engine
            </span>
          </div>
          <p className="text-xs text-stone-300 mt-1">
            {t('env.subtitle', language)}
          </p>
        </div>

        <button
          onClick={handleRunAnalysis}
          disabled={isAnalyzing}
          className="self-start md:self-auto px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-emerald-950 flex items-center gap-2 cursor-pointer transition-all active:scale-95"
        >
          {isAnalyzing ? (
            <>
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              <span>Validating Atmosphere...</span>
            </>
          ) : (
            <>
              <CloudSun className="w-3.5 h-3.5" />
              <span>{t('action.analyzeEnvironment', language)}</span>
            </>
          )}
        </button>
      </div>

      {/* Inputs Configuration Form */}
      <div className="p-6 rounded-3xl bg-stone-900 border border-stone-800 space-y-4">
        <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold block">
          Agro-Meteorological Telemetry Settings
        </span>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="text-xs font-semibold text-stone-300 block mb-1.5">State</label>
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="w-full bg-stone-950 border border-stone-800 text-stone-200 text-xs rounded-xl px-3 py-2.5 focus:border-emerald-500 cursor-pointer"
            >
              {states.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          <div>
            <label className="text-xs font-semibold text-stone-300 block mb-1.5">District</label>
            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="w-full bg-stone-950 border border-stone-800 text-stone-200 text-xs rounded-xl px-3 py-2.5 focus:border-emerald-500 cursor-pointer"
            >
              {districts.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>

          <div>
            <label className="text-xs font-semibold text-stone-300 block mb-1.5">Evaluated Crop</label>
            <select
              value={selectedCrop}
              onChange={(e) => setSelectedCrop(e.target.value)}
              className="w-full bg-stone-950 border border-stone-800 text-stone-200 text-xs rounded-xl px-3 py-2.5 focus:border-emerald-500 cursor-pointer font-bold text-emerald-400"
            >
              {CROPS_DATA.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
            </select>
          </div>

          <div>
            <label className="text-xs font-semibold text-stone-300 block mb-1.5">Soil Type</label>
            <select
              value={selectedSoil}
              onChange={(e) => setSelectedSoil(e.target.value as SoilType)}
              className="w-full bg-stone-950 border border-stone-800 text-stone-200 text-xs rounded-xl px-3 py-2.5 focus:border-emerald-500 cursor-pointer"
            >
              {['Loamy', 'Black', 'Red', 'Alluvial', 'Clay', 'Sandy', 'Laterite'].map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Sliders: Temp, Humidity, Rainfall, pH */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
          <div className="p-3 rounded-2xl bg-stone-950/70 border border-stone-800">
            <div className="flex justify-between text-xs mb-1">
              <span className="text-stone-300">Temperature:</span>
              <span className="font-mono text-emerald-400 font-bold">{temperature}°C</span>
            </div>
            <input
              type="range"
              min="10"
              max="45"
              step="0.5"
              value={temperature}
              onChange={(e) => setTemperature(parseFloat(e.target.value))}
              className="w-full accent-emerald-500 cursor-pointer"
            />
          </div>

          <div className="p-3 rounded-2xl bg-stone-950/70 border border-stone-800">
            <div className="flex justify-between text-xs mb-1">
              <span className="text-stone-300">Relative Humidity:</span>
              <span className="font-mono text-emerald-400 font-bold">{humidity}%</span>
            </div>
            <input
              type="range"
              min="20"
              max="100"
              step="1"
              value={humidity}
              onChange={(e) => setHumidity(parseInt(e.target.value))}
              className="w-full accent-emerald-500 cursor-pointer"
            />
          </div>

          <div className="p-3 rounded-2xl bg-stone-950/70 border border-stone-800">
            <div className="flex justify-between text-xs mb-1">
              <span className="text-stone-300">Annual Rainfall:</span>
              <span className="font-mono text-emerald-400 font-bold">{rainfall} mm</span>
            </div>
            <input
              type="range"
              min="200"
              max="2500"
              step="50"
              value={rainfall}
              onChange={(e) => setRainfall(parseInt(e.target.value))}
              className="w-full accent-emerald-500 cursor-pointer"
            />
          </div>

          <div className="p-3 rounded-2xl bg-stone-950/70 border border-stone-800">
            <div className="flex justify-between text-xs mb-1">
              <span className="text-stone-300">Soil pH Reaction:</span>
              <span className="font-mono text-emerald-400 font-bold">{soilPh}</span>
            </div>
            <input
              type="range"
              min="4.5"
              max="9.0"
              step="0.1"
              value={soilPh}
              onChange={(e) => setSoilPh(parseFloat(e.target.value))}
              className="w-full accent-emerald-500 cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* Analysis Results Display */}
      {hasAnalyzed && (
        <div className="space-y-6">
          
          {/* Main Suitability Gauge Card */}
          <div className="p-6 sm:p-8 rounded-3xl bg-stone-900 border border-stone-800 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Circular Gauge (5 cols) */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center p-4">
              <div className="relative w-48 h-48 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
                  <circle
                    cx="60"
                    cy="60"
                    r="50"
                    stroke="#1c1917"
                    strokeWidth="10"
                    fill="transparent"
                  />
                  <circle
                    cx="60"
                    cy="60"
                    r="50"
                    className={`transition-all duration-1000 ${getScoreColor(environmentAnalysis.overallScore)}`}
                    strokeWidth="10"
                    strokeDasharray={314}
                    strokeDashoffset={314 - (314 * environmentAnalysis.overallScore) / 100}
                    strokeLinecap="round"
                    fill="transparent"
                  />
                </svg>

                <div className="absolute flex flex-col items-center justify-center text-center">
                  <span className="text-4xl font-black text-white">
                    {environmentAnalysis.overallScore}%
                  </span>
                  <span className={`text-[11px] font-mono font-bold uppercase tracking-wider mt-0.5 ${
                    environmentAnalysis.overallScore >= 70 ? 'text-emerald-400' : 'text-amber-400'
                  }`}>
                    {environmentAnalysis.status}
                  </span>
                </div>
              </div>

              <span className="text-xs text-stone-300 mt-2 font-mono">
                {selectedCrop} Microclimate Index
              </span>
            </div>

            {/* AI Explanation & Key Alerts (7 cols) */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" /> Explainable Environmental Synthesis
                </span>
                <SpeechSpeaker text={environmentAnalysis.explanation} />
              </div>

              <div className="p-4 rounded-2xl bg-stone-950 border border-stone-800 text-xs sm:text-sm text-stone-200 leading-relaxed">
                {environmentAnalysis.explanation}
              </div>

              {/* Warnings List */}
              {environmentAnalysis.warnings.length > 0 && (
                <div className="space-y-2">
                  <span className="text-[11px] font-mono text-amber-400 uppercase tracking-wider font-semibold block">
                    Limiting Factors &amp; Environmental Alerts:
                  </span>
                  <div className="space-y-1.5">
                    {environmentAnalysis.warnings.map((warn, wIdx) => (
                      <div key={wIdx} className="p-2.5 rounded-xl bg-amber-950/40 border border-amber-800/40 text-xs text-amber-200 flex items-start gap-2">
                        <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                        <span>{warn}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="pt-2 flex items-center gap-3">
                <button
                  onClick={() => navigateTo('/field-analysis')}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-medium flex items-center gap-1.5 cursor-pointer shadow-md"
                >
                  <span>Check Disease Vulnerabilities</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>

          {/* 8-Factor Environmental Checklist Grid */}
          <div className="space-y-3">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <span>Factor-by-Factor Agronomic Checklist</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {environmentAnalysis.factors.map((factor, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-stone-900 border border-stone-800 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-white">{factor.name}</span>
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-bold ${
                        factor.isSuitable 
                          ? 'bg-emerald-950 text-emerald-300 border border-emerald-800/40' 
                          : 'bg-amber-950 text-amber-300 border border-amber-800/40'
                      }`}>
                        {factor.statusText}
                      </span>
                    </div>

                    <div className="text-lg font-black text-stone-100 mb-1">
                      {factor.inputValue}
                    </div>

                    <div className="text-[11px] text-stone-300">
                      Optimal: <span className="text-stone-300">{factor.optimalRange}</span>
                    </div>
                  </div>

                  {factor.warning && (
                    <p className="text-[10px] text-amber-300/90 mt-2.5 pt-2 border-t border-stone-800/60 leading-tight">
                      {factor.warning}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
