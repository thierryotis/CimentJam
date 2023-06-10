const mysql = require('mysql2/promise');

const connectDatabase = async () => {
  try {
    const connection = await mysql.createConnection({
      host: "sql7.freemysqlhosting.net",
      port: 3306,
      user: "sql7625139",
      password: "2kMN5wHTyf",
      database: "sql7625139",
    });

    console.log('Connected to the database!');
    return connection;
  } catch (error) {
    console.error('Error connecting to the database:', error);
    process.exit(1);
  }
};

module.exports = connectDatabase;
