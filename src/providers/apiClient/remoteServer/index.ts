import qs from 'qs';
import { AbstractApiClient } from '../abstractApiClient';
import client from './client';
import { AxiosPromise } from "axios";
import apiRoutes from "../routes";

export class RemoteServerApiClient extends AbstractApiClient {
    __extendHeaders(headers: { [key: string]: string | undefined }) {
        for (const key of Object.keys(headers)) {
            // @ts-ignore
            client.defaults.headers[key] = headers[key];
        }
    }

    photosList(params: any): AxiosPromise {
        return client.get(apiRoutes.photos.list, {
            params,
            paramsSerializer: (params) => qs.stringify(params),
        });
    }
}
