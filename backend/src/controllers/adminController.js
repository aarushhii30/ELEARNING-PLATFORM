import User from "../models/User.js";
import Enrollment from "../models/Enrollment.js";
import Course from "../models/Course.js";

// GET /api/users  (admin)
export const listUsers = async (_req, res) => {
  const users = await User.find().sort({ createdAt: -1 });
  res.json(users);
};

// GET /api/reports (admin) — simple metrics
export const reports = async (_req, res) => {
  const [users, courses, enrollments] = await Promise.all([
    User.countDocuments(),
    Course.countDocuments(),
    Enrollment.countDocuments(),
  ]);

  const topCourses = await Enrollment.aggregate([
    { $group: { _id: "$courseId", count: { $sum: 1 } } },
    { $sort: { count: -1 } },
    { $limit: 5 },
    {
      $lookup: { from: "courses", localField: "_id", foreignField: "_id", as: "course" },
    },
    { $unwind: "$course" },
    { $project: { _id: 0, title: "$course.title", enrollments: "$count" } },
  ]);

  res.json({ totals: { users, courses, enrollments }, topCourses });
};
