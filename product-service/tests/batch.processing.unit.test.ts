import * as AWSMock from "aws-sdk-mock";
import sinon from 'sinon';
import * as products from '../src/repositories';
import { catalogBatchProcess } from '../src/handlers';
import { SQSEvent } from 'aws-lambda';

const sandbox = sinon.createSandbox();

const productsBatch = [
    {
        count: 4,
        description: 'Long Description 1',
        price: 240,
        title: 'Product 1',
        img: 'https://images_1.jpg',
    },
    {
        count: 5,
        description: 'Long Description 2',
        price: 999,
        title: 'Product 2',
        img: 'https://images_2.jpg'
    }
];

describe('products', () => {

    afterEach(() => {
        sandbox.restore();
        AWSMock.restore('SNS', 'publish');
    });

    it('should save batch and send notification', async () => {

        process.env.SNS_ARN = 'test-sns-arn';

        let snsParams;

        const createProductBatchStub = sandbox
            .stub(products, 'createProductBatch');

        AWSMock.mock('SNS', 'publish',  (params, callback) => {
            snsParams = params;
            callback(undefined, 'success');
        });


        const event = {
            Records: productsBatch.map(item => {
                return {
                    body: JSON.stringify(item)
                };
            }),
        } as unknown as SQSEvent;

        await catalogBatchProcess(event, null, null);

        sinon.assert.calledOnce(createProductBatchStub);
        expect(snsParams.Subject).toEqual('Import service notification');


    });

});
