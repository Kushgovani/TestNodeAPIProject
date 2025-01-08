const authRoute = require('express').Router();
const {userData,login,logout} = require('../Controllers/AuthControllers.js');

authRoute.post('/',userData);
authRoute.post('/login',login);
authRoute.get('/logout',logout);



module.exports = authRoute;
