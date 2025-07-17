import { ComponentProps } from "react";
import { Ionicons } from "@expo/vector-icons";
import Dashboard from "../screens/Dashboard";
import Settings from "../screens/Settings";

export const TAB_ROUTE = {
  DASHBOARD: "Dashboard",
  SETTINGS: "Settings",
};
type IoniconName = ComponentProps<typeof Ionicons>["name"];

export interface TabRouteConfig {
  name: (typeof TAB_ROUTE)[keyof typeof TAB_ROUTE];
  component: React.ComponentType<any>;
  label: string;
  icon: IoniconName;
  focusedIcon?: IoniconName;
}

export const TAB_ROUTES: TabRouteConfig[] = [
  {
    name: TAB_ROUTE.DASHBOARD,
    component: Dashboard,
    label: "Home",
    icon: "home",
    focusedIcon: "home-outline",
  },
  {
    name: TAB_ROUTE.SETTINGS,
    component: Settings,
    label: "Settings",
    icon: "settings",
    focusedIcon: "settings-outline",
  },
];
