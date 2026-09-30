import React from 'react';
import { useApp } from '../../context/AppContext';
import { t } from '../../i18n/translations';
import { 
  Home, LayoutDashboard, Microscope, Bot, Sprout, 
  CloudSun, Network, FileCheck, Scale, Cpu, Database, 
  BarChart3, Info, Settings, ChevronRight, X 
} from 'lucide-react';

interface SidebarProps {
  isMobileOpen: boolean;
  onCloseMobile: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isMobileOpen, onCloseMobile }) => {
  const { activeRoute, navigateTo, language, isQuarantined } = useApp();

  const navItems = [
    { route: '/', label: t('nav.home', language), icon: Home },
    { route: '/dashboard', label: t('nav.dashboard', language), icon: LayoutDashboard },
    { route: '/field-analysis', label: t('nav.fieldAnalysis', language), icon: Microscope, highlight: true },
    { route: '/ai-farmer', label: t('nav.aiFarmer', language), icon: Bot, badge: 'Voice/AI' },
    { route: '/crop-suggestor', label: t('nav.cropSuggestor', language), icon: Sprout },
    { route: '/environment-analyzer', label: t('nav.environmentAnalyzer', language), icon: CloudSun },
    { route: '/knowledge-graph', label: t('nav.knowledgeGraph', language), icon: Network, badge: 'Interactive' },
    { route: '/evidence', label: t('nav.evidence', language), icon: FileCheck },
    { route: '/conflicts', label: t('nav.conflicts', language), icon: Scale, badge: '17 Active' },
    { route: '/sensor-monitor', label: t('nav.sensorMonitor', language), icon: Cpu, badge: isQuarantined ? 'Alert' : 'Live' },
    { route: '/data-sources', label: t('nav.dataSources', language), icon: Database },
    { route: '/analytics', label: t('nav.analytics', language), icon: BarChart3 },
    { route: '/about', label: t('nav.about', language), icon: Info },
    { route: '/settings', label: t('nav.settings', language), icon: Settings },
  ];

  const handleNavClick = (route: string) => {
    navigateTo(route);
    onCloseMobile();
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm md:hidden animate-in fade-in"
          onClick={onCloseMobile}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed md:sticky top-0 md:top-16 z-50 md:z-10 h-screen md:h-[calc(100vh-4rem)] w-64 bg-stone-900 border-r border-stone-800 flex flex-col justify-between transition-transform duration-300 ease-in-out ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        {/* Mobile Header in Drawer */}
        <div className="flex md:hidden items-center justify-between p-4 border-b border-stone-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white">
              <Sprout className="w-5 h-5" />
            </div>
            <span className="font-bold text-white text-sm">AGRO NEXUS</span>
          </div>
          <button 
            onClick={onCloseMobile}
            className="p-1 rounded-lg text-stone-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation List */}
        <div className="flex-1 overflow-y-auto py-3 px-3 space-y-1">
          <div className="px-3 pb-2 text-[10px] font-mono uppercase tracking-wider text-stone-300 font-semibold">
            Intelligence Modules
          </div>

          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeRoute === item.route;

            return (
              <button
                key={item.route}
                onClick={() => handleNavClick(item.route)}
                className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-medium flex items-center justify-between group transition-all cursor-pointer ${
                  isActive
                    ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-800/60 shadow-sm'
                    : 'text-stone-300 hover:text-white hover:bg-stone-800/80'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <Icon
                    className={`w-4 h-4 shrink-0 transition-colors ${
                      isActive ? 'text-emerald-400' : 'text-stone-400 group-hover:text-emerald-400'
                    }`}
                  />
                  <span className="truncate">{item.label}</span>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  {item.badge && (
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono uppercase ${
                      item.badge.includes('Alert')
                        ? 'bg-rose-950/80 text-rose-300 border border-rose-800/50'
                        : 'bg-emerald-900/40 text-emerald-400 border border-emerald-700/30'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                  {isActive && <ChevronRight className="w-3.5 h-3.5 text-emerald-400" />}
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Field Context Pill in Bottom of Sidebar */}
        <div className="p-3 border-t border-stone-800 bg-stone-950/50">
          <div className="p-2.5 rounded-xl bg-stone-900/90 border border-stone-800 text-[11px]">
            <div className="text-stone-300 font-mono text-[10px] uppercase tracking-wider flex items-center justify-between">
              <span>Active Field</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            </div>
            <div className="font-semibold text-stone-200 mt-0.5 truncate">
              Warangal, Telangana
            </div>
            <div className="text-stone-400 text-[10px] flex items-center gap-2 mt-0.5">
              <span>Paddy (Kharif)</span>
              <span>•</span>
              <span className="text-emerald-400">96.8% Health</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
