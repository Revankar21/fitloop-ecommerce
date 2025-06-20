import connectDB from "../../../utils/mongodb";
import User from "../../../models/User";
import bcrypt from "bcryptjs";

const handler = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: true, msg: "Method not allowed" });
  }

  try {
    await connectDB();

    const { name, email, password, phone, address, pincode } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: true, msg: "User already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new admin user
    const user = new User({
      name,
      email,
      password: hashedPassword,
      phone,
      address,
      pincode,
      isAdmin: true,
    });

    await user.save();

    res.status(201).json({
      error: false,
      msg: "Admin user created successfully",
      user: {
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      },
    });
  } catch (error) {
    console.error("Create admin error:", error);
    res.status(500).json({ error: true, msg: "Internal server error" });
  }
};

export default handler; 