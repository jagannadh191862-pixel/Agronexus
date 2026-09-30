import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { t } from '../i18n/translations';
import { MicrophoneModal } from '../components/multimodal/MicrophoneModal';
import { CameraModal } from '../components/multimodal/CameraModal';
import { SpeechSpeaker } from '../components/multimodal/SpeechSpeaker';
import { 
  Bot, Send, Mic, Camera, Sprout, CloudSun, 
  HelpCircle, Trash2, Volume2, User, Sparkles, 
  ArrowRight, MapPin, ExternalLink 
} from 'lucide-react';

export const AiFarmer: React.FC = () => {
  const { 
    language, chatHistory, sendFarmerMessage, clearChat, 
    selectedState, selectedDistrict, selectedCrop, temperature, 
    humidity, soilPh, navigateTo, setVoiceObservation, setCapturedImage 
  } = useApp();

  const [inputQuery, setInputQuery] = useState<string>('');
  const [isMicModalOpen, setIsMicModalOpen] = useState<boolean>(false);
  const [isCameraModalOpen, setIsCameraModalOpen] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputQuery.trim()) return;
    sendFarmerMessage(inputQuery);
    setInputQuery('');
  };

  const handleQuickPrompt = (prompt: string) => {
    sendFarmerMessage(prompt);
  };

  const quickActionPrompts: Record<string, string[]> = {
    en: [
      'Why is disease risk high in my field?',
      'What crops are suitable for my field?',
      'Is my environment suitable for paddy?',
      'Show me the scientific evidence.'
    ],
    te: [
      'నా పొలంలో తెగులు ముప్పు ఎందుకు ఎక్కువగా ఉంది?',
      'ఈ నేలకు ఏ పంట బాగా అనుకూలంగా ఉంటుంది?',
      'ఈ వాతావరణం వరికి సరిపోతుందా?',
      'పరిశోధనా ఆధారాలు చూపించండి.'
    ],
    hi: [
      'मेरे खेत में रोग का जोखिम अधिक क्यों है?',
      'मेरी मिट्टी के लिए कौन सी फसल उपयुक्त है?',
      'क्या यह मौसम धान के लिए उपयुक्त है?',
      'वैज्ञानिक साक्ष्य दिखाएं।'
    ]
  };

  const currentQuickPrompts = quickActionPrompts[language] || quickActionPrompts.en;

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-20">
      
      {/* Header Banner */}
      <div className="p-5 rounded-3xl bg-gradient-to-r from-stone-900 via-stone-900 to-emerald-950/50 border border-stone-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-600 to-emerald-400 p-0.5 shadow-lg shadow-emerald-950 flex items-center justify-center">
            <div className="w-full h-full rounded-2xl bg-stone-950 flex items-center justify-center text-emerald-400">
              <Bot className="w-6 h-6 animate-pulse" />
            </div>
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2">
              <span>{t('farmer.title', language)}</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800/40 uppercase">
                Active Context
              </span>
            </h1>
            <p className="text-xs text-stone-300 mt-0.5 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-emerald-400" />
              <span>{selectedDistrict}, {selectedState} • {selectedCrop} • {temperature}°C • {humidity}% RH</span>
            </p>
          </div>
        </div>

        <button
          onClick={clearChat}
          className="self-start sm:self-auto p-2 rounded-xl text-stone-400 hover:text-rose-400 hover:bg-stone-800 transition-colors"
          title="Clear Conversation"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      {/* Touch-Friendly Quick Action Toolbar (Mobile First) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
        <button
          onClick={() => setIsMicModalOpen(true)}
          className="px-3.5 py-2 rounded-2xl bg-emerald-950/80 hover:bg-emerald-900 text-emerald-300 border border-emerald-700/50 text-xs font-medium flex items-center gap-2 shrink-0 cursor-pointer shadow-sm transition-all"
        >
          <Mic className="w-3.5 h-3.5 text-emerald-400" />
          <span>{t('action.speak', language)}</span>
        </button>

        <button
          onClick={() => setIsCameraModalOpen(true)}
          className="px-3.5 py-2 rounded-2xl bg-emerald-950/80 hover:bg-emerald-900 text-emerald-300 border border-emerald-700/50 text-xs font-medium flex items-center gap-2 shrink-0 cursor-pointer shadow-sm transition-all"
        >
          <Camera className="w-3.5 h-3.5 text-emerald-400" />
          <span>{t('action.scanCrop', language)}</span>
        </button>

        <button
          onClick={() => navigateTo('/crop-suggestor')}
          className="px-3.5 py-2 rounded-2xl bg-stone-900 hover:bg-stone-800 text-stone-300 hover:text-white border border-stone-800 text-xs font-medium flex items-center gap-1.5 shrink-0 cursor-pointer transition-colors"
        >
          <Sprout className="w-3.5 h-3.5 text-emerald-400" />
          <span>Suggest Crop</span>
        </button>

        <button
          onClick={() => navigateTo('/environment-analyzer')}
          className="px-3.5 py-2 rounded-2xl bg-stone-900 hover:bg-stone-800 text-stone-300 hover:text-white border border-stone-800 text-xs font-medium flex items-center gap-1.5 shrink-0 cursor-pointer transition-colors"
        >
          <CloudSun className="w-3.5 h-3.5 text-emerald-400" />
          <span>Analyze Environment</span>
        </button>

        <button
          onClick={() => handleQuickPrompt('Why is disease risk high in my field?')}
          className="px-3.5 py-2 rounded-2xl bg-stone-900 hover:bg-stone-800 text-stone-300 hover:text-white border border-stone-800 text-xs font-medium flex items-center gap-1.5 shrink-0 cursor-pointer transition-colors"
        >
          <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
          <span>Explain Disease Risk</span>
        </button>
      </div>

      {/* Chat Messages Stream */}
      <div className="min-h-[380px] max-h-[520px] overflow-y-auto p-4 sm:p-6 rounded-3xl bg-stone-900 border border-stone-800 space-y-5">
        {chatHistory.map((msg) => {
          const isAi = msg.sender === 'ai';

          return (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${isAi ? 'justify-start' : 'justify-end'}`}
            >
              {isAi && (
                <div className="w-8 h-8 rounded-xl bg-emerald-950 text-emerald-400 border border-emerald-800/50 flex items-center justify-center shrink-0 mt-1">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div
                className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-4 space-y-2.5 ${
                  isAi
                    ? 'bg-stone-950 border border-stone-800 text-stone-200 text-xs sm:text-sm'
                    : 'bg-emerald-600 text-white text-xs sm:text-sm'
                }`}
              >
                {/* Context Pills attached to message */}
                {isAi && msg.contextPills && msg.contextPills.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pb-1">
                    {msg.contextPills.map((pill, pIdx) => (
                      <span
                        key={pIdx}
                        className="px-2 py-0.5 rounded-full bg-stone-900 text-stone-400 border border-stone-800 text-[10px] font-mono"
                      >
                        {pill}
                      </span>
                    ))}
                  </div>
                )}

                {/* Message Body */}
                <p className="leading-relaxed whitespace-pre-wrap">{msg.text}</p>

                {/* Action Links if returned by reasoning engine */}
                {isAi && msg.actionLinks && msg.actionLinks.length > 0 && (
                  <div className="pt-2 border-t border-stone-800/80 flex flex-wrap gap-2">
                    {msg.actionLinks.map((link, lIdx) => (
                      <button
                        key={lIdx}
                        onClick={() => navigateTo(link.route)}
                        className="px-2.5 py-1 rounded-lg bg-stone-900 hover:bg-stone-800 text-emerald-400 border border-stone-800 hover:border-emerald-500/40 text-[11px] font-medium flex items-center gap-1 cursor-pointer transition-colors"
                      >
                        <span>{link.label}</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    ))}
                  </div>
                )}

                {/* TTS Speaker in AI messages */}
                {isAi && (
                  <div className="flex justify-end pt-1">
                    <SpeechSpeaker text={msg.text} label={t('action.listen', language)} />
                  </div>
                )}
              </div>

              {!isAi && (
                <div className="w-8 h-8 rounded-xl bg-stone-800 text-stone-300 flex items-center justify-center shrink-0 mt-1">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Quick Question Chips */}
      <div className="space-y-1.5">
        <span className="text-[11px] font-mono text-stone-400 uppercase tracking-wider block">
          Suggested Queries for Active Context ({language.toUpperCase()}):
        </span>
        <div className="flex flex-wrap gap-1.5">
          {currentQuickPrompts.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleQuickPrompt(q)}
              className="text-xs px-3 py-1.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-300 hover:text-emerald-300 border border-stone-800 transition-colors cursor-pointer"
            >
              "{q}"
            </button>
          ))}
        </div>
      </div>

      {/* Input Bar Form */}
      <form onSubmit={handleSend} className="relative flex items-center gap-2">
        <input
          type="text"
          value={inputQuery}
          onChange={(e) => setInputQuery(e.target.value)}
          placeholder={t('farmer.inputPlaceholder', language)}
          className="flex-1 bg-stone-900 border border-stone-800 text-stone-100 placeholder-stone-500 text-xs sm:text-sm rounded-2xl px-4 py-3.5 pr-24 focus:outline-none focus:border-emerald-500 shadow-xl"
        />

        <div className="absolute right-3 flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setIsMicModalOpen(true)}
            className="p-2 rounded-xl text-stone-400 hover:text-emerald-400 hover:bg-stone-800 transition-colors"
            title="Speak"
          >
            <Mic className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => setIsCameraModalOpen(true)}
            className="p-2 rounded-xl text-stone-400 hover:text-emerald-400 hover:bg-stone-800 transition-colors"
            title="Scan crop"
          >
            <Camera className="w-4 h-4" />
          </button>
          <button
            type="submit"
            disabled={!inputQuery.trim()}
            className={`p-2 rounded-xl transition-all cursor-pointer ${
              inputQuery.trim()
                ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-md'
                : 'text-stone-600 bg-stone-800/40 cursor-not-allowed'
            }`}
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </form>

      {/* Modals */}
      <MicrophoneModal
        isOpen={isMicModalOpen}
        onClose={() => setIsMicModalOpen(false)}
        onTextCaptured={(text) => {
          setVoiceObservation(text);
          sendFarmerMessage(text);
        }}
      />

      <CameraModal
        isOpen={isCameraModalOpen}
        onClose={() => setIsCameraModalOpen(false)}
        onImageCaptured={(imgUrl) => {
          setCapturedImage(imgUrl);
          sendFarmerMessage('I captured a photo of my crop leaf. Please analyze the lesion pattern.');
        }}
      />

    </div>
  );
};
