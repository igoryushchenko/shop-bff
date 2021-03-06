import { APIGatewayEvent } from 'aws-lambda';
import { HttpServiceError } from '../errors/HttpServiceError';
import { getAll, getById } from '../services';
import { addNewProduct } from '../services/addNewProduct';
import { catalogBatchProcess } from './catalogBatchProcess';

type LambdaResult = {
    headers: Record<string, string | boolean>;
    isBase64Encoded: boolean;
    statusCode: number;
    body: string;
};

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

    if (!id) {
        throw new HttpServiceError('Missing required parameter - id', 400);
    }

    const result = await getById(id);
    if (!result) {
        throw new HttpServiceError(`Product with id=${id} not found`, 404);
    }
    return result;
});

const addProduct = withApiGwMiddleware(async (event) => {
    const {
        body: { title, description, img, price, count }
    } = event;

    return await addNewProduct({
        title,
        description,
        img,
        price,
        count
    });
});


export { getProductsList, getProductById, addProduct, catalogBatchProcess };
