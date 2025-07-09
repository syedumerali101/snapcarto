import type { FollowItem } from "@/modules/screens/home/types";
import Metrics from "@/styles/Metrics";
import React from "react";
import { ImageBackground, ImageSourcePropType, StyleSheet } from "react-native";

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
    ></ImageBackground>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    width: Metrics.screenWidth * 0.72,
    height: Metrics.screenHeight * 0.65,
    marginHorizontal: Metrics.ratio(10),
    marginTop: Metrics.ratio(10),
  },
});

export default FollowCard;
