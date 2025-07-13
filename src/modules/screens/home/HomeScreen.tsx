import FollowCard from "@/components/Card/FollowCard";
import Text from "@/components/Text";
import { dummyData } from "@/constants/DummyData";
import { useAuth } from "@/context/AuthContext";
import useCustomAnimation from "@/hooks/useCustomAnimation";
import Metrics from "@/styles/Metrics";
import Helper from "@/utils/Helper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BlurView } from "expo-blur";
import React, { useEffect, useRef, useState } from "react";
import {
  Alert,
  Animated,
  ListRenderItemInfo,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import styles from "./styles";
import { FollowItem } from "./types";

const CARD_WIDTH = Metrics.screenWidth * 0.72;

const HomeScreen = () => {
  const { logout } = useAuth();
  const [user, setUser] = useState();
  const [activeSlide, setActiveSlide] = useState<FollowItem | null>(null);
  const scrollX = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef(null);
  const { scale } = useCustomAnimation.useChangeWithScaleRotate(
    activeSlide,
    10
  );

  useEffect(() => {
    const store = async () => {
      try {
        const getUser = await AsyncStorage.getItem("LOGGED_USER");

        if (getUser) {
          setUser(JSON.parse(getUser));
        }
      } catch (err) {
        Helper.showToast(err.message);
      }
    };
    store();
  }, []);

  const handleLogout = async () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        {
          text: "No",
          onPress: () => console.log("Logout cancelled"),
          style: "cancel",
        },

        {
          text: "Yes",
          onPress: async () => await logout(),
          style: "destructive",
        },
      ],
      { cancelable: true }
    );
  };

  const onViewRef = useRef(({ viewableItems }) => {
    if (viewableItems?.length > 0) {
      const centeredItem = viewableItems[0]?.item;
      if (centeredItem?.id !== activeSlide?.id) {
        setActiveSlide(centeredItem);
        fadeAnim.setValue(0);
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }).start();
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

    const imageScale = scrollX.interpolate({
      inputRange,
      outputRange: [1, 1.2, 1],
      extrapolate: "clamp",
    });

    return (
      <FollowCard
        item={item}
        index={index}
        translateRotateZ={translateRotateZ}
        imageScale={imageScale}
      />
    );
  };

  return (
    <BlurView intensity={20} style={styles.blurContainer}>
      <View style={StyleSheet.absoluteFill}>
        {activeSlide && (
          <Animated.Image
            source={activeSlide.image}
            style={[
              styles.bgImageStyle,
              {
                opacity: fadeAnim,
                transform: [
                  {
                    scale,
                  },
                ],
              },
            ]}
            resizeMode="cover"
          />
        )}
      </View>
      <View style={styles.overlay} />

      <View style={styles.headerView}>
        <View style={styles.detailsView}>
          <Text style={styles.nameText}>{user?.name}</Text>
          <Text style={styles.emailText}>{user?.email}</Text>
        </View>
        <TouchableOpacity
          onPress={handleLogout}
          activeOpacity={1}
          style={styles.emailView}
        >
          <Text style={styles.emailText}>Logout</Text>
        </TouchableOpacity>
      </View>

      <Animated.FlatList
        ref={flatListRef}
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
  );
};

export default HomeScreen;
