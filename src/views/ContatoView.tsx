import React, { useState } from 'react';
import { ViewName } from '../types';
import HubSpotContactForm from '../components/HubSpotContactForm';
import { 
  Clock, 
  MapPin, 
  ShieldCheck, 
  ShieldAlert, 
  CheckCircle2, 
  Info, 
  Activity, 
  Lock, 
  Shield, 
  Cpu, 
  ChevronRight, 
  Sliders, 
  AlertTriangle,
  Award 
} from 'lucide-react';

interface ContatoViewProps {
  onNavigate: (view: ViewName) => void;
}

interface Question {
  id: string;
  category: string;
  title: string;
  desc: string;
  weight: number;
}

export default function ContatoView({ onNavigate }: ContatoViewProps) {
  const [activeTab, setActiveTab] = useState<'diagnostico' | 'lead-form'>('diagnostico');
  const [answers, setAnswers] = useState<Record<string, 'sim' | 'parcial' | 'nao'>>({});

  const questions: Question[] = [
    {
      id: 'edr',
      category: 'Dispositivos & EDR/XDR',
      title: 'Máquinas & Threat Hunting',
      desc: 'Sua empresa possui proteção ativa baseada em inteligência de comportamento (EDR/XDR) monitorando continuamente computadores e servidores locais?',
      weight: 12.5
    },
    {
      id: 'firewall',
      category: 'Perímetro & Redes',
      title: 'Firewall de Última Geração (NGFW)',
      desc: 'Existe proteção NGFW perimetral protegendo suas subredes corporativas, com isolamento lógico rígido (VPCs) e sem portas críticas abertas?',
      weight: 12.5
    },
    {
      id: 'mfa',
      category: 'Identidades & Acessos',
      title: 'Multifator Obrigatorio (MFA)',
      desc: 'O duplo fator de autenticação (MFA/2FA) está ativado em 100% das credenciais administrativas de e-mails, nuvens e sistemas críticos?',
      weight: 12.5
    },
    {
      id: 'waf',
      category: 'Aplicações Web & APIs',
      title: 'Web Application Firewall (WAF)',
      desc: 'Seus sistemas voltados para a web e conexões de APIs de produção possuem blindagem de WAF mTLS blindando ataques frequentes ou DDoS?',
      weight: 12.5
    },
    {
      id: 'pentest',
      category: 'Auditorias Técnicas',
      title: 'Pentest Manual Anual',
      desc: 'Seus sites, redes ou aplicativos móveis passam por testes de invasão reais (Pentests manuais) executados por especialistas anualmente?',
      weight: 12.5
    },
    {
      id: 'backup',
      category: 'Defesa contra Ransomware',
      title: 'Backups Isolados (Immutable Backup)',
      desc: 'Possuem cópia offline ou imutável de seus bancos de dados principais, com testes periódicos automatizados de recuperação de incidentes (Restore)?',
      weight: 12.5
    },
    {
      id: 'devsecops',
      category: 'Engenharia Segura',
      title: 'Scans SAST/DAST no Pipeline',
      desc: 'Há ferramentas automáticas checando brechas de código-fonte no workflow de desenvolvimento antes do deployment em homologação/produção?',
      weight: 12.5
    },
    {
      id: 'lgpd',
      category: 'Conformidade de Dados',
      title: 'Privacidade de Dados (LGPD)',
      desc: 'As regulações da LGPD foram mapeadas nos cookies de navegação e fluxos de banco de dados corporativo com termos visíveis e oficiais?',
      weight: 12.5
    }
  ];

  const handleSelectAnswer = (qId: string, val: 'sim' | 'parcial' | 'nao') => {
    setAnswers(prev => ({
      ...prev,
      [qId]: val
    }));
  };

  const answeredCount = Object.keys(answers).length;
  const totalQuestions = questions.length;
  const isComplete = answeredCount === totalQuestions;

  // Calculate score
  let scoreOfMaturity = 0;
  questions.forEach(q => {
    const ans = answers[q.id];
    if (ans === 'sim') scoreOfMaturity += q.weight;
    else if (ans === 'parcial') scoreOfMaturity += (q.weight / 2);
  });

  // Score tier
  let tierLabel = 'Mapeamento Inicial';
  let tierColor = 'text-red-400 bg-red-500/10 border-red-500/20';
  let tierDesc = 'Preencha as questões para checar seu nível de auditoria digital e blindagem técnica.';

  if (answeredCount > 0) {
    if (scoreOfMaturity <= 40) {
      tierLabel = 'RISCO CRÍTICO 🚨';
      tierColor = 'text-red-450 bg-red-500/15 border-red-500/30 glow-cyber-red';
      tierDesc = 'A sua infraestrutura apresenta janelas de vulnerabilidade expostas a ataques imediatos e interrupções sistêmicas.';
    } else if (scoreOfMaturity <= 75) {
      tierLabel = 'VULNERABILIDADE MEDIANA ⚠️';
      tierColor = 'text-yellow-400 bg-yellow-500/15 border-yellow-500/30';
      tierDesc = 'Você conta com boas ferramentas iniciais, porém existem lacunas de identidade/perímetro que facilitam invasões manuais.';
    } else {
      tierLabel = 'ESTRUTURA RESILIENTE ✅';
      tierColor = 'text-brand-green bg-brand-green/15 border-brand-green/30';
      tierDesc = 'Excelente! Seus preceitos técnicos demonstram alta conformidade ativa e resiliência contra as investidas cibernéticas mais modernas.';
    }
  }

  const contactDetails = [
    {
      title: 'Tempo de Resposta SLA Garantido',
      desc: 'Canal corporativo prioritário. Respondemos a todas as solicitações comerciais qualificadas em até 4 horas úteis por engenheiros de nível L3.',
      icon: <Clock className="w-5 h-5 text-brand-green" />
    },
    {
      title: 'Trabalho 100% Remoto',
      desc: 'Nossa equipe atua de maneira totalmente descentralizada e digital, garantindo máxima agilidade, flexibilidade e cobertura em qualquer região.',
      icon: <MapPin className="w-5 h-5 text-brand-cyan" />
    }
  ];

  return (
    <div className="space-y-12 pb-20 pt-8" id="contato-deep-view">
      
      {/* SECTION HERO */}
      <section className="text-center relative py-6">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-80 bg-brand-cyan/5 rounded-full filter blur-3xl pointer-events-none" />
        
        <div className="max-w-4xl mx-auto px-4 space-y-4 relative z-10">
          <span className="text-[10px] font-mono text-brand-green bg-brand-green/10 border border-brand-green/20 px-3 py-1 rounded-full uppercase tracking-wider font-bold">
            Verificação de Maturidade & Atendimento Comercial
          </span>
          <h1 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
            Fale com um Especialista Certificado
          </h1>
          <p className="text-sm sm:text-base text-gray-400 max-w-2xl mx-auto font-sans leading-relaxed">
            Mapeie o score de proteção cibernética de seus ativos de TI usando o nosso formulário dinâmico ou entre em contato diretamente para consultorias focadas.
          </p>
        </div>
      </section>

      {/* TABS CONTROLLER INTEGRATED */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl mx-auto bg-brand-bg-sec p-1.5 rounded-xl border border-brand-border flex items-center justify-between mb-12">
          <button
            onClick={() => setActiveTab('diagnostico')}
            className={`flex-1 text-center py-2.5 rounded-lg text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer ${
              activeTab === 'diagnostico' 
                ? 'bg-brand-card text-brand-green border border-brand-green/20 shadow-lg' 
                : 'text-gray-450 hover:text-white'
            }`}
          >
            🛡️ 1. Auto-Diagnóstico Rápido
          </button>
          
          <button
            onClick={() => setActiveTab('lead-form')}
            className={`flex-1 text-center py-2.5 rounded-lg text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer ${
              activeTab === 'lead-form' 
                ? 'bg-brand-card text-brand-cyan border border-brand-cyan/20 shadow-lg' 
                : 'text-gray-455 hover:text-white'
            }`}
          >
            ✉️ 2. Agendar Consultoria Direta
          </button>
        </div>

        {/* CORE INTERACTIVE SCREENS ZONE */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT INTERACTIVE AREA */}
          <div className="lg:col-span-8 space-y-6">
            {activeTab === 'diagnostico' ? (
              <div className="bg-brand-card p-6 md:p-8 rounded-2xl border border-brand-border space-y-8">
                
                {/* Intro Checklist label */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-6 border-b border-brand-border/40 gap-4">
                  <div className="space-y-1">
                    <h3 className="font-display font-bold text-white text-lg">Questionário de Riscos</h3>
                    <p className="text-xs text-gray-400">Marque a realidade operacional atual da sua empresa abaixo.</p>
                  </div>
                  <div className="bg-brand-bg px-3 py-1.5 rounded-lg border border-brand-border/80 flex items-center space-x-2 shrink-0">
                    <div className="w-2 h-2 rounded-full bg-brand-green animate-pulse" />
                    <span className="text-[11px] font-mono text-gray-300">Respostas: <span className="text-white font-bold">{answeredCount}/{totalQuestions}</span></span>
                  </div>
                </div>

                {/* Question Cards Grid */}
                <div className="space-y-5">
                  {questions.map((q, idx) => {
                    const ans = answers[q.id];
                    return (
                      <div 
                        key={q.id} 
                        className={`p-5 rounded-xl border transition-all duration-300 bg-brand-bg-sec/40 ${
                          ans === 'sim' 
                            ? 'border-brand-green/20 bg-brand-green/[0.01]' 
                            : ans === 'parcial' 
                            ? 'border-yellow-500/20 bg-yellow-500/[0.01]' 
                            : ans === 'nao' 
                            ? 'border-red-500/20 bg-red-500/[0.01]' 
                            : 'border-brand-border/60 hover:border-gray-700'
                        }`}
                      >
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                          <div className="space-y-2 flex-grow">
                            <div className="flex items-center space-x-2">
                              <span className="text-[9px] font-mono text-gray-500 uppercase tracking-widest bg-brand-bg px-2 py-0.5 rounded border border-brand-border/60">
                                {q.category}
                              </span>
                            </div>
                            <h4 className="font-display font-bold text-white text-sm sm:text-base leading-snug">
                              {idx + 1}. {q.title}
                            </h4>
                            <p className="text-xs text-gray-400 leading-normal font-sans max-w-2xl">
                              {q.desc}
                            </p>
                          </div>

                          {/* Segmented Option Controls */}
                          <div className="grid grid-cols-3 gap-1.5 w-full md:w-auto shrink-0 font-mono">
                            <button
                              onClick={() => handleSelectAnswer(q.id, 'sim')}
                              className={`py-1.5 px-3 rounded-lg text-[10px] font-bold border cursor-pointer transition-all text-center ${
                                ans === 'sim'
                                  ? 'bg-brand-green/20 border-brand-green text-brand-green shadow-sm shadow-brand-green/5'
                                  : 'bg-brand-bg border-brand-border/60 text-gray-450 hover:text-white hover:border-gray-600'
                              }`}
                            >
                              Sim
                            </button>
                            
                            <button
                              onClick={() => handleSelectAnswer(q.id, 'parcial')}
                              className={`py-1.5 px-3 rounded-lg text-[10px] font-bold border cursor-pointer transition-all text-center ${
                                ans === 'parcial'
                                  ? 'bg-yellow-500/20 border-yellow-500 text-yellow-400'
                                  : 'bg-brand-bg border-brand-border/60 text-gray-455 hover:text-white hover:border-gray-600'
                              }`}
                            >
                              Parcial
                            </button>

                            <button
                              onClick={() => handleSelectAnswer(q.id, 'nao')}
                              className={`py-1.5 px-3 rounded-lg text-[10px] font-bold border cursor-pointer transition-all text-center ${
                                ans === 'nao'
                                  ? 'bg-red-500/20 border-red-500 text-red-400'
                                  : 'bg-brand-bg border-brand-border/60 text-gray-450 hover:text-white hover:border-gray-600'
                              }`}
                            >
                              Não
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Dashboard completion banner callout */}
                {isComplete && (
                  <div className="p-6 bg-brand-green/10 border border-brand-green/30 rounded-2xl space-y-4 animate-fade-in relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-brand-green/5 rounded-full filter blur-xl pointer-events-none" />
                    <div className="flex items-start space-x-3">
                      <CheckCircle2 className="w-5 h-5 text-brand-green shrink-0 mt-0.5" />
                      <div className="space-y-1">
                        <h4 className="font-display font-bold text-white text-sm sm:text-base">Mapeamento Concluído com Sucesso!</h4>
                        <p className="text-xs text-gray-300 leading-relaxed font-sans">
                          Com base em suas respostas críticas de perímetro, sua empresa alcançou um score de <span className="text-brand-green font-bold text-sm bg-brand-bg px-1.5 py-0.5 rounded border border-brand-green/15 inline-block">{scoreOfMaturity}%</span> de maturidade tecnológica.
                        </p>
                      </div>
                    </div>
                    <div className="pt-2">
                      <button
                        onClick={() => {
                          setActiveTab('lead-form');
                          const wrapper = document.getElementById('contato-deep-view');
                          if (wrapper) wrapper.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="inline-flex items-center space-x-1.5 bg-brand-green hover:bg-[#46ddab] text-brand-bg text-xs font-display font-black px-5 py-2.5 rounded-xl transition-all cursor-pointer font-bold w-full sm:w-auto justify-center shadow-lg shadow-brand-green/10"
                      >
                        <span>Avançar para Agendamento da Consultoria</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

              </div>
            ) : (
              <div className="space-y-4">
                <HubSpotContactForm />
              </div>
            )}
          </div>

          {/* RIGHT FLOATING HUD DASHBOARD */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* STICKY MATURITY CARD PANEL */}
            <div className="bg-brand-card p-6 rounded-2xl border border-brand-border space-y-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-cyan/5 rounded-full filter blur-xl pointer-events-none" />
              
              <div className="flex items-center space-x-2">
                <Activity className="w-4 h-4 text-brand-green" />
                <h4 className="text-xs font-mono text-gray-500 uppercase tracking-wider">HUD de Monitoramento</h4>
              </div>

              {/* Progress bar and Gauge meter */}
              <div className="space-y-3 bg-brand-bg p-4 rounded-xl border border-brand-border/60">
                <span className="text-[10px] font-mono text-gray-400 block uppercase">Nível de Maturidade</span>
                
                <div className="flex items-baseline space-x-1">
                  <span className="text-3xl font-mono font-black text-white">
                    {scoreOfMaturity}%
                  </span>
                  <span className="text-[10px] font-mono text-gray-400">segurança</span>
                </div>

                {/* Colored Line Progress Bar */}
                <div className="w-full h-1.5 bg-brand-bg-sec rounded-full overflow-hidden border border-brand-border/40">
                  <div 
                    className={`h-full transition-all duration-500 ${
                      scoreOfMaturity <= 40 ? 'bg-red-500' : scoreOfMaturity <= 75 ? 'bg-yellow-500' : 'bg-brand-green'
                    }`}
                    style={{ width: `${scoreOfMaturity}%` }}
                  />
                </div>
              </div>

              {/* Dynamic Status Notification Alert */}
              <div className={`p-4 rounded-xl border text-xs font-sans space-y-1.5 leading-relaxed ${tierColor}`}>
                <span className="font-mono font-black text-[11px] block uppercase tracking-wider">
                  {tierLabel}
                </span>
                <p className="text-gray-300 font-sans text-xs">
                  {tierDesc}
                </p>
              </div>

              {/* Action notice for contact help */}
              <div className="space-y-2 pt-2 text-center text-xs text-gray-500">
                <p className="font-sans leading-relaxed text-[11px]">
                  *Nossos consultores realizarão a análise estrita desse resultado de forma isenta durante a reunião.
                </p>
              </div>
            </div>

            {/* SLA DETAILS LIST */}
            <div className="space-y-4">
              {contactDetails.map((detail, index) => (
                <div
                  key={index}
                  className="bg-brand-card p-5 rounded-2xl border border-brand-border space-y-3 hover:border-gray-700 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <div className="p-2.5 bg-brand-bg rounded-lg border border-brand-border text-brand-cyan shrink-0">
                      {detail.icon}
                    </div>
                    <h4 className="font-display font-bold text-white text-sm tracking-wide">
                      {detail.title}
                    </h4>
                  </div>
                  
                  <p className="text-xs text-gray-400 leading-relaxed font-sans">
                    {detail.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* CORPORATE DIRECT TELEPHONE & EMAIL */}
            <div className="p-6 bg-brand-bg-sec rounded-2xl border border-brand-border space-y-4 font-sans">
              <h4 className="text-xs font-mono text-white uppercase tracking-wider">Contato Direto</h4>
              
              <div className="space-y-2 text-xs font-mono text-gray-300">
                <div className="flex justify-between items-center p-2 rounded bg-brand-bg border border-brand-border/40">
                  <span>E-mail:</span>
                  <span className="text-brand-cyan select-all">contato@underbug.com.br</span>
                </div>
                <div className="flex justify-between items-center p-2 rounded bg-brand-bg border border-brand-border/40">
                  <span>Telefone Principal:</span>
                  <span className="text-brand-cyan select-all block">+55 11 97431-0441</span>
                </div>
              </div>

              <p className="text-[10px] text-gray-500 leading-normal font-sans">
                *Nota legal: em consonância com as regulações de proteção à privacidade da LGPD, os logs e informações contidos nas conexões com HubSpot seguem sigilo mútuo.
              </p>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
}
