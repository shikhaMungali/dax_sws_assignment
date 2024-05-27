const jwt = require('jsonwebtoken');
const { User,Role } = require('../models');

const auth = async (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '');

    if (!token) {
        return res.status(401).send({ message: 'No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findByPk(decoded.id, {
            include: [{ model: Role, attributes: ['id', 'name'] }], 
        });

        if (!user) {
            return res.status(404).send({ message: 'User not found.' });
        }
        req.userId = decoded.id;
        req.user = user
        next();
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

const authorizeAdmin = (req, res, next) => {
    if (req.user.Role.name === 'Admin') {
        next();
    } else {
        res.status(403).json({ message: 'Unauthorized: Only Admins are allowed to perform this action' });
    }
};

const authorizeManager = (req, res, next) => {
    if (req.user.Role.name === 'Manager') {
        next();
    } else {
        res.status(403).json({ message: 'Unauthorized: Only Managers are allowed to perform this action' });
    }
};

module.exports = {
    authorizeAdmin,
    authorizeManager,
    auth
};

