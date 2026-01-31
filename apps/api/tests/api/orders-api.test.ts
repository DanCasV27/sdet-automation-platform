import request from "supertest";
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { buildApp } from "../../src/app";

describe("Orders API Tests", () => {
    const app = buildApp();
    
    beforeAll(async () => {
        await app.ready();
    });

    afterAll(async () => {
        await app.close();
    });

    it("create new order and retrieve it", async () => {
        const createResponse = await request(app.server)
            .post("/orders")
            .send({ items: [{ productId: "p1", quantity: 1 }, { productId: "p2", quantity: 2 }] })
            .set("Content-Type", "application/json");

        expect(createResponse.status).toBe(200);
        expect(createResponse.body).toHaveProperty("id");
        expect(createResponse.body).toHaveProperty("items");
        expect(createResponse.body.total).toBe(1200 * 1 + 50 * 2);
    });

    it("create new order with non existing product",async () => {
        const res=await request(app.server)
        .post("/orders")
        .send({ items: [{ productId: "NO", quantity: 1 }, { productId: "NO", quantity: 2 }] })
        .set("Content-Type", "application/json");

        expect(res.status).toBe(400);
        expect(res.body).toMatchObject({code:"VALIDATION_ERROR"});
    })

    it("create new order with Product with invalid quantity",async () => {
        const res=await request(app.server)
        .post("/orders")
        .send({ items: [{ productId: "p1", quantity: 0 }, { productId: "p2", quantity: 0 }] })
        .set("Content-Type", "application/json");

        expect(res.status).toBe(400);
        expect(res.body).toMatchObject({code:"VALIDATION_ERROR"});
    })

    it("returns 404 when order does not exist", async () => {
        const res = await request(app.server).get("/orders/does-not-exist");
        expect(res.status).toBe(404);
        expect(res.body).toMatchObject({ code: "NOT_FOUND" });
    });

});