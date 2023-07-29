import HomeScreen from "./HomeScreen";
import DetailsScreen from "./DetailsScreen";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ScreensEnum, ScreensEnumUI } from "../models/Screens";
const Stack = createNativeStackNavigator();

function Screens() {
  return (
    <Stack.Navigator initialRouteName={ScreensEnum.home}>
      <Stack.Screen name={ScreensEnum.home} options={{title: ScreensEnumUI.home}} component={HomeScreen} />
      <Stack.Screen name={ScreensEnum.details} options={{title: ScreensEnumUI.details}} component={DetailsScreen} />
    </Stack.Navigator>
  )
}

export default  Screens;
