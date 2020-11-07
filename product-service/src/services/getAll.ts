import { Product } from './types';
import { getAllProducts } from '../repositories';

export const getAll = async (): Promise<Product[]> => {
    return await getAllProducts();
};
