import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeView from './views/HomeView';
import PlataformaView from './views/PlataformaView';
import ServicosView from './views/ServicosView';
import SobreView from './views/SobreView';
import ConteudoView from './views/ConteudoView';
import ContatoView from './views/ContatoView';
import PoliticaView from './views/PoliticaView';
import TermosView from './views/TermosView';
import ParceirosView from './views/ParceirosView';
import CarreiraView from './views/CarreiraView';
import FerramentasView from './views/FerramentasView';
import { ViewName, PlatformId, ServiceId } from './types';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewName>('home');
  const [selectedPlatformId, setSelectedPlatformId] = useState<PlatformId>('secmaturity');
  const [selectedServiceId, setSelectedServiceId] = useState<ServiceId>('pentest');
  const [scrollProgress, setScrollProgress] = useState(0);
  
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    const saved = localStorage.getItem('underbug-theme');
    return saved === 'light' ? 'light' : 'dark';
  });

  React.useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(progress);
      } else {
        setScrollProgress(0);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    const timeoutId = setTimeout(handleScroll, 100);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timeoutId);
    };
  }, [currentView]);

  React.useEffect(() => {
    const root = document.documentElement;
    if (theme === 'light') {
      root.classList.add('light');
    } else {
      root.classList.remove('light');
    }
    localStorage.setItem('underbug-theme', theme);
  }, [theme]);

  const handleNavigateToPlatform = (id: PlatformId) => {
    setSelectedPlatformId(id);
    setCurrentView('plataforma');
  };

  const handleNavigateToService = (id: ServiceId) => {
    setSelectedServiceId(id);
    setCurrentView('servicos');
  };

  const renderActiveView = () => {
    switch (currentView) {
      case 'home':
        return (
          <HomeView
            onNavigate={setCurrentView}
            onSelectPlatform={handleNavigateToPlatform}
            onSelectService={handleNavigateToService}
          />
        );
      case 'plataforma':
        return (
          <PlataformaView
            initialPlatformId={selectedPlatformId}
            onNavigate={setCurrentView}
          />
        );
      case 'servicos':
        return (
          <ServicosView
            initialServiceId={selectedServiceId}
            onNavigate={setCurrentView}
          />
        );
      case 'sobre':
        return <SobreView onNavigate={setCurrentView} />;
      case 'conteudo':
        return <ConteudoView onNavigate={setCurrentView} />;
      case 'contato':
        return <ContatoView onNavigate={setCurrentView} />;
      case 'parceiros':
        return <ParceirosView onNavigate={setCurrentView} />;
      case 'carreira':
        return <CarreiraView onNavigate={setCurrentView} />;
      case 'ferramentas':
        return <FerramentasView onNavigate={setCurrentView} />;
      case 'politica':
        return <PoliticaView onNavigate={setCurrentView} />;
      case 'termos':
        return <TermosView onNavigate={setCurrentView} />;
      default:
        return (
          <HomeView
            onNavigate={setCurrentView}
            onSelectPlatform={handleNavigateToPlatform}
            onSelectService={handleNavigateToService}
          />
        );
    }
  };

  return (
    <div className="bg-brand-bg min-h-screen text-white font-sans selection:bg-brand-green selection:text-brand-bg flex flex-col justify-between overflow-x-hidden relative" id="app-root-container">
      
      {/* Scroll Progress Bar Indicator */}
      <div 
        className="fixed top-0 left-0 h-[3px] bg-brand-green z-[100] transition-all duration-75 ease-out shadow-[0_0_8px_rgba(16,185,129,0.5)]" 
        style={{ width: `${scrollProgress}%` }}
        id="scroll-progress-bar"
      />
      
      {/* 2. Global Navbar */}
      <Header 
        currentView={currentView} 
        onNavigate={setCurrentView} 
        onSelectService={handleNavigateToService} 
        theme={theme}
        onChangeTheme={setTheme}
      />

      {/* Spacer padding for fixed navbar layout clearance */}
      <div className="pt-2" />

      {/* 3. Main View Render Area with Framer Motion transitions */}
      <main className="flex-grow w-full relative z-10" id="main-content-layout">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentView}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.28, ease: 'easeOut' }}
            className="w-full"
          >
            {renderActiveView()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* 4. Global Footer */}
      <Footer onNavigate={setCurrentView} />
    </div>
  );
}
