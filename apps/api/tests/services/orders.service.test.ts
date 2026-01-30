import {describe,it,expect,beforeEach} from "vitest";
import {OrdersService} from "../../src/services/orders.service";
import {InMemoryOrdersRepository} from "../../src/repositories/inmemory-orders.repository";
import { InMemoryProductsRepository } from "../../src/repositories/inmemory-products.repository";
import { ValidationError, NotFoundError } from "../../src/errors/domain-errors";

describe("OrdersService", () => {
    let service: OrdersService;

    beforeEach(() => {
        const productsRepo= new InMemoryProductsRepository();
        const ordersRepo = new InMemoryOrdersRepository();
        service = new OrdersService(ordersRepo, productsRepo);
    });

    //Positive scenario where the order is created.
    it("creates an order when products exist", async () => {
        const order = await service.createOrder({
          items: [
            { productId: "p1", quantity: 1 },
            { productId: "p2", quantity: 2 }
          ]
        });
    
        expect(order.items.length).toBe(2);
        expect(order.total).toBe(1200 * 1 + 50 * 2);
        expect(order.id).toBeTruthy();
    });
      
     //Negative scenario where the product do not exist. 
    it("fails when product does not exist", async () => {
        await expect(
          service.createOrder({
            items: [{ productId: "nope", quantity: 1 }]
          })
        ).rejects.toBeInstanceOf(ValidationError);
    });

    //Negative scenario where items is empty
    it("fails when items are empty", async () =>{
        await expect(
            service.createOrder({
                items:[]
            })
        ).rejects.toBeInstanceOf(ValidationError);
    });

    //Negative scenario where item has invalid quantity
    it("fails when item has invalid quantity", async () =>{
        await expect(
            service.createOrder({
                items:[{productId:"p1", quantity:0}]
            })
        ).rejects.toBeInstanceOf(ValidationError);
    });

    //Negative scenario where order is not found
    it("Throws NotFounderError when trying to call create order without providing an order",async () =>{
        await expect(
            service.getOrderById("unknown")
        ).rejects.toBeInstanceOf(NotFoundError);
    })
});
