export default class CoreError extends Error {

    constructor(
        public message: string = 'Something went wrong!',
        public statusCode: number = 500
    ) {
        super(message);
    }
}