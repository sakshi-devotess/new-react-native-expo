import React, { useEffect, useRef } from "react";
import { View, Text, StyleSheet } from "react-native";
import OTPTextInput from "react-native-otp-textinput";
import { IOtpInputProps } from "./OtpInput.model";

const OtpInput = React.forwardRef<any, IOtpInputProps>(
  (
    { value, onChange, inputCount = 6, errorMessage, secureTextEntry = true },
    ref
  ) => {
    const otpInputRef = useRef<any>(null);

    useEffect(() => {
      if (ref && typeof ref === "object") {
        ref.current = otpInputRef.current;
      }
    }, [ref]);

    return (
      <View style={styles.wrapper}>
        <OTPTextInput
          ref={otpInputRef}
          handleTextChange={onChange}
          inputCount={inputCount}
          secureTextEntry={secureTextEntry}
          defaultValue={value}
          tintColor={errorMessage ? "red" : "gray"}
          offTintColor={errorMessage ? "red" : "gray"}
          textInputStyle={{
            ...styles.textInput,
            ...(errorMessage ? styles.textInputError : {}),
          }}
        />
        {!!errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}
      </View>
    );
  }
);

const styles = StyleSheet.create({
  wrapper: {
    marginVertical: 10,
    alignItems: "center",
  },
  textInput: {
    borderRadius: 8,
    borderColor: "gray",
    borderWidth: 1.5,
    fontSize: 16,
    color: "#000",
    fontWeight: "600",
  },
  textInputError: {
    borderColor: "red",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 6,
  },
});

export default OtpInput;
