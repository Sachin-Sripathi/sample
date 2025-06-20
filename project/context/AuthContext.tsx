import React, { createContext, useState, useContext, ReactNode } from 'react';
import { User } from '@/types/user';
import { router } from 'expo-router';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: Partial<User>, password: string) => Promise<void>;
  logout: () => void;
  clearError: () => void;
}

const defaultValue: AuthContextType = {
  user: null,
  isLoading: false,
  error: null,
  login: async () => {},
  register: async () => {},
  logout: () => {},
  clearError: () => {},
};

const AuthContext = createContext<AuthContextType>(defaultValue);

// Sample user data for demo purposes
const sampleUsers: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    bio: 'Software developer passionate about mobile apps',
    interests: ['Coding', 'Hiking', 'Photography'],
    profileImage: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
    isVisible: true,
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    bio: 'Digital artist and music enthusiast',
    interests: ['Art', 'Music', 'Travel'],
    profileImage: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg',
    isVisible: true,
  },
];

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Find user in sample data
      const foundUser = sampleUsers.find(u => u.email === email);
      
      if (foundUser && password === 'password') { // In a real app, use proper password hashing
        setUser(foundUser);
        router.replace('/(tabs)');
      } else {
        setError('Invalid email or password');
      }
    } catch (err) {
      setError('An error occurred during login');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: Partial<User>, password: string) => {
    setIsLoading(true);
    setError(null);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Create new user
      const newUser: User = {
        id: Math.random().toString(36).substring(2, 9),
        name: userData.name || '',
        email: userData.email || '',
        bio: userData.bio || '',
        interests: userData.interests || [],
        profileImage: userData.profileImage,
        isVisible: true,
      };
      
      // In a real app, save the user to a database
      setUser(newUser);
      // Navigate back to login after successful registration
      router.replace('/(auth)');
    } catch (err) {
      setError('An error occurred during registration');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    router.replace('/(auth)');
  };

  const clearError = () => {
    setError(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        error,
        login,
        register,
        logout,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);