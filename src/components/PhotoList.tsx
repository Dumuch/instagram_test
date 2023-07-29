import { ActivityIndicator, FlatList,  StyleSheet, TouchableOpacity, Text } from "react-native";
import React from "react";
import { useStores } from "../store";
import { NavigationProp, ParamListBase } from "@react-navigation/native";
import { Photo } from "../models/Photo";
import { ScreensEnum } from "../models/Screens";
import { observer } from "mobx-react";
import Image from "../UI/Image";

interface Props {
  navigation: NavigationProp<ParamListBase>;
}

const PhotoList: React.FC<Props> = observer(({ navigation }) => {
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

    return <TouchableOpacity onPress={openDetails}>
      <Image uri={item.url} />
    </TouchableOpacity>;
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
  activityIndicator: {
    marginTop: 20,
    marginBottom: 20
  }
});

export default PhotoList;
