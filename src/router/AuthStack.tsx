import { useAuth } from "@/context/AuthContext";
import LoginScreen from "@/modules/screens/auth/LoginScreen";
import SignupScreen from "@/modules/screens/auth/SignupScreen";
import HomeScreen from "@/modules/screens/home/HomeScreen";
import Routes, { AuthStackParams } from "@/utils/Routes";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { enableScreens } from "react-native-screens";
import AuthHeader from "./AuthHeader";

enableScreens();

const Stack = createStackNavigator<AuthStackParams>();

function AuthStack() {
  const { user } = useAuth();

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
          headerTitle: "Home",
          headerShown: false,
        }}
      />

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
