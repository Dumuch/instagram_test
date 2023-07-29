import { ActivityIndicator, FlatList, StyleSheet, TouchableOpacity, Text, View } from "react-native";
import React from "react";
import { useStores } from "../store";
import { NavigationProp, ParamListBase } from "@react-navigation/native";
import { Photo } from "../models/Photo";
import { ScreensEnum } from "../models/Screens";
import { observer } from "mobx-react";
import Image from "../UI/Image";
import { StyleProp } from "react-native/Libraries/StyleSheet/StyleSheet";
import { ViewStyle } from "react-native/Libraries/StyleSheet/StyleSheetTypes";

interface Props {
  navigation: NavigationProp<ParamListBase>;
  column?: number;
}

const PhotoList: React.FC<Props> = observer(({ navigation, column = 1 }) => {
  const [offset, setOffset] = React.useState(0);
  const { photosStore } = useStores();

  React.useEffect(() => {
    photosStore.fetchList();
  }, []);

  const handleLoadMore = () => {
    const currentOffset = offset + 10;
    setOffset(currentOffset);
    photosStore.fetchList(10, currentOffset);
  };


  const PhotoItem: React.FC<{ index: number, item: Photo }> = ({ index, item }) => {
    const openDetails = () => {
      photosStore.getDetails(item.id);
      navigation.navigate(ScreensEnum.details);
    };

    return (
      <TouchableOpacity
        onPress={openDetails}
        style={{ width: `${100 / column }%`,
          marginRight:  (index + 1) % column !== 0 ? 10 : 0,

             }}>

        <Image uri={item.url} />
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      style={styles.container}
      data={photosStore.list.items}
      renderItem={PhotoItem}
      keyExtractor={(item) => item.id.toString()}
      onEndReached={handleLoadMore}
      onEndReachedThreshold={0.1}
      numColumns={column}
      key={column}
      ListFooterComponent={photosStore.isLoading ?
        <ActivityIndicator size="large" style={styles.activityIndicator} /> : null}
    />
  );
});

const styles = StyleSheet.create({
  activityIndicator: {
    marginTop: 20,
    marginBottom: 20
  },
  container: {
    flex: 1
  }
});


export default PhotoList;
