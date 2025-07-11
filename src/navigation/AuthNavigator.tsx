import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AUTH_ROUTES } from "../routes/auth";

const AuthStack = createNativeStackNavigator();

const AuthNavigator = () => {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      {AUTH_ROUTES.map((item) => (
        <AuthStack.Screen key={item.name} {...item} />
      ))}
    </AuthStack.Navigator>
  );
};

export default AuthNavigator;
