import React, { useContext } from "react";
import { View, StyleSheet } from "react-native";
import { colors } from "../config/constants";
import { useNavigation } from "@react-navigation/native";
import Cell from "../components/Cell/Cell";
import ContactRow from "../components/ContactRow/ContactRow";
import { AuthContext } from "../contexts/AuthenticatedUserContext";
import { getUserName } from "../library/utilities/helperFunction";

const Settings = () => {
  const navigation = useNavigation();
  const { user } = useContext(AuthContext);

  return (
    <View>
      <ContactRow
        name={`${getUserName(user)}` ?? "No name"}
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
        style={{ marginTop: 20 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  contactRow: {
    backgroundColor: "white",
    borderColor: colors.border,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  githubContainer: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  githubLink: {
    alignItems: "center",
    alignSelf: "center",
    height: 20,
    justifyContent: "center",
    marginTop: 20,
    width: 100,
  },
});

export default Settings;
