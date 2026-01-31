import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchOrder, Order } from "../api";

export function OrderDetailPage() {
  const { id } = useParams();
  const [order, setOrder] = useState<Order | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;
    fetchOrder(id)
      .then(setOrder)
      .catch((e) => setError(e.message || "Failed to load order"));
  }, [id]);

  if (error) return <div data-testid="order-error">Error: {error}</div>;
  if (!order) return <div data-testid="order-loading">Loading...</div>;

  return (
    <div>
      <h2>Order Detail</h2>
      <div data-testid="order-id">Order: {order.id}</div>
      <div data-testid="order-total">Total: {order.total}</div>

      <ul data-testid="order-items">
        {order.items.map((it, idx) => (
          <li key={idx} data-testid={`order-item-${idx}`}>
            {it.name} x {it.quantity} = {it.price * it.quantity}
          </li>
        ))}
      </ul>
    </div>
  );
}
