const express = require('express');
const multer = require('multer');
const uploadConfig = require('./config/upload');


const PostController = require('./controllers/PostController');
const LikeController = require('./controllers/LikeController');

const authController = require('./controllers/authController');
const projectController = require('./controllers/projectController');


const routes = new express.Router();
const upload = multer(uploadConfig);


routes.post('/posts', upload.single('imagem'),PostController.store);
routes.get('/posts',PostController.index);

routes.post('/posts/:id/like', LikeController.store); 

module.exports = routes;
