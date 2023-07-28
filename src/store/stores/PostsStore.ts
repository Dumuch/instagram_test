import { makeAutoObservable, runInAction } from "mobx";

export class PostsStore {
  list: any = {
    items: [],
    isLoading: false,
    isFetched: false,
    count: 0,
  };

  item: any = {
    isLoading: false,
    isFetched: false,
  };

  rootStore: any;

  constructor(rootStore: any) {
    makeAutoObservable(this);
    this.rootStore = rootStore;
  }

  get isLoading() {
    return this.list.isLoading || this.item.isLoading;
  }

  async fetchList() {
    if (this.isLoading) {
      return;
    }

    this.list.isLoading = true;

    try {
      // const { data } = await api.propertyList();
      runInAction(() => {
        // this.list.items = data.rows;
        // this.list.count = data.count;
        this.list.isFetched = true;
      });
      // return data.rows;
    } catch (e) {
    } finally {
      runInAction(() => {
        this.list.isLoading = false;
      });
    }
  }
}
