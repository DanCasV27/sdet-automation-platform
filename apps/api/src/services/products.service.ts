import { IProductRepostiory } from "../repositories/products.repository";
import { Product } from "../models/product"

export class ProductsService{
    constructor(private readonly productsRepo:IProductRepostiory){}

    async listProducts(): Promise<Product[]> {
        return this.productsRepo.getAll();
    }
}