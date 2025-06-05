import { useParams, useNavigate } from 'react-router-dom';
import { useStudyContext } from '../contexts/StudyContext';
import { useState } from 'react';

const LearnMode = () => {
  const { trackId } = useParams<{ trackId: string }>();
  const navigate = useNavigate();
  const { getCurrentQuestions } = useStudyContext();
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showContent, setShowContent] = useState(true);
  
  const questions = getCurrentQuestions();
  const currentQuestion = questions[currentQuestionIndex];

  // Mapear cores com base no trackId
  const trackColors = {
    react: 'blue',
    fullstack: 'green',
    devops: 'purple',
    challenges: 'yellow'
  };
  
  const currentColor = trackId && trackId in trackColors 
    ? trackColors[trackId as keyof typeof trackColors] 
    : 'blue';
    
  const colorClasses = {
    blue: {
      button: 'bg-blue-500 hover:bg-blue-600',
      progress: 'bg-blue-500',
      border: 'border-blue-500',
      bg: 'bg-blue-50 dark:bg-blue-900/30'
    },
    green: {
      button: 'bg-green-500 hover:bg-green-600',
      progress: 'bg-green-500',
      border: 'border-green-500',
      bg: 'bg-green-50 dark:bg-green-900/30'
    },
    purple: {
      button: 'bg-purple-500 hover:bg-purple-600',
      progress: 'bg-purple-500',
      border: 'border-purple-500',
      bg: 'bg-purple-50 dark:bg-purple-900/30'
    },
    yellow: {
      button: 'bg-yellow-500 hover:bg-yellow-600',
      progress: 'bg-yellow-500',
      border: 'border-yellow-500',
      bg: 'bg-yellow-50 dark:bg-yellow-900/30'
    }
  };
  
  const buttonColorClass = colorClasses[currentColor as keyof typeof colorClasses].button;
  const progressColorClass = colorClasses[currentColor as keyof typeof colorClasses].progress;
  const borderColorClass = colorClasses[currentColor as keyof typeof colorClasses].border;
  const bgColorClass = colorClasses[currentColor as keyof typeof colorClasses].bg;

  // Conteúdo teórico por categoria
  const theoreticalContent: Record<string, string> = {
    'Fundamentos': `
      <h3 class="text-xl font-bold mb-3">Fundamentos do React</h3>
      <p class="mb-3">React é uma biblioteca JavaScript para construção de interfaces de usuário, desenvolvida pelo Facebook. Ela permite criar componentes reutilizáveis que gerenciam seu próprio estado.</p>
      
      <h4 class="text-lg font-bold mb-2">Principais conceitos:</h4>
      <ul class="list-disc pl-5 mb-3">
        <li class="mb-1"><strong>Componentes:</strong> Blocos de construção reutilizáveis que encapsulam lógica e UI.</li>
        <li class="mb-1"><strong>JSX:</strong> Extensão de sintaxe que parece HTML mas permite usar JavaScript completo.</li>
        <li class="mb-1"><strong>Props:</strong> Dados passados de um componente pai para um filho (imutáveis).</li>
        <li class="mb-1"><strong>Estado:</strong> Dados gerenciados dentro de um componente que podem mudar ao longo do tempo.</li>
        <li class="mb-1"><strong>Virtual DOM:</strong> Representação em memória do DOM real para otimizar renderizações.</li>
      </ul>
      
      <p class="mb-3">O React utiliza um fluxo de dados unidirecional, o que torna o código mais previsível e facilita a depuração.</p>
    `,
    'Hooks': `
      <h3 class="text-xl font-bold mb-3">Hooks no React</h3>
      <p class="mb-3">Hooks são funções especiais introduzidas no React 16.8 que permitem usar estado e outros recursos do React em componentes funcionais, sem precisar escrever classes.</p>
      
      <h4 class="text-lg font-bold mb-2">Hooks principais:</h4>
      <ul class="list-disc pl-5 mb-3">
        <li class="mb-1"><strong>useState:</strong> Adiciona estado a componentes funcionais.</li>
        <li class="mb-1"><strong>useEffect:</strong> Executa efeitos colaterais em componentes (similar aos métodos de ciclo de vida).</li>
        <li class="mb-1"><strong>useContext:</strong> Acessa dados de contexto sem componentes consumidores aninhados.</li>
        <li class="mb-1"><strong>useReducer:</strong> Gerencia estados mais complexos com um padrão similar ao Redux.</li>
        <li class="mb-1"><strong>useCallback/useMemo:</strong> Otimizam performance memorizando funções e valores.</li>
        <li class="mb-1"><strong>useRef:</strong> Cria uma referência mutável que persiste entre renderizações.</li>
      </ul>
      
      <h4 class="text-lg font-bold mb-2">Regras dos Hooks:</h4>
      <ul class="list-disc pl-5 mb-3">
        <li class="mb-1">Só chame Hooks no nível superior (não dentro de loops, condições ou funções aninhadas).</li>
        <li class="mb-1">Só chame Hooks em componentes funcionais React ou em Hooks customizados.</li>
      </ul>
    `,
    'Gerenciamento de Estado': `
      <h3 class="text-xl font-bold mb-3">Gerenciamento de Estado no React</h3>
      <p class="mb-3">O gerenciamento de estado é um aspecto crucial no desenvolvimento React, especialmente em aplicações maiores.</p>
      
      <h4 class="text-lg font-bold mb-2">Opções de gerenciamento de estado:</h4>
      <ul class="list-disc pl-5 mb-3">
        <li class="mb-1"><strong>Estado local:</strong> Usando useState ou useReducer para componentes individuais.</li>
        <li class="mb-1"><strong>Elevação de estado:</strong> Movendo o estado para o ancestral comum mais próximo.</li>
        <li class="mb-1"><strong>Context API:</strong> Para compartilhar dados que podem ser considerados "globais" para uma árvore de componentes.</li>
        <li class="mb-1"><strong>Redux:</strong> Biblioteca para gerenciamento de estado previsível com store centralizada.</li>
        <li class="mb-1"><strong>Zustand/Jotai/Recoil:</strong> Alternativas modernas ao Redux com APIs mais simples.</li>
      </ul>
      
      <h4 class="text-lg font-bold mb-2">Context API:</h4>
      <p class="mb-3">A Context API permite compartilhar valores entre componentes sem passar props explicitamente em cada nível. Consiste em:</p>
      <ul class="list-disc pl-5 mb-3">
        <li class="mb-1"><strong>React.createContext:</strong> Cria um objeto de contexto.</li>
        <li class="mb-1"><strong>Context.Provider:</strong> Componente que provê o valor do contexto aos filhos.</li>
        <li class="mb-1"><strong>useContext:</strong> Hook para consumir o valor do contexto.</li>
      </ul>
    `,
    'Performance': `
      <h3 class="text-xl font-bold mb-3">Otimização de Performance no React</h3>
      <p class="mb-3">Otimizar a performance de aplicações React envolve minimizar renderizações desnecessárias e melhorar o tempo de carregamento.</p>
      
      <h4 class="text-lg font-bold mb-2">Técnicas de otimização:</h4>
      <ul class="list-disc pl-5 mb-3">
        <li class="mb-1"><strong>React.memo:</strong> Memoriza componentes para evitar renderizações desnecessárias.</li>
        <li class="mb-1"><strong>useMemo/useCallback:</strong> Memoriza valores e funções entre renderizações.</li>
        <li class="mb-1"><strong>Code Splitting:</strong> Divide o código em chunks menores carregados sob demanda.</li>
        <li class="mb-1"><strong>Lazy Loading:</strong> Carrega componentes apenas quando necessário.</li>
        <li class="mb-1"><strong>Virtualização:</strong> Renderiza apenas os itens visíveis em listas longas.</li>
        <li class="mb-1"><strong>Web Workers:</strong> Move cálculos pesados para threads separadas.</li>
      </ul>
      
      <h4 class="text-lg font-bold mb-2">Ferramentas de profiling:</h4>
      <ul class="list-disc pl-5 mb-3">
        <li class="mb-1"><strong>React DevTools Profiler:</strong> Analisa renderizações e tempos de commit.</li>
        <li class="mb-1"><strong>Lighthouse:</strong> Avalia performance geral da aplicação web.</li>
        <li class="mb-1"><strong>why-did-you-render:</strong> Biblioteca que notifica sobre renderizações potencialmente evitáveis.</li>
      </ul>
    `,
    'Backend': `
      <h3 class="text-xl font-bold mb-3">Desenvolvimento Backend</h3>
      <p class="mb-3">O desenvolvimento backend envolve a criação da lógica de servidor, APIs e interações com banco de dados que sustentam aplicações web.</p>
      
      <h4 class="text-lg font-bold mb-2">Componentes principais:</h4>
      <ul class="list-disc pl-5 mb-3">
        <li class="mb-1"><strong>Servidores:</strong> Processam requisições e enviam respostas (Node.js, Python, Java, etc).</li>
        <li class="mb-1"><strong>APIs:</strong> Interfaces para comunicação entre frontend e backend (REST, GraphQL).</li>
        <li class="mb-1"><strong>Bancos de dados:</strong> Armazenam e gerenciam dados (SQL, NoSQL).</li>
        <li class="mb-1"><strong>Autenticação:</strong> Gerenciam identidade e acesso de usuários.</li>
        <li class="mb-1"><strong>Middleware:</strong> Software que atua entre diferentes componentes.</li>
      </ul>
      
      <h4 class="text-lg font-bold mb-2">APIs RESTful:</h4>
      <p class="mb-3">REST (Representational State Transfer) é um estilo arquitetural para sistemas distribuídos que usa métodos HTTP:</p>
      <ul class="list-disc pl-5 mb-3">
        <li class="mb-1"><strong>GET:</strong> Recupera recursos.</li>
        <li class="mb-1"><strong>POST:</strong> Cria novos recursos.</li>
        <li class="mb-1"><strong>PUT/PATCH:</strong> Atualiza recursos existentes.</li>
        <li class="mb-1"><strong>DELETE:</strong> Remove recursos.</li>
      </ul>
    `,
    'Bancos de Dados': `
      <h3 class="text-xl font-bold mb-3">Bancos de Dados</h3>
      <p class="mb-3">Bancos de dados são sistemas organizados para armazenar, gerenciar e recuperar informações de forma eficiente.</p>
      
      <h4 class="text-lg font-bold mb-2">Tipos principais:</h4>
      <ul class="list-disc pl-5 mb-3">
        <li class="mb-1"><strong>Relacionais (SQL):</strong> Organizam dados em tabelas com relações predefinidas (MySQL, PostgreSQL).</li>
        <li class="mb-1"><strong>Não-relacionais (NoSQL):</strong> Armazenam dados em formatos flexíveis como documentos, grafos ou pares chave-valor (MongoDB, Redis).</li>
        <li class="mb-1"><strong>Time-series:</strong> Otimizados para dados sequenciais temporais (InfluxDB).</li>
        <li class="mb-1"><strong>Grafos:</strong> Focados em relações entre entidades (Neo4j).</li>
      </ul>
      
      <h4 class="text-lg font-bold mb-2">Conceitos importantes:</h4>
      <ul class="list-disc pl-5 mb-3">
        <li class="mb-1"><strong>ACID:</strong> Propriedades que garantem confiabilidade em transações (Atomicidade, Consistência, Isolamento, Durabilidade).</li>
        <li class="mb-1"><strong>Normalização:</strong> Processo de organização de dados para reduzir redundância.</li>
        <li class="mb-1"><strong>Índices:</strong> Estruturas que melhoram a velocidade de recuperação de dados.</li>
        <li class="mb-1"><strong>ORM:</strong> Object-Relational Mapping, técnica para converter dados entre sistemas incompatíveis.</li>
      </ul>
    `,
    'Segurança': `
      <h3 class="text-xl font-bold mb-3">Segurança em Aplicações Web</h3>
      <p class="mb-3">A segurança é um aspecto crítico no desenvolvimento de aplicações web modernas.</p>
      
      <h4 class="text-lg font-bold mb-2">Vulnerabilidades comuns:</h4>
      <ul class="list-disc pl-5 mb-3">
        <li class="mb-1"><strong>Injeção (SQL, NoSQL):</strong> Inserção de código malicioso em consultas.</li>
        <li class="mb-1"><strong>XSS (Cross-Site Scripting):</strong> Injeção de scripts maliciosos em páginas web.</li>
        <li class="mb-1"><strong>CSRF (Cross-Site Request Forgery):</strong> Força usuários autenticados a executar ações indesejadas.</li>
        <li class="mb-1"><strong>Broken Authentication:</strong> Falhas em mecanismos de autenticação e sessão.</li>
        <li class="mb-1"><strong>Exposição de Dados Sensíveis:</strong> Proteção inadequada de informações críticas.</li>
      </ul>
      
      <h4 class="text-lg font-bold mb-2">Melhores práticas:</h4>
      <ul class="list-disc pl-5 mb-3">
        <li class="mb-1"><strong>HTTPS:</strong> Uso de conexões seguras com TLS/SSL.</li>
        <li class="mb-1"><strong>Sanitização de entrada:</strong> Validação e limpeza de todos os dados de entrada.</li>
        <li class="mb-1"><strong>Hashing de senhas:</strong> Armazenamento seguro com algoritmos como bcrypt.</li>
        <li class="mb-1"><strong>CORS:</strong> Configuração adequada de Cross-Origin Resource Sharing.</li>
        <li class="mb-1"><strong>CSP:</strong> Content Security Policy para mitigar XSS.</li>
      </ul>
    `,
    'Autenticação': `
      <h3 class="text-xl font-bold mb-3">Autenticação e Autorização</h3>
      <p class="mb-3">Autenticação verifica quem é o usuário, enquanto autorização determina o que ele pode fazer.</p>
      
      <h4 class="text-lg font-bold mb-2">Métodos de autenticação:</h4>
      <ul class="list-disc pl-5 mb-3">
        <li class="mb-1"><strong>Baseada em sessão:</strong> Armazena estado de sessão no servidor após login.</li>
        <li class="mb-1"><strong>Baseada em token:</strong> Usa tokens (JWT) para autenticação stateless.</li>
        <li class="mb-1"><strong>OAuth:</strong> Protocolo para autorização delegada (login com Google, Facebook).</li>
        <li class="mb-1"><strong>MFA:</strong> Autenticação multi-fator usando combinações de fatores.</li>
      </ul>
      
      <h4 class="text-lg font-bold mb-2">JWT (JSON Web Tokens):</h4>
      <p class="mb-3">Formato compacto e autônomo para transmitir informações com segurança. Consiste em:</p>
      <ul class="list-disc pl-5 mb-3">
        <li class="mb-1"><strong>Header:</strong> Tipo de token e algoritmo de assinatura.</li>
        <li class="mb-1"><strong>Payload:</strong> Claims (afirmações) sobre a entidade e dados adicionais.</li>
        <li class="mb-1"><strong>Signature:</strong> Assinatura para verificar a integridade do token.</li>
      </ul>
    `,
    'Arquitetura': `
      <h3 class="text-xl font-bold mb-3">Arquitetura de Aplicações</h3>
      <p class="mb-3">A arquitetura define como os componentes de software são organizados e interagem entre si.</p>
      
      <h4 class="text-lg font-bold mb-2">Padrões arquiteturais comuns:</h4>
      <ul class="list-disc pl-5 mb-3">
        <li class="mb-1"><strong>MVC:</strong> Model-View-Controller separa dados, interface e lógica de controle.</li>
        <li class="mb-1"><strong>Microserviços:</strong> Divide aplicações em serviços pequenos e independentes.</li>
        <li class="mb-1"><strong>Serverless:</strong> Executa funções em resposta a eventos sem gerenciar infraestrutura.</li>
        <li class="mb-1"><strong>Monolítica:</strong> Todos os componentes em uma única base de código.</li>
        <li class="mb-1"><strong>Event-driven:</strong> Componentes se comunicam através de eventos assíncronos.</li>
      </ul>
      
      <h4 class="text-lg font-bold mb-2">Microsserviços:</h4>
      <p class="mb-3">Arquitetura onde uma aplicação é estruturada como serviços pequenos e independentes. Características:</p>
      <ul class="list-disc pl-5 mb-3">
        <li class="mb-1"><strong>Desacoplamento:</strong> Serviços podem ser desenvolvidos, implantados e escalados independentemente.</li>
        <li class="mb-1"><strong>Resiliência:</strong> Falhas em um serviço não comprometem todo o sistema.</li>
        <li class="mb-1"><strong>Tecnologias diversas:</strong> Cada serviço pode usar a tecnologia mais adequada.</li>
        <li class="mb-1"><strong>Complexidade:</strong> Aumenta a complexidade operacional e de comunicação.</li>
      </ul>
    `,
    'Frontend': `
      <h3 class="text-xl font-bold mb-3">Desenvolvimento Frontend</h3>
      <p class="mb-3">O desenvolvimento frontend envolve a criação da interface de usuário e experiência que os usuários interagem diretamente.</p>
      
      <h4 class="text-lg font-bold mb-2">Tecnologias fundamentais:</h4>
      <ul class="list-disc pl-5 mb-3">
        <li class="mb-1"><strong>HTML:</strong> Estrutura e semântica do conteúdo.</li>
        <li class="mb-1"><strong>CSS:</strong> Estilização e layout visual.</li>
        <li class="mb-1"><strong>JavaScript:</strong> Comportamento e interatividade.</li>
      </ul>
      
      <h4 class="text-lg font-bold mb-2">Frameworks e bibliotecas:</h4>
      <ul class="list-disc pl-5 mb-3">
        <li class="mb-1"><strong>React:</strong> Biblioteca para construção de interfaces baseada em componentes.</li>
        <li class="mb-1"><strong>Vue:</strong> Framework progressivo para construção de UIs.</li>
        <li class="mb-1"><strong>Angular:</strong> Framework completo para desenvolvimento de aplicações.</li>
        <li class="mb-1"><strong>Svelte:</strong> Compilador que gera código otimizado em tempo de compilação.</li>
      </ul>
      
      <h4 class="text-lg font-bold mb-2">Renderização:</h4>
      <ul class="list-disc pl-5 mb-3">
        <li class="mb-1"><strong>CSR (Client-Side Rendering):</strong> Renderização no navegador do cliente.</li>
        <li class="mb-1"><strong>SSR (Server-Side Rendering):</strong> Renderização no servidor antes de enviar ao cliente.</li>
        <li class="mb-1"><strong>SSG (Static Site Generation):</strong> Páginas geradas em tempo de build.</li>
        <li class="mb-1"><strong>ISR (Incremental Static Regeneration):</strong> Combina SSG com regeneração sob demanda.</li>
      </ul>
    `,
    'Containerização': `
      <h3 class="text-xl font-bold mb-3">Containerização</h3>
      <p class="mb-3">Containerização é uma tecnologia de virtualização no nível do sistema operacional que empacota aplicações e suas dependências em unidades padronizadas chamadas contêineres.</p>
      
      <h4 class="text-lg font-bold mb-2">Benefícios:</h4>
      <ul class="list-disc pl-5 mb-3">
        <li class="mb-1"><strong>Consistência:</strong> Garante que a aplicação funcione da mesma forma em qualquer ambiente.</li>
        <li class="mb-1"><strong>Isolamento:</strong> Contêineres são isolados uns dos outros e do sistema host.</li>
        <li class="mb-1"><strong>Eficiência:</strong> Mais leves que VMs, compartilhando o kernel do sistema operacional.</li>
        <li class="mb-1"><strong>Portabilidade:</strong> Executam em qualquer sistema que suporte a tecnologia de contêiner.</li>
      </ul>
      
      <h4 class="text-lg font-bold mb-2">Docker:</h4>
      <p class="mb-3">Plataforma líder para desenvolvimento, envio e execução de aplicações em contêineres:</p>
      <ul class="list-disc pl-5 mb-3">
        <li class="mb-1"><strong>Dockerfile:</strong> Script com instruções para construir uma imagem.</li>
        <li class="mb-1"><strong>Imagem:</strong> Template somente leitura com código, runtime, bibliotecas e dependências.</li>
        <li class="mb-1"><strong>Contêiner:</strong> Instância executável de uma imagem.</li>
        <li class="mb-1"><strong>Docker Compose:</strong> Ferramenta para definir e executar aplicações multi-contêiner.</li>
      </ul>
    `,
    'CI/CD': `
      <h3 class="text-xl font-bold mb-3">CI/CD (Integração Contínua/Entrega Contínua)</h3>
      <p class="mb-3">CI/CD é um conjunto de práticas que automatizam o processo de desenvolvimento, teste e implantação de software.</p>
      
      <h4 class="text-lg font-bold mb-2">Integração Contínua (CI):</h4>
      <ul class="list-disc pl-5 mb-3">
        <li class="mb-1"><strong>Commits frequentes:</strong> Desenvolvedores integram código à base principal regularmente.</li>
        <li class="mb-1"><strong>Builds automatizados:</strong> Cada integração é verificada por build automatizado.</li>
        <li class="mb-1"><strong>Testes automatizados:</strong> Execução de testes para validar mudanças.</li>
        <li class="mb-1"><strong>Feedback rápido:</strong> Detecção precoce de problemas de integração.</li>
      </ul>
      
      <h4 class="text-lg font-bold mb-2">Entrega/Implantação Contínua (CD):</h4>
      <ul class="list-disc pl-5 mb-3">
        <li class="mb-1"><strong>Entrega Contínua:</strong> Automatiza o lançamento para um ambiente de staging.</li>
        <li class="mb-1"><strong>Implantação Contínua:</strong> Automatiza o lançamento para produção.</li>
        <li class="mb-1"><strong>Pipeline:</strong> Sequência de etapas automatizadas desde o commit até a implantação.</li>
        <li class="mb-1"><strong>Rollback:</strong> Capacidade de reverter rapidamente para versões anteriores.</li>
      </ul>
      
      <h4 class="text-lg font-bold mb-2">Ferramentas populares:</h4>
      <ul class="list-disc pl-5 mb-3">
        <li class="mb-1"><strong>Jenkins:</strong> Servidor de automação open-source.</li>
        <li class="mb-1"><strong>GitHub Actions:</strong> CI/CD integrado ao GitHub.</li>
        <li class="mb-1"><strong>GitLab CI:</strong> CI/CD integrado ao GitLab.</li>
        <li class="mb-1"><strong>CircleCI/Travis CI:</strong> Serviços de CI/CD baseados em nuvem.</li>
      </ul>
    `,
    'Orquestração': `
      <h3 class="text-xl font-bold mb-3">Orquestração de Contêineres</h3>
      <p class="mb-3">Orquestração de contêineres automatiza a implantação, gerenciamento, escalabilidade e networking de aplicações em contêineres.</p>
      
      <h4 class="text-lg font-bold mb-2">Kubernetes (K8s):</h4>
      <p class="mb-3">Sistema open-source para automatizar a implantação, escalabilidade e gerenciamento de aplicações em contêineres:</p>
      <ul class="list-disc pl-5 mb-3">
        <li class="mb-1"><strong>Pod:</strong> Menor unidade implantável, grupo de contêineres que compartilham recursos.</li>
        <li class="mb-1"><strong>Deployment:</strong> Gerencia a criação e atualização de réplicas de pods.</li>
        <li class="mb-1"><strong>Service:</strong> Abstração que define um conjunto lógico de pods e política de acesso.</li>
        <li class="mb-1"><strong>Namespace:</strong> Divisão virtual de um cluster Kubernetes.</li>
        <li class="mb-1"><strong>ConfigMap/Secret:</strong> Gerenciamento de configurações e dados sensíveis.</li>
      </ul>
      
      <h4 class="text-lg font-bold mb-2">Recursos do Kubernetes:</h4>
      <ul class="list-disc pl-5 mb-3">
        <li class="mb-1"><strong>Auto-scaling:</strong> Ajusta automaticamente o número de pods baseado na carga.</li>
        <li class="mb-1"><strong>Self-healing:</strong> Reinicia contêineres que falham, substitui e reagenda pods.</li>
        <li class="mb-1"><strong>Service discovery:</strong> Localiza serviços automaticamente via DNS ou variáveis de ambiente.</li>
        <li class="mb-1"><strong>Rolling updates:</strong> Atualiza aplicações sem tempo de inatividade.</li>
        <li class="mb-1"><strong>Load balancing:</strong> Distribui tráfego entre múltiplas instâncias.</li>
      </ul>
    `,
    'Automação': `
      <h3 class="text-xl font-bold mb-3">Automação de Infraestrutura</h3>
      <p class="mb-3">Automação de infraestrutura permite gerenciar e provisionar recursos de TI através de código em vez de processos manuais.</p>
      
      <h4 class="text-lg font-bold mb-2">Infraestrutura como Código (IaC):</h4>
      <p class="mb-3">Prática de gerenciar infraestrutura através de arquivos de configuração:</p>
      <ul class="list-disc pl-5 mb-3">
        <li class="mb-1"><strong>Declarativa:</strong> Especifica o estado desejado (o quê), não os passos (como).</li>
        <li class="mb-1"><strong>Versionável:</strong> Configurações podem ser versionadas como código.</li>
        <li class="mb-1"><strong>Reproduzível:</strong> Ambientes idênticos podem ser criados repetidamente.</li>
        <li class="mb-1"><strong>Testável:</strong> Infraestrutura pode ser testada antes da implantação.</li>
      </ul>
      
      <h4 class="text-lg font-bold mb-2">Ferramentas de IaC:</h4>
      <ul class="list-disc pl-5 mb-3">
        <li class="mb-1"><strong>Terraform:</strong> Ferramenta declarativa para múltiplos provedores de nuvem.</li>
        <li class="mb-1"><strong>AWS CloudFormation:</strong> Serviço de IaC específico para AWS.</li>
        <li class="mb-1"><strong>Azure Resource Manager:</strong> Serviço de IaC para Azure.</li>
        <li class="mb-1"><strong>Pulumi:</strong> IaC usando linguagens de programação convencionais.</li>
      </ul>
      
      <h4 class="text-lg font-bold mb-2">Gerenciamento de configuração:</h4>
      <ul class="list-disc pl-5 mb-3">
        <li class="mb-1"><strong>Ansible:</strong> Ferramenta de automação sem agente baseada em YAML.</li>
        <li class="mb-1"><strong>Chef:</strong> Usa Ruby para escrever "receitas" de configuração.</li>
        <li class="mb-1"><strong>Puppet:</strong> Define estados desejados para configuração de sistemas.</li>
      </ul>
    `,
    'Implantação': `
      <h3 class="text-xl font-bold mb-3">Estratégias de Implantação</h3>
      <p class="mb-3">Estratégias de implantação definem como novas versões de software são lançadas em produção.</p>
      
      <h4 class="text-lg font-bold mb-2">Tipos de implantação:</h4>
      <ul class="list-disc pl-5 mb-3">
        <li class="mb-1"><strong>Big Bang/Recreate:</strong> Substituição completa da versão antiga pela nova.</li>
        <li class="mb-1"><strong>Rolling Update:</strong> Atualização gradual, substituindo instâncias uma por uma.</li>
        <li class="mb-1"><strong>Blue-Green:</strong> Mantém dois ambientes idênticos, alternando o tráfego entre eles.</li>
        <li class="mb-1"><strong>Canary:</strong> Libera nova versão para um subconjunto de usuários antes do lançamento completo.</li>
        <li class="mb-1"><strong>A/B Testing:</strong> Direciona diferentes versões para diferentes grupos de usuários.</li>
      </ul>
      
      <h4 class="text-lg font-bold mb-2">Blue-Green Deployment:</h4>
      <p class="mb-3">Técnica que usa dois ambientes de produção idênticos:</p>
      <ul class="list-disc pl-5 mb-3">
        <li class="mb-1"><strong>Ambiente Blue:</strong> Versão atual em produção.</li>
        <li class="mb-1"><strong>Ambiente Green:</strong> Nova versão para testes.</li>
        <li class="mb-1"><strong>Processo:</strong> Implanta nova versão no ambiente inativo, testa, e redireciona tráfego.</li>
        <li class="mb-1"><strong>Vantagens:</strong> Zero downtime, rollback rápido, testes em ambiente idêntico ao de produção.</li>
      </ul>
    `,
    'Monitoramento': `
      <h3 class="text-xl font-bold mb-3">Monitoramento e Observabilidade</h3>
      <p class="mb-3">Monitoramento coleta e analisa dados para entender o comportamento e desempenho de sistemas.</p>
      
      <h4 class="text-lg font-bold mb-2">Pilares da observabilidade:</h4>
      <ul class="list-disc pl-5 mb-3">
        <li class="mb-1"><strong>Métricas:</strong> Valores numéricos que representam o estado do sistema (CPU, memória, latência).</li>
        <li class="mb-1"><strong>Logs:</strong> Registros de eventos que ocorrem no sistema.</li>
        <li class="mb-1"><strong>Traces:</strong> Rastreamento de requisições através de diferentes serviços.</li>
      </ul>
      
      <h4 class="text-lg font-bold mb-2">Ferramentas populares:</h4>
      <ul class="list-disc pl-5 mb-3">
        <li class="mb-1"><strong>Prometheus:</strong> Sistema de monitoramento e alerta de código aberto.</li>
        <li class="mb-1"><strong>Grafana:</strong> Plataforma para visualização de métricas.</li>
        <li class="mb-1"><strong>ELK Stack:</strong> Elasticsearch, Logstash e Kibana para análise de logs.</li>
        <li class="mb-1"><strong>Jaeger/Zipkin:</strong> Sistemas de rastreamento distribuído.</li>
        <li class="mb-1"><strong>Datadog/New Relic:</strong> Plataformas comerciais de monitoramento.</li>
      </ul>
      
      <h4 class="text-lg font-bold mb-2">Práticas recomendadas:</h4>
      <ul class="list-disc pl-5 mb-3">
        <li class="mb-1"><strong>Monitoramento proativo:</strong> Identificar problemas antes que afetem usuários.</li>
        <li class="mb-1"><strong>Alertas acionáveis:</strong> Configurar alertas que exigem intervenção real.</li>
        <li class="mb-1"><strong>SLIs/SLOs:</strong> Definir indicadores e objetivos de nível de serviço.</li>
        <li class="mb-1"><strong>Dashboards:</strong> Criar visualizações claras do estado do sistema.</li>
      </ul>
    `
  };

  if (!currentQuestion) {
    return (
      <div className="max-w-4xl mx-auto text-center py-12">
        <h2 className="text-2xl font-bold mb-4">Nenhuma questão disponível</h2>
        <p className="mb-6">Não há questões disponíveis para esta trilha ou filtro.</p>
        <button 
          onClick={() => navigate(`/track/${trackId}`)}
          className={`px-6 py-3 text-white rounded-lg transition-colors ${buttonColorClass}`}
        >
          Voltar para Trilha
        </button>
      </div>
    );
  }

  // Determinar o conteúdo teórico para a categoria atual
  const currentTheory = theoreticalContent[currentQuestion.category] || '';

  return (
    <div className="max-w-4xl mx-auto">
      <button 
        onClick={() => navigate(`/track/${trackId}`)}
        className="mb-6 flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
        </svg>
        Voltar para Trilha
      </button>

      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span>Tópico {currentQuestionIndex + 1} de {questions.length}</span>
          <span className={`px-2 py-1 text-xs rounded ${
            currentQuestion.difficulty === 'iniciante' ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' :
            currentQuestion.difficulty === 'intermediário' ? 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200' :
            'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
          }`}>
            {currentQuestion.difficulty}
          </span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div 
            className={`h-2 rounded-full ${progressColorClass}`} 
            style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
          ></div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-6">
        <div className="flex justify-between mb-4">
          <h2 className="text-xl font-bold">{currentQuestion.category}</h2>
          <div className="flex space-x-2">
            <button 
              onClick={() => setShowContent(true)}
              className={`px-3 py-1 rounded text-sm ${showContent 
                ? `${buttonColorClass} text-white` 
                : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'}`}
            >
              Teoria
            </button>
            <button 
              onClick={() => setShowContent(false)}
              className={`px-3 py-1 rounded text-sm ${!showContent 
                ? `${buttonColorClass} text-white` 
                : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'}`}
            >
              Questão
            </button>
          </div>
        </div>

        {showContent ? (
          <div 
            className={`p-4 rounded-lg mb-6 ${bgColorClass} border-l-4 ${borderColorClass}`}
            dangerouslySetInnerHTML={{ __html: currentTheory }}
          />
        ) : (
          <div className="mb-6">
            <h3 className="text-lg font-bold mb-4">{currentQuestion.text}</h3>
            
            {currentQuestion.options ? (
              <div className="space-y-3 mb-6">
                {currentQuestion.options.map((option, index) => (
                  <div 
                    key={index}
                    className="p-4 rounded-lg bg-gray-100 dark:bg-gray-700"
                  >
                    <div className="flex items-start">
                      <span className="flex items-center justify-center w-6 h-6 rounded-full mr-3 bg-gray-300 dark:bg-gray-600">
                        {String.fromCharCode(65 + index)}
                      </span>
                      <span>{option}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : null}
            
            <div className={`p-4 rounded-lg ${bgColorClass} border-l-4 ${borderColorClass}`}>
              <h4 className="font-bold mb-2">Explicação:</h4>
              <p>{currentQuestion.explanation}</p>
            </div>
          </div>
        )}

        <div className="flex justify-between">
          <button 
            onClick={() => {
              if (currentQuestionIndex > 0) {
                setCurrentQuestionIndex(currentQuestionIndex - 1);
                setShowContent(true);
              }
            }}
            className={`px-4 py-2 rounded-lg transition-colors ${
              currentQuestionIndex > 0 
                ? 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600' 
                : 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed'
            }`}
            disabled={currentQuestionIndex === 0}
          >
            Anterior
          </button>
          
          <button 
            onClick={() => {
              if (currentQuestionIndex < questions.length - 1) {
                setCurrentQuestionIndex(currentQuestionIndex + 1);
                setShowContent(true);
              } else {
                navigate(`/track/${trackId}`);
              }
            }}
            className={`px-6 py-2 text-white rounded-lg transition-colors ${buttonColorClass}`}
          >
            {currentQuestionIndex < questions.length - 1 ? 'Próximo' : 'Concluir'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LearnMode;
