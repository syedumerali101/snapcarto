import React, { createContext, ReactNode, useContext, useState } from "react";
import { Alert } from "react-native";

type User = {
  email: string;
  name?: string;
};

type AuthContextType = {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [allUsers, setAllUsers] = useState([]);

  const login = async (email: string, password: string) => {
    const findUser = allUsers?.find((user) => user.email === email);
    if (findUser) {
      if (findUser?.password === password) {
        setUser({ email });
        Alert.alert("User logged in successfully")
        return
      } else {
        Alert.alert("Incorrect Credentials")
        return
      }
    } else {
      Alert.alert("User does not exist")
      return
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    const findRegisteredUser = allUsers?.find((user) => user?.email === email);
    if (findRegisteredUser) {
      Alert.alert("User already exists");
      return;
    }
    const newUser = { name, email, password };
    setAllUsers((prev) => [...prev, newUser]);
    setUser({ name, email });
    Alert.alert("User has been registered successfully");
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const check = useContext(AuthContext);
  if (!check) Alert.alert("useAuth must be used within AuthProvider");
  return check;
};
