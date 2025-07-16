import TabsWithDynamicHeader from "../navigation/TabsWithDynamicHeader";

export const STACK_ROUTES = {
  MAIN: "Main",
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
];
