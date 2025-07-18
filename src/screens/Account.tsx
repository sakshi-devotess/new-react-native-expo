import React, { useContext } from "react";
import { View, Alert } from "react-native";
import { colors } from "../config/constants";
import { logout } from "../library/utilities/logoutUser";
import Cell from "../components/Cell/Cell";
import { useNavigation } from "@react-navigation/native";

const Account = () => {
  const navigation = useNavigation();
  const onSignOut = () => {
    logout();
  };

  return (
    <View>
      <Cell
        title="Privacy Policy"
        icon="shield-checkmark-outline"
        tintColor={colors.grey}
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
        tintColor={colors.grey}
        onPress={() => {
          Alert.alert(
            "Logout?",
            "You have to login again",
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
