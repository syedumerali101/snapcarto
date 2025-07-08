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

const TouchableText = (props: CustomTouchableProps) => {
  const { label, onPress } = props;
  return (
    <TouchableOpacity activeOpacity={1} style={styles.btnContainer} onPress={onPress}>
      <Text style={styles.labelStyle}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btnContainer: {
    justifyContent: "center",
    marginTop: Metrics.ratio(15)
  },

  labelStyle: {
    fontSize: Metrics.ratio(12),
    color: Colors.text.green
  },
});

export default TouchableText;
