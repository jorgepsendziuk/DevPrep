import { createContext, useState, useContext, ReactNode } from 'react';
import { Question, getQuestionsByTrack } from '../data/questions';

// Definindo os tipos para o contexto
type Track = 'react' | 'fullstack' | 'devops' | 'business-analyst' | 'challenges';
type StudyMode = 'learn' | 'quiz' | 'interview' | 'challenge';
type Difficulty = 'iniciante' | 'intermediário' | 'avançado' | 'all';

interface UserProgress {
  completedQuestions: string[];
  correctAnswers: string[];
  wrongAnswers: string[];
  score: number;
}

interface StudyContextType {
  currentTrack: Track;
  setCurrentTrack: (track: Track) => void;
  currentMode: StudyMode;
  setCurrentMode: (mode: StudyMode) => void;
  currentDifficulty: Difficulty;
  setCurrentDifficulty: (difficulty: Difficulty) => void;
  userProgress: UserProgress;
  updateProgress: (questionId: string, isCorrect: boolean) => void;
  resetProgress: () => void;
  getCurrentQuestions: () => Question[];
}

// Criando o contexto
const StudyContext = createContext<StudyContextType | undefined>(undefined);

// Provider component
export const StudyProvider = ({ children }: { children: ReactNode }) => {
  const [currentTrack, setCurrentTrack] = useState<Track>('react');
  const [currentMode, setCurrentMode] = useState<StudyMode>('learn');
  const [currentDifficulty, setCurrentDifficulty] = useState<Difficulty>('all');
  const [userProgress, setUserProgress] = useState<UserProgress>({
    completedQuestions: [],
    correctAnswers: [],
    wrongAnswers: [],
    score: 0,
  });

  const updateProgress = (questionId: string, isCorrect: boolean) => {
    setUserProgress(prev => {
      // Verifica se a questão já foi respondida
      if (prev.completedQuestions.includes(questionId)) {
        return prev;
      }

      // Atualiza o progresso
      return {
        completedQuestions: [...prev.completedQuestions, questionId],
        correctAnswers: isCorrect 
          ? [...prev.correctAnswers, questionId] 
          : prev.correctAnswers,
        wrongAnswers: !isCorrect 
          ? [...prev.wrongAnswers, questionId] 
          : prev.wrongAnswers,
        score: isCorrect ? prev.score + 10 : prev.score,
      };
    });
  };

  const resetProgress = () => {
    setUserProgress({
      completedQuestions: [],
      correctAnswers: [],
      wrongAnswers: [],
      score: 0,
    });
  };

  const getCurrentQuestions = () => {
    const allQuestions = getQuestionsByTrack(currentTrack);
    
    if (currentDifficulty === 'all') {
      return allQuestions;
    }
    
    return allQuestions.filter(q => q.difficulty === currentDifficulty);
  };

  return (
    <StudyContext.Provider
      value={{
        currentTrack,
        setCurrentTrack,
        currentMode,
        setCurrentMode,
        currentDifficulty,
        setCurrentDifficulty,
        userProgress,
        updateProgress,
        resetProgress,
        getCurrentQuestions,
      }}
    >
      {children}
    </StudyContext.Provider>
  );
};

// Hook personalizado para usar o contexto
export const useStudyContext = () => {
  const context = useContext(StudyContext);
  if (context === undefined) {
    throw new Error('useStudyContext deve ser usado dentro de um StudyProvider');
  }
  return context;
};
