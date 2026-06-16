import React, { useState } from 'react';
import { ServiceId, ViewName } from '../types';
import { 
  Shield, 
  Terminal, 
  ArrowRight, 
  Server, 
  Compass, 
  Layers, 
  Globe, 
  Cpu, 
  ChevronDown, 
  CheckSquare, 
  BarChart3, 
  Database, 
  GitBranch, 
  Users, 
  Rocket,
  Wrench,
  Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ServicosViewProps {
  initialServiceId?: ServiceId;
  onNavigate: (view: ViewName) => void;
}

export default function ServicosView({ initialServiceId = 'pentest', onNavigate }: ServicosViewProps) {
  const [activeService, setActiveService] = useState<ServiceId>(initialServiceId);
  const [faqOpenIndex, setFaqOpenIndex] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const handleDirectoryItemClick = (id: ServiceId) => {
    setActiveService(id);
    const matched = servicesList.find(s => s.id === id);
    if (matched) {
      setSelectedCategory(matched.category);
    }
    setFaqOpenIndex(null);
    
    // Smooth scroll down to details
    setTimeout(() => {
      const el = document.getElementById('core-service-details-anchor');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 120);
  };

  const categories = [
    { value: 'all', label: 'Todos os Serviços' },
    { value: 'security', label: 'Segurança Cibernética' },
    { value: 'automation_dev', label: 'Automação e Desenvolvimento' },
    { value: 'data_intelligence', label: 'Dados e Inteligência' },
    { value: 'infra_networks', label: 'Infraestrutura e Redes' },
  ];

  const servicesList = [
    // SEGURANÇA CIBERNÉTICA
    {
      id: 'pentest' as ServiceId,
      category: 'security',
      name: 'Pentest',
      tag: 'Simulação de Ataques (GrayBox & BlackBox)',
      desc: 'Simulamos ataques reais com o mais alto rigor técnico do setor. Atuamos sob as duas frentes mais recomendadas do mercado de cibersegurança:\n\n• BlackBox: Realizado de maneira "às cegas", isto é, sem nenhuma informação prévia sobre sua infraestrutura ou credenciais, simulando com total fidelidade as fases reais de reconhecimento, enumeração e exploração externa que um hacker malicioso faria a partir da internet pública.\n\n• GrayBox: A modalidade mais solicitada no mundo corporativo pela sua alta eficiência técnica e custo-benefício. Com acesso a credenciais iniciais e informações pontuais do sistema, nosso time consegue pular etapas básicas de escaneamento para focar no mapeamento profundo de falhas de lógica de negócios, escalação interna de privilégios e validação rigorosa de rotas e APIs críticas.',
      methodology: 'Alinhamento integral às diretrizes internacionais do PTES (Penetration Testing Execution Standard), OWASP Top 10, simulações de APTs e práticas NIST.',
      benefits: [
        'Análises BlackBox exaustivas mapeando a real probabilidade de invasão externa',
        'Varreduras GrayBox de altíssimo impacto para identificar falhas de privilégio e lógica de forma eficiente',
        'Emissão de relatórios técnicos e executivos detalhados com PoCs claros e reteste gratuito incluso'
      ],
      icon: <Terminal className="w-5 h-5 text-brand-green" />
    },
    {
      id: 'gestao_vulnerabilidades' as ServiceId,
      category: 'security',
      name: 'Gestão de Vulnerabilidades',
      tag: 'Mapeamento Contínuo de Brechas',
      desc: 'Processo consistente de rastreamento de lacunas de segurança em sua rede externa e interna. Varremos de maneira proativa servidores expostos, portas abertas e dependências obsoletas.',
      methodology: 'Sistemas inteligentes com classificação severa baseada no padrão internacional CVSS v3 adaptado ao negócio.',
      benefits: [
        'Visibilidade instantânea sobre brechas emergentes na infraestrutura',
        'Mitigação de riscos em canais de alto valor operacional com agilidade',
        'Notificações integradas às frentes de desenvolvimento e engenharia da empresa'
      ],
      icon: <Sparkles className="w-5 h-5 text-brand-green" />
    },
    {
      id: 'edr_xdr' as ServiceId,
      category: 'security',
      name: 'EDR/XDR',
      tag: 'Monitoria Ativa em Hosts',
      desc: 'Implementação de detecção e resposta inteligente nas pontas (computadores, servidores e end-users). Centralizamos telemetria silenciosa para capturar ameaças furtivas em tempo real.',
      methodology: 'Proteção zero-trust de hosts com respostas táticas e controle estrito de execuções de software.',
      benefits: [
        'Instalação e tuning especializado contra incidentes ransomware complexos',
        'Capacidade de contenção e isolamento automático de hosts sob suspeita lógica',
        'Centralização de alertas que otimiza resposta imediata do time de resposta'
      ],
      icon: <Shield className="w-5 h-5 text-brand-green" />
    },
    {
      id: 'threat_hunting' as ServiceId,
      category: 'security',
      name: 'Threat Hunting',
      tag: 'Busca Ativa de Ameaças Ocultas',
      desc: 'Investigações em profundidade nos logs de tráfego, endpoints e servidores por marcas de atacantes sofisticados, detectando anomalias estruturais ignoradas por sistemas comuns.',
      methodology: 'Combinação de inteligência cibernética contra ameaças persistentes avançadas (APT).',
      benefits: [
        'Antecipação a ataques de exfiltração de dados confidenciais',
        'Descoberta de persistência oculta por invasores dentro da rede local',
        'Melhoria contínua de detecção nativa por correlação avançada de táticas informadas'
      ],
      icon: <Compass className="w-5 h-5 text-brand-green" />
    },
    {
      id: 'superficie_ataque' as ServiceId,
      category: 'security',
      name: 'Superfície de Ataque',
      tag: 'Gerenciamento de Exposição Digital (EASM)',
      desc: 'Mapeamento do perímetro externo corporativo visível à internet. Monitoramos subdomínios órfãos, repositórios expostos, falhas de DNS e dados vazados atômicos.',
      methodology: 'Simulação contínua do reconhecimento feito por hackers maliciosos em fontes públicas do ecossistema.',
      benefits: [
        'Identificação de ativos esquecidos na nuvem que ampliam o perímetro de perigo',
        'Redução imediata do canal inicial preferido por agentes de intrusão externos',
        'Proteção contra sequestro de domínios ou uso indevido e phishings direcionados'
      ],
      icon: <Layers className="w-5 h-5 text-brand-green" />
    },

    // AUTOMAÇÃO E DESENVOLVIMENTO
    {
      id: 'sistemas_corporativos' as ServiceId,
      category: 'automation_dev',
      name: 'Sistemas Corporativos',
      tag: 'Aplicações Robustas Escaláveis',
      desc: 'Projetamos e construímos ecossistemas integrados de software, plataformas B2B, portais e sistemas sob medida com design limpo e premissas de segurança defensiva militar do dia zero.',
      methodology: 'Arquitetura Limpa (Clean Architecture), código modular e processos ágeis de desenvolvimento de ponta.',
      benefits: [
        'Portabilidade estável construída em stacks robustas modernos',
        'Desenvolvimento focado em alto desempenho, segurança de transações e concorrência ativa',
        'Sistemas preparados de início para auditorias rígidas de integridade lógica'
      ],
      icon: <Terminal className="w-5 h-5 text-brand-cyan" />
    },
    {
      id: 'apis_microservicos' as ServiceId,
      category: 'automation_dev',
      name: 'APIs e Microsserviços',
      tag: 'Desacoplamento de Alta Performance',
      desc: 'Arquitetamos barramentos de microsserviços integrados e APIs seguras com taxas de resposta eficientes. Eliminamos duplicidades e dependências pesadas de bancos monolíticos.',
      methodology: 'Modelagem técnica orientada a eventos (EDA) utilizando gRPC, REST estruturado e barramentos ágeis.',
      benefits: [
        'Escalabilidade independente dos serviços em picos inesperados de tráfego',
        'Blindagem técnica contra ataques de injeção ou colapso lógico com gateways robustos',
        'Fácil manutenção e agendamento seguro de novas versões de contratos no Git'
      ],
      icon: <GitBranch className="w-5 h-5 text-brand-cyan" />
    },
    {
      id: 'automacao_rpa' as ServiceId,
      category: 'automation_dev',
      name: 'Automação de Processos (RPA)',
      tag: 'Eficiência de Negócios e Operação',
      desc: 'Construção de fluxos ou robôs dedicados que assumem tarefas rotineiras e burocráticas automatizáveis em sistemas, reduzindo drasticamente custos e retrabalhos administrativos.',
      methodology: 'Execuções transparentes baseadas em APIs e roteamentos estritos livres de quebras de interface.',
      benefits: [
        'Eliminação completa de falhas de digitação manual ou atraso de envios corporativos',
        'Garantia de processamento seguro de dados repetitivos em regimes ininterruptos',
        'Liberação da capacidade crítica dos analistas para atividades essencialmente intelectuais'
      ],
      icon: <Cpu className="w-5 h-5 text-brand-cyan" />
    },
    {
      id: 'integracao_sistemas' as ServiceId,
      category: 'automation_dev',
      name: 'Integrações entre Sistemas',
      tag: 'Sincronização Unificada Bilateral',
      desc: 'Interligamos sistemas especialistas, CRMs, ERPs complexos e gateways financeiros heterogêneos de maneira confiável, mantendo a integridade integral ao longo dos barramentos.',
      methodology: 'Desenho de canais de sincronização baseados em filas (SaaS/On-Premise) resilientes a quedas.',
      benefits: [
        'Garantia técnico-gerencial do tráfego correto de faturamentos e estoques bilaterais',
        'Integração invisível sem atritos de pacotes ou duplicação de dados sensíveis',
        'Avisos e alarmes operacionais em tempo de ocorrência real nos canais corporativos'
      ],
      icon: <Layers className="w-5 h-5 text-brand-cyan" />
    },
    {
      id: 'devnet_automation' as ServiceId,
      category: 'automation_dev',
      name: 'DevNet e Network Automation',
      tag: 'Redes Programáveis via APIs',
      desc: 'Provisionamento e gestão ágil de ambientes de hardware de redes geridos puramente através de sistemas programáticos, reduzindo severamente falhas de CLI de pontas físicas.',
      methodology: 'Utilização prática de Infrastructure as Code (IaC) integrada a equipamentos Cisco, Juniper e afins.',
      benefits: [
        'Deploy unificado de políticas complexas em dezenas de filiais de forma simultânea',
        'Rastreabilidade total das mudanças de rede por sistemas de controle de versão atômicas',
        'Redução a menos de 5% de incidentes operacionais decorrentes de digitação em comandos'
      ],
      icon: <Globe className="w-5 h-5 text-brand-cyan" />
    },

    // DADOS E INTELIGÊNCIA
    {
      id: 'bi' as ServiceId,
      category: 'data_intelligence',
      name: 'Business Intelligence',
      tag: 'Modelagem com Propósito Consultivo',
      desc: 'Arquitetamos indicadores dimensionais históricos, consolidando inteligência analítica focada em impulsionar metas comerciais e monitorar as principais forças do negócio.',
      methodology: 'Uso de melhores ferramentas avançadas de visualização de nível executivo.',
      benefits: [
        'Fácil decifração dos dados corporativos mais valiosos com simplicidade visual',
        'Estruturação de bases dimensionais consistentes prontas para múltiplas pesquisas',
        'Cruzamento instantâneo de dados de marketing, RH e fluxos de faturamento'
      ],
      icon: <BarChart3 className="w-5 h-5 text-brand-green" />
    },
    {
      id: 'data_analytics' as ServiceId,
      category: 'data_intelligence',
      name: 'Data Analytics',
      tag: 'Estudos e Insights Avançados',
      desc: 'Investigação profunda de bases de dados legadas e ativas para capturar comportamentos ocultos, criar correlações preditivas e embasar inovações de alto rendimento.',
      methodology: 'Triagem estatística qualificada estruturada e geração sistemática de predições de mercado.',
      benefits: [
        'Identificação cirúrgica de perdas no funil corporativo e padrões de churn de usuários',
        'Mapeamento ativo da jornada de clientes por mineração de dados volumosos',
        'Aumento decisório baseado em fatos lógicos tangíveis que ultrapassam palpites'
      ],
      icon: <Wrench className="w-5 h-5 text-brand-green" />
    },
    {
      id: 'etl_pipelines' as ServiceId,
      category: 'data_intelligence',
      name: 'ETL e Data Pipelines',
      tag: 'Engenharia de Dados e Limpeza',
      desc: 'Construção de canais rápidos de Extração, Transformação e Carga (ETL) para transportar dados volumosos de frentes dispersas a Data Warehouses corporativos velozes.',
      methodology: 'Modelagem técnica otimizada de carga com regras minuciosas de segurança e integridade de registros.',
      benefits: [
        'Higienização completa de bases duplicadas e correção de incongruências técnicas',
        'Processamentos eficientes em tempo real sem impacto no banco de dados operacional',
        'Anonimização automática embarcada em conformidade técnica e regulamentada pela LGPD'
      ],
      icon: <Database className="w-5 h-5 text-brand-blue" />
    },
    {
      id: 'dashboards_executivos' as ServiceId,
      category: 'data_intelligence',
      name: 'Dashboards Executivos',
      tag: 'Visão Central Inteligente para Decisores',
      desc: 'Desenhamos painéis de controle modernos, limpos e otimizados sob altíssima velocidade de carregamento, projetados sob medida para o nível de direção executiva da corporação.',
      methodology: 'Estratégia minimalista de UX aliada a integrações transparentes com storages analíticos.',
      benefits: [
        'Métricas de faturamento, margem e segurança atualizadas de forma visível com um clique',
        'Total acessibilidade remota em celulares corporativos com segurança militar de borda',
        'Fim imediato da elaboração de planilhas complexas mensais suscetíveis a erro manual'
      ],
      icon: <BarChart3 className="w-5 h-5 text-brand-cyan" />
    },

    // INFRAESTRUTURA E REDES
    {
      id: 'arquitetura_redes' as ServiceId,
      category: 'infra_networks',
      name: 'Arquitetura de Redes',
      tag: 'Concepção de Topologia Resiliente',
      desc: 'Planejamento sênior de infraestruturas físicas, lógicas e híbridas escaláveis em datacenters locais ou ecossistemas multi-cloud integrados de forma transparente.',
      methodology: 'Princípio de segurança por design aplicado a roteadores industriais de grande porte.',
      benefits: [
        'Segmentação estrutural segura que impede a movimentação lateral de ameaças na rede',
        'Infraestrutura altamente disponível que absorve futuros aumentos de capacidade operacional',
        'Fornecimento de plantas técnicas digitais completas e diagramadas de cabo a cabo'
      ],
      icon: <Compass className="w-5 h-5 text-brand-cyan" />
    },
    {
      id: 'routing_switching' as ServiceId,
      category: 'infra_networks',
      name: 'Routing & Switching',
      tag: 'Ativação e Hardening de Ativos',
      desc: 'Configuração robusta e ativação profissional de roteadores e switches corporativos industriais. Garantimos tráfegos limpos livres de loops persistentes e instabilidades de borda.',
      methodology: 'Hardening profundo de protocolos dinâmicos resilientes (BGP, OSPF, HSRP/VRRP).',
      benefits: [
        'Failover automático imperceptível de conexões redundantes em caso de rompimentos físicos',
        'Políticas sólidas de QoS priorizando segurança e chamadas críticas internas de voz e ERP',
        'Blindagem ativa de hardware contra sequestros de rota local e invasões de portas abertas'
      ],
      icon: <Server className="w-5 h-5 text-brand-green" />
    }
  ];

  const faqs = [
    {
      question: 'O que diferencia a Gestão de Vulnerabilidades da execução de um Pentest?',
      answer: 'O Pentest é uma simulação cíclica profunda e manual realizada por analistas éticos juniores e seniores para contornar defesas lógicas de forma atrativa e pontual. Já a Gestão de Vulnerabilidades é um processo contínuo de escaneamento automatizado que monitora portas abertas, certificados e serviços ativos diariamente contra falhas recém-descobertas no ecossistema global.'
    },
    {
      question: 'Qual a vantagem da automação e desenvolvimento integrado à minha infraestrutura de TI (DevNet)?',
      answer: 'Com DevNet e Network Automation, eliminamos configurações manuais via CLI em switches e roteadores individuais que comumente induzem a falhas humanas de digitação ou loops. Ao tratar a rede como código (IaC), você obtém documentação no Git, rollback instantâneo, e pode subir alterações globais em dezenas de filiais de modo simultâneo e seguro.'
    },
    {
      question: 'Como as soluções de Dados e Inteligência ajudam a diretoria na tomada de decisão rápida?',
      answer: 'Modelamos pipelines robustos de ETL que unem bases de dados antes isoladas (silos de ERPs, Hubspot, cobrança) em Data Lakes otimizados e seguros. A partir disso, criamos Dashboards Executivos de altíssima velocidade que exibem apenas indicadores de performance cruciais (KPIs) reais e atualizados, poupando dezenas de horas de relatórios manuais.'
    },
    {
      question: 'Qual a abordagem da Underbug quanto à privacidade e segurança de dados do cliente (LGPD)?',
      answer: 'Adotamos engenharia defensiva de base. Em todos os fluxos de integração ou armazenamento em Data Lakes, aplicamos políticas rígidas de criptografia e processos automáticos de anonimização e sanitização de dados sensíveis nas esteiras de ETL, garantindo conformidade nata às especificações do Bacen e da LGPD de herança.'
    }
  ];

  // Filter services by category
  const filteredServices = servicesList.filter(service => {
    return selectedCategory === 'all' || service.category === selectedCategory;
  });

  const currentActiveData = servicesList.find(s => s.id === activeService) || servicesList[0];

  return (
    <div className="space-y-16 pb-20 pt-8" id="servicos-deep-view">
      
      {/* SECTION HERO */}
      <section className="text-center relative py-8">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-80 bg-brand-green/5 rounded-full filter blur-3xl pointer-events-none" />
        
        <div className="max-w-4xl mx-auto px-4 space-y-4 relative z-10">
          <span className="text-[10px] font-mono text-brand-green uppercase tracking-widest font-semibold bg-brand-green/10 border border-brand-green/20 px-3.5 py-1.5 rounded-full">
            Underbug Engineering & Technology
          </span>
          <h1 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight leading-tight">
            Nossos Serviços de <br />
            <span className="text-gradient-cyber-green">Segurança, Automação e Inteligência</span>
          </h1>
          <p className="text-sm sm:text-base text-gray-400 max-w-2xl mx-auto font-sans leading-relaxed">
            Reescrevemos o padrão corporativo integrando segurança ofensiva de elite, arquitetura de dados dimensionais de alta performance e automações programáveis de infraestrutura.
          </p>
        </div>
      </section>

      {/* 4-COLUMN INTEGRATED CATEGORY DIRECTORY PANEL (Inspired by User Mockup) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="bg-brand-card/90 rounded-3xl border border-brand-border p-6 sm:p-8 shadow-2xl relative overflow-hidden glow-cyber-green/5"
        >
          <div className="absolute inset-0 bg-cyber-gradient opacity-[0.03] pointer-events-none" />
          
          <div className="relative z-10 space-y-4">
            <div className="flex justify-between items-center pb-4 border-b border-brand-border/40">
              <span className="text-[10px] font-mono text-brand-green uppercase tracking-widest font-bold">
                Diretório de Especialidades & Soluções Ativas
              </span>
              <span className="text-[10px] font-mono text-gray-500 hidden sm:inline">
                Selecione uma especialidade para navegar instantaneamente até seu escopo completo no painel analítico
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pt-2">
              
              {/* SEGURANÇA CIBERNÉTICA */}
              <div className="space-y-4" id="category-cybersecurity">
                <div className="pb-1.5 border-b border-brand-border/30 mb-2 flex items-center justify-between">
                  <h3 className="font-display font-extrabold text-brand-green text-xs tracking-wider uppercase">
                    Segurança Cibernética
                  </h3>
                  <span className="text-[9px] font-mono text-gray-500">5 Itens</span>
                </div>
                <div className="space-y-1">
                  {servicesList.filter(s => s.category === 'security').map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handleDirectoryItemClick(item.id)}
                      className={`w-full text-left font-display text-xs transition-all py-1.5 px-2.5 rounded-xl flex items-center space-x-2.5 group/btn cursor-pointer ${
                        activeService === item.id 
                          ? 'bg-brand-green/10 text-brand-green font-bold border border-brand-green/25' 
                          : 'text-gray-400 hover:text-white hover:bg-brand-bg-sec/30 border border-transparent'
                      }`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full shrink-0 transition-transform group-hover/btn:scale-125 ${
                        activeService === item.id ? 'bg-brand-green' : 'bg-gray-600 group-hover/btn:bg-brand-green'
                      }`} />
                      <span className="truncate">{item.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* AUTOMAÇÃO E DESENVOLVIMENTO */}
              <div className="space-y-4" id="category-automation-dev">
                <div className="pb-1.5 border-b border-brand-border/30 mb-2 flex items-center justify-between">
                  <h3 className="font-display font-extrabold text-brand-cyan text-xs tracking-wider uppercase">
                    Automação e Dev
                  </h3>
                  <span className="text-[9px] font-mono text-gray-500">5 Itens</span>
                </div>
                <div className="space-y-1">
                  {servicesList.filter(s => s.category === 'automation_dev').map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handleDirectoryItemClick(item.id)}
                      className={`w-full text-left font-display text-xs transition-all py-1.5 px-2.5 rounded-xl flex items-center space-x-2.5 group/btn cursor-pointer ${
                        activeService === item.id 
                          ? 'bg-brand-cyan/10 text-brand-cyan font-bold border border-brand-cyan/25' 
                          : 'text-gray-400 hover:text-white hover:bg-brand-bg-sec/30 border border-transparent'
                      }`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full shrink-0 transition-transform group-hover/btn:scale-125 ${
                        activeService === item.id ? 'bg-brand-cyan' : 'bg-gray-600 group-hover/btn:bg-brand-cyan'
                      }`} />
                      <span className="truncate">{item.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* DADOS E INTELIGÊNCIA */}
              <div className="space-y-4" id="category-data-intelligence">
                <div className="pb-1.5 border-b border-brand-border/30 mb-2 flex items-center justify-between">
                  <h3 className="font-display font-extrabold text-brand-green text-xs tracking-wider uppercase">
                    Dados e Inteligência
                  </h3>
                  <span className="text-[9px] font-mono text-gray-500">4 Itens</span>
                </div>
                <div className="space-y-1">
                  {servicesList.filter(s => s.category === 'data_intelligence').map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handleDirectoryItemClick(item.id)}
                      className={`w-full text-left font-display text-xs transition-all py-1.5 px-2.5 rounded-xl flex items-center space-x-2.5 group/btn cursor-pointer ${
                        activeService === item.id 
                          ? 'bg-brand-green/10 text-brand-green font-bold border border-brand-green/25' 
                          : 'text-gray-400 hover:text-white hover:bg-brand-bg-sec/30 border border-transparent'
                      }`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full shrink-0 transition-transform group-hover/btn:scale-125 ${
                        activeService === item.id ? 'bg-brand-green' : 'bg-gray-600 group-hover/btn:bg-brand-green'
                      }`} />
                      <span className="truncate">{item.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* INFRAESTRUTURA E REDES */}
              <div className="space-y-4" id="category-infra-networks">
                <div className="pb-1.5 border-b border-brand-border/30 mb-2 flex items-center justify-between">
                  <h3 className="font-display font-extrabold text-brand-blue text-xs tracking-wider uppercase">
                    Infra e Redes
                  </h3>
                  <span className="text-[9px] font-mono text-gray-500">2 Itens</span>
                </div>
                <div className="space-y-1">
                  {servicesList.filter(s => s.category === 'infra_networks').map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handleDirectoryItemClick(item.id)}
                      className={`w-full text-left font-display text-xs transition-all py-1.5 px-2.5 rounded-xl flex items-center space-x-2.5 group/btn cursor-pointer ${
                        activeService === item.id 
                          ? 'bg-brand-blue/10 text-brand-cyan font-bold border border-brand-blue/25' 
                          : 'text-gray-400 hover:text-white hover:bg-brand-bg-sec/30 border border-transparent'
                      }`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full shrink-0 transition-transform group-hover/btn:scale-125 ${
                        activeService === item.id ? 'bg-brand-cyan' : 'bg-gray-600 group-hover/btn:bg-brand-cyan'
                      }`} />
                      <span className="truncate">{item.name}</span>
                    </button>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </motion.div>
      </section>

      {/* CATEGORY NAV FILTERS */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="flex flex-wrap gap-2 justify-center bg-brand-card/30 p-2.5 rounded-2xl border border-brand-border">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => {
                setSelectedCategory(cat.value);
                // Auto-set the active service of the category if not present
                const matched = servicesList.find(s => cat.value === 'all' || s.category === cat.value);
                if (matched) {
                  setActiveService(matched.id);
                }
              }}
              className={`py-2 px-4 rounded-xl text-xs font-semibold cursor-pointer transition-all ${
                selectedCategory === cat.value
                  ? 'bg-brand-green text-brand-bg font-bold shadow-md shadow-brand-green/10'
                  : 'text-gray-400 hover:text-white hover:bg-brand-card/50'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </motion.div>

      {/* CORE SERVICES DISPLAY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start scroll-mt-24" id="core-service-details-anchor">
        
        {/* Left selector col */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="lg:col-span-4 space-y-3"
        >
          <p className="text-[10.5px] font-mono text-gray-500 uppercase tracking-widest px-2">
            ESCOLHA O ESCOPO ({filteredServices.length} DISPONÍVEIS)
          </p>
          <div className="space-y-1 bg-brand-card/30 p-2 rounded-2xl border border-brand-border max-h-[580px] overflow-y-auto custom-scrollbar">
            {filteredServices.map((service) => {
              const isActive = activeService === service.id;
              
              // Select correct style classes based on service category and active state
              let designClasses = '';
              if (isActive) {
                if (service.category === 'automation_dev') {
                  designClasses = 'bg-brand-bg border border-brand-cyan text-white shadow-[0_4px_20px_rgba(0,210,255,0.15)]';
                } else if (service.category === 'infra_networks') {
                  designClasses = 'bg-brand-bg border border-brand-blue text-white shadow-[0_4px_20px_rgba(59,130,246,0.15)]';
                } else if (service.category === 'data_intelligence') {
                  designClasses = 'bg-brand-bg border border-brand-green text-white shadow-[0_4px_20px_rgba(16,185,129,0.15)]';
                } else {
                  designClasses = 'bg-brand-bg border border-brand-green text-white shadow-[0_4px_20px_rgba(16,185,129,0.15)]';
                }
              } else {
                if (service.category === 'automation_dev') {
                  designClasses = 'text-gray-300 hover:text-white hover:bg-brand-card hover:border-brand-cyan/40 hover:shadow-[0_0_15px_rgba(0,210,255,0.1)] border border-transparent';
                } else if (service.category === 'infra_networks') {
                  designClasses = 'text-gray-300 hover:text-white hover:bg-brand-card hover:border-brand-blue/40 hover:shadow-[0_0_15px_rgba(59,130,246,0.1)] border border-transparent';
                } else if (service.category === 'data_intelligence') {
                  designClasses = 'text-gray-300 hover:text-white hover:bg-brand-card hover:border-brand-green/40 hover:shadow-[0_0_15px_rgba(16,185,129,0.1)] border border-transparent';
                } else {
                  designClasses = 'text-gray-300 hover:text-white hover:bg-brand-card hover:border-brand-green/40 hover:shadow-[0_0_15px_rgba(16,185,129,0.1)] border border-transparent';
                }
              }

              return (
                <button
                  key={service.id}
                  id={`btn-service-${service.id}`}
                  onClick={() => {
                    setActiveService(service.id);
                    setFaqOpenIndex(null);
                  }}
                  className={`w-full p-4 rounded-xl text-left transition-all duration-300 ease-out transform hover:scale-[1.025] flex items-center justify-between cursor-pointer ${designClasses}`}
                >
                  <div className="flex items-center space-x-3.5">
                    <div className={`p-1.5 rounded-lg transition-colors ${
                      isActive ? 'bg-brand-green/10 text-brand-green' : 'bg-brand-bg text-gray-500'
                    }`}>
                      {service.icon}
                    </div>
                    <div>
                      <span className="text-xs font-bold block leading-none">{service.name}</span>
                      <span className="text-[9.5px] text-gray-500 font-mono mt-1 block uppercase tracking-wider">{service.tag}</span>
                    </div>
                  </div>
                  <ArrowRight className={`w-4 h-4 transition-transform ${
                    isActive ? 'text-brand-green translate-x-1' : 'text-gray-600'
                  }`} />
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Right deep dive display */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="lg:col-span-8 bg-brand-card rounded-3xl border border-brand-border overflow-hidden relative"
        >
          <div className="absolute top-0 right-0 p-8 opacity-5 text-watermark pointer-events-none text-9xl font-extrabold select-none">
            UB
          </div>
          
          <div className="p-8 md:p-10 space-y-7 relative z-10">
            
            {/* Header metadata */}
            <div className="flex justify-between items-start pb-5 border-b border-brand-border/40 gap-4 flex-wrap">
              <div className="space-y-2">
                <span className="text-[9px] font-mono text-brand-cyan bg-brand-cyan/10 border border-brand-cyan/20 px-3 py-1 rounded-full uppercase tracking-wider font-bold">
                  {currentActiveData.tag}
                </span>
                <h3 className="font-display font-extrabold text-2xl text-white tracking-tight">
                  {currentActiveData.name}
                </h3>
              </div>
              
              <div className="flex space-x-2 text-xs font-mono text-brand-green bg-brand-green/5 border border-brand-green/10 px-3 py-1 rounded-lg">
                <span className="flex items-center"><Sparkles className="w-3.5 h-3.5 mr-1" /> Engenharia Corporativa</span>
              </div>
            </div>

            {/* Description & Methodology */}
            <div className="space-y-4">
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-sans whitespace-pre-line">
                {currentActiveData.desc}
              </p>
              
              <div className="p-4 bg-brand-bg rounded-xl border border-brand-border/60 space-y-1">
                <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest block font-bold">
                  DIRETRIZ E METODOLOGIA DE ENTREGA
                </span>
                <p className="text-xs text-brand-green leading-relaxed font-mono">
                  {currentActiveData.methodology}
                </p>
              </div>
            </div>

            {/* Benefits checks */}
            <div className="space-y-4 pt-1">
              <span className="text-xs font-bold text-white uppercase tracking-wider font-mono block">
                DIFERENCIAIS E ENTREGAS ESPERADAS
              </span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentActiveData.benefits.map((benefit, i) => (
                  <div key={i} className="flex items-start p-3 bg-brand-bg/30 rounded-xl border border-brand-border/40 hover:border-gray-800 transition-colors">
                    <CheckSquare className="w-4 h-4 text-brand-green mr-3 mt-0.5 shrink-0" />
                    <span className="text-xs text-gray-300 leading-relaxed">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Direct CTA */}
            <div className="pt-6 border-t border-brand-border/40 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-[10px] text-gray-500 font-mono text-center sm:text-left leading-normal max-w-sm">
                *O detalhamento técnico final e SLAs de atuação estão contidos no escopo comercial formal da Underbug.
              </p>
              <button
                onClick={() => onNavigate('contato')}
                className="w-full sm:w-auto bg-brand-green hover:bg-[#0fd996] text-brand-bg transition-colors font-display font-bold text-xs py-3.5 px-6 rounded-xl flex items-center justify-center space-x-2 shadow-lg shadow-brand-green/10"
              >
                <span>Solicitar Proposta Desse Escopo</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </motion.div>
      </section>

      {/* TECHNICAL FAQ ON SERVICES */}
      <motion.section 
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-4xl mx-auto px-4 space-y-6" 
        id="faq-section"
      >
        <div className="text-center space-y-2">
          <h2 className="font-display font-bold text-2xl text-white tracking-tight">Perguntas Frequentes do Setor</h2>
          <p className="text-xs text-gray-400">Esclarecendo as principais dúvidas de diretores e engenheiros sobre a atuação integrada da Underbug.</p>
        </div>

        <div className="space-y-2">
          {faqs.map((faq, index) => {
            const isOpen = faqOpenIndex === index;
            return (
              <div
                key={index}
                className="bg-brand-card border border-brand-border rounded-xl overflow-hidden transition-colors"
                id={`faq-item-${index}`}
              >
                <button
                  onClick={() => setFaqOpenIndex(isOpen ? null : index)}
                  className="w-full p-4 text-left font-display text-xs sm:text-sm font-semibold text-white hover:text-brand-green flex justify-between items-center transition-colors cursor-pointer"
                >
                  <span>{faq.question}</span>
                  <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isOpen ? 'transform rotate-180 text-brand-green animate-pulse' : ''}`} />
                </button>
                
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="border-t border-brand-border/40"
                    >
                      <p className="p-4 text-xs text-gray-300 leading-relaxed font-sans bg-brand-bg-sec/30">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </motion.section>

    </div>
  );
}
