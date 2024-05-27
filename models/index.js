const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const Role = require('./role');
const User = require('./user');
const Organization = require('./organization');
const Task = require('./task');

Role.init(
    {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'Role',
    }
);

User.init(
    {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        username: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        roleId: {
            type: Sequelize.INTEGER,
            references: {
                model: Role,
                key: 'id',
            },
        },
        organizationId: {
            type: Sequelize.INTEGER,
            references: {
                model: Organization,
                key: 'id',
            },
        },
    },
    {
        sequelize,
        modelName: 'User',
    }
);

Organization.init(
    {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'Organization',
    }
);

Task.init(
    {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        title: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        description: {
            type: Sequelize.STRING,
        },
        status: {
            type: Sequelize.STRING,
            defaultValue: 'Pending',
        },
        organizationId: {
            type: Sequelize.INTEGER,
            references: {
                model: Organization,
                key: 'id',
            },
        },
        userId: {
            type: Sequelize.INTEGER,
            references: {
                model: User,
                key: 'id',
            },
        },
    },
    {
        sequelize,
        modelName: 'Task',
    }
);

User.belongsTo(Role, { foreignKey: 'roleId' });
User.belongsTo(Organization, { foreignKey: 'organizationId' });

Task.belongsTo(User, { foreignKey: 'userId' });
Task.belongsTo(Organization, { foreignKey: 'organizationId' });

Organization.hasMany(User, { foreignKey: 'organizationId' });
Organization.hasMany(Task, { foreignKey: 'organizationId' });

Role.hasMany(User, { foreignKey: 'roleId' });

module.exports = {
    sequelize,
    Role,
    User,
    Organization,
    Task,
};
