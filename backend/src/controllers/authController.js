import User from "../models/User.js";
import { signToken, cookieOptions } from "../utils/token.js";

const isEmail = (e) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);

export const signup = async (req, res) => {
  const { name, email, password } = req.body || {};
  if (!name || !email || !password)
    return res.status(400).json({ message: "name, email and password are required" });
  if (!isEmail(email)) return res.status(400).json({ message: "Invalid email" });
  if (password.length < 6)
    return res.status(400).json({ message: "Password must be at least 6 characters" });

  const exists = await User.findOne({ email: email.toLowerCase() });
  if (exists) return res.status(409).json({ message: "Email already registered" });

  const user = new User({ name, email });
  await user.setPassword(password);
  await user.save();

  const token = signToken(user);
  res.cookie("token", token, cookieOptions());
  res.status(201).json({ user, token });
};

export const login = async (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password)
    return res.status(400).json({ message: "email and password are required" });

  const user = await User.findOne({ email: email.toLowerCase() });
  if (!user) return res.status(401).json({ message: "Invalid credentials" });

  const ok = await user.comparePassword(password);
  if (!ok) return res.status(401).json({ message: "Invalid credentials" });

  const token = signToken(user);
  res.cookie("token", token, cookieOptions());
  res.json({ user, token });
};

export const me = async (req, res) => {
  res.json({ user: req.user });
};

export const logout = async (_req, res) => {
  res.clearCookie("token", cookieOptions());
  res.json({ message: "Logged out" });
};
