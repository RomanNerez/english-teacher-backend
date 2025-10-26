import CoreError from '@ship/core/errors/core-error';

export default class CreateResourceFailedError extends CoreError {

    constructor(
        public message: string = 'Failed to create Resource.',
        public statusCode: number = 500
    ) {
        super(message);
    }
}