const User = require("../models/User.js");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const jwtSecret = process.env.JWT_SECRET;

// generate user token
const generateToken = (id) => {
    return jwt.sign({ id }, jwtSecret, {
        expiresIn: "7d",
    });
};

// register user and sign in
const register = async (req, res) => {
    const { name, email, password } = req.body;

    // check if user exists (correção: verificar corretamente)
    const user = await User.findOne({ email });
    if (user) {
        res.status(422).json({ errors: ["Por favor, utilize um e-mail válido."] });
        return;
    }

    // generate password hash
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    // create user (correção: User.create)
    const newUser = await User.create({
        name,
        email,
        password: passwordHash,
    });

    // if new user
    if (!newUser) {
        res.status(422).json({ errors: ["Houve um erro, por favor tente novamente mais tarde."] });
        return; // correção
    }

    res.status(201).json({
        _id: newUser._id,
        token: generateToken(newUser._id),
    });
};

module.exports = {
    register,
};
