import React, { useState, useEffect } from 'react';
import { ViewName, ServiceId } from '../types';
import { ShieldAlert, Cpu, Server, Activity, ArrowRight, Menu, X, Landmark, Compass, Newspaper, Map, PhoneCall, HelpCircle, Terminal, Shield, BarChart3, Sun, Moon, Users, Briefcase, Globe, Lock } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import UnderbugLogo from './UnderbugLogo';

interface HeaderProps {
  currentView: ViewName;
  onNavigate: (view: ViewName) => void;
  onSelectService?: (id: ServiceId) => void;
  theme?: 'dark' | 'light';
  onChangeTheme?: (theme: 'dark' | 'light') => void;
}

export default function Header({ currentView, onNavigate, onSelectService, theme = 'dark', onChangeTheme }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [platformsDropdownOpen, setPlatformsDropdownOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [underbugDropdownOpen, setUnderbugDropdownOpen] = useState(false);
  const [toolsDropdownOpen, setToolsDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems: { label: string; view: ViewName }[] = [
    { label: 'Início', view: 'home' },
    { label: 'Sobre Nós', view: 'sobre' },
    { label: 'Conteúdo Técnico', view: 'conteudo' },
  ];

  const handleLinkClick = (view: ViewName) => {
    onNavigate(view);
    setMobileMenuOpen(false);
    setPlatformsDropdownOpen(false);
    setServicesDropdownOpen(false);
    setUnderbugDropdownOpen(false);
    setToolsDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleServiceClick = (id: ServiceId) => {
    if (onSelectService) {
      onSelectService(id);
    } else {
      onNavigate('servicos');
    }
    setMobileMenuOpen(false);
    setPlatformsDropdownOpen(false);
    setServicesDropdownOpen(false);
    
    // Smooth scroll down to details
    setTimeout(() => {
      const el = document.getElementById('core-service-details-anchor');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 120);
  };

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-brand-bg/95 border-b border-brand-border backdrop-blur-md py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo Brand Title */}
          <div
            onClick={() => handleLinkClick('home')}
            className="flex items-center cursor-pointer group"
            id="header-brand-logo"
          >
            <UnderbugLogo size="md" showText={true} className="transition-transform group-hover:scale-[1.02] duration-300" />
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-6">
            <button
              onClick={() => handleLinkClick('home')}
              className={`text-xs font-semibold tracking-wider hover:text-white transition-colors cursor-pointer ${
                currentView === 'home' ? 'text-brand-green' : 'text-gray-300'
              }`}
            >
              Início
            </button>

            {/* Platforms Dropdown Trigger */}
            <div 
              className="relative py-2"
              onMouseEnter={() => { setPlatformsDropdownOpen(true); setServicesDropdownOpen(false); }}
              onMouseLeave={() => setPlatformsDropdownOpen(false)}
            >
              <button
                onClick={() => handleLinkClick('plataforma')}
                className={`text-xs font-semibold tracking-wider hover:text-white transition-colors cursor-pointer flex items-center space-x-1 ${
                  currentView === 'plataforma' ? 'text-brand-green' : 'text-gray-300'
                }`}
              >
                <span>Plataformas</span>
                <span className="text-[8px] opacity-60">▼</span>
              </button>

              {platformsDropdownOpen && (
                <div className="absolute top-[85%] left-0 pt-3.5 w-64 z-50">
                  <div className="bg-brand-card rounded-xl border border-brand-border p-3 shadow-xl glow-cyber-blue">
                    <p className="text-[10px] font-mono text-gray-500 uppercase tracking-widest pb-1 border-b border-brand-border/40 mb-2 px-1">
                      Suíte Proprietária
                    </p>
                    <div className="space-y-1">
                      <button
                        onClick={() => handleLinkClick('plataforma')}
                        className="w-full text-left p-2 hover:bg-brand-bg rounded-lg text-xs transition-colors block cursor-pointer"
                      >
                        <span className="text-white font-semibold block">SecMaturity</span>
                        <span className="text-[10.5px] text-gray-400">Score de conformidade & postura.</span>
                      </button>
                      <button
                        onClick={() => handleLinkClick('plataforma')}
                        className="w-full text-left p-2 hover:bg-brand-bg rounded-lg text-xs transition-colors block cursor-pointer"
                      >
                        <span className="text-white font-semibold block">Cyber Explainer</span>
                        <span className="text-[10.5px] text-gray-400">Explicabilidade de brechas executivas.</span>
                      </button>
                      <button
                        onClick={() => handleLinkClick('plataforma')}
                        className="w-full text-left p-2 hover:bg-brand-bg rounded-lg text-xs transition-colors block cursor-pointer"
                      >
                        <span className="text-white font-semibold block">Recondark</span>
                        <span className="text-[10.5px] text-gray-400">Varredura de vazamentos na Deep Web.</span>
                      </button>
                      <button
                        onClick={() => handleLinkClick('plataforma')}
                        className="w-full text-left p-2 hover:bg-brand-bg rounded-lg text-xs transition-colors block cursor-pointer"
                      >
                        <span className="text-white font-semibold block">VulnScan360</span>
                        <span className="text-[10.5px] text-gray-400">Mapeador ativo de vulnerabilidades.</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Services Dropdown Trigger with Mega Menu */}
            <div 
              className="relative py-2"
              onMouseEnter={() => { setServicesDropdownOpen(true); setPlatformsDropdownOpen(false); }}
              onMouseLeave={() => setServicesDropdownOpen(false)}
            >
              <button
                onClick={() => handleLinkClick('servicos')}
                className={`text-xs font-semibold tracking-wider hover:text-white transition-colors cursor-pointer flex items-center space-x-1 ${
                  currentView === 'servicos' ? 'text-brand-green' : 'text-gray-300'
                }`}
              >
                <span>Serviços</span>
                <span className="text-[8px] opacity-60">▼</span>
              </button>

              {servicesDropdownOpen && (
                <div className="absolute top-[85%] -right-32 md:-right-64 lg:-right-80 xl:-right-[32rem] pt-3.5 w-[1040px] max-w-[95vw] sm:max-w-none z-50 animate-fade-in">
                  <div className="bg-brand-card/98 border border-brand-border rounded-2xl p-6 shadow-2xl backdrop-blur-xl transition-all duration-300 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 glow-cyber-green">
                  
                  {/* Pillar 1: Segurança Cibernética */}
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2 pb-2 border-b border-brand-border/40">
                      <Shield className="w-4 h-4 text-brand-green" />
                      <span className="text-[10px] font-mono text-brand-green uppercase tracking-widest font-bold">
                        Segurança Cibernética
                      </span>
                    </div>
                    <div className="space-y-1.5 max-h-[380px] overflow-y-auto custom-scrollbar pr-1">
                      <button
                        onClick={() => handleServiceClick('pentest')}
                        className="w-full text-left p-1.5 hover:bg-brand-bg/60 border border-transparent hover:border-brand-green/20 rounded-xl text-xs transition-all duration-200 block group cursor-pointer"
                      >
                        <span className="text-white font-semibold flex items-center justify-between">
                          <span className="text-[11px]">Pentest</span>
                          <ArrowRight className="w-3 h-3 text-brand-green opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                        </span>
                        <span className="text-[9.5px] text-gray-400 mt-0.5 block leading-tight font-sans">
                          Ataques reais em abordagens GrayBox e BlackBox sob demanda.
                        </span>
                      </button>
                      
                      <button
                        onClick={() => handleServiceClick('gestao_vulnerabilidades')}
                        className="w-full text-left p-1.5 hover:bg-brand-bg/60 border border-transparent hover:border-brand-green/20 rounded-xl text-xs transition-all duration-200 block group cursor-pointer"
                      >
                        <span className="text-white font-semibold flex items-center justify-between">
                          <span className="text-[11px]">Gestão de Vulnerabilidades</span>
                          <ArrowRight className="w-3 h-3 text-brand-green opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                        </span>
                        <span className="text-[9.5px] text-gray-400 mt-0.5 block leading-tight font-sans">
                          Varredura automatizada e triagem contínua de brechas lógicas.
                        </span>
                      </button>

                      <button
                        onClick={() => handleServiceClick('edr_xdr')}
                        className="w-full text-left p-1.5 hover:bg-brand-bg/60 border border-transparent hover:border-brand-green/20 rounded-xl text-xs transition-all duration-200 block group cursor-pointer"
                      >
                        <span className="text-white font-semibold flex items-center justify-between">
                          <span className="text-[11px]">EDR/XDR</span>
                          <ArrowRight className="w-3 h-3 text-brand-green opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                        </span>
                        <span className="text-[9.5px] text-gray-400 mt-0.5 block leading-tight font-sans">
                          Monitoramento atômico e contenção de ransomwares nas pontas.
                        </span>
                      </button>

                      <button
                        onClick={() => handleServiceClick('threat_hunting')}
                        className="w-full text-left p-1.5 hover:bg-brand-bg/60 border border-transparent hover:border-brand-green/20 rounded-xl text-xs transition-all duration-200 block group cursor-pointer"
                      >
                        <span className="text-white font-semibold flex items-center justify-between">
                          <span className="text-[11px]">Threat Hunting</span>
                          <ArrowRight className="w-3 h-3 text-brand-green opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                        </span>
                        <span className="text-[9.5px] text-gray-400 mt-0.5 block leading-tight font-sans">
                          Busca proativa de atores de ameaças sofisticadas ocultas na rede.
                        </span>
                      </button>

                      <button
                        onClick={() => handleServiceClick('superficie_ataque')}
                        className="w-full text-left p-1.5 hover:bg-brand-bg/60 border border-transparent hover:border-brand-green/20 rounded-xl text-xs transition-all duration-200 block group cursor-pointer"
                      >
                        <span className="text-white font-semibold flex items-center justify-between">
                          <span className="text-[11px]">Superfície de Ataque</span>
                          <ArrowRight className="w-3 h-3 text-brand-green opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                        </span>
                        <span className="text-[9.5px] text-gray-400 mt-0.5 block leading-tight font-sans">
                          Mapeamento estrutural de todo o perímetro digital externo.
                        </span>
                      </button>
                    </div>
                  </div>

                  {/* Pillar 2: Automação e Desenvolvimento */}
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2 pb-2 border-b border-brand-border/40">
                      <Terminal className="w-4 h-4 text-brand-cyan" />
                      <span className="text-[10px] font-mono text-brand-cyan uppercase tracking-widest font-bold">
                        Automação e Dev
                      </span>
                    </div>
                    <div className="space-y-1.5 max-h-[380px] overflow-y-auto custom-scrollbar pr-1">
                      <button
                        onClick={() => handleServiceClick('sistemas_corporativos')}
                        className="w-full text-left p-1.5 hover:bg-brand-bg/60 border border-transparent hover:border-brand-cyan/20 rounded-xl text-xs transition-all duration-200 block group cursor-pointer"
                      >
                        <span className="text-white font-semibold flex items-center justify-between">
                          <span className="text-[11px]">Sistemas Corporativos</span>
                          <ArrowRight className="w-3 h-3 text-brand-cyan opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                        </span>
                        <span className="text-[9.5px] text-gray-400 mt-0.5 block leading-tight font-sans">
                          Construção sob medida de portais e plataformas B2B robustas.
                        </span>
                      </button>

                      <button
                        onClick={() => handleServiceClick('apis_microservicos')}
                        className="w-full text-left p-1.5 hover:bg-brand-bg/60 border border-transparent hover:border-brand-cyan/20 rounded-xl text-xs transition-all duration-200 block group cursor-pointer"
                      >
                        <span className="text-white font-semibold flex items-center justify-between">
                          <span className="text-[11px]">APIs e Microsserviços</span>
                          <ArrowRight className="w-3 h-3 text-brand-cyan opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                        </span>
                        <span className="text-[9.5px] text-gray-400 mt-0.5 block leading-tight font-sans">
                          Engenharia de microsserviços desacoplados e velozes por gRPC/REST.
                        </span>
                      </button>

                      <button
                        onClick={() => handleServiceClick('automacao_rpa')}
                        className="w-full text-left p-1.5 hover:bg-brand-bg/60 border border-transparent hover:border-brand-cyan/20 rounded-xl text-xs transition-all duration-200 block group cursor-pointer"
                      >
                        <span className="text-white font-semibold flex items-center justify-between">
                          <span className="text-[11px]">Automação de Processos (RPA)</span>
                          <ArrowRight className="w-3 h-3 text-brand-cyan opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                        </span>
                        <span className="text-[9.5px] text-gray-400 mt-0.5 block leading-tight font-sans">
                          Robôs estáveis que economizam milhares de horas de trabalho repetitivo.
                        </span>
                      </button>

                      <button
                        onClick={() => handleServiceClick('integracao_sistemas')}
                        className="w-full text-left p-1.5 hover:bg-brand-bg/60 border border-transparent hover:border-brand-cyan/20 rounded-xl text-xs transition-all duration-200 block group cursor-pointer"
                      >
                        <span className="text-white font-semibold flex items-center justify-between">
                          <span className="text-[11px]">Integrações entre Sistemas</span>
                          <ArrowRight className="w-3 h-3 text-brand-cyan opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                        </span>
                        <span className="text-[9.5px] text-gray-400 mt-0.5 block leading-tight font-sans">
                          Comunicação bilateral transparente de faturamento, estoque e CRMs.
                        </span>
                      </button>

                      <button
                        onClick={() => handleServiceClick('devnet_automation')}
                        className="w-full text-left p-1.5 hover:bg-brand-bg/60 border border-transparent hover:border-brand-cyan/20 rounded-xl text-xs transition-all duration-200 block group cursor-pointer"
                      >
                        <span className="text-white font-semibold flex items-center justify-between">
                          <span className="text-[11px]">DevNet & Network Automation</span>
                          <ArrowRight className="w-3 h-3 text-brand-cyan opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                        </span>
                        <span className="text-[9.5px] text-gray-400 mt-0.5 block leading-tight font-sans">
                          Provisionamento programático e versionamento de roteamento via código.
                        </span>
                      </button>
                    </div>
                  </div>

                  {/* Pillar 3: Dados e Inteligência */}
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2 pb-2 border-b border-brand-border/40">
                      <BarChart3 className="w-4 h-4 text-brand-green" />
                      <span className="text-[10px] font-mono text-brand-green uppercase tracking-widest font-bold">
                        Dados e Inteligência
                      </span>
                    </div>
                    <div className="space-y-1.5 max-h-[380px] overflow-y-auto custom-scrollbar pr-1">
                      <button
                        onClick={() => handleServiceClick('bi')}
                        className="w-full text-left p-1.5 hover:bg-brand-bg/60 border border-transparent hover:border-brand-green/20 rounded-xl text-xs transition-all duration-200 block group cursor-pointer"
                      >
                        <span className="text-white font-semibold flex items-center justify-between">
                          <span className="text-[11px]">Business Intelligence</span>
                          <ArrowRight className="w-3 h-3 text-brand-green opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                        </span>
                        <span className="text-[9.5px] text-gray-400 mt-0.5 block leading-tight font-sans">
                          Indicadores dimensionais e consultas de altíssima relevância analítica.
                        </span>
                      </button>

                      <button
                        onClick={() => handleServiceClick('data_analytics')}
                        className="w-full text-left p-1.5 hover:bg-brand-bg/60 border border-transparent hover:border-brand-green/20 rounded-xl text-xs transition-all duration-200 block group cursor-pointer"
                      >
                        <span className="text-white font-semibold flex items-center justify-between">
                          <span className="text-[11px]">Data Analytics</span>
                          <ArrowRight className="w-3 h-3 text-brand-green opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                        </span>
                        <span className="text-[9.5px] text-gray-400 mt-0.5 block leading-tight font-sans">
                          Mineração qualificada de dados complexos em insights preditivos.
                        </span>
                      </button>

                      <button
                        onClick={() => handleServiceClick('etl_pipelines')}
                        className="w-full text-left p-1.5 hover:bg-brand-bg/60 border border-transparent hover:border-brand-green/20 rounded-xl text-xs transition-all duration-200 block group cursor-pointer"
                      >
                        <span className="text-white font-semibold flex items-center justify-between">
                          <span className="text-[11px]">ETL e Data Pipelines</span>
                          <ArrowRight className="w-3 h-3 text-brand-green opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                        </span>
                        <span className="text-[9.5px] text-gray-400 mt-0.5 block leading-tight font-sans">
                          Limpeza e transferência volumosa rápida de dados para Data Lakes.
                        </span>
                      </button>

                      <button
                        onClick={() => handleServiceClick('dashboards_executivos')}
                        className="w-full text-left p-1.5 hover:bg-brand-bg/60 border border-transparent hover:border-brand-green/20 rounded-xl text-xs transition-all duration-200 block group cursor-pointer"
                      >
                        <span className="text-white font-semibold flex items-center justify-between">
                          <span className="text-[11px]">Dashboards Executivos</span>
                          <ArrowRight className="w-3 h-3 text-brand-green opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                        </span>
                        <span className="text-[9.5px] text-gray-400 mt-0.5 block leading-tight font-sans">
                          Painéis de velocidade extrema projetados para diretores e presidentes.
                        </span>
                      </button>
                    </div>
                  </div>

                  {/* Pillar 4: Infraestrutura e Redes */}
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2 pb-2 border-b border-brand-border/40">
                      <Server className="w-4 h-4 text-brand-blue" />
                      <span className="text-[10px] font-mono text-brand-blue uppercase tracking-widest font-bold">
                        Infraestrutura & Redes
                      </span>
                    </div>
                    <div className="space-y-1.5 max-h-[380px] overflow-y-auto custom-scrollbar pr-1">
                      <button
                        onClick={() => handleServiceClick('arquitetura_redes')}
                        className="w-full text-left p-1.5 hover:bg-brand-bg/60 border border-transparent hover:border-brand-blue/20 rounded-xl text-xs transition-all duration-200 block group cursor-pointer"
                      >
                        <span className="text-white font-semibold flex items-center justify-between">
                          <span className="text-[11px]">Arquitetura de Redes</span>
                          <ArrowRight className="w-3 h-3 text-brand-blue opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                        </span>
                        <span className="text-[9.5px] text-gray-400 mt-0.5 block leading-tight font-sans">
                          Modelagem estruturada de caminhos seguros físicos, lógicos ou multi-nuvem.
                        </span>
                      </button>

                      <button
                        onClick={() => handleServiceClick('routing_switching')}
                        className="w-full text-left p-1.5 hover:bg-brand-bg/60 border border-transparent hover:border-brand-blue/20 rounded-xl text-xs transition-all duration-200 block group cursor-pointer"
                      >
                        <span className="text-white font-semibold flex items-center justify-between">
                          <span className="text-[11px]">Routing & Switching</span>
                          <ArrowRight className="w-3 h-3 text-brand-blue opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                        </span>
                        <span className="text-[9.5px] text-gray-400 mt-0.5 block leading-tight font-sans">
                          Hardening avançado de ativos (BGP/OSPF) com failover inteligente.
                        </span>
                      </button>
                    </div>
                  </div>

                </div>
              </div>
              )}
            </div>

            {/* New Underbug Dropdown Trigger */}
            <div 
              className="relative py-2"
              onMouseEnter={() => { setUnderbugDropdownOpen(true); setPlatformsDropdownOpen(false); setServicesDropdownOpen(false); }}
              onMouseLeave={() => setUnderbugDropdownOpen(false)}
            >
              <button
                className={`text-xs font-semibold tracking-wider hover:text-white transition-colors cursor-pointer flex items-center space-x-1 ${
                  ['sobre', 'contato', 'parceiros', 'conteudo', 'carreira'].includes(currentView) ? 'text-brand-green' : 'text-gray-300'
                }`}
              >
                <span>Underbug</span>
                <span className="text-[8px] opacity-60">▼</span>
              </button>

              {underbugDropdownOpen && (
                <div className="absolute top-[85%] right-0 pt-3.5 w-64 z-50">
                  <div className="bg-brand-card/98 backdrop-blur-md rounded-xl border border-brand-border p-3 shadow-xl glow-cyber-blue">
                    <p className="text-[10px] font-mono text-gray-500 uppercase tracking-widest pb-1 border-b border-brand-border/40 mb-2 px-1">
                      Institucional
                    </p>
                    <div className="space-y-1">
                      <button
                        onClick={() => { handleLinkClick('sobre'); setUnderbugDropdownOpen(false); }}
                        className="w-full text-left p-2 hover:bg-brand-bg rounded-lg text-xs transition-colors block cursor-pointer"
                      >
                        <span className="text-white font-semibold flex items-center space-x-2">
                          <Users className="w-3.5 h-3.5 text-brand-green" />
                          <span>Sobre Nós</span>
                        </span>
                        <span className="text-[10px] text-gray-400 block ml-5.5">Conheça nossa trajetória.</span>
                      </button>

                      <button
                        onClick={() => { handleLinkClick('contato'); setUnderbugDropdownOpen(false); }}
                        className="w-full text-left p-2 hover:bg-brand-bg rounded-lg text-xs transition-colors block cursor-pointer"
                      >
                        <span className="text-white font-semibold flex items-center space-x-2">
                          <PhoneCall className="w-3.5 h-3.5 text-brand-cyan" />
                          <span>Contatos</span>
                        </span>
                        <span className="text-[10px] text-gray-400 block ml-5.5">Formulário & Diagnóstico.</span>
                      </button>

                      <button
                        onClick={() => { handleLinkClick('parceiros'); setUnderbugDropdownOpen(false); }}
                        className="w-full text-left p-2 hover:bg-brand-bg rounded-lg text-xs transition-colors block cursor-pointer"
                      >
                        <span className="text-white font-semibold flex items-center space-x-2">
                          <Landmark className="w-3.5 h-3.5 text-brand-blue" />
                          <span>Parceiros</span>
                        </span>
                        <span className="text-[10px] text-gray-400 block ml-5.5">Nossas alianças de TI.</span>
                      </button>

                      <button
                        onClick={() => { handleLinkClick('conteudo'); setUnderbugDropdownOpen(false); }}
                        className="w-full text-left p-2 hover:bg-brand-bg rounded-lg text-xs transition-colors block cursor-pointer"
                      >
                        <span className="text-white font-semibold flex items-center space-x-2">
                          <Newspaper className="w-3.5 h-3.5 text-brand-cyan" />
                          <span>Conteúdo</span>
                        </span>
                        <span className="text-[10px] text-gray-400 block ml-5.5">Insights e artigos técnicos.</span>
                      </button>

                      <button
                        onClick={() => { handleLinkClick('carreira'); setUnderbugDropdownOpen(false); }}
                        className="w-full text-left p-2 hover:bg-brand-bg rounded-lg text-xs transition-colors block cursor-pointer"
                      >
                        <span className="text-white font-semibold flex items-center space-x-2">
                          <Briefcase className="w-3.5 h-3.5 text-brand-green" />
                          <span>Carreira</span>
                        </span>
                        <span className="text-[10px] text-gray-400 block ml-5.5">Vagas no time técnico.</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </nav>

          {/* Tools/Ferramentas Dropdown Trigger */}
          <nav className="hidden md:flex items-center space-x-6 relative ml-4">
            <div 
              className="relative py-2"
              onMouseEnter={() => { setToolsDropdownOpen(true); setPlatformsDropdownOpen(false); setServicesDropdownOpen(false); setUnderbugDropdownOpen(false); }}
              onMouseLeave={() => setToolsDropdownOpen(false)}
            >
              <button
                onClick={() => handleLinkClick('ferramentas')}
                className={`text-xs font-semibold tracking-wider hover:text-white transition-colors cursor-pointer flex items-center space-x-1 ${
                  currentView === 'ferramentas' ? 'text-brand-green' : 'text-gray-300'
                }`}
              >
                <span>Ferramentas Free</span>
                <span className="text-[8px] opacity-60">▼</span>
              </button>

              {toolsDropdownOpen && (
                <div className="absolute top-[85%] right-0 pt-3.5 w-64 z-50 animate-fade-in" id="header-tools-dropdown">
                  <div className="bg-brand-card/98 backdrop-blur-md rounded-xl border border-brand-border p-3 shadow-xl glow-cyber-green">
                    <p className="text-[10px] font-mono text-gray-500 uppercase tracking-widest pb-1 border-b border-brand-border/40 mb-2 px-1">
                      Ferramentas Gratuitas
                    </p>
                    <div className="space-y-1">
                      <button
                        onClick={() => { handleLinkClick('ferramentas'); }}
                        className="w-full text-left p-2 hover:bg-brand-bg rounded-lg text-xs transition-colors block cursor-pointer"
                      >
                        <span className="text-white font-semibold flex items-center space-x-2">
                          <Globe className="w-3.5 h-3.5 text-brand-green" />
                          <span>Analisador de Domínio</span>
                        </span>
                        <span className="text-[10px] text-gray-400 block ml-5.5">Verificação de DNS, SPF e Headers.</span>
                      </button>

                      <button
                        onClick={() => { handleLinkClick('ferramentas'); }}
                        className="w-full text-left p-2 hover:bg-brand-bg rounded-lg text-xs transition-colors block cursor-pointer"
                      >
                        <span className="text-white font-semibold flex items-center space-x-2">
                          <Lock className="w-3.5 h-3.5 text-brand-cyan" />
                          <span>Analisador de Certificado</span>
                        </span>
                        <span className="text-[10px] text-gray-400 block ml-5.5">Avaliação de robustez do SSL/TLS.</span>
                      </button>

                      <button
                        onClick={() => { handleLinkClick('ferramentas'); }}
                        className="w-full text-left p-2 hover:bg-brand-bg rounded-lg text-xs transition-colors block cursor-pointer"
                      >
                        <span className="text-white font-semibold flex items-center space-x-2">
                          <Server className="w-3.5 h-3.5 text-brand-blue" />
                          <span>Validador de Portas</span>
                        </span>
                        <span className="text-[10px] text-gray-400 block ml-5.5">Varredura e checagem de sockets.</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </nav>

          {/* Right Action CTA Button */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={() => onChangeTheme && onChangeTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2.5 rounded-xl bg-brand-card hover:bg-brand-bg-sec border border-brand-border text-brand-green hover:text-brand-cyan transition-all duration-300 flex items-center justify-center cursor-pointer shadow-md hover:shadow-lg focus:outline-none"
              title={theme === 'dark' ? 'Ativar Tema Claro' : 'Ativar Tema Escuro'}
            >
              {theme === 'dark' ? <Sun className="w-[15px] h-[15px] text-brand-green" /> : <Moon className="w-[15px] h-[15px] text-brand-cyan" />}
            </button>

            <button
              onClick={() => handleLinkClick('contato')}
              className="bg-white hover:bg-brand-cyan hover:text-brand-bg text-brand-bg text-xs font-display font-medium tracking-wider py-2 px-4 rounded-xl transition-all duration-200 cursor-pointer flex items-center space-x-1.5 font-bold"
            >
              <span>Diagnóstico de Segurança</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="md:hidden flex items-center space-x-2">
            <button
              onClick={() => onChangeTheme && onChangeTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-lg bg-brand-card border border-brand-border text-brand-green hover:text-brand-cyan transition-all duration-300 flex items-center justify-center cursor-pointer"
              title={theme === 'dark' ? 'Tema Claro' : 'Tema Escuro'}
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-brand-green" /> : <Moon className="w-4 h-4 text-brand-cyan" />}
            </button>

            <button
              onClick={() => handleLinkClick('contato')}
              className="bg-brand-green text-brand-bg text-[10px] font-display font-bold py-1.5 px-3 rounded-lg"
            >
              Contato
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-white p-1 hover:bg-brand-card rounded-lg transition-colors cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-brand-bg border-b border-brand-border py-4 px-4 space-y-3 z-40 relative">
          <div className="grid grid-cols-2 gap-2 text-xs">
            <button
              onClick={() => handleLinkClick('home')}
              className={`p-3 rounded-lg text-left ${currentView === 'home' ? 'bg-brand-card border border-brand-blue text-brand-cyan' : 'bg-brand-bg-sec/40 text-gray-300'}`}
            >
              Home / Principal
            </button>
            <button
              onClick={() => handleLinkClick('plataforma')}
              className={`p-3 rounded-lg text-left ${currentView === 'plataforma' ? 'bg-brand-card border border-brand-blue text-brand-cyan' : 'bg-brand-bg-sec/40 text-gray-300'}`}
            >
              Nossa Plataforma
            </button>
            <button
              onClick={() => handleLinkClick('servicos')}
              className={`p-3 rounded-lg text-left ${currentView === 'servicos' ? 'bg-brand-card border border-brand-blue text-brand-cyan' : 'bg-brand-bg-sec/40 text-gray-300'}`}
            >
              Nossos Serviços
            </button>
            <button
              onClick={() => handleLinkClick('ferramentas')}
              className={`p-3 rounded-lg text-left ${currentView === 'ferramentas' ? 'bg-brand-card border border-brand-green text-brand-green font-bold' : 'bg-brand-bg-sec/40 text-gray-300'}`}
            >
              🛠️ Ferramentas Free
            </button>
            
            {/* Divider Sub-label for Underbug menu */}
            <div className="col-span-2 pt-2 pb-1 border-t border-brand-border/30 text-[9px] font-mono text-gray-500 uppercase tracking-widest pl-1">
              Menu Underbug
            </div>

            <button
              onClick={() => handleLinkClick('sobre')}
              className={`p-3 rounded-lg text-left ${currentView === 'sobre' ? 'bg-brand-card border border-brand-blue text-brand-cyan' : 'bg-brand-bg-sec/40 text-gray-300'}`}
            >
              Sobre Nós
            </button>
            <button
              onClick={() => handleLinkClick('contato')}
              className={`p-3 rounded-lg text-left ${currentView === 'contato' ? 'bg-brand-card border border-brand-blue text-brand-cyan' : 'bg-brand-bg-sec/40 text-gray-300'}`}
            >
              Contatos
            </button>
            <button
              onClick={() => handleLinkClick('parceiros')}
              className={`p-3 rounded-lg text-left ${currentView === 'parceiros' ? 'bg-brand-card border border-brand-blue text-brand-cyan' : 'bg-brand-bg-sec/40 text-gray-300'}`}
            >
              Parceiros
            </button>
            <button
              onClick={() => handleLinkClick('conteudo')}
              className={`p-3 rounded-lg text-left ${currentView === 'conteudo' ? 'bg-brand-card border border-brand-blue text-brand-cyan' : 'bg-brand-bg-sec/40 text-gray-300'}`}
            >
              Conteúdo
            </button>
            <button
              onClick={() => handleLinkClick('carreira')}
              className={`p-3 rounded-lg text-left ${currentView === 'carreira' ? 'bg-brand-card border border-brand-blue text-brand-cyan' : 'bg-brand-bg-sec/40 text-gray-300'}`}
            >
              Carreira
            </button>
          </div>
          
          <div className="pt-3 border-t border-brand-border/50 text-[10px] text-gray-400 font-mono flex items-center justify-between">
            <span>Central: +55 (11) 4002-8922</span>
            <span className="text-brand-green">● Latam Portals Active</span>
          </div>
        </div>
      )}
    </header>
  );
}
