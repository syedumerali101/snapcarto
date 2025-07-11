import images from "@/assets/images";
import useCustomAnimation from "@/hooks/useCustomAnimation";
import Colors from "@/styles/Colors";
import Metrics from "@/styles/Metrics";
import React, { useState } from "react";
import {
  Animated,
  Image,
  StyleSheet,
  TextInputProps,
  TextInput as TextInputRN,
  TouchableOpacity,
  View,
} from "react-native";

type CustomTextProps = TextInputProps & {
  label?: string;
  errorText?: string | null;
};
const TextInput = (props: CustomTextProps) => {
  const {
    label,
    placeholder,
    style,
    onBlur,
    onFocus,
    errorText,
    secureTextEntry,
    type,
    ...rest
  } = props;
  const [isFocused, setIsFocused] = useState(false);
  const [passwordHidden, setPasswordHidden] = useState(secureTextEntry);
  const { focusAnim, heightAnim } =
    useCustomAnimation.useAnimateTextInput(isFocused);
  let color = isFocused ? Colors.text.black : "transparent";
  if (errorText) {
    color = Colors.text.red;
  }

  const handlePasswordVisibility = () => {
    setPasswordHidden(!passwordHidden);
  };

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
          secureTextEntry={passwordHidden}
          style={[
            styles.input,
            {
              borderColor: color,
              marginTop: isFocused ? 10 : 0,
              width: secureTextEntry ? Metrics.screenWidth * 0.7 : null,
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
          autoCapitalize="none"
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

        {type === "password" ? (
          <TouchableOpacity
            onPress={handlePasswordVisibility}
            activeOpacity={1}
            style={styles.eyeBtn}
          >
            <Image
              style={styles.eyeIconStyle}
              source={passwordHidden ? images.eyeClosed : images.eye}
            />
          </TouchableOpacity>
        ) : null}
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
    flexDirection: "row",
    justifyContent: "space-between",
  },

  eyeBtn: {
    justifyContent: "center",
    alignItems: "center",
  },

  eyeIconStyle: {
    resizeMode: "contain",
    height: Metrics.ratio(14),
    width: Metrics.ratio(14),
  },
});

export default TextInput;
