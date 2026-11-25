import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { usePersistentState } from '../../../hooks/usePersistentState';
import './SpringBootQuiz.css';
import { playSound } from './audio/quizAudio';
import { TUTORIA_MODULES } from './data/quizModulesData';
import QuizHeaderSection from './components/QuizHeaderSection';
import QuizFilterBar from './components/QuizFilterBar';
import QuizQuestionCard from './components/QuizQuestionCard';
import QuizChallengeHud from './components/QuizChallengeHud';
import QuizChallengeOverModal from './components/QuizChallengeOverModal';
import QuizFlashcardsView from './components/QuizFlashcardsView';
import QuizSurveyView from './components/QuizSurveyView';

export { TUTORIA_MODULES };

export default function SpringBootQuizGame({ initialTutoriaId = 'all', initialMode = 'quiz', embeddedInPetete = false }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // App Modes: 'quiz' | 'challenge' | 'flashcards' | 'survey' | 'review'
  const [activeMode, setActiveMode] = useState(initialMode);
  const [selectedTutoriaId, setSelectedTutoriaId] = useState(initialTutoriaId);
  const [selectedModuleId, setSelectedModuleId] = useState(() => {
    if (initialTutoriaId && initialTutoriaId !== 'all') {
      const num = Number(initialTutoriaId);
      const mod = TUTORIA_MODULES.find(m => m.tutoriaIds.includes(num));
      return mod ? mod.id : 'all';
    }
    return 'all';
  });
  const [soundEnabled, setSoundEnabled] = useState(true);

  useEffect(() => {
    if (initialTutoriaId) {
      setSelectedTutoriaId(initialTutoriaId);
      if (initialTutoriaId !== 'all') {
        const num = Number(initialTutoriaId);
        const mod = TUTORIA_MODULES.find(m => m.tutoriaIds.includes(num));
        if (mod) setSelectedModuleId(mod.id);
      } else {
        setSelectedModuleId('all');
      }
    }
  }, [initialTutoriaId]);

  useEffect(() => {
    if (initialMode) {
      setActiveMode(initialMode);
    }
  }, [initialMode]);

  // Quiz State
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [userScore, setUserScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);

  // Review & Mistakes List (Persisted to SQLite + localStorage)
  const [wrongQuestionIds, setWrongQuestionIds] = usePersistentState('sb_quiz_wrong_ids', [], {
    category: 'quiz'
  });

  // Challenge Mode specific state
  const [challengeQuestions, setChallengeQuestions] = useState([]);
  const [challengeLives, setChallengeLives] = useState(3);
  const [challengeTimeLeft, setChallengeTimeLeft] = useState(30);
  const [challengeGameOver, setChallengeGameOver] = useState(false);
  const [challengePoints, setChallengePoints] = useState(0);

  // Flashcards state
  const [isCardFlipped, setIsCardFlipped] = useState(false);
  const [masteredCards, setMasteredCards] = usePersistentState('sb_quiz_mastered_cards', [], {
    category: 'quiz'
  });

  // Self-assessment survey ratings { [tutoriaId]: rating 1-5 }
  const [surveyRatings, setSurveyRatings] = usePersistentState('sb_quiz_survey_ratings', {}, {
    category: 'quiz'
  });

  // Load Quiz Data
  useEffect(() => {
    fetch('/data/extra/springboot_quiz_data.json')
      .then(res => {
        if (!res.ok) throw new Error('Error al cargar banco de preguntas');
        return res.json();
      })
      .then(json => {
        setData(json);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // Flatten all questions with tutoria metadata
  const allQuestions = useMemo(() => {
    if (!data || !data.length) return [];
    return data.flatMap(t => t.questions || []);
  }, [data]);

  // Tutorias filtered by active module
  const visibleTutorias = useMemo(() => {
    if (!data || !data.length) return [];
    if (selectedModuleId === 'all') return data;
    const modObj = TUTORIA_MODULES.find(m => m.id === selectedModuleId);
    if (!modObj || !modObj.tutoriaIds) return data;
    return data.filter(item => modObj.tutoriaIds.includes(item.meta.id));
  }, [data, selectedModuleId]);

  // Questions filtered by active tutoria & module
  const filteredQuestions = useMemo(() => {
    if (activeMode === 'review') {
      return allQuestions.filter(q => wrongQuestionIds.includes(q.id));
    }
    if (activeMode === 'challenge') {
      return challengeQuestions;
    }
    if (selectedTutoriaId !== 'all') {
      return allQuestions.filter(q => q.tutoriaId === Number(selectedTutoriaId));
    }
    if (selectedModuleId !== 'all') {
      const activeModule = TUTORIA_MODULES.find(m => m.id === selectedModuleId);
      if (activeModule && activeModule.tutoriaIds) {
        return allQuestions.filter(q => activeModule.tutoriaIds.includes(q.tutoriaId));
      }
    }
    return allQuestions;
  }, [allQuestions, selectedTutoriaId, selectedModuleId, activeMode, wrongQuestionIds, challengeQuestions]);

  const currentQ = filteredQuestions[currentIndex] || null;

  // Reset question state on change
  useEffect(() => {
    setSelectedOption(null);
    setIsAnswered(false);
    setIsCardFlipped(false);
  }, [currentIndex, selectedTutoriaId, selectedModuleId, activeMode]);

  // Handle answering an option
  const handleOptionSelect = useCallback((optionKey, isTimeout = false) => {
    if (isAnswered || !currentQ) return;

    setIsAnswered(true);
    setSelectedOption(optionKey);

    const isCorrect = !isTimeout && optionKey === currentQ.correctAnswer;

    if (isCorrect) {
      playSound('correct', soundEnabled);
      const newStreak = streak + 1;
      setStreak(newStreak);
      if (newStreak > maxStreak) setMaxStreak(newStreak);
      setUserScore(prev => prev + 10 * Math.min(newStreak, 3));

      // Remove from wrong IDs if answered correctly
      if (wrongQuestionIds.includes(currentQ.id)) {
        setWrongQuestionIds(prev => prev.filter(id => id !== currentQ.id));
      }

      if (activeMode === 'challenge') {
        const timeBonus = challengeTimeLeft * 2;
        const streakBonus = (newStreak - 1) * 15;
        setChallengePoints(prev => prev + 100 + timeBonus + streakBonus);
      }
    } else {
      playSound('incorrect', soundEnabled);
      setStreak(0);

      // Save to wrong questions for review
      if (!wrongQuestionIds.includes(currentQ.id)) {
        setWrongQuestionIds(prev => [...prev, currentQ.id]);
      }

      if (activeMode === 'challenge') {
        const newLives = challengeLives - 1;
        setChallengeLives(newLives);
        if (newLives <= 0) {
          setChallengeGameOver(true);
        }
      }
    }
  }, [isAnswered, currentQ, soundEnabled, streak, maxStreak, wrongQuestionIds, activeMode, challengeTimeLeft, challengeLives]);

  // Timer for Challenge Mode
  useEffect(() => {
    if (activeMode !== 'challenge' || challengeGameOver || isAnswered || !currentQ) return;

    if (challengeTimeLeft <= 0) {
      handleOptionSelect(null, true);
      return;
    }

    const timer = setInterval(() => {
      setChallengeTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [activeMode, challengeTimeLeft, challengeGameOver, isAnswered, currentQ, handleOptionSelect]);

  // Start Challenge Mode
  const startChallenge = useCallback(() => {
    if (!allQuestions.length) return;
    const shuffled = [...allQuestions].sort(() => 0.5 - Math.random()).slice(0, 10);
    setChallengeQuestions(shuffled);
    setCurrentIndex(0);
    setChallengeLives(3);
    setChallengeTimeLeft(30);
    setChallengeGameOver(false);
    setChallengePoints(0);
    setStreak(0);
    setActiveMode('challenge');
  }, [allQuestions]);

  // Next Question
  const handleNextQuestion = () => {
    if (currentIndex < filteredQuestions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      if (activeMode === 'challenge') {
        setChallengeTimeLeft(30);
      }
    } else if (activeMode === 'challenge') {
      setChallengeGameOver(true);
      playSound('victory', soundEnabled);
    }
  };

  // Prev Question
  const handlePrevQuestion = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  // Toggle card mastered
  const toggleMastered = (qId) => {
    let updated;
    setMasteredCards(prev => prev.includes(qId) ? prev.filter(id => id !== qId) : [...prev, qId]);
  };

  // Handle rating in survey (toggles off to 0 if the same star is clicked)
  const handleRateTutoria = (tutoriaId, rating) => {
    setSurveyRatings(prev => {
      const current = prev[tutoriaId] || 0;
      const newRating = current === rating ? 0 : rating;
      return { ...prev, [tutoriaId]: newRating };
    });
  };

  // Reset a specific tutoria rating
  const handleResetTutoriaRating = (tutoriaId) => {
    setSurveyRatings(prev => ({ ...prev, [tutoriaId]: 0 }));
  };

  // Reset all survey ratings
  const handleResetAllRatings = () => {
    setSurveyRatings({});
  };

  if (loading) {
    return (
      <div className="quiz-game-container quiz-loading-container">
        <div className="quiz-loading-icon">🌱 ⚙️ 📦</div>
        <h2>Cargando banco de preguntas de las tutorías de Spring Boot...</h2>
        <p className="quiz-loading-desc">Procesando 99 preguntas oficiales de Israel...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="quiz-game-container quiz-error-container">
        <h2>⚠️ Error al cargar el banco de preguntas</h2>
        <p className="quiz-error-msg">{error}</p>
        <Link to="/accenture" className="theme-btn">Volver al Campus</Link>
      </div>
    );
  }

  return (
    <div className={`quiz-game-container ${embeddedInPetete ? 'is-embedded' : ''}`}>
      {/* Hero Header & Mode Selector */}
      <QuizHeaderSection
        embeddedInPetete={embeddedInPetete}
        soundEnabled={soundEnabled}
        onToggleSound={() => setSoundEnabled(!soundEnabled)}
        totalQuestionsCount={allQuestions.length}
        userScore={userScore}
        streak={streak}
        wrongCount={wrongQuestionIds.length}
        activeMode={activeMode}
        onChangeMode={(newMode) => {
          if (newMode === 'challenge') {
            startChallenge();
          } else if (newMode === 'survey') {
            setActiveMode('survey');
          } else {
            setActiveMode(newMode);
            setCurrentIndex(0);
          }
        }}
      />

      {/* Sub-bar: Tutoria Filter Dropdowns (When in Quiz or Flashcards mode) */}
      <QuizFilterBar
        activeMode={activeMode}
        filteredCount={filteredQuestions.length}
        totalCount={allQuestions.length}
        selectedModuleId={selectedModuleId}
        selectedTutoriaId={selectedTutoriaId}
        onSelectModule={(newMod) => {
          setSelectedModuleId(newMod);
          setCurrentIndex(0);
          if (newMod !== 'all') {
            const modObj = TUTORIA_MODULES.find(m => m.id === newMod);
            if (modObj && selectedTutoriaId !== 'all' && !modObj.tutoriaIds.includes(Number(selectedTutoriaId))) {
              setSelectedTutoriaId('all');
            }
          }
        }}
        onSelectTutoria={(newTut) => {
          setSelectedTutoriaId(newTut);
          setCurrentIndex(0);
          if (newTut !== 'all') {
            const parentMod = TUTORIA_MODULES.find(m => m.tutoriaIds.includes(Number(newTut)));
            if (parentMod && selectedModuleId !== parentMod.id) {
              setSelectedModuleId(parentMod.id);
            }
          }
        }}
        onResetFilters={() => {
          setSelectedModuleId('all');
          setSelectedTutoriaId('all');
          setCurrentIndex(0);
        }}
        visibleTutorias={visibleTutorias}
      />

      {/* Mode 1 & 2: Quiz, Challenge & Review */}
      {(activeMode === 'quiz' || activeMode === 'challenge' || activeMode === 'review') && (
        <div>
          {/* Challenge HUD: Timer, Lives & Points */}
          {activeMode === 'challenge' && !challengeGameOver && (
            <QuizChallengeHud
              challengeLives={challengeLives}
              challengeTimeLeft={challengeTimeLeft}
              streak={streak}
              challengePoints={challengePoints}
            />
          )}

          {/* Game Over / Victory Modal for Challenge */}
          {activeMode === 'challenge' && challengeGameOver && (
            <QuizChallengeOverModal
              challengeLives={challengeLives}
              challengePoints={challengePoints}
              maxStreak={maxStreak}
              onRestartChallenge={startChallenge}
              onGoToQuiz={() => setActiveMode('quiz')}
            />
          )}

          {/* Active Question Card */}
          {(!challengeGameOver || activeMode !== 'challenge') && currentQ && (
            <QuizQuestionCard
              currentQ={currentQ}
              currentIndex={currentIndex}
              totalCount={filteredQuestions.length}
              tutoriaIcon={data.find(d => d.meta.id === currentQ.tutoriaId)?.meta.icon || '🌱'}
              isAnswered={isAnswered}
              selectedOption={selectedOption}
              onOptionSelect={handleOptionSelect}
              onPrevQuestion={handlePrevQuestion}
              onNextQuestion={handleNextQuestion}
            />
          )}

          {/* Empty state when review mode has 0 mistakes */}
          {activeMode === 'review' && filteredQuestions.length === 0 && (
            <div className="quiz-active-card quiz-review-empty-card">
              <div className="quiz-review-empty-icon">🎉</div>
              <h2>¡No tienes preguntas pendientes de repasar!</h2>
              <p className="quiz-review-empty-desc">
                Has respondido correctamente a todas las preguntas que tenías marcadas para repaso.
              </p>
              <button className="quiz-action-btn primary" onClick={() => setActiveMode('quiz')}>
                Volver al Quiz Global
              </button>
            </div>
          )}
        </div>
      )}

      {/* Mode 3: Flashcards */}
      {activeMode === 'flashcards' && currentQ && (
        <QuizFlashcardsView
          currentQ={currentQ}
          currentIndex={currentIndex}
          totalCount={filteredQuestions.length}
          masteredCards={masteredCards}
          isCardFlipped={isCardFlipped}
          setIsCardFlipped={setIsCardFlipped}
          onToggleMastered={toggleMastered}
          onPrevQuestion={handlePrevQuestion}
          onNextQuestion={handleNextQuestion}
          tutoriaIcon={data.find(d => d.meta.id === currentQ.tutoriaId)?.meta.icon || '🌱'}
        />
      )}

      {/* Mode 4: Self-Assessment Survey */}
      {activeMode === 'survey' && (
        <QuizSurveyView
          data={data}
          surveyRatings={surveyRatings}
          onRateTutoria={handleRateTutoria}
          onResetTutoriaRating={handleResetTutoriaRating}
          onResetAllRatings={handleResetAllRatings}
          onLaunchTutoriaQuiz={(tutoriaId) => {
            const tutId = String(tutoriaId);
            setSelectedTutoriaId(tutId);
            const parentMod = TUTORIA_MODULES.find(m => m.tutoriaIds.includes(Number(tutoriaId)));
            if (parentMod) {
              setSelectedModuleId(parentMod.id);
            }
            setActiveMode('quiz');
            setCurrentIndex(0);
          }}
        />
      )}
    </div>
  );
}
