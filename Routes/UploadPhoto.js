const app = require('express').Router();
const upload = require('../Middlewares/UploadPhoto');
const uploadPhoto = require('../Controllers/UploadPhoto.js');

app.post('/userphoto', upload.single('profilephoto'),uploadPhoto.profilephoto )

module.exports = app;