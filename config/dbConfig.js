require('dotenv').config();
const { Sequelize } = require('sequelize');
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  logging: false
});

sequelize.authenticate()
  .then(() => console.log('Database connected successfully.'))
  .catch(err => console.error('Failed to connect to the database:', err));

sequelize.sync({ force: false })

module.exports = sequelize;