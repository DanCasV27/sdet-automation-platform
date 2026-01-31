import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./index.css";

import { Home } from "./pages/Home";
import { ProductsPage } from "./pages/ProductsPage";
import { CreateOrderPage } from "./pages/CreateOrderPage";
import { OrderDetailPage } from "./pages/OrderDetailPage";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: 16 }}>
      <header style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 16 }}>
        <Link to="/" data-testid="nav-home">Home</Link>
        <Link to="/products" data-testid="nav-products">Products</Link>
        <Link to="/orders/new" data-testid="nav-create-order">Create Order</Link>
      </header>
      {children}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/orders/new" element={<CreateOrderPage />} />
          <Route path="/orders/:id" element={<OrderDetailPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  </React.StrictMode>
);
