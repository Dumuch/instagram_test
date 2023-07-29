import { ActivityIndicator, FlatList, Image, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { useStores } from "../store";
import { NavigationProp, ParamListBase } from "@react-navigation/native";
import { Photo } from "../models/Photo";
import { ScreensEnum } from "../models/Screens";
import { observer } from "mobx-react";

interface Props {
  navigation: NavigationProp<ParamListBase>;
}

const PhotosList: React.FC<Props> = observer(({ navigation }) => {
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


  const PhotoItem: React.FC<{ item: Photo}> = ({ item }) => {
    const openDetails = () => {
      photosStore.getDetails(item.id);
      navigation.navigate(ScreensEnum.details)
    };
    return <TouchableOpacity onPress={openDetails}><Image source={{ uri: item.url }} style={styles.image} resizeMode="cover" /></TouchableOpacity>;
  };

  return (
    <FlatList
      data={photosStore.list.items}
      renderItem={PhotoItem}
      keyExtractor={(item) => item.id.toString()}
      onEndReached={handleLoadMore}
      onEndReachedThreshold={0.1}
      ListFooterComponent={photosStore.isLoading ? <ActivityIndicator size="large" style={styles.activityIndicator} /> : null}
    />
  );
});

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 200,
    marginBottom: 10
  },
  activityIndicator: {
    marginTop: 20,
    marginBottom: 20
  }
});

export default PhotosList;
