import AsyncStorage from "@react-native-async-storage/async-storage";

export const setStorage = async (key: string, value: any) => {
  await AsyncStorage.setItem(key, JSON.stringify(value));
};

export const getStorage = async (key: string) => {
  const jsonValue = await AsyncStorage.getItem(key);
  if (jsonValue) {
    return JSON.parse(jsonValue);
  }
  return null;
};
