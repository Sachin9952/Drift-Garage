# Hot Wheels - MERN Full-Stack Structure

Professional MERN stack project structure for the Hot Wheels application.

## Project Structure

```text
Hot-Wheels/
├── client/              # Frontend (React + Vite)
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vite.config.js
├── server/              # Backend (Node + Express + MongoDB)
│   ├── models/          # Mongoose models
│   ├── routes/          # Express routes
│   ├── controllers/     # Route logic handlers
│   ├── middleware/      # Auth & other middlewares
│   ├── config/          # DB & other configurations
│   ├── server.js        # Entry point
│   ├── package.json
│   └── .env             # Environment variables
├── package.json         # Root scripts to run both
└── README.md
```

## Getting Started

### Prerequisites
- Node.js installed
- MongoDB installed and running locally (or a remote URI)

### Installation

1. Install root dependencies (for running both):
   ```bash
   npm install
   ```

2. Install frontend dependencies:
   ```bash
   cd client
   npm install
   ```

3. Install backend dependencies:
   ```bash
   cd server
   npm install
   ```

### Running the App

#### Run both (Frontend & Backend) concurrently:
From the root directory:
```bash
npm run dev
```

#### Run separately:
- **Frontend**: `cd client && npm run dev`
- **Backend**: `cd server && npm run dev`

## Backend Features Prepared
- **Express.js**: Set up with JSON parsing and CORS.
- **Mongoose**: Connected to MongoDB (default: localhost).
- **JWT & Auth**: Ready for implementation in `middleware/` and `routes/`.
- **Environment Variables**: Managed via `.env` in the `server/` folder.
