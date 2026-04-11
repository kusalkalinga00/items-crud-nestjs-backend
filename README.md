# Items CRUD — NestJS Backend

A RESTful CRUD API for managing items, built with [NestJS](https://nestjs.com/), [TypeORM](https://typeorm.io/), and [PostgreSQL](https://www.postgresql.org/).

---

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Data Model](#data-model)
- [Environment Configuration](#environment-configuration)
- [Installation](#installation)
- [Running the App](#running-the-app)
- [API Reference](#api-reference)
- [Testing](#testing)

---

## Overview

This service exposes a JSON REST API that allows clients to create, read, update, and delete items. Each item has a name and a status (`WAITING` or `DONE`). Items can be filtered by status or searched by name.

---

## Tech Stack

| Layer        | Technology                          |
|--------------|-------------------------------------|
| Framework    | NestJS 10                           |
| Language     | TypeScript 5                        |
| Database     | PostgreSQL                          |
| ORM          | TypeORM 0.3                         |
| Validation   | class-validator / class-transformer |
| Config       | @nestjs/config (.env)               |
| Testing      | Jest + Supertest                    |

---

## Project Structure

```
src/
├── app.module.ts          # Root module — wires up TypeORM and ListModule
├── main.ts                # Entry point — bootstraps the app and global pipes
└── list/
    ├── dto/
    │   ├── create-item.dto.ts          # Body DTO for POST /list
    │   ├── get-items-filter.dto.ts     # Query DTO for GET /list
    │   └── update-item-status.dto.ts  # Body DTO for PATCH /list/:id/status
    ├── list-status.enum.ts  # ItemStatus enum (WAITING | DONE)
    ├── list.controller.ts   # Route handlers
    ├── list.entity.ts       # TypeORM entity (maps to the `list` table)
    ├── list.module.ts       # Feature module
    ├── list.repository.ts   # Custom TypeORM repository
    └── list.service.ts      # Business logic
```

---

## Data Model

### `List` entity

| Column     | Type         | Description                      |
|------------|--------------|----------------------------------|
| `id`       | UUID (PK)    | Auto-generated primary key       |
| `itemName` | varchar      | Name / description of the item   |
| `status`   | varchar      | Current status of the item       |

### `ItemStatus` enum

| Value     | Meaning                   |
|-----------|---------------------------|
| `WAITING` | Item is pending / to-do   |
| `DONE`    | Item has been completed   |

---

## Environment Configuration

Copy `.env.sample` to `.env` and fill in the values:

```bash
cp .env.sample .env
```

| Variable            | Description                             | Example           |
|---------------------|-----------------------------------------|-------------------|
| `DATABASE_HOST`     | PostgreSQL host                         | `localhost`       |
| `DATABASE_PORT`     | PostgreSQL port                         | `5432`            |
| `DATABASE_USERNAME` | Database user                           | `postgres`        |
| `DATABASE_PASSWORD` | Database password                       | `secret`          |
| `DATABASE_DATABASE` | Database name                           | `items_db`        |
| `PORT`              | Port the HTTP server listens on         | `3000`            |

> **Note:** `synchronize: true` is set in `AppModule`, so TypeORM will automatically sync the schema on startup. This is convenient for development but should be disabled in production in favour of migrations.

---

## Installation

```bash
npm install
```

---

## Running the App

```bash
# Development
npm run start

# Development with hot-reload (watch mode)
npm run start:dev

# Debug mode
npm run start:debug

# Production (requires a prior build)
npm run build
npm run start:prod
```

The server will be available at `http://localhost:<PORT>` (default `3000`).

---

## API Reference

Base path: `/list`

### Get all items

```
GET /list
```

**Query parameters (all optional)**

| Parameter | Type                  | Description                        |
|-----------|-----------------------|------------------------------------|
| `status`  | `WAITING` \| `DONE`   | Filter items by status             |
| `search`  | string                | Search items by name (partial match) |

**Response** `200 OK` — array of `List` objects.

---

### Create an item

```
POST /list
```

**Request body**

```json
{
  "itemName": "Buy groceries"
}
```

| Field      | Type   | Required | Description         |
|------------|--------|----------|---------------------|
| `itemName` | string | ✅       | Name of the item    |

**Response** `201 Created` — the newly created `List` object.

---

### Get an item by ID

```
GET /list/:id
```

| Parameter | Type   | Description        |
|-----------|--------|--------------------|
| `id`      | UUID   | ID of the item     |

**Response** `200 OK` — a single `List` object.  
**Error** `404 Not Found` — if no item with the given ID exists.

---

### Delete an item

```
DELETE /list/:id
```

| Parameter | Type   | Description        |
|-----------|--------|--------------------|
| `id`      | UUID   | ID of the item     |

**Response** `200 OK` — empty body on success.  
**Error** `404 Not Found` — if no item with the given ID exists.

---

### Update item status

```
PATCH /list/:id/status
```

| Parameter | Type   | Description        |
|-----------|--------|--------------------|
| `id`      | UUID   | ID of the item     |

**Request body**

```json
{
  "status": "DONE"
}
```

| Field    | Type                  | Required | Description            |
|----------|-----------------------|----------|------------------------|
| `status` | `WAITING` \| `DONE`   | ✅       | New status of the item |

**Response** `200 OK` — the updated `List` object.  
**Error** `404 Not Found` — if no item with the given ID exists.

---

### Example `List` response object

```json
{
  "id": "a3f1c2d4-e5b6-7890-abcd-ef1234567890",
  "itemName": "Buy groceries",
  "status": "WAITING"
}
```

---

## Testing

```bash
# Unit tests
npm run test

# Unit tests in watch mode
npm run test:watch

# End-to-end tests
npm run test:e2e

# Test coverage report
npm run test:cov
```
