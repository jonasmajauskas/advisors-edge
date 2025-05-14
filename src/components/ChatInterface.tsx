import React, { useEffect, useState, useRef } from 'react';
import SpeechInput from './SpeechInput';
import { clientProfiles } from '../utils/topics';
import { useNavigate, useLocation } from 'react-router-dom';
import { fetchAIResponse } from '../ai/SimulatorChat'; // Ensure this path is correct
import { Loader } from 'lucide-react';
import { Link } from 'react-router-dom';

const ChatInterface: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);

  const { clientProfileId, difficulty, concerns, customConcerns } = location.state || {};

  console.log('chatinterface', clientProfileId, concerns, customConcerns);

  const [response, setResponse] = useState('');
  const [conversation, setConversation] = useState<{ role: string; content: string }[]>([]);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const currentProfile = clientProfiles.find(profile => profile.id === clientProfileId);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversation]);

  useEffect(() => {
    const initializeChat = async () => {
      if (conversation.length === 0 && currentProfile) {
        setIsLoading(true);
  
        const aiResponse = await fetchAIResponse({
          profileName: currentProfile?.name || 'Unknown',
          difficulty,
          concerns: currentProfile?.concerns?.length 
            ? currentProfile.concerns 
            : customConcerns,
          conversation: [], // Initial empty conversation for first message
        });        
  
        if (aiResponse?.response) {
          setConversation([{ role: 'client', content: aiResponse.response }]);
        } else {
          setConversation([{ role: 'client', content: 'Hello! How can you help me today?' }]);
        }
  
        setIsLoading(false);
      }
    };
  
    initializeChat();
  }, [currentProfile, difficulty, customConcerns]);  
  
  const handleSubmitResponse = async () => {
    if (response.trim().length < 20) {
      alert('Please provide a more detailed response');
      return;
    }

    const updatedConversation = [...conversation, { role: 'advisor', content: response }];
    setConversation(updatedConversation);
    setResponse('');
    setIsLoading(true);

    const aiResponse = await fetchAIResponse({
      profileName: currentProfile?.name || 'Unknown',
      difficulty,
      concerns: currentProfile?.concerns?.length 
      ? currentProfile.concerns 
      : customConcerns,
      conversation: updatedConversation, // Pass the full conversation thread
    });
    
    if (aiResponse?.response) {
      console.log('chatgpt response,', aiResponse),
        setConversation(prev => [...prev, { role: 'client', content: aiResponse.response }]);
    } else {
      setConversation(prev => [...prev, { role: 'client', content: 'Can you elaborate further?' }]);
    }

    setIsLoading(false);
  };


  if (!currentProfile || !difficulty) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center p-4">
        <h2 className="text-xl font-semibold mb-2">Missing Simulation Data</h2>
        <p className="text-muted-foreground mb-4">Please start the simulation from the beginning.</p>
        <button
          onClick={() => navigate('/client-simulator')}
          className="bg-primary text-primary-foreground px-4 py-2 rounded-md"
        >
          Go Back to Simulator
        </button>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-background flex flex-col">
      <div className="bg-card border-b p-4 flex items-center justify-between shrink-0">
        <Link to="/client-simulator" className="text-muted-foreground hover:text-foreground">← Exit</Link>
        <div className="text-right">
          <h2 className="font-medium text-lg">{currentProfile.name}</h2>
          <p className="text-sm text-muted-foreground">
            {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)} Level
          </p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 relative">
        {conversation.length === 0 && !isLoading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground text-center">
            <h3 className="text-lg font-semibold">Start Chat</h3>
            <p className="text-sm mt-2">Ask a question or start the conversation.</p>
          </div>
        )}

        {conversation.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.role === 'client' ? 'justify-start' : 'justify-end'}`}
          >
            <div
              className={`max-w-[80%] p-3 rounded-lg ${message.role === 'client'
                  ? 'bg-muted'
                  : 'bg-primary text-primary-foreground'
                }`}
            >
              {message.content}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-center items-center text-muted-foreground text-sm">
            <span>Generating response...</span>
            <Loader className="animate-spin w-5 h-5 text-primary ml-2" />
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      <div className="border-t p-4 bg-background shrink-0">
        <div className="flex items-end gap-4">
          <div className="flex w-full">
            <SpeechInput
              value={response}
              onTranscriptChange={setResponse}
              placeholder="Type your response..."
            />
          </div>
          <button
            onClick={handleSubmitResponse}
            className="bg-primary text-primary-foreground px-4 py-2 rounded-md h-12"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
