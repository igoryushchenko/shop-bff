create extention if not exists "uuid-ossp";

create table if not exists product
(
    id          uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    title       text NOT NULL,
    description text,
    img         text,
    price       int
);

create table if not exists stock
(
    id         uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id uuid UNIQUE NOT NULL,
    count      int,
    FOREIGN KEY (product_id) REFERENCES product (id)
);