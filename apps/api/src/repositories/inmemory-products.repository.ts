import { Product } from "../models/product";
import { IProductRepostiory } from "./products.repository";

export class InMemoryProductsRepository implements IProductRepostiory {
  private readonly products: Product[] = [
    { id: "p1", name: "Laptop", price: 1200 },
    { id: "p2", name: "Mouse", price: 50 },
    { id: "p3", name: "Keyboard", price: 100 },
  ];

  async getAll(): Promise<Product[]> {
    return this.products;
  }

  async existsById(id: string): Promise<boolean> {
    return this.products.some(p => p.id === id);
  }

  async getByIds(ids: string[]): Promise<Product[]> {
    const set = new Set(ids);
    return this.products.filter(p => set.has(p.id));
  }
}
