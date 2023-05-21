import { Navigate, useRoutes } from 'react-router-dom';

// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//
import BlogPage from './pages/BlogPage';
import UserPage from './pages/UserPage';
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import ProductsPage from './pages/ProductsPage';
import DashboardAppPage from './pages/DashboardAppPage';
import ProprioPage from './pages/ProprioPage';
import AjoutProprioPage from './pages/AjoutProprioPage';
import ChauffeurPage from './pages/ChauffeurPage';
import AjoutChauffeurPage from './pages/AjoutChauffeurPage';
import ProduitPage from './pages/ProduitPage';
import AjoutProduitPage from './pages/AjoutProduitPage';
import CamionPage from './pages/CamionPage';
import AjoutCamionPage from './pages/AjoutCamionPage';
import ChargementPage from './pages/ChargementPage';
import AjoutChargementPage from './pages/AjoutChargementPage';
import DechargementPage from './pages/DechargementPage';
import AjoutDechargementPage from './pages/AjoutDechargementPage';
import AjoutUtilisateur from './component/AddUser'
import { getCurrentUserRole } from './utils/User';

export default function Router() {
  const currentUserRole = getCurrentUserRole(); // Get the current user's role (e.g., from authentication context or state)

  const routes = useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: 'app', element: <DashboardAppPage /> },
        { path: 'user', element: <UserPage /> },
        { path: 'proprio', element: <ProprioPage /> },
        { path: 'ajoutproprio', element: <AjoutProprioPage /> },
        { path: 'chauffeur', element: <ChauffeurPage /> },
        { path: 'ajoutchauffeur', element: <AjoutChauffeurPage /> },
        { path: 'produit', element: <ProduitPage /> },
        { path: 'ajoutproduit', element: <AjoutProduitPage /> },
        { path: 'camion', element: <CamionPage /> },
        { path: 'ajoutcamion', element: <AjoutCamionPage /> },
        { path: 'chargement', element: <ChargementPage /> },
        { path: 'ajoutchargement', element: <AjoutChargementPage /> },
        { path: 'dechargement', element: <DechargementPage /> },
        { path: 'ajoutdechargement', element: <AjoutDechargementPage /> },
        { path: 'ajoututilisateur', element: <AjoutUtilisateur /> },
      ].filter((route) => {
        // Filter the routes based on the user's role
        if (currentUserRole === 'admin') {
          // Admin can access all routes
          return true;
        } else if (currentUserRole === 'secretaire') {
          // Secretaire can access the following routes
          return ['dashboard','produit', 'ajoutproduit','proprio', 'ajoutproprio', 'chauffeur', 'ajoutcamion', 'camion', 'ajoutchauffeur'].includes(route.path);
        } else if (currentUserRole === 'chargeur') {
          // Chargeur can access the following route
          return ['dasboard', 'chargement', 'ajoutchargement'].includes(route.path);
        } else if (currentUserRole === 'dechargeur') {
          // Dechargeur can access the following route
          return ['dashboard', 'dechargement', 'ajoutdechargement'].includes(route.path);
        }
        return false; // Default: deny access to all other routes
      }),
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
