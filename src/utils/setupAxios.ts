import { AxiosInstance } from 'axios';
export const setupAxios = (axios: AxiosInstance) => {
    axios.interceptors.response.use(
        (response) => {
            const { data } = response.data;
            return data ? { ...response, data } : response;
        },
        async (e) => {
            return Promise.reject(e);
        }
    );
};
