import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';

// sections
import {

  AppWidgetSummary,

} from '../sections/@dashboard/app';
import { getProprios } from '../component/proprios/proprio.js';
import { getCamions } from '../component/camion/camion.js';
import { getChauffeurs } from '../component/chauffeur/chauffeur.js';
import { getProduits } from '../component/produit/produit.js';
import { getChargements } from '../component/chargement/chargement.js';
import { getDechargements } from '../component/dechargement/dechargement.js';
// ----------------------------------------------------------------------

export default function DashboardAppPage() {
  //const theme = useTheme();
  const [proPrioNber, setProprioNber] = useState(0)
  const [camionNber, setCamionNber] = useState(0)
  const [chauffeurNber, setChauffeurNber] = useState(0)
  const [chargementNber, setChargementNber] = useState(0)
  const [dechargementNber, setDechargementNber] = useState(0)
  const [produitNber, setProduitNber] = useState(0)

  useEffect(() => {
    // Fetch proprio data from the server
    getProprios()
      .then((proprios) => {
        const numberOfProprios = proprios.length; // Get the number of proprio
        setProprioNber(numberOfProprios);
      })
      .catch((error) => {
        console.error(error);
        // Handle error if needed
      });

    //getting the camions
    getCamions()
      .then((c) => {
        const nc = c.length; // Get the number of proprio
        setCamionNber(nc);
      })
      .catch((error) => {
        console.error(error);
        // Handle error if needed
      });

      //getting the chauffeur
      getChauffeurs()
      .then((ch) => {
        const nch = ch.length; // Get the number of proprio
        setChauffeurNber(nch);
      })
      .catch((error) => {
        console.error(error);
        // Handle error if needed
      });

      //getting the produit
      getProduits()
      .then((p) => {
        const pn = p.length; // Get the number of proprio
        setProduitNber(pn);
      })
      .catch((error) => {
        console.error(error);
        // Handle error if needed
      });


      //getting the chargements
      getChargements()
      .then((ch) => {
        const chn = ch.length; // Get the number of proprio
        setChargementNber(chn);
      })
      .catch((error) => {
        console.error(error);
        // Handle error if needed
      });

      //getting the dechargements
      getDechargements()
      .then((d) => {
        const dn = d.length; // Get the number of proprio
        setDechargementNber(dn);
      })
      .catch((error) => {
        console.error(error);
        // Handle error if needed
      });

  }, []);

  return (
    <>
      <Helmet>
        <title> Dashboard | Minimal UI </title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Hi, Welcome back
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Chargements" total={chargementNber} icon={'ant-design:android-filled'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Dechargements" total={dechargementNber} color="info" icon={'ant-design:apple-filled'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Propritétaire" total={proPrioNber} color="warning" icon={'ant-design:idcard-filled'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Camions" total={camionNber} color="error" icon={'ant-design:car-filled'} />
          </Grid>  

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Chauffeurs" total={chauffeurNber} color="error" icon={'ant-design:bug-filled'} />
          </Grid> 

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Produits" total={produitNber} color="error" icon={'ant-design:bug-filled'} />
          </Grid>        
        </Grid>
      </Container>
    </>
  );
}
