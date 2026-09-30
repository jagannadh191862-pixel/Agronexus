import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { MobileNav } from './components/layout/MobileNav';
import { OpeningAnimation } from './components/common/OpeningAnimation';
import { GlobalSearchModal } from './components/common/GlobalSearchModal';

// Pages
import { Home } from './pages/Home';
import { Dashboard } from './pages/Dashboard';
import { FieldAnalysis } from './pages/FieldAnalysis';
import { AiFarmer } from './pages/AiFarmer';
import { CropSuggestor } from './pages/CropSuggestor';
import { EnvironmentAnalyzer } from './pages/EnvironmentAnalyzer';
import { KnowledgeGraphPage } from './pages/KnowledgeGraphPage';
import { EvidenceExplorer } from './pages/EvidenceExplorer';
import { ConflictCenter } from './pages/ConflictCenter';
import { SensorMonitor } from './pages/SensorMonitor';
import { DataSources } from './pages/DataSources';
import { Analytics } from './pages/Analytics';
import { About } from './pages/About';
import { Settings } from './pages/Settings';

const AppContent: React.FC = () => {
  const { activeRoute } = useApp();
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState<boolean>(false);

  // Router switcher
  const renderCurrentPage = () => {
    switch (activeRoute) {
      case '/':
        return <Home />;
      case '/dashboard':
        return <Dashboard />;
      case '/field-analysis':
        return <FieldAnalysis />;
      case '/ai-farmer':
        return <AiFarmer />;
      case '/crop-suggestor':
        return <CropSuggestor />;
      case '/environment-analyzer':
        return <EnvironmentAnalyzer />;
      case '/knowledge-graph':
        return <KnowledgeGraphPage />;
      case '/evidence':
        return <EvidenceExplorer />;
      case '/conflicts':
        return <ConflictCenter />;
      case '/sensor-monitor':
        return <SensorMonitor />;
      case '/data-sources':
        return <DataSources />;
      case '/analytics':
        return <Analytics />;
      case '/about':
        return <About />;
      case '/settings':
        return <Settings />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-black antialiased">
      {/* 2.5s Intro Sequence */}
      <OpeningAnimation />

      {/* Global Search Modal */}
      <GlobalSearchModal />

      {/* Header */}
      <Header 
        onToggleMobileSidebar={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)} 
        isMobileSidebarOpen={isMobileSidebarOpen} 
      />

      {/* Main Workspace Body */}
      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        {/* Navigation Sidebar */}
        <Sidebar 
          isMobileOpen={isMobileSidebarOpen} 
          onCloseMobile={() => setIsMobileSidebarOpen(false)} 
        />

        {/* Dynamic Route Content */}
        <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8">
          {renderCurrentPage()}
        </main>
      </div>

      {/* Mobile Floating Quick Action Nav */}
      <MobileNav onOpenMenu={() => setIsMobileSidebarOpen(true)} />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
