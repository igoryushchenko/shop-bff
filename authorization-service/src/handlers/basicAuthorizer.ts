import {
    APIGatewayAuthorizerResult,
} from 'aws-lambda';
import { APIGatewayTokenAuthorizerEvent } from 'aws-lambda/trigger/api-gateway-authorizer';

const basicAuthorizer = async (event: APIGatewayTokenAuthorizerEvent): Promise<APIGatewayAuthorizerResult> => {
    console.log('Event: ', JSON.stringify(event));

    if (event.type !== 'TOKEN') {
        throw new Error('Unsupported authorization method');
    }

    try {
        const token = event.authorizationToken.split(' ')[1];
        const creds = Buffer.from(token, 'base64').toString('utf8').split(':');
        const username = creds[0];
        const password = creds[1];

        const storedPassword = process.env[username];

        const effect = !storedPassword || storedPassword !== password ? 'Deny' : 'Allow';

        return generatePolicy(token, event.methodArn, effect);
    } catch (error) {
        console.error(error);
        throw error;
    }

};

const generatePolicy = (principalId: string, resource: string, effect = 'Deny'): APIGatewayAuthorizerResult => ({
    principalId,
    policyDocument: {
        Version: '2012-10-17',
        Statement: [
            {
                Action: 'execute-api:Invoke',
                Effect: effect,
                Resource: resource,
            },
        ],
    }
});

export { basicAuthorizer };
