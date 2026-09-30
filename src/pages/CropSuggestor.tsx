import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { t } from '../i18n/translations';
import { getStates, getDistricts } from '../data/locations';
import { CropRecommendation, SeasonType, SoilType, WaterAvailability } from '../types';
import { 
  Sprout, RefreshCw, HelpCircle, Check, AlertCircle, 
  ArrowRight, Scale, X, Layers, Filter 
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const CropSuggestor: React.FC = () => {
  const { 
    language, selectedState, setSelectedState, selectedDistrict, 
    setSelectedDistrict, selectedSoil, setSelectedSoil, selectedSeason, 
    setSelectedSeason, waterAvailability, setWaterAvailability, 
    temperature, setTemperature, rainfall, setRainfall, soilPh, 
    setSoilPh, cropRecommendations, runCropSuggestions, isAnalyzing, 
    setSelectedCrop, navigateTo 
  } = useApp();

  const [activeBreakdownCrop, setActiveBreakdownCrop] = useState<CropRecommendation | null>(null);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState<boolean>(false);
  const [selectedForCompare, setSelectedForCompare] = useState<string[]>(['Paddy', 'Maize', 'Groundnut']);

  const states = getStates();
  const districts = getDistricts(selectedState);

  const handleSuggestClick = () => {
    runCropSuggestions();
    setTimeout(() => {
      confetti({
        particleCount: 35,
        spread: 70,
        origin: { y: 0.6 }
      });
    }, 500);
  };

  const toggleCompareCrop = (cropName: string) => {
    if (selectedForCompare.includes(cropName)) {
      if (selectedForCompare.length > 2) {
        setSelectedForCompare(selectedForCompare.filter(c => c !== cropName));
      }
    } else {
      if (selectedForCompare.length < 4) {
        setSelectedForCompare([...selectedForCompare, cropName]);
      }
    }
  };

  const comparedRecommendations = cropRecommendations.filter(r => 
    selectedForCompare.includes(r.crop.name)
  );

  return (
    <div className="space-y-8 pb-16">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-800 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2">
              <span>{t('cropSug.title', language)}</span>
            </h1>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-950 border border-emerald-700/50 text-emerald-300 text-[10px] font-mono uppercase">
              Weighted 7-Factor
            </span>
          </div>
          <p className="text-xs text-stone-300 mt-1">
            {t('cropSug.subtitle', language)}
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setIsCompareModalOpen(true)}
            className="px-4 py-2 rounded-xl border border-stone-700 hover:border-emerald-500/50 hover:bg-stone-800 text-stone-200 text-xs font-medium flex items-center gap-1.5 cursor-pointer transition-colors"
          >
            <Scale className="w-3.5 h-3.5 text-emerald-400" />
            <span>{t('action.compareCrops', language)}</span>
          </button>
        </div>
      </div>

      {/* Field Conditions Input Section */}
      <div className="p-6 rounded-3xl bg-stone-900 border border-stone-800 space-y-5">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider font-bold">
            Target Field Conditions
          </span>
          <span className="text-[11px] text-stone-400">
            Adjusting parameters dynamically re-weights crop rankings
          </span>
        </div>

        {/* Inputs Matrix */}
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
            <label className="text-xs font-semibold text-stone-300 block mb-1.5">Soil Type</label>
            <select
              value={selectedSoil}
              onChange={(e) => setSelectedSoil(e.target.value as SoilType)}
              className="w-full bg-stone-950 border border-stone-800 text-stone-200 text-xs rounded-xl px-3 py-2.5 focus:border-emerald-500 cursor-pointer"
            >
              {['Loamy', 'Black', 'Red', 'Alluvial', 'Clay', 'Sandy', 'Laterite'].map(s => (
                <option key={s} value={s}>{s} Soil</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs font-semibold text-stone-300 block mb-1.5">Cropping Season</label>
            <select
              value={selectedSeason}
              onChange={(e) => setSelectedSeason(e.target.value as SeasonType)}
              className="w-full bg-stone-950 border border-stone-800 text-stone-200 text-xs rounded-xl px-3 py-2.5 focus:border-emerald-500 cursor-pointer"
            >
              {['Kharif', 'Rabi', 'Zaid', 'Whole Year'].map(sn => (
                <option key={sn} value={sn}>{sn}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Sliders: Temperature, Rainfall, pH, Water */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-1">
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
              <span className="text-stone-300">Rainfall:</span>
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

          <div className="p-3 rounded-2xl bg-stone-950/70 border border-stone-800">
            <label className="text-xs text-stone-300 block mb-1">Water Supply</label>
            <select
              value={waterAvailability}
              onChange={(e) => setWaterAvailability(e.target.value as WaterAvailability)}
              className="w-full bg-stone-900 border border-stone-700 text-stone-200 text-xs rounded-xl px-2.5 py-1.5 focus:border-emerald-500 cursor-pointer"
            >
              {['High', 'Moderate', 'Low', 'Irrigated Canal', 'Borewell'].map(w => (
                <option key={w} value={w}>{w}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex justify-end pt-2">
          <button
            onClick={handleSuggestClick}
            disabled={isAnalyzing}
            className="px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-emerald-950 flex items-center gap-2 cursor-pointer transition-all active:scale-95"
          >
            {isAnalyzing ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Computing Agronomic Suitability...</span>
              </>
            ) : (
              <>
                <Sprout className="w-4 h-4" />
                <span>{t('action.suggestCrops', language)}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Recommended Crops Ranking Cards */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <span>{t('cropSug.recommendedCrops', language)}</span>
            <span className="text-xs text-stone-400 font-normal">
              ({cropRecommendations.length} evaluated crops)
            </span>
          </h2>
          <span className="text-xs text-stone-400 font-mono">
            Sorted by Total Agronomic Index
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {cropRecommendations.slice(0, 9).map((rec, index) => {
            const isTop = index === 0;

            return (
              <div
                key={rec.crop.id}
                className={`p-5 rounded-3xl border transition-all flex flex-col justify-between ${
                  isTop 
                    ? 'bg-gradient-to-b from-stone-900 to-emerald-950/40 border-emerald-500/50 shadow-xl shadow-emerald-950/30' 
                    : 'bg-stone-900 border-stone-800 hover:border-stone-700'
                }`}
              >
                <div>
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-bold uppercase ${
                          isTop ? 'bg-emerald-500 text-black' : 'bg-stone-800 text-stone-300'
                        }`}>
                          Rank #{index + 1}
                        </span>
                        <span className="text-xs text-stone-400">{rec.crop.category}</span>
                      </div>
                      <h3 className="text-xl font-bold text-white mt-1">{rec.crop.name}</h3>
                    </div>

                    <div className="text-right">
                      <span className={`text-2xl font-black ${
                        rec.totalScore >= 80 ? 'text-emerald-400' : rec.totalScore >= 65 ? 'text-amber-400' : 'text-stone-400'
                      }`}>
                        {rec.totalScore}%
                      </span>
                      <span className="text-[10px] font-mono text-stone-400 block uppercase">
                        {rec.suitabilityLevel}
                      </span>
                    </div>
                  </div>

                  {/* Visual Progress Bar */}
                  <div className="w-full bg-stone-950 rounded-full h-2 mb-4 overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-500 ${
                        rec.totalScore >= 80 ? 'bg-emerald-500' : rec.totalScore >= 65 ? 'bg-amber-500' : 'bg-stone-600'
                      }`}
                      style={{ width: `${rec.totalScore}%` }}
                    />
                  </div>

                  {/* Bullet reasons */}
                  <div className="space-y-1.5 mb-4 text-xs">
                    {rec.reasons.slice(0, 2).map((r, rIdx) => (
                      <div key={rIdx} className="text-emerald-300 flex items-start gap-1.5">
                        <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{r}</span>
                      </div>
                    ))}
                    {rec.warnings.slice(0, 1).map((w, wIdx) => (
                      <div key={wIdx} className="text-amber-300 flex items-start gap-1.5 text-[11px]">
                        <AlertCircle className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                        <span>{w}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Action Buttons */}
                <div className="pt-3 border-t border-stone-800/80 flex items-center justify-between gap-2">
                  <button
                    onClick={() => setActiveBreakdownCrop(rec)}
                    className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 cursor-pointer"
                  >
                    <HelpCircle className="w-3.5 h-3.5" />
                    <span>{t('cropSug.whyThisCrop', language)}</span>
                  </button>

                  <button
                    onClick={() => {
                      setSelectedCrop(rec.crop.name);
                      navigateTo('/field-analysis');
                    }}
                    className="px-3 py-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-medium flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    <span>Analyze Field</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* WHY THIS CROP? Detailed Breakdown Modal */}
      {activeBreakdownCrop && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/85 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-lg bg-stone-900 border border-stone-800 rounded-3xl shadow-2xl p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-stone-800 pb-3">
              <div>
                <h3 className="text-lg font-bold text-white">
                  {activeBreakdownCrop.crop.name} Suitability Breakdown
                </h3>
                <span className="text-xs text-stone-400">
                  Total Calculated Score: {activeBreakdownCrop.totalScore}/100 ({activeBreakdownCrop.suitabilityLevel})
                </span>
              </div>
              <button 
                onClick={() => setActiveBreakdownCrop(null)}
                className="p-1 rounded-lg text-stone-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* 7 Factor Breakdown Table */}
            <div className="space-y-2.5 font-mono text-xs">
              {[
                { name: '1. Regional Adaptation (State/District)', score: activeBreakdownCrop.scoreBreakdown.locationScore, max: 20 },
                { name: `2. Soil Texture (${selectedSoil})`, score: activeBreakdownCrop.scoreBreakdown.soilScore, max: 20 },
                { name: `3. Temperature Window (${temperature}°C)`, score: activeBreakdownCrop.scoreBreakdown.temperatureScore, max: 15 },
                { name: `4. Hydrologic / Rainfall (${rainfall} mm)`, score: activeBreakdownCrop.scoreBreakdown.rainfallScore, max: 15 },
                { name: `5. Soil Reaction (pH ${soilPh})`, score: activeBreakdownCrop.scoreBreakdown.phScore, max: 10 },
                { name: `6. Water Supply (${waterAvailability})`, score: activeBreakdownCrop.scoreBreakdown.waterScore, max: 10 },
                { name: `7. Cropping Season (${selectedSeason})`, score: activeBreakdownCrop.scoreBreakdown.seasonScore, max: 10 },
              ].map((item, idx) => (
                <div key={idx} className="p-2.5 rounded-xl bg-stone-950 border border-stone-800/80 flex items-center justify-between">
                  <span className="text-stone-300 font-sans">{item.name}</span>
                  <span className="font-bold text-emerald-400">{item.score} / {item.max}</span>
                </div>
              ))}
            </div>

            <div className="p-3 rounded-2xl bg-emerald-950/40 border border-emerald-800/40 text-xs text-emerald-200">
              <span className="font-bold block mb-1">Agronomic Summary:</span>
              {activeBreakdownCrop.reasons[0] || 'High affinity with current agro-climatic conditions.'}
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setActiveBreakdownCrop(null)}
                className="px-4 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold cursor-pointer"
              >
                Close Breakdown
              </button>
            </div>
          </div>
        </div>
      )}

      {/* COMPARE CROPS Modal */}
      {isCompareModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/90 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-4xl bg-stone-900 border border-stone-800 rounded-3xl shadow-2xl p-6 space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-stone-800 pb-4">
              <div>
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <Scale className="w-5 h-5 text-emerald-400" />
                  <span>Comparative Agronomic Matrix</span>
                </h3>
                <p className="text-xs text-stone-400 mt-0.5">
                  Select 2 to 4 crops to compare factor compatibility under current field conditions
                </p>
              </div>
              <button
                onClick={() => setIsCompareModalOpen(false)}
                className="p-1 rounded-lg text-stone-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Selector Pills */}
            <div className="flex flex-wrap gap-2">
              {cropRecommendations.map(rec => {
                const isSelected = selectedForCompare.includes(rec.crop.name);
                return (
                  <button
                    key={rec.crop.id}
                    onClick={() => toggleCompareCrop(rec.crop.name)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-emerald-600 border-emerald-500 text-white'
                        : 'bg-stone-950 border-stone-800 text-stone-400 hover:text-stone-200'
                    }`}
                  >
                    {rec.crop.name} ({rec.totalScore}%)
                  </button>
                );
              })}
            </div>

            {/* Comparison Table */}
            <div className="overflow-x-auto rounded-2xl border border-stone-800">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-stone-950 text-stone-400 font-mono border-b border-stone-800">
                    <th className="p-3.5">Factor</th>
                    {comparedRecommendations.map(c => (
                      <th key={c.crop.id} className="p-3.5 text-center text-white font-bold">
                        {c.crop.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-800/80 text-stone-300">
                  <tr>
                    <td className="p-3.5 font-semibold text-stone-200">Soil Texture</td>
                    {comparedRecommendations.map(c => (
                      <td key={c.crop.id} className="p-3.5 text-center">
                        {c.crop.soil.includes(selectedSoil) ? (
                          <span className="text-emerald-400 font-bold">✓ Suitable</span>
                        ) : (
                          <span className="text-amber-400">△ Tolerable</span>
                        )}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-3.5 font-semibold text-stone-200">Temperature Match</td>
                    {comparedRecommendations.map(c => (
                      <td key={c.crop.id} className="p-3.5 text-center">
                        {temperature >= c.crop.temperature.optimalMin && temperature <= c.crop.temperature.optimalMax ? (
                          <span className="text-emerald-400 font-bold">✓ Optimal</span>
                        ) : (
                          <span className="text-amber-400">△ Moderate</span>
                        )}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-3.5 font-semibold text-stone-200">Rainfall Adequacy</td>
                    {comparedRecommendations.map(c => (
                      <td key={c.crop.id} className="p-3.5 text-center">
                        {rainfall >= c.crop.rainfall.min ? (
                          <span className="text-emerald-400 font-bold">✓ Sufficient</span>
                        ) : (
                          <span className="text-rose-400">⚠ Deficient</span>
                        )}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-3.5 font-semibold text-stone-200">Water Demand</td>
                    {comparedRecommendations.map(c => (
                      <td key={c.crop.id} className="p-3.5 text-center">
                        {c.crop.waterRequirement}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-3.5 font-semibold text-stone-200">pH Tolerance</td>
                    {comparedRecommendations.map(c => (
                      <td key={c.crop.id} className="p-3.5 text-center">
                        {soilPh >= c.crop.ph.min && soilPh <= c.crop.ph.max ? (
                          <span className="text-emerald-400 font-bold">✓ Compatible</span>
                        ) : (
                          <span className="text-rose-400">⚠ Out of bounds</span>
                        )}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-3.5 font-semibold text-stone-200">Cropping Season</td>
                    {comparedRecommendations.map(c => (
                      <td key={c.crop.id} className="p-3.5 text-center">
                        {c.crop.seasons.includes(selectedSeason) ? (
                          <span className="text-emerald-400 font-bold">✓ Sowing Window</span>
                        ) : (
                          <span className="text-amber-400">△ Off-Season</span>
                        )}
                      </td>
                    ))}
                  </tr>
                  <tr className="bg-stone-950/80 font-bold">
                    <td className="p-3.5 text-white">Overall Suitability</td>
                    {comparedRecommendations.map(c => (
                      <td key={c.crop.id} className="p-3.5 text-center">
                        <span className="text-base text-emerald-400 font-black">
                          {c.totalScore}%
                        </span>
                        <div className="text-[10px] text-stone-400 font-mono">{c.suitabilityLevel}</div>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setIsCompareModalOpen(false)}
                className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold cursor-pointer"
              >
                Close Comparison
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
