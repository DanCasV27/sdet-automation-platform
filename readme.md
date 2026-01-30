# SDET Automation Platform

Hi, I’m **Daniel Castro Vindas**, a **Software Development Engineer in Test (SDET)**.  

This repository is a small but realistic example of how I approach quality from an engineering perspective.  
It represents how I would design, structure, and test a backend system in a real professional environment.

The goal of this project is not to showcase a complex application, but to demonstrate how **quality** is part of software design, not something added at the end.

---

## **What This Repository Represents**

This project shows how I would work as an SDET when joining a team or starting a new system:

- I design backend systems with **clear separation of concerns**.
- I apply **OOP principles** where they add value.
- I keep **business rules isolated** and easy to test.
- I prioritize **fast** and **deterministic tests** over fragile end-to-end setups.
- I avoid **over-engineering** while keeping the system ready to evolve.

> **Note**: The application itself is intentionally small. The focus is on **architecture**, **testability**, and **decision-making**.

---

## **Architecture Overview**

This API follows a **layered architecture**:

```plaintext
Routes → Services → Repositories → Models
```

Each layer has a **single responsibility** and is designed to be independent from the others.

### **Layers Explained**

#### **1. Routes**
- Handles **HTTP concerns only** (parameters, request bodies, status codes).
- Contains **no business logic**.
- Delegates all work to services.

#### **2. Services**
- Contains **business rules** and **orchestration logic**.
- Validates **domain constraints** (e.g., products must exist before creating an order).
- Throws **domain-specific errors** instead of handling HTTP responses directly.

#### **3. Repositories**
- Abstracts **persistence** behind interfaces.
- Current implementation: **in-memory**.
- Designed for easy replacement with **database-backed implementations** (e.g., PostgreSQL).

#### **4. Models**
- Represents **domain data structures** using TypeScript interfaces.
- Focuses on **data shape**, not behavior.

---

### **Domain Errors**

- **Centralized error definitions** (e.g., `ValidationError`, `NotFoundError`).
- Mapped to HTTP responses using a **global error handler**.
- Keeps error handling consistent and predictable.

This structure allows the system to evolve with new features, a database, and additional tests without rewriting existing logic.

---

## **Current Features**

### **API Endpoints**

- **`GET /health`**: Basic health check.
- **`GET /products`**: Returns a static list of products.
- **`POST /orders`**: Creates an order if all **business rules** are satisfied.
- **`GET /orders/:id`**: Retrieves an order by its identifier.

---

### **Business Rules Implemented**

1. An order must contain **at least one item**.
2. **Product quantities** must be greater than zero.
3. Orders cannot reference **non-existing products**.
4. Requesting a **non-existing order** returns a proper domain error.

---

## **Testing Strategy**

At this stage, the project focuses on **unit testing the service layer**.

### **Why Service-Level Tests First?**

- They directly validate **business rules**.
- They run **fast and deterministically**.
- They do not require HTTP, ports, or external infrastructure.
- They make **refactoring safer and easier**.

---

### **Test Characteristics**

- Uses **in-memory repositories**.
- Avoids mocks where possible.
- Validates both **positive** and **negative scenarios**.

> **Rationale**: Tests at the service layer provide the **highest value per test**.

---

### **Future Testing Layers**

1. **HTTP-level API tests**.
2. **End-to-end tests** for critical flows.
3. **CI automation** to run all tests.

---

## **Project Structure**

```plaintext
apps/api
├── src
│   ├── models
│   ├── repositories
│   ├── services
│   ├── routes
│   ├── errors
│   └── server.ts
└── tests
    └── services
```

---

## **Running the Project**

### **Requirements**

- Node.js 18 or newer.
- npm.

### **Steps**

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run the API:**
   ```bash
   npm run dev
   ```
   The API will be available at:
   ``````
   http://localhost:3000
   ``````

3. **Run unit tests:**
   ```bash
   npm test
   ```

---

## **Design Decisions**

Some intentional choices made in this project:

- **In-memory repositories** were used initially to focus on architecture and testing rather than infrastructure.
- **Repository interfaces** allow switching to a real database without changing services or tests.
- **Domain errors** keep business logic independent from HTTP concerns.
- Tests start at the **service layer**, where failures are clearer and feedback is faster.

---

## **What Comes Next**

Planned next steps include:

1. **HTTP-level API tests**.
2. **End-to-end tests** for core user flows.
3. **Database-backed repositories**.
4. **CI pipeline** with automated execution.

---

## **About Me**

My name is **Daniel Castro Vindas**.  
I work as a **Software Development Engineer in Test**, focusing on:

- **Automation**
- **Architecture**
- Building **quality** into systems from the start.

This repository reflects how I **think**, **design**, and **test software** in real-world projects.

---

## **Final Note**

> This is not a **tutorial project**.  
> It is a **practical example** of how I approach **quality engineering**—keeping things **simple**, **testable**, and **ready to evolve**.
