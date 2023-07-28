import axios from 'axios';
import { setupAxios } from '../../../utils/setupAxios';
import { App } from "../../../config/app";

const client = axios.create({ baseURL: App.API_URL });
console.log(client);
setupAxios(client);

export default client;
