import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useFormContext } from "react-hook-form";
import { IFormInputProps } from "./Input.model";

export default function Input(props: IFormInputProps) {
  const {
    value,
    onChange,
    placeholder,
    secureTextEntry = false,
    errorMessage,
    keyboardType = "default",
    textContentType = "none",
    autoCapitalize = "none",
    autoCorrect = false,
    attribute = "",
    maxLength = 100,
  } = props;
  const formContext = useFormContext?.();

  const [isSecure, setIsSecure] = useState(secureTextEntry);

  const rawError = formContext?.formState?.errors?.[attribute]?.message;
  const error: string =
    errorMessage ?? (typeof rawError === "string" ? rawError : "");
  return (
    <View style={styles.inputWrapper}>
      <View
        style={[
          styles.inputContainer,
          error ? styles.inputContainerError : null,
        ]}
      >
        <TextInput
          style={styles.textInput}
          placeholder={placeholder}
          value={value}
          onChangeText={onChange}
          secureTextEntry={isSecure}
          keyboardType={keyboardType}
          textContentType={textContentType}
          autoCapitalize={autoCapitalize}
          autoCorrect={autoCorrect}
          maxLength={maxLength}
          placeholderTextColor="#999"
        />
        {secureTextEntry && (
          <TouchableOpacity onPress={() => setIsSecure(!isSecure)}>
            <Ionicons
              name={isSecure ? "eye-off" : "eye"}
              size={18}
              color="gray"
              style={styles.icon}
            />
          </TouchableOpacity>
        )}
      </View>
      {!!error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  inputWrapper: {
    marginBottom: 15,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F6F7FB",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    paddingHorizontal: 14,
    height: 50,
  },
  inputContainerError: {
    borderColor: "red",
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  icon: {
    marginLeft: 10,
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },
});
