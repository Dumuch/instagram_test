import React from "react";
import { Image as ImageNative, StyleSheet, View, Text, ActivityIndicator } from "react-native";

interface Props {
  uri: string;
}

const Image: React.FC<Props> = ({ uri }) => {
  const [isLoading, setIsLoading] = React.useState(true);
  const handleImageLoaded = () => {
    setIsLoading(false);
  };

  return (
    <View>
      {isLoading && <ActivityIndicator size="large" style={styles.activityIndicator} />}
      <ImageNative onLoad={handleImageLoaded} source={{ uri }} style={styles.image} resizeMode="cover" />
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 200,
    marginBottom: 10
  },
  activityIndicator: {
    marginTop: 20,
    marginBottom: 20
  }
});

export default Image;
