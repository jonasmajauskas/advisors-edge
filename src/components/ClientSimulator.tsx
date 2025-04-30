import React, { useState } from 'react';
import DifficultySelector from './DifficultySelector';
import TopicSelector from './TopicSelector';
import FeedbackDisplay from './FeedbackDisplay';
import SpeechInput from './SpeechInput';
import { clientProfiles, difficultyLevels } from '../utils/topics';
interface ClientSimulatorProps {
  difficulty: string;
  setDifficulty: (difficulty: string) => void;
  onBack: () => void;
}
const ClientSimulator: React.FC<ClientSimulatorProps> = ({
  difficulty,
  setDifficulty,
  onBack
}) => {
  const [selectedProfile, setSelectedProfile] = useState('retiree');
  const [currentQuestion, setCurrentQuestion] = useState('');
  const [response, setResponse] = useState('');
  const [conversation, setConversation] = useState<{
    role: string;
    content: string;
  }[]>([]);
  const [feedback, setFeedback] = useState(null);
  const [isSimulationActive, setIsSimulationActive] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const currentProfile = clientProfiles.find(profile => profile.id === selectedProfile);
  const difficultyInfo = difficultyLevels[difficulty as keyof typeof difficultyLevels];
  const startSimulation = () => {
    // Generate initial client question based on profile and difficulty
    const clientConcern = currentProfile?.concerns[Math.floor(Math.random() * currentProfile.concerns.length)];
    let initialQuestion = '';
    switch (difficulty) {
      case 'beginner':
        initialQuestion = `I heard something about ${clientConcern}. Can you explain what that means?`;
        break;
      case 'medium':
        initialQuestion = `I'm concerned about ${clientConcern}. What strategies should I consider?`;
        break;
      case 'advanced':
        initialQuestion = `I've been researching ${clientConcern} and have some ideas, but I'm not sure about the tax implications. Can you help me understand the pros and cons?`;
        break;
      case 'expert':
        initialQuestion = `I've implemented several strategies for ${clientConcern}, but I'm wondering if there are more advanced approaches I should consider given the current economic environment.`;
        break;
      default:
        initialQuestion = `I'd like to discuss ${clientConcern}. What do you recommend?`;
    }
    setCurrentQuestion(initialQuestion);
    setConversation([{
      role: 'client',
      content: initialQuestion
    }]);
    setIsSimulationActive(true);
  };
  const handleSubmitResponse = () => {
    if (response.trim().length < 20) {
      alert('Please provide a more detailed response');
      return;
    }
    // Add advisor response to conversation
    const updatedConversation = [...conversation, {
      role: 'advisor',
      content: response
    }];
    setConversation(updatedConversation);
    setResponse('');
    // If this is the third advisor response, end the simulation
    if (updatedConversation.filter(msg => msg.role === 'advisor').length >= 3) {
      endSimulation(updatedConversation);
    } else {
      // Generate next client question
      setTimeout(() => {
        const followUpQuestions = ["That's interesting. Can you explain more about how that would work in my situation?", "I'm not sure I understand. Could you clarify that point?", 'What are the risks involved with this approach?', "How does this compare to what I'm currently doing?", 'Are there any alternatives I should consider?'];
        const nextQuestion = followUpQuestions[Math.floor(Math.random() * followUpQuestions.length)];
        setConversation([...updatedConversation, {
          role: 'client',
          content: nextQuestion
        }]);
      }, 1000);
    }
  };
  const endSimulation = (conversationHistory: {
    role: string;
    content: string;
  }[]) => {
    // Simulate grading logic
    const empathyScore = Math.random() * 0.3 + 0.7; // Between 0.7 and 1.0
    const clarityScore = Math.random() * 0.4 + 0.6; // Between 0.6 and 1.0
    const technicalAccuracyScore = Math.random() * 0.3 + 0.7; // Between 0.7 and 1.0
    const overallScore = (empathyScore + clarityScore + technicalAccuracyScore) / 3;
    const feedbackData = {
      scores: {
        empathy: empathyScore,
        clarity: clarityScore,
        technicalAccuracy: technicalAccuracyScore,
        overall: overallScore
      },
      strengths: ['Good listening and addressing client concerns', 'Clear explanations of complex concepts', 'Professional and confident communication style'],
      improvements: ['Consider asking more questions to understand client needs', 'Provide more concrete examples relevant to the client situation', 'Avoid technical jargon that might confuse the client']
    };
    setFeedback(feedbackData);
    setIsCompleted(true);
  };
  const handleReset = () => {
    setConversation([]);
    setCurrentQuestion('');
    setResponse('');
    setFeedback(null);
    setIsSimulationActive(false);
    setIsCompleted(false);
  };
  return <div>
      <button onClick={onBack} className="mb-6 flex items-center text-muted-foreground hover:text-foreground">
        ← Back to Home
      </button>
      <h2 className="text-2xl font-bold mb-6">Client Interaction Simulator</h2>
      {!isSimulationActive ? <>
          <DifficultySelector difficulty={difficulty} setDifficulty={setDifficulty} />
          <TopicSelector mode="client" selectedTopic={selectedProfile} setSelectedTopic={setSelectedProfile} />
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-2">Client Profile</h3>
            <div className="bg-card border rounded-lg p-4">
              <p className="font-medium">{currentProfile?.name}</p>
              <p className="text-muted-foreground">
                {currentProfile?.description}
              </p>
              <p className="mt-2 text-sm">
                <span className="font-medium">Key concerns:</span>{' '}
                {currentProfile?.concerns.join(', ')}
              </p>
              <p className="mt-2 text-sm">
                <span className="font-medium">Knowledge level:</span>{' '}
                {difficultyInfo?.clientKnowledge}
              </p>
            </div>
          </div>
          <div className="flex justify-end">
            <button onClick={startSimulation} className="bg-primary text-primary-foreground py-2 px-6 rounded-md">
              Start Client Simulation
            </button>
          </div>
        </> : !isCompleted ? <>
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-2">Client Interaction</h3>
            <div className="border rounded-lg bg-card overflow-hidden">
              <div className="p-4 border-b bg-muted">
                <p className="font-medium">{currentProfile?.name}</p>
                <p className="text-sm text-muted-foreground">
                  Difficulty:{' '}
                  {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                </p>
              </div>
              <div className="p-4 h-80 overflow-y-auto flex flex-col space-y-4">
                {conversation.map((message, index) => <div key={index} className={`p-3 rounded-lg max-w-[80%] ${message.role === 'client' ? 'bg-muted self-start' : 'bg-primary text-primary-foreground self-end'}`}>
                    {message.content}
                  </div>)}
              </div>
              <div className="p-4 border-t">
                <SpeechInput value={response} onTranscriptChange={setResponse} isTextArea={true} placeholder="Speak or type your response here..." />
                <div className="flex justify-end mt-2">
                  <button onClick={handleSubmitResponse} className="bg-primary text-primary-foreground py-1 px-4 rounded-md">
                    Send Response
                  </button>
                </div>
              </div>
            </div>
          </div>
        </> : <>
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-2">Conversation Summary</h3>
            <div className="border rounded-lg bg-card p-4 max-h-80 overflow-y-auto">
              {conversation.map((message, index) => <div key={index} className="mb-4">
                  <p className="font-medium text-sm text-muted-foreground">
                    {message.role === 'client' ? currentProfile?.name : 'You'}:
                  </p>
                  <p>{message.content}</p>
                </div>)}
            </div>
          </div>
          <FeedbackDisplay feedback={feedback} topic="Client Interaction" />
          <div className="flex justify-end mt-6">
            <button onClick={handleReset} className="bg-primary text-primary-foreground py-2 px-6 rounded-md">
              Try Another Simulation
            </button>
          </div>
        </>}
    </div>;
};
export default ClientSimulator;