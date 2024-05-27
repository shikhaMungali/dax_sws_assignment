const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Role = require('./role');
const Organization = require('./organization');

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    roleId: {
        type: DataTypes.INTEGER,
        references: {
            model: Role,
            key: 'id',
        },
    },
    organizationId: {
        type: DataTypes.INTEGER,
        references: {
            model: Organization,
            key: 'id',
        },
    },
});

User.belongsTo(Role, { foreignKey: 'roleId' });
User.belongsTo(Organization, { foreignKey: 'organizationId' });

module.exports = User;
