import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import MainLayout from 'layout/MainLayout';
import ProtectedRoute from './ProtectedRoute';

// render - dashboard
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard')));

// render - stocks
const Stocks = Loadable(lazy(() => import('../pages/stocks')));

//render -stock-details

const StockDetails = Loadable(lazy(() => import('../pages/stock-detail')));

// render - news
const News = Loadable(lazy(() => import('../pages/news')));

//profile
const ProfileDetails = Loadable(lazy(() => import('../pages/profile/profile-details-page')));

// render - sample page
const SamplePage = Loadable(lazy(() => import('pages/extra-pages/SamplePage')));

// render - utilities
const Typography = Loadable(lazy(() => import('pages/components-overview/Typography')));
const Color = Loadable(lazy(() => import('pages/components-overview/Color')));
const Shadow = Loadable(lazy(() => import('pages/components-overview/Shadow')));
const AntIcons = Loadable(lazy(() => import('pages/components-overview/AntIcons')));

//errors
const Unauthenticated = Loadable(lazy(() => import('pages/error/Unauthenticated')));
const Unauthorized = Loadable(lazy(() => import('pages/error/Unauthorized')));

// ==============================|| MAIN ROUTING ||============================== //

const roles = {
  USER: 'user'
};

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/',
      element: <Stocks />,
      children: [
        {
          path: 'stocks',
          element: <Stocks />
        }
      ]
    },
    {
      element: <ProtectedRoute />,
      children: [
        {
          path: 'profile',
          element: <ProfileDetails role={roles.USER} />
        }
      ]
    },
    {
      path: 'color',
      element: <Color />
    },
    {
      path: 'stock/:id',
      element: <StockDetails />
    },
    {
      path: 'news/:id',
      element: <News />
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'default',
          element: <DashboardDefault />
        }
      ]
    },
    {
      path: 'sample-page',
      element: <SamplePage />
    },
    {
      path: 'shadow',
      element: <Shadow />
    },
    {
      path: 'typography',
      element: <Typography />
    },
    {
      path: 'icons/ant',
      element: <AntIcons />
    },
    {
      path: 'unauthenticated',
      element: <Unauthenticated />
    },
    {
      path: 'unauthorized',
      element: <Unauthorized />
    }
  ]
};

export default MainRoutes;
