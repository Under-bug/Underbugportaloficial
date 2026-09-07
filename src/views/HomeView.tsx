import React, { useMemo, useState, useEffect } from 'react';
import { 
  Shield, 
  Terminal, 
  Zap, 
  Activity, 
  Users, 
  ArrowRight, 
  Award, 
  Lock, 
  Layers, 
  Database,
  Cpu,
  Sparkles,
  ExternalLink,
  CheckCircle,
  Clock,
  MapPin,
  AlertTriangle
} from 'lucide-react';
import { ViewName, PlatformId, ServiceId } from '../types';
import TechMotionBackground from '../components/TechMotionBackground';
import { motion, AnimatePresence } from 'motion/react';

interface HomeViewProps {
  onNavigate: (view: ViewName) => void;
  onSelectPlatform?: (platform: PlatformId) => void;
  onSelectService?: (service: ServiceId) => void;
}

export default function HomeView({ onNavigate, onSelectPlatform, onSelectService }: HomeViewProps) {
  // Assessment Test state for the Contato section
  const [testQ1, setTestQ1] = useState<'A' | 'B' | 'C'>('A');
  const [testQ2, setTestQ2] = useState<'A' | 'B' | 'C'>('A');
  const [testQ3, setTestQ3] = useState<'A' | 'B' | 'C'>('A');
  const [testQ4, setTestQ4] = useState<'A' | 'B' | 'C'>('A');
  
  const proprietaryPlatforms = [
    {
      id: 'maturity' as PlatformId,
      name: 'SecMaturity',
      badge: 'PRODUTO INTERNO',
      icon: <Activity className="w-8 h-8 text-brand-green" />,
      desc: 'Mapeie o score de maturidade tecnológica, redundâncias de redes e conformidades da sua equipe.'
    },
    {
      id: 'explainer' as PlatformId,
      name: 'Cyber Explainer',
      badge: 'INTEGRAÇÃO INTELIGENTE',
      icon: <Sparkles className="w-8 h-8 text-brand-green" />,
      desc: 'Tradução automática de riscos e vulnerabilidades estritamente técnicas para linguagem de ampla compreensão executiva.'
    },
    {
      id: 'recondark' as PlatformId,
      name: 'Recondark',
      badge: 'PROTEÇÃO ATIVA',
      icon: <Shield className="w-8 h-8 text-brand-green" />,
      desc: 'Varredura pró-ativa em fóruns internacionais para identificar credenciais vazadas e chaves de APIs corporativas.'
    },
    {
      id: 'vulnscan' as PlatformId,
      name: 'VulnScan360',
      badge: 'MONITORAMENTO CONTÍNUO',
      icon: <Zap className="w-8 h-8 text-brand-green" />,
      desc: 'Mapeador simultâneo de vulnerabilidades in pipelines, portas abertas e configurações de switches locais.'
    }
  ];

  const corePillars = [
    {
      title: 'Desenvolvimento & Sistemas',
      desc: 'Projetamos e construímos ecossistemas robustos back-end, APIs complexas, pipelines escaláveis de ETL/dados e sistemas inteligentes de automação de processos (RPA).',
      icon: <Terminal className="w-5 h-5 text-brand-green" />,
      serviceId: 'sistemas_corporativos' as ServiceId
    },
    {
      title: 'Routing & Switch Avançado',
      desc: 'Desenho de topologias de rede residuais de alta performance, configuração de redundâncias de caminhos (BGP/OSPF), segurança lógica de portas e gerência DevNet.',
      icon: <Cpu className="w-5 h-5 text-brand-green" />,
      serviceId: 'routing_switching' as ServiceId
    },
    {
      title: 'Cybersecurity & Defesa Ativa',
      desc: 'Invasão controlada ética (Pentest) sênior de infraestruturas, varreduras lógicas de vulnerabilidades de superfície e contenção inteligente de incidentes via EDR/XDR.',
      icon: <Shield className="w-5 h-5 text-brand-green" />,
      serviceId: 'pentest' as ServiceId
    },
  ];

  // List of knowledgeable vendor technologies
  const techLogos = useMemo(() => {
    return [
      { name: 'Fortinet', type: 'Firewall & SD-WAN' },
      { name: 'Cisco', type: 'Enterprise Networks' },
      { name: 'Dell', type: 'Storage & Hardware' },
      { name: 'Microsoft', type: 'Enterprise Active Directory' },
      { name: 'AWS', type: 'Cloud Engineering' },
      { name: 'GCP', type: 'Google Cloud Platform' },
      { name: 'Burp Suite', type: 'Web Security Testing' },
      { name: 'Nessus', type: 'Vulnerability Scanning' },
      { name: 'Cloudflare', type: 'WAF & DDoS Defense' },
      { name: 'Qualys', type: 'Sec Compliance' },
      { name: 'Sonicwall', type: 'Gateway Security' },
      { name: 'Ruckus', type: 'RF Wireless Networks' },
      { name: 'ManageEngine', type: 'IT Ops Management' },
      { name: 'Wazuh', type: 'SIEM & XDR Protection' },
      { name: 'Tanium', type: 'Endpoint Visibility' },
      { name: 'SentinelOne', type: 'Endpoint Behavioral AI' }
    ];
  }, []);

  // Duplicate list to achieve a seamless repeating loop
  const duplicatedLogos = useMemo(() => {
    return [...techLogos, ...techLogos];
  }, [techLogos]);

  // 10 phrases that rotate every 10 seconds (10.000 milissegundos)
  const rotatingPhrases = useMemo(() => [
    "Elevamos o patamar de maturidade técnica das maiores empresas da América Latina através de desenvolvimento de software maduro, esteiras de dados complexos e redes corporativas com failover automático.",
    "Desenvolvemos sistemas resilientes e escaláveis focados em Zero Trust, arquiteturas de nuvem de alto desempenho e segurança sob medida para cada desafio operacional.",
    "Orquestramos ecossistemas multicloud de latência ultra-baixa com mTLS nativo, monitoramento de vulnerabilidades contínuo e resiliência absoluta perante ameaças.",
    "Oferecemos suporte consultivo de nível L3 com total isenção tecnológica, auditando e ajustando firewalls, microsserviços e políticas de MFA.",
    "Conectamos inteligência de dados à infraestrutura aplicando pipelines complexos de ETL, segurança do código desde as etapas iniciais e automações ágeis.",
    "Consolidamos análises e logs críticos de WAF, EDR e provedores em dashboards humanos, simplificando investigações e fortalecendo auditorias regulatórias.",
    "Atuamos com engenharia altamente especializada, dominando do hardening de contêineres e Kubernetes às diretrizes mais rígidas da LGPD nacional.",
    "Asseguramos a continuidade operacional de sistemas críticos reduzindo riscos digitais, implementando backups imutáveis e testes automatizados de failover.",
    "Otimizamos custos de licenciamento tecnológico e assinaturas de segurança por meio de análises independentes, priorizando soluções sob medida.",
    "Garantimos atendimento rápido e parcerias consolidadas, auxiliando empresas no amadurecimento técnico de código, pipelines corporativos e redes híbridas."
  ], []);

  const [currentPhraseIdx, setCurrentPhraseIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPhraseIdx((prev) => (prev + 1) % rotatingPhrases.length);
    }, 10 * 1000); // 10 seconds in ms
    return () => clearInterval(interval);
  }, [rotatingPhrases]);

  return (
    <div className="space-y-24 pb-20 pt-16">
      
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-12 md:pt-20" id="hero-underbug">
        {/* Subtle Tech Motion Background */}
        <TechMotionBackground />

        {/* Glow Background Backdrops */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[550px] h-[550px] bg-brand-green/5 filter blur-3xl pointer-events-none rounded-full opacity-60" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-8">
          <div className="space-y-4 max-w-4xl mx-auto">
            <h1 id="hero-main-title" className="text-3xl sm:text-5xl lg:text-6xl font-display font-extrabold text-white tracking-tight leading-tight">
              Conectando Cyber, Desenvolvimento, Dados e <br />
              <span className="text-gradient-cyber-green">Redes Robustas Através de Automações Inteligentes</span>.
            </h1>
            
            <div className="min-h-[140px] sm:min-h-[105px] flex flex-col items-center justify-center max-w-2xl mx-auto relative group pt-2 pb-4">
              <AnimatePresence mode="wait">
                <motion.p
                  key={currentPhraseIdx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                  className="text-sm sm:text-lg text-gray-300 font-sans leading-relaxed"
                >
                  {rotatingPhrases[currentPhraseIdx]}
                </motion.p>
              </AnimatePresence>

              {/* Miniature indicator navigation dot bar */}
              <div className="flex items-center justify-center space-x-2.5 mt-5">
                {rotatingPhrases.map((_, dotIdx) => (
                  <button
                    key={dotIdx}
                    onClick={() => setCurrentPhraseIdx(dotIdx)}
                    className={`h-1.5 transition-all duration-300 rounded-full cursor-pointer ${
                      currentPhraseIdx === dotIdx 
                        ? 'w-6 bg-brand-green' 
                        : 'w-1.5 bg-gray-650 hover:bg-gray-400'
                    }`}
                    title={`Ver frase ${dotIdx + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-2">
            <button
              onClick={() => {
                const element = document.getElementById('secao-contato');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                } else {
                  onNavigate('contato');
                }
              }}
              className="w-full sm:w-auto bg-brand-green hover:bg-[#46ddab] text-brand-bg font-display font-bold text-xs tracking-wider py-4 px-8 rounded-xl transition-all duration-200 cursor-pointer shadow-lg shadow-brand-green/20"
              id="cta-diag-primary"
            >
              AGENDAR CONSULTORIA TÉCNICA
            </button>
            <button
              onClick={() => onNavigate('servicos')}
              className="w-full sm:w-auto bg-brand-card hover:bg-brand-bg-sec/80 text-white border border-brand-border hover:border-gray-750 font-display font-semibold text-xs tracking-wider py-4 px-8 rounded-xl transition-all duration-200 cursor-pointer"
              id="cta-specialist-primary"
            >
              EXPLORAR NOSSOS 14 SERVIÇOS
            </button>
          </div>

          <div className="flex justify-center items-center space-x-3 text-xs text-gray-550 font-mono pt-4">
            <Award className="w-4 h-4 text-brand-green" />
            <span>Engenharia focada em resiliência estrutural de tráfego, conformidade LGPD e segurança intrinsica</span>
          </div>
        </div>
      </section>

      {/* 4. MAIN B2B SERVICES & SOLUTIONS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12" id="solutions-section">
        <div className="text-center space-y-2">
          <span className="text-[10px] font-mono text-brand-green uppercase tracking-widest font-semibold block">
            Nossas 3 Grandes Áreas Técnicas
          </span>
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-white tracking-tight">
            Consultoria e Implementação Tecnológica sob Padrão de Elite
          </h2>
          <p className="text-xs sm:text-sm text-gray-400 max-w-xl mx-auto leading-relaxed">
            Oferecemos uma resposta integral e unificada para o seu core business, combinando boas práticas corporativas globais, robustez estrutural e desempenho à prova de falhas.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {corePillars.map((pillar, idx) => (
            <div
              key={idx}
              className="bg-brand-card p-6 rounded-2xl border border-brand-border hover:border-brand-green/30 transition-all duration-300 relative flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="p-3 bg-brand-bg rounded-xl border border-brand-border/80 w-fit text-brand-green bg-brand-green/5 transition-colors">
                  {pillar.icon}
                </div>
                <h4 className="font-display font-bold text-white text-base tracking-wide">
                  {pillar.title}
                </h4>
                <p className="text-xs text-gray-400 leading-relaxed">
                  {pillar.desc}
                </p>
              </div>

              <div className="pt-6 border-t border-brand-border/40 mt-6 flex justify-between items-center text-xs">
                <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">Escopo Premium</span>
                <button
                  onClick={() => {
                    if (onSelectService) onSelectService(pillar.serviceId);
                    onNavigate('servicos');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="text-brand-green font-semibold flex items-center space-x-1 hover:text-white transition-colors cursor-pointer"
                >
                  <span>Detalhes</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* NEW SECTION: METODOLOGIA UNDERBUG */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12" id="methodology-section">
        <div className="text-center space-y-2">
          <span className="text-[10px] font-mono text-brand-green uppercase tracking-widest font-semibold block">
            Como Entregamos Resultados Reais
          </span>
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-white tracking-tight">
            Metodologia Underbug: Do Diagnóstico ao Hardening Ativo
          </h2>
          <p className="text-xs sm:text-sm text-gray-400 max-w-xl mx-auto leading-relaxed">
            Nossa abordagem prática de engenharia elimina conjecturas. Agimos nas camadas críticas de software, dados e infraestrutura seguindo quatro etapas integradas.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              step: '01',
              title: 'Auditoria & Diagnóstico',
              desc: 'Análise profunda de gargalos operacionais, avaliação lógica de portas expostas e identificação de latências de dados.',
              icon: <Layers className="w-5 h-5 text-brand-green animate-pulse" />
            },
            {
              step: '02',
              title: 'Arquitetura Sob Medida',
              desc: 'Desenho de fluxos integrados de pipelines de dados eficientes, roteiros de automações B2B e escopos de topologia de redes redundantes.',
              icon: <Database className="w-5 h-5 text-brand-green" />
            },
            {
              step: '03',
              title: 'Desenvolvimento Ativo',
              desc: 'Codificação de back-end com segurança intrinsica corporativa, automações de processos (RPA) e hardening de sistemas.',
              icon: <Terminal className="w-5 h-5 text-brand-green" />
            },
            {
              step: '04',
              title: 'Observabilidade & Evolução',
              desc: 'Entrega de logs transparentes, validação em produção de novas features e monitoramento contínuo de confiabilidade.',
              icon: <Activity className="w-5 h-5 text-brand-green" />
            }
          ].map((item, idx) => (
            <div 
              key={idx}
              className="bg-brand-card/40 hover:bg-brand-card/70 border border-brand-border hover:border-brand-green/30 rounded-2xl p-6 transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <span className="text-[10px] font-mono text-brand-green bg-brand-green/10 border border-brand-green/20 px-2.5 py-0.5 rounded-full font-bold">
                    PASSO {item.step}
                  </span>
                  <div className="p-2 bg-brand-bg/60 border border-brand-border/40 rounded-lg group-hover:border-brand-green/30 transition-colors">
                    {item.icon}
                  </div>
                </div>
                <h4 className="font-display font-bold text-white text-base tracking-wide pt-2">
                  {item.title}
                </h4>
                <p className="text-xs text-gray-400 leading-relaxed font-sans mt-1">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. PROPRIETARY SUITE (SecMaturity, Cyber Explainer, Recondark, VulnScan360) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12" id="proprietary-platforms-home">
        <div className="text-center space-y-2">
          <span className="text-[10px] font-mono text-brand-green uppercase tracking-widest font-semibold block">
            Nossa Suíte de Softwares de Gestão
          </span>
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-white tracking-tight">
            Nossas Plataformas Proprietárias
          </h2>
          <p className="text-xs sm:text-sm text-gray-400 max-w-xl mx-auto leading-relaxed">
            Elevando a barreira técnica de proteção através de pacotes automatizados inteligentes de análise de riscos, redundâncias de redes corporativas e posture scores.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {proprietaryPlatforms.map((platform, idx) => (
            <div
              key={idx}
              className="bg-brand-card p-5 rounded-2xl border border-brand-border hover:border-brand-green/30 transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="p-2.5 bg-brand-bg/60 border border-brand-border/40 rounded-xl w-fit">
                  {platform.icon}
                </div>
                <div>
                  <span className="text-[9px] font-mono text-brand-green bg-brand-green/5 px-2 py-0.5 rounded border border-brand-green/20">
                    {platform.badge}
                  </span>
                  <h4 className="font-display font-bold text-white text-base mt-2 tracking-wide">
                    {platform.name}
                  </h4>
                </div>
                <p className="text-xs text-gray-400 leading-relaxed font-sans">
                  {platform.desc}
                </p>
              </div>

              <button
                onClick={() => {
                  if (onSelectPlatform) onSelectPlatform(platform.id);
                  onNavigate('plataforma');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="text-xs font-mono text-brand-green font-semibold mt-6 pt-3 border-t border-brand-border/40 flex items-center justify-between hover:text-white transition-colors cursor-pointer w-full text-left"
              >
                <span>Explorar Dashboard</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* 7. TECHNOLOGY & MANUFACTURER ECOSYSTEM CAROUSEL */}
      <section className="space-y-8 overflow-hidden" id="vendors-carousel-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-2">
          <span className="text-[10px] font-mono text-brand-green uppercase tracking-widest font-semibold block">
            Integrações & Domínio Tecnológico
          </span>
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-white tracking-tight">
            Fabricantes & Tecnologias de Nosso Conhecimento
          </h2>
          <p className="text-xs sm:text-sm text-gray-400 max-w-xl mx-auto leading-relaxed">
            Nossos especialistas detêm sólida proficiência, arquitetura e blindagem nas soluções dos principais players de infraestrutura de redes, nuvem e cybersecurity global.
          </p>
        </div>

        {/* Carousel Ticker Wrapper with Fading Masks */}
        <div className="relative w-full overflow-hidden bg-brand-card/10 border-y border-brand-border/40 py-8">
          {/* Left fading mask */}
          <div className="absolute left-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-r from-brand-bg to-transparent z-20 pointer-events-none" />
          
          {/* Right fading mask */}
          <div className="absolute right-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-l from-brand-bg to-transparent z-20 pointer-events-none" />

          {/* Scrolling tape container using motion/react */}
          <div className="flex w-full overflow-hidden">
            <motion.div
              animate={{ x: ['0%', '-50%'] }}
              transition={{
                ease: 'linear',
                duration: 38,
                repeat: Infinity,
              }}
              className="flex gap-4 pr-4 whitespace-nowrap min-w-max"
            >
              {duplicatedLogos.map((logo, idx) => (
                <div
                  key={idx}
                  className="bg-brand-card/45 border border-brand-border/60 hover:border-brand-green/35 px-6 py-4 rounded-xl flex flex-col justify-center min-w-[210px] h-[80px] transition-all duration-300 group select-none"
                >
                  <span className="text-white font-display font-extrabold text-sm tracking-wide group-hover:text-brand-green transition-colors duration-200">
                    {logo.name}
                  </span>
                  <span className="text-[9px] font-mono text-gray-500 uppercase tracking-widest block mt-1">
                    {logo.type}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* 8. CONTATO & TESTES DE MATURIDADE DE TI */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12" id="secao-contato">
        <div className="text-center space-y-2">
          <span className="text-[10px] font-mono text-brand-green uppercase tracking-widest font-semibold block">
            Diagnóstico B2B & Central de Atendimento
          </span>
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-white tracking-tight">
            Contato & Auto-Avaliação de Maturidade
          </h2>
          <p className="text-sm text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Realize nosso teste de auto-avaliação abaixo para analisar o índice de vulnerabilidade e instabilidade da sua operação de TI. Em seguida, envie suas dúvidas no formulário oficial do HubSpot.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* COLUNA 1: TESTE INTERATIVO */}
          <div className="lg:col-span-6 bg-brand-card p-6 md:p-8 rounded-2xl border border-brand-border flex flex-col justify-between space-y-6">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <span className="text-[9px] font-mono text-brand-green bg-brand-green/10 border border-brand-green/20 px-2.5 py-0.5 rounded-full uppercase tracking-wider font-semibold">
                  Módulo Interativo de Riscos
                </span>
                <span className="text-[9px] font-mono text-gray-500">v1.2 SLA-Secure</span>
              </div>
              <h3 className="font-display font-bold text-white text-lg tracking-tight">
                Simulação Rápida de Maturidade Técnica
              </h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Nossos engenheiros montaram este mini-diagnóstico focado em quatro pilares fundamentais. Clique nos botões para alterar o cenário da sua empresa e estimar o seu score.
              </p>
            </div>

            <div className="space-y-4">
              {/* Pergunta 1: Cybersecurity */}
              <div className="space-y-2">
                <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest block flex items-center justify-between">
                  <span>1. CYBERSECURITY: Varreduras & Pentests</span>
                  <span className="text-[9px] text-brand-cyan select-none">Pontos: {testQ1 === 'A' ? '0' : testQ1 === 'B' ? '12.5' : '25'}</span>
                </span>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => setTestQ1('A')}
                    className={`py-2 px-3 rounded-lg text-[10px] sm:text-xs font-medium border transition-colors text-center cursor-pointer ${
                      testQ1 === 'A'
                        ? 'bg-red-500/15 border-red-500/40 text-red-400'
                        : 'bg-brand-bg/60 border-brand-border/60 text-gray-400 hover:border-gray-600'
                    }`}
                  >
                    Nenhum / Inexistente
                  </button>
                  <button
                    onClick={() => setTestQ1('B')}
                    className={`py-2 px-3 rounded-lg text-[10px] sm:text-xs font-medium border transition-colors text-center cursor-pointer ${
                      testQ1 === 'B'
                        ? 'bg-yellow-500/15 border-yellow-500/40 text-yellow-400'
                        : 'bg-brand-bg/60 border-brand-border/60 text-gray-400 hover:border-gray-600'
                    }`}
                  >
                    Anual / Básico
                  </button>
                  <button
                    onClick={() => setTestQ1('C')}
                    className={`py-2 px-3 rounded-lg text-[10px] sm:text-xs font-medium border transition-colors text-center cursor-pointer ${
                      testQ1 === 'C'
                        ? 'bg-brand-green/15 border-brand-green/40 text-brand-green'
                        : 'bg-brand-bg/60 border-brand-border/60 text-gray-400 hover:border-gray-600'
                    }`}
                  >
                    Contínuo DevSecOps
                  </button>
                </div>
              </div>

              {/* Pergunta 2: Desenvolvimento */}
              <div className="space-y-2">
                <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest block flex items-center justify-between">
                  <span>2. DESENVOLVIMENTO: Segurança de Código</span>
                  <span className="text-[9px] text-brand-cyan select-none">Pontos: {testQ2 === 'A' ? '0' : testQ2 === 'B' ? '12.5' : '25'}</span>
                </span>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => setTestQ2('A')}
                    className={`py-2 px-3 rounded-lg text-[10px] sm:text-xs font-medium border transition-colors text-center cursor-pointer ${
                      testQ2 === 'A'
                        ? 'bg-red-500/15 border-red-500/40 text-red-400'
                        : 'bg-brand-bg/60 border-brand-border/60 text-gray-400 hover:border-gray-600'
                    }`}
                  >
                    Apenas Produção
                  </button>
                  <button
                    onClick={() => setTestQ2('B')}
                    className={`py-2 px-3 rounded-lg text-[10px] sm:text-xs font-medium border transition-colors text-center cursor-pointer ${
                      testQ2 === 'B'
                        ? 'bg-yellow-500/15 border-yellow-500/40 text-yellow-400'
                        : 'bg-brand-bg/60 border-brand-border/60 text-gray-400 hover:border-gray-600'
                    }`}
                  >
                    Scans Estáticos
                  </button>
                  <button
                    onClick={() => setTestQ2('C')}
                    className={`py-2 px-3 rounded-lg text-[10px] sm:text-xs font-medium border transition-colors text-center cursor-pointer ${
                      testQ2 === 'C'
                        ? 'bg-brand-green/15 border-brand-green/40 text-brand-green'
                        : 'bg-brand-bg/60 border-brand-border/60 text-gray-400 hover:border-gray-600'
                    }`}
                  >
                    Hardening Nativo
                  </button>
                </div>
              </div>

              {/* Pergunta 3: Automação */}
              <div className="space-y-2">
                <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest block flex items-center justify-between">
                  <span>3. AUTOMAÇÃO: Orquestração de Processos</span>
                  <span className="text-[9px] text-brand-cyan select-none">Pontos: {testQ3 === 'A' ? '0' : testQ3 === 'B' ? '12.5' : '25'}</span>
                </span>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => setTestQ3('A')}
                    className={`py-2 px-3 rounded-lg text-[10px] sm:text-xs font-medium border transition-colors text-center cursor-pointer ${
                      testQ3 === 'A'
                        ? 'bg-red-500/15 border-red-500/40 text-red-400'
                        : 'bg-brand-bg/60 border-brand-border/60 text-gray-400 hover:border-gray-600'
                    }`}
                  >
                    Manuais / Planilhas
                  </button>
                  <button
                    onClick={() => setTestQ3('B')}
                    className={`py-2 px-3 rounded-lg text-[10px] sm:text-xs font-medium border transition-colors text-center cursor-pointer ${
                      testQ3 === 'B'
                        ? 'bg-yellow-500/15 border-yellow-500/40 text-yellow-500'
                        : 'bg-brand-bg/60 border-brand-border/60 text-gray-400 hover:border-gray-600'
                    }`}
                  >
                    Scripts Isolados
                  </button>
                  <button
                    onClick={() => setTestQ3('C')}
                    className={`py-2 px-3 rounded-lg text-[10px] sm:text-xs font-medium border transition-colors text-center cursor-pointer ${
                      testQ3 === 'C'
                        ? 'bg-brand-green/15 border-brand-green/40 text-brand-green'
                        : 'bg-brand-bg/60 border-brand-border/60 text-gray-400 hover:border-gray-600'
                    }`}
                  >
                    Orquestradores RPA
                  </button>
                </div>
              </div>

              {/* Pergunta 4: Dados & Infraestrutura */}
              <div className="space-y-2">
                <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest block flex items-center justify-between">
                  <span>4. DADOS & INFRA: Redundância & Resiliência</span>
                  <span className="text-[9px] text-brand-cyan select-none">Pontos: {testQ4 === 'A' ? '0' : testQ4 === 'B' ? '12.5' : '25'}</span>
                </span>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => setTestQ4('A')}
                    className={`py-2 px-3 rounded-lg text-[10px] sm:text-xs font-medium border transition-colors text-center cursor-pointer ${
                      testQ4 === 'A'
                        ? 'bg-red-500/15 border-red-500/40 text-red-400'
                        : 'bg-brand-bg/60 border-brand-border/60 text-gray-400 hover:border-gray-600'
                    }`}
                  >
                    Sem Redundância
                  </button>
                  <button
                    onClick={() => setTestQ4('B')}
                    className={`py-2 px-3 rounded-lg text-[10px] sm:text-xs font-medium border transition-colors text-center cursor-pointer ${
                      testQ4 === 'B'
                        ? 'bg-yellow-500/15 border-yellow-500/40 text-yellow-400'
                        : 'bg-brand-bg/60 border-brand-border/60 text-gray-400 hover:border-gray-600'
                    }`}
                  >
                    Backup / Manual
                  </button>
                  <button
                    onClick={() => setTestQ4('C')}
                    className={`py-2 px-3 rounded-lg text-[10px] sm:text-xs font-medium border transition-colors text-center cursor-pointer ${
                      testQ4 === 'C'
                        ? 'bg-brand-green/15 border-brand-green/40 text-brand-green'
                        : 'bg-brand-bg/60 border-brand-border/60 text-gray-400 hover:border-gray-600'
                    }`}
                  >
                    Failover Ativo
                  </button>
                </div>
              </div>
            </div>

            {/* LIVE SCORE ACCENT HUD */}
            <div className="p-4 bg-brand-bg rounded-xl border border-brand-border flex items-center justify-between mt-2 select-none">
              <div className="space-y-1">
                <span className="text-[9px] font-mono text-gray-500 uppercase">Score de Maturidade</span>
                <div className="flex items-baseline space-x-1">
                  <span className="font-mono text-2xl font-extrabold text-white">
                    {(() => {
                      let pts = 0;
                      pts += testQ1 === 'A' ? 0 : testQ1 === 'B' ? 12.5 : 25;
                      pts += testQ2 === 'A' ? 0 : testQ2 === 'B' ? 12.5 : 25;
                      pts += testQ3 === 'A' ? 0 : testQ3 === 'B' ? 12.5 : 25;
                      pts += testQ4 === 'A' ? 0 : testQ4 === 'B' ? 12.5 : 25;
                      return pts;
                    })()}%
                  </span>
                  <span className="text-[10px] font-mono text-gray-400">score</span>
                </div>
              </div>

              <div className="text-right">
                {(() => {
                  let pts = 0;
                  pts += testQ1 === 'A' ? 0 : testQ1 === 'B' ? 12.5 : 25;
                  pts += testQ2 === 'A' ? 0 : testQ2 === 'B' ? 12.5 : 25;
                  pts += testQ3 === 'A' ? 0 : testQ3 === 'B' ? 12.5 : 25;
                  pts += testQ4 === 'A' ? 0 : testQ4 === 'B' ? 12.5 : 25;

                  if (pts <= 40) {
                    return (
                      <span className="inline-flex items-center space-x-1 px-2 py-0.5 bg-red-500/10 border border-red-500/30 text-red-400 text-[10px] font-bold rounded-lg uppercase">
                        <AlertTriangle className="w-3 h-3" />
                        <span>RISCO CRÍTICO</span>
                      </span>
                    );
                  } else if (pts <= 75) {
                    return (
                      <span className="inline-flex items-center space-x-1 px-2 py-0.5 bg-yellow-500/10 border border-yellow-500/30 text-yellow-500 text-[10px] font-bold rounded-lg uppercase">
                        <AlertTriangle className="w-3 h-3" />
                        <span>ALERTA EXPOSTO</span>
                      </span>
                    );
                  } else {
                    return (
                      <span className="inline-flex items-center space-x-1 px-2 py-0.5 bg-brand-green/10 border border-brand-green/30 text-brand-green text-[10px] font-bold rounded-lg uppercase">
                        <CheckCircle className="w-3 h-3" />
                        <span>SEGURO E RESILIENTE</span>
                      </span>
                    );
                  }
                })()}
                <p className="text-[8px] text-gray-500 mt-1 font-mono">Garantido sob auditoria ativa</p>
              </div>
            </div>
          </div>

          {/* COLUNA 2: FORMULÁRIO OFICIAL HUBSPOT EMBEDDED */}
          <div className="lg:col-span-6 bg-brand-card rounded-2xl border border-brand-border flex flex-col overflow-hidden justify-between min-h-[780px]">
            {/* Header style mock web browser bar */}
            <div className="bg-brand-bg-sec px-4 py-3 border-b border-brand-border flex items-center justify-between shrink-0 select-none">
              <div className="flex items-center space-x-1.5">
                <div className="w-2 h-2 rounded-full bg-red-500/30"></div>
                <div className="w-2 h-2 rounded-full bg-yellow-500/30"></div>
                <div className="w-2 h-2 rounded-full bg-brand-green/30"></div>
              </div>
              <span className="text-[9px] sm:text-xs font-mono text-gray-400 truncate max-w-[180px] sm:max-w-xs">2gjeai.share-eu1.hsforms.com</span>
              <a 
                href="https://2gjeai.share-eu1.hsforms.com/2nSaRnRN7T8yJA5VbDLAPuQ" 
                target="_blank"  
                rel="no-referrer"
                className="text-[9px] font-mono text-brand-green hover:underline flex items-center space-x-1 shrink-0"
              >
                <span>Tela Cheia</span>
                <ExternalLink className="w-2.5 h-2.5" />
              </a>
            </div>

            {/* Mobile assistive banner */}
            <div className="bg-brand-bg p-3 border-b border-brand-border text-center flex flex-col sm:flex-row items-center justify-between gap-2 px-4">
              <span className="text-[11px] text-gray-400 font-sans font-medium">Está no celular?</span>
              <a 
                href="https://2gjeai.share-eu1.hsforms.com/2nSaRnRN7T8yJA5VbDLAPuQ" 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-3 py-1.5 bg-brand-green hover:bg-[#46ddab] text-brand-bg text-[10px] font-display font-black rounded-lg transition-colors inline-block w-full sm:w-auto font-bold"
              >
                ABRIR FORMULÁRIO COMPLETO
              </a>
            </div>

            {/* HubSpot IFrame container */}
            <div className="flex-grow bg-white min-h-[660px] relative">
              {/* Spinner loader layout while iframe loads */}
              <div className="absolute inset-0 flex flex-col justify-center items-center bg-gray-50 select-none pointer-events-none z-0">
                <div className="animate-spin rounded-full h-8 w-8 border-2 border-brand-green border-t-transparent animate-pulse" />
                <span className="text-[10px] text-gray-550 font-mono mt-3 uppercase tracking-wider">CARREGANDO CANAL HUBSPOT...</span>
              </div>
              <iframe 
                src="https://2gjeai.share-eu1.hsforms.com/2nSaRnRN7T8yJA5VbDLAPuQ"
                title="HubSpot Form"
                className="w-full h-full min-h-[660px] relative z-10 border-0"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Fallback secure descriptor */}
            <div className="bg-brand-bg-sec p-3 border-t border-brand-border text-center text-[10px] text-gray-400 font-mono flex items-center justify-center space-x-1.5 shrink-0 select-none">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-green opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-green"></span>
              </span>
              <span>Canal Direto Autenticado HubSpot CRM Segurado</span>
            </div>
          </div>

        </div>
      </section>

      {/* 9. CTA FINAL */}
      <section className="max-w-4xl mx-auto px-4 text-center relative overflow-hidden" id="final-lead-cta">
        <div className="bg-gradient-to-r from-brand-card via-brand-bg-sec/50 to-brand-card rounded-3xl border border-brand-border p-8 md:p-12 relative overflow-hidden">
          <div className="absolute inset-0 bg-brand-green/5 filter blur-3xl rounded-full opacity-60" />
          
          <div className="relative z-10 space-y-6">
            <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-white tracking-tight">
              Sua infraestrutura de software e redes está robusta hoje?
            </h3>
            <p className="text-xs sm:text-sm text-gray-300 max-w-xl mx-auto leading-relaxed">
              Evite incidentes catastróficos, inconsistências de dados e rotas instáveis. Solicite hoje mesmo uma avaliação e desenho preliminar executivo com nosso time técnico de especialistas.
            </p>
            
            <div className="pt-2">
              <button
                onClick={() => {
                  onNavigate('contato');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="bg-brand-green hover:bg-[#46ddab] text-brand-bg font-display font-bold text-xs tracking-wider py-4 px-10 rounded-xl transition-all duration-200 cursor-pointer shadow-lg shadow-brand-green/25 font-extrabold text-black"
              >
                SOLICITAR DIAGNÓSTICO DO MEU NEGÓCIO
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
