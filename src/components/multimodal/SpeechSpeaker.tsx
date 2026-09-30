import React from 'react';
import { useApp } from '../../context/AppContext';
import { Volume2, VolumeX } from 'lucide-react';

interface SpeechSpeakerProps {
  text: string;
  className?: string;
  label?: string;
}

export const SpeechSpeaker: React.FC<SpeechSpeakerProps> = ({ text, className = '', label = 'Listen' }) => {
  const { isSpeaking, speakText, stopSpeaking, language } = useApp();

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isSpeaking) {
      stopSpeaking();
    } else {
      speakText(text, language);
    }
  };

  return (
    <button
      onClick={handleToggle}
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border transition-all cursor-pointer text-xs font-medium ${
        isSpeaking
          ? 'bg-rose-950/70 border-rose-600/60 text-rose-300 animate-pulse'
          : 'bg-emerald-950/60 hover:bg-emerald-900/60 border-emerald-700/50 text-emerald-300 hover:text-white'
      } ${className}`}
      title={isSpeaking ? 'Stop audio' : 'Listen to explanation'}
    >
      {isSpeaking ? (
        <>
          <VolumeX className="w-3.5 h-3.5 text-rose-400" />
          <span>Stop</span>
        </>
      ) : (
        <>
          <Volume2 className="w-3.5 h-3.5 text-emerald-400" />
          <span>{label}</span>
        </>
      )}
    </button>
  );
};
