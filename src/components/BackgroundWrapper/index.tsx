import images from "@/assets/images";
import {
  ImageBackground,
  ImageBackgroundProps,
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
      {children}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundContainer: {
    flex: 1,
  },
});

export default BackgroundWrapper;
