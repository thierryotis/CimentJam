const mysql = require('mysql2/promise');

const connectDatabase = async () => {
  try {
    const connection = await mysql.createConnection({
      host: "syfegrouyz447.mysql.db",
      port: 3306,
      user: "syfegrouyz447",
      password: "SKYdfRGcQ6HT",
      database: "syfegrouyz447",
    });

    console.log('Connected to the database!');
    return connection;
  } catch (error) {
    console.error('Error connecting to the database:', error);
    process.exit(1);
  }
};

module.exports = connectDatabase;
