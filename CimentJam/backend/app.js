const express = require("express");
const app = express();
//const listEndpoints = require('express-list-endpoints');
const bodyParser = require("body-parser");
const cors = require("cors");
app.use(cors({
  origin: ['http://127.0.0.1:3000', 'http://localhost:3000', 'http://127.0.0.1:80',
   'http://projectpartners-solutions.com', 'http://www.projectpartners-solutions.com',
  'https://projectpartners-solutions.com','https://www.projectpartners-solutions.com',
'http://51.254.38.237:3306', 'https://51.254.38.237:3306' ],
  credentials: true // Set this to true if you need to include credentials (e.g., cookies) in the request.
}));



// Enable CORS with allowed origins



require("dotenv").config({
  path: "./.env",
});



app.use(express.json());
app.use("/", express.static("uploads"));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));

// config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({
    path: "backend/config/.env",
  });
}


// simple route
app.get("/", (req, res) => {
    console.log(req.body)
  res.json({ message: "Welcome to bezkoder application." });
});
// import routes
const proprio = require("./controller/proprio");
const produit = require("./controller/produit");
const camion = require("./controller/camion");
const chauffeur = require("./controller/chauffeur");
const chargement = require("./controller/chargement");
const dechargement = require("./controller/dechargement");
const user = require("./controller/user");
const operateur = require("./controller/operateur");



app.use("/api/proprio", proprio);
app.use("/api/produit", produit);
app.use("/api/camion", camion);
app.use("/api/chauffeur", chauffeur);
app.use("/api/chargement", chargement);
app.use("/api/dechargement", dechargement);
app.use("/api/user", user);
app.use("/api/operateur", operateur);



//console.log(listEndpoints(app));

// it's for ErrorHandling
//app.use(ErrorHandler);


module.exports = app;