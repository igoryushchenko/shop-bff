import { getDbClient } from './dbClient';

const getAllQuery = 'SELECT p.id, p.title, p.description, p.img, p.price, s.count ' +
    'FROM product p ' +
    'LEFT JOIN stock s ON p.id = s.product_id';

const getByIdQuery = 'SELECT p.id, p.title, p.description, p.img, p.price, s.count ' +
    'FROM product p ' +
    'LEFT JOIN stock s ON p.id = s.product_id ' +
    'where p.id = $1';

const getAllProducts = async () => {
    const client = getDbClient();
    await client.connect();
    try {
        const res = await client.query(getAllQuery);
        return res ? res.rows : [];
    } catch (e) {
        console.error(e);
        throw e;
    } finally {
        await client.end();
    }
};

const getProductById = async (id: string) => {
    const client = getDbClient();
    await client.connect();
    try {
        const res = await client.query(getByIdQuery, [id])
        return res && res.rows ? res.rows[0] : undefined;
    } catch (e) {
        console.error(e);
        throw e;
    } finally {
        await client.end();
    }
};

export { getAllProducts, getProductById };
