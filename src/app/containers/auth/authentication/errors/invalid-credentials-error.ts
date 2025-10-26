import CoreError from '@ship/core/errors/core-error';

export default class InvalidCredentialsError extends CoreError {

    constructor(
        public message: string = 'Invalid credentials',
        public statusCode: number = 401,
    ) {
        super(message);
    }
}