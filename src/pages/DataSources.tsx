import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { DataSourceRecord } from '../types';
import { 
  Database, Plus, ShieldCheck, RefreshCw, 
  ExternalLink, Check, X, BookOpen, Cloud, Cpu, Building 
} from 'lucide-react';

export const DataSources: React.FC = () => {
  const { dataSources, addDataSource } = useApp();
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);

  // Form State
  const [name, setName] = useState<string>('');
  const [type, setType] = useState<DataSourceRecord['type']>('Research papers');
  const [url, setUrl] = useState<string>('');
  const [reliability, setReliability] = useState<number>(95);
  const [description, setDescription] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    addDataSource({
      name: name.trim(),
      type,
      url: url.trim() || 'https://agronexus.internal/custom-source',
      reliability,
      status: 'ACTIVE',
      description: description.trim() || 'Custom registered institutional data pipeline.'
    });

    setName('');
    setUrl('');
    setDescription('');
    setIsAddModalOpen(false);
  };

  const getSourceIcon = (type: DataSourceRecord['type']) => {
    switch (type) {
      case 'Research papers': return <BookOpen className="w-5 h-5 text-emerald-400" />;
      case 'Weather service': return <Cloud className="w-5 h-5 text-cyan-400" />;
      case 'IoT Sensor Grid': return <Cpu className="w-5 h-5 text-teal-400" />;
      case 'Government Body': return <Building className="w-5 h-5 text-purple-400" />;
      default: return <Database className="w-5 h-5 text-blue-400" />;
    }
  };

  return (
    <div className="space-y-8 pb-16">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-800 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2">
              <Database className="w-7 h-7 text-emerald-400" />
              <span>Verified Agricultural Data Feeds &amp; Repositories</span>
            </h1>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-950 border border-emerald-700/50 text-emerald-300 text-[10px] font-mono uppercase">
              {dataSources.length} Pipelines Synced
            </span>
          </div>
          <p className="text-xs text-stone-300 mt-1">
            Certified ingestion gateways streaming national agricultural germplasm, radar forecasts, and ground truth telemetry.
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="self-start md:self-auto px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs flex items-center gap-1.5 cursor-pointer shadow-lg shadow-emerald-950 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add Data Source</span>
        </button>
      </div>

      {/* Data Source Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {dataSources.map((source) => (
          <div
            key={source.id}
            className="p-6 rounded-3xl bg-stone-900 border border-stone-800 hover:border-emerald-500/40 transition-all flex flex-col justify-between group"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div className="w-10 h-10 rounded-xl bg-stone-950 border border-stone-800 flex items-center justify-center">
                  {getSourceIcon(source.type)}
                </div>

                <div className="text-right">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800/40 uppercase font-bold">
                    {source.status}
                  </span>
                  <span className="text-[10px] text-stone-400 font-mono block mt-1">
                    {source.recordsCount.toLocaleString()} Records
                  </span>
                </div>
              </div>

              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400">
                  {source.type}
                </span>
                <h3 className="text-base font-bold text-white mt-0.5 leading-snug group-hover:text-emerald-300 transition-colors">
                  {source.name}
                </h3>
              </div>

              <p className="text-xs text-stone-300 leading-relaxed">
                {source.description}
              </p>
            </div>

            <div className="pt-4 mt-4 border-t border-stone-800/80 flex items-center justify-between text-xs text-stone-400">
              <span className="font-mono text-emerald-400">Reliability: {source.reliability}%</span>
              <a
                href={source.url}
                target="_blank"
                rel="noreferrer"
                className="text-stone-300 hover:text-white flex items-center gap-1 cursor-pointer"
              >
                <span>Gateway</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Add Data Source Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/85 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-lg bg-stone-900 border border-stone-800 rounded-3xl shadow-2xl p-6 sm:p-8 space-y-5">
            <div className="flex items-center justify-between border-b border-stone-800 pb-3">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Plus className="w-5 h-5 text-emerald-400" />
                <span>Register Agricultural Data Source</span>
              </h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1 rounded-lg text-stone-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-stone-300 block mb-1">
                  Source Name / Institute *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. ICRISAT Pigeonpea Phenomics Database"
                  className="w-full bg-stone-950 border border-stone-800 text-stone-100 text-xs rounded-xl p-3 focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-300 block mb-1">
                  Source Category
                </label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value as DataSourceRecord['type'])}
                  className="w-full bg-stone-950 border border-stone-800 text-stone-200 text-xs rounded-xl p-2.5 focus:border-emerald-500"
                >
                  <option value="Research papers">Research papers</option>
                  <option value="Weather service">Weather service</option>
                  <option value="Field observations">Field observations</option>
                  <option value="IoT Sensor Grid">IoT Sensor Grid</option>
                  <option value="Government Body">Government Body</option>
                  <option value="Agricultural Institute">Agricultural Institute</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-300 block mb-1">
                  API Endpoint / Reference URL
                </label>
                <input
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://api.institution.org/v1/telemetry"
                  className="w-full bg-stone-950 border border-stone-800 text-stone-100 text-xs rounded-xl p-3 focus:border-emerald-500"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-stone-300 font-semibold">Reliability Index:</span>
                  <span className="font-mono text-emerald-400 font-bold">{reliability}%</span>
                </div>
                <input
                  type="range"
                  min="70"
                  max="100"
                  value={reliability}
                  onChange={(e) => setReliability(parseInt(e.target.value))}
                  className="w-full accent-emerald-500 cursor-pointer"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-300 block mb-1">
                  Description &amp; Metadata
                </label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe data frequency, sample size, or geographic coverage..."
                  className="w-full bg-stone-950 border border-stone-800 text-stone-100 text-xs rounded-xl p-3 focus:border-emerald-500"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-stone-400 hover:text-white text-xs font-medium cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md cursor-pointer"
                >
                  Register Source
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
