// component
import SvgColor from '../../../component/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'Tableau de bord',
    path: '/dashboard/app',
    icon: icon('ic_analytics'),
  },
  {
    title: 'Chargements',
    path: '/dashboard/chargement',
    icon: icon('ic_blog'),
  },
  {
    title: 'Dechargements',
    path: '/dashboard/dechargement',
    icon: icon('ic_blog'),
  },
  {
    title: 'Propriétaires',
    path: '/dashboard/proprio',
    icon: icon('ic_user'),
  },
  {
    title: 'Chauffeurs',
    path: '/dashboard/chauffeur',
    icon: icon('ic_user'),
  },
  {
    title: 'Camions',
    path: '/dashboard/camion',
    icon: icon('ic_user'),
  },
  {
    title: 'Produits',
    path: '/dashboard/produit',
    icon: icon('ic_user'),
  },
  
  {
    title: 'Deconnexion',
    path: '/logout',
    icon: icon('ic_lock'),
  },
];

export default navConfig;