import images from "@/assets/images";
import Button from "@/components/Button";
import Text from "@/components/Text";
import TextInput from "@/components/TextInput";
import TouchableText from "@/components/TouchableText";
import { BlurView } from "expo-blur";
import React from "react";
import { ImageBackground, View } from "react-native";
import styles from "./styles";

const LoginScreen = () => {
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
          <TextInput label="Email" placeholder="Enter email" />
          <TextInput label="Password" placeholder="Enter password" />
          <Button label="Continue" />
          <TouchableText label="Forgot your password?" />
        </BlurView>
      </View>
    </ImageBackground>
  );
};

export default LoginScreen;
