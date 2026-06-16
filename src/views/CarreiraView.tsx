import React from 'react';
import { ViewName } from '../types';
import { Briefcase, Heart, Trophy, Zap, Compass } from 'lucide-react';

interface CarreiraViewProps {
  onNavigate: (view: ViewName) => void;
}

export default function CarreiraView({ onNavigate }: CarreiraViewProps) {
  const benefits = [
    {
      title: 'Trabalho 100% Remoto',
      desc: 'Flexibilidade real para você codar, auditar e orquestrar de qualquer lugar do mundo com conexões assíncronas.',
      icon: <Compass className="w-5 h-5 text-brand-green" />
    },
    {
      title: 'Apoio a Certificações',
      desc: 'Nós reembolsamos 100% de certificações de elite como OSCP, CISSP, CEH, AWS Security e cursos especializados.',
      icon: <Trophy className="w-5 h-5 text-brand-cyan" />
    },
    {
      title: 'Hackathons & LABs Internos',
      desc: 'Tempo garantido toda semana para explorar zero-days na Deep Web, realizar pentests experimentais e criar scripts de automação.',
      icon: <Zap className="w-5 h-5 text-brand-blue" />
    },
    {
      title: 'Saúde Completa Privada',
      desc: 'Planos de saúde e odontológico nacionais premium sem coparticipação para você e seus dependentes diretos.',
      icon: <Heart className="w-5 h-5 text-brand-cyan" />
    }
  ];

  return (
    <div className="space-y-16 pb-20 pt-8" id="carreiras-deep-view">
      
      {/* SECTION HERO */}
      <section className="text-center relative py-8">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-80 bg-brand-cyan/5 rounded-full filter blur-3xl pointer-events-none" />
        
        <div className="max-w-4xl mx-auto px-4 space-y-4 relative z-10">
          <span className="text-[10px] font-mono text-brand-cyan bg-brand-cyan/10 border border-brand-cyan/20 px-3 py-1 rounded-full uppercase tracking-wider font-semibold">
            Faça Parte do Nosso Esquadrão Técnico
          </span>
          <h1 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
            Venha Blindar o Futuro da <br />
            <span className="text-gradient-cyan-blue">Tecnologia Conosco</span>
          </h1>
          <p className="text-sm sm:text-base text-gray-400 max-w-2xl mx-auto">
            Trabalhe ao lado de engenheiros de elite motivados por desafios reais de cybersecurity, automação impecável e arquitetura de dados sem rodeios.
          </p>
        </div>
      </section>

      {/* BENEFITS SECOYION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12" id="cultura-e-beneficios">
        <div className="text-center space-y-2">
          <span className="text-[10px] font-mono text-brand-green uppercase tracking-widest font-semibold block">Nossa Cultura</span>
          <h2 className="font-display font-bold text-2xl text-white tracking-tight">O que oferecemos aos nossos talentos?</h2>
          <p className="text-xs text-gray-400 max-w-lg mx-auto leading-relaxed">
            Valorizamos mentes inovadoras, proporcionando todo o suporte de saúde e infraestrutura técnica de ponta necessária.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, i) => (
            <div key={i} className="bg-brand-card p-6 rounded-2xl border border-brand-border flex flex-col justify-between hover:border-brand-cyan/30 transition-all duration-300">
              <div>
                <div className="p-2.5 bg-brand-bg rounded-lg border border-brand-border w-fit text-brand-cyan mb-4">
                  {benefit.icon}
                </div>
                <h4 className="font-display font-semibold text-white text-sm tracking-wide mb-2">{benefit.title}</h4>
                <p className="text-xs text-gray-400 leading-relaxed font-sans">{benefit.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* OPEN POSITIONS PIPELINES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8" id="vagas-abertas">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-b border-brand-border/40 pb-6">
          <div className="space-y-1 text-center md:text-left">
            <h2 className="font-display font-bold text-xl sm:text-2xl text-white tracking-tight">Oportunidades em Aberto</h2>
            <p className="text-xs text-gray-400">Junte-se ao nosso time altamente especializado.</p>
          </div>
        </div>

        <div className="bg-brand-card p-8 md:p-12 rounded-2xl border border-brand-border text-center space-y-6 max-w-3xl mx-auto relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 bg-brand-cyan/5 rounded-full filter blur-2xl pointer-events-none" />
          
          <div className="mx-auto w-12 h-12 rounded-full bg-brand-bg border border-brand-border flex items-center justify-center text-gray-400">
            <Briefcase className="w-5 h-5 text-brand-cyan" />
          </div>

          <div className="space-y-2">
            <h3 className="font-display font-semibold text-white text-lg">Não temos carreiras disponíveis no momento</h3>
            <p className="text-xs text-gray-455 font-sans leading-relaxed max-w-lg mx-auto">
              Nossa equipe técnica interna está com o quadro completo no momento. No entanto, estamos sempre atentos a grandes talentos em Cybersecurity, Engenharia de Software e Automações Inteligentes.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}
