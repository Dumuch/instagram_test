import { makeAutoObservable, runInAction } from "mobx";
import container from "../../container/container";

const api = container.apiClient;

export class PhotosStore {
  list: any = {
    items: [],
    isLoading: false,
    isFetched: false,
  };

  item: any = {
    isLoading: false,
    isFetched: false
  };

  rootStore: any;

  constructor(rootStore: any) {
    makeAutoObservable(this);
    this.rootStore = rootStore;
  }

  get isLoading() {
    return this.list.isLoading || this.item.isLoading;
  }

  async fetchList(limit = 10) {
    if (this.isLoading) {
      return;
    }
    this.list.isLoading = true;
    try {
      const { data } = await api.photosList({ limit});
      runInAction(() => {
        this.list.items = data.photos;
        this.list.isFetched = true;
      });
    } catch (e) {

    } finally {
      runInAction(() => {
        this.list.isLoading = false;
      });
    }
  }
}
