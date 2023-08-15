const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require('dotenv').config({ path: '../config/.env' });
const { addUser, getUsers, login, updatePassword, logout, deleteUser } = require("../model/user");
const {isAuthenticated, userRole} = require('../middleware/auth')
const {canAdmin} = require('../middleware/abilities')


// Add user
router.post("/adduser", isAuthenticated, canAdmin, async (req, res, next) => {
  try {
    const { nom, telephone, email, password, role } = req.body;
    // Hash the password
    const userId = await addUser(nom, telephone,email, password, role);
    res.status(201).json({
      success: true,
      message: "Utilisateur ajouté avec succès",
      userId,
    });
  } catch (error) {
    return next(error);
  }
});


// Get users
router.get("/getusers", isAuthenticated, canAdmin, async (req, res, next) => {
  try {
    const users = await getUsers();
    res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    return next(error);
  }
});


// User login
router.post("/login", async (req, res, next) => {
    try {
      const { telephone, password } = req.body;
      const user = await login(telephone, password);
        // Set CORS headers
     
  
      if (!user) {
        return res.status(401).json({
          success: false,
          message: "Mot de passe incorrect ou utilisateur non trouvé",
        });
      }
      // Password is correct and user is found
      // Generate a JWT token
      const token = jwt.sign({ userId: user.id, role:user.role, nom:user.nom, email:user.email }, process.env.TOKEN_KEY);
      res.status(200).json({
        success: true,
        message: "Utilisateur connecté avec succès",
        token,
        role:user.role, 
        nom : user.nom,
        userid : user.id
      });
    } catch (error) {
      return error;
    }
  });
  

// Update user password
router.put("/updatepassword/:id", isAuthenticated, async (req, res, next) => {
  try {
    const { id } = req.params;
    const { oldPassword, newPassword } = req.body;
    const user = await getUserById(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Utilisateur non trouvé",
      });
    }
    // Compare the provided old password with the stored hashed password
    const passwordMatched = await bcrypt.compare(oldPassword, user.password);
    if (!passwordMatched) {
      return res.status(401).json({
        success: false,
        message: "Ancien mot de passe incorrect",
      });
    }
    // Hash the new password
    const saltRound = 10;
    const hashedNewPassword = await bcrypt.hash(newPassword, saltRound);
    const updated = await updatePassword(id, hashedNewPassword);
    if (updated) {
      res.status(200).json({
        success: true,
        message: "Mot de passe mis à jour avec succès",
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Utilisateur non trouvé",
      });
    }
  } catch (error) {
    throw(error);
  }
});

// User logout
router.post("/logout", isAuthenticated, async (req, res, next) => {
  try {
    // Invalidate the token or perform any other logout-related operations
    // For example, remove the token from the client-side or add it to a list of revoked tokens
    // You can implement the token invalidation logic based on your specific requirements and authentication mechanism
    logout();
    res.status(200).json({
      success: true,
      message: "Utilisateur déconnecté avec succès",
    });
  } catch (error) {
    throw(error);
  }
});


// Delete user
router.delete("/deleteuser/:id", isAuthenticated, canAdmin, async (req, res, next) => {
  try {
  const userId = req.params.id;
  const deleted = await deleteUser(userId);
  if (deleted) {
  res.status(200).json({
  success: true,
  message: "Utilisateur supprimé avec succès",
  });
  } else {
  res.status(404).json({
  success: false,
  message: "Utilisateur non trouvé",
  });
  }
  } catch (error) {
     throw(error);
  }
  });
  
  // Get users
  router.get("/getusers", isAuthenticated, async (req, res, next) => {
  try {
  const users = await getUsers();
  res.status(200).json({
  success: true,
  users,
  });
  } catch (error) {
    throw (error)
  }
  });
  


// Get User role
router.post("/role", isAuthenticated, async(req, res, next) => {
    try{
        const token = req.headers.authorization.split(" ")[1]; 
        const role = await userRole(req, res, next)
        res.status(200).json({
            success:true,
            role:role,
            message: "Role retrieved successfully"
        })
    }
    catch(error){
        return next(error)
    }
});
 
// a User changes its own password
router.post("/changepassword", isAuthenticated, async(req, res, next) =>{
  try{
    const userEmail = req.user.email
    const { currentPassword, newPassword } = req.body;
    const user = await login(userEmail, currentPassword)
    if (!user) {
      return res.status(404).json({
        success: false,
        message: " Mot de passe actuel incorrect ligne.",
      });
    }
    try {
      const isUpdated = await updatePassword(user.id, newPassword);
      if (isUpdated) {
        res.status(200).json({ message: "Password updated successfully.", success:true });
      } else {
        res.status(400).json({ message: "Failed to update password.", success:false });
      }
    } catch (error) {
      return next(error); // Handle the error using Express error handling middleware
    }
  }
  catch(error){
    return next(error)
  }
})

module.exports = router;
