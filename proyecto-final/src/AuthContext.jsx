import React, { createContext, useContext, useState } from 'react';


export const AuthContext = createContext();



export const useAuth = () => {
  return useContext(AuthContext);
};

const getProfile = async (accessToken) => {
  const response = await fetch('https://api.escuelajs.co/api/v1/auth/profile', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }

  const userData = await response.json();
  return userData;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
  
    const login = async (userData) => {
      setUser(userData);
  
      const accessToken = userData.access_token;
  
      try {
        const profileData = await getProfile(accessToken);
        setUser(profileData);
        console.log(profileData)
      } catch (error) {
        console.error('Error al obtener la data:', error);
      }
    };
  
    const register = (userData) => {
      setUser(userData);
    };
  
    const logout = () => {
      setUser(null);
    };
  
    return (
      <AuthContext.Provider value={{ user, login, register, logout }}>
        {children}
      </AuthContext.Provider>
    );
  };