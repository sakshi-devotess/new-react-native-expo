import { createStackNavigator } from "@react-navigation/stack";
import { STACK_NAVIGATION_ROUTES } from "../routes/stackRoutesConfig";

const Stack = createStackNavigator();

const AppRoutesNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: true }}>
      {STACK_NAVIGATION_ROUTES.map(
        ({ name, component: Component, title, customOptions }) => (
          <Stack.Screen
            key={name}
            name={name}
            options={() => ({
              title: title || "",
              ...(customOptions?.() || {}),
            })}
          >
            {(props) => <Component {...props} />}
          </Stack.Screen>
        )
      )}
    </Stack.Navigator>
  );
};

export default AppRoutesNavigator;
