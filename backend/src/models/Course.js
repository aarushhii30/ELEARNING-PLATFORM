import mongoose from "mongoose";

const lessonSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    contentHtml: { type: String, default: "" },
    videoUrl: { type: String },
    order: { type: Number, default: 0 },
  },
  { _id: true }
);

const courseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    description: { type: String, default: "" },
    price: { type: Number, default: 0 },
    category: { type: String, default: "general", index: true },
    difficulty: {
      type: String,
      enum: ["beginner", "intermediate", "advanced"],
      default: "beginner",
    },
    instructor: { type: String, default: "Staff" },
    thumbnailUrl: { type: String },
    lessons: [lessonSchema],
  },
  { timestamps: true }
);

courseSchema.index({ title: "text", description: "text" });

export default mongoose.model("Course", courseSchema);
