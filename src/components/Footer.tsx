import React from 'react';
import { ViewName } from '../types';
import { Shield, ShieldAlert, Mail, Phone, MapPin, ExternalLink, ArrowUp, Award } from 'lucide-react';
import UnderbugLogo from './UnderbugLogo';

interface FooterProps {
  onNavigate: (view: ViewName) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const handleLogoClick = () => {
    onNavigate('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-bg border-t border-brand-border pt-16 pb-8" id="underbug-footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-12 border-b border-brand-border/40">
          
          {/* Column 1: Brand Info */}
          <div className="space-y-4">
            <div onClick={handleLogoClick} className="flex items-center cursor-pointer group">
              <UnderbugLogo size="sm" className="transition-transform group-hover:scale-105 duration-200" />
            </div>
            
            <p className="text-xs text-gray-400 leading-relaxed font-sans">
              Segurança Cibernética Inteligente focada na resiliência de negócios digitais críticos. Proteção de ponta a ponta na América Latina.
            </p>

            <div className="flex flex-col space-y-1.5 text-xs text-gray-400 font-mono">
              <span className="flex items-center"><Mail className="w-3.5 h-3.5 text-brand-cyan mr-1.5" /> contato@underbug.com.br</span>
              <span className="flex items-center"><Phone className="w-3.5 h-3.5 text-brand-cyan mr-1.5" /> +55 11 97431-0441</span>
              <span className="flex items-center"><MapPin className="w-3.5 h-3.5 text-brand-cyan mr-1.5" /> Trabalho 100% Remoto</span>
            </div>
          </div>

          {/* Column 2: Solutions */}
          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider font-mono mb-4">Plataforma & Soluções</h4>
            <ul className="space-y-2 text-xs text-gray-400">
              <li>
                <button onClick={() => { onNavigate('plataforma'); window.scrollTo({top:0, behavior:'smooth'}); }} className="hover:text-brand-green transition-colors cursor-pointer text-left">
                  SecMaturity - Score de Postura
                </button>
              </li>
              <li>
                <button onClick={() => { onNavigate('plataforma'); window.scrollTo({top:0, behavior:'smooth'}); }} className="hover:text-brand-green transition-colors cursor-pointer text-left">
                  Cyber Explainer - Breach Simulator
                </button>
              </li>
              <li>
                <button onClick={() => { onNavigate('plataforma'); window.scrollTo({top:0, behavior:'smooth'}); }} className="hover:text-brand-green transition-colors cursor-pointer text-left">
                  Recondark - Deep Web Threat Scanning
                </button>
              </li>
              <li>
                <button onClick={() => { onNavigate('plataforma'); window.scrollTo({top:0, behavior:'smooth'}); }} className="hover:text-brand-green transition-colors cursor-pointer text-left">
                  VulnScan360 - Mapeamento de Portas
                </button>
              </li>
              <li className="pt-1 border-t border-brand-border/20 mt-1">
                <button onClick={() => { onNavigate('ferramentas'); window.scrollTo({top:0, behavior:'smooth'}); }} className="text-brand-green hover:text-[#46ddab] font-semibold transition-colors cursor-pointer text-left flex items-center">
                  Ferramentas Free de Teste
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Services */}
          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider font-mono mb-4">Serviços Enterprise</h4>
            <ul className="space-y-2 text-xs text-gray-400">
              <li>
                <button onClick={() => { onNavigate('servicos'); window.scrollTo({top:0, behavior:'smooth'}); }} className="hover:text-brand-green transition-colors cursor-pointer text-left">
                  Pentest Ofensivo Avançado (White/Black)
                </button>
              </li>
              <li>
                <button onClick={() => { onNavigate('servicos'); window.scrollTo({top:0, behavior:'smooth'}); }} className="hover:text-brand-green transition-colors cursor-pointer text-left">
                  EDR Management & Endpoint Shield
                </button>
              </li>
              <li>
                <button onClick={() => { onNavigate('servicos'); window.scrollTo({top:0, behavior:'smooth'}); }} className="hover:text-brand-green transition-colors cursor-pointer text-left">
                  Gestão Cloudflare Enterprise (WAF/ZeroTrust)
                </button>
              </li>
              <li>
                <button onClick={() => { onNavigate('servicos'); window.scrollTo({top:0, behavior:'smooth'}); }} className="hover:text-brand-green transition-colors cursor-pointer text-left">
                  Hardening de Switches & DevSecOps Pipelines
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter/Compliance */}
          <div className="space-y-4">
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider font-mono">Conformidade & Inteligência</h4>
            <p className="text-xs text-gray-400 font-sans">
              Receba relatórios de ameaças cibernéticas semanais produzidos pelo nosso Threat Analysis Lab.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Seu e-mail corporativo"
                className="bg-brand-bg-sec border border-brand-border text-xs px-3 py-2 rounded-l-lg text-white w-full focus:outline-none focus:border-brand-green"
              />
              <button className="bg-brand-green text-brand-bg hover:bg-[#46ddab] px-3 rounded-r-lg font-bold text-xs" onClick={() => alert('Obrigado! Cadastro efetuado.')}>
                Assinar
              </button>
            </div>
            <div className="flex space-x-2 text-xs text-gray-400">
              <span className="flex items-center text-[10px] text-[#0fd996] font-mono border border-[#0fd996]/20 rounded bg-[#0fd996]/5 px-1.5 py-0.5">
                <Award className="w-3 h-3 mr-1" /> Pentest Certificado pela OSCP & CISSP
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 text-[11px] text-gray-500 font-mono gap-4">
          <div className="flex flex-wrap gap-x-4 gap-y-2 justify-center md:justify-start items-center">
            <span>© {currentYear} UnderBug Cybersecurity Corp S/A. CNPJ 38.291.902/0001-99.</span>
            <span className="text-gray-700">|</span>
            <button 
              onClick={() => { onNavigate('politica'); window.scrollTo({top:0, behavior:'smooth'}); }} 
              className="hover:text-white transition-colors cursor-pointer"
            >
              Política de Privacidade
            </button>
            <span className="text-gray-700">|</span>
            <button 
              onClick={() => { onNavigate('termos'); window.scrollTo({top:0, behavior:'smooth'}); }} 
              className="hover:text-white transition-colors cursor-pointer"
            >
              Termos de Serviço
            </button>
          </div>
          <div className="text-right text-gray-600 flex items-center">
            <span>Soberania Cibernética & Resiliência</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
