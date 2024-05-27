const sequelize = require('./config/database');
const { User, Role, Organization, Task } = require('./models');
const bcrypt = require('bcryptjs');

const seedDatabase = async () => {
    try {
        await sequelize.sync({ force: true }); 

       
        const roles = await Role.bulkCreate([
            { name: 'Admin' },
            { name: 'Manager' },
            { name: 'Employee' },
        ]);

       
        const organizations = await Organization.bulkCreate([
            { name: 'Tech Solutions Inc' },
            { name: 'Marketing Agency' },
        ]);

        
        const users = await User.bulkCreate([
            {
                username: 'alice',
                password: bcrypt.hashSync('alice123', 8),
                roleId: roles.find(role => role.name === 'Admin').id,
                organizationId: null, 
            },
            {
                username: 'bob',
                password: bcrypt.hashSync('bob123', 8),
                roleId: roles.find(role => role.name === 'Manager').id,
                organizationId: organizations.find(org => org.name === 'Tech Solutions Inc').id,
            },
            {
                username: 'carol',
                password: bcrypt.hashSync('carol123', 8),
                roleId: roles.find(role => role.name === 'Employee').id,
                organizationId: organizations.find(org => org.name === 'Tech Solutions Inc').id,
            },
            {
                username: 'david',
                password: bcrypt.hashSync('david123', 8),
                roleId: roles.find(role => role.name === 'Manager').id,
                organizationId: organizations.find(org => org.name === 'Marketing Agency').id,
            },
            {
                username: 'eva',
                password: bcrypt.hashSync('eva123', 8),
                roleId: roles.find(role => role.name === 'Employee').id,
                organizationId: organizations.find(org => org.name === 'Marketing Agency').id,
            },
        ]);

        await Task.bulkCreate([
            {
                title: 'Develop new feature',
                description: 'Develop a new feature for the website.',
                organizationId: organizations.find(org => org.name === 'Tech Solutions Inc').id,
                userId: users.find(user => user.username === 'bob').id,
            },
            {
                title: 'Design marketing campaign',
                description: 'Create a marketing campaign for the new product launch.',
                organizationId: organizations.find(org => org.name === 'Marketing Agency').id,
                userId: users.find(user => user.username === 'david').id,
            },
        ]);

        console.log('Database seeded successfully!');
    } catch (err) {
        console.log('Error seeding database:', err);
    }
};

seedDatabase();
