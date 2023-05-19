import React, { useState } from 'react';
import { Button, TextField, Typography, Container } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { toast } from 'react-toastify';
import axios from 'axios';
import { serverUrl } from '../../server';

const defaultTheme = createTheme();

const AddProduit = () => {
  const [type, setType] = useState('');
  const [nom, setNom] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      type: type,
      nom: nom,
    };

    axios
      .post(`${serverUrl}/addproduit`, data)
      .then((response) => {
        console.log(response.data); // Server response
        toast.success('Produit added successfully');
        setType('');
        setNom('');
      })
      .catch((error) => {
        console.error(error);
        toast.error(error);
      });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <Typography component="h1" variant="h5">
          Add Produit
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="type"
            label="Type"
            name="type"
            autoFocus
            value={type}
            onChange={(e) => setType(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="nom"
            label="Nom"
            id="nom"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
          />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Add
          </Button>
        </form>
      </Container>
    </ThemeProvider>
  );
};

export default AddProduit;
