import { Request } from 'express';
import { parseCookies } from './parseCookies';

export const getCookie = (name: string, request: Request) => {
    if (request.headers.cookie) {
        return parseCookies(request.headers.cookie)[name];
    }
    return null;
};
