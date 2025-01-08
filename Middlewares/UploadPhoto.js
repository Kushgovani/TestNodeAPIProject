const multer  = require('multer')


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "Upload/"); // Files will be stored in the "uploads" directory
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`); // Add timestamp to the filename
    },
});

const upload = multer({storage}); 

module.exports = upload;