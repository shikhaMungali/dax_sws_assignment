const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user');
const Organization = require('./organization');

const Task = sequelize.define('Task', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
    },
    status: {
        type: DataTypes.STRING,
        defaultValue: 'Pending',
    },
    organizationId: {
        type: DataTypes.INTEGER,
        references: {
            model: Organization,
            key: 'id',
        },
    },
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'id',
        },
    },
});

Task.belongsTo(User, { foreignKey: 'userId' });
Task.belongsTo(Organization, { foreignKey: 'organizationId' });

module.exports = Task;
