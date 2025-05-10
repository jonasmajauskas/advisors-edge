import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import Home from './components/Home';
import SiePrep from './components/SiePrep';
import LoginModal from './components/LoginModal';
import { UserRoundCheck, User } from 'lucide-react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { Navigate } from 'react-router-dom';

function AppHeader({ isMobile }: { isMobile: boolean }) {
  const { pathname } = useLocation();
  const { user, logout, login, signup } = useAuth(); // ✅ Import actual handlers from context
  const [showLoginModal, setShowLoginModal] = useState(false);

  const shouldShowHeader = !isMobile || (isMobile && (pathname === '/' || pathname === '/home'));

  return shouldShowHeader ? (
    <header className="mb-8 flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold text-primary">
          <Link to="/home">AdvisorsEdge</Link>
        </h1>
        <p className="text-muted-foreground">
          Train smarter. Advise better.
        </p>
      </div>
      <button
        onClick={() => (user ? logout() : setShowLoginModal(true))}
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

      {showLoginModal && (
        <LoginModal
          onClose={() => setShowLoginModal(false)}
          onSignUp={signup}  // ✅ Correct handlers provided
          onLogin={login}
          onLogout={logout}
          user={user}
        />
      )}
    </header>
  ) : null;
}


function AppContent() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  return (
    <Router>
      <div className="min-h-screen bg-background w-full">
        <div className="container py-6 px-4 max-w-6xl mx-auto">
          <AppHeader isMobile={isMobile} />

          <Routes>
            <Route path="/" element={<Navigate to="/home" replace />} />
            <Route path="/home" element={<Home />} />
            <Route path="/sie-prep" element={<SiePrep />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}