import React from "react";
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./component/Login";
import AddUser from "./component/AddUser";
import AddProprio from "./component/proprios/AddProprio";
import AddChauffeur from "./component/chauffeur/AddChauffeur";
import AddCamion from "./component/camion/AddCamion";
import AddProduit from "./component/produit/AddProduit";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}  />
        <Route path="/addproprio" element={<AddProprio />}  />
        <Route path="/addchauffeur" element={<AddChauffeur />}  />
        <Route path="/addcamion" element={<AddCamion />}  />
        <Route path="/addproduit" element={<AddProduit />}  />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
