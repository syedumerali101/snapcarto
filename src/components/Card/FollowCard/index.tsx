import Text from "@/components/Text";
import type { FollowItem } from "@/modules/screens/home/types";
import Colors from "@/styles/Colors";
import Metrics from "@/styles/Metrics";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
  Animated,
  ImageSourcePropType,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

type FollowCardProps = {
  item: FollowItem;
  index: number;
  scrollX: Animated.Value;
  translateRotateZ?: Animated.AnimatedInterpolation<string>;
};

const FollowCard: React.FC<FollowCardProps> = ({
  item,
  translateRotateZ,
  imageScale
}) => {
  const { image, title, mention, follow } = item;


  return (
    <Animated.View
      style={[
        styles.mainViewContainer,
        {
          transform: [{ rotateZ: translateRotateZ ?? "0deg" }],
        },
      ]}
    >
      <View style={styles.imageWrapper}>
        <Animated.Image
          source={image as ImageSourcePropType}
          style={[styles.image, { transform: [{ scale: imageScale }] }]}
          resizeMode="cover"
        />
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
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  mainViewContainer: {
    marginHorizontal: Metrics.ratio(10),
    marginTop: Metrics.ratio(10),
  },
  imageWrapper: {
    borderRadius: Metrics.ratio(20),
    overflow: "hidden",
    width: Metrics.screenWidth * 0.72,
    height: Metrics.screenHeight * 0.65,
  },
  image: {
    width: "100%",
    height: "100%",
    position: "absolute",
    top: 0,
    left: 0,
  },
  detailsView: {
    position: "absolute",
    bottom: Metrics.screenHeight * 0.05,
    paddingHorizontal: Metrics.ratio(15),
    width: "100%",
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
    marginTop: Metrics.ratio(5),
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
    height: Metrics.screenHeight * 0.25,
  },
});

export default FollowCard;
