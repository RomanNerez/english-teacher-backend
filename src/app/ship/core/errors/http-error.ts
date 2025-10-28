import CoreError from '@ship/core/errors/core-error';

export default class HttpError extends CoreError {

    constructor(
        public message: string = 'Bad request!',
        public statusCode: number = 400
    ) {
        super(message, statusCode);
    }
}