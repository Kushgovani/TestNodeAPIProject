const PostModel = require("../Models/PostModel");

exports.postPublic = async (req, res) => {
  try {
    const userId = req.user.userId; 
    //const { title, content } = req.body;
    if (!userId) {
      return res.status(400).send({
        message: "User ID is missing. Please ensure you're logged in.",
      });
    }

    const createPost = await PostModel.create({ ...req.body, userId });
    console.log(createPost)
    return res.status(201).send({
      message: "Post added successfully",
      post: createPost,
    });
  } catch (error) {
    console.error("Error creating post:", error);
    return res.status(500).send({
      message: "Failed to create post",
      error: error.message,
    });
  }
};
