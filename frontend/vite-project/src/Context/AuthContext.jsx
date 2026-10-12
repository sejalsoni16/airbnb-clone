import React, { createContext, useState } from "react";

export const authDataContext = createContext();

function AuthContextProvider({ children }) {
  let serverUrl = "http://localhost:8000";

  let[loading,setLoading] = useState(false)

  let value = {
    serverUrl,
    loading,setLoading
  };

  return (
    <authDataContext.Provider value={value}>
      {children}
    </authDataContext.Provider>
  );
}

export default AuthContextProvider;