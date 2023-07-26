const connectDatabase = require('../db/Database_online');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


// Add user
const addUser = async (nom, telephone, password, role) => {
  try {
    const connection = await connectDatabase();
    const hashedPassword = await bcrypt.hash(password, 10);
    const query = "INSERT INTO users (nom, telephone, password, role) VALUES (?, ?, ?, ?)";
    const [result] = await connection.query(query, [nom, telephone, hashedPassword, role]);
    connection.end();
    return result.insertId;
  } catch (error) {
    throw error;
  }
};


// Get users
const getUsers = async () => {
  try {
  const connection = await connectDatabase();
  const query = "SELECT * FROM users";
  const [rows] = await connection.query(query);
  connection.end();
  return rows;
  } catch (error) {
  throw error;
  }
};
// User login
const login = async (telephone, password) => {
    try {
      const connection = await connectDatabase();
      const query = "SELECT * FROM users WHERE telephone = ?";
      const [rows] = await connection.query(query, [telephone]);
      connection.end();
  
      if (rows.length === 0) {
        console.log('user not found')
        return null; // User not found

      }
      const user = rows[0];
      const isPasswordValid = await bcrypt.compare(password, user.password);
  
      if (!isPasswordValid) {
        console.log('incorrect password')
        return null; // Incorrect password
      }
      return user;
    } catch (error) {
      throw error;
    }
  };

// Delete user
const deleteUser = async (userId) => {
  try {
  const connection = await connectDatabase();
  const query = "DELETE FROM users WHERE id = ?";
  const [result] = await connection.query(query, [userId]);
  connection.end();
  return result.affectedRows > 0;
  } catch (error) {
  throw error;
  }
};

// User logout
const logout = () => {
  // Perform any logout-related operations
  // For example, invalidating the token or removing it from the client-side
};

// Update user password
const updatePassword = async (id, newPassword) => {
    try {
      const connection = await connectDatabase();
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      const query = "UPDATE users SET password = ? WHERE id = ?";
      const [result] = await connection.query(query, [hashedPassword, id]);
      connection.end();
      return result.affectedRows > 0;
    } catch (error) {
      throw error;
    }
  };

module.exports = {
  addUser,
  getUsers,
  login,
  deleteUser,
  logout,
  updatePassword,
};
