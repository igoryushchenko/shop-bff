import { APIGatewayEvent } from 'aws-lambda';
import { HttpServiceError } from '../errors/HttpServiceError';
import { getAll, getById } from '../services';

type LambdaResult = {
    headers: Record<string, string | boolean>;
    isBase64Encoded: boolean;
    statusCode: number;
    body: string;
};

const withApiGwMiddleware = (handler) => async (event: APIGatewayEvent): Promise<LambdaResult> => {
    let body;
    let headers = {};
    let statusCode = 200;

    try {
        body = await handler(event);
        console.log(body);
    } catch (error) {
        if (error instanceof HttpServiceError) {
            ({ statusCode } = error)
        } else {
            statusCode = 500
        }
        body = {
            message: error.message
        }
    }

    return {
        headers,
        isBase64Encoded: false,
        statusCode,
        body: JSON.stringify(body),
    };
};

const getProductsList = withApiGwMiddleware(async () => {
    return await getAll();
});

const getProductById = withApiGwMiddleware(async (event) => {
    const {
        pathParameters: { id },
    } = event;
    const result = await getById(id);
    if (!result) {
        throw new HttpServiceError(`Product with id=${id} not found`, 404);
    }

    return result;
});


export { getProductsList, getProductById };
