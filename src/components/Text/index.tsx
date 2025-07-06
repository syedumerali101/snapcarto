import Colors from "@/styles/Colors";
import React from "react";
import { StyleSheet, TextProps, Text as TextRN } from "react-native";

type CustomTextProps = React.PropsWithChildren<TextProps>;

const Text = (props: CustomTextProps) => {
  const { children, style, ...rest } = props;
  return (
    <TextRN style={[styles.textStyle, style]} {...rest}>
      {children}
    </TextRN>
  );
};

const styles = StyleSheet.create({
  textStyle: {
    color: Colors.text.black,
  },
});

export default Text;
