import images from "@/assets/images";
import Button from "@/components/Button";
import Text from "@/components/Text";
import TextInput from "@/components/TextInput";
import TouchableText from "@/components/TouchableText";
import useCustomAnimation from "@/hooks/useCustomAnimation";
import { BlurView } from "expo-blur";
import React, { useRef, useState } from "react";
import {
  Alert,
  Animated,
  ImageBackground,
  TextInput as TextInputRN,
  View,
} from "react-native";
import Helper from "../../../utils/Helper";
import styles from "./styles";

const SignupScreen = ({navigation}) => {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
  });
  const nameRef = useRef<TextInputRN>(null);
  const emailRef = useRef<TextInputRN>(null);
  const passwordRef = useRef<TextInputRN>(null);

  const { buttonOpacity, buttonTranslateY, heightAnim } =
    useCustomAnimation.useAnimateButton(
      Helper.isEmailValid(credentials?.email) &&
        Helper.isPasswordValid(credentials?.password),
      credentials
    );

  const handleChange = (key: "name" | "email" | "password", value: string) => {
    setCredentials((prev) => ({ ...prev, [key]: value }));
  };

  const onSubmit = () => {
    const emptyKeys = Object.keys(credentials).filter(
      (key) => credentials[key] === ""
    );

    if (emptyKeys?.length > 0) {
      Alert.alert(`${emptyKeys?.[0]} is missing`);
      return;
    }

       if (!Helper.isNameValid(credentials.name)) {
      Alert.alert("Name can not have numbers or symbols");
      return;
    }

    if (!Helper.isEmailValid(credentials.email)) {
      Alert.alert("Incorrect Email Address");
      return;
    }

    if (!Helper.isPasswordValid(credentials.password)) {
      Alert.alert("Password has to be atleast 6 characters long");
      return;
    }
  };

  return (
    <ImageBackground
      source={images.authBackground}
      style={styles.backgroundContainer}
    >
      <View style={styles.mainContainer} />

      <View style={styles.mainLoginContainer}>
        <Text style={styles.loginTextStyle}>Sign up</Text>

        <BlurView intensity={20} style={styles.blurContainer}>
          <Text style={styles.tagLineText}>
            Looks like you don't have an account. Let's create a new account for{" "}
            {credentials?.name}
          </Text>
          <TextInput
            label="Name"
            placeholder="Enter name"
            value={credentials.name}
            onChangeText={(text) => handleChange("name", text)}
            ref={nameRef}
            onSubmitEditing={() => emailRef.current.focus()}
          />
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
          />

          <View style={styles.termsConditionsView}>
            <Text style={styles.newAccountText}>
              By selecting agree and continue below, I agree to
              <TouchableText label="Terms of Service and Privacy Policy" />
            </Text>
          </View>

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
            <Text style={styles.newAccountText}>Already have an account? </Text>
            <TouchableText onPress={() => navigation.goBack()} label="Log in" />
          </View>
        </BlurView>
      </View>
    </ImageBackground>
  );
};

export default SignupScreen;
