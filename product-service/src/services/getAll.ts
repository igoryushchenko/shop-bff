import productList from '../repositories/productList.json';
import { Product } from './types';

export const getAll = async (): Promise<Product[]> => {
    return Promise.resolve(productList);
};
