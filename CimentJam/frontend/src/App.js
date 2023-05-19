import React from "react";
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./component/Login";
import AddUser from "./component/AddUser";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}  />
        <Route path="/adduser" element={<AddUser />}  />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
