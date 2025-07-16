import React, { createContext, useEffect, useState } from "react";
import { deleteUser, getUser } from "../library/utilities/secureStore";
import { setLogoutFn } from "../library/utilities/logoutUser";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    (async () => {
      const user = await getUser();
      if (user) {
        setUser(user);
      }

      setIsLoading(false);
    })();
  }, []);

  useEffect(() => {
    setLogoutFn(async () => {
      await deleteUser();
      setUser(null);
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, setUser, isLoading, isAuthenticated, setIsAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
};
