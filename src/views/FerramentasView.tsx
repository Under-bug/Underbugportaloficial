import React, { useState, useEffect, useRef } from 'react';
import { ViewName } from '../types';
import { 
  Globe, 
  Shield, 
  Lock, 
  Terminal, 
  CheckCircle, 
  AlertTriangle, 
  Search, 
  Cpu, 
  Key, 
  Activity, 
  ArrowRight, 
  Server, 
  ShieldCheck, 
  XCircle, 
  RefreshCw,
  HelpCircle
} from 'lucide-react';

interface FerramentasViewProps {
  onNavigate: (view: ViewName) => void;
}

type ToolId = 'dominio' | 'certificado' | 'portas';

export default function FerramentasView({ onNavigate }: FerramentasViewProps) {
  const [activeTool, setActiveTool] = useState<ToolId>('dominio');

  // Input States
  const [domainInput, setDomainInput] = useState('underbug.com.br');
  const [certInput, setCertInput] = useState('https://underbug.com.br');
  const [portHostInput, setPortHostInput] = useState('127.0.0.1');
  const [portsInput, setPortsInput] = useState('22, 80, 443, 3000, 3306, 5432, 8080');

  // Loading & Results states
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [terminalLogs, setTerminalLogs] = useState<string[]>([]);
  const [results, setResults] = useState<any>(null);

  const activeTimerRef = useRef<any>(null);

  const clearActiveTimer = () => {
    if (activeTimerRef.current) {
      clearInterval(activeTimerRef.current);
      activeTimerRef.current = null;
    }
  };

  // Common public DNS/headers templates for simulation
  const simulateDomainAnalysis = (domain: string) => {
    clearActiveTimer();
    setIsRunning(true);
    setProgress(0);
    setTerminalLogs([]);
    setResults(null);

    const steps = [
      { prg: 10, log: `[RESOLVER] Iniciando consulta de DNS para ${domain}...` },
      { prg: 25, log: `[RESOLVER] Resolvido endereço IPv4 primário: ${domain === 'underbug.com.br' ? '185.199.108.153' : '104.21.32.140'} (Geo: Latam / Cloudflare CDNs)` },
      { prg: 40, log: `[SEC-HEADERS] Analisando cabeçalhos HTTP de segurança para https://${domain}...` },
      { prg: 60, log: `[EMAIL-SEC] Verificando registros MX e SPF do domínio...` },
      { prg: 75, log: `[EMAIL-SEC] Verificando existência de política DMARC...` },
      { prg: 90, log: `[DNSSEC] Checando assinatura de registros DNSSEC...` },
      { prg: 100, log: `[DONE] Auditoria preliminar de segurança de domínio concluída.` }
    ];

    let currentStep = 0;
    activeTimerRef.current = setInterval(() => {
      if (currentStep < steps.length) {
        const step = steps[currentStep];
        setProgress(step.prg);
        setTerminalLogs(prev => [...prev, step.log]);
        currentStep++;
      } else {
        clearActiveTimer();
        setIsRunning(false);

        // Generate tailored mock audit results
        const isUnderbug = domain.toLowerCase().includes('underbug.com.br');
        const trustScore = isUnderbug ? 98 : Math.floor(Math.random() * 35) + 60;
        
        setResults({
          domain: domain,
          score: trustScore,
          ip: isUnderbug ? '185.199.108.153' : '104.21.32.140',
          dnssec: isUnderbug ? 'Ativado' : 'Não Configurado ⚠️',
          spf: 'v=spf1 include:_spf.google.com ~all (Válido)',
          dmarc: isUnderbug ? 'v=DMARC1; p=reject; rua=mailto:dmarc@underbug.com.br' : 'v=DMARC1; p=none; (Alerta: Política neutra)',
          mx: isUnderbug ? ['aspmx.l.google.com (Google Workspace)'] : ['mail.protonmail.ch', 'mx.empresa.com.br'],
          headers: {
            hsts: isUnderbug || Math.random() > 0.4 ? 'Ativado (max-age=63072000; includeSubDomains)' : 'Ausente ❌',
            csp: isUnderbug ? 'Ativado (strict-dynamic, default-src \'self\')' : 'Parcial / Vulnerável a XSS ⚠️',
            xFrame: 'SAMEORIGIN (Protegido contra Clickjacking)'
          },
          recommendations: isUnderbug 
            ? ['Domínio em conformidade de segurança máxima. Nenhuma ação corretiva crítica é necessária.']
            : [
                'Ativar política de rejeição rígida no DMARC (p=reject) para combater e-mails de phishing imitando sua marca.',
                'Configurar cabeçalho Content-Security-Policy (CSP) estrito para neutralizar ataques de Cross-Site Scripting (XSS).',
                'Ativar DNSSEC no seu registrador oficial de domínio para blindar o cache contra sequestro de DNS.'
              ]
        });
      }
    }, 450);
  };

  const simulateCertAnalysis = (inputUrl: string) => {
    clearActiveTimer();
    setIsRunning(true);
    setProgress(0);
    setTerminalLogs([]);
    setResults(null);

    // Sanitize domain
    const cleanUrl = inputUrl.replace(/^(https?:\/\/)?(www\.)?/, '').split('/')[0];

    const steps = [
      { prg: 15, log: `[HANDSHAKE] Abrindo conexão TLS com o servidor ${cleanUrl}:443...` },
      { prg: 35, log: `[CIPHER] Negociando Cipher Suite: TLS_AES_256_GCM_SHA384 (TLSv1.3, Curva X25519)` },
      { prg: 55, log: `[CHAIN] Solicitando cadeia de certificação digital...` },
      { prg: 75, log: `[ISSUER] Examinando autoridade certificadora (CA) emissora...` },
      { prg: 90, log: `[REVOCATION] Consultando lista de revogação de certificados via CRL / OCSP Stapling...` },
      { prg: 100, log: `[DONE] Auditoria de criptografia do certificado concluída.` }
    ];

    let currentStep = 0;
    activeTimerRef.current = setInterval(() => {
      if (currentStep < steps.length) {
        const step = steps[currentStep];
        setProgress(step.prg);
        setTerminalLogs(prev => [...prev, step.log]);
        currentStep++;
      } else {
        clearActiveTimer();
        setIsRunning(false);

        const isUnderbug = cleanUrl.toLowerCase().includes('underbug.com.br');
        const today = new Date();
        const expiryDate = new Date();
        expiryDate.setDate(today.getDate() + (isUnderbug ? 260 : Math.floor(Math.random() * 80) + 15));

        setResults({
          url: cleanUrl,
          issuer: isUnderbug ? 'Let\'s Encrypt' : 'DigiCert Cloud CA / Sectigo',
          algorithm: 'RSA 4096-bit (SHA256withRSA) - Criptografia Forte',
          protocol: 'TLSv1.3 (Sugerido para Conformidade PCI)',
          issuedAt: new Date(today.getTime() - 45 * 24 * 60 * 60 * 1000).toLocaleDateString('pt-BR'),
          expiresAt: expiryDate.toLocaleDateString('pt-BR'),
          daysRemaining: Math.ceil((expiryDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)),
          ocspStatus: 'Ativo (Pre-Stapled, Latência Baixa)',
          revoked: false,
          health: isUnderbug ? 'Excelente (Alinhado com as premissas OWASP e CIS v8)' : 'Seguro (Atenção para renovação programática em breve)'
        });
      }
    }, 450);
  };

  const simulatePortScan = (host: string, portsStr: string) => {
    clearActiveTimer();
    setIsRunning(true);
    setProgress(0);
    setTerminalLogs([]);
    setResults(null);

    const portsList = portsStr
      .split(',')
      .map(p => parseInt(p.trim()))
      .filter(p => !isNaN(p) && p > 0 && p <= 65535);

    if (portsList.length === 0) {
      setTerminalLogs([`[ERRO] Por favor, informe pelo menos uma porta válida de 1 a 65535.`]);
      setIsRunning(false);
      return;
    }

    setTerminalLogs([`[START] Iniciando checagem de sockets no host de auditoria: ${host}...`]);

    let currentIdx = 0;
    const scannedPorts: any[] = [];

    activeTimerRef.current = setInterval(() => {
      if (currentIdx < portsList.length) {
        const port = portsList[currentIdx];
        const stepPrg = Math.floor(((currentIdx + 1) / portsList.length) * 100);
        setProgress(stepPrg);

        // Simulated open/closed ports based on common standards
        let status: 'aberto' | 'fechado' | 'filtrado' = 'fechado';
        let detail = 'Fechado (Conexão Recusada)';
        
        if (port === 80 || port === 443) {
          status = 'aberto';
          detail = 'Aberto (Web Traffic - TLS/Cleartext)';
        } else if (port === 22) {
          status = Math.random() > 0.5 ? 'filtrado' : 'fechado';
          detail = status === 'filtrado' ? 'Filtrado (Timeout / Proteção SSH)' : 'Fechado';
        } else if (port === 3306 || port === 5432) {
          status = 'fechado';
          detail = 'Fechado (Porta de Banco de Dados protegida localmente)';
        } else if (port === 3000 || port === 8080) {
          status = 'aberto';
          detail = 'Aberto (Ambiente de Desenvolvimento Ativo)';
        }

        const iconColor = status === 'aberto' ? '🟢' : status === 'filtrado' ? '🟡' : '🔴';
        setTerminalLogs(prev => [...prev, `[AUDITAR] Porta ${port}: ${iconColor} ${detail}`]);
        
        scannedPorts.push({
          port,
          status,
          detail
        });

        currentIdx++;
      } else {
        clearActiveTimer();
        setIsRunning(false);
        setTerminalLogs(prev => [...prev, `[DONE] Verificação completa realizada no host local.`]);

        setResults({
          host,
          ports: scannedPorts,
          securityAlerts: scannedPorts.filter(p => p.status === 'aberto' && p.port !== 443).map(p => {
            if (p.port === 80) return `Porta 80 (HTTP) ativa na web. Recomendamos forçar o tráfego exclusivamente pelo HTTPS (443) habilitando HSTS.`;
            if (p.port === 3000 || p.port === 8080) return `Porta de desenvolvimento ${p.port} exposta publicamente. Certifique-se de aplicar autenticação forte ou travar o acesso por VPC.`;
            return `Porta ${p.port} exposta. Remova serviços legados que não utilizam assinaturas criptográficas ou túneis mTLS.`;
          })
        });
      }
    }, 500);
  };

  // Run initial diagnostic simulator on component mount
  useEffect(() => {
    simulateDomainAnalysis(domainInput);
    return () => {
      clearActiveTimer();
    };
  }, []);

  return (
    <div className="space-y-12 pb-20 pt-8" id="free-tools-dashboard">
      
      {/* SECTION HERO */}
      <section className="text-center relative py-6">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-80 bg-brand-green/5 rounded-full filter blur-3xl pointer-events-none" />
        
        <div className="max-w-4xl mx-auto px-4 space-y-4 relative z-10">
          <span className="text-[10px] font-mono text-brand-green bg-brand-green/10 border border-brand-green/20 px-3 py-1 rounded-full uppercase tracking-wider font-bold">
            Recursos Estritamente Gratuitos & Sem Cadastro
          </span>
          <h1 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
            Sandbox de Ferramentas de TI
          </h1>
          <p className="text-sm sm:text-base text-gray-400 max-w-2xl mx-auto font-sans leading-relaxed">
            Execute testes rápidos e isentos de perímetro para auditorias superficiais. Verifique a postura do seu domínio, examine parâmetros de criptografia do certificado HTTPS e valide portas expostas.
          </p>
        </div>
      </section>

      {/* THREE TOOLS INTERACTIVE NAVIGATION SLIDER BAR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto bg-brand-bg-sec p-1.5 rounded-2xl border border-brand-border flex flex-col sm:flex-row items-center gap-2 mb-10">
          <button
            onClick={() => {
              setActiveTool('dominio');
              simulateDomainAnalysis(domainInput);
            }}
            className={`w-full sm:flex-1 text-center py-3 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center space-x-2 ${
              activeTool === 'dominio' 
                ? 'bg-brand-card text-brand-green border border-brand-green/20 shadow-lg' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Globe className="w-4 h-4" />
            <span>Analisador de Domínio</span>
          </button>
          
          <button
            onClick={() => {
              setActiveTool('certificado');
              simulateCertAnalysis(certInput);
            }}
            className={`w-full sm:flex-1 text-center py-3 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center space-x-2 ${
              activeTool === 'certificado' 
                ? 'bg-brand-card text-brand-cyan border border-brand-cyan/20 shadow-lg' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Lock className="w-4 h-4" />
            <span>Analisador de Certificado</span>
          </button>

          <button
            onClick={() => {
              setActiveTool('portas');
              simulatePortScan(portHostInput, portsInput);
            }}
            className={`w-full sm:flex-1 text-center py-3 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center space-x-2 ${
              activeTool === 'portas' 
                ? 'bg-brand-card text-brand-blue border border-brand-blue/20 shadow-lg' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Server className="w-4 h-4" />
            <span>Validador de Portas</span>
          </button>
        </div>

        {/* WORKSPACE LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: SETTINGS & TERMINAL LOADING STATE */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* COMPONENT INTERACTION CONTROL CARD */}
            <div className="bg-brand-card p-6 rounded-2xl border border-brand-border space-y-4">
              <div className="flex items-center space-x-2">
                <Cpu className="w-4 h-4 text-brand-green" />
                <h4 className="font-mono text-xs text-gray-400 uppercase tracking-widest font-bold">Configurar Análise</h4>
              </div>

              {activeTool === 'dominio' && (
                <div className="space-y-4 font-sans">
                  <div className="space-y-1.5">
                    <label className="text-xs text-gray-400 font-medium">Informe o Domínio (Hostname)</label>
                    <div className="relative">
                      <Globe className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" />
                      <input 
                        type="text" 
                        value={domainInput}
                        onChange={(e) => setDomainInput(e.target.value)}
                        placeholder="Ex: minhaempresa.com.br"
                        className="w-full bg-brand-bg border border-brand-border focus:border-brand-green/60 text-xs rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none transition-colors font-mono"
                      />
                    </div>
                  </div>
                  <button
                    onClick={() => simulateDomainAnalysis(domainInput)}
                    disabled={isRunning}
                    className="w-full bg-brand-green hover:bg-[#0fd996] text-brand-bg text-xs font-display font-medium py-3 rounded-xl transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 font-bold"
                  >
                    {isRunning ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Search className="w-3.5 h-3.5" />}
                    <span>{isRunning ? 'Auditando Registros...' : 'Testar Domínio Grátis'}</span>
                  </button>
                </div>
              )}

              {activeTool === 'certificado' && (
                <div className="space-y-4 font-sans">
                  <div className="space-y-1.5">
                    <label className="text-xs text-gray-400 font-medium">Link do Host (SSL / TLS)</label>
                    <div className="relative">
                      <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" />
                      <input 
                        type="text" 
                        value={certInput}
                        onChange={(e) => setCertInput(e.target.value)}
                        placeholder="Ex: https://dominio.com"
                        className="w-full bg-brand-bg border border-brand-border focus:border-brand-cyan/60 text-xs rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none transition-colors font-mono"
                      />
                    </div>
                  </div>
                  <button
                    onClick={() => simulateCertAnalysis(certInput)}
                    disabled={isRunning}
                    className="w-full bg-brand-cyan hover:bg-[#1fe2ff] text-brand-bg text-xs font-display font-medium py-3 rounded-xl transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 font-bold"
                  >
                    {isRunning ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Search className="w-3.5 h-3.5" />}
                    <span>{isRunning ? 'Examinando Ciphers...' : 'Analisar Certificado'}</span>
                  </button>
                </div>
              )}

              {activeTool === 'portas' && (
                <div className="space-y-4 font-sans">
                  <div className="space-y-3">
                    <div className="space-y-1.5">
                      <label className="text-xs text-gray-400 font-medium">Endereço de Host / IP</label>
                      <div className="relative">
                        <Server className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" />
                        <input 
                          type="text" 
                          value={portHostInput}
                          onChange={(e) => setPortHostInput(e.target.value)}
                          placeholder="Ex: 127.0.0.1 ou dominio.com"
                          className="w-full bg-brand-bg border border-brand-border focus:border-brand-blue/60 text-xs rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none transition-colors font-mono"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs text-gray-400 font-medium">Série de Portas para Checagem</label>
                      <input 
                        type="text" 
                        value={portsInput}
                        onChange={(e) => setPortsInput(e.target.value)}
                        placeholder="Ex: 22, 80, 443, 3000"
                        className="w-full bg-brand-bg border border-brand-border focus:border-brand-blue/60 text-xs rounded-xl py-3 px-4 text-white focus:outline-none transition-colors font-mono"
                      />
                      <span className="text-[10px] text-gray-500 block">Separe os números das portas por vírgula.</span>
                    </div>
                  </div>
                  <button
                    onClick={() => simulatePortScan(portHostInput, portsInput)}
                    disabled={isRunning}
                    className="w-full bg-brand-blue hover:bg-brand-blue-hover text-white text-xs font-display font-medium py-3 rounded-xl transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 font-bold"
                  >
                    {isRunning ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Activity className="w-3.5 h-3.5" />}
                    <span>{isRunning ? 'Validando conexões...' : 'Validar Portas'}</span>
                  </button>
                </div>
              )}

            </div>

            {/* REAL-TIME SIMULATED TESTING CONSOLE TERMINAL */}
            <div className="bg-brand-card p-5 border border-brand-border rounded-2xl space-y-3.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Terminal className="w-4 h-4 text-brand-green" />
                  <span className="text-xs font-mono text-gray-400 uppercase tracking-widest font-bold">Console de Coleta</span>
                </div>
                {isRunning && (
                  <div className="flex items-center space-x-1.5 bg-brand-bg px-2 py-0.5 rounded border border-brand-border/60">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-green animate-ping" />
                    <span className="text-[9px] font-mono text-gray-400">{progress}%</span>
                  </div>
                )}
              </div>

              {/* Progress dynamic line */}
              <div className="w-full h-1 bg-brand-bg rounded-full overflow-hidden">
                <div 
                  className={`h-full transition-all duration-300 ${
                    activeTool === 'dominio' ? 'bg-brand-green' : activeTool === 'certificado' ? 'bg-brand-cyan' : 'bg-brand-blue'
                  }`}
                  style={{ width: `${progress}%` }}
                />
              </div>

              {/* Console output body */}
              <div className="bg-brand-bg border border-brand-border/40 rounded-xl p-3.5 font-mono text-[10.5px] leading-relaxed text-gray-300 h-56 overflow-y-auto space-y-2 select-text custom-scrollbar">
                {terminalLogs.length === 0 ? (
                  <div className="text-gray-550 italic flex flex-col items-center justify-center text-center h-full space-y-2">
                    <Activity className="w-5 h-5 text-gray-600 animate-pulse" />
                    <span>Aguardando execução do preenchimento...<br />Selecione o host e clique em testar.</span>
                  </div>
                ) : (
                  terminalLogs.map((log, idx) => (
                    <div key={idx} className="border-b border-brand-border/10 pb-1 hover:text-white transition-colors">
                      {log}
                    </div>
                  ))
                )}
              </div>
            </div>

          </div>

          {/* RIGHT: LIVE BEAUTIFUL SUMMARY RESULTS TABLE & FULL REMEDIATION REDIRECT BANNER */}
          <div className="lg:col-span-8 space-y-6" id="tool-results-layout-box">

            {results ? (
              <div className="space-y-6 animate-fade-in text-white selection:bg-brand-green/30">
                
                {/* TOOL RESULT CARD: DOMAIN */}
                {activeTool === 'dominio' && (
                  <div className="bg-brand-card rounded-2xl border border-brand-border p-6 sm:p-8 space-y-6">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-brand-border/40 pb-5 gap-4">
                      <div className="space-y-1">
                        <span className="text-[10px] font-mono text-brand-green bg-brand-green/10 border border-brand-green/20 px-2 py-0.5 rounded">DNS & CERTIFIED AUDIT</span>
                        <h3 className="text-xl font-display font-bold text-white tracking-tight">{results.domain}</h3>
                      </div>
                      <div className="flex items-center space-x-3 bg-brand-bg px-4 py-2 rounded-xl border border-brand-border/60">
                        <span className="text-xs font-mono text-gray-400">Score Tecnológico:</span>
                        <span className={`text-lg font-mono font-black ${results.score >= 90 ? 'text-brand-green' : 'text-yellow-400'}`}>
                          {results.score}/100
                        </span>
                      </div>
                    </div>

                    {/* Table Records Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      
                      <div className="p-4 rounded-xl border border-brand-border bg-brand-bg-sec/45 space-y-1.5">
                        <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest block">Primary Resolved IP</span>
                        <span className="text-xs font-mono text-white text-semibold block select-all">{results.ip}</span>
                      </div>

                      <div className="p-4 rounded-xl border border-brand-border bg-brand-bg-sec/45 space-y-1.5">
                        <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest block">DNSSEC Signed</span>
                        <span className="text-xs font-mono text-white text-semibold block">{results.dnssec}</span>
                      </div>

                      <div className="p-4 rounded-xl border border-brand-border bg-brand-bg-sec/45 space-y-1.5 md:col-span-2">
                        <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest block">Configured SPF Policy</span>
                        <span className="text-xs font-mono text-white block select-all">{results.spf}</span>
                      </div>

                      <div className="p-4 rounded-xl border border-brand-border bg-brand-bg-sec/45 space-y-1.5 md:col-span-2">
                        <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest block">DMARC Analyzer Header</span>
                        <span className="text-xs font-mono text-gray-300 block select-all">{results.dmarc}</span>
                      </div>

                      {/* Web Security Headers Checklist */}
                      <div className="p-5 rounded-xl border border-brand-border bg-brand-bg-sec/40 md:col-span-2 space-y-3">
                        <span className="text-[10px] font-mono text-gray-500 uppercase block tracking-wider font-bold">Recommended HTTP Security Headers</span>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                          <div className="p-3.5 bg-brand-bg rounded-lg border border-brand-border/60">
                            <span className="text-[10px] font-mono block text-gray-400 mb-1">Strict-Transport-Security</span>
                            <span className="text-xs font-semibold text-brand-green">{results.headers.hsts}</span>
                          </div>
                          
                          <div className="p-3.5 bg-brand-bg rounded-lg border border-brand-border/60">
                            <span className="text-[10px] font-mono block text-gray-400 mb-1">Content-Security-Policy</span>
                            <span className="text-xs font-semibold text-white">{results.headers.csp}</span>
                          </div>

                          <div className="p-3.5 bg-brand-bg rounded-lg border border-brand-border/60">
                            <span className="text-[10px] font-mono block text-gray-400 mb-1">X-Frame-Options</span>
                            <span className="text-xs font-semibold text-brand-cyan">{results.headers.xFrame}</span>
                          </div>
                        </div>
                      </div>

                    </div>

                    {/* Remediations list */}
                    <div className="space-y-3 pt-2">
                      <h4 className="text-xs font-mono text-brand-green uppercase tracking-wider font-bold">Sugestões de Ajustes Recomendados</h4>
                      <ul className="space-y-2">
                        {results.recommendations.map((rec: string, idx: number) => (
                          <li key={idx} className="flex items-start text-xs text-gray-300 leading-relaxed font-sans">
                            <AlertTriangle className="w-4 h-4 text-brand-green shrink-0 mr-2 mt-0.5" />
                            <span>{rec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                  </div>
                )}

                {/* TOOL RESULT CARD: CERTIFICATE */}
                {activeTool === 'certificado' && (
                  <div className="bg-brand-card rounded-2xl border border-brand-border p-6 sm:p-8 space-y-6">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-brand-border/40 pb-5 gap-4">
                      <div className="space-y-1">
                        <span className="text-[10px] font-mono text-brand-cyan bg-brand-cyan/10 border border-brand-cyan/20 px-2 py-0.5 rounded">CRYPTOGRAPHY CHAIN & SSL STATUS</span>
                        <h3 className="text-xl font-display font-bold text-white tracking-tight">{results.url}</h3>
                      </div>
                      <div className={`p-2 px-3 rounded-lg border text-xs font-mono font-bold shrink-0 text-center ${results.daysRemaining > 30 ? 'text-brand-green bg-brand-green/10 border-brand-green/20' : 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20'}`}>
                        🔑 Expira em {results.daysRemaining} dias
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
                      
                      <div className="p-4 rounded-xl border border-brand-border bg-brand-bg-sec/45 space-y-1.5">
                        <span className="text-[10px] text-gray-500 uppercase tracking-widest block">Autoridade Certificadora (Issuer)</span>
                        <span className="text-white font-semibold text-xs block">{results.issuer}</span>
                      </div>

                      <div className="p-4 rounded-xl border border-brand-border bg-brand-bg-sec/45 space-y-1.5">
                        <span className="text-[10px] text-gray-500 uppercase tracking-widest block">Protocolo TLS em Uso</span>
                        <span className="text-brand-cyan font-semibold text-xs block">{results.protocol}</span>
                      </div>

                      <div className="p-4 rounded-xl border border-brand-border bg-brand-bg-sec/45 space-y-1.5">
                        <span className="text-[10px] text-gray-500 uppercase tracking-widest block">Criptografia / Força de Chave</span>
                        <span className="text-white font-semibold text-xs block">{results.algorithm}</span>
                      </div>

                      <div className="p-4 rounded-xl border border-brand-border bg-brand-bg-sec/45 space-y-1.5">
                        <span className="text-[10px] text-gray-500 uppercase tracking-widest block">OCSP Stapling / Revogação</span>
                        <span className="text-white font-semibold text-xs block">{results.ocspStatus}</span>
                      </div>

                      <div className="p-4 rounded-xl border border-brand-border bg-brand-bg-sec/45 space-y-1.5">
                        <span className="text-[10px] text-gray-500 uppercase tracking-widest block">Emitido em</span>
                        <span className="text-gray-300 block">{results.issuedAt}</span>
                      </div>

                      <div className="p-4 rounded-xl border border-brand-border bg-brand-bg-sec/45 space-y-1.5">
                        <span className="text-[10px] text-gray-500 uppercase tracking-widest block">Vencimento Programado</span>
                        <span className="text-gray-300 block font-semibold">{results.expiresAt}</span>
                      </div>

                      <div className="p-4 rounded-xl border border-brand-border bg-brand-bg-sec/40 md:col-span-2 space-y-2">
                        <span className="text-[10px] text-gray-500 uppercase tracking-widest block font-bold">Diagnóstico de Robustez Crítica</span>
                        <div className="flex items-start space-x-2 text-xs text-gray-300 font-sans leading-relaxed">
                          <ShieldCheck className="w-4 h-4 text-brand-cyan shrink-0 mt-0.5" />
                          <span>{results.health}</span>
                        </div>
                      </div>

                    </div>
                  </div>
                )}

                {/* TOOL RESULT CARD: PORT CHECKER */}
                {activeTool === 'portas' && (
                  <div className="bg-brand-card rounded-2xl border border-brand-border p-6 sm:p-8 space-y-6">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-brand-border/40 pb-5 gap-4">
                      <div className="space-y-1">
                        <span className="text-[10px] font-mono text-brand-blue bg-brand-blue/10 border border-brand-blue/20 px-2 py-0.5 rounded">TCP SOCKETS DIAGNOSTIC</span>
                        <h3 className="text-xl font-display font-bold text-white tracking-tight">{results.host}</h3>
                      </div>
                      <div className="flex items-center space-x-2 bg-brand-bg px-3 py-1.5 rounded-lg border border-brand-border/60">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan animate-pulse" />
                        <span className="text-[10px] font-mono text-gray-400">Varredura Local / Externa</span>
                      </div>
                    </div>

                    {/* Sockets scanned grid list */}
                    <div className="space-y-3 font-mono">
                      <span className="text-[10px] text-gray-500 uppercase block tracking-wider font-bold">Mapeamento de Status por Porta</span>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                        {results.ports.map((p: any, idx: number) => (
                          <div 
                            key={idx} 
                            className={`p-4 rounded-xl border flex justify-between items-center bg-brand-bg-sec/40 transition-all ${
                              p.status === 'aberto' 
                                ? 'border-brand-green/20' 
                                : p.status === 'filtrado' 
                                ? 'border-yellow-500/20' 
                                : 'border-brand-border/60'
                            }`}
                          >
                            <div className="space-y-1">
                              <span className="text-xs uppercase font-black text-white">Porta {p.port}</span>
                              <span className="text-[10px] text-gray-400 block font-normal">{p.detail}</span>
                            </div>

                            <div className="shrink-0 text-right">
                              <span className={`text-[10px] font-bold px-2.5 py-1 rounded inline-block uppercase tracking-wide leading-none ${
                                p.status === 'aberto' 
                                  ? 'text-brand-green bg-brand-green/10' 
                                  : p.status === 'filtrado' 
                                  ? 'text-yellow-400 bg-yellow-500/10' 
                                  : 'text-red-400 bg-red-400/10'
                              }`}>
                                {p.status}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Port alerts if open */}
                    {results.securityAlerts.length > 0 && (
                      <div className="p-4 rounded-xl border border-red-500/20 bg-red-500/[0.01] space-y-3">
                        <h4 className="text-xs font-mono text-red-400 uppercase tracking-wider font-bold">Recomendações Importantes de Segurança</h4>
                        <ul className="space-y-2.5 font-sans">
                          {results.securityAlerts.map((alert: string, idx: number) => (
                            <li key={idx} className="flex items-start text-xs text-gray-300 leading-relaxed">
                              <XCircle className="w-4 h-4 text-red-400 shrink-0 mr-2 mt-0.5" />
                              <span>{alert}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                  </div>
                )}

                {/* THE HIGHLIGHTED CONTACT/DIAGNOSTIC BLUEPRINT REDIRECT BANNER */}
                <div className="p-6 bg-gradient-to-r from-brand-card to-brand-bg-sec rounded-2xl border border-brand-green/20 space-y-4 relative overflow-hidden text-left shadow-lg glow-cyber-green/5">
                  <div className="absolute top-0 right-0 w-48 h-48 bg-brand-green/5 rounded-full filter blur-3xl pointer-events-none" />
                  
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
                    <div className="space-y-2 max-w-xl">
                      <div className="flex items-center space-x-2 text-brand-green font-mono text-[10.5px]">
                        <Shield className="w-4 h-4 text-brand-green" />
                        <span className="uppercase font-bold">Auditoria & Consultoria Estratégica Completa</span>
                      </div>
                      <h4 className="font-display font-extrabold text-white text-base sm:text-lg leading-tight">
                        Seus ativos digitais precisam de uma validação robusta?
                      </h4>
                      <p className="text-xs text-gray-350 font-sans leading-relaxed">
                        Estas ferramentas gratuitas realizam apenas testes superficiais. Para auditorias internas de conformidade, varreduras na deep web ou testes de invasão invasivos completos (Pentests), fale com engenheiros L3.
                      </p>
                    </div>

                    <div className="shrink-0">
                      <button
                        onClick={() => {
                          onNavigate('contato');
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className="inline-flex items-center space-x-1.5 bg-brand-green hover:bg-[#0fd996] text-brand-bg text-xs font-display font-bold px-5 py-3 rounded-xl transition-all cursor-pointer font-black shrink-0 w-full sm:w-auto justify-center shadow-lg shadow-brand-green/15"
                      >
                        <span>Preencher Formulário Comercial</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>

              </div>
            ) : (
              <div className="bg-brand-card rounded-2xl border border-brand-border p-8 text-center h-[460px] flex flex-col items-center justify-center space-y-3.5">
                <RefreshCw className="w-9 h-9 text-brand-green animate-spin" />
                <div className="space-y-1">
                  <h4 className="font-display font-bold text-white text-base">Iniciando Varredura Diagnóstica</h4>
                  <p className="text-xs text-gray-400 font-sans max-w-sm mx-auto">
                    Os motores estão processando a requisição e coletando assinaturas criptográficas do host remoto para análise de conformidade.
                  </p>
                </div>
              </div>
            )}

          </div>

        </div>
      </section>

      {/* DETAILED FAQ ABOUT THE TOOLS ACCORDION */}
      <section className="max-w-4xl mx-auto px-4 pt-4">
        <div className="space-y-6">
          <div className="text-center space-y-1.5">
            <HelpCircle className="w-5 h-5 text-brand-green mx-auto" />
            <h3 className="font-display font-bold text-white text-lg tracking-tight">Perguntas Frequentes (FAQ)</h3>
            <p className="text-xs text-gray-400 font-sans">Entenda como funcionam as ferramentas gratuitas e políticas de coleta da Underbug.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            <div className="p-5 bg-brand-card rounded-xl border border-brand-border space-y-2">
              <h5 className="font-display font-bold text-white text-xs sm:text-sm">Os testes salvam alguma informação minha?</h5>
              <p className="text-xs text-gray-400 leading-relaxed font-sans">
                Não. Todo o processamento de análise é efetuado em tempo de execução de forma volátil. Nós não registramos, armazenamos ou compartilhamos dados de domínios ou portas de auditoria.
              </p>
            </div>

            <div className="p-5 bg-brand-card rounded-xl border border-brand-border space-y-2">
              <h5 className="font-display font-bold text-white text-xs sm:text-sm">Por que os resultados diferem de scanners como Nmap?</h5>
              <p className="text-xs text-gray-400 leading-relaxed font-sans">
                Estas ferramentas provêm diagnósticos informativos simplificados a partir de requisições de soquetes web client-side e simulações estatiísticas regulamentais, não devendo substituir relatórios técnicos de engenharia em produção.
              </p>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
