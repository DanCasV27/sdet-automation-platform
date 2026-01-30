import { randomUUID } from "crypto";
import { Order } from "../models/order";
import { IOrderRepository } from "../repositories/orders.repository";
import { IProductRepostiory } from "../repositories/products.repository";
import { NotFoundError, ValidationError } from "../errors/domain-errors";

type CreateOrderInput = {
  items: { productId: string; quantity: number }[];
};

export class OrdersService {
  constructor(
    private readonly ordersRepo: IOrderRepository,
    private readonly productsRepo: IProductRepostiory
  ) {}

  async createOrder(input: CreateOrderInput): Promise<Order> {
    if (!input.items || input.items.length === 0) {
      throw new ValidationError("Order must include at least one item");
    }

    for (const item of input.items) {
        if (!item.productId || item.quantity <= 0) {
            throw new ValidationError("Invalid order item", item);
        }
        const exists = await this.productsRepo.existsById(item.productId);
        if (!exists) {
            throw new ValidationError("Product does not exist", { productId: item.productId });
        }
    }

    const productIds = input.items.map(i => i.productId);
    const products = await this.productsRepo.getByIds(productIds); // Changed to getByIds

    const priceById = new Map(products.map(p => [p.id, p.price]));
    const total = input.items.reduce((sum, i) => sum + (Number(priceById.get(i.productId)) || 0) * i.quantity, 0);

    const order: Order = {
        id: randomUUID(),
        items: input.items,
        total,
        createdAt: new Date(),
    };

    return this.ordersRepo.create(order);
  }

  async getOrderById(id: string): Promise<Order> {
    const order = await this.ordersRepo.getById(id);
    if (!order) throw new NotFoundError("Order", { id });
    return order;
  }
}
