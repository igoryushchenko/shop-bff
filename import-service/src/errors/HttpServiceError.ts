export class HttpServiceError extends Error {
    statusCode: number;

    constructor(
        message = 'An unknown error happened',
        statusCode = 500,
    ) {
        super(message);
        this.statusCode = statusCode;
        this.name = 'HttpServiceError';
    }
}
