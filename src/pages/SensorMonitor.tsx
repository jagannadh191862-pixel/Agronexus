import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Cpu, AlertTriangle, ShieldCheck, RefreshCw, 
  Activity, ArrowRight, Zap, CheckCircle2, AlertOctagon 
} from 'lucide-react';

export const SensorMonitor: React.FC = () => {
  const { sensors, isQuarantined, simulateSensorAnomaly, resetSensors, navigateTo } = useApp();
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [stepStage, setStepStage] = useState<number>(isQuarantined ? 4 : 0);

  const handleSimulate = () => {
    setIsSimulating(true);
    setStepStage(1); // 1. Spike emitted

    setTimeout(() => {
      setStepStage(2); // 2. Validation engine detects physical impossibility
    }, 700);

    setTimeout(() => {
      setStepStage(3); // 3. Anomaly flagged
      simulateSensorAnomaly();
    }, 1300);

    setTimeout(() => {
      setStepStage(4); // 4. Quarantined & graph protected
      setIsSimulating(false);
    }, 1900);
  };

  const handleReset = () => {
    resetSensors();
    setStepStage(0);
  };

  const quarantinedSensor = sensors.find(s => s.status === 'QUARANTINED');

  return (
    <div className="space-y-8 pb-16">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-800 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2">
              <Cpu className="w-7 h-7 text-emerald-400" />
              <span>IoT Telemetry &amp; Anomaly Quarantine Monitor</span>
            </h1>
            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase font-bold ${
              isQuarantined 
                ? 'bg-amber-950 border border-amber-600 text-amber-300 animate-pulse' 
                : 'bg-emerald-950 border border-emerald-700/50 text-emerald-300'
            }`}>
              {isQuarantined ? 'Quarantine Active' : '8/8 Nodes Healthy'}
            </span>
          </div>
          <p className="text-xs text-stone-300 mt-1">
            Real-time validation engine shielding the Knowledge Graph from corrupted, drift-damaged, or physically impossible sensor telemetry.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          {!isQuarantined ? (
            <button
              onClick={handleSimulate}
              disabled={isSimulating}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-black font-bold text-xs uppercase tracking-wider shadow-lg shadow-amber-950/40 flex items-center gap-2 cursor-pointer transition-all active:scale-95"
            >
              <Zap className="w-4 h-4 fill-black" />
              <span>{isSimulating ? 'Triggering Sensor Spike...' : 'SIMULATE SENSOR ANOMALY'}</span>
            </button>
          ) : (
            <button
              onClick={handleReset}
              className="px-5 py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold flex items-center gap-2 cursor-pointer transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Restore S-007 Nominal State (84%)</span>
            </button>
          )}
        </div>
      </div>

      {/* Anomaly Detection Quarantine Stage Flow Diagram */}
      {isQuarantined && (
        <div className="p-6 rounded-3xl bg-amber-950/30 border border-amber-700/50 space-y-4 animate-in fade-in">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertOctagon className="w-5 h-5 text-amber-400 animate-bounce" />
              <h3 className="text-base font-bold text-amber-200">
                ⚠ Sensor Anomaly Intercepted &amp; Quarantined
              </h3>
            </div>
            <span className="text-xs font-mono text-emerald-400 font-bold">
              ✓ Knowledge Graph Protected
            </span>
          </div>

          <p className="text-xs text-stone-300 leading-relaxed">
            {quarantinedSensor?.quarantineReason || 'Node S-007 emitted 180% relative humidity, which violates standard atmospheric physics. The Telemetry Gatekeeper immediately severed ingestion pipelines to prevent pathological model hallucination.'}
          </p>

          {/* Gatekeeper Flow Steps */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-2">
            {[
              { step: '01', title: 'IoT Sensor Node S-007', status: 'Emitted 180%', color: 'border-amber-600 text-amber-300' },
              { step: '02', title: 'Validation Engine', status: 'Bounds Evaluated', color: 'border-amber-600 text-amber-300' },
              { step: '03', title: 'Anomaly Detection', status: 'Boundary Violation (>100%)', color: 'border-rose-600 text-rose-300' },
              { step: '04', title: 'Quarantine Chamber', status: 'Packet Isolated', color: 'border-amber-600 text-amber-300' },
              { step: '05', title: 'Knowledge Graph', status: 'Graph Shielded (Zero Corruption)', color: 'border-emerald-600 text-emerald-300' }
            ].map((s, idx) => (
              <div key={idx} className={`p-3 rounded-2xl bg-stone-950 border ${s.color} text-center space-y-1`}>
                <span className="text-[10px] font-mono text-stone-400 block font-bold">STEP {s.step}</span>
                <span className="text-xs font-bold block">{s.title}</span>
                <span className="text-[10px] block opacity-90">{s.status}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Real-time Telemetry Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Activity className="w-5 h-5 text-emerald-400" />
            <span>Deployed Agricultural Telemetry Nodes (Warangal Field Station)</span>
          </h2>
          <span className="text-xs text-stone-400 font-mono">LoRaWAN Mesh 868 MHz</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {sensors.map((sensor) => {
            const isAnomaly = sensor.status === 'QUARANTINED';

            return (
              <div
                key={sensor.id}
                className={`p-5 rounded-3xl border transition-all flex flex-col justify-between ${
                  isAnomaly
                    ? 'bg-amber-950/40 border-amber-600 shadow-xl shadow-amber-950/50'
                    : 'bg-stone-900 border-stone-800 hover:border-stone-700'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-mono font-bold text-stone-400">
                      {sensor.id}
                    </span>
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-bold uppercase ${
                      isAnomaly
                        ? 'bg-amber-500 text-black animate-pulse'
                        : 'bg-emerald-950 text-emerald-300 border border-emerald-800/40'
                    }`}>
                      {sensor.status}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-white mb-1 truncate">{sensor.name}</h3>
                  <span className="text-xs text-stone-400 block mb-3">{sensor.parameter}</span>

                  <div className="flex items-baseline gap-1.5 mb-2">
                    <span className={`text-3xl font-black ${isAnomaly ? 'text-amber-400' : 'text-stone-100'}`}>
                      {sensor.currentValue}
                    </span>
                    <span className="text-xs text-stone-400 font-mono">{sensor.unit}</span>
                  </div>

                  <div className="text-[11px] text-stone-400 space-y-0.5 font-mono">
                    <div>Allowed: {sensor.minAllowed} to {sensor.maxAllowed} {sensor.unit}</div>
                    <div>Normal: {sensor.normalMin} - {sensor.normalMax} {sensor.unit}</div>
                  </div>
                </div>

                <div className="pt-3 mt-4 border-t border-stone-800/80 flex items-center justify-between text-[11px] text-stone-400">
                  <span className="truncate max-w-[130px]">{sensor.location}</span>
                  <span className="font-mono text-emerald-400/80">{sensor.lastUpdated}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
