import FollowCard from "@/components/Card/FollowCard";
import Text from "@/components/Text";
import { dummyData } from "@/constants/DummyData";
import Metrics from "@/styles/Metrics";
import { BlurView } from "expo-blur";
import React, { useRef, useState } from "react";
import {
  Animated,
  ImageBackground,
  ListRenderItemInfo,
  View,
} from "react-native";
import styles from "./styles";
import { FollowItem } from "./types";

const CARD_WIDTH = Metrics.screenWidth * 0.72;

const HomeScreen = () => {
  const [activeSlide, setActiveSlide] = useState<FollowItem | null>(null);
  const scrollX = useRef(new Animated.Value(0)).current;

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const onViewRef = useRef(({ viewableItems }) => {
    if (viewableItems?.length > 0) {
      const centeredItem = viewableItems[0]?.item;
      if (centeredItem?.id !== activeSlide?.id) {
        setActiveSlide(centeredItem);
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 400,
          useNativeDriver: false,
        }).start(() => {
          fadeAnim.setValue(0);
        });
      }
    }
  });

  const viewConfigRef = useRef({
    itemVisiblePercentThreshold: 60,
    minimumViewTime: 100,
  });

  const renderItem = ({ item, index }: ListRenderItemInfo<FollowItem>) => {
    const inputRange = [
      (index - 1) * CARD_WIDTH,
      index * CARD_WIDTH,
      (index + 1) * CARD_WIDTH,
    ];

    const translateRotateZ = scrollX.interpolate({
      inputRange,
      outputRange: ["5deg", "0deg", "-5deg"],
      extrapolate: "clamp",
    });

    return (
      <FollowCard
        item={item}
        index={index}
        translateRotateZ={translateRotateZ}
      />
    );
  };

  return (
    <ImageBackground style={styles.mainContainer} source={activeSlide?.image}>
      <BlurView intensity={20} style={styles.blurContainer}>
        <View style={styles.overlay} />

        <View style={styles.headerView}>
          <Text style={styles.nameText}>John Doe</Text>
          <View style={styles.emailView}>
            <Text style={styles.emailText}>john@test.com</Text>
          </View>
        </View>

        <Animated.FlatList
          style={styles.flatListStyle}
          data={dummyData}
          renderItem={renderItem}
          horizontal={true}
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
          snapToInterval={CARD_WIDTH}
          decelerationRate={0}
          bounces={false}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: true }
          )}
          scrollEventThrottle={16}
          onViewableItemsChanged={onViewRef.current}
          viewabilityConfig={viewConfigRef.current}
        />
      </BlurView>
    </ImageBackground>
  );
};

export default HomeScreen;
