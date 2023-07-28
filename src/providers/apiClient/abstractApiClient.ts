import { AxiosPromise } from "axios";

export abstract class AbstractApiClient {

  abstract photosList({ limit }:any): AxiosPromise;

  abstract __extendHeaders(headers: { [key: string]: string | undefined }): void;

  setAuthorizationHeader(token: string, type = "Bearer"): void {
    this.__extendHeaders({ Authorization: `${type} ${token}` });
  }
}
