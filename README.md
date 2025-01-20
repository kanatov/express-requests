# Overview

The project provides the API for managing named counters using HTTP requests.

Project includes:

- API routes made with Express.js
- Basic web interface done with React
- Integration tests done with Jest and Supertest

Supported API endpoints:

- Create a named counter
- Delete a counter
- Update counter value
- Get counters:
  - All
  - One task by name

All the routes include error prevention and data validation.

# Run the project

Run the project from the root dirrectory:

### 1. Install All Dependencies:

`npm install`

### 2. Start backend and frontend to view the project:

`npm run start`

Starts both the frontend and backend in production mode.

backend runs on http://localhost:3100
frontend runs on http://localhost:4173

### 3. Run development Mode:

`npm run dev`

Runs both the frontend and backend in development mode.

### 4. Make a production build:

`npm run build`

Builds the react project.

# Counters collection schema

The counters values are mapped to the names:

| ID (name)      | Value    |
| ---------- | ------- | 
| Characters, numbers and dashes | Numeric value: 0-10  | 

# API routes

### Get current time for GMT

```
GET http://localhost:3100/api/time
```
Response
```
{
    "message": "ok",
    "result": "Mon, 20 Jan 2025 23:30:22 GMT"
}
```

### Get all counters

```
GET http://localhost:3100/api/counters
```
Response
```
{
    "message": "ok",
    "result": {
        "counter-1": 1,
        "alpha": 10,
    }
}
```

### Get counter by ID

```
GET http://localhost:3100/api/counters/:id
```
Response
```
{
    message: "ok",
    result: { "bravo": 2 }
}
```

### Add a new counter

```
POST http://localhost:3100/api/counters

// JSON
{
    id: "delta"
}
```
Response
```
{
    message: "ok",
    result: "delta"
}
```

### Update a counter

```
PUT http://localhost:3100/api/counters/:id

// JSON
{
    "id": "alpha",
    "val": 5
}
```
Response
```
{
    "message": "ok",
    "result": 5
}
```

### Delete a counter

```
DELETE http://localhost:3100/api/counters/:id
```
Response
```
{
    "message": "ok",
    "result": "alpha"
}
```
