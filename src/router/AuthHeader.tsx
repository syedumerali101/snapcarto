import images from "@/assets/images";
import Colors from "@/styles/Colors";
import Metrics from "@/styles/Metrics";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";

const AuthHeader = ({ title }: { title: string }) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image style={styles.backIcon} source={images.back} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: Metrics.screenHeight * 0.2,
    paddingHorizontal: Metrics.ratio(20),
    justifyContent: "center",
    zIndex: 1000,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
  },

  backIcon: {
    height: Metrics.ratio(40),
    width: Metrics.ratio(40),
    resizeMode: "contain",
    tintColor: Colors.background.white,
  },
});

export default AuthHeader;
