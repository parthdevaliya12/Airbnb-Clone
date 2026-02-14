import React, { createContext } from "react";

export const authDataContext = createContext();

const AuthContext = ({ children }) => {

  const serverUrl = "https://airbnb-clone-edzf.onrender.com";

  const value = {
    serverUrl,
  };
  return (
    <>
      <authDataContext.Provider value={value}>
        {children}
      </authDataContext.Provider>
    </>
  );
};

export default AuthContext;
