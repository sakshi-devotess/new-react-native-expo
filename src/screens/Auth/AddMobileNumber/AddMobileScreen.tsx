import React, { useState } from "react";
import {
  View,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  StyleSheet,
  Image,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import AppButton from "../../../components/Button";
import { Controller, useForm } from "react-hook-form";
import Input from "../../../components/Form/Input/Input";
import { IAddMobileNumberForm } from "./AddMobileNumber.model";
import {
  setApiErrorsToForm,
  showToast,
} from "../../../library/utilities/message";
import authApiInstance from "../../../services/auth/auth";
import addMobileNumber from "../../../../assets/add-mobile-number.png";
import { useNavigation } from "@react-navigation/native";

const AddMobileScreen = () => {
  const navigation = useNavigation();
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    ...methods
  } = useForm({
    defaultValues: {
      mobile: "",
    },
  });
  const [isLogin, setIsLogin] = useState(false);

  const handleSendOTP = async (data: IAddMobileNumberForm) => {
    setIsLogin(true);
    try {
      const res = await authApiInstance.requestOtp({
        mobile: data.mobile,
      });
      if (res?.status) {
        reset();
        showToast("info", "Otp sent successfully. Please check your mobile.");
        navigation.navigate("VerifyOtp", {
          mobile: data.mobile,
        });
      }
    } catch (err: any) {
      setApiErrorsToForm(err?.response, methods);
    } finally {
      setIsLogin(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : undefined}
            style={styles.content}
          >
            <ScrollView
              contentContainerStyle={styles.scrollContent}
              keyboardShouldPersistTaps="handled"
            >
              <Image source={addMobileNumber} style={styles.image} />
              <Text style={styles.title}>Continue with Mobile number</Text>

              <Controller
                control={control}
                name="mobile"
                render={({ field: { onChange, value } }) => (
                  <Input
                    placeholder="Enter 10-digit number"
                    value={value}
                    onChange={onChange}
                    errorMessage={errors.mobile?.message}
                    maxLength={10}
                    keyboardType="phone-pad"
                  />
                )}
              />

              <AppButton
                text={"Send OTP"}
                variant="primary"
                onPress={handleSubmit(handleSendOTP)}
                disabled={isLogin}
              />
            </ScrollView>
          </KeyboardAvoidingView>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    paddingVertical: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
  },
  inputContainer: {
    flexDirection: "row",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    marginBottom: 20,
  },
  countryCode: {
    fontSize: 16,
    marginRight: 8,
    color: "#444",
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: "#000",
  },
  image: {
    height: 180,
    resizeMode: "contain",
    alignSelf: "center",
    marginBottom: 20,
  },
});

export default AddMobileScreen;
