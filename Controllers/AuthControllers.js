const bcrypt = require("bcrypt");
const userData = require("../Models/AuthModel");
const jwt = require("jsonwebtoken");

exports.userData = async (req, res) => {
  try {
    const email = req.body.email;
    const existingUser = await userData.findOne({ email: email });
    if (existingUser) {
      console.log("ExistingUser:", existingUser);
      return res.status(200).json({ message: "User  already exists" });
    } else {
      const newUser = await userData.create(req.body);
      console.log("NewUser", newUser);
      return res.status(201).send({
        message: "User  created successfully",
        user: newUser,
      });
    }
  } catch (err) {
    console.log("Error creating user:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the email exists
    const matchEmail = await userData.findOne({ email });
    if (!matchEmail) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the password matches
    const checkPassword = await bcrypt.compare(password, matchEmail.password);
    if (!checkPassword) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: matchEmail._id, email: matchEmail.email },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    return res.status(200).json({
      message: "User logged in successfully",
      email: matchEmail.email,
      token: token,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
};

// Log out user
exports.logout = async (req, res) => {
  // try {
  //   console.log("Logout request received:", req.headers);

  //   // Clear the token stored in the cookie
  //   res.clearCookie("token", {
  //     httpOnly: true, // Ensure the cookie is HTTP-only
  //     secure: process.env.NODE_ENV === "production", // Use secure cookies in production
  //     sameSite: "Strict", // Adjust SameSite settings as per your setup
  //   });
  //   return res.status(200).json({ message: "User logged out successfully" });
  // } catch (err) {
  //   return res.status(500).json({ message: "Internal server error" });
  // }
};
