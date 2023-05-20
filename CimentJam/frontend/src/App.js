import React from "react";
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from "./component/Login";
import AddProprio from "./component/proprios/AddProprio";
import GetProprios from "./component/proprios/getProprios";
import AddChauffeur from "./component/chauffeur/AddChauffeur";
import GetChauffeurs from "./component/chauffeur/GetChauffeurs";
import AddCamion from "./component/camion/AddCamion";
import GetCamions from "./component/camion/GetCamions";
import AddProduit from "./component/produit/AddProduit";
import GetProduits from "./component/produit/GetProduits";

import AddChargement from "./component/chargement/AddChargement";
import GetChargements from "./component/chargement/GetChargements";

import AddDechargement from "./component/dechargement/Adddechargement";
import GetDechargements from "./component/dechargement/GetDechargements";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}  />
        <Route path="/addproprio" element={<AddProprio />}  />
        <Route path="/getproprios" element={<GetProprios />}  />
        <Route path="/addchauffeur" element={<AddChauffeur />}  />
        <Route path="/getchauffeurs" element={<GetChauffeurs />}  />
        <Route path="/addcamion" element={<AddCamion />}  />
        <Route path="/getcamions" element={<GetCamions />}  />
        <Route path="/addproduit" element={<AddProduit />}  />
        <Route path="/getproduits" element={<GetProduits />}  />

        <Route path="/addchargement" element={<AddChargement />}  />
        <Route path="/getchargements" element={<GetChargements />}  />

        <Route path="/adddechargement" element={<AddDechargement />}  />
        <Route path="/getdechargements" element={<GetDechargements />}  />


      </Routes>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </BrowserRouter>
  );
}

export default App;
