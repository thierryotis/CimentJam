const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { addChargement, getChargements, getChargementById, updateChargement, deleteChargement } = require("../model/chargement");
const {getDechargementByChargement} = require('../model/dechargement')
const {isAuthenticated} = require('../middleware/auth')
const {canChargement} = require('../middleware/abilities')

// Add chargement
router.post("/addchargement", isAuthenticated, canChargement, async (req, res, next) => {
  try {
    console.log(req.body)
    const token = req.headers.authorization?.split(' ')[1];
    const { numero_bordereau, numero_bon_commande, date, lieu, poids_camion_charge,chauffeur_id, immatTracteur, immatBenne,  type_produit_id, prestataire_id, client_id } = req.body;
    const decodedToken = jwt.verify(token, process.env.TOKEN_KEY);
    console.log({decodedToken})
    const operateur_id = decodedToken.userId;
    const chargementId = await addChargement(numero_bordereau, numero_bon_commande, date, lieu, poids_camion_charge,  operateur_id, chauffeur_id,immatTracteur,immatBenne,type_produit_id, prestataire_id,client_id );
    res.status(201).json({
      success: true,
      message: "Chargement ajouté avec succès",
      chargementId,
    });
  } catch (error) {
    return next(error);
  }
});

// Get all chargements
router.get("/getchargements", isAuthenticated, canChargement, async (req, res, next) => {
  try {
    const chargements = await getChargements();
    res.status(200).json({
      success: true,
      chargements,
    });
  } catch (error) {
    return next(error);
  }
});

// Get a chargement by ID
router.get("/getchargement/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const chargement = await getChargementById(id);
    if (chargement) {
      res.status(200).json({
        success: true,
        chargement,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Chargement non trouvé",
      });
    }
  } catch (error) {
    return next(error);
  }
});

// Update chargement
router.post("/updatechargement/:id", isAuthenticated, canChargement,async (req, res, next) => {
  try {
    const { id } = req.params;

    console.log(req.user.userId, ' from updatechargement method')
    //check if the given chargement has already a dechargement
    if(!getDechargementByChargement(id)){
      //the dechargement has been made
      res.status(200).json({
        success: false,
        message: "Le chargement selectionné ne peut plus être modifié",
      });
    }
    const operateur_id = req.user.userId
    const { numero_bordereau, numero_bon_commande, date, lieu, poids_camion_charge,chauffeur_id, immatTracteur, immatBenne,  type_produit_id, prestataire_id, client_id } = req.body
    const updated = await updateChargement(id, numero_bordereau, numero_bon_commande, date, lieu, poids_camion_charge, chauffeur_id,immatTracteur, immatBenne, type_produit_id, operateur_id, prestataire_id, client_id    );
    
    if (updated) {
      res.status(200).json({
        success: true,
        message: "Chargement mis à jour avec succès",
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Chargement non trouvé",
      });
    }
  } catch (error) {
    return next(error);
  }
});

// Delete chargement
router.delete("/deletechargement/:id", isAuthenticated,canChargement, async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleted = await deleteChargement(id);
    if (deleted) {
      res.status(200).json({
        success: true,
        message: "Chargement supprimé avec succès",
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Chargement non trouvé",
      });
    }
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
