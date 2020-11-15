import AWS from '../services/aws';
import csv from 'csv-parser';

const s3 = new AWS.S3();
const bucket = 'ndjs-aws-import-products';

const importFileParser = (event) => {
    for (const record of event.Records) {
        const s3Stream = s3.getObject({
            Bucket: bucket,
            Key: record.s3.object.key,
        }).createReadStream();

        s3Stream
            .pipe(csv())
            .on('headers', (headers) => {
                console.log(`csv headers: ${headers}`);
            })
            .on('error', (err) => {
                console.log(err);
            })
            .on('data', (data) => console.log(data))
            .on('end', async () => {
                console.log(`Moving parsed file from ${bucket}/${record.s3.object.key}`);

                await s3.copyObject({
                    Bucket: bucket,
                    CopySource: `${bucket}/${record.s3.object.key}`,
                    Key: record.s3.object.key.replace('uploaded', 'parsed'),
                }).promise();

                await s3.deleteObject({
                    Bucket: bucket,
                    Key: record.s3.object.key,
                }).promise();

                console.log(`Moved parsed file to ${bucket}/${record.s3.object.key.replace('uploaded', 'parsed')}`);
            });
    }
};

export { importFileParser };
