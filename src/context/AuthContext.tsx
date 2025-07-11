import Helper from "@/utils/Helper";
import Routes from "@/utils/Routes";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

type User = {
  email: string;
  name?: string;
};

type AuthContextType = {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (
    name: string,
    email: string,
    password: string,
    navigation: {}
  ) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const REGISTED_USERS = "REGISTED_USERS";
  const LOGGED_USER = "LOGGED_USER";
  const [user, setUser] = useState<User | null>(null);
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    const restore = async () => {
      try {
        const storedUser = await AsyncStorage.getItem(LOGGED_USER);
        const allRegisteredUsers = await AsyncStorage.getItem(REGISTED_USERS);

        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }

        if (allRegisteredUsers) {
          setAllUsers(JSON.parse(allRegisteredUsers));
        }
      } catch (err) {
        Helper.showToast(err.message);
      }
    };

    restore();
  }, []);

  const login = async (email: string, password: string) => {
    const findUser = allUsers?.find((user) => user.email === email);
    if (!Helper.isEmailValid(email)) {
      Helper.showToast("Incorrect Email Address");
      return;
    }
    if (!Helper.isPasswordValid(password)) {
      Helper.showToast("Incorrect Password");
      return;
    }
    if (findUser) {
      if (findUser?.password === password) {
        const loggedInUser = { name: findUser.name, email: findUser.email };
        setUser(loggedInUser);
        await AsyncStorage.setItem(LOGGED_USER, JSON.stringify(loggedInUser));
        Helper.showToast("User logged in successfully");
        return;
      } else {
        Helper.showToast("Incorrect Credentials");
        return;
      }
    } else {
      Helper.showToast("User does not exist");
      return;
    }
  };

  const signup = async (
    name: string,
    email: string,
    password: string,
    navigation: {}
  ) => {
    if (!Helper.isNameValid(name)) {
      Helper.showToast("Name can not have numbers or symbols");
      return;
    }

    if (!Helper.isEmailValid(email)) {
      Helper.showToast("Incorrect Email Address");
      return;
    }

    if (!Helper.isPasswordValid(password)) {
      Helper.showToast("Password has to be atleast 6 characters long");
      return;
    }
    const findRegisteredUser = allUsers?.find((user) => user?.email === email);
    if (findRegisteredUser) {
      Helper.showToast("User already exists");
      return;
    }
    const newUser = { name, email, password };
    const allSignedUpUsers = [...allUsers, newUser];
    setAllUsers(allSignedUpUsers);
    await AsyncStorage.setItem(
      REGISTED_USERS,
      JSON.stringify(allSignedUpUsers)
    );
    navigation.navigate(Routes.Login);
    Helper.showToast("User has been registered successfully");
  };

  const logout = async () => {
    setUser(null);
    await AsyncStorage.removeItem(LOGGED_USER);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const check = useContext(AuthContext);
  if (!check) Helper.showToast("useAuth must be used within AuthProvider");
  return check;
};
