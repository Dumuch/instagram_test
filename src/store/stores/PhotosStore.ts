import { makeAutoObservable, runInAction } from "mobx";
import container from "../../container/container";
import { Photo } from "../../models/Photo";
import { RootStore } from "./root";

const api = container.apiClient;

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

  rootStore: any;

  constructor(rootStore: RootStore) {
    makeAutoObservable(this);
    this.rootStore = rootStore;
  }

  get isLoading() {
    return this.list.isLoading || this.item.isLoading;
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
    } catch (e) {

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
}
