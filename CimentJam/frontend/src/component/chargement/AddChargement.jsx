import React, { useState, useEffect } from 'react';
import { Button, TextField, Typography, Container, Select, MenuItem, InputLabel } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { toast } from 'react-toastify';
import axios from 'axios';
import { serverUrl } from '../../server';
import { getChauffeurs } from '../chauffeur/chauffeur';
import { getCamions } from '../camion/camion';
import { getProduits } from '../produit/produit';
import DatePicker from 'react-datepicker';
import Cookies from 'js-cookie';

import 'react-datepicker/dist/react-datepicker.css';

const defaultTheme = createTheme();

const AddChargement = () => {
  const [numeroBordereau, setNumeroBordereau] = useState('');
  const [numeroBonCommande, setNumeroBonCommande] = useState('');
  const [date, setDate] = useState('');
  const [lieu, setLieu] = useState('');
  const [poidsCamionCharge, setPoidsCamionCharge] = useState('');
  const [poidsCamionVide, setPoidsCamionVide] = useState('');
  const [operateur, setOperateur] = useState('');
  const [chauffeurId, setChauffeurId] = useState('');
  const [chauffeurOptions, setChauffeurOptions] = useState([]);
  const [camionOptions, setCamionOptions] = useState([]);
  const [camionId, setCamionId] = useState('');
  const [typeProduitId, setTypeProduitId] = useState('');
  const [typeProduitOptions, setTypeProduitOptions] = useState([]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const lieux = ['Kribi', 'Foumban']

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      numero_bordereau: numeroBordereau,
      numero_bon_commande: numeroBonCommande,
      date: date,
      lieu: lieu,
      poids_camion_charge: poidsCamionCharge,
      poids_camion_vide: poidsCamionVide,
      operateur: operateur,
      chauffeur_id: chauffeurId,
      camion_id: camionId,
      type_produit_id: typeProduitId,
    };
    const token = Cookies.get('jwt')
    axios
      .post(`${serverUrl}/api/chargement/addchargement`, data, {
        headers: {
          Authorization: `Bearer ${token}` // Ajoute le token dans l'en-tête Authorization de la requête
        }
      })
      .then((response) => {
        console.log(response.data); // Server response
        toast.success('Chargement added successfully');
        setNumeroBordereau('');
        setNumeroBonCommande('');
        setDate('');
        setLieu('');
        setPoidsCamionCharge('');
        setPoidsCamionVide('');
        setOperateur('');
        setChauffeurId('');
        setCamionId('');
        setTypeProduitId('');
      })
      .catch((error) => {
        console.error(error);
        toast.error(error);
      });
  };

  useEffect(() => {
    // Fetch chauffeur data from the server
    getChauffeurs()
      .then((el) => {
        setChauffeurOptions(el);
      })
      .catch((error) => {
        console.error(error);
        // Handle error if needed
      });
  }, []);

  useEffect(() => {
    // Fetch camion data from the server
    getCamions()
      .then((el) => {
        setCamionOptions(el);
      })
      .catch((error) => {
        console.error(error);
        // Handle error if needed
      });
  }, []);

  useEffect(() => {
    // Fetch camion data from the server
    getProduits()
      .then((el) => {
        setTypeProduitOptions(el);
      })
      .catch((error) => {
        console.error(error);
        // Handle error if needed
      });
  }, []);

  const handleDatePickerClick = () => {
    setShowDatePicker(true);
  };

  const handleDatePickerChange = (selectedDate) => {
    setDate(selectedDate);
    setShowDatePicker(false);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <Typography component="h1" variant="h5">
          Add Chargement
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="numero_bordereau"
            label="Numero Bordereau"
            name="numero_bordereau"
            autoFocus
            value={numeroBordereau}
            onChange={(e) => setNumeroBordereau(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="numero_bon_commande"
            label="Numero Bon Commande"
            id="numero_bon_commande"
            value={numeroBonCommande}
            onChange={(e) => setNumeroBonCommande(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="date"
            label="Date"
            id="date"
            value={date}
            InputProps={{
              readOnly: true,
            }}
          />
          <div className="wrapper">
            {showDatePicker ? (
              <DatePicker
                selected={date}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                onChange={handleDatePickerChange}
                placeholderText="Date"
                inline
              />
            ) : (
              <Button variant="contained" color="primary" onClick={handleDatePickerClick}>
                Selectionner
              </Button>
            )}
          </div>
          <InputLabel id="lieuId-label">Lieu</InputLabel>
            <Select
              labelId="LieuId-label"
              id="lieuId"
              value={lieu}
              onChange={(e) => setLieu(e.target.value)}
              fullWidth
            >
              {lieux.map((r) => (
                <MenuItem key={r} value={r}>
                  {r}
                </MenuItem>
              ))}
            </Select>
          <TextField
            margin="normal"
            required
            fullWidth
            name="poids_camion_charge"
            label="Poids Camion Charge"
            id="poids_camion_charge"
            value={poidsCamionCharge}
            onChange={(e) => setPoidsCamionCharge(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="poids_camion_vide"
            label="Poids Camion Vide"
            id="poids_camion_vide"
            value={poidsCamionVide}
            onChange={(e) => setPoidsCamionVide(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="operateur"
            label="Operateur"
            id="operateur"
            value={operateur}
            onChange={(e) => setOperateur(e.target.value)}
          />
          <InputLabel id="chauffeurId-label">Chauffeur</InputLabel>
          <Select
            labelId="chauffeurId-label"
            id="chauffeurId"
            value={chauffeurId}
            onChange={(e) => setChauffeurId(e.target.value)}
            fullWidth
          >
            {chauffeurOptions.map((chauffeur) => (
              <MenuItem key={chauffeur.id} value={chauffeur.id}>
                {chauffeur.nom}
              </MenuItem>
            ))}
          </Select>
          <InputLabel id="camionId-label">Camion</InputLabel>
          <Select
            labelId="camionId-label"
            id="camionId"
            value={camionId}
            onChange={(e) => setCamionId(e.target.value)}
            fullWidth
          >
            {camionOptions.map((camion) => (
              <MenuItem key={camion.id} value={camion.id}>
                {camion.immatriculation}
              </MenuItem>
            ))}
          </Select>
          <InputLabel id="typeProduitId-label">Type Produit</InputLabel>
          <Select
            labelId="typeProduitId-label"
            id="typeProduitId"
            value={typeProduitId}
            onChange={(e) => setTypeProduitId(e.target.value)}
            fullWidth
          >
            {typeProduitOptions.map((typeProduit) => (
              <MenuItem key={typeProduit.id} value={typeProduit.id}>
                {typeProduit.nom}
              </MenuItem>
            ))}
          </Select>
          <Button type="submit" fullWidth variant="contained" color="primary">
            Ajouter
          </Button>
        </form>
      </Container>
    </ThemeProvider>
  );
};

export default AddChargement;
