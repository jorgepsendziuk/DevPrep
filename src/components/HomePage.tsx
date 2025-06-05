import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStudyContext } from '../contexts/StudyContext';

const HomePage = () => {
  const navigate = useNavigate();
  const { setCurrentTrack, userProgress, resetProgress } = useStudyContext();
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const handleTrackSelection = (track: 'react' | 'fullstack' | 'devops' | 'business-analyst' | 'challenges') => {
    setCurrentTrack(track);
    navigate(`/track/${track}`);
  };

  const handleResetProgress = () => {
    resetProgress();
    setShowResetConfirm(false);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <section className="mb-12 text-center">
        <h1 className="text-4xl font-bold mb-4">Guia de Estudos para Entrevista de Emprego</h1>
        <p className="text-xl mb-6">
          Prepare-se para entrevistas técnicas nas áreas de React, Full Stack, DevOps e Business Analysis com nosso guia interativo.
        </p>
        <div className="bg-blue-100 dark:bg-blue-900 p-4 rounded-lg">
          <p className="font-medium">
            Escolha uma trilha de estudo abaixo para começar sua preparação!
          </p>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <div 
          onClick={() => handleTrackSelection('react')}
          className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer border-l-4 border-blue-500"
        >
          <h2 className="text-2xl font-bold mb-2">React</h2>
          <p className="mb-4">Domine os conceitos fundamentais e avançados do React, hooks, gerenciamento de estado e otimização.</p>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500 dark:text-gray-400">8 questões</span>
            <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
              Iniciar
            </button>
          </div>
        </div>

        <div 
          onClick={() => handleTrackSelection('fullstack')}
          className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer border-l-4 border-green-500"
        >
          <h2 className="text-2xl font-bold mb-2">Full Stack</h2>
          <p className="mb-4">Aprenda sobre frontend, backend, bancos de dados, APIs, autenticação e arquitetura de aplicações.</p>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500 dark:text-gray-400">8 questões</span>
            <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors">
              Iniciar
            </button>
          </div>
        </div>

        <div 
          onClick={() => handleTrackSelection('devops')}
          className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer border-l-4 border-purple-500"
        >
          <h2 className="text-2xl font-bold mb-2">DevOps</h2>
          <p className="mb-4">Explore CI/CD, containerização, orquestração, infraestrutura como código e monitoramento.</p>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500 dark:text-gray-400">8 questões</span>
            <button className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition-colors">
              Iniciar
            </button>
          </div>
        </div>

        <div 
          onClick={() => handleTrackSelection('business-analyst')}
          className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer border-l-4 border-orange-500"
        >
          <h2 className="text-2xl font-bold mb-2">Business Analyst</h2>
          <p className="mb-4">Prepare-se para vagas de Tech Business Analyst: análise de requisitos, documentação, stakeholder management e transformation programs.</p>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500 dark:text-gray-400">12 questões</span>
            <button className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition-colors">
              Iniciar
            </button>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Desafios Práticos</h2>
        <div 
          onClick={() => handleTrackSelection('challenges')}
          className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer border-l-4 border-yellow-500"
        >
          <p className="mb-4">Teste suas habilidades com desafios de código reais que aparecem frequentemente em entrevistas técnicas.</p>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500 dark:text-gray-400">4 desafios</span>
            <button className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition-colors">
              Ver Desafios
            </button>
          </div>
        </div>
      </section>

      {userProgress.completedQuestions.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Seu Progresso</h2>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <h3 className="text-lg font-medium mb-1">Questões Respondidas</h3>
                <p className="text-3xl font-bold">{userProgress.completedQuestions.length}</p>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-1">Pontuação</h3>
                <p className="text-3xl font-bold">{userProgress.score}</p>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-1">Acertos</h3>
                <p className="text-3xl font-bold text-green-500">{userProgress.correctAnswers.length}</p>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-1">Erros</h3>
                <p className="text-3xl font-bold text-red-500">{userProgress.wrongAnswers.length}</p>
              </div>
            </div>
            <button 
              onClick={() => setShowResetConfirm(true)}
              className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              Reiniciar Progresso
            </button>
          </div>
        </section>
      )}

      {showResetConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Confirmar Reinício</h3>
            <p className="mb-6">Tem certeza que deseja reiniciar todo o seu progresso? Esta ação não pode ser desfeita.</p>
            <div className="flex justify-end space-x-4">
              <button 
                onClick={() => setShowResetConfirm(false)}
                className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              >
                Cancelar
              </button>
              <button 
                onClick={handleResetProgress}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
              >
                Reiniciar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
