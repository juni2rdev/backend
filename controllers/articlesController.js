const Article = require("./../models/articleModel");

exports.createArticle = async function (req, res) {
    const { name, text, date } = req.body;
    if (!name) {
        return res.status(400).json({ msg: "name is required!" });
    };
    if (!text) {
        return res.status(400).json({ msg: "text is required!" });
    };
    if (!date) {
        return res.status(400).json({ msg: "data is required!" });
    };
    try {
        const article = new Article({
            name: name,
            text: text,
            date: date
        });
        article.save();
        return res.status(200).json({ msg: "Article is create with successful" });
    } catch (e) {
        console.log(e);
        return res.status(400).json({ msg: "something wrong!" });
    };
};

exports.getArticles = async function (req, res) {
    try {
        const article = await Article.find();
        return res.status(200).json({ article });
    } catch (e) {
        console.log(e);
        return res.status(400).json({ msg: "something wrong!" });
    };
};

exports.deleteArticleById = async function (req, res) {
    const { id } = req.body;
    try {
        //check if this id exist 
        const IsArticleExist = await Article.findById(id);
        if (!IsArticleExist) {
            return res.status(400).json({ msg: "this article was deleted yet" });
        }
        await Article.findByIdAndDelete(id);
        return res.status(200).json({ msg: "article deleted with successful" });
    } catch (e) {
        console.log(e);
        return res.status(400).json({ msg: "something wrong!" });
    };
};

exports.editArticleById = async function (req, res) {
    const id = req.header('id');
    const { name, date, text } = req.body;
    if (!name) {
        return res.status(400).json({ msg: "Name is required!" });
    };
    if (!date) {
        return res.status(400).json({ msg: "date is required" });
    };
    if (!text) {
        return res.status(400).json({ msg: "text is required" });
    };
    try {
        //testing if article exists  
        const IsArticleExist = await Article.findById(id);
        if (!IsArticleExist) {
            return res.status(400).json({ msg: "the article is not exits" });
        };
        const article = await Article.findByIdAndUpdate(
            id,
            {
                name: name,
                date: date,
                text: text
            }
        );
        await article.save();
        const newArticle = await Article.findById(id);
        return res.status(200).json({ newArticle });
    } catch (e) {
        console.log(e);
        return res.status(400).json({ msg: "sothing wrong!" });
    };
};