import React, { useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from "react-native";
import { IButtonProps, variantStyles } from "./Button.model";

const AppButton: React.FC<IButtonProps> = ({
  text,
  onPress,
  loading = false,
  disabled = false,
  variant = "primary",
  style,
  textStyle,
  disableForMs = 1000,
}) => {
  const [tempDisabled, setTempDisabled] = useState(false);
  const [internalLoading, setInternalLoading] = useState(false);

  const handlePress = async () => {
    if (disableForMs > 0) {
      setTempDisabled(true);
      setTimeout(() => setTempDisabled(false), disableForMs);
    }

    setInternalLoading(true);
    try {
      await onPress?.();
    } finally {
      setInternalLoading(false);
    }
  };

  const isDisabled = disabled || loading || internalLoading || tempDisabled;
  const isLoading = loading || internalLoading;

  const { backgroundColor, textColor } = variantStyles[variant];

  return (
    <Pressable
      onPress={handlePress}
      disabled={isDisabled}
      style={({ pressed }) => [
        styles.button,
        { backgroundColor, opacity: pressed ? 0.8 : 1 },
        isDisabled && styles.disabled,
        style,
      ]}
    >
      {isLoading && (
        <ActivityIndicator size="small" color="#fff" style={styles.loader} />
      )}
      <View>
        <Text style={[styles.text, { color: textColor }, textStyle]}>
          {text}
        </Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 10,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  disabled: {
    opacity: 0.5,
  },
  text: {
    fontSize: 15,
    fontWeight: "bold",
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
  },
  loader: {
    right: 10,
  },
});

export default AppButton;
