import React, { createContext, useContext, useState, useEffect } from 'react';

// Create Auth Context
const AuthContext = createContext();

// Custom hook to use the AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// AuthProvider Component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is logged in on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('netflixUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // Sign up function
  const signUp = (email, password, name) => {
    // In a real app, this would make an API call
    const newUser = {
      id: Date.now(),
      email,
      name,
      createdAt: new Date().toISOString(),
    };
    
    // Store user data
    localStorage.setItem('netflixUser', JSON.stringify(newUser));
    localStorage.setItem('netflixAuth', 'true');
    setUser(newUser);
    
    return { success: true, user: newUser };
  };

  // Login function
  const login = (email, password) => {
    // In a real app, this would validate credentials via API
    const storedUser = localStorage.getItem('netflixUser');
    
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUser(userData);
      localStorage.setItem('netflixAuth', 'true');
      return { success: true, user: userData };
    }
    
    // For demo purposes, create a user if none exists
    const newUser = {
      id: Date.now(),
      email,
      name: email.split('@')[0],
      createdAt: new Date().toISOString(),
    };
    
    localStorage.setItem('netflixUser', JSON.stringify(newUser));
    localStorage.setItem('netflixAuth', 'true');
    setUser(newUser);
    
    return { success: true, user: newUser };
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('netflixAuth');
    setUser(null);
  };

  // Check if user is authenticated
  const isAuthenticated = () => {
    return !!user && localStorage.getItem('netflixAuth') === 'true';
  };

  const value = {
    user,
    loading,
    signUp,
    login,
    logout,
    isAuthenticated,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
