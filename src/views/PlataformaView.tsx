import React, { useState } from 'react';
import { PlatformId, ViewName } from '../types';
import { Shield, ShieldAlert, ShieldCheck, CheckCircle2, Zap, Radio, Search, Terminal, ArrowRight, ArrowLeft, RefreshCw, AlertOctagon, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface PlataformaViewProps {
  initialPlatformId?: PlatformId;
  onNavigate: (view: ViewName) => void;
}

export default function PlataformaView({ initialPlatformId = 'secmaturity', onNavigate }: PlataformaViewProps) {
  const [activePlatform, setActivePlatform] = useState<PlatformId>(initialPlatformId);

  // Platform 1: SecMaturity State
  const [answers, setAnswers] = useState({
    mfa: false,
    backups: false,
    inventory: false,
    pentest: false,
    incidentPlan: false,
  });

  // Platform 2: Cyber Explainer State
  const [selectedLog, setSelectedLog] = useState('raw-waf-block');
  const [explainedText, setExplainedText] = useState('');
  const [isExplaining, setIsExplaining] = useState(false);

  // Platform 3: Recondark State
  const [scanDomain, setScanDomain] = useState('');
  const [isRecondarkScanning, setIsRecondarkScanning] = useState(false);
  const [recondarkResults, setRecondarkResults] = useState<any[] | null>(null);

  // Platform 4: VulnScan360 State
  const [scanPortTarget, setScanPortTarget] = useState('10.0.84.14');
  const [isVulnScanning, setIsVulnScanning] = useState(false);
  const [vulnResultPorts, setVulnResultPorts] = useState<any[] | null>(null);

  // Calculate Dynamic maturity score for SecMaturity
  const calculateMaturityScore = () => {
    let score = 30; // base score
    if (answers.mfa) score += 15;
    if (answers.backups) score += 15;
    if (answers.inventory) score += 10;
    if (answers.pentest) score += 15;
    if (answers.incidentPlan) score += 15;
    return score;
  };

  const getMaturityTier = (score: number) => {
    if (score < 50) return { name: 'Crítico (Exposição Elevada)', color: 'text-red-500', action: 'Recomenda-se Pentest Ofensivo Imediato e isolamento de hosts.' };
    if (score < 80) return { name: 'Intermediário (Resiliência Média)', color: 'text-amber-500', action: 'Necessário EDR Management ativo e Gestão de Vulnerabilidades contínua.' };
    return { name: 'Excelente (Nível Enterprise)', color: 'text-brand-green', action: 'Postura madura. Mantenha rotinas de Hardening e auditorias anuais.' };
  };

  // Explaining actions for Cyber Explainer
  const handleExplainLog = () => {
    setIsExplaining(true);
    setExplainedText('');
    setTimeout(() => {
      if (selectedLog === 'raw-waf-block') {
        setExplainedText(
          'IMPACTO DO INCIDENTE:\nUm script malicioso tentou injetar comandos de banco de dados (SQL Injection) em seu formulário de login para extrair emails e senhas.\n\nAÇÃO DA UNDERBUG:\nO Cloudflare WAF interceptou e bloqueou de forma autônoma o invasor em 2ms na borda da rede. Nenhum dado foi vazado e o servidor se manteve operando sem sobrecarga.'
        );
      } else if (selectedLog === 'raw-edr-alert') {
        setExplainedText(
          'IMPACTO DO INCIDENTE:\nUm computer administrativo executou um script anônimo disfarçado de documento em PDF. Era um ransomware tentando paralisar arquivos.\n\nAÇÃO DA UNDERBUG:\nO agente EDR (Endpoint Detection & Response) interceptou o comportamento anormal, interrompeu o processo com força e isolou o computador de se comunicar com a intranet.'
        );
      } else {
        setExplainedText(
          'IMPACTO DO INCIDENTE:\nUm IP desconhecido tentou burlar a autenticação de privilégios superiores do Painel de Controle Principal sem token MFA válido (MFA Bypass attempt).\n\nAÇÃO DA UNDERBUG:\nA política de Zero Trust bloqueou a requisição na origem do IP externo e registrou alerta de risco alto de credencial comprometida.'
        );
      }
      setIsExplaining(false);
    }, 1000);
  };

  // Recondark Simulated Leak scan
  const handleRecondarkScan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!scanDomain.trim()) return;
    setIsRecondarkScanning(true);
    setRecondarkResults(null);

    setTimeout(() => {
      const parsed = scanDomain.replace('https://', '').replace('www.', '').split('/')[0];
      setRecondarkResults([
        { email: `diretor.financeiro@${parsed}`, severity: 'ALTA', source: 'RansomHouse Breach (Maio 2026)', status: 'Vazamento Real de Hash SHA-2 nomeado' },
        { email: `desenvolvedor.ops@${parsed}`, severity: 'CRÍTICA', source: 'Redacted Git Secret Leak (Junho 2026)', status: 'Chave SSH privada exposta em repositório público' },
        { email: `suporte.it@${parsed}`, severity: 'MÉDIA', source: 'Generic Stealer Logs', status: 'Senha genérica em plaintext' },
      ]);
      setIsRecondarkScanning(false);
    }, 1500);
  };

  // VulnScan360 run
  const handleVulnScan = () => {
    setIsVulnScanning(true);
    setVulnResultPorts(null);
    setTimeout(() => {
      setVulnResultPorts([
        { port: '80/tcp', status: 'warning', service: 'HTTP (Exposto)', info: 'Redirecionamento inseguro encontrado. Recomendado Cloudflare SSL Enforce.' },
        { port: '443/tcp', status: 'safe', service: 'HTTPS (Seguro)', info: 'Configurado TLS 1.3 robusto via Cloudflare Edge.' },
        { port: '22/tcp', status: 'critical', service: 'SSH (Exposto)', info: 'Porta visível publicamente na internet. Alto risco de brute force. Recomendado isolamento em VPN.' },
        { port: '3306/tcp', status: 'secured', service: 'MySQL (Isolado)', info: 'Protegido atrás de rede interna não mapeável.' },
      ]);
      setIsVulnScanning(false);
    }, 1600);
  };

  const platforms = [
    {
      id: 'secmaturity' as PlatformId,
      name: 'SecMaturity',
      subtitle: 'Estruture sua governança e score cibernético',
      desc: 'Um sistema inteligente que quantifica em tempo de execução a segurança operacional e avalia a conformidade corporativa.'
    },
    {
      id: 'explainer' as PlatformId,
      name: 'Cyber Explainer',
      subtitle: 'Comunicação executiva de brechas lógicas',
      desc: 'Gera contextualização automática de alertas intrincados de rede em texto legível para CFOs, CEOs e decidores de negócio.'
    },
    {
      id: 'recondark' as PlatformId,
      name: 'Recondark',
      subtitle: 'Varredura passiva de credenciais expostas',
      desc: 'Vasculha bancos de dados da Deep Web e fóruns de ransomware de forma automatizada por credenciais da empresa.'
    },
    {
      id: 'vulnscan' as PlatformId,
      name: 'VulnScan360',
      subtitle: 'Mapeamento instantâneo de vetores expostos',
      desc: 'Realiza auditorias automáticas nos principais IPs e domínios do seu ecossistema para mapear portas abertas perigosas.'
    },
  ];

  return (
    <div className="space-y-16 pb-20 pt-8" id="plataforma-deep-view">
      
      {/* SECTION HERO */}
      <section className="text-center relative py-8">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-80 bg-brand-cyan/5 rounded-full filter blur-3xl pointer-events-none" />
        
        <div className="max-w-4xl mx-auto px-4 space-y-4 relative z-10">
          <span className="text-[10px] font-mono text-brand-green uppercase tracking-widest font-semibold bg-brand-green/10 border border-brand-green/20 px-3 py-1 rounded-full">
            Nossa Tecnologia Proprietária
          </span>
          <h1 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
            Nossa Suíte de Observabilidade SaaS
          </h1>
          <p className="text-sm sm:text-base text-gray-400 max-w-2xl mx-auto">
            Desenvolvemos tecnologias exclusivas que dão a CISOs e equipes de infraestrutura o controle definitivo de brechas, maturidade e vazamentos da Deep Web.
          </p>
        </div>
      </section>

      {/* PLATFORMS NAV TABS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap md:flex-nowrap gap-2 bg-brand-card/60 p-2 rounded-2xl border border-brand-border">
          {platforms.map((p) => {
            const isSelected = activePlatform === p.id;
            return (
              <button
                key={p.id}
                id={`tab-${p.id}`}
                onClick={() => {
                  setActivePlatform(p.id);
                  setExplainedText('');
                  setRecondarkResults(null);
                  setVulnResultPorts(null);
                }}
                className={`w-full py-4 px-5 rounded-xl transition-all duration-300 text-left cursor-pointer ${
                  isSelected
                    ? 'bg-brand-bg border border-brand-blue/60 text-white shadow-lg shadow-brand-blue/10'
                    : 'text-gray-400 hover:text-white hover:bg-brand-card'
                }`}
              >
                <h3 className="text-sm font-bold tracking-wide flex items-center">
                  <span className="mr-2 text-brand-green flex items-center shrink-0">
                    {p.id === 'secmaturity' ? (
                      <ShieldCheck className="w-4 h-4" />
                    ) : p.id === 'explainer' ? (
                      <HelpCircle className="w-4 h-4" />
                    ) : p.id === 'recondark' ? (
                      <Terminal className="w-4 h-4" />
                    ) : (
                      <Zap className="w-4 h-4" />
                    )}
                  </span>
                  {p.name}
                </h3>
                <p className="text-[10.5px] mt-1 text-gray-500 leading-tight block truncate">
                  {p.subtitle}
                </p>
              </button>
            );
          })}
        </div>
      </section>

      {/* ACTIVE PLATFORM DEEP-DIVE DISPLAY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-brand-card rounded-3xl border border-brand-border overflow-hidden grid grid-cols-1 lg:grid-cols-2">
          
          {/* Left panel: Info, Features & Benefits */}
          <div className="p-8 md:p-12 space-y-6 lg:border-r border-brand-border flex flex-col justify-between">
            <div className="space-y-6">
              <div className="flex items-center space-x-2">
                <span className="text-xs font-mono text-brand-green bg-brand-green/10 border border-brand-green/20 py-1 px-3 rounded-full uppercase tracking-wider font-semibold">
                  MÓDULO ATIVO ({activePlatform.toUpperCase()})
                </span>
              </div>

              {activePlatform === 'secmaturity' && (
                <div className="space-y-4">
                  <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight">
                    SecMaturity: Posture Conformity
                  </h2>
                  <p className="text-xs sm:text-sm text-gray-400 font-sans leading-relaxed">
                    Identificar a resiliência no nível operacional ou perante marcos de regulamentos internacionais é vital. O SecMaturity consolida dados de inventários e questionários adaptativos de CIS Controls para gerar pontuações de prumo em auditorias.
                  </p>

                  <div className="space-y-3 pt-2">
                    <h4 className="text-xs font-mono text-brand-cyan uppercase tracking-wider font-semibold">Vantagens de Negócio</h4>
                    <ul className="space-y-2 text-xs text-gray-300">
                      <li className="flex items-center"><CheckCircle2 className="w-4 h-4 text-brand-green mr-2 shrink-0" /> Mapeamento automatizado contra CIS Controls v8 e LGPD.</li>
                      <li className="flex items-center"><CheckCircle2 className="w-4 h-4 text-brand-green mr-2 shrink-0" /> Geração de relatórios em formato PDF com plano remanescente estruturado.</li>
                      <li className="flex items-center"><CheckCircle2 className="w-4 h-4 text-brand-green mr-2 shrink-0" /> Score adaptativo que melhora a percepção de prêmio de seguros cibernéticos.</li>
                    </ul>
                  </div>
                </div>
              )}

              {activePlatform === 'explainer' && (
                <div className="space-y-4">
                  <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight">
                    Cyber Explainer: AI Intelligence
                  </h2>
                  <p className="text-xs sm:text-sm text-gray-400 font-sans leading-relaxed">
                    Pontes eficientes de comunicação salvam negócios. O Cyber Explainer traduz logs estéreis e hashes complicadas de firewalls em justificativas de negócios que diretores e membros de conselho conseguem apoiar instantaneamente.
                  </p>

                  <div className="space-y-3 pt-2">
                    <h4 className="text-xs font-mono text-brand-cyan uppercase tracking-wider font-semibold">Vantagens de Negócio</h4>
                    <ul className="space-y-2 text-xs text-gray-300">
                      <li className="flex items-center"><CheckCircle2 className="w-4 h-4 text-brand-green mr-2 shrink-0" /> Tradução de logs brutos WAF/EDR/SOC para humanos em português.</li>
                      <li className="flex items-center"><CheckCircle2 className="w-4 h-4 text-brand-green mr-2 shrink-0" /> Avaliações automatizadas de riscos de responsabilidades legais e multas.</li>
                      <li className="flex items-center"><CheckCircle2 className="w-4 h-4 text-brand-green mr-2 shrink-0" /> Tomada ágil de decisão executiva em cenários de crises de rede.</li>
                    </ul>
                  </div>
                </div>
              )}

              {activePlatform === 'recondark' && (
                <div className="space-y-4">
                  <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight">
                    Recondark: Deep Web Leak Scan
                  </h2>
                  <p className="text-xs sm:text-sm text-gray-400 font-sans leading-relaxed">
                    Credenciais e segredos vazados no GitHub público ou fóruns underground são o primeiro vetor de roubo corporativo. O Recondark faz escaneamentos inteligentes e automáticos sem violar a privacidade dos funcionários do domínio da sua empresa.
                  </p>

                  <div className="space-y-3 pt-2">
                    <h4 className="text-xs font-mono text-brand-cyan uppercase tracking-wider font-semibold">Vantagens de Negócio</h4>
                    <ul className="space-y-2 text-xs text-gray-300">
                      <li className="flex items-center"><CheckCircle2 className="w-4 h-4 text-brand-green mr-2 shrink-0" /> Monitoramento contínuo de commits em git comunitário para segredos esquecidos.</li>
                      <li className="flex items-center"><CheckCircle2 className="w-4 h-4 text-brand-green mr-2 shrink-0" /> Rápida notificação de vazamentos identificados antes do abuso.</li>
                      <li className="flex items-center"><CheckCircle2 className="w-4 h-4 text-brand-green mr-2 shrink-0" /> Cobertura em bancos da Dark Web de acessos a VPS ou Intranet corporativa.</li>
                    </ul>
                  </div>
                </div>
              )}

              {activePlatform === 'vulnscan' && (
                <div className="space-y-4">
                  <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight">
                    VulnScan360: Port Guard
                  </h2>
                  <p className="text-xs sm:text-sm text-gray-400 font-sans leading-relaxed">
                    Invasores buscam as portas mais vulneráveis de entrada. O VulnScan360 escaneia passivamente pacotes de respostas DNS, certificados SSL fracos e portas perigosas expostas em sua infraestrutura por engano de deploys.
                  </p>

                  <div className="space-y-3 pt-2">
                    <h4 className="text-xs font-mono text-brand-cyan uppercase tracking-wider font-semibold">Vantagens de Negócio</h4>
                    <ul className="space-y-2 text-xs text-gray-300">
                      <li className="flex items-center"><CheckCircle2 className="w-4 h-4 text-brand-green mr-2 shrink-0" /> Varreduras que não sobrecarregam nem paralisam seus servidores ativos.</li>
                      <li className="flex items-center"><CheckCircle2 className="w-4 h-4 text-brand-green mr-2 shrink-0" /> Identificação rápida de portas de desenvolvimento de teste abertas ao público.</li>
                      <li className="flex items-center"><CheckCircle2 className="w-4 h-4 text-brand-green mr-2 shrink-0" /> Integração transparente com plano de Gestão de Vulnerabilidade UnderBug.</li>
                    </ul>
                  </div>
                </div>
              )}
            </div>

            <div className="pt-8 border-t border-brand-border/40 mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-gray-500 font-mono">
                Mecanismo SaaS Premium 2026
              </div>
              <button
                onClick={() => onNavigate('contato')}
                className="w-full sm:w-auto bg-brand-green hover:bg-[#3ae0a9] text-brand-bg transition-colors font-display font-bold text-xs py-3 px-6 rounded-xl flex items-center justify-center space-x-1"
              >
                <span>Diagnóstico Com Solução Proprietária</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right panel: THE DYNAMIC INTERACTIVE PREVIEW PANEL */}
          <div className="p-8 md:p-12 bg-brand-bg-sec/55 relative flex flex-col justify-center min-h-[440px]">
            <div className="absolute inset-0 bg-cyber-gradient opacity-30 pointer-events-none" />
            
            {/* SecMaturity Calculator Interactivity */}
            {activePlatform === 'secmaturity' && (
              <div className="space-y-4 relative z-10 bg-brand-card/90 p-5 rounded-2xl border border-brand-border glow-cyber-blue">
                <div className="flex justify-between items-center pb-2 border-b border-brand-border/60">
                  <span className="text-[10px] font-mono text-brand-cyan uppercase tracking-widest font-semibold flex items-center">
                    <Terminal className="w-3.5 h-3.5 text-brand-cyan mr-1.5" /> SECMATURITY PREVIEW SIMULATOR
                  </span>
                  <span className="text-[11px] font-mono text-gray-500">CIS/ISO SURVEY</span>
                </div>

                <div className="space-y-2.5">
                  <p className="text-xs text-gray-400">Verifique os itens abaixo para estimar o seu score institucional em tempo real:</p>
                  
                  <div className="space-y-1.5 text-xs text-gray-200">
                    <label className="flex items-center space-x-2.5 cursor-pointer bg-brand-bg/50 p-2 rounded-lg border border-brand-border/40 hover:border-brand-green/30 transition-colors">
                      <input
                        type="checkbox"
                        checked={answers.mfa}
                        onChange={(e) => setAnswers(prev => ({ ...prev, mfa: e.target.checked }))}
                        className="rounded border-gray-600 text-brand-green focus:ring-brand-green bg-brand-bg"
                      />
                      <span>MFA obrigatório para TODOS os colaboradores (+15 pts)</span>
                    </label>

                    <label className="flex items-center space-x-2.5 cursor-pointer bg-brand-bg/50 p-2 rounded-lg border border-brand-border/40 hover:border-brand-green/30 transition-colors">
                      <input
                        type="checkbox"
                        checked={answers.backups}
                        onChange={(e) => setAnswers(prev => ({ ...prev, backups: e.target.checked }))}
                        className="rounded border-gray-600 text-brand-green focus:ring-brand-green bg-brand-bg"
                      />
                      <span>Backup imutável offline (Zero ransomware lockout +15 pts)</span>
                    </label>

                    <label className="flex items-center space-x-2.5 cursor-pointer bg-brand-bg/50 p-2 rounded-lg border border-brand-border/40 hover:border-brand-green/30 transition-colors">
                      <input
                        type="checkbox"
                        checked={answers.inventory}
                        onChange={(e) => setAnswers(prev => ({ ...prev, inventory: e.target.checked }))}
                        className="rounded border-gray-600 text-brand-green focus:ring-brand-green bg-brand-bg"
                      />
                      <span>Inventário atualizado de ativos e redes (+10 pts)</span>
                    </label>

                    <label className="flex items-center space-x-2.5 cursor-pointer bg-brand-bg/50 p-2 rounded-lg border border-brand-border/40 hover:border-brand-green/30 transition-colors">
                      <input
                        type="checkbox"
                        checked={answers.pentest}
                        onChange={(e) => setAnswers(prev => ({ ...prev, pentest: e.target.checked }))}
                        className="rounded border-gray-600 text-brand-green focus:ring-brand-green bg-brand-bg"
                      />
                      <span>Pentests regulares anuais com reteste (+15 pts)</span>
                    </label>

                    <label className="flex items-center space-x-2.5 cursor-pointer bg-brand-bg/50 p-2 rounded-lg border border-brand-border/40 hover:border-brand-green/30 transition-colors">
                      <input
                        type="checkbox"
                        checked={answers.incidentPlan}
                        onChange={(e) => setAnswers(prev => ({ ...prev, incidentPlan: e.target.checked }))}
                        className="rounded border-gray-600 text-brand-green focus:ring-brand-green bg-brand-bg"
                      />
                      <span>Plano estruturado de Resposta a Incidentes certificado (+15 pts)</span>
                    </label>
                  </div>
                </div>

                {/* Score dynamic layout */}
                <div className="bg-brand-bg p-4 rounded-xl border border-brand-border flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-gray-500 font-mono tracking-widest block font-bold">CONFORMIDADE ESTIMADA</span>
                    <span className={`text-xs font-bold ${getMaturityTier(calculateMaturityScore()).color}`}>
                      {getMaturityTier(calculateMaturityScore()).name}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-display font-extrabold text-white block">
                      {calculateMaturityScore()}%
                    </span>
                  </div>
                </div>
                <p className="text-[10px] font-mono text-gray-500 leading-tight">
                  *Plano de Ação: {getMaturityTier(calculateMaturityScore()).action}
                </p>
              </div>
            )}

            {/* Cyber Explainer Interactivity */}
            {activePlatform === 'explainer' && (
              <div className="space-y-4 relative z-10 bg-brand-card/90 p-5 rounded-2xl border border-brand-border glow-cyber-green">
                <div className="flex justify-between items-center pb-2 border-b border-brand-border/60">
                  <span className="text-[10px] font-mono text-brand-green uppercase tracking-widest font-semibold flex items-center">
                    <Terminal className="w-3.5 h-3.5 text-brand-green mr-1.5" /> CYBER EXPLAINER PREVIEW
                  </span>
                  <span className="text-[11px] font-mono text-gray-500">RAW LOG PARSER</span>
                </div>

                <div className="space-y-3">
                  <label className="text-xs text-gray-300 block">Escolha uma falha técnica complexa para traduzir:</label>
                  
                  <select
                    value={selectedLog}
                    onChange={(e) => { setSelectedLog(e.target.value); setExplainedText(''); }}
                    className="w-full bg-brand-bg border border-brand-border p-2 rounded-lg text-xs text-brand-cyan focus:border-brand-green focus:ring-1 focus:ring-brand-green/20 focus:outline-none"
                  >
                    <option value="raw-waf-block">WAF Rule Block: id:949110, ip:185.34.2.1, pattern: "UNION+SELECT+1,2,3"</option>
                    <option value="raw-edr-alert">EDR Violation: pid:4012, action: "process_spawn_powershell_from_pdf"</option>
                    <option value="raw-auth-mfa_bypass">Auth Gateway Audit: status:401, mfa:skipped, reason: "jwt_signature_override_req"</option>
                  </select>

                  <button
                    onClick={handleExplainLog}
                    disabled={isExplaining}
                    className="w-full py-2 bg-brand-green hover:bg-[#3ae0a9] text-brand-bg font-display font-bold text-xs rounded-xl tracking-wider transition-colors cursor-pointer"
                  >
                    {isExplaining ? 'PROCESSANDO EXPLICAÇÃO...' : 'TRADUZIR EM TERMOS DE NEGÓCIO'}
                  </button>

                  <AnimatePresence mode="wait">
                    {explainedText && (
                      <motion.div
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="bg-brand-bg p-4 rounded-xl border border-brand-border/80 font-mono text-[10px] text-gray-200 leading-relaxed whitespace-pre-line max-h-[190px] overflow-y-auto"
                      >
                        {explainedText}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            )}

            {/* Recondark Interactivity */}
            {activePlatform === 'recondark' && (
              <div className="space-y-4 relative z-10 bg-brand-card/90 p-5 rounded-2xl border border-brand-border glow-cyber-blue">
                <div className="flex justify-between items-center pb-2 border-b border-brand-border/60">
                  <span className="text-[10px] font-mono text-brand-cyan uppercase tracking-widest font-semibold flex items-center">
                    <Terminal className="w-3.5 h-3.5 text-brand-cyan mr-1.5" /> RECONDARK DEEP WEB VERIFIER
                  </span>
                  <span className="text-[11px] font-mono text-gray-500">LEAK ENGINE</span>
                </div>

                <form onSubmit={handleRecondarkScan} className="space-y-3">
                  <p className="text-xs text-gray-300">Simule uma busca de credenciais vazadas pelo domínio do seu e-mail corporativo:</p>
                  
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="ex: minhaempresa.com.br"
                      value={scanDomain}
                      onChange={(e) => setScanDomain(e.target.value)}
                      className="bg-brand-bg border border-brand-border rounded-xl text-xs px-3 py-2 text-white w-full focus:outline-none focus:border-brand-cyan placeholder-gray-600"
                      required
                    />
                    <button
                      type="submit"
                      disabled={isRecondarkScanning}
                      className="bg-brand-cyan hover:opacity-90 text-brand-bg font-display font-bold text-xs px-4 rounded-xl shrink-0 transition-opacity cursor-pointer"
                    >
                      {isRecondarkScanning ? 'BUSCANDO...' : 'BUSCAR'}
                    </button>
                  </div>
                </form>

                <AnimatePresence>
                  {isRecondarkScanning && (
                    <div className="py-8 text-center text-xs text-brand-cyan font-mono animate-pulse">
                      <RefreshCw className="w-6 h-6 animate-spin mx-auto text-brand-cyan mb-2" />
                      <span>Conectando-se a repositórios de brechas e canais Telegram underground...</span>
                    </div>
                  )}

                  {recondarkResults && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="space-y-2 max-h-[180px] overflow-y-auto pt-1"
                    >
                      <p className="text-[10px] text-amber-500 font-mono font-bold flex items-center">
                        ⚠️ EXPOSIÇÃO DETECTADA (SIMULADA):
                      </p>
                      
                      <div className="space-y-1 font-mono text-[9px]">
                        {recondarkResults.map((res, i) => (
                          <div key={i} className="p-2 bg-brand-bg rounded border border-brand-border flex justify-between items-center bg-brand-bg/60">
                            <div>
                              <p className="text-white font-bold">{res.email}</p>
                              <p className="text-gray-500">{res.source}</p>
                            </div>
                            <span className={`px-1.5 py-0.5 rounded text-[8px] font-bold ${
                              res.severity === 'CRÍTICA' ? 'bg-red-500/10 text-red-500 border border-red-500/30' : 'bg-amber-500/10 text-amber-500 border border-amber-500/30'
                            }`}>
                              {res.severity}
                            </span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}

            {/* VulnScan360 Interactivity */}
            {activePlatform === 'vulnscan' && (
              <div className="space-y-4 relative z-10 bg-brand-card/90 p-5 rounded-2xl border border-brand-border glow-cyber-green">
                <div className="flex justify-between items-center pb-2 border-b border-brand-border/60">
                  <span className="text-[10px] font-mono text-brand-green uppercase tracking-widest font-semibold flex items-center">
                    <Terminal className="w-3.5 h-3.5 text-brand-green mr-1.5" /> VULNSCAN360 LIVE AUDITOR
                  </span>
                  <span className="text-[11px] font-mono text-gray-500">PORT SCANNER</span>
                </div>

                <div className="space-y-3">
                  <p className="text-xs text-gray-300">Target IP de simulação do seu servidor gateway:</p>
                  
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={scanPortTarget}
                      onChange={(e) => setScanPortTarget(e.target.value)}
                      className="bg-brand-bg border border-brand-border rounded-xl text-xs px-3 py-2 text-white w-full focus:outline-none focus:border-brand-green"
                    />
                    <button
                      onClick={handleVulnScan}
                      disabled={isVulnScanning}
                      className="bg-brand-green hover:bg-[#3ae0a9] text-brand-bg font-display font-bold text-xs px-4 rounded-xl shrink-0 transition-colors cursor-pointer"
                    >
                      {isVulnScanning ? 'SCANNING...' : 'SCAN'}
                    </button>
                  </div>

                  <AnimatePresence>
                    {isVulnScanning && (
                      <div className="py-8 text-center text-xs text-brand-green font-mono animate-pulse">
                        <div className="w-1.5 h-1.5 bg-brand-green rounded-full animate-ping mx-auto mb-2" />
                        <span>Mapeando portas TCP/UDP e coletando banners de sistemas...</span>
                      </div>
                    )}

                    {vulnResultPorts && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="space-y-1.5 max-h-[190px] overflow-y-auto"
                      >
                        {vulnResultPorts.map((res, i) => (
                          <div key={i} className="p-2 bg-brand-bg/80 rounded border border-brand-border/60 text-[9px] font-mono">
                            <div className="flex justify-between items-center">
                              <span className="text-white font-bold">{res.port} - {res.service}</span>
                              <span className={`px-1.5 rounded uppercase font-bold text-[8px] ${
                                res.status === 'critical' ? 'bg-red-500/15 text-red-500 border border-red-500/30' : res.status === 'warning' ? 'bg-amber-500/15 text-amber-500 border border-amber-500/30' : 'bg-brand-green/15 text-brand-green'
                              }`}>
                                {res.status}
                              </span>
                            </div>
                            <p className="text-gray-400 mt-0.5 line-clamp-1">{res.info}</p>
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            )}

            <div className="text-center font-mono text-[10px] text-gray-500 mt-4 relative z-10 select-none">
              DASHBOARD PREVIEW INTERATIVO - AMBIENTE SEGURO DE TESTE B2B
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
