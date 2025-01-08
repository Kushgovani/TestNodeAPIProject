const uploadPhoto = require("../Models/ProfilePhoto.js");

exports.profilephoto = async (req, res) => {
  try {
    const photo = {
      filename: req.file.filename,
      path: req.file.path,
      originalName: req.file.originalname,
      size: req.file.size,
      userId: req.user.userId,
    };
    const profilePhoto = await uploadPhoto.create(photo);
    console.log("profilephoto:",profilePhoto);
    return res.status(201).send({
      message: "profilePhoto  created successfully",
      profilePhoto: profilePhoto,
    });
  } catch (e) {
    console.error("Error saving photo:", e);
    return res.status(500).send({
      message: "Error saving profile photo",
      error: e.message,
    });
  }
};
