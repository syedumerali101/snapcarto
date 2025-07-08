import LoginScreen from "@/modules/screens/auth/LoginScreen";
import SignupScreen from "@/modules/screens/auth/SignupScreen";
import Routes, { AuthStackParams } from "@/utils/Routes";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { enableScreens } from "react-native-screens";
import AuthHeader from "./AuthHeader";

enableScreens();

const Stack = createStackNavigator<AuthStackParams>();

function AuthStack() {
  return (
    <Stack.Navigator
      initialRouteName={Routes.Login}
      screenOptions={{
        header: ({ scene, navigation, options }) => {
          const title = options.headerTitle ?? scene.route.name;
          return <AuthHeader title={title as string} />;
        },
      }}
    >
      <Stack.Screen
        name={Routes.Login}
        component={LoginScreen}
        options={{
          headerTitle: "Login",
          headerShown: false,
        }}
      />

      <Stack.Screen
        name={Routes.Signup}
        component={SignupScreen}
        options={{
          headerTitle: "Signup",
          //   headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

export default React.memo(AuthStack);
