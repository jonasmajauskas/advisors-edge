import React, { useState } from 'react';
import GoogleLoginButton from './GoogleLoginButton'

interface LoginModalProps {
  onClose: () => void;
  onLogin: (email: string, password: string) => Promise<void>;
  onSignUp: (email: string, password: string, name: string) => Promise<void>;
  onLogout: () => void;
  user: { name: string; email: string } | null;
}

const LoginModal: React.FC<LoginModalProps> = ({ onClose, onLogin, onSignUp, onLogout, user }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showConfirmationMessage, setShowConfirmationMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');

    try {
      if (isSignUp) {
        await onSignUp(email, password, name);
        setShowConfirmationMessage(true);
      } else {
        await onLogin(email, password);
        resetForm();
        onClose();
        window.scrollTo({ top: 0, behavior: 'smooth' }); // ✅ Scroll to top after login
      }
    } catch (error: any) {
      setErrorMessage(error?.message || 'Authentication failed. Please try again.');
      console.error('Auth Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setName('');
    setIsSignUp(false);
    setShowConfirmationMessage(false);
    setErrorMessage('');
  };

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center px-4">
      <div className="bg-card border rounded-lg shadow-lg p-6 w-full max-w-lg">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">
            {user ? `Welcome, ${user.name}` : isSignUp ? 'Create Account' : 'Welcome Back'}
          </h2>
          <button
            onClick={() => {
              onClose();
              resetForm();
              window.scrollTo({ top: 0, behavior: 'smooth' }); // ✅ Scroll to top after signup confirmation close
            }}
            className="text-muted-foreground hover:text-foreground text-l"
          >
            ✕
          </button>
        </div>

        <div className="mb-6">
            <GoogleLoginButton/>
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-card px-2 text-muted-foreground">
                  or continue with
                </span>
              </div>
            </div>
          </div>

        {showConfirmationMessage ? (
          <div className="text-center space-y-6">
            <p className="text-muted-foreground text-lg">
              ✅ Account Created! Please check your email to confirm signup.
            </p>
            <button
              onClick={() => {
                onClose();
                resetForm();
              }}
              className="w-full bg-primary text-primary-foreground py-2 px-4 rounded-md hover:bg-primary/90 transition-colors"
            >
              Close
            </button>
          </div>
        ) : (
          <>
            <form onSubmit={handleSubmit} className="space-y-4">
              {isSignUp && (
                <div>
                  <label className="block text-sm font-medium mb-2">Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-2 rounded-md border bg-background"
                    placeholder="John Doe"
                    required
                  />
                </div>
              )}
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2 rounded-md border bg-background"
                  placeholder="you@example.com"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-2 rounded-md border bg-background"
                  placeholder="••••••••"
                  required
                />
              </div>

              {errorMessage && (
                <p className="text-destructive text-center text-sm">{errorMessage}</p>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-primary text-primary-foreground py-2 px-4 rounded-md hover:bg-primary/90 transition-colors flex items-center justify-center"
              >
                {isLoading ? (
                  <span className="animate-spin border-2 border-t-transparent border-white rounded-full w-5 h-5"></span>
                ) : isSignUp ? 'Create Account' : 'Sign In'}
              </button>
            </form>

            <p className="mt-4 text-center text-sm text-muted-foreground">
              {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
              <button
                onClick={() => {
                  setIsSignUp(!isSignUp);
                  setErrorMessage(''); // ✅ Clear error when switching forms
                }}
                className="text-primary hover:underline"
              >
                {isSignUp ? 'Sign In' : 'Create one'}
              </button>
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default LoginModal;