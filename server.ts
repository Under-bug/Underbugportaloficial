import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// System Instruction for Underbug Assistant
const systemInstruction = `Você é o Underbug Agent (Cerebrum-X), o assistente cibernético inteligente da Underbug, uma renomada consultoria premium de cibersegurança e TI para operações críticas.
Seu objetivo principal é sanar de forma clara, altamente técnica e persuasiva as dúvidas de qualquer visitante do site.

Seu tom de voz deve ser:
- Técnico, profissional, altamente instruído mas compreensível.
- Moderno (vibe Cyberpunk/Clean Slate), direto, focado em alta tecnologia e segurança robusta.
- Responda em Português do Brasil com excelente estrutura e formatação Markdown clara.

Estrutura dos Produtos/Serviços que você deve detalhar quando questionado:
1. SEGURANÇA CIBERNÉTICA:
   • Pentest (GrayBox & BlackBox): Simulação real de intrusão hacker. Explique claramente as duas frentes sob demanda:
     - BlackBox: Executado de maneira cega, sem dados de infraestrutura ou login prévios. Simula um atacante do perímetro externo real.
     - GrayBox: Modalidade de alta eficiência e melhor custo-benefício. O cliente cede acessos básicos para podermos pular a enumeração inicial e auditar profundamente falhas de lógica de negócios, rotas internas, APIs críticas e escalação de privilégios.
   • Gestão de Vulnerabilidades: Mapeamento de buracos em softwares corporativos de forma automatizada e triagem contínua de brechas lógicas.
   • EDR/XDR: Monitoria de endpoints e resposta instantânea para contenção ativa de ransomwares nas pontas.
   • Threat Hunting: Busca meticulosa e proativa por rastros silenciosos de ameaças persistentes (APTs) que eludem defesas comuns.
   • Superfície de Ataque (EASM): Mapeamento contínuo e preventivo do perímetro externo corporativo visível pública na internet.

2. AUTOMAÇÃO E DESENVOLVIMENTO:
   • Sistemas Corporativos: Desenvolvimento sob medida de portais B2B robustos estruturados com segurança defensiva nativa.
   • APIs e Microsserviços: Modelagem de barramentos desacoplados velozes e seguros com gRPC e REST.
   • Automação RPA: Desenvolvimento de robôs estáveis e eficientes que lidam com tarefas corporativas rotineiras.
   • Integração entre Sistemas: Sincronização bilateral de dados (estoques, faturamento, CRMs, ERPs) livre de perdas.
   • DevNet e Network Automation: Redes programáveis via código, permitindo provisionamentos instantâneos com IaC.

3. DADOS E INTELIGÊNCIA:
   • Business Intelligence: Concepção de bases dimensionais consistentes e análise com foco consultivo e tomadas táticas.
   • Data Analytics: Investigação lógica profunda por modelagem estatística para extração de insights e previsões comerciais.
   • ETL e Data Pipelines: Engenharia pesada e veloz de limpeza, transformação e carga de dados volumosos para Data Warehouses.
   • Dashboards Executivos: Painéis de carregamento instantâneo focados no suporte à decisão de C-levels e diretores.

4. INFRAESTRUTURA E REDES:
   • Arquitetura de Redes: Modelagem detalhada e estruturada de caminhos seguros locais, híbridos ou multi-nuvem.
   • Routing & Switching: Fortalecimento rigoroso de ativos (protocolos de rotas dinâmicas como BGP e OSPF) com tolerância máxima a falhas.

Formatação das respostas:
- Escreva de forma limpa e estruturada usando negritos, subtópicos ou tópicos breves.
- Seja simpático e termine sempre instigando o usuário a agendar uma simulação gratuita ou assessoria técnica preenchendo o formulário de contato do site!`;

// Lazy GoogleGenAI client initialization
let aiClient: GoogleGenAI | null = null;

function getAiClient(): GoogleGenAI | null {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (apiKey) {
      aiClient = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          }
        }
      });
    }
  }
  return aiClient;
}

// Simulated Intelligent Q&A when no API Key is active
function getSimulatedBotResponse(userPrompt: string): string {
  const promptLower = userPrompt.toLowerCase();
  
  if (promptLower.includes("pentest") || promptLower.includes("teste de invasao") || promptLower.includes("blackbox") || promptLower.includes("graybox")) {
    return `### **Serviço de Pentest Underbug**

Nossos testes de invasão e simulação de ataques simulam as táticas de cibercriminosos do mundo real de duas formas complementares:

• **Pentest BlackBox ("Às Cegas"):** Nosso time atua sem qualquer informação prévia de infraestrutura, IP ou senhas. Isso recria exatamente o cenário de um hacker externo buscando frestas e vulnerabilidades expostas na internet corporativa pública.
• **Pentest GrayBox:** É a nossa modalidade mais recomendada corporativamente. Com credenciais de usuário comum e dados pontuais de desenho do sistema fornecidos pelo seu time, pulamos fases preliminares de varredura geral e nos concentramos no que realmente importa: detectar **falhas de lógica de negócios**, caminhos de **escalação interna de privilégios** e segurança nas rotas de **APIs críticas**.

Deseja solicitar uma simulação ou escopo de Pentest para seus sistemas ou APIs? Preencha o formulário na aba de **Contato** que entraremos em contato rapidamente com uma abordagem sob medida!`;
  }
  
  if (promptLower.includes("edr") || promptLower.includes("xdr") || promptLower.includes("ransomware") || promptLower.includes("host") || promptLower.includes("antivirus")) {
    return `### **EDR/XDR e Defesa de Host**

Oferecemos implementação, gestão e monitoramento contínuo de sistemas avançados de **EDR (Endpoint Detection and Response) / XDR**:
- **Detecção baseada em comportamento:** Interrompe ransomwares agressivos em tempo real, mesmo se forem ameaças de dia zero desconhecidas.
- **Contenção autônoma:** Isola hosts comprometidos fisicamente e logicamente da rede local no primeiro sinal de desvio de comportamento para evitar contágio lateral.
- **Tuning especializado:** Evita falsos positivos em softwares corporativos legados.

Fale com nossa equipe técnica visitando nossa página de **Contato** para estruturar a blindagem de seus servidores e máquinas corporativas!`;
  }

  if (promptLower.includes("vulnerabilidade") || promptLower.includes("vulnerabilidades") || promptLower.includes("gestao de vul")) {
    return `### **Gestão e Varredura de Vulnerabilidades**

Nosso serviço realiza uma auditoria automatizada e recorrente de toda a sua superfície computacional para identificar portas abertas, servidores mal configurados, bibliotecas desatualizadas no build do software ou certificados expirados.

- **Diferencial Underbug:** Em vez de apenas gerar um arquivo PDF automatizado, nós catalogamos os riscos através da triagem de severidade **CVSS v3**, apresentando um plano prioritário claro para seus times de infraestrutura e desenvolvimento agirem nos pontos mais críticos.

Isso previne as oportunidades fáceis que robôs de varredura maliciosos exploram. Entre em contato para agendar seu primeiro ciclo!`;
  }

  if (promptLower.includes("automacao") || promptLower.includes("rpa") || promptLower.includes("robo") || promptLower.includes("desenvolvimento") || promptLower.includes("sistemas") || promptLower.includes("api")) {
    return `### **Automação (RPA) & Engenharia de Sistemas Corporativos**

Na Underbug, impulsionamos sua operação com softwares de alta solidez e segurança embarcada desde o dia zero:
- **Sistemas Corporativos sob Medida:** Plataformas Web modernas, responsivas e totalmente preparadas para aguentar alta concorrência operacional e testes rígidos de conformidade técnica.
- **Robôs e Automação de Processos (RPA):** Agilizamos tarefas cansativas de reconciliação de dados, relatórios e transferências de sistemas que tomam tempo e causam custos repetitivos.
- **APIs e Microsserviços de Alta Performance:** Projetamos integrações seguras desacopladas via gRPC ou REST para assegurar faturamento e dados sincronizados.

Diga qual é o gargalo operacional da sua empresa acessando o formulário de **Contato** para conversarmos!`;
  }

  if (promptLower.includes("dados") || promptLower.includes("bi") || promptLower.includes("dashboard") || promptLower.includes("data") || promptLower.includes("analytics")) {
    return `### **Dados, ETL & Dashboards Inteligentes**

Nossa divisão de Inteligência de Dados transforma sistemas e planilhas desconexas em ativos reais de inteligência estratégica:
- **Business Intelligence (BI):** Indicadores estratégicos consolidados em visões históricas sob medida para faturamentos, estoque ou pessoal.
- **Data Analytics:** Modelagem técnica preditiva e mineração estatística aplicada a processos de negócio em tempo real.
- **Data Pipelines (ETL):** Ingestão pesada, transformação resiliente e limpeza volumosa de dados para Data Warehouses (BigQuery, Redshift) totalmente protegidos, respeitando todos os quesitos de confidencialidade técnica e LGPD.

Quer desenhar um dashboard de decisão confiável e ultra rápido para sua diretoria? Vamos conversar através do formulário de orçamento!`;
  }

  if (promptLower.includes("redes") || promptLower.includes("routing") || promptLower.includes("switch") || promptLower.includes("infra")) {
    return `### **Arquitetura de Redes, Routing e Switching**

Nossos engenheiros contam com certificações de elite do setor para projetar e sustentar caminhos físicos ou lógicos redundantes:
- **Engenharia de Roteamento Avançado:** Hardening e ativação resiliente de protocolos dinâmicos de alta disponibilidade (como BGP e OSPF).
- **Network Automation (DevNet):** Redes totalmente programáveis via código (IaC), permitindo implantar regras consistentes de segurança de roteadores ou firewalls em dezenas de filiais instantaneamente.
- **Análise de Latência:** Análises detalhadas de pacotes de dados para erradicar lentidões intermitentes e pings instáveis.

Com caminhos lógicos seguros, sua operação nunca perde conexões essenciais. Visite nosso canal de contato para agendarmos uma análise de topologia!`;
  }

  return `### **Olá de volta! Como posso te apoiar hoje?**

Eu sou o assistente virtual inteligente da **Underbug**, pronto para tirar suas dúvidas de segurança cibernética e engenharia de software! 

Você pode me perguntar sobre:
1. **Pentest (GrayBox vs BlackBox):** Simulações de ataques reais à sua infraestrutura ou APIs.
2. **Gestão de Vulnerabilidades & Diagnósticos:** Mapeamento preventivo contínuo de brechas.
3. **EDR/XDR e Combate a Ransomware:** Defesa e bloqueio proativo nas pontas.
4. **Sistemas Corporativos & RPA:** Automações inteligentes e códigos robustos para otimizar suas horas técnicas.
5. **Data Analytics & Dashboards Executivos:** Indicadores dimensionais velozes de negócios.
6. **Infraestrutura de Redes (Routing & Switching):** Estabilidade e rotas de redes dinâmicas seguras.

*Atualmente rodando em modo assistente local de alta cobertura. Você pode deixar suas perguntas detalhadas na nossa página de **Contato** para ganhar um diagnóstico cibernético exclusivo com nossos diretores!*`;
}

// API Chat Endpoint
app.post("/api/chat", async (req, res) => {
  const { messages } = req.body;

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: "O parâmetro 'messages' é obrigatório e deve ser um array." });
  }

  try {
    const ai = getAiClient();
    
    if (!ai) {
      // If there is no Gemini key, use the local intelligent simulator
      const lastUserMessage = messages[messages.length - 1]?.text || "";
      const fallbackResponse = getSimulatedBotResponse(lastUserMessage);
      return res.json({ text: fallbackResponse, simulated: true });
    }

    // Convert client chat history format to @google/genai contents list
    const promptContents = messages.map(msg => ({
      role: msg.role === "user" ? "user" : "model",
      parts: [{ text: msg.text }]
    }));

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: promptContents,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    res.json({ text: response.text });
  } catch (error: any) {
    console.error("Gemini API error:", error?.message || error);
    // Gracefully handle on error
    const lastUserMessage = messages[messages.length - 1]?.text || "";
    const fallbackResponse = getSimulatedBotResponse(lastUserMessage);
    res.json({ text: fallbackResponse, error: error?.message || "Erro de rede com o serviço de IA. Retornando resposta local.", simulated: true });
  }
});

// Serve frontend assets and hook dev middleware
async function setupServer() {
  if (process.env.NODE_ENV !== "production") {
    console.log("Starting server in development mode...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("Starting server in production mode...");
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server fully operational on http://localhost:${PORT}`);
  });
}

setupServer();
