import useCustomAnimation from "@/hooks/useCustomAnimation";
import Colors from "@/styles/Colors";
import Metrics from "@/styles/Metrics";
import React, { useState } from "react";
import {
  Animated,
  StyleSheet,
  TextInputProps,
  TextInput as TextInputRN,
  View,
} from "react-native";

type CustomTextProps = TextInputProps & {
  label?: string;
  errorText?: string | null;
};
const TextInput = (props: CustomTextProps) => {
  const { label, placeholder, style, onBlur, onFocus, errorText, ...rest } =
    props;
  const [isFocused, setIsFocused] = useState(false);
  const { focusAnim, heightAnim } =
    useCustomAnimation.useAnimateTextInput(isFocused);
  let color = isFocused ? Colors.text.black : "transparent";
  if (errorText) {
    color = Colors.text.red;
  }

  return (
    <View style={[styles.mainContainer, style]}>
      <Animated.View
        style={[
          styles.inputLabelMainView,
          {
            borderWidth: isFocused ? 3 : 0,
            paddingVertical: heightAnim,
          },
        ]}
      >
        <TextInputRN
          style={[
            styles.input,
            {
              borderColor: color,
              marginTop: isFocused ? 10 : 0,
            },
          ]}
          placeholder={isFocused ? placeholder : label}
          {...rest}
          onBlur={(event) => {
            setIsFocused(false);
            onBlur?.(event);
          }}
          onFocus={(event) => {
            setIsFocused(true);
            onFocus?.(event);
          }}
        />
        <Animated.View
          style={[
            styles.labelContainer,
            {
              transform: [
                {
                  scale: focusAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [1, 0.75],
                  }),
                },
                {
                  translateY: focusAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [24, 10],
                  }),
                },
                {
                  translateX: focusAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [16, 0],
                  }),
                },
              ],
            },
          ]}
        >
          <Animated.Text
            style={[
              styles.label,
              {
                color,
              },
            ]}
          >
            {label}
            {errorText ? "*" : ""}
          </Animated.Text>
        </Animated.View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    marginTop: Metrics.ratio(10),
  },
  input: {
    fontSize: Metrics.ratio(12),
    zIndex: 100000,
  },

  label: {
    fontSize: Metrics.ratio(12),
  },

  labelContainer: {
    position: "absolute",
    top: -Metrics.ratio(1),
    paddingHorizontal: 8,
  },
  error: {
    marginTop: 4,
    marginLeft: 12,
    fontSize: 12,
    color: "#B00020",
  },

  inputLabelMainView: {
    padding: Metrics.ratio(15),
    borderColor: "green",
    borderRadius: Metrics.ratio(8),
    backgroundColor: Colors.background.white,
  },
});

export default TextInput;
