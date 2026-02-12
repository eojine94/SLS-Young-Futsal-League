import { createContext, useContext, useState, useCallback } from 'react';
import type { ReactNode } from 'react';

type AuthContextValue = {
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAdmin, setIsAdmin] = useState(false);

  const login = useCallback(async (_email: string, _password: string) => {
    // TODO: Phase 4에서 Supabase Auth 연동
    setIsAdmin(true);
    return true;
  }, []);

  const logout = useCallback(() => {
    // TODO: Phase 4에서 Supabase Auth 연동
    setIsAdmin(false);
  }, []);

  return (
    <AuthContext.Provider value={{ isAdmin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
