import AWS from 'aws-sdk';
import sinon from 'sinon';
import { importProductsFile } from '../src/handlers';
import { APIGatewayProxyEvent } from 'aws-lambda';

const sandbox = sinon.createSandbox();

describe('products', () => {
    afterEach(() => {
        sandbox.restore();
    });

    it('should generate signed url', async () => {
        const fileName = 'test.csv';
        const signedUrl = `https://signed-url${fileName}`;

        const awsStub = sandbox
            .stub(AWS.S3.prototype, 'getSignedUrlPromise')
            .returns(Promise.resolve(signedUrl));

        const event = {} as APIGatewayProxyEvent;
        event.queryStringParameters = { name: fileName };

        const result = await importProductsFile(event);

        console.log(result);
        expect(result.statusCode).toEqual(200);
        const body = JSON.parse(result.body);
        expect(body).toEqual(signedUrl);

        sinon.assert.calledOnce(awsStub);
    });

    it('should return 400 on missing parameter', async () => {
        const fileName = 'test.csv';
        const signedUrl = `https://signed-url${fileName}`;

        const awsStub = sandbox
            .stub(AWS.S3.prototype, 'getSignedUrlPromise')
            .returns(Promise.resolve(signedUrl));

        const event = {} as APIGatewayProxyEvent;
        event.queryStringParameters = { invalid: fileName };

        const result = await importProductsFile(event);

        expect(result.statusCode).toEqual(400);

        sinon.assert.notCalled(awsStub);
    });

});
