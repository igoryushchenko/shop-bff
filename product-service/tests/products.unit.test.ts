import { getProductById, getProductsList } from '../src/handlers';
import { APIGatewayProxyEvent } from 'aws-lambda';
import productList from './mocks/productList.json';
import * as products from '../src/repositories'
import sinon from 'sinon';

const productId = '7567ec4b-b10c-48c5-9345-fc73c48a80a6';

const sandbox = sinon.createSandbox();

describe('products', () => {
    afterEach(() => {
        sandbox.restore();
    });

    it('should return response with products array', async () => {
        const getAllProductsStub = sandbox
            .stub(products, 'getAllProducts')
            .returns(productList);

        const event = {} as APIGatewayProxyEvent;

        const result = await getProductsList(event);

        expect(result.statusCode).toEqual(200);
        const body = JSON.parse(result.body);
        expect(body.length).toBeGreaterThan(0);

        sinon.assert.calledOnce(getAllProductsStub);
    });

    it('should return response with product by id', async () => {
        const getSingleProductsStub = sandbox
            .stub(products, 'getProductById')
            .returns(productList.find(product => product.id === productId));

        const event = {} as APIGatewayProxyEvent;
        event.pathParameters = {
            id: productId
        };

        const result = await getProductById(event);

        expect(result.statusCode).toEqual(200);
        const body = JSON.parse(result.body);
        expect(body.id).toEqual(productId);

        sinon.assert.calledOnce(getSingleProductsStub);
    });

    it('should return 404 for invalid product id', async () => {
        const getSingleProductsStub = sandbox
            .stub(products, 'getProductById')
            .returns(undefined);

        const event = {} as APIGatewayProxyEvent;
        event.pathParameters = {
            id: 'not_found'
        };

        const result = await getProductById(event);

        expect(result.statusCode).toEqual(404);

        sinon.assert.calledOnce(getSingleProductsStub);
    });
});