import FollowCard from "@/components/Card/FollowCard";
import Text from "@/components/Text";
import { dummyData } from "@/constants/DummyData";
import { BlurView } from "expo-blur";
import React, { useRef, useState } from "react";
import {
  Animated,
  FlatList,
  ImageBackground,
  ListRenderItemInfo,
  View,
} from "react-native";
import styles from "./styles";
import { FollowItem } from "./types";

const HomeScreen = () => {
  const [activeSlide, setActiveSlide] = useState(null);
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
    return <FollowCard item={item} index={index} />;
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
        <FlatList
          style={styles.flatListStyle}
          data={dummyData}
          renderItem={renderItem}
          horizontal={true}
          keyExtractor={(item) => item.id}
          onViewableItemsChanged={onViewRef.current}
          viewabilityConfig={viewConfigRef.current}
          showsHorizontalScrollIndicator={false}
        />
      </BlurView>
    </ImageBackground>
  );
};

export default HomeScreen;
