import React, { useCallback, useContext, useState } from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import backImage from "../../../../assets/signupBg.jpg";
import { IAddMobileScreenProps } from "./AddMobileNumber.model";
import { Controller, useForm } from "react-hook-form";
import { colors } from "../../../config/constants";

const { height } = Dimensions.get("window");

export default function AddMobileScreen(
  props: Readonly<IAddMobileScreenProps>
) {
  const { navigation } = props;
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
  });
  const methods = useForm();
  const [isLogin, setIsLogin] = useState(false);
  useFocusEffect(
    useCallback(() => {
      reset({
        username: "",
        password: "",
      });
    }, [])
  );
  const onSubmit = async (data) => {
    try {
    } catch (err: any) {
    } finally {
      setIsLogin(false);
    }
  };
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <View style={styles.imageWrapper}>
            <Image source={backImage} style={styles.backImage} />
          </View>

          <View style={styles.whiteSheet}>
            <ScrollView
              contentContainerStyle={styles.scrollContainer}
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
            >
              <SafeAreaView style={styles.form}>
                <Text style={styles.title}>Login</Text>
              </SafeAreaView>
            </ScrollView>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  title: {
    alignSelf: "center",
    fontSize: height * 0.04,
    fontWeight: "bold",
    color: "black",
    paddingBottom: 20,
    marginTop: 10,
  },
  button: {
    height: 50,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginTop: 15,
    marginBottom: 10,
  },
  noAccountSection: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  forgotPasswordSection: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  noAccountText: {
    color: "gray",
    fontSize: 14,
    fontWeight: "600",
  },
  signUpText: {
    color: colors.pink,
    fontWeight: "600",
    fontSize: 14,
  },
  imageWrapper: {
    height: height * 0.25,
    width: "100%",
  },
  backImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  whiteSheet: {
    position: "absolute",
    top: height * 0.25,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#fff",
    paddingTop: 20,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 30,
  },
  form: {
    flex: 1,
  },
});
