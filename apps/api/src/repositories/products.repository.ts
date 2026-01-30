import { Product } from '../models/product';
export interface IProductRepostiory {
    getAll():Promise<Product[]>;
    existsById(id:string):Promise<boolean>;
    getByIds(ids: string[]): Promise<Product[]>;
}