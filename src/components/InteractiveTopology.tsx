import React, { useState, useEffect } from 'react';
import { Shield, ShieldAlert, ShieldCheck, Terminal, Cpu, Database, Cloud, Network, AlertTriangle, Zap, Server } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Node {
  id: string;
  name: string;
  status: 'safe' | 'warning' | 'scanning' | 'secured';
  ip: string;
  type: 'db' | 'cloud' | 'gateway' | 'endpoint' | 'dns';
  vulnerabilities: number;
  lastChecked: string;
  uptime: string;
  details: string;
}

export default function InteractiveTopology() {
  const [nodes, setNodes] = useState<Node[]>([
    { id: '1', name: 'DMZ Gateway Principal', status: 'secured', ip: '192.168.10.1', type: 'gateway', vulnerabilities: 0, lastChecked: '12 min atrás', uptime: '99.99%', details: 'Gerenciado por Cloudflare WAF & DDoS Protection. Tráfego limpo.' },
    { id: '2', name: 'Database Postgres Core', status: 'safe', ip: '10.0.4.45', type: 'db', vulnerabilities: 0, lastChecked: '4 min atrás', uptime: '100.00%', details: 'Banco de dados crítico com auditoria estrita de queries e criptografia.' },
    { id: '3', name: 'AWS Kubernetes Cluster', status: 'safe', ip: '10.100.22.10', type: 'cloud', vulnerabilities: 2, lastChecked: '1 min atrás', uptime: '99.95%', details: 'K8s Cluster. Monitorado por EDR Management & Cloud Security Guard.' },
    { id: '4', name: 'Active Directory Corporate', status: 'warning', ip: '192.168.1.15', type: 'endpoint', vulnerabilities: 4, lastChecked: 'Just Now', uptime: '99.90%', details: 'Detectadas tentativas atípicas de autenticação de privilégio. Recomenda-se Pentest.' },
    { id: '5', name: 'Servidor API Express', status: 'scanning', ip: '10.10.100.5', type: 'gateway', vulnerabilities: 0, lastChecked: 'Scanning...', uptime: '99.98%', details: 'VulnScan360 executando mapeamento ativo de portas de comunicação.' },
    { id: '6', name: 'Cloudflare DNS Edge', status: 'secured', ip: '1.1.1.1', type: 'dns', vulnerabilities: 0, lastChecked: '3 min atrás', uptime: '100.00%', details: 'Filtro DNS Anycast robusto com mitigação automatizada de ataques volumétricos.' },
  ]);

  const [selectedNode, setSelectedNode] = useState<Node>(nodes[0]);
  const [logs, setLogs] = useState<string[]>([
    '[11:15:02] UNDERBUG SOC Engine: Inicializado módulo Threat Intelligence.',
    '[11:15:20] CLOUDFLARE WAF: Bloqueado IP 185.220.101.4 (Tor Exit Node) tentando SQL Injection.',
    '[11:15:45] VULNSCAN360: Iniciada varredura automatizada no Servidor API Express.',
    '[11:16:01] SECMATURITY: Score de Conformidade de Segurança estimado em 88% (Tier 3.5).',
    '[11:16:10] EDR AGENT: Bloqueada execução de binário não assinado no Host 192.168.1.44.',
  ]);

  const [scanProgress, setScanProgress] = useState(0);
  const [isScanningActive, setIsScanningActive] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      // Periodic mock threat alerts
      const events = [
        'CLOUDFLARE SHIELD: Ataque DDoS de 4.2 Gbps mitigado com sucesso na borda.',
        'EDR AGENT: Processo PowerShell suspeito finalizado e isolado na rede.',
        'RECONDARK: Encontrado vazamento de credencial vazada (@underbug) em fórum externo.',
        'WAF LOG: Regra OWASP #949110 ativada para proteger endpoint crítico.',
        'CYBER EXPLAINER: Nova CVE-2026-9041 reportada na biblioteca Express/Vite resolvida.',
      ];
      const randomEvent = events[Math.floor(Math.random() * events.length)];
      const now = new Date();
      const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;
      
      setLogs(prev => [`[${timeStr}] ${randomEvent}`, ...prev.slice(0, 10)]);
    }, 9000);

    return () => clearInterval(timer);
  }, []);

  const handleScanNode = (nodeId: string) => {
    if (isScanningActive) return;
    setIsScanningActive(true);
    setScanProgress(5);
    
    // Update target node state to scanning
    setNodes(prev => prev.map(n => n.id === nodeId ? { ...n, status: 'scanning' } : n));
    
    const interval = setInterval(() => {
      setScanProgress(p => {
        if (p >= 100) {
          clearInterval(interval);
          setIsScanningActive(false);
          
          // Secure the node completely
          setNodes(prev => prev.map(n => {
            if (n.id === nodeId) {
              const updated = {
                ...n,
                status: 'secured' as const,
                vulnerabilities: 0,
                lastChecked: 'Agora mesmo',
                details: 'Auditado via VulnScan360 & Pentest UnderBug. 0 vulnerabilidades restantes. Totalmente Hardened.'
              };
              // Update detail pane selection
              setSelectedNode(updated);
              return updated;
            }
            return n;
          }));

          const now = new Date();
          const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;
          setLogs(prev => [`[${timeStr}] VULNSCAN360: Scanner completo! ${selectedNode.name} está 100% em conformidade.`, ...prev]);

          return 0;
        }
        return p + 25;
      });
    }, 450);
  };

  const getNodeIcon = (type: string, status: string) => {
    if (status === 'scanning') return <Zap className="w-5 h-5 animate-bounce text-brand-green" />;
    
    switch (type) {
      case 'gateway': return <Network className="w-5 h-5 text-brand-green" />;
      case 'db': return <Database className="w-5 h-5 text-gray-400" />;
      case 'cloud': return <Cloud className="w-5 h-5 text-brand-green" />;
      case 'dns': return <Server className="w-5 h-5 text-brand-green" />;
      default: return <Cpu className="w-5 h-5 text-gray-500" />;
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 bg-brand-bg-sec p-6 rounded-2xl border border-brand-border glow-cyber-blue" id="topology-container">
      {/* 1. Grid of Nodes (The Command Panel Map) */}
      <div className="lg:col-span-2 space-y-6">
        <div className="flex justify-between items-center pb-2 border-b border-brand-border">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 bg-brand-green rounded-full animate-ping"></span>
            <h4 className="font-display font-semibold text-white tracking-wide text-sm uppercase">
              Centro de Controle Observability (Simulação Real-time)
            </h4>
          </div>
          <div className="flex space-x-4 text-xs font-mono text-brand-cyan">
            <span className="flex items-center"><ShieldCheck className="w-3.5 h-3.5 mr-1 text-brand-green" /> Seguro</span>
            <span className="flex items-center"><AlertTriangle className="w-3.5 h-3.5 mr-1 text-amber-500" /> Vulnerável</span>
          </div>
        </div>

        {/* Live Topography Map Screen */}
        <div className="relative bg-brand-bg rounded-xl p-8 overflow-hidden border border-brand-border min-h-[380px] flex flex-col justify-between">
          <div className="absolute inset-0 bg-cyber-gradient pointer-events-none" />
          
          {/* Cybergrid backdrop */}
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.15)_1px,transparent_1px)] bg-[size:16px_16px]" />

          {/* Connected Lines SVG overlay */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
            <line x1="20%" y1="25%" x2="50%" y2="50%" stroke="#3B82F6" strokeWidth="2" strokeDasharray="4 4" />
            <line x1="80%" y1="25%" x2="50%" y2="50%" stroke="#10B981" strokeWidth="2" />
            <line x1="20%" y1="75%" x2="50%" y2="50%" stroke="#00D2FF" strokeWidth="2" strokeDasharray="4 2" />
            <line x1="80%" y1="75%" x2="50%" y2="50%" stroke="#D97706" strokeWidth="2" />
            <line x1="85%" y1="20%" x2="85%" y2="70%" stroke="#10B981" strokeWidth="1" />
          </svg>

          {/* Node Absolute Elements or Flex grid representation */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 relative z-10 my-auto">
            {nodes.map((node) => {
              const isSelected = selectedNode.id === node.id;
              return (
                <div
                  key={node.id}
                  id={`node-item-${node.id}`}
                  onClick={() => setSelectedNode(node)}
                  className={`cursor-pointer p-4 rounded-xl transition-all duration-300 border ${
                    isSelected
                      ? 'bg-brand-card/90 border-brand-blue text-white glow-cyber-blue scale-102 font-bold'
                      : 'bg-brand-card/40 border-brand-border text-brand-cyan hover:border-brand-green/50 hover:bg-brand-card/70'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div className="p-2 bg-brand-bg rounded-lg border border-brand-border">
                      {getNodeIcon(node.type, node.status)}
                    </div>
                    
                    {node.status === 'secured' ? (
                      <span className="text-[10px] bg-brand-green/10 text-brand-green px-2 py-0.5 rounded-full border border-brand-green/30 flex items-center">
                        <Shield className="w-2.5 h-2.5 mr-0.5" /> Estável
                      </span>
                    ) : node.status === 'warning' ? (
                      <span className="text-[10px] bg-amber-500/10 text-amber-500 px-2 py-0.5 rounded-full border border-amber-500/30 flex items-center animate-pulse">
                        <ShieldAlert className="w-2.5 h-2.5 mr-0.5" /> Atenção
                      </span>
                    ) : node.status === 'scanning' ? (
                      <span className="text-[10px] bg-brand-cyan/20 text-brand-cyan px-2 py-0.5 rounded-full border border-brand-cyan/40 flex items-center">
                        <span className="w-1.5 h-1.5 bg-brand-cyan rounded-full animate-ping mr-1"></span>
                        Scanning
                      </span>
                    ) : (
                      <span className="text-[10px] bg-brand-blue/10 text-brand-blue px-2 py-0.5 rounded-full border border-brand-blue/30 flex items-center">
                        <ShieldCheck className="w-2.5 h-2.5 mr-0.5" /> Monitorado
                      </span>
                    )}
                  </div>

                  <div className="mt-3">
                    <h5 className="text-xs font-semibold text-white tracking-wide truncate">{node.name}</h5>
                    <p className="text-[10px] font-mono text-gray-400 mt-0.5">{node.ip}</p>
                    
                    {node.vulnerabilities > 0 && (
                      <p className="text-[10px] text-amber-400 mt-1.5 flex items-center font-mono">
                        <AlertTriangle className="w-3 h-3 mr-1" /> {node.vulnerabilities} CVEs
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-4 flex flex-col md:flex-row justify-between items-start md:items-center text-xs text-gray-500 font-mono border-t border-brand-border/40 pt-3 relative z-10 gap-2">
            <div>
              <span>Sinal de Latência Global: </span>
              <span className="text-brand-green font-semibold">14ms average</span>
            </div>
            <div>
              <span>Mecanismo Inteligente: </span>
              <span className="text-brand-cyan font-semibold">UnderBug AI Threat-Sec v3.8</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Side Panel - Selected Node Details and Controls */}
      <div className="flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-brand-border pt-6 lg:pt-0 lg:pl-6 space-y-6">
        <div>
          <h4 className="font-display font-bold text-white text-base tracking-wide flex items-center mb-1">
            <Terminal className="w-4 h-4 text-brand-green mr-2" /> Auditoria de Atração
          </h4>
          <p className="text-xs text-gray-400 mb-4">Selecione conexões à esquerda para auditar resiliência de porta e relatórios de conformidade.</p>

          <AnimatePresence mode="wait">
            <motion.div
              key={selectedNode.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="bg-brand-bg rounded-lg p-4 border border-brand-border space-y-3"
            >
              <div className="flex justify-between items-center">
                <span className="text-[11px] uppercase tracking-wider font-mono text-gray-500">Host Selecionado</span>
                <span className="text-xs font-mono font-bold text-brand-green">{selectedNode.ip}</span>
              </div>
              
              <h5 className="font-semibold text-sm text-white">{selectedNode.name}</h5>

              <p className="text-xs text-gray-300 leading-relaxed font-sans">{selectedNode.details}</p>

              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-brand-border/40 text-xs font-mono">
                <div>
                  <span className="text-gray-400 block text-[10px]">Uptime Operacional</span>
                  <span className="text-white font-medium">{selectedNode.uptime}</span>
                </div>
                <div>
                  <span className="text-gray-400 block text-[10px]">Verificação Ativa</span>
                  <span className="text-white font-medium">{selectedNode.lastChecked}</span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Action Trigger - simulated real scan */}
          <div className="mt-4">
            <button
              id={`scan-btn-${selectedNode.id}`}
              onClick={() => handleScanNode(selectedNode.id)}
              disabled={isScanningActive || selectedNode.status === 'secured'}
              className={`w-full py-2.5 px-4 rounded-xl font-display font-medium text-xs tracking-wider transition-all duration-200 cursor-pointer flex items-center justify-center space-x-2 ${
                selectedNode.status === 'secured'
                  ? 'bg-brand-green/20 text-brand-green border border-brand-green/30 cursor-not-allowed font-bold'
                  : isScanningActive
                  ? 'bg-brand-green/20 text-brand-green border border-brand-green/30 cursor-wait'
                  : 'bg-brand-green text-brand-bg hover:opacity-90 glow-cyber-green font-bold'
              }`}
            >
              {selectedNode.status === 'secured' ? (
                <>
                  <ShieldCheck className="w-4 h-4 text-brand-green" />
                  <span>CENÁRIO CRÍTICO RESOLVIDO</span>
                </>
              ) : isScanningActive ? (
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-3.5 w-3.5 border-2 border-brand-green border-t-transparent" />
                  <span>PROCESSANDO AUDITORIA ({scanProgress}%)</span>
                </div>
              ) : (
                <>
                  <Zap className="w-4 h-4 text-brand-bg" />
                  <span>EXECUTAR SIMULAÇÃO DE VULNSCAN</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Real-time Event Logger */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-[10px] uppercase font-mono text-gray-400 flex items-center">
              <span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-ping mr-1"></span>
              Logs de Firewall & EDR Ativos
            </span>
            <span className="text-[9px] font-mono text-gray-500">AUTO-UPDATE</span>
          </div>
          
          <div className="bg-brand-bg rounded-lg border border-brand-border p-3 font-mono text-[10px] text-brand-cyan space-y-1.5 max-h-[140px] overflow-y-auto">
            {logs.map((log, index) => (
              <div key={index} className="truncate select-none hover:text-white transition-colors duration-150">
                <span className="text-gray-500">{log.slice(0, 10)}</span>
                <span className="text-brand-green">{log.slice(10, 26)}</span>
                <span className="text-white">{log.slice(26)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
