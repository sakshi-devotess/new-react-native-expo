import React, { useCallback, useEffect, useRef, useState } from "react";
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
import AppButton from "../../../components/Button";
import {
  useRoute,
  useNavigation,
  useFocusEffect,
} from "@react-navigation/native";
import verifyOtp from "../../../../assets/verify-otp.png";
import { IVerifyOtpScreenProps } from "./VerifyOtp.model";
import { colors, otpTimerSeconds } from "../../../config/constants";
import authApiInstance from "../../../services/auth/auth";
import { showToast } from "../../../library/utilities/message";
import OtpInput from "../../../components/Form/OtpInput/OtpInput";

const { width, height } = Dimensions.get("window");

const VerifyOtpScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { mobile, isForgotMpin } = route.params as IVerifyOtpScreenProps;
  const otpRef = useRef<any>(null);
  const [otp, setOtp] = useState("");
  const [seconds, setSeconds] = useState(otpTimerSeconds);
  const [resendDisabled, setResendDisabled] = useState(true);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (seconds > 0) {
      setResendDisabled(true);
      timer = setInterval(() => setSeconds((s) => s - 1), 1000);
    } else {
      setResendDisabled(false);
    }
    return () => clearInterval(timer);
  }, [seconds]);

  const handleSubmitOtp = async () => {
    try {
      const res = await authApiInstance.verifyOtp({
        mobile: mobile,
        otp: otp,
      });
      if (res?.status) {
        const userData = res?.data?.user;
        showToast("info", "OTP verified successfully!");
        if (userData?.mpin && !isForgotMpin) {
          navigation.navigate("LoginWithMpin", { mobile });
        } else {
          navigation.navigate("SetMpin", { mobile });
        }
      }
    } catch (err: any) {
      console.log("Error verifying OTP:", err);
    }
  };

  const handleResendOtp = async () => {
    try {
      const res = await authApiInstance.resendOtp({
        mobile: mobile,
      });
      if (res?.status) {
        showToast("info", "OTP resent successfully!");
        setSeconds(otpTimerSeconds);
        setOtp("");
        otpRef.current?.clear();
      }
    } catch (err: any) {
      console.log("Error While Resending OTP:", err);
    }
  };

  useFocusEffect(
    useCallback(() => {
      setOtp("");
      otpRef.current?.clear?.();
    }, [])
  );

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
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.container}>
              <Image source={verifyOtp} style={styles.image} />

              <Text style={styles.otpLabel}>Enter OTP</Text>

              <OtpInput
                ref={otpRef}
                value={otp}
                onChange={(text) => {
                  setOtp(text);
                }}
                secureTextEntry={false}
              />

              <View style={styles.resendContainer}>
                <Text style={styles.timerText}>Don’t receive an OTP?</Text>

                <TouchableOpacity
                  onPress={handleResendOtp}
                  disabled={resendDisabled}
                  activeOpacity={resendDisabled ? 1 : 0.7}
                >
                  <Text
                    style={[
                      styles.resendText,
                      resendDisabled && styles.disabledResend,
                    ]}
                  >
                    Resend OTP{" "}
                    {resendDisabled
                      ? `(00:${seconds < 10 ? `0${seconds}` : seconds})`
                      : ""}
                  </Text>
                </TouchableOpacity>
              </View>
              <AppButton
                text={"Verify OTP"}
                variant="primary"
                onPress={handleSubmitOtp}
                disabled={!otp || otp.length < 6}
              />
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
    paddingHorizontal: width * 0.06,
    paddingVertical: height * 0.05,
    justifyContent: "center",
  },
  container: {
    alignItems: "center",
  },
  image: {
    width: width * 0.6,
    height: height * 0.25,
    resizeMode: "contain",
    marginBottom: 20,
  },
  otpLabel: {
    fontSize: width * 0.04,
    fontWeight: "600",
    marginBottom: 10,
    color: "#000",
  },
  timerText: {
    textAlign: "center",
    marginTop: 15,
    fontSize: width * 0.035,
    color: "#777",
  },
  timerCountdown: {
    fontWeight: "bold",
    color: "#000",
    fontSize: width * 0.045,
    marginVertical: 8,
  },
  resendText: {
    color: colors.primary,
    fontWeight: "bold",
    fontSize: width * 0.03,
    marginTop: 8,
    marginBottom: 20,
  },
  resendContainer: {
    marginTop: 15,
    alignItems: "center",
  },
  disabledResend: {
    color: "#aaa",
  },
});

export default VerifyOtpScreen;
