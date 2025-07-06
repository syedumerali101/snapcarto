import AppNavigator from "@/router/AppNavigator";
import * as ScreenOrientation from "expo-screen-orientation";
import React, { useEffect } from "react";
import { Platform } from "react-native";

export default function App() {
  useEffect(() => {
    if (Platform.OS !== "web") {
      ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.PORTRAIT_UP
      );
    }
  }, []);
  return <AppNavigator />;
}
