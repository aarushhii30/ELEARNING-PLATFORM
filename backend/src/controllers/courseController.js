import Course from "../models/Course.js";
import { slugify } from "../utils/token.js";

// GET /api/courses?category=&search=&difficulty=&minPrice=&maxPrice=&page=&limit=
export const listCourses = async (req, res) => {
  const { category, search, difficulty, minPrice, maxPrice } = req.query;
  const page = Math.max(parseInt(req.query.page) || 1, 1);
  const limit = Math.min(Math.max(parseInt(req.query.limit) || 9, 1), 50);

  const filter = {};
  if (category) filter.category = category;
  if (difficulty) filter.difficulty = difficulty;
  if (minPrice || maxPrice) {
    filter.price = {};
    if (minPrice) filter.price.$gte = Number(minPrice);
    if (maxPrice) filter.price.$lte = Number(maxPrice);
  }
  if (search) {
    filter.$or = [
      { title: { $regex: search, $options: "i" } },
      { description: { $regex: search, $options: "i" } },
    ];
  }

  const [items, total] = await Promise.all([
    Course.find(filter)
      .select("-lessons.contentHtml")
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit),
    Course.countDocuments(filter),
  ]);

  res.json({ items, total, page, pages: Math.ceil(total / limit) });
};

export const getCourse = async (req, res) => {
  const { id } = req.params;
  const query = id.match(/^[0-9a-fA-F]{24}$/) ? { _id: id } : { slug: id };
  const course = await Course.findOne(query);
  if (!course) return res.status(404).json({ message: "Course not found" });
  res.json(course);
};

export const createCourse = async (req, res) => {
  const body = req.body || {};
  if (!body.title) return res.status(400).json({ message: "title is required" });
  const slug = body.slug ? slugify(body.slug) : slugify(body.title);

  const exists = await Course.findOne({ slug });
  if (exists) return res.status(409).json({ message: "A course with this slug exists" });

  const course = await Course.create({ ...body, slug });
  res.status(201).json(course);
};

export const updateCourse = async (req, res) => {
  const body = { ...req.body };
  if (body.title && !body.slug) body.slug = slugify(body.title);
  if (body.slug) body.slug = slugify(body.slug);

  const course = await Course.findByIdAndUpdate(req.params.id, body, {
    new: true,
    runValidators: true,
  });
  if (!course) return res.status(404).json({ message: "Course not found" });
  res.json(course);
};

export const deleteCourse = async (req, res) => {
  const course = await Course.findByIdAndDelete(req.params.id);
  if (!course) return res.status(404).json({ message: "Course not found" });
  res.json({ message: "Course deleted" });
};
