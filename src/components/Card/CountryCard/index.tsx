import Text from "@/components/Text";
import Colors from "@/styles/Colors";
import Metrics from "@/styles/Metrics";
import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, TouchableOpacity } from "react-native";
const CountryCard = (props) => {
  const animation = useRef(new Animated.Value(0)).current;
  const item = props?.data;
  const index = props?.index;

  useEffect(() => {
    Animated.timing(animation, {
      toValue: 1,
      duration: 200,
      delay: index * 100,
      useNativeDriver: true
    }).start();
  }, []);

  const translateY = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [50, 0]
  })

  return (
    <Animated.View style={{
      opacity: animation,
      transform: [{translateY}]
    }}>
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.mainContainer}
        key={index}
      >
        <Text style={styles.flagStyle}>{item?.flag}</Text>

        <Text style={styles.nameStyle}>{item?.name}</Text>

        <Text style={styles.dialCodeStyle}>{item?.dialCode}</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.text.green,
    paddingVertical: Metrics.ratio(5),
    paddingHorizontal: Metrics.ratio(10),
    width: Metrics.screenWidth * 0.9,
    alignSelf: "center",
    marginTop: Metrics.ratio(10),
    borderRadius: Metrics.ratio(8),
    backgroundColor: Colors.background.white,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },

  flagStyle: {
    fontSize: Metrics.ratio(25),
    width: Metrics.ratio(30),
  },

  nameStyle: {
    fontSize: Metrics.ratio(12),
    color: Colors.text.black,
    width: Metrics.screenWidth * 0.62,
  },

  dialCodeStyle: {
    fontSize: Metrics.ratio(12),
    color: Colors.text.black,
  },
});

export default CountryCard;
