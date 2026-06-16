export type ViewName = 'home' | 'plataforma' | 'servicos' | 'conteudo' | 'sobre' | 'contato' | 'politica' | 'termos' | 'parceiros' | 'carreira' | 'ferramentas';

export type PlatformId = 'secmaturity' | 'explainer' | 'recondark' | 'vulnscan';

export type ServiceId = 
  | 'pentest'
  | 'gestao_vulnerabilidades'
  | 'edr_xdr'
  | 'threat_hunting'
  | 'superficie_ataque'
  | 'sistemas_corporativos'
  | 'apis_microservicos'
  | 'automacao_rpa'
  | 'integracao_sistemas'
  | 'devnet_automation'
  | 'bi'
  | 'data_analytics'
  | 'etl_pipelines'
  | 'dashboards_executivos'
  | 'arquitetura_redes'
  | 'routing_switching';

export interface LeadFormData {
  nome: string;
  empresa: string;
  cargo: string;
  email: string;
  telefone: string;
  colaboradores: string;
  desafio: string;
}

export interface SecurityMetric {
  label: string;
  value: string;
  change: string;
  isPositive: boolean;
  status: 'critical' | 'stable' | 'secured';
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: 'vulnerabilidades' | 'cloud' | 'pentest' | 'edr' | 'compliance' | 'devsecops';
  date: string;
  readTime: string;
  content: string;
  author: string;
}
