import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('token')) return setReady(true);
    api('/auth/me')
      .then(setUser)
      .catch(() => localStorage.removeItem('token'))
      .finally(() => setReady(true));
  }, []);

  const login = (data) => {
    localStorage.setItem('token', data.token);
    setUser(data.user);
    navigate('/');
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/');
  };

  if (!ready) return <div className="center">Loading…</div>;
  return <AuthContext.Provider value={{ user, setUser, login, logout }}>{children}</AuthContext.Provider>;
}
