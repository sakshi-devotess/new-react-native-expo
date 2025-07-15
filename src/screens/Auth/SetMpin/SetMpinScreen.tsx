import React, { useState } from "react";
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
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { useNavigation, useRoute } from "@react-navigation/native";
import AppButton from "../../../components/Button";
import { setApiErrorsToForm } from "../../../library/utilities/message";
import verifyOtp from "../../../../assets/verify-otp.png";
import { ISetMpinForm, ISetMpinProps } from "./SetMpin.model";
import OtpInput from "../../../components/Form/OtpInput/OtpInput";
import authApiInstance from "../../../services/auth/auth";
import * as SecureStore from "expo-secure-store";

const { width, height } = Dimensions.get("window");

const SetMpinScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { mobile } = route.params as ISetMpinProps;
  const [isLoading, setIsLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    ...methods
  } = useForm({
    defaultValues: {
      mpin: "",
      confirmMpin: "",
    },
  });

  const onSubmit = async (data: ISetMpinForm) => {
    const { mpin, confirmMpin } = data;
    setIsLoading(true);
    try {
      const res = await authApiInstance.setMpin({
        mobile: mobile,
        mpin: mpin,
        confirmMpin: confirmMpin,
      });

      if (res?.status) {
        const userData = {
          access_token: res.data?.tokens?.access_token,
          mobile: mobile,
          id: res.data?.user?._id,
        };
        await SecureStore.setItemAsync("userData", JSON.stringify(userData));
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
              <Image source={verifyOtp} style={styles.image} />

              <Text style={styles.title}>Set Your MPIN</Text>

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

              <Controller
                control={control}
                name="confirmMpin"
                render={({ field: { onChange, value } }) => (
                  <OtpInput
                    value={value}
                    onChange={onChange}
                    errorMessage={errors.confirmMpin?.message}
                  />
                )}
              />

              <AppButton
                text={"Set MPIN"}
                onPress={handleSubmit(onSubmit)}
                disabled={isLoading}
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
    paddingHorizontal: 24,
    paddingVertical: 40,
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
  title: {
    fontSize: width * 0.05,
    fontWeight: "600",
    color: "#000",
    marginBottom: 10,
  },
});

export default SetMpinScreen;
