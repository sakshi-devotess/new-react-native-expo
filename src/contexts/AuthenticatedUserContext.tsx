import React, {
  createContext,
  ReactNode,
  useEffect,
  useMemo,
  useState,
} from "react";
import { deleteUser, getUser } from "../library/utilities/secureStore";
import { setLogoutFn } from "../library/utilities/logoutUser";
import userApiInstance from "../services/user/user.service";

interface AuthProviderProps {
  readonly children: ReactNode;
}

interface IAuthContextType {
  readonly user: any;
  readonly setUser: React.Dispatch<React.SetStateAction<any>>;
  readonly isLoading: boolean;
  readonly isAuthenticated: boolean;
  readonly setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AuthContext = createContext<IAuthContextType>({
  user: null,
  setUser: () => {},
  isLoading: true,
  isAuthenticated: false,
  setIsAuthenticated: () => {},
});

export const AuthProvider = ({ children }: AuthProviderProps) => {
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
          file_id: userData.file_id,
        };
        setUser(updatedUser);
      }

      setIsLoading(false);
    })();
  }, [isAuthenticated]);

  useEffect(() => {
    setLogoutFn(async () => {
      await deleteUser();
      setUser(null);
      setIsAuthenticated(false);
    });
  }, []);

  const authContextValue = useMemo(
    () => ({
      user,
      setUser,
      isLoading,
      isAuthenticated,
      setIsAuthenticated,
    }),
    [user, isLoading, isAuthenticated]
  );
  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};
