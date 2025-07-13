import images from "@/assets/images";
import {
  ImageBackground,
  ImageBackgroundProps,
  ScrollView,
  StyleSheet,
} from "react-native";

type CustomImageBackgroundProps = React.PropsWithChildren<ImageBackgroundProps>;

const BackgroundWrapper = (props: CustomImageBackgroundProps) => {
  const { children, style, ...rest } = props;
  return (
    <ImageBackground
      source={images.authBackground}
      style={styles.backgroundContainer}
      {...rest}
    >
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ flexGrow: 1 }}
        automaticallyAdjustKeyboardInsets={true}
      >
        {children}
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundContainer: {
    flex: 1,
  },

  flex: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
});

export default BackgroundWrapper;
