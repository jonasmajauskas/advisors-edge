import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

interface UserType {
  name: string;
  email: string;
  [key: string]: any; // Additional fields from users table
}

interface AuthContextType {
  user: UserType | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
  loginWithGoogle: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchOrCreateUserData = async (userId: string, email: string, name = 'User') => {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('userId', userId)
      .single();

    if (data) return data;

    console.log('fetchOrCreateUserData data', data)

    if (error && (error.code === 'PGRST116' || error.message.includes('Results contain 0 rows'))) {
      console.log('Creating new user entry:', userId, email, name);
      const { data: insertData, error: insertError } = await supabase
        .from('users')
        .upsert([{ userId }], { onConflict: 'userId' }) // ✅ Prevent duplicate inserts
        .select()
        .single();

      if (insertError) {
        console.error('Error inserting user into users table:', insertError.message);
        return null;
      }

      return insertData;
    }

    if (error) {
      console.error('Error fetching user data from users table:', error.message);
    }

    return null;
  };

  const fetchUser = async () => {
    const { data, error } = await supabase.auth.getUser();

    if (error) {
      console.error('Error fetching session user:', error.message);
      setUser(null);
    } else if (data.user) {
      const sessionUser = data.user;
      const userId = sessionUser.id;
      const email = sessionUser.email || '';
      const name = sessionUser.user_metadata?.name || email.split('@')[0] || 'User';

      const userData = await fetchOrCreateUserData(userId, email, name);

      setUser({
        name: userData?.name || name,
        email,
        ...userData,
      });
    } else {
      setUser(null);
    }

    setLoading(false);
  };

  useEffect(() => {
    const init = async () => {
      await fetchUser();
    };
    init();

    const { data: subscription } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'INITIAL_SESSION') return; // ✅ Avoid redundant fetch
      if (session?.user) {
        fetchUser();
      } else {
        setUser(null);
      }
    });

    return () => subscription.subscription.unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw new Error(error.message);
    await fetchUser();
  };

  const signup = async (email: string, password: string, name: string) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { name } },
    });

    if (error) throw new Error(error.message);
    await fetchUser();
  };

  const loginWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/home`, // ✅ Ensure this matches in Supabase Auth Redirect URLs
      },
    });

    if (error) throw new Error(error.message);
    // Redirect will handle session restoration automatically
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  // Optional: Remove if you want to show the app immediately without waiting for auth check
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-muted-foreground">Logging in...</p>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, loginWithGoogle }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};