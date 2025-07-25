import React from "react";
import { View, Alert } from "react-native";
import { colors } from "../config/constants";
import { logout } from "../library/utilities/logoutUser";
import Cell from "../components/Cell/Cell";
import { useNavigation } from "@react-navigation/native";
import { MainStackParamList } from "../types/navigation";
import { StackNavigationProp } from "@react-navigation/stack";

const Account = () => {
  const navigation = useNavigation<StackNavigationProp<MainStackParamList>>();
  const onSignOut = () => {
    logout();
  };

  return (
    <View>
      <Cell
        title="Privacy Policy"
        icon="shield-checkmark-outline"
        tintColor={colors.primary}
        onPress={() => {
          Alert.alert("Privacy Policy Coming Soon");
        }}
        showForwardIcon={false}
      />
      <Cell
        title="Change Mpin"
        icon="key-outline"
        tintColor={colors.primary}
        onPress={() => {
          navigation.navigate("ChangeMpin");
        }}
        showForwardIcon={false}
      />
      <Cell
        title="Logout"
        icon="log-out-outline"
        tintColor={colors.primary}
        onPress={() => {
          Alert.alert(
            "Logout?",
            "Are you sure you want to logout?",
            [
              {
                text: "Logout",
                onPress: () => {
                  onSignOut();
                },
              },
              {
                text: "Cancel",
              },
            ],
            { cancelable: true }
          );
        }}
        showForwardIcon={false}
      />
    </View>
  );
};

export default Account;
