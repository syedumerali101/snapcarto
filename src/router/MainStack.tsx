import HomeScreen from "@/modules/screens/home/HomeScreen";
import Routes, { MainStackParams } from "@/utils/Routes";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { enableScreens } from "react-native-screens";
import AuthHeader from "./AuthHeader";

enableScreens();

const Stack = createStackNavigator<MainStackParams>();

function MainStack() {
  return (
    <Stack.Navigator
      initialRouteName={Routes.Home}
      screenOptions={{
        header: ({ scene, navigation, options }) => {
          const title = options.headerTitle ?? scene.route.name;
          return <AuthHeader title={title as string} />;
        },
      }}
    >
      <Stack.Screen
        name={Routes.Home}
        component={HomeScreen}
        options={{
          headerTitle: "Login",
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

export default React.memo(MainStack);
