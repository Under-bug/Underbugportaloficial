import React, { useState } from 'react';
import { ShieldCheck, ExternalLink } from 'lucide-react';

export default function HubSpotContactForm() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="bg-brand-card rounded-2xl border border-brand-border overflow-hidden flex flex-col min-h-[780px]" id="hubspot-form-wrapper">
      {/* Form Header with Security Accent */}
      <div className="bg-gradient-to-r from-brand-bg-sec to-brand-card p-6 border-b border-brand-border block sm:flex sm:items-center sm:justify-between gap-4">
        <div className="flex items-center space-x-3 mb-4 sm:mb-0">
          <div className="p-2 bg-brand-green/10 rounded-lg border border-brand-green/20">
            <ShieldCheck className="w-6 h-6 text-brand-green" />
          </div>
          <div>
            <h4 className="font-display font-semibold text-white text-base">Agendar Consultoria Técnica</h4>
            <p className="text-xs text-gray-400">Canal oficial de atendimento</p>
          </div>
        </div>
        
        <a 
          href="https://2gjeai.share-eu1.hsforms.com/2nSaRnRN7T8yJA5VbDLAPuQ" 
          target="_blank" 
          rel="no-referrer"
          className="inline-flex items-center space-x-1 text-xs font-mono font-bold text-brand-green hover:underline shrink-0 bg-brand-green/10 border border-brand-green/20 px-3 py-1.5 rounded-lg hover:bg-brand-green hover:text-brand-bg transition-all"
        >
          <span>Abrir em Tela Cheia</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>

      {/* Mobile-friendly assistive callout */}
      <div className="bg-brand-bg p-4 border-b border-brand-border text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-xs text-gray-300 font-sans">
          Está no celular? Abra o formulário oficial para uma digitação mais fácil e fluida.
        </p>
        <a 
          href="https://2gjeai.share-eu1.hsforms.com/2nSaRnRN7T8yJA5VbDLAPuQ" 
          target="_blank" 
          rel="noopener noreferrer"
          className="w-full sm:w-auto text-center px-4 py-1.5 bg-brand-cyan hover:bg-brand-cyan/90 text-brand-bg text-[11px] font-display font-bold rounded-lg transition-colors whitespace-nowrap"
        >
          PREENCHER NO HUBSPOT
        </a>
      </div>

      {/* HubSpot Embedded IFrame Form Container with increased height for no-scrollbar scrolling */}
      <div className="flex-grow bg-white min-h-[660px] relative">
        {/* Loading Spinner State */}
        {isLoading && (
          <div className="absolute inset-0 flex flex-col justify-center items-center bg-gray-50 select-none pointer-events-none z-0">
            <div className="animate-spin rounded-full h-8 w-8 border-2 border-brand-green border-t-transparent animate-pulse" />
            <span className="text-[10px] text-gray-550 font-mono mt-3 uppercase tracking-wider">CARREGANDO CANAL HUBSPOT...</span>
          </div>
        )}
        
        <iframe 
          src="https://2gjeai.share-eu1.hsforms.com/2nSaRnRN7T8yJA5VbDLAPuQ"
          title="HubSpot Contact Form"
          className="w-full h-full min-h-[660px] relative z-10 border-0"
          onLoad={() => setIsLoading(false)}
          referrerPolicy="no-referrer"
        />
      </div>

      {/* Footer Badge */}
      <div className="bg-brand-bg-sec p-3.5 border-t border-brand-border text-center text-xs text-gray-400 font-mono flex items-center justify-center space-x-1.5 shrink-0 select-none">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-green opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-green"></span>
        </span>
        <span>Canal Direto Autenticado HubSpot CRM Segurado</span>
      </div>
    </div>
  );
}
