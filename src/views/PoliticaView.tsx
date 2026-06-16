import React, { useEffect } from 'react';
import { ViewName } from '../types';
import { Shield, Eye, Lock, FileText, ArrowLeft, CheckCircle2 } from 'lucide-react';

interface PoliticaViewProps {
  onNavigate: (view: ViewName) => void;
}

export default function PoliticaView({ onNavigate }: PoliticaViewProps) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 sm:py-16 space-y-12" id="politica-view-container">
      {/* HEADER */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center justify-center p-3 bg-brand-green/10 border border-brand-green/20 rounded-2xl text-brand-green mb-2 animate-pulse">
          <Shield className="w-6 h-6" />
        </div>
        <span className="text-[10px] font-mono text-brand-green bg-brand-green/10 border border-brand-green/20 px-3 py-1 rounded-full uppercase tracking-wider font-semibold block w-fit mx-auto">
          Segurança Legal & Governança
        </span>
        <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
          Política de Privacidade
        </h1>
        <p className="text-xs sm:text-sm text-gray-400 max-w-xl mx-auto">
          Na UnderBug, a confidencialidade e a blindagem de seus dados são as nossas maiores prioridades operacionais. Saiba como gerenciamos informações.
        </p>
      </div>

      {/* QUICK STATS / HIGHLIGHTS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4" id="politica-highlights">
        <div className="p-4 bg-brand-card/40 rounded-xl border border-brand-border/60 flex items-start space-x-3">
          <div className="p-2 bg-brand-green/10 rounded-lg text-brand-green">
            <Lock className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-mono font-bold text-white uppercase">Criptografia Forte</h4>
            <p className="text-[11px] text-gray-400 mt-0.5">Resguardos eletrônicos sob padrão militar AES-256 de fluxos.</p>
          </div>
        </div>
        <div className="p-4 bg-brand-card/40 rounded-xl border border-brand-border/60 flex items-start space-x-3">
          <div className="p-2 bg-brand-cyan/10 rounded-lg text-brand-cyan">
            <Eye className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-mono font-bold text-white uppercase">LGPD Compliant</h4>
            <p className="text-[11px] text-gray-400 mt-0.5">Adequação jurídica estrita à Lei Geral de Proteção de Dados brasileira.</p>
          </div>
        </div>
        <div className="p-4 bg-brand-card/40 rounded-xl border border-brand-border/60 flex items-start space-x-3">
          <div className="p-2 bg-brand-blue/10 rounded-lg text-brand-blue">
            <FileText className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-mono font-bold text-white uppercase font-sans">Zero Leak Policy</h4>
            <p className="text-[11px] text-gray-400 mt-0.5">Zelo absoluto por relatórios confidenciais de vulnerabilidades.</p>
          </div>
        </div>
      </div>

      {/* MAIN LEGAL CONTENT */}
      <div className="bg-brand-card/25 border border-brand-border/40 rounded-2xl p-6 sm:p-10 space-y-8 text-xs sm:text-sm text-gray-300 leading-relaxed font-sans" id="politica-legal-body">
        <section className="space-y-3">
          <h2 className="text-base font-display font-bold text-white flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-brand-green" /> 1. Introdução e Escopo
          </h2>
          <p>
            A **UnderBug Cybersecurity Corp S/A** (denominada simplesmente "UnderBug" ou "nós"), fundada em 2025, se compromete solenemente com a privacidade e a segurança das informações de seus clientes, parceiros, colaboradores e visitantes de nosso ecossistema digital.
          </p>
          <p>
            Esta política rege a coleta, o tratamento, o armazenamento e a eliminação de dados pessoais obtidos através do nosso portal publicamente acessível, bem como das nossas ferramentas internas proprietárias (SecMaturity, Cyber Explainer, Recondark e VulnScan360).
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-display font-bold text-white flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-brand-cyan" /> 2. Coleta e Finalidade dos Dados
          </h2>
          <p>
            Coletamos apenas as informações estritamente necessárias para a prestação de serviços de segurança cibernética corporativa B2B e o desenvolvimento seguro de softwares de missão crítica. Isso pode compreender:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-gray-400 font-mono text-[11.5px]">
            <li><strong className="text-white">Dados Cadastrais Corporativos:</strong> Nome, cargo, e-mail coorporativo, telefone e nome da organização para fins de proposta comercial e estudos de postura de segurança.</li>
            <li><strong className="text-white">Metadados Técnicos de Redes:</strong> IPs de origem submetidos voluntariamente em testes de intrusão (Pentests) e varreduras ativas sob autorização prévia por escrito.</li>
            <li><strong className="text-white">Logs de Interação Digital:</strong> Dados técnicos para prevenção de fraudes, integridade de sessões e conformidade regulatória.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-display font-bold text-white flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-brand-blue" /> 3. Confidencialidade Absoluta das Auditorias
          </h2>
          <p>
            Por determinação ética rigorosa e governança de segurança corporativa, todos os artefatos de testes de invasão, códigos de vulnerabilidades identificadas e relatórios de conformidade SecMaturity ou monitoramento Deep Web pelo Recondark são tratados de maneira restrita com controles rígidos:
          </p>
          <p>
            Não repassamos, divulgamos ou comercializamos relatórios preliminares ou definitivos sob hipótese alguma a terceiros não autorizados. Os relatórios de vulnerabilidades operam sob chaves de criptografia exclusivas gerenciadas pelo cliente final.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-display font-bold text-white flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-brand-green" /> 4. Direitos sob a LGPD (Lei nº 13.709/18)
          </h2>
          <p>
            Nos termos da legislação brasileira, você possui direitos irrestritos e garantidos sobre suas informações digitais. Isso abrange:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 text-gray-400 text-xs font-mono">
            <div className="p-3 bg-brand-bg/50 rounded-lg border border-brand-border/40">
              <span className="text-white font-semibold">Exclusão Permanente</span>: Solicitar a eliminação total de leads ou dados passados de interações em nossos canais digitais.
            </div>
            <div className="p-3 bg-brand-bg/50 rounded-lg border border-brand-border/40">
              <span className="text-white font-semibold">Confirmação de Tratamento</span>: Verificar se a Underbug retém alguma informação de contato de sua organização.
            </div>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-display font-bold text-white flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-brand-cyan" /> 5. Retenção de Dados e Descarte Seguro
          </h2>
          <p>
            Conservamos as informações coletadas apenas pelo tempo necessário para atingir as finalidades indicadas nestas disposições ou obrigações contratuais pactuadas. Concluído o ciclo de vida ou encerrado o contrato comercial de consultoria, aplicamos metodologias criptográficas de descarte seguro para garantir a impossibilidade de recuperação dos relatórios técnicos.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-display font-bold text-white flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-brand-green" /> 6. Atualizações Desta Política
          </h2>
          <p>
            Esta política de privacidade e proteção técnica de dados corporativos é periodicamente revisada para manter sintonia fina com as melhores regulações internacionais e com a evolução constante das táticas de defesas de rede. Esta versão foi atualizada em **Junho de 2026**.
          </p>
        </section>

        <section className="space-y-3 border-t border-brand-border/40 pt-6">
          <p className="text-gray-400 font-mono text-xs">
            Caso sua organização delegue perguntas de conformidade, preenchimento de SOC-2 ou requisições técnicas de proteção de canais, entre em contato através de nosso time de DPO Oficial: <span className="text-brand-green font-semibold">privacy@underbug.com.br</span>.
          </p>
        </section>
      </div>

      {/* FOOTER BUTTON */}
      <div className="flex justify-center pt-4">
        <button
          onClick={() => onNavigate('home')}
          className="inline-flex items-center space-x-2 px-6 py-2.5 bg-brand-card border border-brand-border hover:bg-brand-bg hover:border-brand-green/40 text-xs font-mono uppercase tracking-wider rounded-xl text-white transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 text-brand-green" />
          <span>Voltar para a Home</span>
        </button>
      </div>
    </div>
  );
}
