<div align="center">

# 🎓 EduLearn — E-Learning Platform

**A full-stack MERN application for modern online education**

![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white)

[Features](#-features) • [Tech Stack](#️-tech-stack) • [Project Structure](#-project-structure) • [API Docs](#-api-endpoints) • [Setup](#️-installation--setup) • [Deployment](#-deployment)

</div>

---

## 📌 Overview

EduLearn is a production-ready e-learning platform that enables learners to browse, enroll, and track progress across courses — while giving admins full control over content, users, and analytics. Built with the MERN stack and secured with JWT-based authentication.

---

## ✨ Features

### 👩‍🎓 For Learners
| Feature | Description |
|---|---|
| 🔐 Auth | Secure registration & login with JWT |
| 🔍 Discovery | Browse & search courses by category |
| 📚 Enrollment | One-click course enrollment |
| 📊 Progress | Track completion per course |
| 🖥️ Dashboard | Personalized learner dashboard |
| 📱 Responsive | Fully mobile-friendly UI |

### 🛠️ For Admins
| Feature | Description |
|---|---|
| 📝 Course CRUD | Create, update, and delete courses |
| 👥 User Management | View and manage all registered users |
| 📈 Analytics | Platform-wide reports and metrics |
| 🔒 RBAC | Role-based access control |

---

## 🏗️ Tech Stack

<table>
<tr>
<td valign="top" width="33%">

**Frontend**
- ⚛️ React.js (Vite)
- 🔀 React Router DOM
- 🌐 Context API
- 📡 Axios
- 🎨 Tailwind CSS

</td>
<td valign="top" width="33%">

**Backend**
- 🟢 Node.js
- 🚂 Express.js
- 🍃 MongoDB + Mongoose
- 🔑 JWT Authentication
- 🔒 bcrypt.js

</td>
<td valign="top" width="33%">

**Testing**
- ⚡ Vitest
- 🧪 React Testing Library
- 🃏 Jest
- 🔬 Supertest

</td>
</tr>
</table>

---

## 📂 Project Structure

```
ELEARNING-PLATFORM/
│
├── 📁 frontend/
│   ├── public/
│   └── src/
│       ├── assets/          # Static assets
│       ├── components/      # Reusable UI components
│       ├── pages/           # Route-level page components
│       ├── context/         # Global state (Context API)
│       ├── services/        # Axios API service calls
│       ├── routes/          # Route definitions & guards
│       ├── App.jsx
│       └── main.jsx
│
├── 📁 backend/
│   ├── config/              # DB & env configuration
│   ├── controllers/         # Route handler logic
│   ├── middleware/          # Auth, error, validation middleware
│   ├── models/              # Mongoose schemas
│   ├── routes/              # Express route definitions
│   ├── seed/                # Database seed scripts
│   ├── tests/               # API test suites
│   └── server.js            # Entry point
│
├── .gitignore
└── README.md
```

---

## 🔐 Authentication & Security

- **JWT** — Stateless token-based authentication
- **bcrypt** — Secure password hashing
- **Protected Routes** — Auth-guarded frontend & backend routes
- **RBAC** — Role-based authorization (`user` / `admin`)
- **Env Variables** — Sensitive config via `.env` files
- **Input Validation** — Server-side request validation

---

## 📡 API Endpoints

### 🔑 Authentication
```
POST   /api/auth/signup       → Register a new user
POST   /api/auth/login        → Login and receive JWT
GET    /api/auth/me           → Get current user profile
```

### 📚 Courses
```
GET    /api/courses           → List all courses
GET    /api/courses/:id       → Get course by ID
POST   /api/courses           → Create a course        [Admin]
PUT    /api/courses/:id       → Update a course        [Admin]
DELETE /api/courses/:id       → Delete a course        [Admin]
```

### 🎓 Enrollment
```
POST   /api/enroll                        → Enroll in a course
GET    /api/enrollments/me                → Get my enrollments
PUT    /api/enrollments/:id/progress      → Update course progress
```

### 👑 Admin
```
GET    /api/users             → List all users         [Admin]
GET    /api/reports           → Platform analytics     [Admin]
```

---

## ⚙️ Installation & Setup

### Prerequisites
- Node.js `v18+`
- MongoDB (local or Atlas)
- npm or yarn

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/elearning-platform.git
cd elearning-platform
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file in `/backend`:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

```bash
npm run dev
```

### 3. Frontend Setup
```bash
cd frontend
npm install
```

Create a `.env` file in `/frontend`:
```env
VITE_API_URL=http://localhost:5000
```

```bash
npm run dev
```

> 🚀 App runs at `http://localhost:5173`

---

## 🌐 Deployment

| Service | Platform |
|---|---|
| Frontend | [Vercel](https://vercel.com) |
| Backend | [Render](https://render.com) |
| Database | [MongoDB Atlas](https://www.mongodb.com/atlas) |

---

## 🧪 Running Tests

```bash
# Backend tests (Jest + Supertest)
cd backend && npm test

# Frontend tests (Vitest + RTL)
cd frontend && npm test
```

---

## 🔮 Future Enhancements

- [ ] 🎥 Course video uploads (Cloudinary / S3)
- [ ] 💳 Payment gateway integration (Stripe / Razorpay)
- [ ] 🏆 Certificate generation on course completion
- [ ] 📡 Live classes & webinars
- [ ] 💬 Discussion forums per course

---

## 👩‍💻 Author

<div align="center">

**Aarushi Sharma**
*Full Stack MERN Developer*

[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/your-username)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/your-profile)

</div>

---

<div align="center">

Made with ❤️ by Aarushi Sharma

</div>
