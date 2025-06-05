import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useStudyContext } from '../contexts/StudyContext';

const QuizMode = () => {
  const { trackId } = useParams<{ trackId: string }>();
  const navigate = useNavigate();
  const { getCurrentQuestions, updateProgress } = useStudyContext();
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  
  const questions = getCurrentQuestions().filter(q => q.options); // Filtra apenas questões com opções
  const currentQuestion = questions[currentQuestionIndex];
  
  const handleOptionSelect = (optionIndex: number) => {
    if (selectedOption !== null || showExplanation) return; // Impede múltiplas seleções
    setSelectedOption(optionIndex);
  };
  
  const handleNextQuestion = () => {
    const isCorrect = selectedOption === currentQuestion.correctAnswer;
    updateProgress(currentQuestion.id, isCorrect);
    
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
      setShowExplanation(false);
    } else {
      setQuizCompleted(true);
    }
  };
  
  const handleShowExplanation = () => {
    setShowExplanation(true);
    
    // Atualiza contadores de acertos/erros
    if (selectedOption === currentQuestion.correctAnswer) {
      setCorrectAnswers(correctAnswers + 1);
    } else {
      setWrongAnswers(wrongAnswers + 1);
    }
  };
  
  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setShowExplanation(false);
    setCorrectAnswers(0);
    setWrongAnswers(0);
    setQuizCompleted(false);
  };

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
      border: 'border-blue-500'
    },
    green: {
      button: 'bg-green-500 hover:bg-green-600',
      progress: 'bg-green-500',
      border: 'border-green-500'
    },
    purple: {
      button: 'bg-purple-500 hover:bg-purple-600',
      progress: 'bg-purple-500',
      border: 'border-purple-500'
    },
    yellow: {
      button: 'bg-yellow-500 hover:bg-yellow-600',
      progress: 'bg-yellow-500',
      border: 'border-yellow-500'
    }
  };
  
  const buttonColorClass = colorClasses[currentColor as keyof typeof colorClasses].button;
  const progressColorClass = colorClasses[currentColor as keyof typeof colorClasses].progress;
  const borderColorClass = colorClasses[currentColor as keyof typeof colorClasses].border;

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

  if (quizCompleted) {
    const totalQuestions = questions.length;
    const percentCorrect = Math.round((correctAnswers / totalQuestions) * 100);
    
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
          <h2 className="text-3xl font-bold mb-6 text-center">Quiz Concluído!</h2>
          
          <div className="mb-8">
            <div className="flex justify-between mb-2">
              <span>Seu desempenho:</span>
              <span className="font-bold">{percentCorrect}%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4">
              <div 
                className={`h-4 rounded-full ${progressColorClass}`} 
                style={{ width: `${percentCorrect}%` }}
              ></div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-6 mb-8">
            <div className="bg-green-100 dark:bg-green-900 p-4 rounded-lg text-center">
              <span className="block text-3xl font-bold text-green-600 dark:text-green-400">{correctAnswers}</span>
              <span className="text-green-800 dark:text-green-200">Acertos</span>
            </div>
            <div className="bg-red-100 dark:bg-red-900 p-4 rounded-lg text-center">
              <span className="block text-3xl font-bold text-red-600 dark:text-red-400">{wrongAnswers}</span>
              <span className="text-red-800 dark:text-red-200">Erros</span>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button 
              onClick={handleRestartQuiz}
              className={`px-6 py-3 text-white rounded-lg transition-colors ${buttonColorClass}`}
            >
              Reiniciar Quiz
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
        <h2 className="text-xl font-bold mb-4">{currentQuestion.text}</h2>
        
        <div className="space-y-3 mb-6">
          {currentQuestion.options?.map((option, index) => (
            <div 
              key={index}
              onClick={() => handleOptionSelect(index)}
              className={`p-4 rounded-lg cursor-pointer transition-colors ${
                selectedOption === null ? 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600' :
                selectedOption === index && index === currentQuestion.correctAnswer ? 'bg-green-100 dark:bg-green-900 border-2 border-green-500' :
                selectedOption === index ? 'bg-red-100 dark:bg-red-900 border-2 border-red-500' :
                index === currentQuestion.correctAnswer && showExplanation ? 'bg-green-100 dark:bg-green-900 border-2 border-green-500' :
                'bg-gray-100 dark:bg-gray-700'
              }`}
            >
              <div className="flex items-start">
                <span className={`flex items-center justify-center w-6 h-6 rounded-full mr-3 ${
                  selectedOption === null ? 'bg-gray-300 dark:bg-gray-600' :
                  selectedOption === index && index === currentQuestion.correctAnswer ? 'bg-green-500 text-white' :
                  selectedOption === index ? 'bg-red-500 text-white' :
                  index === currentQuestion.correctAnswer && showExplanation ? 'bg-green-500 text-white' :
                  'bg-gray-300 dark:bg-gray-600'
                }`}>
                  {String.fromCharCode(65 + index)}
                </span>
                <span className="flex-1">{option}</span>
              </div>
            </div>
          ))}
        </div>

        {showExplanation && (
          <div className={`p-4 rounded-lg mb-6 bg-blue-50 dark:bg-blue-900/30 border-l-4 ${borderColorClass}`}>
            <h3 className="font-bold mb-2">Explicação:</h3>
            <p>{currentQuestion.explanation}</p>
          </div>
        )}

        <div className="flex justify-between">
          {selectedOption !== null && !showExplanation ? (
            <button 
              onClick={handleShowExplanation}
              className={`px-6 py-3 text-white rounded-lg transition-colors ${buttonColorClass}`}
            >
              Ver Explicação
            </button>
          ) : selectedOption !== null ? (
            <button 
              onClick={handleNextQuestion}
              className={`px-6 py-3 text-white rounded-lg transition-colors ${buttonColorClass}`}
            >
              {currentQuestionIndex < questions.length - 1 ? 'Próxima Questão' : 'Finalizar Quiz'}
            </button>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizMode;
