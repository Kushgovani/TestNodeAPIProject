const mongoose = require("mongoose");

// Define the schema
const profilePhotoSchema = new mongoose.Schema({
  filename: {
    type: String, // Use String for filenames
    required: true,
  },
  path: {
    type: String,
    required: true,
  },
  originalName: {
    type: String,
    required: true,
  },
  size: {
    type: Number,
    required: true,
  },
  uploadDate: {
    type: Date,
    default: Date.now,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserData", // Reference the User model
    required: true,
  },
});

// Create and export the model
const ProfilePhoto = mongoose.model("ProfilePhoto", profilePhotoSchema);
module.exports = ProfilePhoto;
