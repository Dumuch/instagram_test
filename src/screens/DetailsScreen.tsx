import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import ImageView from "react-native-image-viewing";
import { useStores } from "../store";
import React, { PropsWithChildren } from "react";
import { NavigationProp, ParamListBase } from "@react-navigation/native";
import { observer } from "mobx-react";

type DetailsScreenProps = PropsWithChildren<{
  navigation: NavigationProp<ParamListBase>;
}>;
const DetailsScreen = observer(({ navigation }: DetailsScreenProps) => {
  const { photosStore } = useStores();
  const details = photosStore.item.item;
  const [visible, setIsVisible] = React.useState(false);
  const openPhoto = () => setIsVisible(prevState => !prevState);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={openPhoto}>
        <Image source={{ uri: details?.url }} style={styles.image} resizeMode="cover" />
      </TouchableOpacity>
      <Text style={styles.sectionTitle}>{details?.title}</Text>
      <Text style={styles.sectionDescription}>{details?.description}</Text>
      <ImageView
        images={[{ uri: details?.url }!]}
        imageIndex={0}
        visible={visible}
        onRequestClose={() => setIsVisible(false)}
      />
    </View>
  );
})

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  sectionContainer: {
    marginTop: 20,
    marginBottom: 20,
    paddingHorizontal: 24
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "600",
    textAlign: "center",
    margin: 20
  },
  sectionDescription: {
    fontSize: 18,
    textAlign: "center"
  },
  image: {
    width: "100%",
    height: 200,
    marginBottom: 10
  }
});

export default DetailsScreen;
