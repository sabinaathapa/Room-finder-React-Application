import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);

  const checkAuthentication = () => {
    const accessToken = Cookies.get('access_token');
    setAuthenticated(accessToken !== undefined && accessToken !== null);
  };

  return (
    <AuthContext.Provider value={{ authenticated, setAuthenticated, checkAuthentication }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
