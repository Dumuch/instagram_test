import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextStyle,
  useColorScheme,
  View
} from "react-native";
import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions
} from "react-native/Libraries/NewAppScreen";
import React, { PropsWithChildren } from "react";
import { NavigationProp, ParamListBase } from "@react-navigation/native";
import { useStores } from "../store";
import { ScreensEnum } from "./Types";
import { observer } from "mobx-react";

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function Section({ children, title }: SectionProps): Element {
  const isDarkMode = useColorScheme() === "dark";
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black
          } as TextStyle
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark
          }
        ]}>
        {children}
      </Text>
    </View>
  );
}

type HomeScreenProps = PropsWithChildren<{
  navigation: NavigationProp<ParamListBase>;
}>;


const HomeScreen = observer(({ navigation }: HomeScreenProps) => {
  const isDarkMode = useColorScheme() === "dark";
  const { photosStore } = useStores();

  React.useEffect(() => {
    photosStore.fetchList();
  }, []);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter
  };
  console.log(312, photosStore.list.items)
  return (
    <ScrollView>

      <Text>screen 1</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate(ScreensEnum.details)}
      />
    </ScrollView>
  );
})

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "600"
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: "400"
  },
  highlight: {
    fontWeight: "700"
  }
});

export default HomeScreen;
