# Expense Tracker (Shopzi)

A full-stack Expense Tracker application (frontend + backend) included in this repository. The project contains a React + Vite frontend and a Node.js + Express backend with organized controllers, models, routes and file upload support. It provides user authentication, income & expense tracking, simple dashboard endpoints and image upload functionality.

> Repository name: MoneyMate

---

## Table of contents

- Project summary
- Key features
- Tech stack
- Repository structure
- Getting started (prerequisites)
- Backend — setup & run
- Frontend — setup & run
- Environment variables (.env)
- API overview
- File uploads & assets
- Deployment notes
- Troubleshooting

---

## Project summary

This repository contains an expense tracker app that allows users to sign up / log in, add and manage expenses and income, view recent transactions and simple dashboard visualizations. The backend exposes REST APIs and persists data; the frontend is a Vite + React single page app.

The codebase is split into two main folders:
- `backend/` — Node.js + Express server, models, routes, controllers, middleware and uploads folder.
- `frontend/` — React (Vite) UI and components arranged for a dashboard experience.

## Key features

- User authentication (register / login)
- Add, edit, delete expenses and income
- Recent transactions, charts and overview components on the dashboard
- Profile photo and transaction image upload handling
- Exposed REST API endpoints organized by resource (auth, expense, income, dashboard)

## Tech stack

- Frontend: React (JSX), Vite, Tailwind CSS (configured), standard modern frontend tooling
- Backend: Node.js, Express, (likely Mongoose + MongoDB — see `backend/config/db.js`), multer for file uploads
- Authentication: JWT-based tokens (see `backend/controllers/authController.js` and `backend/middleware/authMiddleware.js`)

## Repository structure

Top-level directories and important files:

- `backend/`
  - `server.js` — entrypoint for the Express server
  - `package.json` — backend dependencies & scripts
  - `.env` — environment (NOT committed) used by backend
  - `config/db.js` — database connection logic
  - `controllers/` — controllers for auth, dashboard, expense, income
  - `models/` — Mongoose models like `User.js`, `Expense.js`, `Income.js`
  - `routes/` — route definitions per resource (authRoutes, expenseRoutes, incomeRoutes, dashboardRoutes)
  - `middleware/` — `authMiddleware.js`, `uploadMiddleware.js`
  - `uploads/` — uploaded images (e.g. profile photos or expense images)
- `frontend/`
  - `package.json` — frontend dependencies & scripts (Vite)
  - `src/` — React app source
    - `App.jsx`, `main.jsx` — app bootstrap
    - `components/`, `pages/`, `layouts/` — UI components and pages
    - `utils/` — `axiosInstance.js`, `ApiPaths.js`, `uploadImage.js` (helpers for API calls and image upload)
  - `index.html`, `vite.config.js`, `tailwind.config.js`

## Getting started (prerequisites)

Make sure you have the following installed on your machine:

- Node.js (v16+ recommended) and npm
- Git (optional)
- A running MongoDB instance

If you don't want MongoDB, inspect `backend/config/db.js` to see and adapt the DB connection logic.

## Backend — setup & run

1. Open a terminal and change to the backend folder:

```powershell
cd backend
```

2. Install dependencies:

```powershell
npm install
```

3. Configure environment variables. Create a `.env` file in `backend/` (see the sample below under "Environment variables")

4. Start the backend server in development:

```powershell
# if repository provides a dev script (nodemon)
npm run dev

# otherwise run:
node server.js
```

The server will typically listen on the port set in your `.env` (default often 3000 or 5000). Check `backend/server.js` for the exact default.

## Frontend — setup & run

1. Open a new terminal and change to the frontend folder:

```powershell
cd frontend
```

2. Install dependencies:

```powershell
npm install
```

3. Start the development server:

```powershell
npm run dev
```

4. Build for production:

```powershell
npm run build

# Optional preview of production build
npm run preview
```

The frontend development server usually runs on `http://localhost:5173` (Vite default) unless configured otherwise.

Important: If your backend runs on a different origin, make sure the backend allows CORS from your frontend origin.

## Environment variables (.env)

Create a `.env` file in the `backend/` directory. Typical variables used by this project (adjust names and values to match `backend/config/db.js` and `server.js`):

```text
# example .env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/expense-tracker
JWT_SECRET=your_jwt_secret_here
CLIENT_URL=http://localhost:5173
```

Notes:
- Keep secrets out of version control. Add `.env` to `.gitignore` (already present in the backend folder).
- If you deploy to a cloud provider, add the same variables in the host's environment config.

## Database & sample data

- This project expects a MongoDB-style database (see `backend/config/db.js`).

## API overview

The backend exposes routes grouped under directories in `backend/routes/`:

- Auth (`backend/routes/authRoutes.js`)
  - POST `/api/auth/register` — register a new user
  - POST `/api/auth/login` — login and receive JWT

- Expense (`backend/routes/expenseRoutes.js`)
  - GET `/api/expenses` — list expenses for the authenticated user
  - POST `/api/expenses` — create an expense
  - GET `/api/expenses/:id` — get expense by id
  - PUT `/api/expenses/:id` — update an expense
  - DELETE `/api/expenses/:id` — delete an expense

- Income (`backend/routes/incomeRoutes.js`)
  - Similar CRUD endpoints under `/api/income`

- Dashboard (`backend/routes/dashboardRoutes.js`)
  - GET `/api/dashboard` or similar endpoints used by frontend to fetch aggregated/summary data and charts

Authentication: Protected routes require a valid JWT token in the Authorization header (`Authorization: Bearer <token>`). See `backend/middleware/authMiddleware.js` for the exact behavior.

Request/response shapes: Inspect `backend/models/Expense.js`, `backend/models/Income.js`, and `backend/models/User.js` for the canonical fields. Typical fields include: `amount`, `category`, `date`, `description`, `title`, `user` (reference to user), and for users: `name`, `email`, `password`, `profilePhoto`.

## File uploads & assets

- Uploaded files are persisted to `backend/uploads/`. The upload handling middleware is implemented in `backend/middleware/uploadMiddleware.js`.
- On the frontend there is `src/utils/uploadImage.js` and `ProfilePhotoSelector.jsx` that demonstrate client-side image selection and upload.

If you clear or regenerate `uploads/` during development, re-create the folder and ensure correct FS permissions.

## Deployment notes

- Frontend (Vite) can be deployed to static hosts such as Vercel, Netlify, or Cloudflare Pages. Configure a production `API_BASE_URL` or ensure the frontend points to the deployed backend.
- Backend (Express) can be deployed to services such as Render, Heroku, Railway, Azure App Service, or a VM. Ensure you set environment variables (MONGODB_URI, JWT_SECRET, etc.) in the host's settings.
- For production, ensure CORS is configured appropriately, and that file uploads are either persisted to a cloud storage provider (S3, Azure Blob, etc.) or kept on a shared filesystem if your hosting supports it.

## Troubleshooting

- Cannot connect to DB: check `MONGODB_URI` and that MongoDB is running. Inspect `backend/config/db.js` for connection logs.
- 401 Unauthorized: ensure JWT token is sent on protected routes and that the token hasn't expired.
- Upload errors: check that `backend/uploads/` exists and Node has permission to write there.
- Port conflicts: change `PORT` in `.env` or close the process using the same port.

If the app fails to start, check the server logs printed in the terminal and any stack traces. Use `console.log` debugging in the controllers while developing.