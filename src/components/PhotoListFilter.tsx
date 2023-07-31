import {
  View, TextInput, StyleSheet
} from "react-native";
import React from "react";
import { useStores } from "../store";


const PhotoListFilter: React.FC = () => {
  const { photosStore } = useStores();
  const onChangeText = (text: string) => {
    photosStore.applyFilter({
      title: text
    });
  };
  return (
    <View style={styles.container}>
      <TextInput style={styles.textInput} placeholder={"Find image..."} onChangeText={onChangeText}/>
    </View>
  );
};

export default PhotoListFilter;


const styles = StyleSheet.create({
  textInput: {
    borderStyle: "solid",
    borderBottomWidth: 1,
    borderColor: "rgba(0, 0, 0,1)"
  },
  container: {
    marginVertical: 10
  }
});
