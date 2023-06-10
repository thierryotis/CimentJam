const http = require("http");
const express = require("express");
const listEndpoints = require('express-list-endpoints');
const bodyParser = require("body-parser");
const cors = require("cors");


const app = express();
const server = http.createServer(app);

require("dotenv").config({
  path: "./.env",
});


const corsOptions ={
    origin:["https://cimentjamfrontend.onrender.com"], 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
//app.use(cors(corsOptions));
//app.use(cors());
app.use((req, res, next) => {
  const allowedOrigins = ["https://cimentjamfrontend.onrender.com","https://nomothierry.com", "https://www.nomothierry.com"];
  const { origin } = req.headers;
  
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  

  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", "true");

  next();
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