import Colors from "@/styles/Colors";
import Metrics from "@/styles/Metrics";
import React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";
import Text from "../Text";

type CustomTouchableProps = TouchableOpacityProps & {
  label?: string;
  onPress?: Function;
};

const Button = (props: CustomTouchableProps) => {
  const { label, onPress } = props;
  return (
    <TouchableOpacity
      activeOpacity={1}
      style={styles.btnContainer}
      onPress={onPress}
    >
      <Text style={styles.labelStyle}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btnContainer: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: Metrics.ratio(10),
    backgroundColor: Colors.background.green,
    padding: Metrics.ratio(15),
    marginTop: Metrics.ratio(20),
  },

  labelStyle: {
    color: Colors.text.white,
    fontSize: Metrics.ratio(12),
  },
});

export default Button;
