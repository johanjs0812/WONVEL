const Sequelize = require('sequelize');

const username = "root";
const pass = "";
const database = "travel";
const host = "localhost";

const sequelize = new Sequelize(database, username, pass, {
  host: host,
  dialect: 'mysql'
});

async function connectToDb() {
  console.log('Connecting to the database...');
  try {
    await sequelize.authenticate();
    console.log('Database is connected successfully !');
  } catch (err) {
    console.error('Failed to connect to MySQL', err);
  }
};

module.exports = { connectToDb, sequelize }; 