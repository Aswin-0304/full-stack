import React, { createContext, useState, useCallback, useEffect } from 'react';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Initialize user from localStorage on mount
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('currentUser');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (err) {
      console.error('Failed to load user from storage:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Get all registered users from localStorage
  const getAllUsers = useCallback(() => {
    try {
      const users = localStorage.getItem('registeredUsers');
      return users ? JSON.parse(users) : [];
    } catch {
      return [];
    }
  }, []);

  // Login function
  const login = useCallback((username, password) => {
    setError(null);
    try {
      // For demo: Allow any username/password combo with selected role
      // In production, this would call an API
      if (!username || !password) {
        setError('Username and password are required');
        return false;
      }

      const userData = {
        id: Date.now(),
        username,
        role: 'Viewer', // Default role, can be changed on login
        loginTime: new Date().toISOString(),
      };

      localStorage.setItem('currentUser', JSON.stringify(userData));
      setUser(userData);
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    }
  }, []);

  // Register function
  const register = useCallback((username, password, email) => {
    setError(null);
    try {
      if (!username || !password || !email) {
        setError('All fields are required');
        return false;
      }

      const users = getAllUsers();

      // Check if user already exists
      if (users.some(u => u.username === username)) {
        setError('Username already exists');
        return false;
      }

      const newUser = {
        id: Date.now(),
        username,
        password, // In production, this should be hashed
        email,
        role: 'Viewer',
        createdAt: new Date().toISOString(),
      };

      users.push(newUser);
      localStorage.setItem('registeredUsers', JSON.stringify(users));
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    }
  }, [getAllUsers]);

  // Login with role selection
  const loginWithRole = useCallback((username, password, role) => {
    setError(null);
    try {
      if (!username || !password) {
        setError('Username and password are required');
        return false;
      }

      const userData = {
        id: Date.now(),
        username,
        role: role || 'Viewer',
        loginTime: new Date().toISOString(),
      };

      localStorage.setItem('currentUser', JSON.stringify(userData));
      setUser(userData);
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    }
  }, []);

  // Logout function
  const logout = useCallback(() => {
    try {
      localStorage.removeItem('currentUser');
      setUser(null);
      setError(null);
    } catch (err) {
      console.error('Logout error:', err);
    }
  }, []);

  // Update user role
  const updateUserRole = useCallback((newRole) => {
    try {
      const updatedUser = { ...user, role: newRole };
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));
      setUser(updatedUser);
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    }
  }, [user]);

  const value = {
    user,
    loading,
    error,
    login,
    register,
    loginWithRole,
    logout,
    updateUserRole,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
