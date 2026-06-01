import dotenv from "dotenv";
dotenv.config();

import connectDB from "../config/db.js";
import mongoose from "mongoose";
import User from "../models/User.js";
import Course from "../models/Course.js";
import { slugify } from "./token.js";

const courses = [
  {
    title: "React from Zero to Hero",
    description: "Master modern React with hooks, routing and state management.",
    price: 49,
    category: "frontend",
    difficulty: "beginner",
    instructor: "Jane Doe",
    thumbnailUrl: "https://picsum.photos/seed/react/600/400",
    lessons: [
      { title: "Intro to React", contentHtml: "<p>Welcome to React.</p>", order: 1 },
      { title: "Components & Props", contentHtml: "<p>Build reusable UI.</p>", order: 2 },
      { title: "Hooks Deep Dive", contentHtml: "<p>useState, useEffect.</p>", order: 3 },
    ],
  },
  {
    title: "Node.js & Express APIs",
    description: "Design and build production-grade REST APIs with Express and MongoDB.",
    price: 59,
    category: "backend",
    difficulty: "intermediate",
    instructor: "John Smith",
    thumbnailUrl: "https://picsum.photos/seed/node/600/400",
    lessons: [
      { title: "Express Basics", contentHtml: "<p>Routing & middleware.</p>", order: 1 },
      { title: "MongoDB & Mongoose", contentHtml: "<p>Modeling data.</p>", order: 2 },
      { title: "JWT Auth", contentHtml: "<p>Secure your API.</p>", order: 3 },
    ],
  },
  {
    title: "System Design Fundamentals",
    description: "Learn scalable architecture, caching, and database design.",
    price: 89,
    category: "architecture",
    difficulty: "advanced",
    instructor: "Ada Lovelace",
    thumbnailUrl: "https://picsum.photos/seed/system/600/400",
    lessons: [
      { title: "Scaling Basics", contentHtml: "<p>Vertical vs horizontal.</p>", order: 1 },
      { title: "Caching Strategies", contentHtml: "<p>Redis & CDNs.</p>", order: 2 },
    ],
  },
];

const run = async () => {
  await connectDB();
  await Promise.all([User.deleteMany({}), Course.deleteMany({})]);

  const admin = new User({ name: "Admin", email: "admin@demo.com", role: "admin" });
  await admin.setPassword("password123");
  await admin.save();

  const user = new User({ name: "Demo User", email: "user@demo.com", role: "user" });
  await user.setPassword("password123");
  await user.save();

  await Course.insertMany(courses.map((c) => ({ ...c, slug: slugify(c.title) })));

  console.log("Seed complete.");
  console.log("Admin: admin@demo.com / password123");
  console.log("User:  user@demo.com  / password123");
  await mongoose.disconnect();
  process.exit(0);
};

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
