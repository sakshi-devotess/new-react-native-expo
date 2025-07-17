import TabsWithDynamicHeader from "../navigation/TabsWithDynamicHeader";
import Profile from "../screens/Profile/Profile";

export const STACK_ROUTES = {
  MAIN: "Main",
  PROFILE: "Profile",
};

export interface DrawerRouteConfig {
  name: string;
  component: React.ComponentType<any>;
  title?: string;
  customOptions?: () => {
    headerShown?: boolean;
  };
}

export const STACK_NAVIGATION_ROUTES: DrawerRouteConfig[] = [
  {
    name: STACK_ROUTES.MAIN,
    component: TabsWithDynamicHeader,
    customOptions: () => ({
      headerShown: false,
    }),
  },
  {
    name: STACK_ROUTES.PROFILE,
    component: Profile,
    customOptions: () => ({
      headerShown: true,
      title: "Profile",
    }),
  },
];
