import Text from "@/components/Text";
import type { FollowItem } from "@/modules/screens/home/types";
import Colors from "@/styles/Colors";
import Metrics from "@/styles/Metrics";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
  ImageBackground,
  ImageSourcePropType,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

type FollowCardProps = {
  item: FollowItem;
  index?: number; // Optional, in case you pass index
};

const FollowCard: React.FC<FollowCardProps> = ({ item }) => {
  const { id, image, title, mention, follow } = item;

  return (
    <ImageBackground
      source={image as ImageSourcePropType}
      style={styles.imageContainer}
      borderRadius={Metrics.ratio(20)}
    >
      <LinearGradient
        colors={["transparent", "rgba(0,0,0,0.7)", "black"]}
        style={styles.bottomGradient}
        locations={[0, 0.6, 1]}
      />
      <View style={styles.detailsView}>
        <Text style={styles.titleStyle}>{title}</Text>
        <View style={styles.followBtnContainer}>
          <Text style={styles.mentionText}>{mention}</Text>
          <TouchableOpacity activeOpacity={1} style={styles.onFollowBtn}>
            <Text style={styles.followText}>{follow}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    width: Metrics.screenWidth * 0.72,
    height: Metrics.screenHeight * 0.65,
    marginHorizontal: Metrics.ratio(10),
    marginTop: Metrics.ratio(10),
  },

  detailsView: {
    width: Metrics.screenWidth * 0.65,
    alignSelf: "center",
    marginTop: Metrics.screenHeight * 0.5,
  },

  titleStyle: {
    color: Colors.text.white,
    fontSize: Metrics.ratio(20),
    fontWeight: "bold",
  },

  followBtnContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  mentionText: {
    color: Colors.text.white,
    fontSize: Metrics.ratio(12),
    fontWeight: "600",
  },

  onFollowBtn: {
    borderWidth: 1,
    borderColor: Colors.text.white,
    paddingVertical: Metrics.ratio(5),
    paddingHorizontal: Metrics.ratio(10),
    borderRadius: Metrics.ratio(20),
  },

  followText: {
    color: Colors.text.white,
    fontSize: Metrics.ratio(12),
    textTransform: "capitalize",
    fontWeight: "600",
  },

  bottomGradient: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: Metrics.screenHeight * 0.25, // adjust for how much fade you want
    borderBottomLeftRadius: Metrics.ratio(20),
    borderBottomRightRadius: Metrics.ratio(20),
  },
});

export default FollowCard;
