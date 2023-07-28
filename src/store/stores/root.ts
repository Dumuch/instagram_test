import { PostsStore } from "./PostsStore";

export class RootStore {
        postsStore: any;

    constructor() {
        this.postsStore = new PostsStore(this);

        this.getApiUrl();
    }

    getApiUrl() {
        // this.apiUrl = process.env.NEXT_PUBLIC_REACT_APP_PROVIDERS_REMOTE_SERVER_BASE_URL;
    }
}
