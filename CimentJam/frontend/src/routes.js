import { Navigate, useRoutes } from 'react-router-dom';
import { useContext } from 'react';
import { RoleContext } from './RoleContext'; // Import the RoleContext from App.js

// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//
import UserPage from './pages/UserPage';
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import DashboardAppPage from './pages/DashboardAppPage';
import ProprioPage from './pages/ProprioPage';
import AjoutProprioPage from './pages/AjoutProprioPage';
import ChauffeurPage from './pages/ChauffeurPage';
import AjoutChauffeurPage from './pages/AjoutChauffeurPage';
import OperateurPage from './pages/OperateurPage';
import AjoutOperateurPage from './pages/AjoutOperateurPage';
import ProduitPage from './pages/ProduitPage';
import AjoutProduitPage from './pages/AjoutProduitPage';
import CamionPage from './pages/CamionPage';
import AjoutCamionPage from './pages/AjoutCamionPage';
import ChargementPage from './pages/ChargementPage';
import AjoutChargementPage from './pages/AjoutChargementPage';
import DechargementPage from './pages/DechargementPage';
import AjoutDechargementPage from './pages/AjoutDechargementPage';
import AjoutUtilisateur from './component/AddUser';
import GetUsers from './component/user/GetUsers';

export default function Router() {
  const userRole = useContext(RoleContext); // Access the userRole from the RoleContext

  const routes = useRoutes([
    {
      path: '/dashboard',
      element: userRole ? <DashboardLayout /> : <Navigate to="/login" />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: 'app', element:  (userRole === 'admin' || userRole === 'secretaire') ? <DashboardAppPage /> : <Navigate to="/404" /> },
        { path: 'user', element: (userRole === 'admin' || userRole === 'secretaire') ? <UserPage /> : <Navigate to="/404" />},
        { path: 'proprio', element: (userRole === 'admin' || userRole === 'secretaire') ?<ProprioPage />: <Navigate to="/404" /> },
        { path: 'ajoutproprio', element: (userRole === 'admin' || userRole === 'secretaire') ? <AjoutProprioPage /> : <Navigate to="/404" /> },
        { path: 'chauffeur', element: (userRole === 'admin' || userRole === 'secretaire') ? <ChauffeurPage /> : <Navigate to="/404" />},
        { path: 'ajoutchauffeur', element: (userRole === 'admin' || userRole === 'secretaire') ? <AjoutChauffeurPage /> : <Navigate to="/404" /> },
        { path: 'operateur', element: (userRole === 'admin' || userRole === 'secretaire') ? <OperateurPage /> : <Navigate to="/404" />},
        { path: 'ajoutoperateur', element: (userRole === 'admin' || userRole === 'secretaire') ? <AjoutOperateurPage /> : <Navigate to="/404" /> },
        { path: 'produit', element: (userRole === 'admin' || userRole === 'secretaire') ? <ProduitPage /> : <Navigate to="/404" />},
        { path: 'ajoutproduit', element: (userRole === 'admin' || userRole === 'secretaire') ? <AjoutProduitPage /> : <Navigate to="/404" />},
        { path: 'camion', element: (userRole === 'admin' || userRole === 'secretaire') ?<CamionPage />  : <Navigate to="/404" />},
        { path: 'ajoutcamion', element:  (userRole === 'admin' || userRole === 'secretaire')?<AjoutCamionPage /> : <Navigate to="/404" />},
        { path: 'chargement', element: (userRole === 'admin' || userRole === 'chargeur')?<ChargementPage />: <Navigate to="/404" /> },
        { path: 'ajoutchargement', element: (userRole === 'admin' || userRole === 'admin' || userRole === 'chargeur') ? <AjoutChargementPage /> : <Navigate to="/404" />},
        { path: 'dechargement', element: (userRole === 'admin' || userRole === 'dechargeur') ? <DechargementPage /> : <Navigate to="/404" />},
        { path: 'ajoutdechargement', element: (userRole === 'admin' || userRole === 'dechargeur') ? <AjoutDechargementPage /> : <Navigate to="/404" />},
        { path: 'ajoututilisateur', element: userRole === 'admin' ? <AjoutUtilisateur /> : <Navigate to="/404" />},
        { path: 'utilisateur', element: userRole === 'admin' ? <GetUsers /> : <Navigate to="/404" />}
      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
