import React, { useContext } from "react";
import { View, StyleSheet } from "react-native";
import { colors } from "../config/constants";
import { useNavigation } from "@react-navigation/native";
import Cell from "../components/Cell/Cell";
import ContactRow from "../components/ContactRow/ContactRow";
import { AuthContext } from "../contexts/AuthenticatedUserContext";
import { getUserName } from "../library/utilities/helperFunction";
import { StackNavigationProp } from "@react-navigation/stack";
import { MainStackParamList } from "../types/navigation";

const Settings = () => {
  const navigation = useNavigation<StackNavigationProp<MainStackParamList>>();
  const { user } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <ContactRow
        name={getUserName(user)}
        style={styles.contactRow}
        onPress={() => {
          navigation.navigate("Profile");
        }}
      />
      <Cell
        title="Account"
        subtitle="Privacy, logout, and more"
        icon="key-outline"
        onPress={() => {
          navigation.navigate("Account");
        }}
        iconColor="black"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  contactRow: {
    backgroundColor: colors.white,
    borderColor: colors.border,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
});

export default Settings;
