import { SQSEvent, SQSHandler } from 'aws-lambda';
import AWS from '../services/aws';
import { saveProductBatch } from '../services/saveProductBatch';

const catalogBatchProcess: SQSHandler = async (event: SQSEvent): Promise<void> => {
    const sns = new AWS.SNS();
    const products = event.Records.map(({ body }) => JSON.parse(body));
    try {
        await saveProductBatch(products);
        await sns.publish({
            TopicArn: process.env.SNS_ARN,
            Subject: 'Import service notification',
            Message: `${products.length} products have been imported.`
        }).promise();
    } catch (err) {
        console.log(err);
    }

};

export { catalogBatchProcess };
