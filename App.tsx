import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "./src/screens/HomeScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DetailsScreen from "./src/screens/DetailsScreen";
import { RootStore } from "./src/store/";
import StoreProvider from "./src/store/StoreProvider";

const Stack = createNativeStackNavigator();
const rootStore = new RootStore();

function App(): Element {
  return (
    <StoreProvider store={rootStore}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Details" component={DetailsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </StoreProvider>
  );
}


export default App;
