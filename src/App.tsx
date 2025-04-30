import React, { useState } from 'react';
import Home from './components/Home';
import ExplanationMode from './components/ExplanationMode';
import ClientSimulator from './components/ClientSimulator';
import FlashCardMode from './components/FlashCardMode';
export function App() {
  const [currentMode, setCurrentMode] = useState('home');
  const [difficulty, setDifficulty] = useState('medium');
  return <div className="min-h-screen bg-background w-full">
      <div className="container py-8 px-4 max-w-6xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-primary">FAA Trainer</h1>
          <p className="text-muted-foreground">
            Improve your financial communication skills
          </p>
        </header>
        {currentMode === 'home' && <Home onSelectMode={setCurrentMode} />}
        {currentMode === 'explanation' && <ExplanationMode difficulty={difficulty} setDifficulty={setDifficulty} onBack={() => setCurrentMode('home')} />}
        {currentMode === 'client' && <ClientSimulator difficulty={difficulty} setDifficulty={setDifficulty} onBack={() => setCurrentMode('home')} />}
        {currentMode === 'flashcard' && <FlashCardMode onBack={() => setCurrentMode('home')} />}
      </div>
    </div>;
}