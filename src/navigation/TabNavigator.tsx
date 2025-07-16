import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../config/constants";
import { TAB_ROUTES } from "../routes/tabRoutesConfigs";

const Tab = createBottomTabNavigator();
const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: "gray",
        headerShown: false,
        presentation: "modal",
      })}
    >
      {TAB_ROUTES.map(
        ({ name, component: Component, label, icon, focusedIcon }) => (
          <Tab.Screen
            key={name}
            name={name}
            options={{
              tabBarLabel: label,
              tabBarIcon: ({ color, size, focused }) => (
                <Ionicons
                  name={focused ? focusedIcon : icon}
                  size={size}
                  color={color}
                />
              ),
            }}
          >
            {(props) => <Component {...props} />}
          </Tab.Screen>
        )
      )}
    </Tab.Navigator>
  );
};
export default TabNavigator;
