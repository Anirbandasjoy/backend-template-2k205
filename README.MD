# Backend Template

A clean, scalable, and production-ready backend template using **Node.js, Express.js, TypeScript, MongoDB, and Zod Validation**.

## 🚀 Features

- ✅ **TypeScript Support** for better code quality
- ✅ **Express.js Framework** for a structured API
- ✅ **MongoDB with Mongoose** for database operations
- ✅ **Zod Validation** for request validation
- ✅ **JWT Authentication** with refresh token support
- ✅ **Role-Based Access Control (RBAC)** for secure API routes
- ✅ **Environment Variable Management** with dotenv
- ✅ **Error Handling & Logging** for better debugging
- ✅ **CORS & Security Middlewares** for API protection
- ✅ **Modular Folder Structure** for easy scalability
- ✅ **Preconfigured Linting & Formatting** using ESLint & Prettier

## 🛠 Tech Stack

- **Language:** TypeScript
- **Framework:** Express.js
- **Database:** MongoDB (Mongoose ORM)
- **Authentication:** JWT (JSON Web Token)
- **Validation:** Zod
- **Linting & Formatting:** ESLint, Prettier

## 📂 Folder Structure

```
backend-template/
│── src/
│   ├── config/          # Configuration files (DB, environment variables)
│   ├── controllers/     # Request handlers (business logic)
│   ├── middlewares/     # Express middlewares (auth, error handling)
│   ├── models/          # Mongoose schemas & models
│   ├── routes/          # Express API routes
│   ├── services/        # Business logic & database queries
│   ├── utils/           # Utility functions (helpers, token generation)
│   ├── validators/      # Zod validation schemas
│   ├── app.ts           # Express app initialization
│   ├── server.ts        # Server entry point
│── .env                 # Environment variables
│── .gitignore           # Ignored files
│── package.json         # Dependencies & scripts
│── tsconfig.json        # TypeScript configuration
│── README.md            # Documentation
```

## ⚡ Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/backend-template.git
cd backend-template
```

### 2️⃣ Install Dependencies

```bash
yarn install  # or npm install
```

### 3️⃣ Set Up Environment Variables

Create a `.env` file in the root directory and add the following:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

### 4️⃣ Start the Development Server

```bash
yarn dev  # or npm run dev
```

### 5️⃣ Build & Run for Production

```bash
yarn build
yarn start
```

## 🔑 API Authentication

This backend template uses **JWT-based authentication**. To access protected routes, include the token in the `Authorization` header:

```bash
Authorization: Bearer YOUR_ACCESS_TOKEN
```

## 🛡️ API Security & Best Practices

- Uses **Helmet.js** to enhance API security
- **CORS Enabled** to allow cross-origin requests
- **Input Validation** using Zod to prevent bad data
- **Secure Password Hashing** using bcrypt
- **Rate Limiting** to prevent abuse

## 📌 Contribution Guide

Feel free to contribute to this project! Open an issue or create a pull request.

## 📄 License

This project is licensed under the **MIT License**.
