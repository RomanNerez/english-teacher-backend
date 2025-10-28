import HttpError from '@ship/core/errors/http-error';

export default class UpdateResourceFailedError extends HttpError {

    constructor(
        public message: string = 'Failed to update Resource.',
        public statusCode: number = 500
    ) {
        super(message, statusCode);
    }
}