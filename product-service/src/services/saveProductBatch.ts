import { ProductRequestBody } from './types';
import { createProductBatch } from '../repositories'

export const saveProductBatch = async (newProducts: ProductRequestBody[]): Promise<void> => {
    await createProductBatch(newProducts);
};
