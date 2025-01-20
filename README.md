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
