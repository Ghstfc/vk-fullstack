import axios, {AxiosError, AxiosResponse} from 'axios';

export const api = axios.create({
    // ${process.env.NEXT_PUBLIC_API_PROTOCOL}://${process.env.NEXT_PUBLIC_API_HOST}:${process.env.NEXT_PUBLIC_API_PORT}
    baseURL: `/api`,
    timeout: 20000,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true
});

api.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error: AxiosError) => {
        const responseError = error.response?.data;

        if (error.response?.status === 401) {
            window.location.href = '/auth/login';
        }

        if (responseError) {
            return Promise.reject(responseError);
        } else {
            return Promise.reject(new Error('Произошла неизвестная ошибка'));
        }
    }
);
