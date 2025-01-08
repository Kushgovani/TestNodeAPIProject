const postRoute = require('express').Router();
const postCont = require('../Controllers/PostController');

postRoute.post('/:userId', postCont.postPublic);



module.exports = postRoute;
