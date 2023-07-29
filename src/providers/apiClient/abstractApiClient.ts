import { AxiosPromise } from "axios";
import { PhotosAPI, PhotosFetchAll } from "../../models/Photo";

export abstract class AbstractApiClient {

  abstract photosList(params: PhotosFetchAll): AxiosPromise<PhotosAPI>;

  abstract __extendHeaders(headers: { [key: string]: string | undefined }): void;

  setAuthorizationHeader(token: string, type = "Bearer"): void {
    this.__extendHeaders({ Authorization: `${type} ${token}` });
  }
}
