import React, { useState } from 'react';
import DifficultySelector from './DifficultySelector';
import TopicSelector from './TopicSelector';
import FeedbackDisplay from './FeedbackDisplay';
import SpeechInput from './SpeechInput';
import { financialTopics } from '../utils/topics';
interface ExplanationModeProps {
  difficulty: string;
  setDifficulty: (difficulty: string) => void;
  onBack: () => void;
}
const ExplanationMode: React.FC<ExplanationModeProps> = ({
  difficulty,
  setDifficulty,
  onBack
}) => {
  const [selectedTopic, setSelectedTopic] = useState('retirement');
  const [explanation, setExplanation] = useState('');
  const [feedback, setFeedback] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const currentTopic = financialTopics.find(topic => topic.id === selectedTopic);
  const handleSubmit = () => {
    if (explanation.trim().length < 50) {
      alert('Please provide a more detailed explanation (at least 50 characters)');
      return;
    }
    // Simulate grading logic
    const accuracyScore = Math.random() * 0.3 + 0.7; // Between 0.7 and 1.0
    const clarityScore = Math.random() * 0.4 + 0.6; // Between 0.6 and 1.0
    const comprehensivenessScore = Math.random() * 0.5 + 0.5; // Between 0.5 and 1.0
    const overallScore = (accuracyScore + clarityScore + comprehensivenessScore) / 3;
    const feedbackData = {
      scores: {
        accuracy: accuracyScore,
        clarity: clarityScore,
        comprehensiveness: comprehensivenessScore,
        overall: overallScore
      },
      strengths: ['Good use of examples to illustrate concepts', 'Clear explanation of key terms', 'Logical structure to your explanation'],
      improvements: ['Consider addressing potential client concerns more directly', 'Provide more context for technical terms', 'Include more specific numbers or scenarios to make concepts concrete']
    };
    setFeedback(feedbackData);
    setIsSubmitted(true);
  };
  const handleReset = () => {
    setExplanation('');
    setFeedback(null);
    setIsSubmitted(false);
  };
  return <div>
      <button onClick={onBack} className="mb-6 flex items-center text-muted-foreground hover:text-foreground">
        ← Back to Home
      </button>
      <h2 className="text-2xl font-bold mb-6">Financial Explanation Grader</h2>
      {!isSubmitted ? <>
          <DifficultySelector difficulty={difficulty} setDifficulty={setDifficulty} />
          <TopicSelector mode="explanation" selectedTopic={selectedTopic} setSelectedTopic={setSelectedTopic} />
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-2">Your Task</h3>
            <div className="bg-card border rounded-lg p-4 mb-4">
              <p className="font-medium">Explain: {currentTopic?.title}</p>
              <p className="text-muted-foreground">
                {currentTopic?.description}
              </p>
              <p className="mt-2 text-sm">
                <span className="font-medium">Key points to cover:</span>{' '}
                {currentTopic?.subtopics.join(', ')}
              </p>
              <p className="mt-2 text-sm">
                <span className="font-medium">Difficulty level:</span>{' '}
                {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
              </p>
            </div>
          </div>
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-2">Your Explanation</h3>
            <SpeechInput value={explanation} onTranscriptChange={setExplanation} isTextArea={true} placeholder="Speak or type your explanation here..." />
          </div>
          <div className="flex justify-end">
            <button onClick={handleSubmit} className="bg-primary text-primary-foreground py-2 px-6 rounded-md">
              Submit for Grading
            </button>
          </div>
        </> : <>
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-2">Your Explanation</h3>
            <div className="border rounded-lg p-4 bg-card">
              <p className="whitespace-pre-wrap">{explanation}</p>
            </div>
          </div>
          <FeedbackDisplay feedback={feedback} topic={currentTopic?.title || ''} />
          <div className="flex justify-end mt-6">
            <button onClick={handleReset} className="bg-primary text-primary-foreground py-2 px-6 rounded-md">
              Try Another Explanation
            </button>
          </div>
        </>}
    </div>;
};
export default ExplanationMode;