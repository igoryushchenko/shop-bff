import { Product } from './types';
import { getProductById } from '../repositories';

export const getById = async (id: string): Promise<Product | undefined> => {
    const result = await getProductById(id);
    return result ? {...result, price: result.price / 100} : result;
};
