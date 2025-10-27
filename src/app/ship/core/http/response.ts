import {CookieOptions, Response as Response, Send} from 'express';
import Transformer from '@ship/core/transformers/transformer';
import { SESSION_HTTP_ONLY, SESSION_LIFETIME, SESSION_SAME_SITE, SESSION_SECURE_COOKIE } from '@configs/session';

export default class AppResponse {

    constructor(private res: Response) {
    }

    static init(res: Response): AppResponse {
        return new AppResponse(res);
    }

    status(status: number = 200): this {
        this.res.status(status);

        return this;
    }

    setCookieKey(key: string, val: string, options: CookieOptions = {}): AppResponse {
        this.res.cookie(key, val, {
            secure: SESSION_SECURE_COOKIE,
            httpOnly: SESSION_HTTP_ONLY,
            sameSite: SESSION_SAME_SITE,
            maxAge: SESSION_LIFETIME,
            ...options,
        });

        return this;
    }

    clearCookie(key: string, options: CookieOptions = {}) {
        this.res.clearCookie(key, {
            secure: SESSION_SECURE_COOKIE,
            httpOnly: SESSION_HTTP_ONLY,
            sameSite: SESSION_SAME_SITE,
            ...options,
        });

        return this;
    }

    create<T>(data: T | T[], transformer: Transformer<T>, meta?: Record<string, any>) {
        const isCollection = Array.isArray(data);
        const serialized = isCollection
            ? transformer.collection(data)
            : transformer.transform(data);

        const payload = {
            data: serialized,
            meta: {
                includes: [],
                ...meta,
            },
        };

        return this.res.json(payload);
    }

    noContent() {
        return this.res.status(204).send();
    }
}