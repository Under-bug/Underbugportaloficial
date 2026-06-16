import React, { useEffect } from 'react';
import { ViewName } from '../types';
import { Scale, FileCheck, ArrowLeft, Terminal, ShieldAlert, CheckSquare } from 'lucide-react';

interface TermosViewProps {
  onNavigate: (view: ViewName) => void;
}

export default function TermosView({ onNavigate }: TermosViewProps) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 sm:py-16 space-y-12" id="termos-view-container">
      {/* HEADER */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center justify-center p-3 bg-brand-cyan/10 border border-brand-cyan/20 rounded-2xl text-brand-cyan mb-2 animate-pulse">
          <Scale className="w-6 h-6" />
        </div>
        <span className="text-[10px] font-mono text-brand-cyan bg-brand-cyan/10 border border-brand-cyan/20 px-3 py-1 rounded-full uppercase tracking-wider font-semibold block w-fit mx-auto">
          Regulamento Técnico & Governança
        </span>
        <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
          Termos de Serviço
        </h1>
        <p className="text-xs sm:text-sm text-gray-400 max-w-xl mx-auto">
          Estes termos regulam a prestação de serviços de segurança ofensiva, auditorias de infraestrutura, desenvolvimento de sistemas sob medida e inteligência de dados fornecidos pela UnderBug.
        </p>
      </div>

      {/* TERMINAL ADVISORY HEADER */}
      <div className="bg-[#0b0f19] border border-brand-border rounded-xl p-4 font-mono text-[11px] text-brand-green relative overflow-hidden" id="ethics-advisory">
        <div className="absolute top-2 right-3 flex items-center space-x-1.5 opacity-60">
          <span className="h-2 w-2 rounded-full bg-red-500 animate-ping" />
          <span>ETHICAL_USE_ONLY</span>
        </div>
        <div className="flex items-center space-x-2 text-white font-bold pb-2 border-b border-brand-border/40 mb-2">
          <Terminal className="w-4 h-4 text-brand-cyan" />
          <span>AVISO INTEGRIDADE OPERACIONAL</span>
        </div>
        <p className="text-gray-400 leading-relaxed">
          Nenhuma consultoria técnica ofensiva, varredura ativa ou mapeamento de ativos públicos sob as nossas marcas pode ser realizado contra infraestruturas corporativas sem uma licença explícita de Escopo de Teste formalmente outorgada e firmada sob responsabilidade mútua de ambas as corporações.
        </p>
      </div>

      {/* TERMS CONTENT */}
      <div className="bg-brand-card/25 border border-brand-border/40 rounded-2xl p-6 sm:p-10 space-y-8 text-xs sm:text-sm text-gray-300 leading-relaxed font-sans" id="termos-legal-body">
        <section className="space-y-3">
          <h2 className="text-base font-display font-bold text-white flex items-center gap-2">
            <CheckSquare className="w-4 h-4 text-brand-cyan" /> 1. Serviços e Modelos Comerciais
          </h2>
          <p>
            A **UnderBug Cybersecurity Corp S/A** fornece soluções integradas em três pilares principais:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-gray-400 font-mono text-[11.5px]">
            <li><strong className="text-white">Segurança Cibernética:</strong> Auditorias invasivas manuais (Pentests), assessoria de monitoramento ativo de vazamento na Deep Web e consultoria em posturas (Framework NIST, CIS, ISO 27001).</li>
            <li><strong className="text-white">Desenvolvimento Seguro:</strong> Engenharia sob medida de sistemas digitais modernos livres de vulnerabilidades desde o design (Architecture Secure Code).</li>
            <li><strong className="text-white">Inteligência de Dados:</strong> Construção de pipelines de tratamento de dados (ETL), dashboards operacionais de alta performance e automações.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-display font-bold text-white flex items-center gap-2">
            <CheckSquare className="w-4 h-4 text-brand-cyan" /> 2. Autoridades de Escopo e Isenção de Testes Ofensivos
          </h2>
          <p>
            O contratante atesta perante a lei e nos termos das auditorias que possui total autonomia e autorização legal para solicitar testes ofensivos cibernéticos no conjunto de IPs, hosts, APIs, domínios e redes designados no plano contratual de sua organização.
          </p>
          <p>
            A UnderBug Cybersecurity não se responsabiliza por eventuais instabilidades temporárias em sistemas legados que operavam em instabilidade crônica latente que venham a sofrer interrupções durante simulações manuais controladas de intrusão, salvo se pactuado de outra forma no respectivo Acordo de Nível de Serviço (SLA).
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-display font-bold text-white flex items-center gap-2">
            <CheckSquare className="w-4 h-4 text-brand-green" /> 3. Propriedade Intelectual e Suíte Proprietária
          </h2>
          <p>
            Toda a propriedade intelectual das plataformas em nuvem fornecidas pela UnderBug, incluindo os portais internos, relatórios automatizados, dashboards inteligentes, a suíte de ferramentas (SecMaturity, Cyber Explainer, Recondark, VulnScan360) e suas marcas comerciais associadas pertencem única e exclusivamente à Underbug Cybersecurity S/A.
          </p>
          <p>
            A permissão concedida ao contratante para visualizar os portais é estritamente vinculada aos prazos do licenciamento contratual, sendo intransferível, temporária e isenta de direitos de revenda de código-fonte.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-display font-bold text-white flex items-center gap-2">
            <CheckSquare className="w-4 h-4 text-brand-cyan" /> 4. Garantia Técnica de Reteste de Segurança
          </h2>
          <p>
            Qualquer serviço de segurança ofensiva compreende um reteste contratual sem ônus financeiro adicional nas dependências dos sistemas afetados na janela máxima de até **60 (sessenta) dias corridos** desde a entrega do relatório técnico oficial de vulnerabilidades operacionais. Os retestes fora desse prazo serão cobrados sob taxa adicional de conformidade e escopo de hora técnica ativa.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-display font-bold text-white flex items-center gap-2">
            <CheckSquare className="w-4 h-4 text-brand-cyan" /> 5. Limitação Geral de Responsabilidade
          </h2>
          <p>
            Nenhum sistema no mundo é 100% (cem por cento) imutável ou impenetrável. Os serviços de segurança ofensiva representam uma avaliação pontual da postura técnica de segurança da informação diante do cenário ativo de vetores conhecidos de ameaça cibernética na respectiva data de avaliação de intrusão. O surgimento de novas vulnerabilidades públicas de sistema de dia zero (Zero-day) de bibliotecas de terceiros configura evento extraordinário além da capacidade prévia de escopo técnico, não gerando obrigações contratuais retroativas automáticas.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-display font-bold text-white flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-red-400" /> 6. Rescisão e Condutas Inadequadas
          </h2>
          <p>
            Considerar-se-á quebra gravíssima das normas corporativas e éticas de mercado qualquer tentativa por parte do contratante de violar a integridade técnica das contas de terceiros em nossos servidores, disseminar engenharia reversa sob as ferramentas da Underbug, ou utilizar nossos relatórios para fins ilícitos, criminosos ou extorsão, acarretando rescisão imediata sem direito a ressarcimentos e a comunicação incontinente das autoridades penais competentes.
          </p>
        </section>

        <section className="space-y-3 border-t border-brand-border/40 pt-6">
          <p className="text-gray-400 font-mono text-xs">
            Dúvidas de interpretação legal corporativa, conformidade de contratos ou assinaturas conjuntas de cláusulas de confidencialidade (NDAs) devem ser remetidas formalmente para nossa procuradoria jurídica: <span className="text-brand-cyan font-semibold">legal@underbug.com.br</span>.
          </p>
        </section>
      </div>

      {/* FOOTER BUTTON */}
      <div className="flex justify-center pt-4">
        <button
          onClick={() => onNavigate('home')}
          className="inline-flex items-center space-x-2 px-6 py-2.5 bg-brand-card border border-brand-border hover:bg-brand-bg hover:border-brand-cyan/40 text-xs font-mono uppercase tracking-wider rounded-xl text-white transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 text-brand-cyan" />
          <span>Voltar para a Home</span>
        </button>
      </div>
    </div>
  );
}
