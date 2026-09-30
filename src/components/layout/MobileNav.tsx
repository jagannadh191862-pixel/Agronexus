import React from 'react';
import { useApp } from '../../context/AppContext';
import { t } from '../../i18n/translations';
import { Home, Microscope, Bot, Sprout, Menu } from 'lucide-react';

interface MobileNavProps {
  onOpenMenu: () => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({ onOpenMenu }) => {
  const { activeRoute, navigateTo, language } = useApp();

  const quickNav = [
    { route: '/', label: t('nav.home', language), icon: Home },
    { route: '/field-analysis', label: t('nav.fieldAnalysis', language), icon: Microscope },
    { route: '/ai-farmer', label: t('nav.aiFarmer', language), icon: Bot, isCenter: true },
    { route: '/crop-suggestor', label: t('nav.cropSuggestor', language), icon: Sprout },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-stone-900/95 backdrop-blur-lg border-t border-stone-800 px-2 py-1.5 flex items-center justify-around">
      {quickNav.map((item) => {
        const Icon = item.icon;
        const isActive = activeRoute === item.route;

        if (item.isCenter) {
          return (
            <button
              key={item.route}
              onClick={() => navigateTo(item.route)}
              className="flex flex-col items-center -mt-5 cursor-pointer"
            >
              <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-emerald-600 to-emerald-400 p-0.5 shadow-lg shadow-emerald-950 flex items-center justify-center">
                <div className="w-full h-full rounded-full bg-stone-900 flex items-center justify-center text-emerald-400">
                  <Icon className="w-6 h-6 animate-pulse" />
                </div>
              </div>
              <span className={`text-[10px] mt-1 font-medium ${isActive ? 'text-emerald-400' : 'text-stone-300'}`}>
                {item.label}
              </span>
            </button>
          );
        }

        return (
          <button
            key={item.route}
            onClick={() => navigateTo(item.route)}
            className={`flex flex-col items-center py-1 px-3 rounded-xl transition-colors cursor-pointer ${
              isActive ? 'text-emerald-400' : 'text-stone-300 hover:text-stone-200'
            }`}
          >
            <Icon className="w-5 h-5 mb-0.5" />
            <span className="text-[10px] font-medium truncate max-w-[65px]">{item.label}</span>
          </button>
        );
      })}

      {/* Menu Drawer Toggle */}
      <button
        onClick={onOpenMenu}
        className="flex flex-col items-center py-1 px-3 rounded-xl text-stone-300 hover:text-stone-200 cursor-pointer"
      >
        <Menu className="w-5 h-5 mb-0.5" />
        <span className="text-[10px] font-medium">All Modules</span>
      </button>
    </nav>
  );
};
