import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Modal from 'react-modal';
import { toast } from 'react-toastify';
import { serverUrl } from '../../server';
import Cookies from 'js-cookie';

const modalStyles = {
  content: {
    width: '400px', // Adjust the width as needed
    height: '200px', // Adjust the height as needed
    margin: 'auto',
  },
};

const GetCamions = () => {
  Modal.setAppElement('#root'); // Replace '#root' with the ID of your root element
  const [camions, setCamions] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCamion, setSelectedCamion] = useState(null);

  const openModal = (camion) => {
    setSelectedCamion(camion);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedCamion(null);
    setModalOpen(false);
  };

  const deleteCamion = (id) => {
    axios
      .delete(`${serverUrl}/api/camion/deletecamion/${id}`)
      .then((response) => {
        if (response.data.success) {
          toast.success('Camion deleted successfully');
          // Refresh the list of camions after deletion
          axios
            .get(`${serverUrl}/api/camion/getcamions`)
            .then((response) => {
              setCamions(response.data.camions);
            })
            .catch((error) => {
              console.error(error);
            });
          setTimeout(() => {
            closeModal();
          }, 1000);
        } else {
          toast.error('Error deleting the camion');
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error('An error occurred while deleting the camion');
        setTimeout(() => {
          closeModal();
        }, 1000);
      });
  };

  useEffect(() => {
    const token = Cookies.get('jwt')
    axios
      .get(`${serverUrl}/api/camion/getcamions`,{
        headers: {
          Authorization: `Bearer ${token}` // Ajoute le token dans l'en-tête Authorization de la requête
        }
      }) // Assuming the server is running on the same host
      .then((response) => {
        setCamions(response.data.camions);
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
              <TableCell>Immatriculation</TableCell>
              <TableCell>Numéro Benne</TableCell>
              <TableCell>Poids Vide (en Kg)</TableCell>
              <TableCell>État</TableCell>
              <TableCell>Mise en circulation</TableCell>
              <TableCell>Proprio nom</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {camions.map((camion) => (
              <TableRow key={camion.id}>
                <TableCell>{camion.immatriculation}</TableCell>
                <TableCell>{camion.numero_benne}</TableCell>
                <TableCell>{camion.poids_vide}</TableCell>
                <TableCell>{camion.etat}</TableCell>
                <TableCell>{camion.mise_en_circulation}</TableCell>
                <TableCell>{camion.proprio_nom}</TableCell>
                <TableCell>
                  <Button onClick={() => openModal(camion)}>
                    <EditIcon />
                  </Button>
                  <Button onClick={() => openModal(camion)}>
                    <DeleteIcon />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Modal isOpen={modalOpen} onRequestClose={closeModal} ariaHideApp={false} style={modalStyles}>
        {selectedCamion && (
          <>
            <h2>Confirmation</h2>
            <p>Do you really want to delete this camion?</p>
            <Button onClick={() => deleteCamion(selectedCamion.id)}>Confirm</Button>
            <Button onClick={closeModal}>Cancel</Button>
          </>
        )}
      </Modal>
    </>
  );
};

export default GetCamions;
