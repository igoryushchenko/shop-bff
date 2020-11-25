import AWS from '../services/aws';
import { HttpServiceError } from '../errors/HttpServiceError';
import { withApiGwMiddleware } from '../utils/middlewares';

const s3 = new AWS.S3();
const bucket = process.env.S3_IMPORT_PRODUCTS;

const importProductsFile = withApiGwMiddleware(async (event) => {
    const {
        queryStringParameters: { name },
    } = event;

    if (!name) {
        throw new HttpServiceError('Missing required parameter - name', 400);
    }

    const filePath = `uploaded/${name}`;
    const params = {
        Bucket: bucket,
        Key: filePath,
        ContentType: 'text/csv',
        Expires: 60
    }

    return await s3.getSignedUrlPromise('putObject', params);
});

export { importProductsFile };