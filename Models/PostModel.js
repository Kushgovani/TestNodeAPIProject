const mongoose = require("mongoose");

// Post Schema
const postSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  content: {
    type: String,
  },
  userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserData", // Reference the User model
      required: true,
    },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Post Model
const Post = mongoose.model("Post", postSchema);
module.exports = Post;
