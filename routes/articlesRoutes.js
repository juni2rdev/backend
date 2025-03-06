const express = require('express');
const routes = express.Router();
const adminMiddlewares = require('./../middlewares/adminMiddleware');
const articlesController = require('./../controllers/articlesController');


routes.post('/create', adminMiddlewares, articlesController.createArticle);
routes.get('/get', adminMiddlewares, articlesController.getArticles);
routes.delete('/deleteById',adminMiddlewares, articlesController.deleteArticleById);
routes.put('/editArticleByName',adminMiddlewares, articlesController.editArticleById);
module.exports = routes;  