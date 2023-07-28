import { PhotosStore } from "./PhotosStore";

export class RootStore {
        photosStore: any;

    constructor() {
        this.photosStore = new PhotosStore(this);

        this.getApiUrl();
    }

    getApiUrl() {
        // this.apiUrl = process.env.NEXT_PUBLIC_REACT_APP_PROVIDERS_REMOTE_SERVER_BASE_URL;
    }
}
