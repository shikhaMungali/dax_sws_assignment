const { User, Role } = require('../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.register = async (req, res) => {
    const { username, password, roleId } = req.body;

    if (!username || !password || !roleId) {
        return res.status(400).send({ message: 'All fields are required.' });
    }

    try {
        const existingUser = await User.findOne({ where: { username } });
        if (existingUser) {
            return res.status(400).send({ message: 'Username is already taken.' });
        }

        const hashedPassword = bcrypt.hashSync(password, 8);
        const user = await User.create({
            username,
            password: hashedPassword,
            roleId,
        });

        res.status(201).send({ message: 'User registered successfully!' });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

exports.login = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).send({ message: 'Username and password are required.' });
    }

    try {
        const user = await User.findOne({ where: { username } });
        if (!user) {
            return res.status(404).send({ message: 'User not found.' });
        }

        const passwordIsValid = bcrypt.compareSync(password, user.password);
        if (!passwordIsValid) {
            return res.status(401).send({ message: 'Invalid password.' });
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
            expiresIn: 300, //5 min  expiry 
        });

        res.status(200).send({ auth: true, token });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};
