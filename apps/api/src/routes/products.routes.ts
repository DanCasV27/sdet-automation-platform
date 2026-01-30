import { FastifyInstance } from "fastify";
import { ProductsService } from "../services/products.service";

export async function productsRoutes(app: FastifyInstance, service: ProductsService) {
  app.get("/products", async () => {
    return service.listProducts();
  });
}
