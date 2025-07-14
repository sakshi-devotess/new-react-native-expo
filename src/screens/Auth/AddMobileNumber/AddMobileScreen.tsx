import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  Alert,
  StyleSheet,
  Image,
  ImageBackground,
  Animated,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
} from "react-native";
import AppButton from "../../../components/Button";
import { Controller, useForm } from "react-hook-form";
import Input from "../../../components/Form/Input/Input";
import { IAddMobileNumberForm } from "./AddMobileNumber.model";
import { setApiErrorsToForm } from "../../../library/utilities/message";
import authApiInstance from "../../../services/auth/auth";

const { height } = Dimensions.get("window");

const AddMobileScreen = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      mobile: "",
    },
  });
  const methods = useForm();
  const [isLogin, setIsLogin] = useState(false);

  const handleSendOTP = async (data: IAddMobileNumberForm) => {
    setIsLogin(true);
    try {
      const res = await authApiInstance.requestOtp({
        mobile: data.mobile,
      });
      console.log("object :>> ", res);
      if (res?.status) {
        reset();
        Alert.alert("Success", "OTP sent to your mobile number");
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
              <Text style={styles.title}>Continue with Mobile number</Text>

              <Controller
                control={control}
                // rules={{
                //   required: "Mobile is required",
                // }}
                name="mobile"
                render={({ field: { onChange, value } }) => (
                  <Input
                    placeholder="Enter 10-digit number"
                    value={value}
                    onChange={onChange}
                    // errorMessage={errors.mobile?.message}
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
  button: {
    backgroundColor: "#007bff",
    paddingVertical: 15,
    borderRadius: 10,
    width: "100%",
    alignSelf: "center",
    elevation: 3,
  },
  buttonText: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
});

export default AddMobileScreen;
