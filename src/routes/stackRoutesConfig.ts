import TabsWithDynamicHeader from "../navigation/TabsWithDynamicHeader";
import Account from "../screens/Account";
import ChangeMpin from "../screens/Auth/ChangeMpin/ChangeMpin";
import Profile from "../screens/Profile/Profile";

export const STACK_ROUTES = {
  MAIN: "Main",
  PROFILE: "Profile",
  ACCOUNT: "Account",
  CHANGE_MPIN: "ChangeMpin",
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
  {
    name: STACK_ROUTES.ACCOUNT,
    component: Account,
    customOptions: () => ({
      headerShown: true,
      title: "Account",
    }),
  },
  {
    name: STACK_ROUTES.CHANGE_MPIN,
    component: ChangeMpin,
    title: "Change MPIN",
  },
];
