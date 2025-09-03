# 🔗 Backend for QR Dashboard (`backendqr`)

This is the **backend** of the QR Dashboard project—an API server built with **Node.js**, **Express.js**, and **MongoDB**, designed to power functionalities such as QR generation, analytics, authentication, and real-time updates.

---

##  ⭐ Project Highlights
- **RESTful API** for managing users, QR codes, and analytics
- **JWT-based authentication** with role-based access control (Admin/User)
- **Real-time data updates** (via WebSockets or polling)
- Secure input handling and scalable routing architecture

---

##  Technology Stack
- **Node.js** (runtime)
- **Express.js** (web framework)
- **MongoDB + Mongoose** (database and ODM)
- **JWT** (authentication)
- **bcrypt** (secure password hashing)
- **dotenv** for managing environment variables
- **ESLint** (linting and code quality)

---

##  Project Structure
backendqr/
├── models/ # Mongoose schemas (User, QR, Analytics, etc.)
├── routes/ # Route definitions (e.g., auth, qr, analytics)
├── middleware/ # Auth, validation, error handlers
├── controllers/ # Business logic for each route
├── utils/ # Reusable utilities (JWT, logger, notifier)
├── db.js # MongoDB connection setup
├── index.js # Server entry point
├── package.json # Project metadata & scripts
└── .env.example # Sample environment variables



---

##  Installation & Setup

### 1. Clone the repository
```bash
git clone https://github.com/Silentman87/backendqr.git
cd backendqr

```
2. Install dependencies
   npm install


3. Configure environment variables

Create a .env file based on .env.example and provide values for:
PORT=5000
MONGO_URI=your-mongodb-uri
JWT_SECRET=your-jwt-secret

4.. Run the server
npm start        # For production
npm run dev      # For development (with nodemon, if configured)

Scripts
npm start – Start the server in production mode
npm run dev – Start the server with auto-reload (development)
npm run lint – Run ESLint checks

API Overview

Authentication
POST /api/auth/signup – Register a new user (returns JWT)
POST /api/auth/login – Log in and receive a JWT
GET /api/auth/profile – Retrieve user profile (protected route


Security & Error Handling
Password hashing with bcrypt
JWT authentication and role-based route protection
Input validation and sanitization (e.g., using express-validator)
Custom error-handling middleware to unify responses
