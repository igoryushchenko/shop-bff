import { getProductById, getProductsList } from '../src/handlers';
import { APIGatewayProxyEvent } from 'aws-lambda';

const productId = '7567ec4b-b10c-48c5-9345-fc73c48a80a6';

describe('products', () => {
    it('should return response with products array', async () => {
        const event = {} as APIGatewayProxyEvent;

        const result = await getProductsList(event);

        expect(result.statusCode).toEqual(200);
        const body = JSON.parse(result.body);
        expect(body.length).toBeGreaterThan(0);
    });

    it('should return response with product by id', async () => {
        const event = {} as APIGatewayProxyEvent;
        event.pathParameters = {
            id: productId
        };

        const result = await getProductById(event);

        expect(result.statusCode).toEqual(200);
        const body = JSON.parse(result.body);
        expect(body.id).toEqual(productId);
    });

    it('should return 404 for invalid product id', async () => {
        const event = {} as APIGatewayProxyEvent;
        event.pathParameters = {
            id: 'not_found'
        };

        const result = await getProductById(event);

        expect(result.statusCode).toEqual(404);

    });
});