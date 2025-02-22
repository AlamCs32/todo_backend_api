# Todo App API

This is a **Full-Stack Todo Application** backend built using **Node.js**, **Express.js**, **Prisma ORM**, and **MySQL**.

## 📌 Features

- User authentication (JWT-based)
- CRUD operations for todos
- Swagger API documentation
- Prisma ORM for database management
- Middleware for security (Helmet, CORS)
- Error handling with Express middleware

---

## 🚀 Getting Started

### 1️⃣ Prerequisites

Ensure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (v18+ recommended)
- [MySQL](https://www.mysql.com/)
- [Prisma CLI](https://www.prisma.io/docs/concepts/components/prisma-cli)
- [TypeScript](https://www.typescriptlang.org/)

---

## 🔧 Installation & Setup

### 1️⃣ Clone the repository

```bash
git clone https://github.com/YOUR_GITHUB_USERNAME/todo-api.git
cd todo-api
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Configure environment variables

Create a `.env` file in the root directory and add the following:

```env
DATABASE_URL="mysql://USER:PASSWORD@localhost:3306/todo_db"
PORT=5000
JWT_SECRET="your_secret_key"
```

Replace `USER`, `PASSWORD`, and `todo_db` with your MySQL credentials.

---

## 📦 Database Setup

### 1️⃣ Generate Prisma Client
```bash
npm run prisma:generate
```

### 2️⃣ Run Database Migrations (Development)
```bash
npm run prisma:dev:migrate
```

### 3️⃣ Run Database Migrations (Production)
```bash
npm run prisma:migrate
```

---

## 🚀 Running the Project

### 1️⃣ Start the development server
```bash
npm run dev
```

### 2️⃣ Start the production server
```bash
npm run build
npm start
```

---

## 📜 API Documentation (Swagger)

### Generate Swagger Docs
```bash
npm run generate-swagger
```

### View Swagger UI
After running the server, access Swagger documentation at:

```
http://localhost:5000/api-docs
```

---

## 🛠 Project Scripts

| Script                  | Description |
|-------------------------|-------------|
| `npm run dev`           | Run the project in development mode with TypeScript and Nodemon |
| `npm run build`         | Build the project and generate Prisma client |
| `npm start`            | Start the compiled Node.js project |
| `npm run prisma:generate` | Generate Prisma client |
| `npm run prisma:dev:migrate` | Run Prisma migrations for development |
| `npm run prisma:migrate` | Apply Prisma migrations for production |
| `npm run generate-swagger` | Generate Swagger documentation |

---

## 🎯 Folder Structure

```
📂 todo-api
│-- 📂 src
│   │-- 📂 controllers       # API Controllers
│   │-- 📂 middlewares       # Express Middleware
│   │-- 📂 models            # Prisma Models
│   │-- 📂 routers           # API Routes
│   │-- 📂 services          # Business Logic
│   │-- 📂 utils             # Helper Functions
│   │-- index.ts             # Entry Point
│-- 📂 prisma                # Prisma Config
│-- 📜 .env                  # Environment Variables
│-- 📜 package.json          # Dependencies & Scripts
│-- 📜 tsconfig.json         # TypeScript Config
│-- 📜 README.md             # Documentation
│-- 📜 Todo Application.postman_collection.json # Api Collection
```
---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature-branch`)
3. Commit changes (`git commit -m 'Added feature'`)
4. Push to the branch (`git push origin feature-branch`)
5. Open a Pull Request

---

## 📜 License

This project is licensed under the MIT License.

---

### 📧 Contact

For queries, reach out at: **skmdmehfoozalam@gmail.com**

---

Happy Coding! 🚀

