# SDET Automation Platform

## Description
This repository is an example of my skills as an **SDET** (Software Development Engineer in Test). It includes:
- **Unit tests** for individual cases using Vitest.
- **API tests** for HTTP endpoints using Supertest.
- A **basic UI** designed to integrate with Playwright (in progress).

---

## **How to Use This Repository**

### **Prerequisites**
1. **Node.js**: Ensure you have Node.js version `18.x` or higher.
2. **npm**: It is included with Node.js, but make sure you have a recent version.

Check the versions of Node.js and npm by running:
```bash
node -v
npm -v
```

---

### **Installation**

1. Clone the repository:
   ```bash
   git clone https://github.com/DanCasV27/sdet-automation-platform.git
   cd sdet-automation-platform
   ```

2. Install the required dependencies:
   - From the root directory (for shared dependencies, if any):
     ```bash
     npm install
     ```

   - Then go to the `apps/api` directory and run:
     ```bash
     cd apps/api
     npm install
     ```

---

### **Start the APIs**
1. Navigate to the API directory:
   ```bash
   cd apps/api
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Once started, you can access the APIs at `http://localhost:3000`. The available endpoints are:
   - **`GET /health`**: Health check.
   - **`GET /products`**: Retrieve a list of products.
   - **`POST /orders`**: Create an order.
   - **`GET /orders/:id`**: Retrieve order details.

---

### **Start the User Interface (FE)** *(in progress)*

1. If you are working on the basic UI:
   - Navigate to the corresponding directory (modify this if there’s a specific subdirectory for your UI):
     ```bash
     cd apps/ui
     ```
   - Install the necessary dependencies:
     ```bash
     npm install
     ```
   - Start the UI with:
     ```bash
     npm run dev
     ```
   - You can access the UI at `http://localhost:8080` (adjust the port if necessary).

---

### **Run the Tests**

#### **1. Unit Tests** (Vitest)
- To run the unit tests for the entire project logic:
  ```bash
  cd apps/api
  npm run test
  ```

#### **2. API Tests** (Supertest)
- The API tests are integrated with the main routes of the project. To run them:
  ```bash
  cd apps/api
  npm run test
  ```

Both suites use Vitest, so you will receive direct feedback on successful or failed tests.

#### **3. Additional Reports**
If you have configured Allure (optional), generate the report as follows:
1. Execute the tests to generate results:
   ```bash
   npm run test
   ```

2. Generate a visual report:
   ```bash
   npm run allure:generate && npm run allure:open
   ```

---

### **Project Structure**
```plaintext
sdet-automation-platform/
├── .github/              # Workflows and GitHub Actions configuration
├── apps/
│   ├── api/              # Backend API
│   │   ├── src/          # API source code
│   │   ├── tests/        # Unit and API tests
│   │   ├��─ package.json  # Dependencies specific to the backend
│   │   └── vitest.config.ts
│   ├── ui/               # Basic frontend (in progress)
```

---

### **Contributions**
Contributions are welcome. If you find any issues or would like to add new features, please open an issue or create a pull request.

---

### **Contacts**
Creator: **DanCasV27**  
GitHub: [DanCasV27](https://github.com/DanCasV27)
LinkedIn:https://www.linkedin.com/in/daniel-c-4a4697211/
