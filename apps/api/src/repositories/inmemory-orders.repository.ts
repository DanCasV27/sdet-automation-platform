import { Order } from "../models/order";
import { IOrderRepository } from "./orders.repository";

export class InMemoryOrdersRepository implements IOrderRepository {
  private readonly orders = new Map<string, Order>();

  async create(order: Order): Promise<Order> {
    this.orders.set(order.id, order);
    return order;
  }

  async getById(id: string): Promise<Order | null> {
    return this.orders.get(id) ?? null;
  }
}
