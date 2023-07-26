const connectDatabase = require('../db/Database_online');

// Add dechargement
const addDechargement = async (numero_bordereau, numero_bon_commande, etat_camion, date, lieu_dechargement, poids_camion_decharge, poids_camion_apres_chargement,  chargement_id) => {
  try {
    const connection = await connectDatabase();
    const query = "INSERT INTO dechargements (numero_bordereau, numero_bon_commande, etat_camion,date, lieu_dechargement, poids_camion_decharge, poids_camion_apres_chargement,  chargement_id) VALUES (?, ?, ?,?,  ?, ?, ?, ?)";
    const [result] = await connection.query(query, [numero_bordereau, numero_bon_commande, etat_camion,date, lieu_dechargement, poids_camion_decharge, poids_camion_apres_chargement,  chargement_id]);
    connection.end(); // Close the connection after query execution
    return result.insertId;
  } catch (error) {
    throw error;
  }
};

// Get dechargement by ID
const getDechargement = async (id) => {
  try {
    const connection = await connectDatabase();
    const query = "SELECT * FROM dechargements WHERE id = ?";
    const [rows] = await connection.query(query, [id]);
    connection.end();
    return rows[0]; // Return the first row (assuming ID is unique)
  } catch (error) {
    throw error;
  }
};

// Get all dechargements
const getDechargements = async () => {
  try {
    const connection = await connectDatabase();
    const query = "SELECT * FROM dechargements";
    const [rows] = await connection.query(query);
    connection.end();
    return rows;
  } catch (error) {
    throw error;
  }
};

// Update dechargement
const updateDechargement = async (id, numero_bordereau, numero_bon_commande, etat_camion, lieu_dechargement, poids_camion_decharge, poids_camion_apres_chargement,  chargement_id) => {
  try {
    const connection = await connectDatabase();
    const query = "UPDATE dechargements SET numero_bordereau = ?, numero_bon_commande = ?, etat_camion = ?, lieu_dechargement = ?, poids_camion_decharge = ?, poids_camion_apres_chargement = ?,chargement_id = ? WHERE id = ?";
    const [result] = await connection.query(query, [numero_bordereau, numero_bon_commande, etat_camion, lieu_dechargement, poids_camion_decharge, poids_camion_apres_chargement,  chargement_id, id]);
    connection.end();
    return result.affectedRows > 0;
  } catch (error) {
    throw error;
  }
};

// Delete dechargement
const deleteDechargement = async (id) => {
  try {
    const connection = await connectDatabase();
    const query = "DELETE FROM dechargements WHERE id = ?";
    const [result] = await connection.query(query, [id]);
    connection.end();
    return result.affectedRows > 0;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  addDechargement,
  getDechargement,
  getDechargements,
  updateDechargement,
  deleteDechargement,
};
