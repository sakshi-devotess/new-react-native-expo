import React, { useState } from "react";
import { View, StyleSheet, SafeAreaView, Keyboard, Text } from "react-native";
import { Controller, useForm } from "react-hook-form";
import authApiInstance from "../../../services/auth/auth";
import {
  setApiErrorsToForm,
  showToast,
} from "../../../library/utilities/message";
import AppButton from "../../../components/Button";
import { IChangeMpinForm } from "./ChangeMpin.model";
import { useNavigation } from "@react-navigation/native";
import OtpInput from "../../../components/Form/OtpInput/OtpInput";

export default function ChangeMpin() {
  const navigation = useNavigation();
  const methods = useForm({
    defaultValues: {
      currentMpin: "",
      newMpin: "",
      confirmMpin: "",
    },
  });
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = methods;
  const [isLogin, setIsLogin] = useState(false);

  const onHandleChangeMpin = async (data: IChangeMpinForm) => {
    try {
      setIsLogin(true);
      const res = await authApiInstance.changeMyMpin(data);
      if (res?.status) {
        showToast("success", "Mpin changed successfully.");
        navigation.goBack();
        methods.reset();
        Keyboard.dismiss();
      } else {
        setApiErrorsToForm(res, methods);
      }
    } catch (err: any) {
      setApiErrorsToForm(err?.response, methods);
    } finally {
      setIsLogin(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Current MPIN</Text>
        <Controller
          control={control}
          name="currentMpin"
          render={({ field: { onChange, value } }) => (
            <OtpInput
              value={value}
              onChange={onChange}
              errorMessage={errors.currentMpin?.message}
            />
          )}
        />
        <Text style={styles.label}>New MPIN</Text>
        <Controller
          control={control}
          name="newMpin"
          render={({ field: { onChange, value } }) => (
            <OtpInput
              value={value}
              onChange={onChange}
              errorMessage={errors.newMpin?.message}
            />
          )}
        />
        <Text style={styles.label}>Confirm New MPIN</Text>
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
          text={"Change Mpin"}
          onPress={handleSubmit(onHandleChangeMpin)}
          style={styles.button}
          loading={isLogin}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    flex: 1,
  },
  infoContainer: {
    marginTop: 40,
    width: "90%",
  },
  avatarImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  button: {
    marginTop: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
  },
});
