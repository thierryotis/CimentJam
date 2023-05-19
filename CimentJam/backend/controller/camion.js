const express = require("express");
const router = express.Router();
const { addCamion, getCamions, getCamionById, updateCamion, deleteCamion } = require("../model/camion");

// Add camion
router.post("/addcamion", async (req, res, next) => {
  try {
    const { immatriculation, numero_benne, poids_vide, etat, mise_en_circulation, proprio_id } = req.body;
    const camionId = await addCamion(immatriculation, numero_benne, poids_vide, etat, mise_en_circulation, proprio_id);
    res.status(201).json({
      success: true,
      message: "Camion ajouté avec succès",
      camionId,
    });
  } catch (error) {
    return next(error);
  }
});

// Get all camions
router.get("/getcamions", async (req, res, next) => {
  try {
    const camions = await getCamions();
    res.status(200).json({
      success: true,
      camions,
    });
  } catch (error) {
    return next(error);
  }
});

// Get a camion by ID
router.get("/getcamion/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const camion = await getCamionById(id);
    if (camion) {
      res.status(200).json({
        success: true,
        camion,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Camion non trouvé",
      });
    }
  } catch (error) {
    return next(error);
  }
});

// Update camion
router.put("/updatecamion/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { immatriculation, numero_benne, poids_vide, etat, mise_en_circulation, proprio_id } = req.body;
    const updated = await updateCamion(id, immatriculation, numero_benne, poids_vide, etat, mise_en_circulation, proprio_id);
    if (updated) {
      res.status(200).json({
        success: true,
        message: "Camion mis à jour avec succès",
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Camion non trouvé",
      });
    }
  } catch (error) {
    return next(error);
  }
});

// Delete camion
router.delete("/deletecamion/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleted = await deleteCamion(id);
    if (deleted) {
      res.status(200).json({
        success: true,
        message: "Camion supprimé avec succès",
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Camion non trouvé",
      });
    }
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
