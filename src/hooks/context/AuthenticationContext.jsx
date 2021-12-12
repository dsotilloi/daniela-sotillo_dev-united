import React, { useState, useEffect, createContext } from "react";
import { auth, loginConGoogle, logout } from "../../firebase/firebase";

export const AuthenticationContext = createContext();

function AuthenticationProvider({ children }) {

  const [user, setUser] = useState(null);

  useEffect(() => {
      auth.onAuthStateChanged((user) => {
          setUser(user);
        });
  }, []);

  return (
    <AuthenticationContext.Provider
      value={ {user, loginConGoogle, logout} }
    >
      {children}
    </AuthenticationContext.Provider>
  );
}

export default AuthenticationProvider;