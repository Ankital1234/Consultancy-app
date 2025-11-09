import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'consultant' | 'company';
  profilePicture?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string, role: 'user' | 'consultant' | 'company', serverUser?: Partial<User> & { id?: string }) => Promise<void>;
  logout: () => void;
  register: (name: string, email: string, password: string, role: 'user' | 'consultant' | 'company') => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  // Check for existing session on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email: string, password: string, role: 'user' | 'consultant' | 'company', serverUser?: Partial<User> & { id?: string }) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const finalUser: User = {
      id: serverUser?.id || '1',
      name: serverUser?.name || 'Demo User',
      email: serverUser?.email || email,
      role: (serverUser?.role as 'user' | 'consultant' | 'company') || role,
      profilePicture: serverUser?.profilePicture || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
    };
    setUser(finalUser);
    localStorage.setItem('user', JSON.stringify(finalUser));
  };

  const register = async (name: string, email: string, password: string, role: 'user' | 'consultant' | 'company') => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const mockUser: User = {
      id: '1',
      name,
      email,
      role,
      profilePicture: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
    };
    
    setUser(mockUser);
    localStorage.setItem('user', JSON.stringify(mockUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
