import React from 'react';
import { useAuth } from './AuthContext';

export const Logout = () => {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <button onClick={handleLogout}>Logout</button>
  );
};

