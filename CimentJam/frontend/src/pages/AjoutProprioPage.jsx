import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import {
  Card,
  Stack,
  Button,
  Container,
  Typography,
} from '@mui/material';
import Iconify from '../component/iconify';
import Scrollbar from '../component/scrollbar';
import AddProprio from '../component/proprios/AddProprio';
import { Link } from 'react-router-dom';

export default function ProprioPage() {
  return (
    <>
      <Helmet>
        <title>Propriétaires des camions</title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Ajout d'un Propriétaire
          </Typography>
          <Button component={Link} to="/dashboard/proprio" variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
            Liste
          </Button>
        </Stack>

        <Card>
          <Scrollbar>
          <AddProprio />
          </Scrollbar>
        </Card>
      </Container>
    </>
  );
}
