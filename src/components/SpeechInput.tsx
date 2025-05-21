import React, { useEffect, useState, useRef } from 'react';

interface SpeechInputProps {
  onTranscriptChange: (transcript: string) => void;
  placeholder?: string;
  isTextArea?: boolean;
  value: string;
  stopListening?: boolean; // ✅ External control prop
}

// Extend the Window type to include webkitSpeechRecognition
declare global {
  interface Window {
    webkitSpeechRecognition: any;
    SpeechRecognition: any;
  }
}

const SpeechInput: React.FC<SpeechInputProps> = ({
  onTranscriptChange,
  placeholder = 'Click the microphone to start speaking...',
  isTextArea = false,
  value,
  stopListening = false,
}) => {
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  // Initialize speech recognition once
  useEffect(() => {
    const SpeechRecognitionConstructor =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (SpeechRecognitionConstructor) {
      const recognition: SpeechRecognition = new SpeechRecognitionConstructor();
      recognition.continuous = true;
      recognition.interimResults = true;

      recognition.onresult = (event: SpeechRecognitionEvent) => {
        const transcript = Array.from(event.results)
          .map(result => result[0])
          .map(result => result.transcript)
          .join('');
        onTranscriptChange(transcript);
      };

      recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    }

    return () => {
      recognitionRef.current?.stop();
    };
  }, [onTranscriptChange]);

  // Stop listening if triggered externally (e.g. after submission)
  useEffect(() => {
    if (stopListening && isListening) {
      recognitionRef.current?.stop();
    }
  }, [stopListening, isListening]);

  const toggleListening = () => {
    const recognition = recognitionRef.current;
    if (!recognition) return;

    if (isListening) {
      recognition.stop();
    } else {
      recognition.start();
    }

    setIsListening(!isListening);
  };

  const InputComponent = isTextArea ? 'textarea' : 'input';

  return (
    <div className="relative w-full">
      <InputComponent
        className={`w-full border rounded-lg bg-background p-4 pr-12 ${isTextArea ? 'h-64 md:h-48' : 'h-12'}`}
        placeholder={placeholder}
        value={value}
        onChange={e => onTranscriptChange(e.target.value)}
        {...(isTextArea ? { rows: 8 } : {})}
      />
      <button
        onClick={toggleListening}
        className={`absolute right-3 top-3 p-2 rounded-full transition-colors ${
          isListening ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'
        }`}
        title={isListening ? 'Stop recording' : 'Start recording'}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
          <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
          <line x1="12" x2="12" y1="19" y2="22" />
        </svg>
      </button>
    </div>
  );
};

export default SpeechInput;