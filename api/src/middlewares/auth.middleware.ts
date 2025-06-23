import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { getCookie } from '../utils/getCookie';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    use(req: Request, _: Response, next: NextFunction) {
        const token = getCookie('access_token', req);

        if (token && !req.headers.authorization) {
            req.headers.authorization = `Bearer ${token}`;
        }

        next();
    }
}
