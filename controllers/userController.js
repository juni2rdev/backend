const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('./../models/userModel');

exports.createUser = async function (req, res) {
    const { name, email, password } = req.body;
    if (!name) {
        return res.status(400).json({ msg: "name is required" });
    };
    if (!email) {
        return res.status(400).json({ msg: "email is required" });
    };
    if (!password) {
        return res.status(400).json({ msg: "password is required" });
    };
    try {
        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({ msg: "this user already exists" });
        };

        const weightSalt = 10;
        const salt = await bcrypt.genSalt(weightSalt);
        const passwordHash = await bcrypt.hash(password, salt);
        const user = new User(
            {
                name: name,
                userAvatar: process.env.USER_AVATAR_DEFAULT,
                email: email,
                password: passwordHash
            }
        );
        user.save();
        return res.status(200).json({ msg: "user create with succesfful" });
    } catch (e) {
        console.log(e);
        return res.status(400).json({ msg: "something went wrong" });
    };
};

exports.loginUser = async function (req, res) {
    const { email, password } = req.body;
    if (!email) {
        return res.status(400).json({ msg: "email is required" });
    };
    if (!password) {
        return res.status(400).json({ msg: "password is required" });
    };

    try {
        const isEmailExists = await User.findOne({ email });
        if (!isEmailExists) {
            return res.status(400).json({ msg: "the email is not register" });
        };
        const validPassword = await bcrypt.compare(password, isEmailExists.password);
        if (!validPassword) {
            return res.status(400).json({ msg: "the password is incorrect try again..." });
        };

        const token = jwt.sign({ email }, process.env.SECRET_JWT);
        return res.status(200).json({ token });
    } catch (e) {
        console.log(e);
        return res.status(400).json({ msg: "Sothing wrong" });
    };
};

exports.getUserData = async function (req, res) {
    const token = req.header('Authorization');
    const userEmail = jwt.decode(token, process.env.SECRET_JWT);
    try {
        const email = userEmail.email;
        const datas = await User.findOne({ email });
        return res.status(200).json(
            {
                name: datas.name,
                email: datas.email,
                id: datas._id
            }
        );
    } catch (e) {
        return res.status(400).json({ msg: "something is wrong" });
    };
};

exports.getAllUserDatas = async function (req, res) {
    try {
        const users = await User.find();
        return res.status(200).json({ users });
    } catch (e) {
        return res.status(400).json({ msg: "it was not possible" });
    };
};

exports.deleteUser = async function (req, res) {
    const token = req.header('Authorization');
    try {
        const decode = jwt.decode(token);
        const email = decode.email;
        const userExists = await User.findOne({ email });
        if (!userExists) {
            return res.status(400).json({ msg: "the user was deleted or not exists" });
        };
        await User.findOneAndDelete({ email });
        return res.status(200).json({ msg: "user is delete with successful" });
    } catch (e) {
        console.log(e);
        return res.status(400).json({ msg: "it was not possible" });
    };
};

exports.updateUser = async function (req, res) {
    const token = req.header('Authorization');
    const { name, password, image } = req.body;
    try {
        const decode = jwt.decode(token);
        const email = decode.email;
        const IsUserExist = await User.findOne({ email });
        if (!IsUserExist) {
            return res.status(400).json({ msg: "this user is not exist !!" });
        };

        const weightSalt = 10;
        const salt = await bcrypt.genSalt(weightSalt);
        const passwordHash = await bcrypt.hash(password, salt);
        const user = await User.findOneAndUpdate(
            {
                email: email,
                name: name,
                userAvatar: image,
                password: passwordHash
            }
        );
        user.save();
        return res.status(200).json({ user });
    } catch (e) {
        console.log(e);
        return res.status(400).json({ msg: "Something wrong , i don't know, only the dev that develop this software know, i'm only api!!!" });
    };
};