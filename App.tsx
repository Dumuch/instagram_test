import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { RootStore } from "./src/store/";
import StoreProvider from "./src/store/StoreProvider";
import Screens from "./src/screens";

const rootStore = new RootStore();

function App(): Element {
  return (
    <StoreProvider store={rootStore}>
      <NavigationContainer>
        <Screens />
      </NavigationContainer>
    </StoreProvider>
  );
}


export default App;
