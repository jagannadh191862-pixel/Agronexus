import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { SUPPORTED_LANGUAGES } from '../i18n/translations';
import { Settings as SettingsIcon, Globe, Sliders, Bell, HardDrive, ShieldCheck, Check } from 'lucide-react';

export const Settings: React.FC = () => {
  const { language, setLanguage } = useApp();
  const [unitSystem, setUnitSystem] = useState<'Metric' | 'Imperial'>('Metric');
  const [anomalySensitivity, setAnomalySensitivity] = useState<string>('Standard');
  const [speechRate, setSpeechRate] = useState<number>(1.0);
  const [offlineCache, setOfflineCache] = useState<boolean>(true);
  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);

  const handleSave = () => {
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-16">
      
      {/* Header */}
      <div className="border-b border-stone-800 pb-5">
        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2">
          <SettingsIcon className="w-7 h-7 text-emerald-400" />
          <span>Platform Preferences &amp; Telemetry Gatekeeper</span>
        </h1>
        <p className="text-xs text-stone-300 mt-1">
          Configure regional units, voice synthesis speed, and sensor anomaly sensitivity thresholds.
        </p>
      </div>

      <div className="p-6 rounded-3xl bg-stone-900 border border-stone-800 space-y-6">
        
        {/* Language Selection */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-stone-200 flex items-center gap-2">
            <Globe className="w-4 h-4 text-emerald-400" />
            <span>Primary Interface &amp; Voice Language</span>
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {SUPPORTED_LANGUAGES.map(l => (
              <button
                key={l.code}
                onClick={() => setLanguage(l.code)}
                className={`p-2.5 rounded-xl text-xs font-medium border text-left transition-colors cursor-pointer ${
                  language === l.code
                    ? 'bg-emerald-600 border-emerald-500 text-white font-bold'
                    : 'bg-stone-950 border-stone-800 text-stone-400 hover:text-stone-200'
                }`}
              >
                <div>{l.nativeName}</div>
                <div className="text-[10px] opacity-75">{l.name}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Unit System */}
        <div className="pt-4 border-t border-stone-800 flex items-center justify-between">
          <div>
            <h4 className="text-sm font-bold text-white">Measurement Units</h4>
            <p className="text-xs text-stone-300">Choose between Metric (°C, mm, kg/ha) or Imperial</p>
          </div>
          <div className="flex rounded-xl bg-stone-950 p-1 border border-stone-800">
            {(['Metric', 'Imperial'] as const).map(u => (
              <button
                key={u}
                onClick={() => setUnitSystem(u)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer ${
                  unitSystem === u ? 'bg-emerald-600 text-white' : 'text-stone-400 hover:text-white'
                }`}
              >
                {u}
              </button>
            ))}
          </div>
        </div>

        {/* Anomaly Detection Sensitivity */}
        <div className="pt-4 border-t border-stone-800 flex items-center justify-between">
          <div>
            <h4 className="text-sm font-bold text-white">Sensor Anomaly Gatekeeper Sensitivity</h4>
            <p className="text-xs text-stone-300">Strictness of physical boundary checks before data enters the graph</p>
          </div>
          <select
            value={anomalySensitivity}
            onChange={(e) => setAnomalySensitivity(e.target.value)}
            className="bg-stone-950 border border-stone-800 text-stone-200 text-xs rounded-xl px-3 py-2 cursor-pointer"
          >
            <option value="Conservative">Conservative (±10% Tolerance)</option>
            <option value="Standard">Standard (Thermodynamic Envelope)</option>
            <option value="Permissive">Permissive (Broad Agricultural Range)</option>
          </select>
        </div>

        {/* Speech Synthesis Rate */}
        <div className="pt-4 border-t border-stone-800 space-y-2">
          <div className="flex justify-between text-xs">
            <span className="font-semibold text-white">Text-to-Speech Speed Rate:</span>
            <span className="font-mono text-emerald-400 font-bold">{speechRate}x</span>
          </div>
          <input
            type="range"
            min="0.75"
            max="1.5"
            step="0.05"
            value={speechRate}
            onChange={(e) => setSpeechRate(parseFloat(e.target.value))}
            className="w-full accent-emerald-500 cursor-pointer"
          />
        </div>

        {/* Offline Cache Toggle */}
        <div className="pt-4 border-t border-stone-800 flex items-center justify-between">
          <div>
            <h4 className="text-sm font-bold text-white">Offline Rural Cache</h4>
            <p className="text-xs text-stone-300">Store crop recommendations and disease guides in local storage</p>
          </div>
          <input
            type="checkbox"
            checked={offlineCache}
            onChange={(e) => setOfflineCache(e.target.checked)}
            className="w-4 h-4 accent-emerald-500 cursor-pointer"
          />
        </div>

        {/* Save Button */}
        <div className="pt-4 flex justify-end">
          <button
            onClick={handleSave}
            className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md flex items-center gap-1.5 cursor-pointer"
          >
            {savedSuccess ? (
              <>
                <Check className="w-4 h-4" />
                <span>Preferences Saved!</span>
              </>
            ) : (
              <span>Save Preferences</span>
            )}
          </button>
        </div>

      </div>

    </div>
  );
};
