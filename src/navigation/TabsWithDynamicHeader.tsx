import React, { useLayoutEffect } from "react";
import {
  getFocusedRouteNameFromRoute,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import TabNavigator from "./TabNavigator";

const routeTitleMap: Record<string, string> = {
  Home: "Home",
  Settings: "menu.appMenu.settings",
};

const TabsWithDynamicHeader = () => {
  const navigation = useNavigation();
  const route = useRoute();

  useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route) ?? "Dashboard";
    const title = routeTitleMap[routeName] || "App";
    navigation.setOptions({ title: title });
  }, [route]);

  return <TabNavigator />;
};

export default TabsWithDynamicHeader;
