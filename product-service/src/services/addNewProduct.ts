import { ProductRequestBody } from './types';
import { createProduct } from '../repositories';

const addNewProduct = async (newProduct: ProductRequestBody): Promise<void> => {
    await createProduct({
        ...newProduct,
        price: newProduct.price * 100,
    });
};

export { addNewProduct };
