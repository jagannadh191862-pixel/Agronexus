import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CONFLICT_RECORDS } from '../data/evidence';
import { ConflictRecord } from '../types';
import { 
  Scale, AlertTriangle, CheckCircle2, Clock, 
  HelpCircle, ShieldCheck, ChevronRight, Layers, Info 
} from 'lucide-react';

export const ConflictCenter: React.FC = () => {
  const { navigateTo } = useApp();
  const [activeTab, setActiveTab] = useState<'ALL' | 'ACTIVE' | 'RESOLVED'>('ALL');
  const [selectedConflict, setSelectedConflict] = useState<ConflictRecord | null>(CONFLICT_RECORDS[0]);

  const filteredConflicts = CONFLICT_RECORDS.filter(c => {
    if (activeTab === 'ALL') return true;
    return c.status === activeTab;
  });

  return (
    <div className="space-y-8 pb-16">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-800 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2">
              <Scale className="w-7 h-7 text-amber-400" />
              <span>Scientific Conflict Resolution Center</span>
            </h1>
            <span className="px-2.5 py-0.5 rounded-full bg-amber-950 border border-amber-700/50 text-amber-300 text-[10px] font-mono uppercase">
              17 Active
            </span>
          </div>
          <p className="text-xs text-stone-300 mt-1">
            AgroNexus preserves contradictory research studies rather than deleting them. Disagreements are explained via microclimatic and soil parameters.
          </p>
        </div>

        {/* Status Metrics Bar */}
        <div className="flex items-center gap-2">
          <div className="px-3 py-1.5 rounded-xl bg-amber-950/60 border border-amber-700/40 text-xs">
            <span className="text-stone-400">Active: </span>
            <span className="font-bold text-amber-300">17</span>
          </div>
          <div className="px-3 py-1.5 rounded-xl bg-emerald-950/60 border border-emerald-700/40 text-xs">
            <span className="text-stone-400">Condition Resolved: </span>
            <span className="font-bold text-emerald-300">42</span>
          </div>
          <div className="px-3 py-1.5 rounded-xl bg-stone-900 border border-stone-800 text-xs">
            <span className="text-stone-400">Under Review: </span>
            <span className="font-bold text-stone-200">5</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-stone-800/80 pb-3">
        {(['ALL', 'ACTIVE', 'RESOLVED'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold cursor-pointer transition-colors ${
              activeTab === tab
                ? 'bg-amber-500 text-black'
                : 'bg-stone-900 text-stone-400 hover:text-white border border-stone-800'
            }`}
          >
            {tab === 'ALL' ? 'All Conflicts (64 Total)' : tab === 'ACTIVE' ? 'Active Disagreements (17)' : 'Resolved by Context (42)'}
          </button>
        ))}
      </div>

      {/* Main Conflict Cards Stream */}
      <div className="space-y-6">
        {filteredConflicts.map((conflict) => (
          <div
            key={conflict.id}
            className="p-6 rounded-3xl bg-stone-900 border border-stone-800 hover:border-amber-500/40 transition-all space-y-5"
          >
            {/* Top Bar: Subject & Status */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-800/80 pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-stone-950 text-amber-400 border border-stone-800 uppercase font-bold">
                    {conflict.id}
                  </span>
                  <span className="text-xs font-bold text-stone-300">{conflict.crop} • {conflict.topic}</span>
                </div>
                <h3 className="text-lg font-bold text-white mt-1">{conflict.subject}</h3>
              </div>

              <div className="flex items-center gap-2">
                <span className={`text-[11px] font-mono px-2.5 py-1 rounded-full uppercase font-bold ${
                  conflict.status === 'ACTIVE' 
                    ? 'bg-amber-950/80 text-amber-300 border border-amber-700/50' 
                    : 'bg-emerald-950/80 text-emerald-300 border border-emerald-700/50'
                }`}>
                  {conflict.status}
                </span>
              </div>
            </div>

            {/* Two Opposing Sources Comparison Side-by-Side */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Source A: Proponent */}
              <div className="p-4 rounded-2xl bg-stone-950 border border-emerald-800/40 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-400 font-mono">
                    SOURCE A: {conflict.sourceA.stance}
                  </span>
                  <span className="text-xs font-mono text-stone-300">
                    Confidence: {(conflict.sourceA.confidence * 100).toFixed(0)}%
                  </span>
                </div>
                <p className="text-xs text-stone-200 leading-relaxed font-medium">
                  "{conflict.sourceA.claim}"
                </p>
                <div className="text-[11px] text-stone-300 pt-1">
                  {conflict.sourceA.source} ({conflict.sourceA.year})
                </div>
              </div>

              {/* Source B: Opponent */}
              <div className="p-4 rounded-2xl bg-stone-950 border border-rose-800/40 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-rose-400 font-mono">
                    SOURCE B: {conflict.sourceB.stance}
                  </span>
                  <span className="text-xs font-mono text-stone-300">
                    Confidence: {(conflict.sourceB.confidence * 100).toFixed(0)}%
                  </span>
                </div>
                <p className="text-xs text-stone-200 leading-relaxed font-medium">
                  "{conflict.sourceB.claim}"
                </p>
                <div className="text-[11px] text-stone-300 pt-1">
                  {conflict.sourceB.source} ({conflict.sourceB.year})
                </div>
              </div>

            </div>

            {/* Condition-Aware Context & Explanation */}
            <div className="p-4 rounded-2xl bg-stone-950/60 border border-stone-800 space-y-2 text-xs">
              <div className="flex items-center gap-1.5 text-amber-300 font-mono text-[11px] font-bold">
                <Info className="w-3.5 h-3.5" />
                <span>Environmental Discrepancy Driver: {conflict.environmentalContext}</span>
              </div>
              <p className="text-stone-300 leading-relaxed">
                {conflict.explanation}
              </p>
              {conflict.resolutionNote && (
                <div className="pt-2 text-emerald-300 text-[11px] font-medium flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>{conflict.resolutionNote}</span>
                </div>
              )}
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};
