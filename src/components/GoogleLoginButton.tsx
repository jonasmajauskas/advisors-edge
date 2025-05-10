import React from 'react';
import { supabase } from '../lib/supabaseClient'; // Adjust the path to your supabase client

interface GoogleLoginButtonProps {
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

const GoogleLoginButton: React.FC<GoogleLoginButtonProps> = ({ onSuccess, onError }) => {
  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
    });

    if (error) {
      console.error('Google Login Error:', error.message);
      onError?.(error.message);
    } else {
      onSuccess?.();
    }
  };

  return (
    <button
      onClick={handleGoogleLogin}
      className="w-full bg-secondary text-foreground py-2 px-4 rounded-md hover:bg-secondary/90 transition-colors flex items-center justify-center gap-2"
    >
      <img
        src="https://www.svgrepo.com/show/475656/google-color.svg"
        alt="Google Icon"
        className="w-5 h-5"
      />
      <span>Continue with Google</span>
    </button>
  );
};

export default GoogleLoginButton;
