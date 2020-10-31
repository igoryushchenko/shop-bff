import productList from '../repositories/productList.json';
import { Product } from './types';

export const getById = async (id: string): Promise<Product | undefined> => {
    return Promise.resolve(productList.find(product => product.id === id));
};
