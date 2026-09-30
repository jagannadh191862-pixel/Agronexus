import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { SUPPORTED_LANGUAGES, t } from '../../i18n/translations';
import { SupportedLanguage } from '../../types';
import { 
  Sprout, Search, RotateCcw, Globe, ShieldCheck, 
  AlertTriangle, Menu, X, PlayCircle 
} from 'lucide-react';

interface HeaderProps {
  onToggleMobileSidebar: () => void;
  isMobileSidebarOpen: boolean;
}

export const Header: React.FC<HeaderProps> = ({ onToggleMobileSidebar, isMobileSidebarOpen }) => {
  const { 
    language, setLanguage, isQuarantined, resetAnalysis, 
    setIsSearchModalOpen, showOpeningAnimation, navigateTo, activeRoute 
  } = useApp();

  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState<boolean>(false);

  const currentLangObj = SUPPORTED_LANGUAGES.find(l => l.code === language) || SUPPORTED_LANGUAGES[0];

  return (
    <header className="sticky top-0 z-40 w-full bg-stone-900/90 backdrop-blur-md border-b border-stone-800 text-stone-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        
        {/* Brand & Tagline */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleMobileSidebar}
            className="md:hidden p-2 -ml-2 rounded-xl text-stone-400 hover:text-white hover:bg-stone-800"
            aria-label="Toggle Navigation Menu"
          >
            {isMobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <button 
            onClick={() => navigateTo('/')}
            className="flex items-center gap-2.5 text-left group cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-800 to-emerald-500 p-0.5 shadow-md shadow-emerald-950 flex items-center justify-center group-hover:scale-105 transition-transform">
              <div className="w-full h-full rounded-[10px] bg-stone-950 flex items-center justify-center">
                <Sprout className="w-5 h-5 text-emerald-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold tracking-tight text-lg text-white">AGRO</span>
                <span className="font-extrabold tracking-tight text-lg text-emerald-400">NEXUS</span>
              </div>
              <p className="text-[10px] text-stone-400 font-medium tracking-wider uppercase hidden sm:block">
                {t('brand.tagline', language)}
              </p>
            </div>
          </button>
        </div>

        {/* Global Controls */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          
          {/* Global Search Trigger */}
          <button
            onClick={() => setIsSearchModalOpen(true)}
            className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-stone-800/80 hover:bg-stone-800 border border-stone-700/60 text-stone-400 hover:text-stone-200 text-xs transition-colors cursor-pointer"
          >
            <Search className="w-3.5 h-3.5 text-emerald-400" />
            <span className="truncate max-w-[130px] lg:max-w-[200px]">Search Intelligence...</span>
            <kbd className="hidden lg:inline-block px-1.5 py-0.5 rounded bg-stone-900 border border-stone-700 text-[10px] font-mono text-stone-400">
              ⌘K
            </kbd>
          </button>

          {/* Quick Mobile Search Icon */}
          <button
            onClick={() => setIsSearchModalOpen(true)}
            className="sm:hidden p-2 rounded-xl text-stone-400 hover:text-white hover:bg-stone-800"
            aria-label="Search"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* System Telemetry & Quarantine Badge */}
          <div className="hidden lg:flex items-center">
            {isQuarantined ? (
              <div 
                onClick={() => navigateTo('/sensor-monitor')}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-950/80 border border-amber-600/50 text-amber-300 text-xs font-medium cursor-pointer animate-pulse"
                title="Corrupted telemetry quarantined; Knowledge Graph protected"
              >
                <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                <span>Quarantine Active</span>
              </div>
            ) : (
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-950/60 border border-emerald-700/40 text-emerald-300 text-xs font-medium">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Telemetry Verified</span>
              </div>
            )}
          </div>

          {/* Replay Opening Animation */}
          <button
            onClick={showOpeningAnimation}
            className="hidden xl:flex items-center gap-1 px-2.5 py-1.5 rounded-xl border border-stone-700 hover:bg-stone-800 text-stone-400 hover:text-stone-200 text-xs transition-colors cursor-pointer"
            title="Replay introductory animation"
          >
            <PlayCircle className="w-3.5 h-3.5 text-emerald-400" />
            <span>Intro</span>
          </button>

          {/* Reset Analysis Button */}
          <button
            onClick={resetAnalysis}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border border-stone-700 hover:border-rose-500/50 hover:bg-rose-950/20 text-stone-300 hover:text-rose-300 text-xs transition-colors cursor-pointer"
            title="Reset field inputs, recommendations, and telemetry"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden md:inline">{t('global.reset', language)}</span>
          </button>

          {/* Global Language Selector (12 Languages) */}
          <div className="relative">
            <button
              onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-950/60 hover:bg-emerald-900/60 border border-emerald-700/50 text-emerald-300 text-xs font-medium transition-colors cursor-pointer"
              aria-label="Select Language"
            >
              <Globe className="w-3.5 h-3.5 text-emerald-400" />
              <span>{currentLangObj.nativeName}</span>
              <span className="text-[10px] text-emerald-400/80">▼</span>
            </button>

            {isLangDropdownOpen && (
              <>
                <div 
                  className="fixed inset-0 z-40" 
                  onClick={() => setIsLangDropdownOpen(false)} 
                />
                <div className="absolute right-0 mt-2 w-52 bg-stone-900 border border-stone-800 rounded-2xl shadow-2xl py-2 z-50 max-h-80 overflow-y-auto divide-y divide-stone-800/40">
                  <div className="px-3 py-1.5 text-[10px] font-mono uppercase tracking-wider text-stone-400">
                    Select Language (భాష / भाषा)
                  </div>
                  <div className="py-1">
                    {SUPPORTED_LANGUAGES.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setLanguage(lang.code);
                          setIsLangDropdownOpen(false);
                        }}
                        className={`w-full text-left px-3.5 py-2 text-xs flex items-center justify-between hover:bg-stone-800 transition-colors cursor-pointer ${
                          language === lang.code ? 'text-emerald-400 font-bold bg-emerald-950/30' : 'text-stone-300'
                        }`}
                      >
                        <span className="text-sm">{lang.nativeName}</span>
                        <span className="text-[11px] text-stone-500 font-mono">{lang.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>

        </div>

      </div>
    </header>
  );
};
