import BackgroundWrapper from "@/components/BackgroundWrapper";
import Button from "@/components/Button";
import CountryCodePicker from "@/components/Pickers/CountryCodePicker";
import Text from "@/components/Text";
import TextInput from "@/components/TextInput";
import TouchableText from "@/components/TouchableText";
import { useAuth } from "@/context/AuthContext";
import useCustomAnimation from "@/hooks/useCustomAnimation";
import { BlurView } from "expo-blur";
import React, { useRef, useState } from "react";
import { Animated, TextInput as TextInputRN, View } from "react-native";
import Helper from "../../../utils/Helper";
import styles from "./styles";

const SignupScreen = ({ navigation }) => {
  const { signup } = useAuth();
  const [credentials, setCredentials] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
  });
  const [showCountryPicker, setShowCountryPicker] = useState(false);
  const nameRef = useRef<TextInputRN>(null);
  const phoneRef = useRef<TextInputRN>(null);
  const emailRef = useRef<TextInputRN>(null);
  const passwordRef = useRef<TextInputRN>(null);

  const { buttonOpacity, buttonTranslateY, heightAnim } =
    useCustomAnimation.useAnimateButton(
      credentials?.name !== "" &&
        credentials?.email !== "" &&
        credentials?.password !== "",
      credentials
    );

  const handleChange = (key: "name" | "email" | "password" | "phone", value: string) => {
    setCredentials((prev) => ({ ...prev, [key]: value }));
  };

  const onSubmit = async () => {
    const emptyKeys = Object.keys(credentials).filter(
      (key) => credentials[key as keyof typeof credentials] === ""
    );

    if (emptyKeys?.length > 0) {
      Helper.showToast(`${emptyKeys?.[0]} is missing`);
      return;
    }

    try {
      await signup(
        credentials?.name,
        credentials?.email,
        credentials?.password,
        navigation
      );
    } catch (err) {
      Helper.showToast(err.message);
    }
  };

  return (
    <BackgroundWrapper>
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
            onSubmitEditing={() => phoneRef.current.focus()}
            autoFocus={true}
          />
          <TextInput
            label="Phone"
            placeholder="Enter Phone Number"
            value={credentials.phone}
            onChangeText={(text) => handleChange("phone", text)}
            ref={phoneRef}
            onSubmitEditing={() => emailRef.current?.focus()}
            keyboardType="number-pad"
            type="phone"
          />
          <TextInput
            label="Email"
            placeholder="Enter email"
            value={credentials.email}
            onChangeText={(text) => handleChange("email", text)}
            ref={emailRef}
            onSubmitEditing={() => passwordRef.current.focus()}
            keyboardType="email-address"
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

          <View style={styles.termsConditionsView}>
            <Text style={styles.newAccountText}>
              By selecting agree and continue below, I agree to
              <TouchableText
                onPress={() => setShowCountryPicker(!showCountryPicker)}
                label="Terms of Service and Privacy Policy"
              />
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

      <CountryCodePicker
        visible={showCountryPicker}
        setShowCountryPicker={setShowCountryPicker}
        mode="list"
      />
    </BackgroundWrapper>
  );
};

export default SignupScreen;
