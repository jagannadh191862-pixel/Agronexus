import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { t } from '../i18n/translations';
import { EVIDENCE_RECORDS } from '../data/evidence';
import { EvidenceRecord } from '../types';
import { 
  FileCheck, Search, Filter, ShieldCheck, Calendar, 
  ExternalLink, X, BookOpen, Clock, ChevronRight 
} from 'lucide-react';

export const EvidenceExplorer: React.FC = () => {
  const { language, navigateTo } = useApp();

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCropFilter, setSelectedCropFilter] = useState<string>('all');
  const [selectedTypeFilter, setSelectedTypeFilter] = useState<string>('all');
  const [activeProvenance, setActiveProvenance] = useState<EvidenceRecord | null>(null);

  // Filtered evidence records
  const filteredRecords = useMemo(() => {
    return EVIDENCE_RECORDS.filter(record => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = !q || (
        record.claim.toLowerCase().includes(q) ||
        record.source.toLowerCase().includes(q) ||
        record.documentTitle.toLowerCase().includes(q)
      );

      const matchesCrop = selectedCropFilter === 'all' || record.crop.toLowerCase() === selectedCropFilter.toLowerCase();
      const matchesType = selectedTypeFilter === 'all' || record.sourceType === selectedTypeFilter;

      return matchesSearch && matchesCrop && matchesType;
    });
  }, [searchQuery, selectedCropFilter, selectedTypeFilter]);

  return (
    <div className="space-y-8 pb-16">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-800 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2">
              <FileCheck className="w-7 h-7 text-emerald-400" />
              <span>Scientific Evidence &amp; Provenance Explorer</span>
            </h1>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-950 border border-emerald-700/50 text-emerald-300 text-[10px] font-mono uppercase">
              3,842 Studies
            </span>
          </div>
          <p className="text-xs text-stone-300 mt-1">
            Every agricultural recommendation is anchored to peer-reviewed ICAR publications and field trial registries.
          </p>
        </div>

        <button
          onClick={() => navigateTo('/conflicts')}
          className="self-start md:self-auto px-4 py-2 rounded-xl border border-stone-700 hover:border-amber-500/50 text-stone-300 hover:text-white text-xs font-medium flex items-center gap-1.5 transition-colors"
        >
          <span>View 17 Active Conflicts</span>
          <ChevronRight className="w-3.5 h-3.5 text-amber-400" />
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl bg-stone-900 border border-stone-800 grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-3 text-stone-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search claims, researchers, ICAR bulletins..."
            className="w-full bg-stone-950 border border-stone-800 text-stone-200 text-xs rounded-xl pl-9 pr-3 py-2.5 focus:border-emerald-500"
          />
        </div>

        <div>
          <select
            value={selectedCropFilter}
            onChange={(e) => setSelectedCropFilter(e.target.value)}
            className="w-full bg-stone-950 border border-stone-800 text-stone-200 text-xs rounded-xl px-3 py-2.5 focus:border-emerald-500 cursor-pointer"
          >
            <option value="all">All Crops (Paddy, Cotton, Tomato, Groundnut, etc.)</option>
            <option value="paddy">Paddy (Rice)</option>
            <option value="cotton">Cotton</option>
            <option value="tomato">Tomato</option>
            <option value="chilli">Chilli</option>
            <option value="groundnut">Groundnut</option>
          </select>
        </div>

        <div>
          <select
            value={selectedTypeFilter}
            onChange={(e) => setSelectedTypeFilter(e.target.value)}
            className="w-full bg-stone-950 border border-stone-800 text-stone-200 text-xs rounded-xl px-3 py-2.5 focus:border-emerald-500 cursor-pointer"
          >
            <option value="all">All Source Types</option>
            <option value="ICAR Research Bulletin">ICAR Research Bulletin</option>
            <option value="Peer-reviewed Journal">Peer-reviewed Journal</option>
            <option value="Agricultural University">Agricultural University</option>
            <option value="Field Trial">Field Trial</option>
            <option value="Govt Advisory">Govt Advisory</option>
          </select>
        </div>
      </div>

      {/* Evidence Cards List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {filteredRecords.map((record) => (
          <div
            key={record.id}
            className="p-6 rounded-3xl bg-stone-900 border border-stone-800 hover:border-emerald-500/50 transition-all flex flex-col justify-between group"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-stone-950 text-emerald-400 border border-stone-800 font-bold uppercase">
                    {record.id}
                  </span>
                  <span className="text-xs font-semibold text-stone-300">
                    {record.crop} {record.disease ? `• ${record.disease}` : ''}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-emerald-400">
                    {(record.confidence * 100).toFixed(0)}% Conf
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800/40">
                    {record.status}
                  </span>
                </div>
              </div>

              {/* Claim Body */}
              <h3 className="text-sm font-bold text-white leading-relaxed group-hover:text-emerald-300 transition-colors">
                "{record.claim}"
              </h3>

              {/* Publication Context */}
              <div className="text-xs text-stone-400 space-y-1 pt-1">
                <div className="flex items-center gap-1.5 text-stone-300">
                  <BookOpen className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span className="truncate">{record.source}</span>
                </div>
                <div className="flex items-center justify-between text-[11px]">
                  <span>{record.sourceType} • {record.year}</span>
                  <span className="text-emerald-400/90 font-mono">Reliability: {record.reliabilityScore}%</span>
                </div>
              </div>
            </div>

            {/* Card Footer Button: View Provenance */}
            <div className="pt-4 mt-4 border-t border-stone-800/80 flex items-center justify-between">
              <button
                onClick={() => setActiveProvenance(record)}
                className="px-4 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>{t('action.viewProvenance', language)}</span>
              </button>

              <span className="text-[10px] font-mono text-stone-500">
                DOI: {record.doi}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Provenance Modal / Deep Inspection Drawer */}
      {activeProvenance && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/85 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-2xl bg-stone-900 border border-stone-800 rounded-3xl shadow-2xl p-6 sm:p-8 space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between border-b border-stone-800 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-400" />
                  <span className="text-xs font-mono uppercase text-emerald-400 font-bold">
                    Cryptographic Provenance Certificate
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white mt-1">
                  Evidence ID: {activeProvenance.id}
                </h3>
              </div>
              <button
                onClick={() => setActiveProvenance(null)}
                className="p-1 rounded-lg text-stone-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Provenance Tree Visual Sequence */}
            <div className="p-4 rounded-2xl bg-stone-950 border border-stone-800 space-y-3 font-mono text-xs">
              <div className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold w-24 shrink-0">Claim:</span>
                <span className="text-stone-200 font-sans">"{activeProvenance.claim}"</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold w-24 shrink-0">Document:</span>
                <span className="text-stone-300 font-sans">{activeProvenance.documentTitle}</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold w-24 shrink-0">Citation:</span>
                <span className="text-stone-300">{activeProvenance.pageOrSection}</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold w-24 shrink-0">Institution:</span>
                <span className="text-stone-300">{activeProvenance.source} ({activeProvenance.year})</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold w-24 shrink-0">Trial Type:</span>
                <span className="text-stone-300">{activeProvenance.evidenceType}</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold w-24 shrink-0">Reliability:</span>
                <span className="text-emerald-400 font-bold">{activeProvenance.reliabilityScore}% verified</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold w-24 shrink-0">DOI / ID:</span>
                <span className="text-stone-400 underline">{activeProvenance.doi}</span>
              </div>
            </div>

            {/* Extracted Excerpt from Original Text */}
            <div className="space-y-1.5">
              <span className="text-[11px] font-mono uppercase tracking-wider text-stone-400 font-bold block">
                Extracted Text Excerpt:
              </span>
              <div className="p-3.5 rounded-xl bg-stone-950/70 border border-stone-800 text-xs text-stone-300 leading-relaxed italic">
                "{activeProvenance.extractedText}"
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setActiveProvenance(null)}
                className="px-5 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold cursor-pointer"
              >
                Close Provenance Certificate
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
