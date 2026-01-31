import { useEffect, useState } from "react";
import { createOrder, fetchProducts, Product } from "../api";
import { useNavigate } from "react-router-dom";

type DraftItem = { productId: string; quantity: number };

export function CreateOrderPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [items, setItems] = useState<DraftItem[]>([{ productId: "p1", quantity: 1 }]);
    const [error, setError] = useState<string>("");
    const [submitting, setSubmitting] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetchProducts().then(setProducts).catch((e) => setError(e.message || "Failed to load products"));
    }, []);

    const addItem = () => setItems((prev) => [...prev, { productId: "p1", quantity: 1 }]);

    const updateItem = (index: number, patch: Partial<DraftItem>) => {
        setItems((prev) => prev.map((it, i) => (i === index ? { ...it, ...patch } : it)));
    };

    const removeItem = (index: number) => {
        setItems((prev) => prev.filter((_, i) => i !== index));
    };

    const submit = async () => {
        setError("");
        setSubmitting(true);
        try {
            const result = await createOrder(items);
            navigate(`/orders/${result.id}`);
        } catch (e: any) {
            setError(e.message || "Failed to create order");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div>
            <h2>Create Order</h2>

            {error && <div data-testid="create-order-error">Error: {error}</div>}

            <div data-testid="create-order-form" style={{ display: "grid", gap: 12 }}>
                {items.map((it, idx) => (
                    <div
                        key={idx}
                        data-testid={`order-item-row-${idx}`}
                        style={{ display: "flex", gap: 8, alignItems: "center" }}
                    >
                        <select
                            data-testid={`item-${idx}-product`}
                            value={it.productId}
                            onChange={(e) => updateItem(idx, { productId: e.target.value })}
                        >
                            {products.length === 0 ? (
                                <option value="p1">Loading...</option>
                            ) : (
                                products.map((p) => (
                                    <option key={p.id} value={p.id}>
                                        {p.name} (${p.price})
                                    </option>
                                ))
                            )}
                        </select>

                        <input
                            data-testid={`item-${idx}-qty`}
                            type="number"
                            min={1}
                            value={it.quantity}
                            onChange={(e) => updateItem(idx, { quantity: Number(e.target.value) })}
                            style={{ width: 90 }}
                        />

                        <button data-testid={`remove-item-${idx}`} onClick={() => removeItem(idx)}>
                            Remove
                        </button>
                    </div>
                ))}

                <div style={{ display: "flex", gap: 8 }}>
                    <button data-testid="add-item" onClick={addItem}>
                        Add item
                    </button>

                    <button
                        data-testid="submit-order"
                        onClick={submit}
                        disabled={submitting}
                    >
                        {submitting ? "Submitting..." : "Submit order"}
                    </button>
                </div>
            </div>
        </div>
    );
}
