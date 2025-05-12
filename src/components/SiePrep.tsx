import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { financialTopics } from '../utils/topics';
import SpeechInput from './SpeechInput';
import FeedbackDisplay from './FeedbackDisplay';
import { getChatGPTFeedback } from '../api/feedback';
import { useAuth } from '../contexts/AuthContext';
import { CircleCheck, Loader, RotateCw } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';
import ReactMarkdown from 'react-markdown';

interface FeedbackData {
  scores: {
    accuracy?: number;
    clarity: number;
    comprehensiveness?: number;
    overall: number;
  };
  strengths: string[];
  improvements: string[];
}

const SiePrep: React.FC = () => {
  const [selectedTopic, setSelectedTopic] = useState('all');
  const [currentAnswer, setCurrentAnswer] = useState('');
  const [feedback, setFeedback] = useState<FeedbackData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);
  const [aiLevel, setAiLevel] = useState<'easy' | 'intermediate' | 'advanced'>('easy');

  const { user } = useAuth();

  const completedIds = (user?.['sie-prep-questions-completed'] || '')
    .split(',')
    .map((id: string) => id.trim())
    .filter(Boolean);

  // Load saved question index on component mount
  useEffect(() => {
    const savedIndex = localStorage.getItem('sie-prep-current-question');
    if (savedIndex !== null) {
      setCurrentQuestionIndex(Number(savedIndex));
    }
  }, []);

  // Save current question index on change
  useEffect(() => {
    localStorage.setItem('sie-prep-current-question', String(currentQuestionIndex));
  }, [currentQuestionIndex]);

  // Auto-navigate to first uncompleted question on initial load or topic change
  useEffect(() => {
    const firstUncompletedIndex = questions.findIndex(
      (q) => !completedIds.includes(String(q.id))
    );

    if (firstUncompletedIndex !== -1) {
      setCurrentQuestionIndex(firstUncompletedIndex);
    } else {
      setCurrentQuestionIndex(0); // All completed, start from beginning
    }
  }, [selectedTopic, user]); // Re-run when topic changes or user data updates


  const resetState = () => {
    setCurrentAnswer('');
    setFeedback(null);
    setIsSubmitted(false);
    setShowCorrectAnswer(false);
  };

  const allQuestions = financialTopics.flatMap(topic =>
    topic.flashcardQuestions?.map(q => ({
      ...q,
      topicId: topic.id,
      topicTitle: topic.title,
      correctAnswer: q.answer || '',
    })) || []
  );

  const questions = selectedTopic === 'all'
    ? allQuestions
    : allQuestions.filter(q => q.topicId === selectedTopic);

  const currentQuestion = questions[currentQuestionIndex];

  const isCurrentQuestionCompleted = completedIds.includes(String(currentQuestion?.id));

  const handleSubmit = async () => {
    if (currentAnswer.trim().length < 10) {
      alert('Please provide a more detailed answer (at least 10 characters).');
      return;
    }

    setIsLoading(true);
    setIsSubmitted(true);

    try {
      const feedbackData = await getChatGPTFeedback(
        currentQuestion.question,
        currentAnswer,
        currentQuestion.correctAnswer,
        aiLevel
      );
      setFeedback(feedbackData || {
        scores: { clarity: 0.5, overall: 0.5 },
        strengths: ['AI could not fully parse your answer.'],
        improvements: ['Try being clearer or more complete.'],
      });

      // ✅ Append Question ID to Completed List in Supabase
      if (user) {
        const userId = user.userId || user.id; // Adjust based on your schema
        const existingCompleted = (user['sie-prep-questions-completed'] || '').split(',').map((id: string) => id.trim()).filter(Boolean);

        if (!existingCompleted.includes(String(currentQuestion.id))) {
          const updatedCompleted = [...existingCompleted, currentQuestion.id].join(',');

          const { error } = await supabase
            .from('users')
            .update({ 'sie-prep-questions-completed': updatedCompleted })
            .eq('userId', userId);

          if (error) {
            console.error('Error updating completed questions:', error.message);
          } else {
            // ✅ Update local user object directly to trigger re-render
            user['sie-prep-questions-completed'] = updatedCompleted;
          }
        }
      }

    } catch (error) {
      console.error('Error fetching feedback:', error);
      setFeedback({
        scores: { clarity: 0.4, overall: 0.4 },
        strengths: [],
        improvements: ['Error contacting feedback system.'],
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      resetState();
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
      resetState();
    }
  };

  const handleReset = () => {
    setCurrentQuestionIndex(0);
    localStorage.removeItem('sie-prep-current-question');
    resetState();
  };

  const renderNavigationButtons = () => (
    <div className="flex flex-wrap gap-4 mt-2">
      <button
        onClick={() => setShowCorrectAnswer(prev => !prev)}
        className="border border-muted-foreground text-muted-foreground py-2 px-6 rounded-md flex-1"
      >
        {showCorrectAnswer ? 'Hide' : 'View'}
      </button>

      <button
        onClick={handleSubmit}
        className="bg-primary text-primary-foreground py-2 px-6 rounded-md flex-1"
      >
        Submit
      </button>

      {currentQuestionIndex > 0 && (
        <button
          onClick={handlePrevious}
          className="bg-muted text-muted-foreground py-2 px-6 rounded-md flex-1"
        >
          Previous
        </button>
      )}

      {currentQuestionIndex < questions.length - 1 ? (
        <button
          onClick={handleNext}
          className="bg-muted text-muted-foreground py-2 px-6 rounded-md flex-1"
        >
          Skip
        </button>
      ) : (
        <button
          onClick={handleReset}
          className="bg-muted text-muted-foreground py-2 px-6 rounded-md flex-1"
        >
          Start Over
        </button>
      )}
    </div>
  );

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <Link to="/home" className="text-muted-foreground hover:text-foreground">
          ← Home
        </Link>
        <h2 className="text-2xl font-bold">SIE® Prep</h2>
      </div>

      <div className="mb-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-medium">Select Topic</h3>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              {completedIds.length} / {allQuestions.length} Completed
            </span>
            <button
              onClick={async () => {
                if (!user) return;
                const userId = user.userId || user.id;

                const { error } = await supabase
                  .from('users')
                  .update({ 'sie-prep-questions-completed': '' })
                  .eq('userId', userId);

                if (error) {
                  console.error('Error resetting progress:', error.message);
                } else {
                  // Update local state or trigger a re-fetch if needed
                  user['sie-prep-questions-completed'] = '';
                  handleReset(); // Reset local progress
                }
              }}
              className="text-primary hover:underline text-sm flex items-center gap-1"
            >
              <RotateCw className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>
        </div>

        <select
          value={selectedTopic}
          onChange={(e) => {
            setSelectedTopic(e.target.value);
            handleReset();
          }}
          className="w-full border rounded-md p-2 text-sm"
        >
          <option value="all">All Topics ({allQuestions.length})</option>
          {financialTopics.map(topic => (
            <option key={topic.id} value={topic.id}>
              {topic.title} ({topic.flashcardQuestions?.length || 0})
            </option>
          ))}
        </select>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-medium mb-2">Select AI Feedback Level</h3>
        <select
          value={aiLevel}
          onChange={(e) => setAiLevel(e.target.value as 'easy' | 'intermediate' | 'advanced')}
          className="w-full border rounded-md p-2 text-sm"
        >
          <option value="novice">Easy</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
        </select>
      </div>


      {questions.length > 0 ? !isSubmitted ? (
        <div className="bg-card border rounded-lg p-6 mb-6">
          <p className="text-sm text-muted-foreground mb-2 flex items-center gap-2">
            Question {currentQuestionIndex + 1} of {questions.length}
            {isCurrentQuestionCompleted && (
              <CircleCheck className="text-green-500 w-5 h-5" />
            )}
          </p>
          <h3 className="text-lg font-medium mb-2">{currentQuestion.question}</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Topic: {currentQuestion.topicTitle}
          </p>
          <div className="w-full">
            {showCorrectAnswer ? (
              <div className="border rounded-md bg-muted p-4 text-sm text-muted-foreground space-y-2">
                <strong className="underline">Correct Answer:</strong>
                <ReactMarkdown
                  components={{
                    p: ({ children }) => <p className="leading-relaxed mb-2">{children}</p>,
                    strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
                  }}
                >
                  {currentQuestion.correctAnswer || 'No answer provided.'}
                </ReactMarkdown>
              </div>
            ) : (
              <SpeechInput
                value={currentAnswer}
                onTranscriptChange={setCurrentAnswer}
                isTextArea
                placeholder="Speak or type your answer here..."
              />
            )}
          </div>

          {renderNavigationButtons()}
        </div>
      ) : (
        <div>
          <h3 className="text-lg font-medium mb-2">Question</h3>
          <div className="border rounded-lg p-4 bg-card mb-4">
            <p>{currentQuestion.question}</p>
          </div>

          <h3 className="text-lg font-medium mb-2">Your Answer</h3>
          <div className="border rounded-lg p-4 bg-card mb-4">
            <p>{currentAnswer}</p>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center py-10 text-muted-foreground text-lg font-medium mb-4">
              Analyzing your answer
              <Loader className="animate-spin w-5 h-5 text-primary ml-1" />
            </div>
          ) : (
            <FeedbackDisplay feedback={feedback} topic={currentQuestion.topicTitle}/>
          )}

          <h3 className="text-lg font-medium mb-2">Correct Answer</h3>
          <div className="border rounded-lg p-4 bg-muted text-muted-foreground mb-6">
            <p>{currentQuestion.correctAnswer || 'No correct answer provided.'}</p>
          </div>

          <div className="flex justify-end gap-4 mt-6">
            <button
              onClick={resetState}
              className="border border-muted-foreground text-muted-foreground py-2 px-6 rounded-md hover:bg-muted"
            >
              Retry
            </button>
            {currentQuestionIndex < questions.length - 1 ? (
              <button
                onClick={handleNext}
                className="bg-primary text-primary-foreground py-2 px-6 rounded-md"
              >
                Next Question
              </button>
            ) : (
              <button
                onClick={handleReset}
                className="bg-primary text-primary-foreground py-2 px-6 rounded-md"
              >
                Start Over
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No questions available for the selected topic.</p>
        </div>
      )}
    </div>
  );
};

export default SiePrep;