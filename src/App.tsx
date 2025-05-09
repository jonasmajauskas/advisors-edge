import React, { useState, useEffect } from 'react';
import Home from './components/Home';
import ExplanationMode from './components/ExplanationMode';
import ClientSimulator from './components/ClientSimulator';
import FlashCardMode from './components/FlashCardMode';
import LoginModal from './components/LoginModal';
import { UserRoundCheck, User } from 'lucide-react';
import { supabase } from './lib/supabaseClient';

export function App() {
  const [currentMode, setCurrentMode] = useState('home');
  const [difficulty, setDifficulty] = useState('medium');
  const [isMobile, setIsMobile] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // ✅ Check for existing Supabase session on app load
  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      const sessionUser = data.session?.user;
      if (sessionUser) {
        setUser({
          name: sessionUser.user_metadata?.name || sessionUser.email?.split('@')[0] || 'User',
          email: sessionUser.email || '',
        });
      }
    };

    getSession();

    // ✅ Listen for real-time auth state changes
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      const sessionUser = session?.user;
      if (sessionUser) {
        setUser({
          name: sessionUser.user_metadata?.name || sessionUser.email?.split('@')[0] || 'User',
          email: sessionUser.email || '',
        });
      } else {
        setUser(null);
      }
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  const handleLogin = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      alert(`Login failed: ${error.message}`);
    } else if (data.session) {
      const sessionUser = data.session.user;
      setUser({
        name: sessionUser.user_metadata?.name || sessionUser.email?.split('@')[0] || 'User',
        email: sessionUser.email || '',
      });
      setShowLoginModal(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setShowLoginModal(false);
  };

  // Add this with handleLogin and handleLogout

const handleSignUp = async (email: string, password: string, name: string) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { name } },
  });

  if (error) {
    alert(`Sign Up failed: ${error.message}`);
  } else if (data.session) {
    const sessionUser = data.session.user;
    setUser({
      name: name || sessionUser.email?.split('@')[0] || 'User',
      email: sessionUser.email || '',
    });
    setShowLoginModal(false);
  }
};

  return (
    <div className="min-h-screen bg-background w-full">
      <div className="container py-6 px-4 max-w-6xl mx-auto">
        {/* ✅ Top Nav */}
        {(!isMobile || (isMobile && currentMode === 'home')) && (
          <header className="mb-8 flex items-center justify-between">
            <h1 className="text-3xl font-bold text-primary">AdvisorsEdge</h1>
            <button
              onClick={() => (user ? handleLogout() : setShowLoginModal(true))}
              className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
              aria-label={user ? 'Logout' : 'Login or Sign Up'}
            >
              {user ? (
                <>
                  <UserRoundCheck className="w-6 h-6 text-green-500" />
                  <span>Logout</span>
                </>
              ) : (
                <>
                  <User className="w-6 h-6" />
                  <span>Login</span>
                </>
              )}
            </button>
          </header>
        )}

        {/* ✅ Page Content */}
        {currentMode === 'home' && (
          <Home
            onSelectMode={setCurrentMode}
            onNavigateToAuth={() => setShowLoginModal(true)}
          />
        )}

        {currentMode === 'explanation' && (
          <ExplanationMode
            difficulty={difficulty}
            setDifficulty={setDifficulty}
            onBack={() => setCurrentMode('home')}
          />
        )}

        {currentMode === 'client' && (
          <ClientSimulator
            difficulty={difficulty}
            setDifficulty={setDifficulty}
            onBack={() => setCurrentMode('home')}
          />
        )}

        {currentMode === 'flashcard' && (
          <FlashCardMode onBack={() => setCurrentMode('home')} />
        )}
      </div>

      {/* ✅ Show Login Modal */}
      {showLoginModal && (
        <LoginModal
          onClose={() => setShowLoginModal(false)}
          onSignUp={handleSignUp}
          onLogin={handleLogin}
          onLogout={handleLogout}
          user={user}
        />
      )}
    </div>
  );
}