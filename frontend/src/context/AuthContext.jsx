import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const ROLE_DEFAULT_ROUTES = {
  field_user: '/site-manager',
  controller: '/control-tower',
  authority: '/portfolio',
};

export const ROLE_LABELS = {
  field_user: 'Field User / Site Manager',
  controller: 'Project Controller',
  authority: 'Authority / Administrator',
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('pulse_auth_user') || sessionStorage.getItem('pulse_auth_user');
      if (!savedUser) return null;
      const parsed = JSON.parse(savedUser);
      // Migrate old or invalid role values
      if (!parsed.role || !ROLE_DEFAULT_ROUTES[parsed.role]) {
        parsed.role = 'controller';
        parsed.roleLabel = ROLE_LABELS.controller;
      }
      return parsed;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('pulse_auth_user', JSON.stringify(user));
      sessionStorage.setItem('pulse_auth_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('pulse_auth_user');
      sessionStorage.removeItem('pulse_auth_user');
    }
  }, [user]);

  const login = (role = 'controller', userId = 'user@projectpulse.in') => {
    const assignedRole = (role && ROLE_DEFAULT_ROUTES[role]) ? role : 'controller';
    const authData = {
      userId: userId || 'user@projectpulse.in',
      role: assignedRole,
      roleLabel: ROLE_LABELS[assignedRole] || 'Project Controller',
      loggedInAt: new Date().toISOString(),
    };
    setUser(authData);
    return ROLE_DEFAULT_ROUTES[assignedRole];
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, role: user?.role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
