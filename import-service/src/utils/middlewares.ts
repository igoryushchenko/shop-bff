import { APIGatewayEvent } from 'aws-lambda';
import { LambdaResult } from '../types';

const withApiGwMiddleware = (handler) => async (event: APIGatewayEvent): Promise<LambdaResult> => {
    let body;
    let headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
    };
    let statusCode = 200;
    console.log(event);

    if (typeof event.body === 'string') {
        event.body = JSON.parse(event.body);
    }

    try {
        body = await handler(event);
    } catch (error) {
        if (error.name === 'HttpServiceError') {
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

export { withApiGwMiddleware };
