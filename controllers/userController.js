const { User, Organization } = require('../models');

exports.getUserDetails = async (req, res) => {
    try {
        const user = await User.findByPk(req.userId, {
            include: [Organization],
        });
        if (!user) {
            return res.status(404).send({ message: 'User not found.' });
        }

        res.status(200).send(user);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

exports.updateUser = async (req, res) => {
    const { username, password, organizationId } = req.body;

    try {
        const user = await User.findByPk(req.userId);
        if (!user) {
            return res.status(404).send({ message: 'User not found.' });
        }

        user.username = username || user.username;
        if (password) {
            user.password = bcrypt.hashSync(password, 8);
        }
        user.organizationId = organizationId || user.organizationId;
        await user.save();

        res.status(200).send({ message: 'User updated successfully!' });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findByPk(req.userId);
        if (!user) {
            return res.status(404).send({ message: 'User not found.' });
        }

        await user.destroy();
        res.status(200).send({ message: 'User deleted successfully!' });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};
