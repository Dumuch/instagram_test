import { makeAutoObservable, runInAction } from "mobx";
import container from "../../container/container";
import { Photo, PhotoListFilter } from "../../models/Photo";
import { RootStore } from "./root";
import AsyncStorage from "@react-native-async-storage/async-storage";

const api = container.apiClient;
const PHOTOS_STORAGE_KEY = "photo-list";

interface List {
  items: Photo[];
  isLoading: boolean;
  isFetched: boolean;
}

interface Item {
  item?: Photo;
  isLoading: boolean;
  isFetched: boolean;
}


export class PhotosStore {
  list: List = {
    items: [],
    isLoading: false,
    isFetched: false
  };

  item: Item = {
    isLoading: false,
    isFetched: false
  };

  filter: PhotoListFilter = {
    title: ""
  };

  rootStore: RootStore;

  constructor(rootStore: RootStore) {
    makeAutoObservable(this);
    this.rootStore = rootStore;
  }

  get isLoading() {
    return this.list.isLoading || this.item.isLoading;
  }

  get filteredList() {
    return this.list.items.filter(item => {
      const textMatches = !this.filter.title || item.title.includes(this.filter.title);
      return textMatches;
    });
  }

  get isApplyingFilter() {
    return !!this.filter.title;
  }

  async fetchList(limit = 10, offset = 0) {
    if (this.isLoading) {
      return;
    }
    this.list.isLoading = true;
    try {
      const { data } = await api.photosList({ limit, offset });
      runInAction(() => {
        if (offset > 0) {
          this.list.items = [...this.list.items, ...data.photos];
        } else {
          this.list.items = data.photos;
        }
        this.list.isFetched = true;
      });
      await AsyncStorage.setItem(PHOTOS_STORAGE_KEY, JSON.stringify(this.list.items));
    } catch (e) {
      const jsonValue = await AsyncStorage.getItem(PHOTOS_STORAGE_KEY);
      if (jsonValue) {
        runInAction(() => {
          this.list.items = JSON.parse(jsonValue);
          this.list.isFetched = true;
        });
      }
      throw new Error();
    } finally {
      runInAction(() => {
        this.list.isLoading = false;
      });
    }
  }

  getDetails(id: number) {
    if (this.isLoading) {
      return;
    }
    this.list.isLoading = true;
    const findDetails = this.list.items.find(item => item.id === id);

    if (findDetails) {
      this.item.isFetched = true;
      this.item.item = findDetails;
    }
    this.list.isLoading = false;
  }

  applyFilter(params: PhotoListFilter) {
    runInAction(() => {
      this.filter = params;
    });
  }
}
