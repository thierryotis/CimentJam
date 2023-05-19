const express = require("express");
const router = express.Router();
const { addProduit, getProduits, updateProduit, deleteProduit } = require("../model/produit");

// Add produit
router.post("/addproduit", async (req, res, next) => {
  try {
    const { nom, type } = req.body;
    const produitId = await addProduit(nom, type);
    res.status(201).json({
      success: true,
      message: "Produit ajouté avec succès",
      produitId,
    });
  } catch (error) {
    return next(error);
  }
});

// Get all produits
router.get("/getproduits", async (req, res, next) => {
  try {
    const produits = await getProduits();
    res.status(200).json({
      success: true,
      produits,
    });
  } catch (error) {
    return next(error);
  }
});

// Update produit
router.put("/updateproduit/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { nom, type } = req.body;
    const updated = await updateProduit(id, nom, type);
    if (updated) {
      res.status(200).json({
        success: true,
        message: "Produit mis à jour avec succès",
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Produit non trouvé",
      });
    }
  } catch (error) {
    return next(error);
  }
});

// Delete produit
router.delete("/deleteproduit/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleted = await deleteProduit(id);
    if (deleted) {
      res.status(200).json({
        success: true,
        message: "Produit supprimé avec succès",
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Produit non trouvé",
      });
    }
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
