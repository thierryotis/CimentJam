const express = require("express");
const router = express.Router();
const { addDechargement, getDechargements, getDechargementById, updateDechargement, deleteDechargement } = require("../model/dechargement");
const {canDechargement} = require('../middleware/abilities')
const {isAuthenticated} = require('../middleware/auth')



// Add dechargement
router.post("/adddechargement",isAuthenticated, canDechargement,  async (req, res, next) => {
  try {
    const { numero_bordereau, numero_bon_commande, etat_camion, date, lieu_dechargement, poids_camion_decharge, poids_camion_apres_chargement,  chargement_id } = req.body;
    console.log(req.body)
    const dechargementId = await addDechargement(numero_bordereau, numero_bon_commande, etat_camion, date,lieu_dechargement, poids_camion_decharge, poids_camion_apres_chargement,  chargement_id);
    res.status(201).json({
      success: true,
      message: "Déchargement ajouté avec succès",
      dechargementId,
    });
  } catch (error) {
    return next(error);
  }
});

// Get all dechargements
router.get("/getdechargements", isAuthenticated, async (req, res, next) => {
  try {
    const dechargements = await getDechargements();
    res.status(200).json({
      success: true,
      dechargements,
    });
  } catch (error) {
    return next(error);
  }
});

// Get a dechargement by ID
router.get("/getdechargement/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const dechargement = await getDechargementById(id);
    if (dechargement) {
      res.status(200).json({
        success: true,
        dechargement,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Déchargement non trouvé",
      });
    }
  } catch (error) {
    return next(error);
  }
});

// Update dechargement
router.put("/updatedechargement/:id",  async (req, res, next) => {
  try {
    const { id } = req.params;
    const { numero_bordereau, numero_bon_commande, etat_camion,date, lieu_dechargement, poids_camion_decharge, poids_camion_apres_chargement,  chargement_id } = req.body;
    const updated = await updateDechargement(id, numero_bordereau, numero_bon_commande, etat_camion,date, lieu_dechargement, poids_camion_decharge, poids_camion_apres_chargement,  chargement_id);
    if (updated) {
      res.status(200).json({
        success: true,
        message: "Déchargement mis à jour avec succès",
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Déchargement non trouvé",
      });
    }
  } catch (error) {
    return next(error);
  }
});

// Delete dechargement
router.delete("/deletedechargement/:id",isAuthenticated, canDechargement, async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleted = await deleteDechargement(id);
    if (deleted) {
      res.status(200).json({
        success: true,
        message: "Déchargement supprimé avec succès",
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Déchargement non trouvé",
      });
    }
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
