const mongoose = require('mongoose');

const schema = new mongoose.Schema(
    {
        name: String,
        text: String, 
        date: String
    }
);

const Article =  mongoose.model('Article', schema);
module.exports = Article;