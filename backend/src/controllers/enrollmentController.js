import Enrollment from "../models/Enrollment.js";
import Course from "../models/Course.js";

// POST /api/enroll  { courseId }
export const enroll = async (req, res) => {
  const { courseId } = req.body || {};
  if (!courseId) return res.status(400).json({ message: "courseId is required" });

  const course = await Course.findById(courseId);
  if (!course) return res.status(404).json({ message: "Course not found" });

  const existing = await Enrollment.findOne({ userId: req.user._id, courseId });
  if (existing) return res.status(409).json({ message: "Already enrolled", enrollment: existing });

  const enrollment = await Enrollment.create({ userId: req.user._id, courseId });
  res.status(201).json(enrollment);
};

// GET /api/enrollments/me
export const myEnrollments = async (req, res) => {
  const enrollments = await Enrollment.find({ userId: req.user._id }).populate(
    "courseId",
    "title slug thumbnailUrl category difficulty lessons"
  );

  const data = enrollments.map((e) => {
    const totalLessons = e.courseId?.lessons?.length || 0;
    const completed = [...e.progress.values()].filter(Boolean).length;
    return {
      _id: e._id,
      course: e.courseId,
      progress: Object.fromEntries(e.progress),
      enrolledAt: e.enrolledAt,
      percent: totalLessons ? Math.round((completed / totalLessons) * 100) : 0,
      completedLessons: completed,
      totalLessons,
    };
  });

  res.json(data);
};

// PUT /api/enrollments/:id/progress  { lessonId, completed }
export const updateProgress = async (req, res) => {
  const { lessonId, completed } = req.body || {};
  if (!lessonId) return res.status(400).json({ message: "lessonId is required" });

  const enrollment = await Enrollment.findById(req.params.id);
  if (!enrollment) return res.status(404).json({ message: "Enrollment not found" });
  if (String(enrollment.userId) !== String(req.user._id))
    return res.status(403).json({ message: "Not your enrollment" });

  enrollment.progress.set(String(lessonId), Boolean(completed));
  await enrollment.save();
  res.json(enrollment);
};
