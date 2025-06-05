import { useParams, useNavigate } from 'react-router-dom';
import { useStudyContext } from '../contexts/StudyContext';
import { useState, useEffect } from 'react';

const InterviewMode = () => {
  const { trackId } = useParams<{ trackId: string }>();
  const navigate = useNavigate();
  const { getCurrentQuestions, updateProgress } = useStudyContext();
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(120); // 2 minutos por questão
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [userAnswer, setUserAnswer] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [interviewCompleted, setInterviewCompleted] = useState(false);
  const [answeredQuestions, setAnsweredQuestions] = useState<number[]>([]);
  
  const questions = getCurrentQuestions();
  const currentQuestion = questions[currentQuestionIndex];

  // Efeito para o timer
  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (isTimerRunning && timeRemaining > 0) {
      timer = setInterval(() => {
        setTimeRemaining(prev => prev - 1);
      }, 1000);
    } else if (timeRemaining === 0 && isTimerRunning) {
      setIsTimerRunning(false);
      setShowFeedback(true);
    }
    
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isTimerRunning, timeRemaining]);

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

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleStartTimer = () => {
    setIsTimerRunning(true);
  };

  const handleSubmitAnswer = () => {
    setIsTimerRunning(false);
    setShowFeedback(true);
    updateProgress(currentQuestion.id, true); // Sempre marca como correto em modo entrevista
    setAnsweredQuestions([...answeredQuestions, currentQuestionIndex]);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setTimeRemaining(120);
      setUserAnswer('');
      setShowFeedback(false);
      setIsTimerRunning(false);
    } else {
      setInterviewCompleted(true);
    }
  };

  const handleRestartInterview = () => {
    setCurrentQuestionIndex(0);
    setTimeRemaining(120);
    setUserAnswer('');
    setShowFeedback(false);
    setIsTimerRunning(false);
    setInterviewCompleted(false);
    setAnsweredQuestions([]);
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

  if (interviewCompleted) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
          <h2 className="text-3xl font-bold mb-6 text-center">Simulação de Entrevista Concluída!</h2>
          
          <div className="mb-8 text-center">
            <p className="text-lg mb-2">Você respondeu {answeredQuestions.length} de {questions.length} questões.</p>
            <p className="text-gray-600 dark:text-gray-400">
              Em uma entrevista real, suas respostas seriam avaliadas com base na clareza, profundidade técnica e capacidade de comunicação.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button 
              onClick={handleRestartInterview}
              className={`px-6 py-3 text-white rounded-lg transition-colors ${buttonColorClass}`}
            >
              Reiniciar Simulação
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
          <span>Questão {currentQuestionIndex + 1} de {questions.length}</span>
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
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">{currentQuestion.category}</h2>
          <div className={`px-4 py-2 rounded-lg ${
            isTimerRunning && timeRemaining < 30 ? 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200' :
            isTimerRunning ? 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200' :
            'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
          }`}>
            {formatTime(timeRemaining)}
          </div>
        </div>

        <h3 className="text-lg font-bold mb-4">{currentQuestion.text}</h3>
        
        {!isTimerRunning && !showFeedback ? (
          <div className="mb-6 text-center">
            <p className="mb-4 text-gray-600 dark:text-gray-400">
              Esta é uma simulação de entrevista técnica. Você terá 2 minutos para responder cada pergunta.
              Tente responder como se estivesse em uma entrevista real.
            </p>
            <button 
              onClick={handleStartTimer}
              className={`px-6 py-3 text-white rounded-lg transition-colors ${buttonColorClass}`}
            >
              Iniciar Cronômetro
            </button>
          </div>
        ) : !showFeedback ? (
          <div className="mb-6">
            <textarea
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              placeholder="Digite sua resposta aqui..."
              className="w-full h-40 p-4 border rounded-lg bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent"
            />
            <div className="flex justify-end mt-4">
              <button 
                onClick={handleSubmitAnswer}
                className={`px-6 py-3 text-white rounded-lg transition-colors ${buttonColorClass}`}
                disabled={userAnswer.trim().length === 0}
              >
                Enviar Resposta
              </button>
            </div>
          </div>
        ) : (
          <div className="mb-6">
            <div className="mb-4">
              <h4 className="font-bold mb-2">Sua resposta:</h4>
              <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                {userAnswer || <em className="text-gray-500">Nenhuma resposta fornecida</em>}
              </div>
            </div>
            
            <div className={`p-4 rounded-lg mb-6 ${bgColorClass} border-l-4 ${borderColorClass}`}>
              <h4 className="font-bold mb-2">Pontos-chave para uma boa resposta:</h4>
              <p>{currentQuestion.explanation}</p>
            </div>
            
            <button 
              onClick={handleNextQuestion}
              className={`px-6 py-3 text-white rounded-lg transition-colors ${buttonColorClass}`}
            >
              {currentQuestionIndex < questions.length - 1 ? 'Próxima Questão' : 'Finalizar Simulação'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default InterviewMode;
