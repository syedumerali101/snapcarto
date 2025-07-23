import images from "@/assets/images";
import CountryCard from "@/components/Card/CountryCard";
import Text from "@/components/Text";
import Colors from "@/styles/Colors";
import Metrics from "@/styles/Metrics";
import React, { useEffect, useRef } from "react";
import {
  Animated,
  FlatList,
  Image,
  Modal,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { countries } from "./countries";

const CountryCodePicker = ({ visible, setShowCountryPicker }) => {
  const flatListRef = useRef(null);
  const inputWidthAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(inputWidthAnim, {
      toValue: Metrics.screenWidth * 0.9,
      duration: 3000,
      useNativeDriver: false,
    }).start();
  }, []);

  const renderCountryItem = ({ item, index }) => {
    return <CountryCard data={item} index={index} />;
  };
  return (
    <Modal transparent visible={visible} animationType="slide">
      <SafeAreaView style={styles.container}>
        <View style={styles.overLay} />
        <View style={styles.viewContainer}>
          <TouchableOpacity
            onPress={() => setShowCountryPicker(false)}
            activeOpacity={1}
            style={styles.backIconBtn}
          >
            <Image style={styles.backIconStyle} source={images.back} />
          </TouchableOpacity>
          <Text style={styles.countryHeadingStyle}>Choose your country</Text>
        </View>

        <Animated.View
          style={[
            styles.textInputView,
            {
              width: inputWidthAnim,
            },
          ]}
        >
          <Image source={images.search} style={styles.searchIconStyle} />
          <TextInput
            placeholder="Search"
            placeholderTextColor={Colors.text.black}
            style={styles.input}
            selectionColor={Colors.text.green}
          />
        </Animated.View>

        <FlatList
          ref={flatListRef}
          style={styles.flatListStyle}
          contentContainerStyle={styles.flatListContentStyle}
          data={countries}
          renderItem={renderCountryItem}
        />
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: Colors.background.green,
  },

  viewContainer: {
    width: Metrics.screenWidth * 0.9,
    alignSelf: "center",
    flexDirection: "row",
  },

  countryHeadingStyle: {
    color: Colors.text.white,
    fontSize: Metrics.ratio(14),
    fontWeight: "400",
    width: Metrics.screenWidth * 0.78,
    textAlign: "center",
  },

  backIconBtn: {
    justifyContent: "center",
    alignItems: "center",
  },

  backIconStyle: {
    resizeMode: "contain",
    height: Metrics.ratio(20),
    width: Metrics.ratio(20),
    tintColor: Colors.text.white,
  },

  textInputView: {
    borderWidth: 1,
    borderColor: Colors.text.green,
    width: Metrics.screenWidth * 0.9,
    alignSelf: "center",
    borderRadius: Metrics.ratio(8),
    paddingVertical: Metrics.ratio(10),
    paddingHorizontal: Metrics.ratio(10),
    marginTop: Metrics.ratio(12),
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.background.white,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },

  searchIconStyle: {
    resizeMode: "contain",
    height: Metrics.ratio(18),
    width: Metrics.ratio(18),
    tintColor: Colors.background.black,
  },

  input: {
    flex: 1,
    marginLeft: Metrics.ratio(5),
    fontSize: Metrics.ratio(12),
    color: Colors.text.black,
  },

  overLay: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
  },

  flatListStyle: {
    width: Metrics.screenWidth,
    marginTop: Metrics.ratio(20),
  },

  flatListContentStyle: {
    alignItems: "center",
    paddingBottom: Metrics.ratio(60),
  },
});

export default CountryCodePicker;
