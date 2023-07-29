import {
  StyleSheet, Switch,
  View, Text
} from "react-native";
import React, { PropsWithChildren } from "react";
import { NavigationProp, ParamListBase } from "@react-navigation/native";
import { observer } from "mobx-react";
import PhotoList from "../components/PhotoList";
import PhotoListFilter from "../components/PhotoListFilter";

type HomeScreenProps = PropsWithChildren<{
  navigation: NavigationProp<ParamListBase>;
}>;

const HomeScreen = observer(({ navigation }: HomeScreenProps) => {
  const [isOneColumnView, setOneColumnView] = React.useState(true);
  const changeView = () => setOneColumnView(prevState => !prevState);
  return (
    <View style={styles.container}>
      <View style={styles.changeViewSwitchContainer}>
        <Text>Change view </Text>
        <Switch value={!isOneColumnView} onChange={changeView} />
      </View>
      <PhotoListFilter />
      <View style={styles.container}>
        <PhotoList column={isOneColumnView ? 1 : 2} navigation={navigation} />
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%"
  },
  changeViewSwitchContainer: {
    marginTop: 20,
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
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
