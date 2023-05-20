import React from 'react';
import { Helmet } from 'react-helmet-async';
import {
  Card,
  Stack,
  Button,
  Container,
  Typography,
} from '@mui/material';
import { Link } from 'react-router-dom';
import Iconify from '../component/iconify';
import Scrollbar from '../component/scrollbar';
import GetCamions from '../component/camion/GetCamions';

export default function CamionPage() {
  return (
    <>
      <Helmet>
        <title>Camions</title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Camions
          </Typography>
          <Button component={Link} to="/dashboard/ajoutcamion" variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
            Nouveau
          </Button>
        </Stack>

        <Card>
          <Scrollbar>
            <GetCamions />
          </Scrollbar>
        </Card>
      </Container>
    </>
  );
}
