import images from "@/assets/images";
import Button from "@/components/Button";
import Text from "@/components/Text";
import TextInput from "@/components/TextInput";
import TouchableText from "@/components/TouchableText";
import { useAuth } from "@/context/AuthContext";
import useCustomAnimation from "@/hooks/useCustomAnimation";
import { BlurView } from "expo-blur";
import React, { useRef, useState } from "react";
import {
  Animated,
  ImageBackground,
  TextInput as TextInputRN,
  View,
} from "react-native";
import Helper from "../../../utils/Helper";
import styles from "./styles";

const LoginScreen = ({ navigation }) => {
  const { login } = useAuth();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const emailRef = useRef<TextInputRN>(null);
  const passwordRef = useRef<TextInputRN>(null);

  const { buttonOpacity, buttonTranslateY, heightAnim } =
    useCustomAnimation.useAnimateButton(
      Helper.isEmailValid(credentials?.email) &&
        Helper.isPasswordValid(credentials?.password),
      credentials
    );

  const handleChange = (key: "email" | "password", value: string) => {
    setCredentials((prev) => ({ ...prev, [key]: value }));
  };

  const onSubmit = async () => {
    const emptyKeys = Object.keys(credentials).filter(
      (key) => credentials[key] === ""
    );

    if (emptyKeys?.length > 0) {
      Helper.showToast(`${emptyKeys?.[0]} is missing`);
      return;
    }

    try {
      await login(credentials?.email, credentials?.password);
    } catch (err) {
      Helper.showToast(err.message);
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
            ref={emailRef}
            onSubmitEditing={() => passwordRef.current.focus()}
          />
          <TextInput
            label="Password"
            placeholder="Enter password"
            value={credentials.password}
            onChangeText={(text) => handleChange("password", text)}
            ref={passwordRef}
            onSubmitEditing={onSubmit}
            secureTextEntry={true}
            type="password"
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
            <TouchableText
              label="Sign up"
              onPress={() => navigation.navigate("Signup")}
            />
          </View>

          <TouchableText
            onPress={() => Helper.showToast("Not a part of this test")}
            label="Forgot your password?"
          />
        </BlurView>
      </View>
    </ImageBackground>
  );
};

export default LoginScreen;
