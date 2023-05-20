import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
// routes
import Router from './routes';
// theme
import ThemeProvider from './theme';
// component
import { StyledChart } from './component/chart';
import ScrollToTop from './component/scroll-to-top';


import AddChargement from "./component/chargement/AddChargement";
import GetChargements from "./component/chargement/GetChargements";

import AddDechargement from "./component/dechargement/Adddechargement";
import GetDechargements from "./component/dechargement/GetDechargements";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}  />
        <Route path="/addproprio" element={<AddProprio />}  />
        <Route path="/getproprios" element={<GetProprios />}  />
        <Route path="/addchauffeur" element={<AddChauffeur />}  />
        <Route path="/getchauffeurs" element={<GetChauffeurs />}  />
        <Route path="/addcamion" element={<AddCamion />}  />
        <Route path="/getcamions" element={<GetCamions />}  />
        <Route path="/addproduit" element={<AddProduit />}  />
        <Route path="/getproduits" element={<GetProduits />}  />

        <Route path="/addchargement" element={<AddChargement />}  />
        <Route path="/getchargements" element={<GetChargements />}  />

        <Route path="/adddechargement" element={<AddDechargement />}  />
        <Route path="/getdechargements" element={<GetDechargements />}  />


      </Routes>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </BrowserRouter>
=======
// ----------------------------------------------------------------------

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <ThemeProvider>
          <ScrollToTop />
          <StyledChart />
          <Router />
        </ThemeProvider>
      </BrowserRouter>
    </HelmetProvider>
>>>>>>> addingTemplate
  );
}
