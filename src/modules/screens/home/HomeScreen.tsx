import images from "@/assets/images";
import FollowCard from "@/components/Card/FollowCard";
import Text from "@/components/Text";
import { dummyData } from "@/constants/DummyData";
import { BlurView } from "expo-blur";
import React, { useState } from "react";
import {
  FlatList,
  ImageBackground,
  ListRenderItemInfo,
  View,
} from "react-native";
import styles from "./styles";
import { FollowItem } from "./types";

const HomeScreen = () => {
  const [activeSlide, setActiveSlide] = useState(null);
  const renderItem = ({ item, index }: ListRenderItemInfo<FollowItem>) => {
    return <FollowCard item={item} index={index} />;
  };
  return (
    <ImageBackground style={styles.mainContainer} source={images.model1}>
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
        />
      </BlurView>
    </ImageBackground>
  );
};

export default HomeScreen;
