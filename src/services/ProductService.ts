import boom from '@hapi/boom';
import { faker } from '@faker-js/faker';

import { Product } from '../interfaces';

export class ProductService {
  products: Product[] = [];
  blockedMessage: 'Product is blocked';
  notFoundMessage: 'Product does not exist';

  constructor() {
    console.log('Service initialized');
    this.generate();
  }

  private generate() {
    for (let i = 0; i < 100; i++) {
      const product: Product = {
        id: faker.datatype.uuid(),
        image: faker.image.imageUrl(),
        name: faker.commerce.productName(),
        price: faker.commerce.price(200, 4000, 0, '$'),
        isBlocked: false,
      };
      this.products.push(product);
    }
  }

  async create(data: {
    image: string;
    name: string;
    price: number;
    isBlocked?: boolean;
  }) {
    const { image, name } = data;
    const price = '$'.concat(data.price.toString());
    const isBlocked = data.isBlocked ? data.isBlocked : false;
    const newProduct: Product = {
      id: faker.datatype.uuid(),
      image,
      name,
      price,
      isBlocked,
    };
    this.products.push(newProduct);
    return newProduct;
  }

  async findAll() {
    return this.products;
  }

  async findOne(id: string) {
    const product = this.products.find((item) => item.id === id);
    if (!product) throw boom.notFound(this.notFoundMessage);
    if (product.isBlocked) throw boom.conflict(this.blockedMessage);
    return product;
  }

  async update(id: string, changes: any) {
    const index = this.products.findIndex((item) => item.id === id);
    if (index === -1) throw boom.notFound(this.notFoundMessage);
    if (this.products[index].isBlocked)
      throw boom.conflict(this.blockedMessage);
    const product = this.products[index];
    this.products[index] = {
      ...product,
      ...changes,
    };
    return this.products[index];
  }

  async deleteOne(id: string) {
    const index = this.products.findIndex((item) => item.id === id);
    if (index === -1) throw boom.notFound(this.notFoundMessage);
    if (this.products[index].isBlocked)
      throw boom.conflict(this.blockedMessage);
    this.products.splice(index, 1);
    return { id };
  }
}
