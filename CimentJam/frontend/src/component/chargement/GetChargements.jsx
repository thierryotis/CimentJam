import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Modal from 'react-modal';
import { toast } from 'react-toastify';
import { serverUrl } from '../../server';

const modalStyles = {
  content: {
    width: '400px', // Adjust the width as needed
    height: '200px', // Adjust the height as needed
    margin: 'auto',
  },
};

<<<<<<< HEAD
const GetChargements = () => {
  Modal.setAppElement('#root'); // Replace '#root' with the ID of your root element
  const [chargements, setChargements] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedChargement, setSelectedChargement] = useState(null);

  const openModal = (chargement) => {
    setSelectedChargement(chargement);
=======
const GetDechargements = () => {
  Modal.setAppElement('#root'); // Replace '#root' with the ID of your root element
  const [dechargements, setDechargements] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDechargement, setSelectedDechargement] = useState(null);

  const openModal = (dechargement) => {
    setSelectedDechargement(dechargement);
>>>>>>> addingTemplate
    setModalOpen(true);
  };

  const closeModal = () => {
<<<<<<< HEAD
    setSelectedChargement(null);
    setModalOpen(false);
  };

  const deleteChargement = (id) => {
    axios
      .delete(`${serverUrl}/api/chargement/deletechargement/${id}`)
      .then((response) => {
        if (response.data.success) {
          toast.success('Chargement deleted successfully');
          // Refresh the list of chargements after deletion
          axios
            .get(`${serverUrl}/api/chargement/getchargements`)
            .then((response) => {
              setChargements(response.data.chargements);
=======
    setSelectedDechargement(null);
    setModalOpen(false);
  };

  const deleteDechargement = (id) => {
    axios
      .delete(`${serverUrl}/api/dechargement/deletedechargement/${id}`)
      .then((response) => {
        if (response.data.success) {
          toast.success('Dechargement deleted successfully');
          // Refresh the list of dechargements after deletion
          axios
            .get(`${serverUrl}/api/dechargement/getdechargements`)
            .then((response) => {
              setDechargements(response.data.dechargements);
>>>>>>> addingTemplate
            })
            .catch((error) => {
              console.error(error);
            });
          setTimeout(() => {
            closeModal();
          }, 1000);
        } else {
<<<<<<< HEAD
          toast.error('Error deleting the chargement');
=======
          toast.error('Error deleting the dechargement');
>>>>>>> addingTemplate
        }
      })
      .catch((error) => {
        console.error(error);
<<<<<<< HEAD
        toast.error('An error occurred while deleting the chargement');
=======
        toast.error('An error occurred while deleting the dechargement');
>>>>>>> addingTemplate
        setTimeout(() => {
          closeModal();
        }, 1000);
      });
  };

  useEffect(() => {
    axios
<<<<<<< HEAD
      .get(`${serverUrl}/api/chargement/getchargements`) // Assuming the server is running on the same host
      .then((response) => {
        setChargements(response.data.chargements);
=======
      .get(`${serverUrl}/api/dechargement/getdechargements`) // Assuming the server is running on the same host
      .then((response) => {
        setDechargements(response.data.dechargements);
>>>>>>> addingTemplate
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>N° Bordereau</TableCell>
              <TableCell>N° Bon Commande</TableCell>
<<<<<<< HEAD
              <TableCell>Date</TableCell>
              <TableCell>Lieu</TableCell>
              <TableCell>Poids  Charge</TableCell>
              <TableCell>Poids  Vide</TableCell>
              <TableCell>Shift 1</TableCell>
              <TableCell>Shift 2</TableCell>
              <TableCell>Operateur</TableCell>
              <TableCell>Chauffeur</TableCell>
              <TableCell>Camion</TableCell>
              <TableCell>Produit ID</TableCell>
=======
              <TableCell>Etat Camion</TableCell>
              <TableCell>Lieu Dechargement</TableCell>
              <TableCell>Poids Camion Decharge</TableCell>
              <TableCell>Poids Camion Apres Chargement</TableCell>
              <TableCell>Shift 1</TableCell>
              <TableCell>Shift 2</TableCell>
              <TableCell>Chargement ID</TableCell>
>>>>>>> addingTemplate
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
<<<<<<< HEAD
            {chargements.map((chargement) => (
              <TableRow key={chargement.id}>
                <TableCell>{chargement.numero_bordereau}</TableCell>
                <TableCell>{chargement.numero_bon_commande}</TableCell>
                <TableCell>{chargement.date}</TableCell>
                <TableCell>{chargement.lieu}</TableCell>
                <TableCell>{chargement.poids_camion_charge}</TableCell>
                <TableCell>{chargement.poids_camion_vide}</TableCell>
                <TableCell>{chargement.shift1}</TableCell>
                <TableCell>{chargement.shift2}</TableCell>
                <TableCell>{chargement.operateur}</TableCell>
                <TableCell>{chargement.chauffeur_nom}</TableCell>
                <TableCell>{chargement.camion_immatriculation}</TableCell>
                <TableCell>{chargement.produit_nom}</TableCell>
                <TableCell>
                  <Button onClick={() => openModal(chargement)}>
                    <EditIcon />
                  </Button>
                  <Button onClick={() => openModal(chargement)}>
=======
            {dechargements.map((dechargement) => (
              <TableRow key={dechargement.id}>
                <TableCell>{dechargement.numero_bordereau}</TableCell>
                <TableCell>{dechargement.numero_bon_commande}</TableCell>
                <TableCell>{dechargement.etat_camion}</TableCell>
                <TableCell>{dechargement.lieu_dechargement}</TableCell>
                <TableCell>{dechargement.poids_camion_decharge}</TableCell>
                <TableCell>{dechargement.poids_camion_apres_chargement}</TableCell>
                <TableCell>{dechargement.shift1}</TableCell>
                <TableCell>{dechargement.shift2}</TableCell>
                <TableCell>{dechargement.chargement_id}</TableCell>
                <TableCell>
                  <Button onClick={() => openModal(dechargement)}>
                    <EditIcon />
                  </Button>
                  <Button onClick={() => openModal(dechargement)}>
>>>>>>> addingTemplate
                    <DeleteIcon />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Modal isOpen={modalOpen} onRequestClose={closeModal} ariaHideApp={false} style={modalStyles}>
<<<<<<< HEAD
        {selectedChargement && (
          <>
            <h2>Confirmation</h2>
            <p>Do you really want to delete this chargement?</p>
            <Button onClick={() => deleteChargement(selectedChargement.id)}>Confirm</Button>
=======
        {selectedDechargement && (
          <>
            <h2>Confirmation</h2>
            <p>Do you really want to delete this dechargement?</p>
            <Button onClick={() => deleteDechargement(selectedDechargement.id)}>Confirm</Button>
>>>>>>> addingTemplate
            <Button onClick={closeModal}>Cancel</Button>
          </>
        )}
      </Modal>
    </>
  );
};

<<<<<<< HEAD
export default GetChargements;
=======
export default GetDechargements;
>>>>>>> addingTemplate
