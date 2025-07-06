import Metrics from "@/styles/Metrics";
import { useEffect, useRef } from "react";
import { Animated, Easing } from "react-native";

const useAnimateTextInput = (isFocused ) => {
  const focusAnim = useRef(new Animated.Value(0)).current;
  const heightAnim = useRef(new Animated.Value(Metrics.ratio(15))).current;

  useEffect(() => {
    Animated.timing(focusAnim, {
      toValue: isFocused ? 1 : 0,
      duration: 150,
      easing: Easing.bezier(0.4, 0, 0.2, 1),
      useNativeDriver: false,
    }).start();
  }, [focusAnim, isFocused]);

  useEffect(() => {
    Animated.timing(heightAnim, {
      toValue: isFocused ? Metrics.ratio(14) : Metrics.ratio(10),
      duration: 200,
      easing: Easing.out(Easing.ease),
      useNativeDriver: false,
    }).start();
  }, [isFocused]);

  return { focusAnim, heightAnim };
};

export default useAnimateTextInput;
