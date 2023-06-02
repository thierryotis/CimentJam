const mysql = require('mysql2/promise');

const connectDatabase = async () => {
  try {
    const connection = await mysql.createConnection({
      host: "sql7.freemysqlhosting.net",
      port: 3306,
      user: "sql7622624",
      password: "rIkAqLy1kC",
      database: "sql7622624",
    });

    console.log('Connected to the database!');
    return connection;
  } catch (error) {
    console.error('Error connecting to the database:', error);
    process.exit(1);
  }
};

module.exports = connectDatabase;
