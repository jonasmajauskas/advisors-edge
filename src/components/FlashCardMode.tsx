import React, { useState } from 'react';
import { financialTopics } from '../utils/topics';
import SpeechInput from './SpeechInput';
import FeedbackDisplay from './FeedbackDisplay';
import { getChatGPTFeedback } from '../api/feedback';

interface FlashCardModeProps {
  onBack: () => void;
}

interface FeedbackData {
  scores: {
    accuracy?: number;
    clarity: number;
    comprehensiveness?: number;
    empathy?: number;
    technicalAccuracy?: number;
    overall: number;
  };
  strengths: string[];
  improvements: string[];
}

const FlashCardMode: React.FC<FlashCardModeProps> = ({ onBack }) => {
  const [selectedTopic, setSelectedTopic] = useState<string>('all');
  const [currentAnswer, setCurrentAnswer] = useState('');
  const [feedback, setFeedback] = useState<FeedbackData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const allQuestions = financialTopics.flatMap(topic =>
    topic.flashcardQuestions?.map(q => ({
      ...q,
      topicId: topic.id,
      topicTitle: topic.title,
    })) || []
  );

  const questions = selectedTopic === 'all'
    ? allQuestions
    : allQuestions.filter(q => q.topicId === selectedTopic);

  const currentQuestion = questions[currentQuestionIndex];

  const handleSubmit = async () => {
    if (currentAnswer.trim().length < 10) {
      alert('Please provide a more detailed answer (at least 10 characters)');
      return;
    }

    setIsLoading(true);
    setIsSubmitted(true);

    try {
      const feedbackData = await getChatGPTFeedback(currentQuestion.question, currentAnswer);
      if (feedbackData && feedbackData.scores) {
        setFeedback(feedbackData);
      } else {
        setFeedback({
          scores: { clarity: 0.5, overall: 0.5 },
          strengths: ['AI could not fully parse your answer.'],
          improvements: ['Try being clearer or more complete.'],
        });
      }
    } catch (error) {
      console.error("Error fetching feedback from ChatGPT:", error);
      setFeedback({
        scores: { clarity: 0.4, overall: 0.4 },
        strengths: [],
        improvements: ['There was a problem contacting the feedback system.'],
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setCurrentAnswer('');
      setFeedback(null);
      setIsSubmitted(false);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setCurrentAnswer('');
      setFeedback(null);
      setIsSubmitted(false);
    }
  };

  const handleReset = () => {
    setCurrentQuestionIndex(0);
    setCurrentAnswer('');
    setFeedback(null);
    setIsSubmitted(false);
  };

  return (
    <div>
      <button onClick={onBack} className="mb-6 flex items-center text-muted-foreground hover:text-foreground">
        ← Back to Home
      </button>
      <h2 className="text-2xl font-bold mb-6">General Assessment</h2>

      <div className="mb-6">
        <h3 className="text-lg font-medium mb-2">Select Topic</h3>
        <div className="flex flex-wrap gap-2">
          <button
            className={`px-4 py-2 rounded-md ${selectedTopic === 'all'
              ? 'bg-primary text-primary-foreground'
              : 'bg-secondary text-secondary-foreground'}`}
            onClick={() => {
              setSelectedTopic('all');
              setCurrentQuestionIndex(0);
              setCurrentAnswer('');
              setFeedback(null);
              setIsSubmitted(false);
            }}
          >
            All Topics
          </button>
          {financialTopics.map(topic => (
            <button
              key={topic.id}
              className={`px-4 py-2 rounded-md ${selectedTopic === topic.id
                ? 'bg-primary text-primary-foreground'
                : 'bg-secondary text-secondary-foreground'}`}
                onClick={() => {
                  setSelectedTopic(topic.id);
                  setCurrentQuestionIndex(0);
                  setCurrentAnswer('');
                  setFeedback(null);
                  setIsSubmitted(false);
                }}                
            >
              {topic.title} ({topic.flashcardQuestions?.length || 0})
            </button>
          ))}
        </div>
      </div>

      {questions.length > 0 ? !isSubmitted ? (
        <div>
          <div className="bg-card border rounded-lg p-6 mb-6">
            <p className="text-sm text-muted-foreground mb-2">
              Question {currentQuestionIndex + 1} of {questions.length}
            </p>
            <h3 className="text-lg font-medium mb-2">
              {currentQuestion.question}
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Topic: {currentQuestion.topicTitle}
            </p>
            <div className="mb-6">
              <SpeechInput
                value={currentAnswer}
                onTranscriptChange={setCurrentAnswer}
                isTextArea={true}
                placeholder="Speak or type your answer here..."
              />
            </div>
            <div className="flex flex-wrap gap-4 mt-6">
              <button
                onClick={handleSubmit}
                className="bg-primary text-primary-foreground py-2 px-6 rounded-md"
              >
                Submit Answer
              </button>

              {currentQuestionIndex > 0 && (
                <button
                  onClick={handlePrevious}
                  className="bg-muted text-muted-foreground py-2 px-6 rounded-md"
                >
                  Previous
                </button>
              )}

              {currentQuestionIndex < questions.length - 1 ? (
                <button
                  onClick={handleNext}
                  className="bg-muted text-muted-foreground py-2 px-6 rounded-md"
                >
                  Skip Question
                </button>
              ) : (
                <button
                  onClick={handleReset}
                  className="bg-muted text-muted-foreground py-2 px-6 rounded-md"
                >
                  Start Over
                </button>
              )}
            </div>


          </div>
        </div>
      ) : (
        <div>
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-2">Question</h3>
            <div className="border rounded-lg p-4 bg-card mb-4">
              <p className="whitespace-pre-wrap">{currentQuestion.question}</p>
            </div>

            <h3 className="text-lg font-medium mb-2">Your Answer</h3>
            <div className="border rounded-lg p-4 bg-card">
              <p className="whitespace-pre-wrap">{currentAnswer}</p>
            </div>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center py-10 text-muted-foreground">
              <span className="animate-pulse">Analyzing answer...</span>
            </div>
          ) : (
            <FeedbackDisplay feedback={feedback} topic={currentQuestion.topicTitle} />
          )}

          <div className="flex justify-end gap-4 mt-6">
            <button
              onClick={() => {
                setCurrentAnswer('');
                setFeedback(null);
                setIsSubmitted(false);
              }}
              className="border border-muted-foreground text-muted-foreground py-2 px-6 rounded-md hover:bg-muted"
            >
              Retry
            </button>
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

export default FlashCardMode;