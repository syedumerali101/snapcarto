import Colors from "@/styles/Colors";
import Metrics from "@/styles/Metrics";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  backgroundContainer: {
    flex: 1,
  },

  mainContainer: {
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: Colors.background.black3,
  },

  mainLoginContainer: {
    paddingHorizontal: Metrics.screenWidth * 0.03,
    marginTop: Metrics.screenHeight * 0.25,
  },

  loginTextStyle: {
    fontSize: Metrics.ratio(20),
    fontWeight: "bold",
    color: Colors.text.white,
  },

  blurContainer: {
    marginTop: Metrics.ratio(10),
    borderRadius: Metrics.ratio(20),
    padding: Metrics.ratio(10),
    paddingVertical: Metrics.ratio(20),
  },

  tagLineText: {
    color: Colors.text.white,
    fontSize: Metrics.ratio(12),
    fontWeight: "500",
    marginBottom: Metrics.ratio(10),
  },

  newAccountView: {
    flexDirection: "row",
    alignItems: "center",
  },

  newAccountText:{
    color: Colors.text.white,
    fontSize: Metrics.ratio(12),
    marginTop: Metrics.ratio(15)
  },

   termsConditionsView: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default styles;
