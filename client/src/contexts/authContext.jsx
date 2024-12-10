import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [userData, setuserData] = useState(null);
  const [isAuthenticated, setisAuthenticated] = useState(false);
  const storeData = JSON.parse(localStorage.getItem("user-data"));

  useEffect(() => {
    if (storeData) {
      const { userToken, user } = storeData;
      setToken(userToken);
      setuserData(user);
      setisAuthenticated(true);
    }
  }, []);

  const login = (newToken, newData) => {
    localStorage.setItem(
      "user-data",
      JSON.stringify({ userToken: newToken, user: newData })
    );

    setToken(newToken);
    setuserData(newData);
    setisAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("user-data");
    setToken(null);
    setuserData(null);
    setisAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        isAuthenticated,
        login,
        logout,
        userData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => useContext(AuthContext);
