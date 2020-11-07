import { getDbClient } from './dbClient';
import { Product } from '../services';
import { ProductRequestBody } from '../services/types';

const getAllQuery = 'SELECT p.id, p.title, p.description, p.img, p.price, s.count ' +
    'FROM product p ' +
    'LEFT JOIN stock s ON p.id = s.product_id';

const getByIdQuery = 'SELECT p.id, p.title, p.description, p.img, p.price, s.count ' +
    'FROM product p ' +
    'LEFT JOIN stock s ON p.id = s.product_id ' +
    'where p.id = $1';

const insertProductQuery = 'INSERT INTO product (title, description, img, price) VALUES ($1, $2, $3, $4) RETURNING id';
const insertStockQuery = 'INSERT INTO stock (count, product_id) VALUES ($1, $2)';

const getAllProducts = async (): Promise<Product[]> => {
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

const getProductById = async (id: string): Promise<Product | undefined> => {
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

const createProduct = async (newProduct: ProductRequestBody): Promise<void> => {
    const { title, description, price, img, count } = newProduct;
    console.log(JSON.stringify(newProduct));
    const client = getDbClient();
    await client.connect();
    try {
        await client.query('BEGIN');
        const res = await client.query(insertProductQuery, [title, description, img, price]);

        await client.query(insertStockQuery, [count, res.rows[0].id]);
        await client.query('COMMIT');
    } catch (e) {
        console.error(e);
        await client.query('ROLLBACK');
        throw e;
    } finally {
        await client.end();
    }
};

export { getAllProducts, getProductById, createProduct };
