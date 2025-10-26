import {Response as Response, Send} from 'express';
import Transformer from '@ship/core/transformers/transformer';

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