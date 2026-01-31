import { useEffect, useState } from "react";
import { fetchProducts, Product } from "../api";

export function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    fetchProducts()
      .then(setProducts)
      .catch((e) => setError(e.message || "Failed to load"));
  }, []);

  if (error) {
    return <div data-testid="products-error">Error: {error}</div>;
  }

  return (
    <div>
      <h2>Products</h2>
      <ul data-testid="products-list">
        {products.map((p) => (
          <li key={p.id} data-testid={`product-row-${p.id}`}>
            <strong>{p.name}</strong> — ${p.price}
          </li>
        ))}
      </ul>
    </div>
  );
}
