import { FastifyInstance } from "fastify";
import { OrdersService } from "../services/orders.service";

export async function ordersRoutes(app: FastifyInstance, service: OrdersService) {
  app.post("/orders", async (request) => {
    const body = request.body as any;
    return service.createOrder(body);
  });

  app.get("/orders/:id", async (request) => {
    const { id } = request.params as any;
    return service.getOrderById(id);
  });
}
