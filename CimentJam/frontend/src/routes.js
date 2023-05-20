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

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: 'app', element: <DashboardAppPage /> },
        { path: 'user', element: <UserPage /> },
        { path: 'products', element: <ProductsPage /> },
        { path: 'blog', element: <BlogPage /> },
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
        { path: 'ajoutdechargement', element: <AjoutDechargementPage /> }
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