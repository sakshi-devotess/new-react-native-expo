import React from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  SafeAreaView,
  Alert,
} from "react-native";
import { colors } from "../config/constants";
import dashboardBgImage from "../../assets/dashboard-background.jpg";
import { Ionicons } from "@expo/vector-icons";
import { logout } from "../library/utilities/logoutUser";
const { width, height } = Dimensions.get("window");

const Dashboard = () => {
  const onLogOut = () => {
    Alert.alert(
      "Log Out",
      "Are you sure you want to log out?",
      [
        {
          text: "Log Out",
          style: "destructive",
          onPress: async () => {
            await logout();
          },
        },
        {
          text: "Cancel",
          style: "cancel",
        },
      ],
      { cancelable: true }
    );
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
            onPress={async () => onLogOut()}
            style={styles.settingsButton}
          >
            <Text style={styles.settingsText}>Log Out</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
      <View style={styles.iconRow}>
        <Text style={styles.sectionTitle}>Welcome to Saas Innova</Text>
      </View>
      <View style={styles.iconRow}>
        <TouchableOpacity style={styles.iconItem}>
          <View style={styles.iconBackground}>
            <Ionicons name="calendar" size={32} color="black" />
          </View>
          <Text style={styles.iconLabel}>Book</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.iconItem}>
          <View style={styles.iconBackground}>
            <Ionicons name="people-circle" size={32} color="black" />
          </View>
          <Text style={styles.iconLabel}>Community</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.iconItem}>
          <View style={styles.iconBackground}>
            <Ionicons name="checkmark-circle" size={32} color="black" />
          </View>
          <Text style={styles.iconLabel}>Calender</Text>
        </TouchableOpacity>
      </View>
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
  iconRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: width * 0.9,
    alignSelf: "center",
    marginTop: height * 0.03,
  },
  iconItem: {
    alignItems: "center",
  },
  iconLabel: {
    fontSize: 14,
    fontWeight: "600",
    marginTop: 5,
  },
  iconBackground: {
    backgroundColor: colors.grey,
    padding: 12,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },
});

export default Dashboard;
