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
import { useStores } from "../store";
function DetailsScreen() {
  const { photosStore } = useStores();
  console.log(photosStore.item.item);
  return(<Text>screen 2</Text>)
}

export default DetailsScreen;
