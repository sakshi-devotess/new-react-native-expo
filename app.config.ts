import "dotenv/config";
export default {
  expo: {
    name: "Boilerplate",
    slug: "Boilerplate",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    newArchEnabled: true,
    splash: {
      image: "./assets/splash-icon.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff",
    },
    ios: {
      supportsTablet: true,
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#ffffff",
      },
      edgeToEdgeEnabled: true,
      package: "com.saasinnova.Boilerplate",
    },
    web: {
      favicon: "./assets/favicon.png",
    },
    extra: {
      apiUrl: process.env.REACT_NATIVE_APP_PUBLIC_URL,
      eas: {
        projectId: "0ca26df0-9fe6-4351-b89e-7737f316ad27",
      },
    },
  },
};
