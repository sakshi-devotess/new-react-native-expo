import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AuthNavigator from "./AuthNavigator";
import AppRoutesNavigator from "./AppRoutesNavigator";
import { AuthContext } from "../contexts/AuthenticatedUserContext";
import Loader from "../components/Loader";
const RootNavigator = () => {
  const { isAuthenticated, isLoading } = useContext(AuthContext);
  if (isLoading) return <Loader size="small" loading={isLoading} />;

  return (
    <NavigationContainer>
      {isAuthenticated ? <AppRoutesNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

export default RootNavigator;
