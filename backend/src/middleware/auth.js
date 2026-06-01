import jwt from "jsonwebtoken";
import User from "../models/User.js";

// Reads JWT from httpOnly cookie OR Authorization: Bearer <token>
export const requireAuth = async (req, res, next) => {
  try {
    let token = null;
    if (req.cookies && req.cookies.token) token = req.cookies.token;
    const header = req.headers.authorization;
    if (!token && header && header.startsWith("Bearer ")) {
      token = header.split(" ")[1];
    }
    if (!token) return res.status(401).json({ message: "Not authenticated" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) return res.status(401).json({ message: "User no longer exists" });

    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
