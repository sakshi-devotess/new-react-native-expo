import React, { useContext } from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  SafeAreaView,
} from "react-native";
import { colors } from "../config/constants";
import dashboardBgImage from "../../assets/dashboard-background.jpg";
import { AuthContext } from "../contexts/AuthenticatedUserContext";
import { deleteUser } from "../library/utilities/secureStore";
const { width, height } = Dimensions.get("window");

const Dashboard = () => {
  const { setIsAuthenticated, setUser } = useContext(AuthContext);
  const onSignOut = async () => {
    await deleteUser();
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={dashboardBgImage}
        style={styles.headerBackground}
      >
        <View style={styles.topBar}>
          <View>
            <Text style={styles.headerText}>Saas Innova</Text>
          </View>
          <TouchableOpacity
            onPress={async () => await onSignOut()}
            style={styles.settingsButton}
          >
            <Text style={styles.settingsText}>Sign Out</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
  headerBackground: {
    height: height * 0.25,
    paddingHorizontal: width * 0.05,
    paddingVertical: height * 0.02,
    justifyContent: "space-between",
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#fff",
  },
  settingsButton: {
    backgroundColor: "#fff",
    paddingVertical: 6,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  settingsText: {
    color: colors.primary,
    fontWeight: "bold",
  },
  usernameText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default Dashboard;
