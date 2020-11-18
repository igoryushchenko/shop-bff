import AWS from 'aws-sdk';

if (!AWS.config.region) {
    AWS.config.update({
        region: 'eu-west-1',
    });
}

export default AWS;
