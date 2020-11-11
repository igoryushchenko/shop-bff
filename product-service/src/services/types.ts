export type Product = {
    id: string;
    title: string;
    img: string;
    price: number;
    count: number;
    description?: string;
};

export type ProductRequestBody = {
    title: string;
    img: string;
    price: number;
    count: number;
    description: string;
};

