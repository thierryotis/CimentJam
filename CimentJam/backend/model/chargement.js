const connectDatabase = require('../db/Database_online');

// Add chargement
const addChargement = async (numero_bordereau, numero_bon_commande, date, lieu, poids_camion_charge,   operateur_id, chauffeur_id, immatTracteur, immatBenne,  type_produit_id, prestataire_id, client_id) => {
  try {
    const connection = await connectDatabase();
    const query = "INSERT INTO chargements ( numero_bordereau, numero_bon_commande, date, lieu, poids_camion_charge,   operateur_id, chauffeur_id, immatTracteur, immatBenne,  type_produit_id, prestataire_id, client_id ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    const [result] = await connection.query(query, [ numero_bordereau, numero_bon_commande, date, lieu, poids_camion_charge,   operateur_id, chauffeur_id, immatTracteur, immatBenne, type_produit_id, prestataire_id, client_id ]);
    connection.end(); // Close the connection after query execution
    return result.insertId;
  } catch (error) {
    throw error;
  }
};

// Get chargement by ID
const getChargement = async (id) => {
  try {
    const connection = await connectDatabase();
    const query = "SELECT * FROM chargements WHERE id = ?";
    const [rows] = await connection.query(query, [id]);
    connection.end();
    return rows[0]; // Return the first row (assuming ID is unique)
  } catch (error) {
    throw error;
  }
};

// Get all chargements
const getChargements = async () => {
  try {
    const connection = await connectDatabase();
    const query = `
      SELECT c.*, ch.nom as chauffeur_nom, ca.immatTracteur as camion_immatTracteur, ca.immatBenne as camion_immatBenne, 
      p.nom as produit_nom, o.nom as operateur_nom, pr.nom as prestataire_nom,
      (ca.PVTracteur + ca.PVBenne) as PVCamion
      FROM chargements c
      JOIN chauffeurs ch ON c.chauffeur_id = ch.id
      JOIN camions ca ON c.immatTracteur = ca.immatTracteur
      JOIN produits p ON c.type_produit_id = p.id
      JOIN operateurs o ON c.operateur_id = o.id
      JOIN proprios pr ON c.prestataire_id = pr.id
    `;
    const [rows] = await connection.query(query);
    connection.end();
    return rows;
  } catch (error) {
    throw error;
  }
};


// Update chargement

const updateChargement = async (id, numero_bordereau, numero_bon_commande, date, lieu, poids_camion_charge, chauffeur_id,immatTracteur, immatBenne, type_produit_id, operateur_id, prestataire_id, client_id  ) => {
  try {
    const connection = await connectDatabase();
    const query = "UPDATE chargements SET numero_bordereau = ?, numero_bon_commande = ?, date = ?, lieu = ?, poids_camion_charge = ?,  chauffeur_id = ?, immatTracteur = ?, immatBenne = ?, type_produit_id = ?,operateur_id = ?, prestataire_id = ?, client_id = ?  WHERE id = ?";
    const [result] = await connection.query(query, [numero_bordereau, numero_bon_commande, date, lieu, poids_camion_charge, chauffeur_id,immatTracteur, immatBenne, type_produit_id, operateur_id, prestataire_id, client_id , id]);
    connection.end();
    return result.affectedRows > 0;
  } catch (error) {
    throw error;
  }
};


// Delete chargement
const deleteChargement = async (id) => {
  try {
    const connection = await connectDatabase();
    const query = "DELETE FROM chargements WHERE id = ?";
    const [result] = await connection.query(query, [id]);
    connection.end();
    return result.affectedRows > 0;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  addChargement,
  getChargement,
  getChargements,
  updateChargement,
  deleteChargement,
};
