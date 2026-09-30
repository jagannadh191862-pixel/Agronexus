import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { Mic, MicOff, AlertCircle, Check, RotateCcw, X, Volume2 } from 'lucide-react';
import { SupportedLanguage } from '../../types';

interface MicrophoneModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTextCaptured: (text: string) => void;
}

export const MicrophoneModal: React.FC<MicrophoneModalProps> = ({ isOpen, onClose, onTextCaptured }) => {
  const { language } = useApp();
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [transcript, setTranscript] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isUnsupported, setIsUnsupported] = useState<boolean>(false);
  const recognitionRef = useRef<any>(null);

  // Language Locale Map
  const localeMap: Record<SupportedLanguage, string> = {
    en: 'en-IN',
    te: 'te-IN',
    hi: 'hi-IN',
    ta: 'ta-IN',
    kn: 'kn-IN',
    mr: 'mr-IN',
    bn: 'bn-IN',
    gu: 'gu-IN',
    pa: 'pa-IN',
    ml: 'ml-IN',
    or: 'or-IN',
    ur: 'ur-IN'
  };

  const samplePresets: Record<SupportedLanguage, string[]> = {
    en: [
      'My paddy leaves have brown oval spots and yellow halo around the edges.',
      'Brown spots are appearing rapidly on my rice crop in Warangal field.',
      'Suggest suitable crops for loamy soil and high rainfall conditions.',
      'Why is disease risk high in my paddy crop today?'
    ],
    te: [
      'నా వరి ఆకులపై గోధుమ రంగు మచ్చలు కనిపిస్తున్నాయి.',
      'వరంగల్ వరి పొలంలో తెగులు ముప్పు ఎందుకు ఎక్కువగా ఉంది?',
      'ఈ నేలకు ఏ పంట బాగా అనుకూలంగా ఉంటుంది?'
    ],
    hi: [
      'मेरे धान की पत्तियों पर भूरे रंग के धब्बे दिख रहे हैं।',
      'क्या इस मौसम में धान की फसल के लिए रोग का खतरा है?',
      'मेरी मिट्टी के लिए सबसे उपयुक्त फसल कौन सी है?'
    ],
    ta: [
      'எனது நெல் இலைகளில் பழுப்பு நிற புள்ளிகள் தெரிகின்றன.',
      'என் வயலுக்கு ஏற்ற சிறந்த பயிர் எது?'
    ],
    kn: [
      'ನನ್ನ ಭತ್ತದ ಎಲೆಗಳ ಮೇಲೆ ಕಂದು ಕಲೆಗಳು ಕಾಣಿಸಿಕೊಳ್ಳುತ್ತಿವೆ.',
      'ಈ ಮಣ್ಣಿಗೆ ಯಾವ ಬೆಳೆ ಹೆಚ್ಚು ಸೂಕ್ತವಾಗಿದೆ?'
    ],
    mr: [
      'माझ्या भाताच्या पानांवर तपकिरी ठिपके दिसत आहेत.'
    ],
    bn: [
      'আমার ধান গাছের পাতায় বাদামী দাগ দেখা যাচ্ছে।'
    ],
    gu: [
      'મારા ડાંગરના પાંદડા પર કથ્થઈ રંગના ડાઘ દેખાઈ રહ્યા છે.'
    ],
    pa: [
      'ਮੇਰੇ ਝੋਨੇ ਦੇ ਪੱਤਿਆਂ ਤੇ ਭੂਰੇ ਧੱਬੇ ਦਿਖ ਰਹੇ ਹਨ।'
    ],
    ml: [
      'എന്റെ നെല്ലിന്റെ ഇലകളിൽ തവിട്ടുനിറത്തിലുള്ള പാടുകൾ കാണുന്നു.'
    ],
    or: [
      'ମୋ ଧାନ ପତ୍ରରେ ବାଦାମୀ ରଙ୍ଗର ଦାଗ ଦେଖାଯାଉଛି।'
    ],
    ur: [
      'میرے دھان کے پتوں پر بھورے دھبے نظر آرہے ہیں۔'
    ]
  };

  useEffect(() => {
    if (!isOpen) {
      stopRecording();
      setTranscript('');
      setErrorMessage(null);
    }
  }, [isOpen]);

  const startRecording = () => {
    setErrorMessage(null);
    setTranscript('');

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setIsUnsupported(true);
      setErrorMessage('Speech recognition is not natively supported in this browser. You can select a verified field observation below or type directly.');
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = localeMap[language] || 'en-IN';
      recognition.continuous = false;
      recognition.interimResults = true;

      recognition.onstart = () => {
        setIsRecording(true);
      };

      recognition.onresult = (event: any) => {
        let currentText = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          currentText += event.results[i][0].transcript;
        }
        setTranscript(currentText);
      };

      recognition.onerror = (event: any) => {
        setIsRecording(false);
        if (event.error === 'not-allowed') {
          setErrorMessage('Microphone access denied. Please check your browser microphone permissions.');
        } else if (event.error === 'no-speech') {
          setErrorMessage('No speech detected. Please speak clearly into your microphone.');
        } else {
          setErrorMessage(`Speech recognition error: ${event.error}. You can use sample voice observations below.`);
        }
      };

      recognition.onend = () => {
        setIsRecording(false);
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch (err) {
      setIsRecording(false);
      setErrorMessage('Could not initialize microphone. Please check system permissions.');
    }
  };

  const stopRecording = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (e) {
        // ignore
      }
      recognitionRef.current = null;
    }
    setIsRecording(false);
  };

  const handleUseThis = () => {
    if (transcript.trim()) {
      onTextCaptured(transcript.trim());
      onClose();
    }
  };

  const handleSelectPreset = (text: string) => {
    setTranscript(text);
    setErrorMessage(null);
  };

  if (!isOpen) return null;

  const currentPresets = samplePresets[language] || samplePresets.en;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-lg bg-stone-900 border border-stone-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-stone-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-emerald-950 text-emerald-400 border border-emerald-800/40">
              <Mic className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-white">Farmer Voice Input</h3>
              <p className="text-xs text-stone-400">Language: {localeMap[language]} ({language.toUpperCase()})</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Content */}
        <div className="p-6 flex flex-col items-center text-center">
          {/* Audio Wave / Pulse Indicator */}
          <div className="relative mb-6">
            <div className={`w-24 h-24 rounded-full flex items-center justify-center transition-all ${
              isRecording 
                ? 'bg-rose-500/20 border-2 border-rose-500 animate-pulse scale-110 shadow-lg shadow-rose-900/50' 
                : 'bg-emerald-950/40 border border-emerald-500/30'
            }`}>
              {isRecording ? (
                <Mic className="w-10 h-10 text-rose-400 animate-bounce" />
              ) : (
                <Mic className="w-10 h-10 text-emerald-400" />
              )}
            </div>
            {isRecording && (
              <span className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 bg-rose-600 text-white text-[10px] font-mono tracking-wider px-2 py-0.5 rounded-full uppercase font-bold animate-pulse">
                Listening...
              </span>
            )}
          </div>

          {/* Action Trigger */}
          <div className="flex items-center gap-3 mb-6">
            {!isRecording ? (
              <button
                onClick={startRecording}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-medium text-sm shadow-lg shadow-emerald-900/40 flex items-center gap-2 cursor-pointer transition-all active:scale-95"
              >
                <Mic className="w-4 h-4" /> Tap to Speak
              </button>
            ) : (
              <button
                onClick={stopRecording}
                className="px-6 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-medium text-sm shadow-lg shadow-rose-900/40 flex items-center gap-2 cursor-pointer transition-all active:scale-95"
              >
                <MicOff className="w-4 h-4" /> Stop Recording
              </button>
            )}

            {transcript && (
              <button
                onClick={() => { setTranscript(''); setErrorMessage(null); }}
                className="px-3 py-2.5 rounded-xl border border-stone-700 hover:bg-stone-800 text-stone-300 text-sm flex items-center gap-1.5 cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" /> Reset
              </button>
            )}
          </div>

          {/* Transcript Box */}
          <div className="w-full text-left bg-stone-950 border border-stone-800 rounded-xl p-4 min-h-[90px] mb-4">
            <span className="text-[11px] font-mono text-stone-400 uppercase tracking-wider block mb-1">
              Detected Farmer Speech:
            </span>
            {transcript ? (
              <p className="text-sm font-medium text-emerald-200 leading-relaxed">
                "{transcript}"
              </p>
            ) : (
              <p className="text-xs text-stone-500 italic">
                {isRecording ? 'Listening for speech...' : 'Press "Tap to Speak" or click a pre-recorded observation below.'}
              </p>
            )}
          </div>

          {/* Error Notice */}
          {errorMessage && (
            <div className="w-full text-left p-3 mb-4 rounded-xl bg-amber-950/40 border border-amber-800/40 flex items-start gap-2.5 text-xs text-amber-300">
              <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Voice Presets / Quick Tap for Testing */}
          <div className="w-full text-left">
            <span className="text-[11px] font-mono text-stone-400 uppercase tracking-wider block mb-2 flex items-center gap-1.5">
              <Volume2 className="w-3.5 h-3.5 text-emerald-400" />
              Sample Farmer Observations ({language.toUpperCase()}):
            </span>
            <div className="flex flex-col gap-1.5">
              {currentPresets.map((preset, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectPreset(preset)}
                  className="text-left text-xs px-3 py-2 rounded-lg bg-stone-800/70 hover:bg-stone-800 text-stone-300 hover:text-emerald-300 border border-stone-800 transition-colors cursor-pointer"
                >
                  "{preset}"
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-3.5 border-t border-stone-800 bg-stone-900/60 flex items-center justify-end gap-2.5">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-stone-400 hover:text-white text-xs font-medium cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleUseThis}
            disabled={!transcript.trim()}
            className={`px-5 py-2 rounded-xl font-medium text-xs flex items-center gap-1.5 cursor-pointer transition-all ${
              transcript.trim()
                ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-900/30'
                : 'bg-stone-800 text-stone-500 cursor-not-allowed'
            }`}
          >
            <Check className="w-3.5 h-3.5" /> Use This Observation
          </button>
        </div>
      </div>
    </div>
  );
};
