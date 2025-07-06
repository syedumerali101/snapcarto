export enum Routes {
  Home = "Home",
  Login = "Login",
  Signup = "Signup",
}

export type RootStackParams = {
  [Routes.Home]: undefined;
  [Routes.Login]: undefined;
};

export type AuthStackParams = {
  [Routes.Login]: undefined;
  [Routes.Signup]: undefined;
};

export type NavigationParams = RootStackParams;

export default Routes;
