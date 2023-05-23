const connectDatabase = require('../db/Database');

// Add camion
const addCamion = async (immatriculation, numero_benne, poids_vide, etat, mise_en_circulation, proprio_id) => {
  try {
    const connection = await connectDatabase();
    const query = "INSERT INTO camions (immatriculation, numero_benne, poids_vide, etat, mise_en_circulation, proprio_id) VALUES (?, ?, ?, ?, ?, ?)";
    const [result] = await connection.query(query, [immatriculation, numero_benne, poids_vide, etat, mise_en_circulation, proprio_id]);
    connection.end(); // Close the connection after query execution
    return result.insertId;
  } catch (error) {
    throw error;
  }
};

// Get camion by ID
const getCamion = async (id) => {
  try {
    const connection = await connectDatabase();
    const query = "SELECT * FROM camions WHERE id = ?";
    const [rows] = await connection.query(query, [id]);
    connection.end();
    return rows[0]; // Return the first row (assuming ID is unique)
  } catch (error) {
    throw error;
  }
};

// Get all camions
const getCamions = async () => {
  try {
    const connection = await connectDatabase();
    const query = "SELECT camions.*, proprios.nom AS proprio_nom FROM camions JOIN proprios ON camions.proprio_id = proprios.id";
    const [rows] = await connection.query(query);
    connection.end();
    return rows;
  } catch (error) {
    throw error;
  }
};


// Update camion
const updateCamion = async (id, immatriculation, numero_benne, poids_vide, etat, mise_en_circulation, proprio_id) => {
  try {
    const connection = await connectDatabase();
    const query = "UPDATE camions SET immatriculation = ?, numero_benne = ?, poids_vide = ?, etat = ?, mise_en_circulation = ?, proprio_id = ? WHERE id = ?";
    const [result] = await connection.query(query, [immatriculation, numero_benne, poids_vide, etat, mise_en_circulation, proprio_id, id]);
    connection.end();
    return result.affectedRows > 0;
  } catch (error) {
    throw error;
  }
};

// Delete camion
const deleteCamion = async (id) => {
  try {
    const connection = await connectDatabase();
    const query = "DELETE FROM camions WHERE id = ?";
    const [result] = await connection.query(query, [id]);
    connection.end();
    return result.affectedRows > 0;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  addCamion,
  getCamion,
  getCamions,
  updateCamion,
  deleteCamion,
};
