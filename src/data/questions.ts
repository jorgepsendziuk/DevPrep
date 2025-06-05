// Banco de questões para o guia de estudos
// Organizado por trilha (React, Full Stack, DevOps) e nível de dificuldade

export interface Question {
  id: string;
  text: string;
  options?: string[];
  correctAnswer?: number | string;
  explanation: string;
  difficulty: 'iniciante' | 'intermediário' | 'avançado';
  category: string;
}

// Questões de React
export const reactQuestions: Question[] = [
  {
    id: 'react-1',
    text: 'O que é JSX no React?',
    options: [
      'Uma linguagem de programação criada pelo Facebook',
      'Uma extensão de sintaxe para JavaScript que parece com HTML',
      'Um framework JavaScript para criar aplicações móveis',
      'Um novo formato de arquivo para armazenar componentes React'
    ],
    correctAnswer: 1,
    explanation: 'JSX é uma extensão de sintaxe para JavaScript recomendada pelo React que parece com HTML. Permite escrever estruturas HTML em JavaScript e colocá-las no DOM sem usar métodos como createElement() ou appendChild().',
    difficulty: 'iniciante',
    category: 'Fundamentos'
  },
  {
    id: 'react-2',
    text: 'Qual é a diferença entre props e state no React?',
    options: [
      'Não há diferença, são a mesma coisa',
      'Props são usados para comunicação entre componentes, state é para gerenciar dados internos do componente',
      'Props são mutáveis, state é imutável',
      'Props são para componentes funcionais, state é apenas para componentes de classe'
    ],
    correctAnswer: 1,
    explanation: 'Props (abreviação de properties) são usados para passar dados de um componente pai para um componente filho e são imutáveis. State é usado para gerenciar dados internos de um componente que podem mudar ao longo do tempo e são mutáveis através de setState() ou hooks como useState().',
    difficulty: 'iniciante',
    category: 'Fundamentos'
  },
  {
    id: 'react-3',
    text: 'O que é o Virtual DOM no React?',
    options: [
      'Uma versão do DOM que existe apenas na memória',
      'Uma versão mais rápida do DOM real',
      'Um DOM que funciona apenas em navegadores modernos',
      'Uma biblioteca para manipulação direta do DOM'
    ],
    correctAnswer: 0,
    explanation: 'O Virtual DOM é uma representação leve do DOM real mantida em memória. Quando o estado de um componente muda, o React cria um novo Virtual DOM e o compara com o anterior. Apenas as diferenças encontradas são aplicadas ao DOM real, o que melhora significativamente o desempenho.',
    difficulty: 'iniciante',
    category: 'Fundamentos'
  },
  {
    id: 'react-4',
    text: 'Para que serve o hook useEffect?',
    options: [
      'Para criar efeitos visuais na interface',
      'Para executar código em resposta a determinadas mudanças, como chamadas API ou manipulação do DOM',
      'Para melhorar o desempenho de renderização',
      'Para substituir completamente o Redux'
    ],
    correctAnswer: 1,
    explanation: 'O hook useEffect permite executar efeitos colaterais em componentes funcionais. É usado para operações como busca de dados, assinaturas ou manipulação manual do DOM. Ele é executado após a renderização e pode ser configurado para executar apenas quando determinadas dependências mudarem.',
    difficulty: 'intermediário',
    category: 'Hooks'
  },
  {
    id: 'react-5',
    text: 'O que é o Context API no React?',
    options: [
      'Uma API para conectar React com bancos de dados',
      'Uma forma de passar dados através da árvore de componentes sem passar props manualmente em cada nível',
      'Uma API para criar animações em componentes React',
      'Uma ferramenta para testar componentes React'
    ],
    correctAnswer: 1,
    explanation: 'O Context API é uma forma de compartilhar dados entre componentes sem precisar passar props explicitamente através de cada nível da árvore de componentes. É útil para compartilhar dados considerados "globais" para uma árvore de componentes, como o tema atual, preferências do usuário ou estado de autenticação.',
    difficulty: 'intermediário',
    category: 'Gerenciamento de Estado'
  },
  {
    id: 'react-6',
    text: 'O que é code splitting no React e por que é importante?',
    options: [
      'Dividir o código em arquivos menores para melhor organização',
      'Uma técnica para dividir o código em chunks menores que podem ser carregados sob demanda',
      'Separar o código front-end do back-end',
      'Dividir o código entre diferentes desenvolvedores para trabalho em equipe'
    ],
    correctAnswer: 1,
    explanation: 'Code splitting é uma técnica que permite dividir o bundle do JavaScript em múltiplos chunks que são carregados sob demanda, melhorando o desempenho inicial da aplicação. No React, isso pode ser implementado usando import() dinâmico ou React.lazy() com Suspense.',
    difficulty: 'avançado',
    category: 'Performance'
  },
  {
    id: 'react-7',
    text: 'O que é e para que serve o React.memo?',
    options: [
      'Uma função para memorizar valores calculados',
      'Um componente de ordem superior (HOC) que memoriza o resultado da renderização de um componente',
      'Uma alternativa ao localStorage para armazenar dados',
      'Um método para criar animações em React'
    ],
    correctAnswer: 1,
    explanation: 'React.memo é um componente de ordem superior (HOC) que memoriza o resultado da renderização de um componente. Se as props não mudarem entre renderizações, React reutiliza o resultado renderizado anteriormente, evitando renderizações desnecessárias e melhorando o desempenho.',
    difficulty: 'avançado',
    category: 'Performance'
  },
  {
    id: 'react-8',
    text: 'Qual é a diferença entre o useState e o useReducer?',
    options: [
      'useState é para estados simples, useReducer para lógica de estado mais complexa',
      'useState é apenas para strings e números, useReducer para objetos e arrays',
      'useState é síncrono, useReducer é assíncrono',
      'Não há diferença, são apenas sintaxes alternativas'
    ],
    correctAnswer: 0,
    explanation: 'useState é ideal para gerenciar estados independentes e simples. useReducer é preferível quando o próximo estado depende do anterior, quando a lógica de atualização é complexa ou quando há múltiplos sub-valores no estado. useReducer também facilita a passagem da função de atualização para componentes profundamente aninhados.',
    difficulty: 'intermediário',
    category: 'Hooks'
  }
];

// Questões de Full Stack
export const fullStackQuestions: Question[] = [
  {
    id: 'fullstack-1',
    text: 'O que é uma API RESTful?',
    options: [
      'Um tipo de banco de dados',
      'Uma arquitetura de API que usa os métodos HTTP e segue princípios específicos',
      'Uma linguagem de programação para desenvolvimento web',
      'Um framework JavaScript para desenvolvimento front-end'
    ],
    correctAnswer: 1,
    explanation: 'Uma API RESTful é uma interface que segue os princípios de arquitetura REST (Representational State Transfer). Utiliza métodos HTTP padrão (GET, POST, PUT, DELETE), tem URLs estruturadas para recursos, é stateless (sem estado), e geralmente retorna dados em formatos como JSON ou XML.',
    difficulty: 'iniciante',
    category: 'Backend'
  },
  {
    id: 'fullstack-2',
    text: 'Qual é a diferença entre bancos de dados SQL e NoSQL?',
    options: [
      'SQL é mais rápido, NoSQL é mais seguro',
      'SQL usa tabelas relacionais com esquema fixo, NoSQL usa estruturas flexíveis como documentos, grafos ou pares chave-valor',
      'SQL é open-source, NoSQL é proprietário',
      'SQL é para aplicações web, NoSQL é para aplicações móveis'
    ],
    correctAnswer: 1,
    explanation: 'Bancos de dados SQL (relacionais) armazenam dados em tabelas com esquema predefinido e usam SQL para consultas. Bancos NoSQL são não relacionais, têm esquemas flexíveis e podem armazenar dados em formatos como documentos (MongoDB), colunas (Cassandra), grafos (Neo4j) ou pares chave-valor (Redis). SQL é melhor para dados estruturados e relações complexas, NoSQL para escalabilidade horizontal e esquemas em evolução.',
    difficulty: 'iniciante',
    category: 'Bancos de Dados'
  },
  {
    id: 'fullstack-3',
    text: 'O que é CORS e por que é importante?',
    options: [
      'Um framework CSS para design responsivo',
      'Um mecanismo de segurança que permite ou restringe requisições de recursos de outra origem',
      'Um protocolo de transferência de arquivos',
      'Uma linguagem de programação para desenvolvimento mobile'
    ],
    correctAnswer: 1,
    explanation: 'CORS (Cross-Origin Resource Sharing) é um mecanismo de segurança implementado pelos navegadores que permite ou restringe requisições de recursos de uma origem diferente da origem do site atual. É importante para proteger os usuários contra ataques maliciosos, mas também precisa ser configurado corretamente para permitir comunicações legítimas entre diferentes domínios.',
    difficulty: 'intermediário',
    category: 'Segurança'
  },
  {
    id: 'fullstack-4',
    text: 'O que é JWT (JSON Web Token) e para que é usado?',
    options: [
      'Um formato de arquivo para armazenar configurações de projetos JavaScript',
      'Um token de segurança usado para autenticação e troca segura de informações',
      'Uma biblioteca JavaScript para manipulação de JSON',
      'Um protocolo de comunicação entre servidores'
    ],
    correctAnswer: 1,
    explanation: 'JWT (JSON Web Token) é um padrão aberto (RFC 7519) que define uma forma compacta e autônoma para transmitir informações com segurança entre partes como um objeto JSON. É frequentemente usado para autenticação e autorização em aplicações web, permitindo que servidores verifiquem a identidade de usuários sem manter estado de sessão.',
    difficulty: 'intermediário',
    category: 'Autenticação'
  },
  {
    id: 'fullstack-5',
    text: 'O que é uma arquitetura de microsserviços?',
    options: [
      'Uma arquitetura onde todo o código é minimizado para ocupar menos espaço',
      'Uma abordagem de desenvolvimento onde uma aplicação é estruturada como uma coleção de serviços pequenos e independentes',
      'Um padrão de design para criar interfaces de usuário minimalistas',
      'Uma técnica para otimizar o tamanho de imagens e arquivos em aplicações web'
    ],
    correctAnswer: 1,
    explanation: 'A arquitetura de microsserviços é uma abordagem de desenvolvimento de software onde uma aplicação é estruturada como uma coleção de serviços pequenos, independentes e com baixo acoplamento. Cada serviço é responsável por uma funcionalidade específica e se comunica com outros serviços através de APIs bem definidas. Isso permite desenvolvimento, implantação e escalabilidade independentes.',
    difficulty: 'avançado',
    category: 'Arquitetura'
  },
  {
    id: 'fullstack-6',
    text: 'O que é Server-Side Rendering (SSR) e quais são suas vantagens?',
    options: [
      'Renderizar imagens no servidor para economizar largura de banda',
      'Renderizar páginas HTML no servidor antes de enviá-las ao cliente',
      'Um método para otimizar consultas SQL no servidor',
      'Uma técnica para armazenar dados do usuário no servidor'
    ],
    correctAnswer: 1,
    explanation: 'Server-Side Rendering (SSR) é uma técnica onde o HTML é gerado no servidor e enviado ao cliente já pronto para exibição. As principais vantagens incluem melhor SEO (pois os crawlers recebem conteúdo completo), melhor performance inicial (First Contentful Paint mais rápido) e melhor experiência em dispositivos com baixo poder de processamento ou conexões lentas.',
    difficulty: 'avançado',
    category: 'Frontend'
  },
  {
    id: 'fullstack-7',
    text: 'O que é uma injeção de SQL e como preveni-la?',
    options: [
      'Uma técnica para otimizar consultas SQL',
      'Um ataque onde código SQL malicioso é inserido em campos de entrada para manipular o banco de dados',
      'Um método para inserir dados em massa em bancos SQL',
      'Uma ferramenta para migração de dados entre diferentes bancos SQL'
    ],
    correctAnswer: 1,
    explanation: 'Injeção de SQL é um tipo de ataque onde um invasor insere código SQL malicioso em campos de entrada que são usados em consultas SQL. Para prevenir: use consultas parametrizadas/prepared statements, ORM (Object-Relational Mapping), validação de entrada, escape de caracteres especiais, e aplique o princípio do privilégio mínimo nas permissões do banco de dados.',
    difficulty: 'intermediário',
    category: 'Segurança'
  },
  {
    id: 'fullstack-8',
    text: 'O que é GraphQL e qual sua principal diferença em relação a REST?',
    options: [
      'GraphQL é um banco de dados gráfico, REST é uma API',
      'GraphQL permite que o cliente especifique exatamente quais dados quer receber, enquanto REST retorna estruturas de dados fixas',
      'GraphQL é mais seguro que REST',
      'GraphQL é síncrono, REST é assíncrono'
    ],
    correctAnswer: 1,
    explanation: 'GraphQL é uma linguagem de consulta e um runtime para APIs. Sua principal diferença em relação ao REST é que permite que o cliente especifique exatamente quais dados quer receber em uma única requisição, evitando o problema de over-fetching (receber mais dados do que o necessário) ou under-fetching (precisar fazer múltiplas requisições para obter todos os dados necessários) comum em APIs REST.',
    difficulty: 'avançado',
    category: 'Backend'
  }
];

// Questões de DevOps
export const devOpsQuestions: Question[] = [
  {
    id: 'devops-1',
    text: 'O que é Docker e qual problema ele resolve?',
    options: [
      'Uma linguagem de programação para automação de infraestrutura',
      'Uma plataforma que permite criar, executar e gerenciar contêineres, garantindo consistência entre ambientes',
      'Um serviço de hospedagem na nuvem',
      'Um sistema operacional para servidores'
    ],
    correctAnswer: 1,
    explanation: 'Docker é uma plataforma que permite desenvolvedores criar, executar e gerenciar aplicações em contêineres. Os contêineres empacotam o código e todas as suas dependências, garantindo que a aplicação funcione de maneira consistente em qualquer ambiente. Isso resolve o problema "funciona na minha máquina", facilitando o desenvolvimento, implantação e escalabilidade de aplicações.',
    difficulty: 'iniciante',
    category: 'Containerização'
  },
  {
    id: 'devops-2',
    text: 'O que é CI/CD?',
    options: [
      'Computer Interface/Computer Design - um padrão de design de interfaces',
      'Continuous Integration/Continuous Deployment - práticas de automação no desenvolvimento de software',
      'Critical Infrastructure/Critical Data - classificação de segurança para sistemas importantes',
      'Customer Interaction/Customer Development - estratégias de relacionamento com clientes'
    ],
    correctAnswer: 1,
    explanation: 'CI/CD significa Continuous Integration (Integração Contínua) e Continuous Deployment/Delivery (Implantação/Entrega Contínua). São práticas de desenvolvimento de software onde as alterações de código são automaticamente testadas e preparadas para lançamento em produção. CI garante que as mudanças sejam regularmente integradas e testadas, enquanto CD automatiza a entrega dessas mudanças para ambientes de produção ou pré-produção.',
    difficulty: 'iniciante',
    category: 'CI/CD'
  },
  {
    id: 'devops-3',
    text: 'O que é Kubernetes e para que serve?',
    options: [
      'Um sistema operacional para servidores em nuvem',
      'Uma plataforma de orquestração de contêineres que automatiza a implantação, escalabilidade e gerenciamento de aplicações',
      'Uma linguagem de programação para automação de infraestrutura',
      'Um serviço de hospedagem de código-fonte'
    ],
    correctAnswer: 1,
    explanation: 'Kubernetes (K8s) é uma plataforma open-source de orquestração de contêineres que automatiza a implantação, escalabilidade e gerenciamento de aplicações em contêineres. Ele agrupa contêineres em unidades lógicas para facilitar o gerenciamento e descoberta, permite escalar horizontalmente, gerenciar balanceamento de carga, fazer rollouts e rollbacks automatizados, e se recuperar automaticamente de falhas.',
    difficulty: 'intermediário',
    category: 'Orquestração'
  },
  {
    id: 'devops-4',
    text: 'O que é Infraestrutura como Código (IaC)?',
    options: [
      'Escrever código diretamente nos servidores de produção',
      'Gerenciar e provisionar infraestrutura através de arquivos de configuração em vez de configuração manual',
      'Usar código para monitorar infraestrutura existente',
      'Programar diretamente em linguagem de máquina'
    ],
    correctAnswer: 1,
    explanation: 'Infraestrutura como Código (IaC) é a prática de gerenciar e provisionar infraestrutura de computação através de arquivos de configuração legíveis por máquina, em vez de configuração física ou ferramentas interativas. Isso permite que a infraestrutura seja versionada, testada e implantada de forma consistente e repetível, reduzindo erros humanos e aumentando a eficiência.',
    difficulty: 'intermediário',
    category: 'Automação'
  },
  {
    id: 'devops-5',
    text: 'O que é um Blue-Green Deployment?',
    options: [
      'Um tipo de implantação que usa dois ambientes de produção idênticos, alternando entre eles',
      'Uma estratégia de design visual para interfaces de usuário',
      'Um método de codificação que separa código estável (azul) de código experimental (verde)',
      'Um tipo de certificação para práticas sustentáveis em DevOps'
    ],
    correctAnswer: 0,
    explanation: 'Blue-Green Deployment é uma técnica de implantação que usa dois ambientes de produção idênticos, chamados Blue (azul) e Green (verde). A qualquer momento, apenas um dos ambientes está ativo e atendendo tráfego de produção. Novas versões são implantadas no ambiente inativo, testadas, e então o tráfego é redirecionado para ele. Isso reduz o tempo de inatividade e facilita rollbacks rápidos em caso de problemas.',
    difficulty: 'avançado',
    category: 'Implantação'
  },
  {
    id: 'devops-6',
    text: 'O que é observabilidade em sistemas distribuídos?',
    options: [
      'A capacidade de monitorar visualmente servidores em um data center',
      'A capacidade de inferir o estado interno de um sistema a partir de seus outputs externos',
      'Um método para documentar sistemas complexos',
      'Uma técnica para tornar o código mais legível'
    ],
    correctAnswer: 1,
    explanation: 'Observabilidade em sistemas distribuídos é a capacidade de inferir o estado interno de um sistema a partir de seus outputs externos. Vai além do simples monitoramento, permitindo fazer perguntas sobre o comportamento do sistema que não foram antecipadas durante o design. Baseia-se em três pilares: métricas (dados numéricos sobre o sistema), logs (registros de eventos) e traces (rastreamento de requisições através de diferentes serviços).',
    difficulty: 'avançado',
    category: 'Monitoramento'
  },
  {
    id: 'devops-7',
    text: 'O que é um contêiner e como ele difere de uma máquina virtual?',
    options: [
      'Contêineres e máquinas virtuais são a mesma coisa, apenas terminologias diferentes',
      'Contêineres virtualizam o sistema operacional, enquanto máquinas virtuais virtualizam o hardware',
      'Contêineres são mais seguros que máquinas virtuais',
      'Contêineres só funcionam em Linux, máquinas virtuais funcionam em qualquer sistema'
    ],
    correctAnswer: 1,
    explanation: 'Contêineres virtualizam o sistema operacional, compartilhando o kernel do host e isolando os processos da aplicação. Máquinas virtuais virtualizam o hardware, executando um sistema operacional completo sobre um hypervisor. Contêineres são mais leves, iniciam mais rápido e usam menos recursos, mas oferecem isolamento menor. VMs são mais isoladas e seguras, mas consomem mais recursos e têm inicialização mais lenta.',
    difficulty: 'intermediário',
    category: 'Containerização'
  },
  {
    id: 'devops-8',
    text: 'O que é GitOps e quais são seus princípios?',
    options: [
      'Uma extensão do Git para operações em bancos de dados',
      'Um modelo operacional para Kubernetes e outras plataformas cloud-native que usa Git como fonte única de verdade para infraestrutura declarativa',
      'Um conjunto de ferramentas Git para operações de segurança',
      'Uma metodologia para gerenciar operações de vendas usando Git'
    ],
    correctAnswer: 1,
    explanation: 'GitOps é um modelo operacional para Kubernetes e outras plataformas cloud-native que usa Git como fonte única de verdade para infraestrutura declarativa. Seus princípios incluem: 1) O sistema inteiro é descrito declarativamente; 2) O estado desejado é versionado em Git; 3) Mudanças aprovadas podem ser automaticamente aplicadas ao sistema; 4) Agentes garantem que o estado real do sistema corresponda ao estado desejado. Isso melhora a colaboração, auditabilidade e recuperação de desastres.',
    difficulty: 'avançado',
    category: 'Automação'
  }
];

// Questões de desafio prático
export const practicalChallenges: Question[] = [
  {
    id: 'challenge-1',
    text: 'Crie uma função em JavaScript que receba um array de números e retorne a soma de todos os números pares.',
    explanation: `Uma solução possível seria:
\`\`\`javascript
function somaNumerosPares(array) {
  return array
    .filter(num => num % 2 === 0)
    .reduce((soma, num) => soma + num, 0);
}
\`\`\`

Esta função usa filter() para selecionar apenas os números pares e depois reduce() para somar todos eles.`,
    difficulty: 'iniciante',
    category: 'JavaScript'
  },
  {
    id: 'challenge-2',
    text: 'Implemente um componente React que exiba uma lista de itens e permita filtrar essa lista através de um campo de busca.',
    explanation: `Uma implementação básica seria:
\`\`\`jsx
import React, { useState } from 'react';

function ListaFiltravel({ items }) {
  const [filtro, setFiltro] = useState('');
  
  const itensFiltrados = items.filter(item => 
    item.toLowerCase().includes(filtro.toLowerCase())
  );
  
  return (
    <div>
      <input
        type="text"
        placeholder="Filtrar itens..."
        value={filtro}
        onChange={(e) => setFiltro(e.target.value)}
      />
      <ul>
        {itensFiltrados.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
\`\`\`

Este componente mantém o estado do filtro e atualiza a lista exibida conforme o usuário digita no campo de busca.`,
    difficulty: 'intermediário',
    category: 'React'
  },
  {
    id: 'challenge-3',
    text: 'Escreva um Dockerfile para uma aplicação Node.js que use Express.',
    explanation: `Um exemplo de Dockerfile seria:
\`\`\`dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["node", "app.js"]
\`\`\`

Este Dockerfile:
1. Usa a imagem oficial do Node.js com Alpine Linux (mais leve)
2. Define o diretório de trabalho como /app
3. Copia os arquivos package.json e package-lock.json
4. Instala as dependências
5. Copia o restante dos arquivos da aplicação
6. Expõe a porta 3000
7. Define o comando para iniciar a aplicação`,
    difficulty: 'intermediário',
    category: 'DevOps'
  },
  {
    id: 'challenge-4',
    text: 'Implemente uma função que realize uma chamada API assíncrona e trate possíveis erros.',
    explanation: `Uma implementação usando async/await seria:
\`\`\`javascript
async function fetchData(url) {
  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(\`Erro HTTP: \${response.status}\`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erro ao buscar dados:', error);
    throw error; // Re-lança o erro para tratamento adicional
  }
}

// Uso:
// fetchData('https://api.exemplo.com/dados')
//   .then(data => console.log(data))
//   .catch(error => console.error('Falha na operação:', error));
\`\`\`

Esta função usa try/catch para capturar erros de rede ou de parsing JSON, e também verifica se a resposta HTTP foi bem-sucedida.`,
    difficulty: 'intermediário',
    category: 'JavaScript'
  }
];

// Todas as questões combinadas
export const allQuestions = [
  ...reactQuestions,
  ...fullStackQuestions,
  ...devOpsQuestions,
  ...practicalChallenges
];

// Função para obter questões por trilha
export const getQuestionsByTrack = (track: string) => {
  switch (track) {
    case 'react':
      return reactQuestions;
    case 'fullstack':
      return fullStackQuestions;
    case 'devops':
      return devOpsQuestions;
    case 'challenges':
      return practicalChallenges;
    default:
      return allQuestions;
  }
};

// Função para obter questões por dificuldade
export const getQuestionsByDifficulty = (difficulty: string) => {
  return allQuestions.filter(q => q.difficulty === difficulty);
};

// Função para obter questões por categoria
export const getQuestionsByCategory = (category: string) => {
  return allQuestions.filter(q => q.category === category);
};
