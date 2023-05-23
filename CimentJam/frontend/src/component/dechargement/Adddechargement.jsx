import React, { useState } from 'react';
import {
  Button,
  TextField,
  Typography,
  Container,
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { toast } from 'react-toastify';
import axios from 'axios';
import { serverUrl } from '../../server';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const defaultTheme = createTheme();

const AddDechargement = () => {
  const [numeroBordereau, setNumeroBordereau] = useState('');
  const [numeroBonCommande, setNumeroBonCommande] = useState('');
  const [etatCamion, setEtatCamion] = useState('');
  const [date, setDate] = useState('');
  const [lieuDechargement, setLieuDechargement] = useState('');
  const [poidsCamionDecharge, setPoidsCamionDecharge] = useState('');
  const [poidsCamionApresChargement, setPoidsCamionApresChargement] = useState('');
  const [shift1, setShift1] = useState('');
  const [shift2, setShift2] = useState('');
  const [chargementId, setChargementId] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      numero_bordereau: numeroBordereau,
      numero_bon_commande: numeroBonCommande,
      etat_camion: etatCamion,
      date: date,
      lieu_dechargement: lieuDechargement,
      poids_camion_decharge: poidsCamionDecharge,
      poids_camion_apres_chargement: poidsCamionApresChargement,
      shift1: shift1,
      shift2: shift2,
      chargement_id: chargementId,
    };

    axios
      .post(`${serverUrl}/api/dechargement/adddechargement`, data)
      .then((response) => {
        console.log(response.data); // Server response
        toast.success('Dechargement added successfully');
        resetForm();
      })
      .catch((error) => {
        console.error(error);
        toast.error('Failed to add dechargement');
      });
  };

  const resetForm = () => {
    setNumeroBordereau('');
    setNumeroBonCommande('');
    setEtatCamion('');
    setDate('');
    setLieuDechargement('');
    setPoidsCamionDecharge('');
    setPoidsCamionApresChargement('');
    setShift1('');
    setShift2('');
    setChargementId('');
  };

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
          Ajouter Dechargement
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
            name="etat_camion"
            label="Etat Camion"
            id="etat_camion"
            value={etatCamion}
            onChange={(e) => setEtatCamion(e.target.value)}
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
                inline
              />
            ) : (
              <Button variant="contained" color="primary" onClick={handleDatePickerClick}>
                Selectionner
              </Button>
            )}
          </div>
          <TextField
            margin="normal"
            required
            fullWidth
            name="lieu_dechargement"
            label="Lieu Dechargement"
            id="lieu_dechargement"
            value={lieuDechargement}
            onChange={(e) => setLieuDechargement(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="poids_camion_decharge"
            label="Poids Camion Decharge"
            id="poids_camion_decharge"
            value={poidsCamionDecharge}
            onChange={(e) => setPoidsCamionDecharge(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="poids_camion_apres_chargement"
            label="Poids Camion Apres Chargement"
            id="poids_camion_apres_chargement"
            value={poidsCamionApresChargement}
            onChange={(e) => setPoidsCamionApresChargement(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="shift1"
            label="Shift 1"
            id="shift1"
            value={shift1}
            onChange={(e) => setShift1(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="shift2"
            label="Shift 2"
            id="shift2"
            value={shift2}
            onChange={(e) => setShift2(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="chargement_id"
            label="Chargement ID"
            id="chargement_id"
            value={chargementId}
            onChange={(e) => setChargementId(e.target.value)}
          />
          <Button type="submit" fullWidth variant="contained" color="primary">
            Ajouter
          </Button>
        </form>
      </Container>
    </ThemeProvider>
  );
};

export default AddDechargement;
