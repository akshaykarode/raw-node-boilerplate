# raw-node-boilerplate

## Running the project
- `npm start`
- Health Status Monitor : `/status`
- Swagger API Docs : `/api-docs`

## Build & Run the project in Docker
- `npm run docker:build`
- `npm run docker:run`

## Running Unit Tests
- `npm run test`

## Running Mutation Tests
- `stryker run`
- `npx stryker run --fileLogLevel trace --logLevel debug` (Debug Stryker Execution)

## Running Swagger Editor
- `npm run swagger-editor`

## Features
- Winston Logger/Elasticsearch
- Dockerized
- ES9
- Error Escallations (Application Level)
- JEST suit (unit & e2e)
- Stryker
- Express Status Monitor
- Swagger (Swagger UI + Swagger Editor)