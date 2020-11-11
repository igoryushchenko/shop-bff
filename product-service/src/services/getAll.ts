import { Product } from './types';
import { getAllProducts } from '../repositories';

export const getAll = async (): Promise<Product[]> => {
    const result = await getAllProducts();
    return result.map(product => {
        return {...product, price: product.price / 100}
    });
};
