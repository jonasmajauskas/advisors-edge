import React, { useEffect, useState, Component } from 'react';
interface SpeechInputProps {
  onTranscriptChange: (transcript: string) => void;
  placeholder?: string;
  isTextArea?: boolean;
  value: string;
}
const SpeechInput: React.FC<SpeechInputProps> = ({
  onTranscriptChange,
  placeholder = 'Click the microphone to start speaking...',
  isTextArea = false,
  value
}) => {
  const [isListening, setIsListening] = useState(false);
  const [speechRecognition, setSpeechRecognition] = useState<SpeechRecognition | null>(null);
  useEffect(() => {
    if (window.SpeechRecognition || window.webkitSpeechRecognition) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.onresult = event => {
        const transcript = Array.from(event.results).map(result => result[0]).map(result => result.transcript).join('');
        onTranscriptChange(transcript);
      };
      recognition.onerror = event => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };
      recognition.onend = () => {
        setIsListening(false);
      };
      setSpeechRecognition(recognition);
    }
    return () => {
      if (speechRecognition) {
        speechRecognition.stop();
      }
    };
  }, []);
  const toggleListening = () => {
    if (!speechRecognition) return;
    if (isListening) {
      speechRecognition.stop();
    } else {
      speechRecognition.start();
    }
    setIsListening(!isListening);
  };
  const InputComponent = isTextArea ? 'textarea' : 'input';
  return <div className="relative w-full">
<InputComponent 
  className={`w-full border rounded-lg bg-background p-4 pr-12 ${isTextArea ? 'h-64 md:h-48' : 'h-12'}`} 
  placeholder={placeholder} 
  value={value} 
  onChange={e => onTranscriptChange(e.target.value)} 
  {...isTextArea ? { rows: 8 } : {}} 
/>
      <button onClick={toggleListening} className={`absolute right-3 top-3 p-2 rounded-full transition-colors ${isListening ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'}`} title={isListening ? 'Stop recording' : 'Start recording'}>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
          <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
          <line x1="12" x2="12" y1="19" y2="22" />
        </svg>
      </button>
    </div>;
};
export default SpeechInput;