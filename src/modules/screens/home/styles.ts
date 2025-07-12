import Colors from "@/styles/Colors";
import Metrics from "@/styles/Metrics";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },

  blurContainer: {
    flex: 1,
    backgroundColor: Colors.background.green,
  },

  overlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: Colors.background.black2,
  },

  nameText: {
    color: Colors.text.white,
    fontSize: Metrics.ratio(22),
    fontWeight: "bold",
    textTransform: "capitalize",
  },

  emailText: {
    color: Colors.text.white,
    fontSize: Metrics.ratio(12),
  },

  emailView: {
    borderWidth: 1,
    borderColor: Colors.text.white,
    borderRadius: Metrics.ratio(20),
    paddingVertical: Metrics.ratio(5),
    paddingHorizontal: Metrics.ratio(10),
  },

  headerView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: Metrics.screenWidth * 0.9,
    alignSelf: "center",
    marginTop: Metrics.screenHeight * 0.12,
  },

  flatListStyle: {
    flex: 1,
    marginTop: Metrics.ratio(30),
    width: Metrics.screenWidth,
    paddingHorizontal: Metrics.ratio(10),
  },

  bgImageStyle: {
    height: Metrics.screenHeight,
    width: Metrics.screenWidth,
    position: "absolute",
  },

  detailsView: {
    justifyContent: "center",
  },
});

export default styles;
