import { API_BASE_URL } from "./config";

export type Product = { id: string; name: string; price: number };
export type OrderItemInput = { productId: string; quantity: number };

export type Order = {
  id: string;
  items: { productId: string; quantity: number; price: number; name: string }[];
  total: number;
};

export async function fetchProducts(): Promise<Product[]> {
  const res = await fetch(`${API_BASE_URL}/products`);
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}

export async function createOrder(items: OrderItemInput[]): Promise<{ id: string; total: number }> {
  const res = await fetch(`${API_BASE_URL}/orders`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ items }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.message || "Failed to create order");
  }
  return res.json();
}

export async function fetchOrder(id: string): Promise<Order> {
  const res = await fetch(`${API_BASE_URL}/orders/${id}`);
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.message || "Failed to fetch order");
  }
  return res.json();
}
