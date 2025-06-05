import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { StudyProvider } from './contexts/StudyContext';
import HomePage from './components/HomePage';
import TrackPage from './components/TrackPage';
import QuizMode from './components/QuizMode';
import InterviewMode from './components/InterviewMode';
import ChallengeMode from './components/ChallengeMode';
import LearnMode from './components/LearnMode';
import Header from './components/Header';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <StudyProvider>
      <Router>
        <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
          <Header />
          <main className="flex-grow container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/track/:trackId" element={<TrackPage />} />
              <Route path="/quiz/:trackId" element={<QuizMode />} />
              <Route path="/interview/:trackId" element={<InterviewMode />} />
              <Route path="/challenge/:trackId" element={<ChallengeMode />} />
              <Route path="/learn/:trackId" element={<LearnMode />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </StudyProvider>
  );
}

export default App;
