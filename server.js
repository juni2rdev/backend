require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const articlesRoutes = require('./routes/articlesRoutes');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/user', userRoutes);
app.use(cors({ origin: "http://localhost:3000" }));
app.use('/articles', articlesRoutes);

app.get('/', (req, res) => {
    res.status(200).json({ msg: "welcome to my api" });
});

mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@database.kopu0.mongodb.net/`)
    .then(
        function () {
            app.listen(
                port,
                function () {
                    console.log('connection dataBase with succesfuly');
                    console.log('the server is running on ', port);
                    console.log(`http://localhost:${port}`);
                }
            )
        }
    )
    .catch(
        function (e) {
            console.log(e);
        }
    );