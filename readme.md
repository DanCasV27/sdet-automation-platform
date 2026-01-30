# SDET Automation Platform

Hi, I’m **Daniel Castro Vindas**, a **Software Development Engineer in Test (SDET)**.  
This repository is a small but realistic example of how I approach quality from an engineering perspective.

## **Project Goals**

The goal of this project is not to showcase a complex application but to demonstrate:

- **Design of testable systems**
- **Separation of responsibilities using clean architecture**
- **Testing as an integral part of software design**

Everything in this repository reflects how I'd structure and test a real system in a professional environment.

---

## **What This Repository Represents**

This project illustrates how I work as an SDET when joining a team or initiating a new system:

- **Backend** design with clear separation of concerns
- Application of **OOP principles** where valuable
- Isolation of **business rules** to make them easy to test
- Prioritization of **fast, deterministic tests** over fragile end-to-end setups
- Avoidance of over-engineering while keeping the system **scalable**

> **Note:** The application itself is intentionally small. The focus is on **architecture**, **testability**, and **decision-making**.

---

## **Architecture Overview**

This API utilizes a **layered architecture**:

```plaintext
routes → services → repositories → models
