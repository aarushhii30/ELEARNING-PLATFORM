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
    price: 3999,
    category: "frontend",
    difficulty: "beginner",
    instructor: "Jane Doe",
   thumbnailUrl: "https://images.unsplash.com/photo-1633356122544-f134324a6cee",
    lessons: [
      { title: "Intro to React", contentHtml: "<p>Welcome to React.</p>", order: 1 },
      { title: "Components & Props", contentHtml: "<p>Build reusable UI.</p>", order: 2 },
      { title: "Hooks Deep Dive", contentHtml: "<p>useState, useEffect.</p>", order: 3 },
    ],
  },
  {
    title: "Node.js & Express APIs",
    description: "Design and build production-grade REST APIs with Express and MongoDB.",
    price: 5999,
    category: "backend",
    difficulty: "intermediate",
    instructor: "John Smith",
    thumbnailUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c",
    lessons: [
      { title: "Express Basics", contentHtml: "<p>Routing & middleware.</p>", order: 1 },
      { title: "MongoDB & Mongoose", contentHtml: "<p>Modeling data.</p>", order: 2 },
      { title: "JWT Auth", contentHtml: "<p>Secure your API.</p>", order: 3 },
    ],
  },
  {
    title: "System Design Fundamentals",
    description: "Learn scalable architecture, caching, and database design.",
    price: 2999,
    category: "architecture",
    difficulty: "advanced",
    instructor: "Ada Lovelace",
    thumbnailUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa",
  lessons: [
      { title: "Scaling Basics", contentHtml: "<p>Vertical vs horizontal.</p>", order: 1 },
      { title: "Caching Strategies", contentHtml: "<p>Redis & CDNs.</p>", order: 2 },
    ],
  },
  {
  title: "JavaScript Mastery",
  description: "Learn JavaScript from fundamentals to advanced ES6+ concepts.",
  price: 3499,
  category: "frontend",
  difficulty: "beginner",
  instructor: "Sarah Wilson",
 thumbnailUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
  lessons: [
    { title: "Variables & Data Types", contentHtml: "<p>JS basics.</p>", order: 1 },
    { title: "Functions & Scope", contentHtml: "<p>Functions in JS.</p>", order: 2 },
    { title: "ES6 Features", contentHtml: "<p>Modern JavaScript.</p>", order: 3 },
  ],
},
{
  title: "MongoDB Complete Guide",
  description: "Master MongoDB, collections, indexing and aggregation.",
  price: 4499,
  category: "backend",
  difficulty: "intermediate",
  instructor: "Michael Brown",
  thumbnailUrl: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d",
  lessons: [
    { title: "MongoDB Basics", contentHtml: "<p>Introduction.</p>", order: 1 },
    { title: "CRUD Operations", contentHtml: "<p>Create Read Update Delete.</p>", order: 2 },
    { title: "Aggregation Pipeline", contentHtml: "<p>Advanced queries.</p>", order: 3 },
  ],
},
{
  title: "Full Stack MERN Development",
  description: "Build complete web applications using MongoDB, Express, React and Node.",
  price: 7999,
  category: "fullstack",
  difficulty: "advanced",
  instructor: "David Johnson",
 thumbnailUrl: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4",

  lessons: [
    { title: "Project Setup", contentHtml: "<p>MERN introduction.</p>", order: 1 },
    { title: "Backend APIs", contentHtml: "<p>Express APIs.</p>", order: 2 },
    { title: "Frontend Integration", contentHtml: "<p>React frontend.</p>", order: 3 },
  ],
},
{
  title: "Data Structures & Algorithms",
  description: "Prepare for coding interviews with DSA concepts.",
  price: 5999,
  category: "programming",
  difficulty: "intermediate",
  instructor: "Robert Lee",
 thumbnailUrl: "https://images.unsplash.com/photo-1516116216624-53e697fedbea",
  lessons: [
    { title: "Arrays & Strings", contentHtml: "<p>Basics.</p>", order: 1 },
    { title: "Linked Lists", contentHtml: "<p>Linked lists.</p>", order: 2 },
    { title: "Trees & Graphs", contentHtml: "<p>Advanced DSA.</p>", order: 3 },
  ],
},
{
  title: "Generative AI for Developers",
  description: "Learn LLMs, RAG, Prompt Engineering and AI app development.",
  price: 8999,
  category: "ai",
  difficulty: "advanced",
  instructor: "Andrew Clark",
  thumbnailUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995",
  lessons: [
    { title: "Introduction to LLMs", contentHtml: "<p>LLM basics.</p>", order: 1 },
    { title: "Prompt Engineering", contentHtml: "<p>Writing prompts.</p>", order: 2 },
    { title: "Building AI Apps", contentHtml: "<p>RAG and deployment.</p>", order: 3 },
  ],
}
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
