import Fastify from "fastify";
import { DomainError } from "./errors/domain-errors";
import { InMemoryProductsRepository } from "./repositories/inmemory-products.repository";
import { InMemoryOrdersRepository } from "./repositories/inmemory-orders.repository";
import { ProductsService } from "./services/products.service";
import { OrdersService } from "./services/orders.service";
import { productsRoutes } from "./routes/products.routes";
import { ordersRoutes } from "./routes/orders.routes";

const app = Fastify({ logger: true });

// Health
app.get("/health", async () => ({ status: "ok" }));

// Error handler (centralized)
app.setErrorHandler((err, _req, reply) => {
  if (err instanceof DomainError) {
    reply.status(err.statusCode).send({
      code: err.code,
      message: err.message,
      details: err.details ?? null,
    });
    return;
  }
  app.log.error(err);
  reply.status(500).send({ code: "INTERNAL_ERROR", message: "Unexpected error" });
});

// Composition root (manual dependency injection)
const productsRepo = new InMemoryProductsRepository();
const ordersRepo = new InMemoryOrdersRepository();

const productsService = new ProductsService(productsRepo);
const ordersService = new OrdersService(ordersRepo, productsRepo);

// Routes (thin controllers)
app.register(async (instance) => productsRoutes(instance, productsService));
app.register(async (instance) => ordersRoutes(instance, ordersService));

// Exporting Fastify instance for testing and other purposes
export default app;