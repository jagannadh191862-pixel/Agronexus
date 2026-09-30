import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { CROPS_DATA } from '../../data/crops';
import { DISEASES_DATA } from '../../data/diseases';
import { EVIDENCE_RECORDS } from '../../data/evidence';
import { INITIAL_SENSORS } from '../../data/sensors';
import { INDIAN_LOCATIONS } from '../../data/locations';
import { Search, X, Sprout, Bug, FileText, Cpu, MapPin, ArrowRight } from 'lucide-react';

export const GlobalSearchModal: React.FC = () => {
  const { isSearchModalOpen, setIsSearchModalOpen, navigateTo, setSelectedCrop, setSelectedState, setSelectedDistrict } = useApp();
  const [query, setQuery] = useState<string>('');

  const searchResults = useMemo(() => {
    if (!query.trim() || query.length < 2) return [];
    const q = query.toLowerCase().trim();
    const results: Array<{
      id: string;
      title: string;
      subtitle: string;
      category: 'crop' | 'disease' | 'evidence' | 'sensor' | 'location';
      action: () => void;
    }> = [];

    // Search Crops
    for (const crop of CROPS_DATA) {
      if (crop.name.toLowerCase().includes(q) || crop.category.toLowerCase().includes(q)) {
        results.push({
          id: `crop-${crop.id}`,
          title: crop.name,
          subtitle: `Crop (${crop.category}) • Optimal Temp ${crop.temperature.optimalMin}-${crop.temperature.optimalMax}°C`,
          category: 'crop',
          action: () => {
            setSelectedCrop(crop.name);
            navigateTo('/crop-suggestor');
            setIsSearchModalOpen(false);
          }
        });
      }
    }

    // Search Diseases
    for (const disease of DISEASES_DATA) {
      if (disease.name.toLowerCase().includes(q) || disease.affectedCrops.some(c => c.toLowerCase().includes(q))) {
        results.push({
          id: `dis-${disease.id}`,
          title: disease.name,
          subtitle: `Pathology • Affects ${disease.affectedCrops.join(', ')}`,
          category: 'disease',
          action: () => {
            if (disease.affectedCrops[0]) setSelectedCrop(disease.affectedCrops[0]);
            navigateTo('/field-analysis');
            setIsSearchModalOpen(false);
          }
        });
      }
    }

    // Search Evidence
    for (const ev of EVIDENCE_RECORDS) {
      if (ev.claim.toLowerCase().includes(q) || ev.source.toLowerCase().includes(q) || ev.documentTitle.toLowerCase().includes(q)) {
        results.push({
          id: `ev-${ev.id}`,
          title: ev.claim.slice(0, 60) + '...',
          subtitle: `${ev.source} (${ev.year}) • Reliability ${ev.reliabilityScore}%`,
          category: 'evidence',
          action: () => {
            navigateTo('/evidence');
            setIsSearchModalOpen(false);
          }
        });
      }
    }

    // Search Sensors
    for (const sensor of INITIAL_SENSORS) {
      if (sensor.name.toLowerCase().includes(q) || sensor.id.toLowerCase().includes(q) || sensor.parameter.toLowerCase().includes(q)) {
        results.push({
          id: `sensor-${sensor.id}`,
          title: `${sensor.id}: ${sensor.name}`,
          subtitle: `${sensor.parameter} • ${sensor.location}`,
          category: 'sensor',
          action: () => {
            navigateTo('/sensor-monitor');
            setIsSearchModalOpen(false);
          }
        });
      }
    }

    // Search Locations (States & Districts)
    for (const [state, districts] of Object.entries(INDIAN_LOCATIONS)) {
      if (state.toLowerCase().includes(q)) {
        results.push({
          id: `loc-state-${state}`,
          title: state,
          subtitle: `Indian State/UT • ${districts.length} Districts`,
          category: 'location',
          action: () => {
            setSelectedState(state);
            navigateTo('/field-analysis');
            setIsSearchModalOpen(false);
          }
        });
      }
      for (const dist of districts) {
        if (dist.toLowerCase().includes(q)) {
          results.push({
            id: `loc-dist-${state}-${dist}`,
            title: `${dist}, ${state}`,
            subtitle: `District in ${state}`,
            category: 'location',
            action: () => {
              setSelectedState(state);
              setSelectedDistrict(dist);
              navigateTo('/field-analysis');
              setIsSearchModalOpen(false);
            }
          });
        }
      }
    }

    return results.slice(0, 10);
  }, [query]);

  if (!isSearchModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 px-4 bg-stone-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-2xl bg-stone-900 border border-stone-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-stone-800 gap-3">
          <Search className="w-5 h-5 text-emerald-400 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search crops, diseases, evidence, sensors, districts..."
            className="flex-1 bg-transparent text-white placeholder-stone-400 text-sm focus:outline-none"
            autoFocus
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-stone-400 hover:text-white text-xs px-2 py-1 rounded bg-stone-800"
            >
              Clear
            </button>
          )}
          <button
            onClick={() => setIsSearchModalOpen(false)}
            className="p-1 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto p-2 divide-y divide-stone-800/60">
          {query.trim().length < 2 ? (
            <div className="py-8 text-center text-stone-400 text-xs">
              Type at least 2 characters to search across crops, diseases, scientific papers, sensors, and districts.
            </div>
          ) : searchResults.length === 0 ? (
            <div className="py-8 text-center text-stone-400 text-xs">
              No matching agricultural knowledge found for "{query}".
            </div>
          ) : (
            searchResults.map((item) => (
              <button
                key={item.id}
                onClick={item.action}
                className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-stone-800/80 transition-colors flex items-center justify-between group cursor-pointer"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="p-2 rounded-lg bg-stone-800 text-emerald-400 group-hover:bg-emerald-950 group-hover:text-emerald-300">
                    {item.category === 'crop' && <Sprout className="w-4 h-4" />}
                    {item.category === 'disease' && <Bug className="w-4 h-4" />}
                    {item.category === 'evidence' && <FileText className="w-4 h-4" />}
                    {item.category === 'sensor' && <Cpu className="w-4 h-4" />}
                    {item.category === 'location' && <MapPin className="w-4 h-4" />}
                  </div>
                  <div className="truncate">
                    <div className="text-sm font-medium text-stone-100 group-hover:text-emerald-300 truncate">
                      {item.title}
                    </div>
                    <div className="text-xs text-stone-400 truncate">
                      {item.subtitle}
                    </div>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-stone-500 group-hover:text-emerald-400 group-hover:translate-x-1 transition-transform shrink-0" />
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
