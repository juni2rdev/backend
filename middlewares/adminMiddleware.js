require('dotenv').config();

async function adminMiddleware(req, res, next) {
    const key = req.header('key');
    if(!key) {
        return res.status(400).json({ msg : "invalid key" });
    };
    if (key !== process.env.KEY) {
        return res.status(400).json({ msg: "invalid key" });
    };
    next();
};

module.exports = adminMiddleware;