import { useParams, useNavigate } from 'react-router-dom';
import { useStudyContext } from '../contexts/StudyContext';
import { useState } from 'react';

const ChallengeMode = () => {
  const { trackId } = useParams<{ trackId: string }>();
  const navigate = useNavigate();
  const { getCurrentQuestions, updateProgress } = useStudyContext();
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userSolution, setUserSolution] = useState('');
  const [showSolution, setShowSolution] = useState(false);
  const [challengeCompleted, setChallengeCompleted] = useState(false);
  const [completedChallenges, setCompletedChallenges] = useState<number[]>([]);
  
  // Filtra apenas desafios práticos ou usa as questões da trilha atual
  const questions = trackId === 'challenges' 
    ? getCurrentQuestions() 
    : getCurrentQuestions().filter(q => !q.options); // Para outras trilhas, mostra apenas desafios sem opções
  
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

  const handleSubmitSolution = () => {
    updateProgress(currentQuestion.id, true); // Sempre marca como correto em modo desafio
    setShowSolution(true);
    setCompletedChallenges([...completedChallenges, currentQuestionIndex]);
  };

  const handleNextChallenge = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setUserSolution('');
      setShowSolution(false);
    } else {
      setChallengeCompleted(true);
    }
  };

  const handleRestartChallenges = () => {
    setCurrentQuestionIndex(0);
    setUserSolution('');
    setShowSolution(false);
    setChallengeCompleted(false);
    setCompletedChallenges([]);
  };

  if (!currentQuestion) {
    return (
      <div className="max-w-4xl mx-auto text-center py-12">
        <h2 className="text-2xl font-bold mb-4">Nenhum desafio disponível</h2>
        <p className="mb-6">Não há desafios disponíveis para esta trilha ou filtro.</p>
        <button 
          onClick={() => navigate(`/track/${trackId}`)}
          className={`px-6 py-3 text-white rounded-lg transition-colors ${buttonColorClass}`}
        >
          Voltar para Trilha
        </button>
      </div>
    );
  }

  if (challengeCompleted) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
          <h2 className="text-3xl font-bold mb-6 text-center">Desafios Concluídos!</h2>
          
          <div className="mb-8 text-center">
            <p className="text-lg mb-2">Você completou {completedChallenges.length} de {questions.length} desafios.</p>
            <p className="text-gray-600 dark:text-gray-400">
              Praticar desafios de código é uma excelente forma de se preparar para entrevistas técnicas.
              Continue praticando para melhorar suas habilidades!
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button 
              onClick={handleRestartChallenges}
              className={`px-6 py-3 text-white rounded-lg transition-colors ${buttonColorClass}`}
            >
              Reiniciar Desafios
            </button>
            <button 
              onClick={() => navigate(`/track/${trackId}`)}
              className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              Voltar para Trilha
            </button>
          </div>
        </div>
      </div>
    );
  }

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
          <span>Desafio {currentQuestionIndex + 1} de {questions.length}</span>
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
        <h2 className="text-xl font-bold mb-4">{currentQuestion.category}</h2>
        <h3 className="text-lg font-bold mb-4">{currentQuestion.text}</h3>
        
        <div className="mb-6">
          <textarea
            value={userSolution}
            onChange={(e) => setUserSolution(e.target.value)}
            placeholder="Digite sua solução aqui..."
            className="w-full h-60 p-4 font-mono border rounded-lg bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent"
          />
          
          {!showSolution && (
            <div className="flex justify-end mt-4">
              <button 
                onClick={handleSubmitSolution}
                className={`px-6 py-3 text-white rounded-lg transition-colors ${buttonColorClass}`}
                disabled={userSolution.trim().length === 0}
              >
                Verificar Solução
              </button>
            </div>
          )}
        </div>
        
        {showSolution && (
          <div className="mb-6">
            <div className={`p-4 rounded-lg mb-6 ${bgColorClass} border-l-4 ${borderColorClass}`}>
              <h4 className="font-bold mb-2">Solução de Referência:</h4>
              <div className="font-mono whitespace-pre-wrap">{currentQuestion.explanation}</div>
            </div>
            
            <button 
              onClick={handleNextChallenge}
              className={`px-6 py-3 text-white rounded-lg transition-colors ${buttonColorClass}`}
            >
              {currentQuestionIndex < questions.length - 1 ? 'Próximo Desafio' : 'Finalizar Desafios'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChallengeMode;
