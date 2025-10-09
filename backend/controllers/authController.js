const User = require("../models/User");
const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "3h" });
};

exports.registerUser = async (req, res) => {
  const { fullName, email, password, profilePicUrl } = req.body;

  if (!fullName || !email || !password ) {
    return res.status(400).json({ message: `All fields required` });
  }
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: `Email is already in use` });
    }
    const user = await User.create({
      fullName,
      email,
      password,
      profilePicUrl,
    });

    return res.status(201).json({
      message: `User created successfully`,
      id: user._id,
      user,
      token: generateToken(user._id),
    });
  } catch (err) {
     res
      .status(500)
      .json({ message: `Internal server error`, error: err.message });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "All fields required" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(400).json({ message: `Invalid credentials` });
    }

    res.status(200).json({
      message: "Logged In successfully",
      id: user._id,
      user,
      token: generateToken(user._id),
    });
  } catch (err) {
    return res
      .status(500)
      .json({ message: `Internal server error`, error: err.message });
  }
};
exports.getUserInfo = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json(user);
  } catch (err) {
    return res
      .status(500)
      .json({ message: `Internal server error`, error: err.message });
  }
};
