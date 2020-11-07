import { Client } from 'pg';

const dbOptions = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
};

const getDbClient = () => {
    return new Client(dbOptions);
};

export { getDbClient };
