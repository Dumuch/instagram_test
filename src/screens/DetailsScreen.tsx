import {
  Button, Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextStyle,
  useColorScheme,
  View
} from "react-native";
import { useStores } from "../store";
import React from "react";
function DetailsScreen() {
  const { photosStore } = useStores();
  const details = photosStore.item.item;
  console.log(photosStore.item.item);
  return(
    <View style={styles.container}>
      <Image source={{ uri: details?.url }} style={styles.image} resizeMode="cover" />
      <Text style={styles.sectionTitle}>{details?.title}</Text>
      <Text style={styles.sectionDescription}>{details?.description}</Text>
    </View>
  )
}

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
  },
});

export default DetailsScreen;
