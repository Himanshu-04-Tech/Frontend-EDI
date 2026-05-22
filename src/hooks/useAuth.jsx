import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for active session in localStorage
    const savedSession = localStorage.getItem('credit_risk_session');
    if (savedSession) {
      try {
        setUser(JSON.parse(savedSession));
      } catch (e) {
        localStorage.removeItem('credit_risk_session');
      }
    }
    setLoading(false);
  }, []);

  const login = (username, password, rememberMe) => {
    return new Promise((resolve, reject) => {
      // Simulate API latency
      setTimeout(() => {
        const users = JSON.parse(localStorage.getItem('credit_risk_users') || '[]');
        const foundUser = users.find(u => u.username === username);

        if (!foundUser) {
          reject(new Error('User not found. Please register first.'));
          return;
        }

        if (foundUser.password !== password) {
          reject(new Error('Incorrect password.'));
          return;
        }

        const sessionUser = { username, lastLogin: new Date().toISOString() };
        setUser(sessionUser);
        
        // Save session if rememberMe, otherwise session storage could be used (using localStorage for simplicity as requested)
        localStorage.setItem('credit_risk_session', JSON.stringify(sessionUser));
        
        resolve(sessionUser);
      }, 800);
    });
  };

  const register = (username, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const users = JSON.parse(localStorage.getItem('credit_risk_users') || '[]');
        const userExists = users.some(u => u.username === username);

        if (userExists) {
          reject(new Error('Username already exists. Please choose another one.'));
          return;
        }

        const newUser = { username, password, createdAt: new Date().toISOString() };
        users.push(newUser);
        localStorage.setItem('credit_risk_users', JSON.stringify(users));

        resolve({ success: true });
      }, 800);
    });
  };

  const logout = () => {
    localStorage.removeItem('credit_risk_session');
    setUser(null);
  };

  const value = {
    user,
    loading,
    isAuthenticated: !!user,
    login,
    register,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
