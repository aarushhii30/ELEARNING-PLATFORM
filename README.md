# 🎓 E-Learning Platform

A full-stack MERN-based E-Learning Platform that enables users to browse courses, enroll in learning programs, track progress, and access personalized dashboards. The platform also includes an admin panel for course management, user monitoring, and analytics.

---

## 🚀 Features

### User Features

* User Registration & Login
* JWT Authentication & Authorization
* Browse and Search Courses
* Course Enrollment
* Progress Tracking
* Protected Dashboard
* Responsive UI

### Admin Features

* Create, Update, and Delete Courses
* Manage Users
* View Platform Reports & Metrics
* Role-Based Access Control

---

## 🛠️ Tech Stack

### Frontend

* React.js (Vite)
* React Router DOM
* Context API
* Axios
* Tailwind CSS

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* bcrypt.js

### Testing

* Vitest
* React Testing Library
* Jest
* Supertest

---

## 📂 Project Structure

```text
ELEARNING-PLATFORM/
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   ├── services/
│   │   ├── routes/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── seed/
│   ├── tests/
│   ├── server.js
│   └── package.json
│
├── README.md
└── .gitignore
```

## 🔐 Authentication & Security

* JWT-based Authentication
* Password Hashing using bcrypt
* Protected Routes
* Role-Based Authorization
* Secure Environment Variables
* Input Validation

---

## 📡 API Endpoints

### Authentication

* POST `/api/auth/signup`
* POST `/api/auth/login`
* GET `/api/auth/me`

### Courses

* GET `/api/courses`
* GET `/api/courses/:id`
* POST `/api/courses`
* PUT `/api/courses/:id`
* DELETE `/api/courses/:id`

### Enrollment

* POST `/api/enroll`
* GET `/api/enrollments/me`
* PUT `/api/enrollments/:id/progress`

### Admin

* GET `/api/users`
* GET `/api/reports`

---

## ⚙️ Installation & Setup

### Backend Setup

```bash
cd backend
npm install
npm run dev
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

## 🌐 Deployment

* Frontend: Vercel
* Backend: Render
* Database: MongoDB Atlas

---

## 📈 Future Enhancements

* Course Video Uploads
* Payment Gateway Integration
* Certificate Generation
* Live Classes & Webinars
* Discussion Forums

---

## 👩‍💻 Author

Aarushi Sharma

Full Stack MERN Developer
