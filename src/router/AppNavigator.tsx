import { useAuth } from "@/context/AuthContext";
import React from "react";
import AuthStack from "./AuthStack";
import MainStack from "./MainStack";

const AppNavigator = () => {
  const { user } = useAuth();
  if (user) {
    return <MainStack />;
  } else {
    return <AuthStack />;
  }
};

export default AppNavigator;
