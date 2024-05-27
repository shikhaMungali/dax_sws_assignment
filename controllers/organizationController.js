const { Organization, User } = require('../models');

exports.createOrganization = async (req, res) => {
    const { name } = req.body;

    if (!name) {
        return res.status(400).send({ message: 'Organization name is required.' });
    }

    try {
        const organization = await Organization.create({ name });
        res.status(201).send(organization);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

exports.addUserToOrganization = async (req, res) => {
    const { userId, organizationId } = req.body;

    if (!userId || !organizationId) {
        return res.status(400).send({ message: 'User ID and Organization ID are required.' });
    }

    try {
        const user = await User.findByPk(userId);
        const organization = await Organization.findByPk(organizationId);

        if (!user) {
            return res.status(404).send({ message: 'User not found.' });
        }

        if (!organization) {
            return res.status(404).send({ message: 'Organization not found.' });
        }

        user.organizationId = organizationId;
        await user.save();

        res.status(200).send({ message: 'User added to organization successfully!' });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

exports.getOrganizationDetails = async (req, res) => {
    try {
        const organization = await Organization.findByPk(req.params.organizationId, {
            include: [User],
        });
        if (!organization) {
            return res.status(404).send({ message: 'Organization not found.' });
        }

        res.status(200).send(organization);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};
