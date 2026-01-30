SDET Automation Platform

Hi, I’m Daniel Castro Vindas, a Software Development Engineer in Test (SDET).
This repository is a small but realistic example of how I approach quality from an engineering perspective.

The goal of this project is not to showcase a complex application, but to demonstrate:

How I design testable systems

How I separate responsibilities using clean architecture

How I think about testing as part of software design, not as an afterthought

Everything here reflects how I would structure and test a real system in a professional environment.

What this repository represents

This project shows how I would work as an SDET when joining a team or starting a new system:

I design the backend with clear separation of concerns

I apply OOP principles where they add value

I keep business rules isolated and easy to test

I prioritize fast, deterministic tests over fragile end-to-end setups

I avoid over-engineering while keeping the system ready to evolve

The application itself is intentionally small.
The focus is on architecture, testability, and decision-making.

Architecture overview

The API follows a layered architecture:

routes → services → repositories → models


Each layer has a single responsibility.

Routes

Handle HTTP concerns only (params, request body, status codes)

Contain no business logic

Delegate all work to services

Services

Contain business rules and orchestration logic

Validate domain constraints (for example, products must exist to create an order)

Throw domain-specific errors instead of handling HTTP responses directly

Repositories

Abstract persistence behind interfaces

Current implementation is in-memory

Designed to be easily replaced by a database-backed implementation (e.g. PostgreSQL)

Models

Represent domain data structures using TypeScript interfaces

Focus on data shape, not behavior

Domain errors

Centralized error definitions (ValidationError, NotFoundError)

Mapped to HTTP responses using a global error handler

Keep error handling consistent and clean

This structure allows the system to grow (database, new features, more tests) without rewriting existing logic.

Current features
API endpoints

GET /health
Basic health check

GET /products
Returns a static list of products

POST /orders
Creates an order if all business rules are satisfied

GET /orders/:id
Retrieves an order by its identifier

Business rules implemented

An order must contain at least one item

Product quantities must be greater than zero

Orders cannot reference non-existing products

Requesting a non-existing order returns a proper domain error

Testing strategy (current state)

At this stage, the project focuses on unit testing the service layer.

Why service-level tests first?

They validate business rules directly

They run fast and deterministically

They don’t require HTTP, ports, or infrastructure

They make refactoring safe

The tests

Use in-memory repositories

Avoid mocks where possible

Validate both positive and negative scenarios

This is the layer where tests provide the highest value per test.

Future steps will add

HTTP-level API tests

End-to-end tests for critical flows

CI automation

Project structure
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

Running the project
Requirements

Node.js 18+

npm

Install dependencies
npm install

Run the API
npm run dev


The API will be available at:

http://localhost:3000

Run unit tests
npm test

Design decisions

Some intentional choices made in this project:

In-memory repositories were used initially to focus on architecture and testing rather than infrastructure

Repository interfaces allow switching to a real database without changing services or tests

Domain errors keep business logic independent from HTTP concerns

Tests start at the service layer, where failures are clearer and feedback is faster

What comes next

Planned next steps:

HTTP-level API tests

End-to-end tests for core user flows

Database-backed repositories

CI pipeline with automated execution

About me

My name is Daniel Castro Vindas.
I work as a Software Development Engineer in Test, focusing on automation, architecture, and building quality into systems from the start.

This repository reflects how I think, design, and test software in real projects.

Final note

This is not a tutorial project.
It’s a practical example of how I approach quality engineering, keeping things simple, testable, and ready to evolve.
