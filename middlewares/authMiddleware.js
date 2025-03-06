require('dotenv').config();
const jwt = require('jsonwebtoken');

async function authMiddleware(req, res, next) {
    const token = req.header('Authorization');
    if (!token) {
        return res.status(400).json({ msg: "invalid token" });
    };
    try {
        await jwt.verify(token, process.env.SECRET_JWT);
        next();
    } catch (e) {
        console.log(e);
        return res.status(400).json({ msg: "invalid token" });
    };
};

module.exports = authMiddleware;