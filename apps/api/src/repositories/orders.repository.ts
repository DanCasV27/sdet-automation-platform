import {Order} from '../models/order';

export interface IOrderRepository {
    create(order:Order):Promise<Order>;
    getById(id:string):Promise<Order | null>;
}