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

const GetDechargements = () => {
  Modal.setAppElement('#root'); // Replace '#root' with the ID of your root element
  const [dechargements, setDechargements] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDechargement, setSelectedDechargement] = useState(null);

  const openModal = (dechargement) => {
    setSelectedDechargement(dechargement);
    setModalOpen(true);
  };

  const closeModal = () => {
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
            })
            .catch((error) => {
              console.error(error);
            });
          setTimeout(() => {
            closeModal();
          }, 1000);
        } else {
          toast.error('Error deleting the dechargement');
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error('An error occurred while deleting the dechargement');
        setTimeout(() => {
          closeModal();
        }, 1000);
      });
  };

  useEffect(() => {
    axios
      .get(`${serverUrl}/api/dechargement/getdechargements`) // Assuming the server is running on the same host
      .then((response) => {
        setDechargements(response.data.dechargements);
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
              <TableCell>Etat Camion</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Lieu </TableCell>
              <TableCell>Poids Camion Decharge</TableCell>
              <TableCell>Poids Camion Apres Chargement</TableCell>
              <TableCell>Shift 1</TableCell>
              <TableCell>Shift 2</TableCell>
              <TableCell>Chargement ID</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dechargements.map((dechargement) => (
              <TableRow key={dechargement.id}>
                <TableCell>{dechargement.numero_bordereau}</TableCell>
                <TableCell>{dechargement.numero_bon_commande}</TableCell>
                <TableCell>{dechargement.etat_camion}</TableCell>
                <TableCell>{dechargement.date}</TableCell>
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
                    <DeleteIcon />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Modal isOpen={modalOpen} onRequestClose={closeModal} ariaHideApp={false} style={modalStyles}>
        {selectedDechargement && (
          <>
            <h2>Confirmation</h2>
            <p>Do you really want to delete this dechargement?</p>
            <Button onClick={() => deleteDechargement(selectedDechargement.id)}>Confirm</Button>
            <Button onClick={closeModal}>Cancel</Button>
          </>
        )}
      </Modal>
    </>
  );
};

export default GetDechargements;
