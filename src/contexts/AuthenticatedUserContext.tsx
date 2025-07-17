import React, { createContext, useEffect, useState } from "react";
import { deleteUser, getUser } from "../library/utilities/secureStore";
import { setLogoutFn } from "../library/utilities/logoutUser";
import userApiInstance from "../services/user/user.service";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    (async () => {
      const user = await getUser();
      if (user) {
        const userData = await userApiInstance.getUser(user.id);
        const updatedUser = {
          ...user,
          first_name: userData.first_name,
          last_name: userData.last_name,
          email: userData.email,
        };
        setUser(updatedUser);
      }

      setIsLoading(false);
    })();
  }, []);

  useEffect(() => {
    setLogoutFn(async () => {
      await deleteUser();
      setUser(null);
      setIsAuthenticated(false);
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
