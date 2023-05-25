import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Modal from 'react-modal';
import { toast } from 'react-toastify';
import { serverUrl } from '../../server';
import Cookies from 'js-cookie'

const modalStyles = {
  content: {
    width: '400px', // Adjust the width as needed
    height: '200px', // Adjust the height as needed
    margin: 'auto',
  },
};

const GetChargements = () => {
  Modal.setAppElement('#root'); // Replace '#root' with the ID of your root element
  const [chargements, setChargements] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedChargement, setSelectedChargement] = useState(null);

  const openModal = (chargement) => {
    setSelectedChargement(chargement);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedChargement(null);
    setModalOpen(false);
  };

  const deleteChargement = (id) => {
    const token = Cookies.get('jwt')
    axios
      .delete(`${serverUrl}/api/chargement/deletechargement/${id}`,{
        headers: {
          Authorization: `Bearer ${token}` // Ajoute le token dans l'en-tête Authorization de la requête
        }
      })
      .then((response) => {
        if (response.data.success) {
          toast.success('Chargement deleted successfully');
          // Refresh the list of chargements after deletion
          const token = Cookies.get('jwt')
          axios
            .get(`${serverUrl}/api/chargement/getchargements`,{
              headers: {
                Authorization: `Bearer ${token}` // Ajoute le token dans l'en-tête Authorization de la requête
              }
            })
            .then((response) => {
              setChargements(response.data.chargements);
            })
            .catch((error) => {
              console.error(error);
            });
          setTimeout(() => {
            closeModal();
          }, 1000);
        } else {
          toast.error('Error deleting the chargement');
        }
      })
      .catch((error) => {
        console.error(error);

        toast.error('An error occurred while deleting the chargement');

        toast.error('An error occurred while deleting the dechargement');

        setTimeout(() => {
          closeModal();
        }, 1000);
      });
  };

  useEffect(() => {
    const token = Cookies.get('jwt')
    axios
      .get(`${serverUrl}/api/chargement/getchargements`,{
        headers: {
          Authorization: `Bearer ${token}` // Ajoute le token dans l'en-tête Authorization de la requête
        }
      }) // Assuming the server is running on the same host
      .then((response) => {
        setChargements(response.data.chargements);
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
              <TableCell>Date</TableCell>
              <TableCell>Lieu</TableCell>
              <TableCell>Poids Camion Chargé</TableCell>
              <TableCell>Poids Camion Vide</TableCell>
              <TableCell>Operateur</TableCell>
              <TableCell>Chauffeur</TableCell>
              <TableCell>Camion</TableCell>
              <TableCell>Produit</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {chargements.map((chargement) => (
              <TableRow key={chargement.id}>
                <TableCell>{chargement.numero_bordereau}</TableCell>
                <TableCell>{chargement.numero_bon_commande}</TableCell>
                <TableCell>{chargement.date}</TableCell>
                <TableCell>{chargement.lieu}</TableCell>
                <TableCell>{chargement.poids_camion_charge}</TableCell>
                <TableCell>{chargement.poids_camion_vide}</TableCell>
                <TableCell>{chargement.operateur}</TableCell>
                <TableCell>{chargement.chauffeur_nom}</TableCell>
                <TableCell>{chargement.camion_immatriculation}</TableCell>
                <TableCell>{chargement.produit_nom}</TableCell>
                <TableCell>
                  <Button onClick={() => openModal(chargement)}>
                    <EditIcon />
                  </Button>
                  <Button onClick={() => openModal(chargement)}>
                    <DeleteIcon />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Modal isOpen={modalOpen} onRequestClose={closeModal} ariaHideApp={false} style={modalStyles}>
        {selectedChargement && (
          <>
            <h2>Confirmation</h2>
            <p>Supprimer le chargement?</p>
            <Button onClick={() => deleteChargement(selectedChargement.id)}>Confirm</Button>
            <Button onClick={closeModal}>Cancel</Button>
          </>
        )}
      </Modal>
    </>
  );
};
export default GetChargements;
