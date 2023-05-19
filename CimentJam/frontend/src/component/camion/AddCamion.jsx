import React, { useState } from 'react';
import { Button, TextField, Typography, Container, Select, MenuItem, InputLabel } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { toast } from 'react-toastify';
import axios from 'axios';
import { serverUrl } from '../../server';

const defaultTheme = createTheme();

const AddCamion = () => {
  const [immatriculation, setImmatriculation] = useState('');
  const [numeroBenne, setNumeroBenne] = useState('');
  const [poidsVide, setPoidsVide] = useState('');
  const [etat, setEtat] = useState('');
  const [miseEnCirculation, setMiseEnCirculation] = useState('');
  const [proprioId, setProprioId] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      immatriculation: immatriculation,
      numero_benne: numeroBenne,
      poids_vide: poidsVide,
      etat: etat,
      mise_en_circulation: miseEnCirculation,
      proprio_id: proprioId,
    };

    axios
      .post(`${serverUrl}/addcamion`, data)
      .then((response) => {
        console.log(response.data); // Server response
        toast.success('Camion added successfully');
        setImmatriculation('');
        setNumeroBenne('');
        setPoidsVide('');
        setEtat('');
        setMiseEnCirculation('');
        setProprioId('');
      })
      .catch((error) => {
        console.error(error);
        toast.error(error);
      });
  };

  // Example data for proprio select options
  const proprioOptions = [
    { id: 1, name: 'Proprio 1', cni: '123456' },
    { id: 2, name: 'Proprio 2', cni: '789012' },
    // Add more options as needed
  ];

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <Typography component="h1" variant="h5">
          Add Camion
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="immatriculation"
            label="Immatriculation"
            name="immatriculation"
            autoFocus
            value={immatriculation}
            onChange={(e) => setImmatriculation(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="numero_benne"
            label="Numéro Benne"
            id="numero_benne"
            value={numeroBenne}
            onChange={(e) => setNumeroBenne(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="poids_vide"
            label="Poids Vide"
            id="poids_vide"
            value={poidsVide}
            onChange={(e) => setPoidsVide(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="etat"
            label="État"
            id="etat"
            value={etat}
            onChange={(e) => setEtat(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="mise_en_circulation"
            label="Mise en circulation"
            id="mise_en_circulation"
            value={miseEnCirculation}
            onChange={(e) => setMiseEnCirculation(e.target.value)}
          />
          <InputLabel id="proprioId-label">Proprio</InputLabel>
          <Select
            labelId="proprioId-label"
            id="proprioId"
            value={proprioId}
            onChange={(e) => setProprioId(e.target.value)}
            fullWidth
          >
            {proprioOptions.map((proprio) => (
              <MenuItem key={proprio.id} value={proprio.id}>
                {proprio.name}
              </MenuItem>
            ))}
          </Select>
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Add
          </Button>
        </form>
      </Container>
    </ThemeProvider>
  );
};

export default AddCamion;
