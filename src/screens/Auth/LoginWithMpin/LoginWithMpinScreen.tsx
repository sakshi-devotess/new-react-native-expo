import React, { useContext, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  KeyboardAvoidingView,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { useNavigation, useRoute } from "@react-navigation/native";
import AppButton from "../../../components/Button";
import { setApiErrorsToForm } from "../../../library/utilities/message";
import verifyOtp from "../../../../assets/verify-otp.png";
import { IVerifyMpinProps, IVerifyMpinForm } from "./LoginWithMpin.model";
import OtpInput from "../../../components/Form/OtpInput/OtpInput";
import authApiInstance from "../../../services/auth/auth";
import {
  saveUser,
  saveUserIdentity,
} from "../../../library/utilities/secureStore";
import { AuthContext } from "../../../contexts/AuthenticatedUserContext";
import { colors } from "../../../config/constants";

const { width, height } = Dimensions.get("window");

const LoginWithMpinScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { mobile } = route.params as IVerifyMpinProps;
  const [isLoading, setIsLoading] = useState(false);
  const { setUser, setIsAuthenticated } = useContext(AuthContext);

  const {
    control,
    handleSubmit,
    formState: { errors },
    ...methods
  } = useForm({
    defaultValues: {
      mpin: "",
    },
  });

  const onSubmit = async (data: IVerifyMpinForm) => {
    const { mpin } = data;
    setIsLoading(true);
    try {
      const res = await authApiInstance.verifyMpin({
        mobile: mobile,
        mpin: mpin,
      });
      if (res?.status) {
        const userData = {
          access_token: res.data?.tokens?.access_token,
          refresh_token: res.data?.tokens?.refresh_token,
          mobile: mobile,
          mpin: mpin,
          id: res.data?.user?.id,
        };
        await saveUser(userData);
        await saveUserIdentity(userData);
        setUser(userData);
        setIsAuthenticated(true);
      }
    } catch (err: any) {
      setApiErrorsToForm(err?.response, methods);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
        >
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.container}>
              <Text style={styles.heading}>Welcome back 👋</Text>
              <Text style={styles.subText}>Login securely using your MPIN</Text>

              <Image source={verifyOtp} style={styles.image} />

              <View style={styles.inputWrapper}>
                <Text style={styles.label}>Enter your MPIN</Text>

                <Controller
                  control={control}
                  name="mpin"
                  render={({ field: { onChange, value } }) => (
                    <OtpInput
                      value={value}
                      onChange={onChange}
                      errorMessage={errors.mpin?.message}
                    />
                  )}
                />
                <TouchableOpacity
                  onPress={() => navigation.navigate("ForgotMpin")}
                  style={styles.forgotMpinContainer}
                >
                  <Text style={styles.forgotMpinText}>Forgot MPIN?</Text>
                </TouchableOpacity>

                <AppButton
                  text={"Verify MPIN"}
                  onPress={handleSubmit(onSubmit)}
                  disabled={isLoading}
                />
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingVertical: 40,
    justifyContent: "center",
  },
  container: {
    alignItems: "center",
  },
  heading: {
    fontSize: 24,
    fontWeight: "700",
    color: "#222",
    marginBottom: 4,
  },
  subText: {
    fontSize: 14,
    color: "#666",
    marginBottom: 20,
  },
  image: {
    width: width * 0.6,
    height: height * 0.25,
    resizeMode: "contain",
    marginBottom: 30,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    color: "#444",
    marginTop: 16,
    marginBottom: 8,
  },
  title: {
    fontSize: width * 0.05,
    fontWeight: "600",
    color: "#000",
    marginBottom: 10,
  },
  forgotMpinContainer: {
    width: "100%",
    alignItems: "flex-end",
    marginBottom: 20,
  },
  forgotMpinText: {
    color: colors.primary,
    fontSize: 14,
  },
  inputWrapper: {
    width: "100%",
    marginTop: 16,
  },
});

export default LoginWithMpinScreen;
