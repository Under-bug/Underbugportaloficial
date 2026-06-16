import React from 'react';
import { ViewName } from '../types';
import { ShieldCheck, Target, Award, Eye, UserCheck, Star, Users, ArrowRight, Compass } from 'lucide-react';
import { motion } from 'motion/react';

interface SobreViewProps {
  onNavigate: (view: ViewName) => void;
}

export default function SobreView({ onNavigate }: SobreViewProps) {
  
  const values = [
    {
      title: 'Precisão e Sem Falsos Positivos',
      desc: 'Nossos relatórios não são saídas brutas de scanners automáticos. Cada falha encontrada é validada de forma manual por engenheiros pós-qualificados.',
      icon: <Star className="w-5 h-5 text-brand-cyan" />
    },
    {
      title: 'Transparência no Nível Executivo',
      desc: 'Traduzimos bits e bytes para relatórios corporativos simplificados de impactos, permitindo ações rápidas por conselhos de diretoria.',
      icon: <Compass className="w-5 h-5 text-brand-green" />
    },
    {
      title: 'Soberania em Cybersecurity',
      desc: 'Nossa sede principal na América Latina atua de acordo com leis rígidas de privacidade locais (LGPD), garantindo conformidade absoluta.',
      icon: <ShieldCheck className="w-5 h-5 text-brand-blue" />
    }
  ];

  const methodologySteps = [
    {
      num: '01',
      title: 'Mapeamento Passivo/Ativo',
      desc: 'Uso das plataformas VulnScan360 e Recondark para determinar a sua superfície exposta primária de canais públicos na internet.'
    },
    {
      num: '02',
      title: 'Simulação Crítica Controlada',
      desc: 'Ataques manuais controlados de exploração de privilégios e tentativas de evasão do WAF imitando técnicas APT para testar sua equipe SOC.'
    },
    {
      num: '03',
      title: 'Documentação & Validação',
      desc: 'Construção da prova de conceito (PoC) detalhada passo a passo de como a falha se deu e como corrigi-la em termos práticos.'
    },
    {
      num: '04',
      title: 'Acompanhamento & Reteste',
      desc: 'Retestamos os sistemas corrigidos na janela de 60 dias para outorgar o selo e atestado de segurança técnica da UnderBug.'
    }
  ];

  const certificates = [
    { name: 'OSCP (Offensive Security Certified Professional)', organization: 'OffSec' },
    { name: 'CISSP (Certified Information Systems Security Professional)', organization: 'ISC²' },
    { name: 'CEH (Certified Ethical Hacker)', organization: 'EC-Council' },
    { name: 'CompTIA Security+ / Pentest+', organization: 'CompTIA' },
    { name: 'AWS Certified Security Specialty', organization: 'Amazon Web Services' },
  ];

  return (
    <div className="space-y-16 pb-20 pt-8" id="sobre-deep-view">
      
      {/* SECTION HERO */}
      <section className="text-center relative py-8">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-80 bg-brand-cyan/5 rounded-full filter blur-3xl pointer-events-none" />
        
        <div className="max-w-4xl mx-auto px-4 space-y-4 relative z-10">
          <span className="text-[10px] font-mono text-brand-blue bg-brand-blue/10 border border-brand-blue/20 px-3 py-1 rounded-full uppercase tracking-wider font-semibold">
            Nossos Valores & Diretrizes Corporativas
          </span>
          <h1 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
            Nossa Missão é Garantir a <br />
            <span className="text-gradient-cyan-blue">Sua Resiliência Operacional</span>
          </h1>
          <p className="text-sm sm:text-base text-gray-400 max-w-2xl mx-auto">
            Referência de ponta a ponta em proteção cibernética, desenvolvimento e dados para empresas que buscam alta performance e segurança absoluta na América Latina.
          </p>
        </div>
      </section>

      {/* HISTÓRIA E ORIGEM */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <div className="flex items-center space-x-2">
            <span className="w-1.5 h-1.5 bg-brand-green rounded-full"></span>
            <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest font-semibold block">A nossa trajetória</span>
          </div>
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-white tracking-tight leading-tight">
            Nossa História: Expertise Técnica e Abordagem Personalizada
          </h2>
          <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-sans">
            A Underbug foi fundada em 2025 por um grupo de especialistas em segurança da informação com a visão de criar uma empresa que combinasse expertise técnica avançada com uma abordagem personalizada e orientada a resultados.
          </p>
          <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-sans">
            Com o crescimento acelerado das ameaças cibernéticas e a adoção massiva de tecnologias, identificamos a necessidade de soluções de segurança especializadas que pudessem atender às demandas específicas desse novo cenário tecnológico.
          </p>
          <p className="text-xs sm:text-sm text-gray-400 leading-relaxed font-sans">
            Hoje, buscamos ser reconhecidos como uma referência em proteção cibernética, desenvolvimento e dados, atendendo empresas de diversos setores em todo o Brasil e América Latina.
          </p>


        </div>

        {/* Visual glass cards displaying Mission Vision and Values */}
        <div className="grid grid-cols-1 gap-6 bg-brand-card/55 p-6 rounded-3xl border border-brand-border relative overflow-hidden">
          <div className="absolute inset-0 bg-cyber-gradient opacity-15" />
          
          <div className="relative z-10 space-y-4">
            <div className="flex gap-4 items-start p-3 hover:bg-brand-bg/40 rounded-xl transition-colors">
              <div className="p-2.5 bg-brand-blue/10 rounded-lg border border-brand-blue/20 text-brand-blue shrink-0">
                <Target className="w-5 h-5 shadow-inner" />
              </div>
              <div>
                <h4 className="text-xs font-semibold text-white uppercase tracking-wider font-mono">Missão</h4>
                <p className="text-xs text-gray-300 leading-snug mt-1 font-sans">
                  Unir segurança da informação e engenharia de software para construir ecossistemas livres de vulnerabilidades, sob uma dinâmica personalizada voltada para o sucesso real do cliente.
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start p-3 hover:bg-brand-bg/40 rounded-xl transition-colors">
              <div className="p-2.5 bg-brand-green/10 rounded-lg border border-brand-green/20 text-brand-green shrink-0">
                <Eye className="w-5 h-5 shadow-inner" />
              </div>
              <div>
                <h4 className="text-xs font-semibold text-white uppercase tracking-wider font-mono">Visão</h4>
                <p className="text-xs text-gray-300 leading-snug mt-1 font-sans">
                  Ser reconhecida como a maior referência técnica e estratégica em proteção cibernética, desenvolvimento seguro e engenharia de dados do Brasil e América Latina.
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start p-3 hover:bg-brand-bg/40 rounded-xl transition-colors">
              <div className="p-2.5 bg-brand-cyan/10 rounded-lg border border-brand-cyan/20 text-brand-cyan shrink-0">
                <Award className="w-5 h-5 shadow-inner" />
              </div>
              <div>
                <h4 className="text-xs font-semibold text-white uppercase tracking-wider font-mono">Valores</h4>
                <p className="text-xs text-gray-300 leading-snug mt-1 font-sans">
                  Abordagem personalizada sob medida, ética profissional inquestionável, excelência técnica rigorosa e foco absoluto na entrega de resultados práticos de proteção e conformidade.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CORE GUIDING VALUES */}
      <section className="bg-brand-bg-sec border-y border-brand-border/40 py-16" id="about-pillars">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-2">
            <h2 className="font-display font-bold text-2xl text-white tracking-tight">Os Pilares que Regem Nossa Marca</h2>
            <p className="text-xs text-gray-400">Trabalhamos com o compromisso de entregar o máximo de clareza defensiva ao mercado.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {values.map((val, i) => (
              <div key={i} className="bg-brand-card p-6 rounded-2xl border border-brand-border flex flex-col justify-between">
                <div>
                  <div className="p-2.5 bg-brand-bg rounded-lg border border-brand-border w-fit text-brand-cyan mb-4">
                    {val.icon}
                  </div>
                  <h4 className="font-display font-semibold text-white text-sm tracking-wide mb-2">{val.title}</h4>
                  <p className="text-xs text-gray-400 leading-normal">{val.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* METODOLOGIA DE SUCESSO DE AUDITORIA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-2">
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-white tracking-tight">Nossa Metodologia Integrada</h2>
          <p className="text-xs text-gray-400">Unindo inteligência de software proprietário com auditoria ofensiva manual.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {methodologySteps.map((step, idx) => (
            <div key={idx} className="bg-brand-card/45 p-5 rounded-2xl border border-brand-border relative overflow-hidden group">
              <span className="text-5xl font-mono text-gray-700/20 font-bold absolute right-4 top-4 group-hover:text-brand-cyan/20 transition-colors">
                {step.num}
              </span>
              
              <div className="space-y-3 relative z-10">
                <h4 className="font-display font-bold text-white text-xs tracking-wider uppercase">{step.title}</h4>
                <p className="text-xs text-gray-400 leading-normal font-sans pt-1">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CORE CERTIFICATIONS LISTINGS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="about-qualifications">
        <div className="bg-gradient-to-r from-brand-card to-brand-bg-sec rounded-3xl border border-brand-border p-8 md:p-12 grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          <div className="space-y-4">
            <span className="text-[10px] font-mono text-brand-green bg-brand-green/10 border border-brand-green/20 px-3 py-1 rounded-full uppercase tracking-wider font-semibold">
              Garantia de Qualificação
            </span>
            <h3 className="font-display font-extrabold text-2xl text-white tracking-tight">
              Certificações de Padrão Global
            </h3>
            <p className="text-xs text-gray-400 leading-relaxed font-sans">
              O ecossistema Underbug é liderado por profissionais de elite que detêm as mais pesadas certificações vigentes na indústria internacional de segurança cibernética ofensiva e governança.
            </p>
          </div>

          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs text-gray-300">
            {certificates.map((cert, index) => (
              <div key={index} className="p-3 bg-brand-bg/80 rounded-xl border border-brand-border/60 flex items-center space-x-3 hover:border-brand-cyan transition-colors">
                <div className="w-2 h-2 bg-brand-cyan rounded-full animate-pulse shrink-0" />
                <div>
                  <span className="text-white font-semibold block tracking-wide">{cert.name}</span>
                  <span className="text-gray-500 text-[10px]">{cert.organization}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
