import connectDB from "../../../utils/mongodb";
import User from "../../../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const handler = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: true, msg: "Method not allowed" });
  }

  try {
    await connectDB();

    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: true, msg: "Invalid credentials" });
    }

    // Check if user is an admin
    if (!user.isAdmin) {
      return res.status(403).json({ error: true, msg: "Access denied. Admin privileges required." });
    }

    // Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: true, msg: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, isAdmin: true },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      error: false,
      token,
      user: {
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      },
    });
  } catch (error) {
    console.error("Admin login error:", error);
    res.status(500).json({ error: true, msg: "Internal server error" });
  }
};

export default handler; 