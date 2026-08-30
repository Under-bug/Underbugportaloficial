import React, { useState } from 'react';
import { BlogPost, ViewName } from '../types';
import { Calendar, User, Clock, Search, Folder, BookOpen, Download, HelpCircle, ArrowRight, ArrowLeft, ShieldAlert } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ConteudoViewProps {
  onNavigate: (view: ViewName) => void;
}

export default function ConteudoView({ onNavigate }: ConteudoViewProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  
  // Custom interactive trigger feedback states
  const [isDownloading, setIsDownloading] = useState<string | null>(null);
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  const categories = [
    { value: 'all', label: 'Todos os Conteúdos' },
    { value: 'vulnerabilidades', label: 'Vulnerabilidades' },
    { value: 'cloud', label: 'Cloud Security' },
    { value: 'pentest', label: 'Pentest' },
    { value: 'edr', label: 'EDR' },
    { value: 'compliance', label: 'Compliance' },
    { value: 'devsecops', label: 'DevSecOps' },
  ];

  const blogPosts: BlogPost[] = [
    {
      id: 'post-1',
      title: 'Vazamentos de Credenciais em Produção: Como Evitar Falhas Lógicas de API',
      excerpt: 'Uma análise técnica minuciosa sobre de que forma chaves SSH e senhas duras em commits continuam sendo o primeiro vetor de roubo em bancos de dados.',
      category: 'vulnerabilidades',
      date: '10 de Junho, 2026',
      readTime: '6 min leitura',
      author: 'Lucas Garcia, OSCP (Lead OffSec)',
      content: 'Nas auditorias de segurança conduzidas pela UnderBug ao longo de 2026, identificamos que 42% de todo acesso não autorizado se inicia por chaves esquecidas em commits no Git de teste comunitário ou APIs abertas de depuração sem MFA.\n\nNeste artigo, mostramos como regras rigorosas de SAST no pipeline Jenkins reduzem essa exposição a zero e por que a suíte Recondark atua como proteção complementar de retaguarda sanitizando logins da empresa em tempo real.'
    },
    {
      id: 'post-2',
      title: 'Entendendo a nova CVE de Escalação de Privilégios no Kubernetes',
      excerpt: 'Mecanismo de mitigação rápida passo a passo contra escapes de Docker containers e políticas IAM mal-configuradas no AWS EKS.',
      category: 'cloud',
      date: '02 de Junho, 2026',
      readTime: '8 min leitura',
      author: 'Eduardo Martins, AWS Specialty Security',
      content: 'A recente vulnerabilidade expõe orquestradores Kubernetes que utilizam drivers antigos de armazenamento. Um intruso local pode escalar privilégios para host e escutar toda a rede interna do cluster.\n\nMostramos neste relatório avançado como o Cloud Security Guard UnderBug mapeia e detecta a versão das bibliotecas e como configurar o Pod Security Standards (PSS) adequadamente.'
    },
    {
      id: 'post-3',
      title: 'A Importância do Reteste Técnico após um Relatório Ofensivo de Pentest',
      excerpt: 'Por que o fechamento do relatório não é o fim do seu ciclo de conformidade? Entenda a auditoria com revalidação.',
      category: 'pentest',
      date: '28 de Maio, 2026',
      readTime: '5 min leitura',
      author: 'Karina Lopes, CISSP (Consultora de Risco)',
      content: 'Relatórios guardados em gavetas geram falsa segurança. Apontamos por que obter o selo atestado da UnderBug após o reteste é pré-requisito para fechar com bancos multinacionais e rebaixar riscos de multas regulatórias.'
    },
    {
      id: 'post-4',
      title: 'Estratégia de Threat Hunting: Como Isolar Malware Ativos nos Endpoints',
      excerpt: 'Diferencial em relação a antivírus tradicionais: de que forma a telemetria do EDR detecta ransomwares furtivos.',
      category: 'edr',
      date: '15 de Maio, 2026',
      readTime: '7 min leitura',
      author: 'Marcus Pereira, EDR Eng',
      content: 'Antivírus legados buscam apenas assinaturas conhecidas. Um ransomware moderno modifica as chaves de criptografia no kernel de forma furtiva. Explicamos o papel das auditorias em processos e de que forma o EDR isola preventivamente o host de forma autônoma.'
    }
  ];

  const whitepapers = [
    {
      id: 'wp-1',
      title: 'Guia Executivo: Mitigação Automatizada de Engenharia Social e Falhas OWASP em 2026',
      desc: 'Formato PDF. Framework prático para diretores estruturarem governanças saudáveis.',
      size: '2.4 MB'
    },
    {
      id: 'wp-2',
      title: 'Análise de Vetores Cloudflare: WAF, Zero Trust e Redução Real de Indisponibilidade',
      desc: 'Formato PDF. Caso de estudo de mitigação volumétrica de DDoS de 8.2 Gbps.',
      size: '1.8 MB'
    }
  ];

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleDownloadWP = (id: string, name: string) => {
    setIsDownloading(id);
    setTimeout(() => {
      setIsDownloading(null);
      setDownloadSuccess(name);
      setTimeout(() => setDownloadSuccess(null), 3000);
    }, 1400);
  };

  return (
    <div className="space-y-16 pb-20 pt-8" id="conteudo-technical-view">
      
      {/* SECTION HERO */}
      <section className="text-center relative py-8">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-80 bg-brand-cyan/5 rounded-full filter blur-3xl pointer-events-none" />
        
        <div className="max-w-4xl mx-auto px-4 space-y-4 relative z-10">
          <span className="text-[10px] font-mono text-brand-green bg-brand-green/10 border border-brand-green/20 px-3 py-1 rounded-full uppercase tracking-wider font-semibold">
            UnderBug Intelligence Lab
          </span>
          <h1 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
            Conteúdo Técnico e Informes de Ameaças
          </h1>
          <p className="text-sm sm:text-base text-gray-400 max-w-2xl mx-auto">
            Análises profundas produzidas por nossos especialistas certificados, ajudando sua empresa a entender e se manter atualizada sobre novos vetores de perigo lógico.
          </p>
        </div>
      </section>

      {/* FILTER SEARCH NAV BLOCK */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-brand-card/45 p-4 rounded-2xl border border-brand-border">
          
          {/* Categories select */}
          <div className="flex flex-wrap gap-2 justify-center md:justify-start w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setSelectedCategory(cat.value)}
                className={`py-1.5 px-3 rounded-lg text-xs font-medium cursor-pointer transition-colors ${
                  selectedCategory === cat.value
                    ? 'bg-brand-green text-brand-bg font-bold'
                    : 'bg-brand-bg text-gray-300 border border-brand-border hover:border-gray-700'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Input bar */}
          <div className="relative w-full md:w-72 shrink-0">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-500" />
            <input
              type="text"
              placeholder="Buscar artigos técnicos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-brand-bg border border-brand-border rounded-xl py-2 pl-9 pr-4 text-xs text-white focus:outline-none focus:border-brand-green placeholder-gray-600"
            />
          </div>

        </div>
      </section>

      {/* ARTICLES GRID & WHITEPAPERS DOWNLOAD SIDEBAR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left col: list of articles */}
        <div className="lg:col-span-8 space-y-6">
          <h3 className="text-xs font-mono text-gray-500 uppercase tracking-widest px-1">
            ARTIGOS TÉCNICOS PUBLICADOS ({filteredPosts.length})
          </h3>

          <div className="space-y-4">
            {filteredPosts.map((post) => (
              <div
                key={post.id}
                className="bg-brand-card p-6 rounded-2xl border border-brand-border hover:border-brand-cyan/20 transition-all duration-300 space-y-4 flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-center text-[10px] font-mono text-brand-cyan">
                    <span className="uppercase bg-brand-cyan/10 border border-brand-cyan/20 px-2 py-0.5 rounded-full font-bold">
                      {post.category}
                    </span>
                    <span className="text-gray-500">{post.date}</span>
                  </div>

                  <h3 className="font-display font-bold text-white text-base sm:text-lg mt-3 hover:text-brand-cyan transition-colors tracking-wide">
                    {post.title}
                  </h3>
                  
                  <p className="text-xs text-gray-400 mt-2 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-brand-border/40 flex justify-between items-center">
                  <span className="text-[10px] text-gray-500 font-mono">Autor: {post.author}</span>
                  <button
                    onClick={() => {
                      setSelectedPost(post);
                    }}
                    className="text-brand-green text-xs font-semibold hover:text-white transition-colors cursor-pointer flex items-center space-x-1"
                  >
                    <span>Ler Artigo Integral</span>
                    <Clock className="w-3.5 h-3.5 ml-1" />
                  </button>
                </div>
              </div>
            ))}

            {filteredPosts.length === 0 && (
              <div className="p-12 text-center text-xs text-gray-400 bg-brand-card rounded-2xl border border-brand-border">
                <ShieldAlert className="w-8 h-8 text-amber-500 mx-auto mb-2 animate-bounce" />
                Nenhum relatório técnico encontrado correspondendo ao termo de busca "{searchQuery}".
              </div>
            )}
          </div>
        </div>

        {/* Right col: resource whitepapers download */}
        <div className="lg:col-span-4 space-y-6">
          <h3 className="text-xs font-mono text-gray-500 uppercase tracking-widest px-1">
            BIBLIOTECA DE WHITEPAPERS B2B
          </h3>

          <div className="space-y-4">
            {whitepapers.map((wp) => (
              <div
                key={wp.id}
                className="bg-brand-card p-5 rounded-2xl border border-brand-border hover:border-brand-blue/30 transition-all duration-300 space-y-4 flex flex-col justify-between relative overflow-hidden"
              >
                {/* Glow bar */}
                <div className="absolute top-0 left-0 w-full h-1 bg-brand-blue" />

                <div className="space-y-2">
                  <div className="p-2 bg-brand-bg rounded-lg border border-brand-border w-fit text-brand-blue">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  
                  <h4 className="font-display font-semibold text-white text-xs sm:text-sm tracking-wide">
                    {wp.title}
                  </h4>
                  
                  <p className="text-[10.5px] text-gray-400 leading-normal">
                    {wp.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-brand-border/40 mt-2 flex justify-between items-center">
                  <span className="text-[11px] font-mono text-gray-500">{wp.size}</span>
                  
                  <button
                    onClick={() => handleDownloadWP(wp.id, wp.title)}
                    disabled={isDownloading !== null}
                    className="p-2 rounded-lg bg-brand-bg hover:bg-brand-card hover:border-brand-green border border-brand-border/60 text-brand-green hover:text-white transition-all text-xs flex items-center space-x-1.5 cursor-pointer font-bold"
                  >
                    {isDownloading === wp.id ? (
                      <div className="animate-spin rounded-full h-3 w-3 border-2 border-brand-green border-t-transparent" />
                    ) : (
                      <>
                        <Download className="w-3.5 h-3.5" />
                        <span>Baixar Guia</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}

            {/* Success toast simulated overlay popup */}
            <AnimatePresence>
              {downloadSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 15 }}
                  className="bg-brand-green/20 border border-brand-green/40 p-4 rounded-xl text-xs text-white"
                >
                  <p className="font-semibold text-brand-green flex items-center">
                    ✓ DOWNLOAD SIMULADO INICIADO
                  </p>
                  <p className="text-[10px] text-gray-400 mt-1">O arquivo técnico foi empacotado para o lead. Um especialista enviará o link definitivo HubSpot para seu e-mail corporativo.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

      </section>

      {/* DYNAMIC POST READ WINDOW MODAL overlay */}
      <AnimatePresence>
        {selectedPost && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-bg/80 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-brand-card rounded-2xl border border-brand-border max-w-2xl w-full max-h-[85vh] overflow-y-auto p-6 md:p-8 space-y-6 glow-cyber-blue shadow-2xl"
            >
              <div className="flex justify-between items-center pb-4 border-b border-brand-border/40">
                <span className="uppercase text-[10px] font-mono text-brand-cyan bg-brand-cyan/10 border border-brand-cyan/20 px-2 py-0.5 rounded-full font-bold">
                  {selectedPost.category}
                </span>
                
                <button
                  onClick={() => setSelectedPost(null)}
                  className="text-xs p-1 px-3 bg-brand-bg hover:bg-brand-card rounded-lg border border-brand-border text-gray-400 hover:text-white transition-colors cursor-pointer"
                >
                  Fechar (ESC)
                </button>
              </div>

              <div className="space-y-4">
                <h3 className="font-display font-extrabold text-white text-lg sm:text-2xl leading-snug">
                  {selectedPost.title}
                </h3>
                
                <div className="flex space-x-4 text-[10px] sm:text-xs text-gray-500 font-mono">
                  <span>Autor: {selectedPost.author}</span>
                  <span>|</span>
                  <span>{selectedPost.date}</span>
                </div>
              </div>

              <div className="text-xs sm:text-sm text-gray-300 leading-relaxed font-sans whitespace-pre-wrap border-t border-brand-border/40 pt-4">
                {selectedPost.content}
              </div>

              <div className="pt-4 border-t border-brand-border/40 flex justify-between items-center">
                <p className="text-[10px] text-gray-500 font-mono">UNDERBUG INTEL LAB REPORT</p>
                <button
                  onClick={() => { setSelectedPost(null); onNavigate('contato'); }}
                  className="bg-brand-green hover:bg-[#3ae0a9] text-brand-bg px-4 py-2 rounded-xl text-xs font-display font-bold transition-all cursor-pointer"
                >
                  Agendar auditoria desse risco
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
