import React from 'react';
import { ViewName } from '../types';
import { Shield, Handshake, Network, Globe, Cloud, Sparkles, Server, ArrowRight, ArrowUpRight, Award, Compass, Cpu, CheckCircle } from 'lucide-react';
import { motion } from 'motion/react';

interface ParceirosViewProps {
  onNavigate: (view: ViewName) => void;
}

export default function ParceirosView({ onNavigate }: ParceirosViewProps) {
  const securitySolutions = [
    {
      vendor: 'Sophos',
      badge: 'Endpoint & EDR',
      desc: 'Líder global em segurança cibernética sincronizada. Conhecemos e configuramos a linha Intercept X, Sophos Central, defesas de Ransomware e firewalls de borda integrados para respostas automáticas a ameaças locais.',
      tag: 'Orquestração Central'
    },
    {
      vendor: 'Fortinet',
      badge: 'NGFW & SD-WAN',
      desc: 'Referência absoluta em firewalls corporativos FortiGate de alta performance. Realizamos auditorias de regras de tráfego, mitigação por hardware através da Security Fabric e conexões redundantes de filiais via SD-WAN seguro.',
      tag: 'Security Fabric'
    },
    {
      vendor: 'Trend Micro',
      badge: 'Cloud & Kubernetes',
      desc: 'Dominamos a suíte Cloud One e Deep Security para monitorar e blindar servidores virtuais, ambientes de microsserviços em Docker e contêineres Kubernetes contra injeções ou explorações em tempo de execução.',
      tag: 'Runtime Shield'
    },
    {
      vendor: 'Cisco Security',
      badge: 'Zero Trust & Networks',
      desc: 'Integramos Duo Security para autenticação multifator (MFA) sem senha, soluções Cisco Secure Client (antigo AnyConnect VPN) de alto rendimento e monitoramento inteligente de switches perimetrais Cisco Catalyst ou Meraki.',
      tag: 'Zero Trust Network'
    },
    {
      vendor: 'Microsoft Security',
      badge: 'Identity & SIEM',
      desc: 'Especialistas nas arquiteturas de segurança da Microsoft. Atuamos com Defender for Cloud, desenho de políticas de acesso condicional no Entra ID (Azure AD) e integração de logs de auditoria no Microsoft Sentinel.',
      tag: 'Microsoft Sentinel'
    },
    {
      vendor: 'Cloudflare',
      badge: 'Edge Protection',
      desc: 'Mitigação extrema de tráfego malicioso de negação de serviços (DDoS), Web Application Firewall (WAF) avançado corporativo e entrega global de rede ultrarrápida (CDN) com suporte a túneis mTLS criptografados dedicados.',
      tag: 'Borda & mTLS Tunnel'
    },
    {
      vendor: 'Google Cloud (GCP)',
      badge: 'Cloud Segura',
      desc: 'Ambientes robustos usando IAM refinado, chaves criptográficas HSM rotativas no Cloud KMS e monitoramento de detecções e postura de segurança integrada de microsserviços por meio do Security Command Center.',
      tag: 'Google Kubernetes (GKE)'
    },
    {
      vendor: 'AWS Cloud',
      badge: 'Infraestrutura Resiliente',
      desc: 'Sólida experiência em arquiteturas seguras de nuvem pública, orquestrando grupos de VPC altamente isolados, regras do AWS WAF, auditoria contínua de configurações com AWS Config e controle de chaves via AWS KMS.',
      tag: 'AWS Identity / KMS'
    },
    {
      vendor: 'HubSpot',
      badge: 'CRM Integrado',
      desc: 'Sincronizamos canais de captação, fluxos inteligentes de automação comercial e rastreabilidade B2B sob conexões mTLS de autenticação seguras, transformando interações em inteligência estruturada de dados.',
      tag: 'HubSpot Gold Alliance'
    }
  ];

  return (
    <div className="space-y-16 pb-20 pt-8" id="parceiros-deep-view">
      
      {/* SECTION HERO */}
      <section className="text-center relative py-8">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-80 bg-brand-green/5 rounded-full filter blur-3xl pointer-events-none" />
        
        <div className="max-w-4xl mx-auto px-4 space-y-4 relative z-10">
          <span className="text-[10px] font-mono text-brand-green bg-brand-green/10 border border-brand-green/20 px-3 py-1 rounded-full uppercase tracking-wider font-semibold">
            Portfólio & Conhecimento Técnico
          </span>
          <h1 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
            Soluções Tecnológicas que <br />
            <span className="text-gradient-cyber-green">Conhecemos e Integramos</span>
          </h1>
          <p className="text-sm sm:text-base text-gray-400 max-w-2xl mx-auto font-sans">
            Não somos apenas um canal estático de vendas; dominamos do código ao firewall as principais arquiteturas dos líderes globais para integrar a melhor segurança sob medida à sua TI.
          </p>
        </div>
      </section>

      {/* CORE INTEGRATION PARTNERS GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 border-b border-brand-border/40 pb-6">
          <div className="space-y-1">
            <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest font-semibold block">Ecossistema Multipropósito</span>
            <h2 className="font-display font-bold text-xl sm:text-2xl text-white tracking-tight">
              Visão Geral das Tecnologias Homologadas
            </h2>
          </div>
          <span className="text-xs text-brand-cyan max-w-sm hidden md:block font-mono bg-brand-cyan/5 border border-brand-cyan/10 px-3 py-1.5 rounded-lg">
            ✓ Nível L3 de Especialização e Auditoria Operacional Garantido.
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {securitySolutions.map((item, idx) => (
            <motion.div 
              key={idx} 
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: (idx % 3) * 0.1, ease: "easeOut" }}
              className="bg-brand-card p-6 rounded-2xl border border-brand-border flex flex-col justify-between hover:border-brand-green/30 hover:scale-[1.01] transition-all duration-300 group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-brand-green/5 rounded-full filter blur-xl pointer-events-none" />
              <div>
                <div className="flex justify-between items-start mb-4">
                  <div className="p-2.5 bg-brand-bg rounded-xl border border-brand-border text-brand-green">
                    <Shield className="w-5 h-5 text-brand-green" />
                  </div>
                  <span className="text-[9px] font-mono bg-brand-bg border border-brand-border text-brand-cyan px-2 py-0.5 rounded-full uppercase tracking-wider">
                    {item.badge}
                  </span>
                </div>
                
                <h3 className="font-display font-black text-white text-lg tracking-tight mb-2 flex items-center space-x-1.5">
                  <span>{item.vendor}</span>
                </h3>
                
                <p className="text-xs text-gray-450 leading-relaxed font-sans mt-3">
                  {item.desc}
                </p>
              </div>
              
              <div className="pt-4 mt-6 border-t border-brand-border/40 flex justify-between items-center text-[10px] text-gray-500 font-mono">
                <span>Especialidade ativa</span>
                <span className="text-brand-green font-semibold bg-brand-green/5 border border-brand-green/10 px-2 py-0.5 rounded">
                  {item.tag}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ALLIANCE STRATEGY GLASS PANELS */}
      <section className="bg-brand-bg-sec border-y border-brand-border/40 py-16" id="alliance-advantages">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.div 
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="space-y-4 lg:pr-6"
          >
            <div className="w-1.5 h-1.5 bg-brand-cyan rounded-full animate-ping mb-3" />
            <span className="text-[10px] font-mono text-brand-cyan uppercase tracking-widest font-semibold block">Nossa Expertise</span>
            <h3 className="font-display font-bold text-xl text-white tracking-tight">
              Independência e Isenção de Canal
            </h3>
            <p className="text-xs text-gray-400 leading-relaxed font-sans">
              Seguimos preceitos modernos de arquitetura Zero Trust e isenção tecnológica. Estudamos as melhores soluções de mercado para sugerir e gerir o hardware/software que melhor atende à sua realidade de orçamento e conformidade regulatória.
            </p>
          </motion.div>

          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
              className="bg-brand-card p-5 rounded-2xl border border-brand-border/60 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="text-brand-green font-mono text-xs font-bold">01.</div>
                <h4 className="font-display font-semibold text-white text-sm tracking-tight leading-snug">Auditoria & Health Checks</h4>
                <p className="text-xs text-gray-400 leading-relaxed font-sans">Revisamos suas assinaturas correntes e configurações ativas do Defender, Fortigate e Sophos para apontar desalinhamentos ou perigos graves.</p>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
              className="bg-brand-card p-5 rounded-2xl border border-brand-border/60 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="text-brand-green font-mono text-xs font-bold">02.</div>
                <h4 className="font-display font-semibold text-white text-sm tracking-tight leading-snug">Desenhos Multivendor</h4>
                <p className="text-xs text-gray-400 leading-relaxed font-sans">Desenvolvemos esquemas híbridos unindo balanceamento AWS/GCP, tunelamentos seguros via Cloudflare e proteção perimetral Fortinet sob regras comuns.</p>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
              className="bg-brand-card p-5 rounded-2xl border border-brand-border/60 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="text-brand-green font-mono text-xs font-bold">03.</div>
                <h4 className="font-display font-semibold text-white text-sm tracking-tight leading-snug">Conformidade e Relatórios</h4>
                <p className="text-xs text-gray-400 leading-relaxed font-sans">Extração automatizada de logs consolidados de auditorias de conformidade com normativas de mercado e regulamentações LGPD brasileiras.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* BOTTOM ACTION CTA */}
      <section className="max-w-4xl mx-auto px-4 text-center">
        <div className="bg-brand-card rounded-2xl border border-brand-border p-8 space-y-4">
          <h3 className="font-display font-bold text-white text-lg tracking-tight">Utiliza uma destas tecnologias e precisa de otimização ou suporte?</h3>
          <p className="text-xs text-gray-400 max-w-xl mx-auto font-sans leading-relaxed">
            Nossos engenheiros possuem as principais certificações técnicas individuais do mercado para revisar sua configuração e mitigar vulnerabilidades ativas.
          </p>
          <button 
            onClick={() => onNavigate('contato')}
            className="mt-2 inline-flex items-center space-x-2 bg-brand-green hover:bg-[#0fd996] text-brand-bg text-xs font-display font-bold px-6 py-3 rounded-xl transition-all cursor-pointer"
          >
            <span>Solicitar Análise de Configuração</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </section>

    </div>
  );
}
