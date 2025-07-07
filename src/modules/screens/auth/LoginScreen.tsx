import images from "@/assets/images";
import Button from "@/components/Button";
import Text from "@/components/Text";
import TextInput from "@/components/TextInput";
import TouchableText from "@/components/TouchableText";
import useCustomAnimation from "@/hooks/useCustomAnimation";
import { BlurView } from "expo-blur";
import React, { useState } from "react";
import { Alert, Animated, ImageBackground, View } from "react-native";
import Helper from "../../../utils/Helper";
import styles from "./styles";

const LoginScreen = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const { buttonOpacity, buttonTranslateY, heightAnim } =
    useCustomAnimation.useAnimateButton(
      Helper.isEmailValid(credentials?.email) &&
        Helper.isPasswordValid(credentials?.password),
      credentials
    );

  const handleChange = (key: "email" | "password", value: string) => {
    setCredentials((prev) => ({ ...prev, [key]: value }));
  };

  const onSubmit = () => {
    if (!Helper.isEmailValid(credentials.email)) {
      Alert.alert("Incorrect Email Address");
    }

    if (!Helper.isPasswordValid(credentials.password)) {
      Alert.alert("Incorrect Password");
    }
  };

  return (
    <ImageBackground
      source={images.authBackground}
      style={styles.backgroundContainer}
    >
      <View style={styles.mainContainer} />

      <View style={styles.mainLoginContainer}>
        <Text style={styles.loginTextStyle}>Log in</Text>

        <BlurView intensity={20} style={styles.blurContainer}>
          <Text style={styles.tagLineText}>
            Ready to treat yourself? Log in and let the browsing begin
          </Text>
          <TextInput
            label="Email"
            placeholder="Enter email"
            value={credentials.email}
            onChangeText={(text) => handleChange("email", text)}
          />
          <TextInput
            label="Password"
            placeholder="Enter password"
            value={credentials.password}
            onChangeText={(text) => handleChange("password", text)}
          />

          <Animated.View
            style={{
              opacity: buttonOpacity,
              height: heightAnim,
              transform: [
                {
                  translateY: buttonTranslateY,
                },
              ],
            }}
          >
            <Button label="Continue" onPress={onSubmit} />
          </Animated.View>

          <View style={styles.newAccountView}>
            <Text style={styles.newAccountText}>Don't have an account? </Text>
            <TouchableText label="Sign up" />
          </View>

          <TouchableText label="Forgot your password?" />
        </BlurView>
      </View>
    </ImageBackground>
  );
};

export default LoginScreen;
