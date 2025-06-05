import { useParams, useNavigate } from 'react-router-dom';
import { useStudyContext } from '../contexts/StudyContext';

const TrackPage = () => {
  const { trackId } = useParams<{ trackId: string }>();
  const navigate = useNavigate();
  const { setCurrentTrack, setCurrentMode } = useStudyContext();
  
  // Configurar a trilha atual com base no parâmetro da URL
  if (trackId && (trackId === 'react' || trackId === 'fullstack' || trackId === 'devops' || trackId === 'challenges')) {
    setCurrentTrack(trackId);
  }

  const handleModeSelection = (mode: 'learn' | 'quiz' | 'interview' | 'challenge') => {
    setCurrentMode(mode);
    navigate(`/${mode}/${trackId}`);
  };

  // Mapear títulos e descrições com base no trackId
  const trackInfo = {
    react: {
      title: 'Trilha React',
      description: 'Domine os conceitos fundamentais e avançados do React, hooks, gerenciamento de estado e otimização.',
      color: 'blue'
    },
    fullstack: {
      title: 'Trilha Full Stack',
      description: 'Aprenda sobre frontend, backend, bancos de dados, APIs, autenticação e arquitetura de aplicações.',
      color: 'green'
    },
    devops: {
      title: 'Trilha DevOps',
      description: 'Explore CI/CD, containerização, orquestração, infraestrutura como código e monitoramento.',
      color: 'purple'
    },
    challenges: {
      title: 'Desafios Práticos',
      description: 'Teste suas habilidades com desafios de código reais que aparecem frequentemente em entrevistas técnicas.',
      color: 'yellow'
    }
  };

  const currentTrack = trackId && (trackId in trackInfo) 
    ? trackInfo[trackId as keyof typeof trackInfo] 
    : trackInfo.react;

  const colorClasses = {
    blue: 'bg-blue-500 hover:bg-blue-600',
    green: 'bg-green-500 hover:bg-green-600',
    purple: 'bg-purple-500 hover:bg-purple-600',
    yellow: 'bg-yellow-500 hover:bg-yellow-600'
  };

  const buttonColorClass = colorClasses[currentTrack.color as keyof typeof colorClasses];

  return (
    <div className="max-w-4xl mx-auto">
      <button 
        onClick={() => navigate('/')}
        className="mb-6 flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
        </svg>
        Voltar para Início
      </button>

      <section className="mb-12">
        <h1 className="text-4xl font-bold mb-4">{currentTrack.title}</h1>
        <p className="text-xl mb-6">{currentTrack.description}</p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Escolha um Modo de Estudo</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div 
            onClick={() => handleModeSelection('learn')}
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer"
          >
            <h3 className="text-xl font-bold mb-2">Modo Aprendizado</h3>
            <p className="mb-4">Estude o conteúdo teórico e pratique com questões relacionadas para fixar o conhecimento.</p>
            <button className={`px-4 py-2 text-white rounded transition-colors ${buttonColorClass}`}>
              Iniciar Aprendizado
            </button>
          </div>

          <div 
            onClick={() => handleModeSelection('quiz')}
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer"
          >
            <h3 className="text-xl font-bold mb-2">Modo Quiz</h3>
            <p className="mb-4">Teste seus conhecimentos com questões de múltipla escolha e receba feedback imediato.</p>
            <button className={`px-4 py-2 text-white rounded transition-colors ${buttonColorClass}`}>
              Iniciar Quiz
            </button>
          </div>

          <div 
            onClick={() => handleModeSelection('interview')}
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer"
          >
            <h3 className="text-xl font-bold mb-2">Simulação de Entrevista</h3>
            <p className="mb-4">Simule uma entrevista técnica real com timer e avaliação de respostas.</p>
            <button className={`px-4 py-2 text-white rounded transition-colors ${buttonColorClass}`}>
              Iniciar Simulação
            </button>
          </div>

          {trackId !== 'challenges' && (
            <div 
              onClick={() => handleModeSelection('challenge')}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer"
            >
              <h3 className="text-xl font-bold mb-2">Desafios Práticos</h3>
              <p className="mb-4">Resolva problemas de código reais frequentemente solicitados em entrevistas.</p>
              <button className={`px-4 py-2 text-white rounded transition-colors ${buttonColorClass}`}>
                Ver Desafios
              </button>
            </div>
          )}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Filtrar por Nível</h2>
        <div className="flex flex-wrap gap-3">
          <button className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
            Todos os Níveis
          </button>
          <button className="px-4 py-2 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded hover:bg-green-200 dark:hover:bg-green-800 transition-colors">
            Iniciante
          </button>
          <button className="px-4 py-2 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 rounded hover:bg-yellow-200 dark:hover:bg-yellow-800 transition-colors">
            Intermediário
          </button>
          <button className="px-4 py-2 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 rounded hover:bg-red-200 dark:hover:bg-red-800 transition-colors">
            Avançado
          </button>
        </div>
      </section>
    </div>
  );
};

export default TrackPage;
