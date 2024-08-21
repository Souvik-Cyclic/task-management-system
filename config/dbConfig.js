const { Sequelize } = require('sequelize');
const sequelize = new Sequelize(process.env.DATABASE_URL);

sequelize.authenticate()
  .then(() => console.log('Database connected successfully.'))
  .catch(err => console.error('Failed to connect to the database:', err));

module.exports = sequelize;