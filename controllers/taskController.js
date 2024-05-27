const { Task, User, Organization } = require('../models');

exports.createTask = async (req, res) => {
    const { title, description } = req.body;

    if (!title) {
        return res.status(400).send({ message: 'Title are required.' });
    }

    try {

        let organizationId = req.user.organizationId
        const organization = await Organization.findByPk(organizationId);
        if (!organization) {
            return res.status(404).send({ message: 'Organization not found.' });
        }

        const task = await Task.create({
            title,
            description,
            organizationId,
            userId: req.userId,
        });

        res.status(201).send(task);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

exports.getTasksByOrganization = async (req, res) => {
    try {
        const organization = await Organization.findByPk(req.params.organizationId, {
            include: [Task],
        });
        if (!organization) {
            return res.status(404).send({ message: 'Organization not found.' });
        }

        res.status(200).send(organization.Tasks);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

exports.getTasksByUser = async (req, res) => {
    try {
        const user = await User.findByPk(req.userId, {
            include: [Task],
        });
        if (!user) {
            return res.status(404).send({ message: 'User not found.' });
        }

        res.status(200).send(user.Tasks);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

exports.updateTask = async (req, res) => {
    const { title, description, status } = req.body;

    try {
        const task = await Task.findByPk(req.params.taskId);
        if (!task) {
            return res.status(404).send({ message: 'Task not found.' });
        }

        task.title = title || task.title;
        task.description = description || task.description;
        task.status = status || task.status;
        await task.save();

        res.status(200).send({ message: 'Task updated successfully!' });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

exports.deleteTask = async (req, res) => {
    try {
        const task = await Task.findByPk(req.params.taskId);
        if (!task) {
            return res.status(404).send({ message: 'Task not found.' });
        }

        await task.destroy();
        res.status(200).send({ message: 'Task deleted successfully!' });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};
