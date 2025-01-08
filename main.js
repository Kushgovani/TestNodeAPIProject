const express = require("express");
const app = express();
const userRoute = require("./Routes/AuthRoute");
const productRoute = require("./Routes/ProductRoute");
const uploadPhoto = require('./Routes/UploadPhoto');
const postBook = require('./Routes/PostRoute');

var bodyParser = require("body-parser");
const validateToken = require("./Middlewares/AuthMiddleware");

//
//const cors = require("cors");
//app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));



//app.use(express.json());
//app.use(express.urlencoded({ extended: true }));



app.use("/", userRoute);
app.use("/product", validateToken, productRoute);
app.use("/uploadphoto",validateToken, uploadPhoto);
app.use("/postbook",validateToken, postBook);


module.exports = app;
