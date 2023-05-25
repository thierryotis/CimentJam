const express = require("express");
const router = express.Router();
const { addChargement, getChargements, getChargementById, updateChargement, deleteChargement } = require("../model/chargement");
const {isAuthenticated} = require('../middleware/auth')
const {canChargement} = require('../middleware/abilities')

// Add chargement
router.post("/addchargement", isAuthenticated, canChargement, async (req, res, next) => {
  try {
    const { numero_bordereau, numero_bon_commande, date, lieu, poids_camion_charge, poids_camion_vide,  operateur, chauffeur_id, camion_id, type_produit_id } = req.body;
    const chargementId = await addChargement(numero_bordereau, numero_bon_commande, date, lieu, poids_camion_charge, poids_camion_vide, operateur, chauffeur_id, camion_id, type_produit_id);
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
    console.table(chargements)
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
router.put("/updatechargement/:id", isAuthenticated, canChargement,async (req, res, next) => {
  try {
    const { id } = req.params;
    const { numero_bordereau, numero_bon_commande, date, lieu, poids_camion_charge, poids_camion_vide,  operateur, chauffeur_id, camion_id, type_produit_id } = req.body;
    const updated = await updateChargement(id, numero_bordereau, numero_bon_commande, date, lieu, poids_camion_charge, poids_camion_vide, operateur, chauffeur_id, camion_id, type_produit_id);
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
