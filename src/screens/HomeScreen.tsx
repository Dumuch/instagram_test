import {
  StyleSheet,
  Text,
  View
} from "react-native";
import React, { PropsWithChildren } from "react";
import { NavigationProp, ParamListBase } from "@react-navigation/native";
import { observer } from "mobx-react";
import PhotoList from "../components/PhotoList";

type HomeScreenProps = PropsWithChildren<{
  navigation: NavigationProp<ParamListBase>;
}>;

const HomeScreen = observer(({ navigation }: HomeScreenProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <PhotoList navigation={navigation} />
      </View>
    </View>
  );
});

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
    textAlign: "center"
  }
});

export default HomeScreen;
