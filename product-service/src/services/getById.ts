import { Product } from './types';
import { getProductById } from '../repositories';

export const getById = async (id: string): Promise<Product | undefined> => {
    return await getProductById(id);
};
