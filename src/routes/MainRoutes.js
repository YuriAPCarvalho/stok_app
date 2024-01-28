import { lazy } from 'react';

// Componentes Loadable para páginas
import Loadable from 'components/Loadable';

// Layout principal
import MainLayout from 'layout/MainLayout';

// Componentes de páginas
import ItemsInputList from 'pages/extra-pages/ItemsInputList';
import OutputItemsList from 'pages/extra-pages/OutputItemsList';
import ReturnItensList from 'pages/extra-pages/ReturnItensList';

import { PrivateRoutes } from './privateRoutes';

// Páginas do Dashboard
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard')));

// Componentes de páginas para estoque, categoria, produto, etc.
const ItemsInput = Loadable(lazy(() => import('pages/extra-pages/ItemsInput')));
const StockList = Loadable(lazy(() => import('pages/extra-pages/StockList')));
const ListCategory = Loadable(lazy(() => import('pages/extra-pages/ListCategory')));
const ProductList = Loadable(lazy(() => import('pages/extra-pages/ProductList')));
const RequesterList = Loadable(lazy(() => import('pages/extra-pages/RequesterList')));
const UserList = Loadable(lazy(() => import('pages/extra-pages/UserList')));

// Componentes de utilitários
const RegisterStock = Loadable(lazy(() => import('pages/components-overview/RegisterStock')));
const RegisterCategory = Loadable(lazy(() => import('pages/components-overview/RegisterCategory')));
const RegisterRequester = Loadable(lazy(() => import('pages/components-overview/RegisterRequester')));
const RegisterProduct = Loadable(lazy(() => import('pages/components-overview/RegisterProduct')));
const RegisterUser = Loadable(lazy(() => import('pages/components-overview/RegisterUser')));
const ReturnItens = Loadable(lazy(() => import('pages/components-overview/ReturnItens')));
const Inventory = Loadable(lazy(() => import('pages/components-overview/Inventory')));
const OutputItems = Loadable(lazy(() => import('pages/components-overview/OutputItems')));
const AntIcons = Loadable(lazy(() => import('pages/components-overview/AntIcons')));

// Rotas principais
const MainRoutes = {
  path: '/',
  element: (
    <PrivateRoutes>
      <MainLayout />
    </PrivateRoutes>
  ),
  children: [
    {
      path: '/',
      element: (
        <PrivateRoutes>
          <DashboardDefault />
        </PrivateRoutes>
      )
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'default',
          element: (
            <PrivateRoutes>
              <DashboardDefault />
            </PrivateRoutes>
          )
        }
      ]
    },
    {
      path: 'lista-estoque',
      element: (
        <PrivateRoutes>
          <StockList />
        </PrivateRoutes>
      )
    },
    {
      path: 'cadastro-estoque',
      element: (
        <PrivateRoutes>
          <RegisterStock />
        </PrivateRoutes>
      )
    },
    {
      path: 'cadastro-estoque/:id',
      element: (
        <PrivateRoutes>
          <RegisterStock />
        </PrivateRoutes>
      )
    },
    {
      path: 'lista-categoria',
      element: (
        <PrivateRoutes>
          <ListCategory />
        </PrivateRoutes>
      )
    },
    {
      path: 'cadastro-categoria',
      element: (
        <PrivateRoutes>
          <RegisterCategory />
        </PrivateRoutes>
      )
    },
    {
      path: 'cadastro-categoria/:id',
      element: (
        <PrivateRoutes>
          <RegisterCategory />
        </PrivateRoutes>
      )
    },
    {
      path: 'lista-produto',
      element: (
        <PrivateRoutes>
          <ProductList />
        </PrivateRoutes>
      )
    },
    {
      path: 'cadastro-produto',
      element: (
        <PrivateRoutes>
          <RegisterProduct />
        </PrivateRoutes>
      )
    },
    {
      path: 'cadastro-produto/:id',
      element: (
        <PrivateRoutes>
          <RegisterProduct />
        </PrivateRoutes>
      )
    },
    {
      path: 'lista-solicitante',
      element: (
        <PrivateRoutes>
          <RequesterList />
        </PrivateRoutes>
      )
    },
    {
      path: 'cadastro-solicitante',
      element: (
        <PrivateRoutes>
          <RegisterRequester />
        </PrivateRoutes>
      )
    },
    {
      path: 'cadastro-solicitante/:id',
      element: (
        <PrivateRoutes>
          <RegisterRequester />
        </PrivateRoutes>
      )
    },
    {
      path: 'lista-usuario',
      element: (
        <PrivateRoutes>
          <UserList />
        </PrivateRoutes>
      )
    },
    {
      path: 'cadastro-usuario',
      element: (
        <PrivateRoutes>
          <RegisterUser />
        </PrivateRoutes>
      )
    },
    {
      path: 'cadastro-usuario/:id',
      element: (
        <PrivateRoutes>
          <RegisterUser />
        </PrivateRoutes>
      )
    },
    {
      path: 'icons/ant',
      element: (
        <PrivateRoutes>
          <AntIcons />
        </PrivateRoutes>
      )
    },
    {
      path: 'lista-entrada-itens',
      element: (
        <PrivateRoutes>
          <ItemsInputList />
        </PrivateRoutes>
      )
    },
    {
      path: 'entrada-itens',
      element: (
        <PrivateRoutes>
          <ItemsInput />
        </PrivateRoutes>
      )
    },
    {
      path: 'entrada-itens/:id',
      element: (
        <PrivateRoutes>
          <ItemsInput />
        </PrivateRoutes>
      )
    },
    {
      path: 'lista-saida-itens',
      element: (
        <PrivateRoutes>
          <OutputItemsList />
        </PrivateRoutes>
      )
    },
    {
      path: 'saida-itens',
      element: (
        <PrivateRoutes>
          <OutputItems />
        </PrivateRoutes>
      )
    },
    {
      path: 'saida-itens/:id',
      element: (
        <PrivateRoutes>
          <OutputItems />
        </PrivateRoutes>
      )
    },
    {
      path: 'lista-sub-estoque',
      element: (
        <PrivateRoutes>
          <ReturnItensList />
        </PrivateRoutes>
      )
    },
    {
      path: 'sub-estoque',
      element: (
        <PrivateRoutes>
          <ReturnItens />
        </PrivateRoutes>
      )
    },
    {
      path: 'sub-estoque/:id',
      element: (
        <PrivateRoutes>
          <ReturnItens />
        </PrivateRoutes>
      )
    },
    {
      path: 'inventario',
      element: (
        <PrivateRoutes>
          <Inventory />
        </PrivateRoutes>
      )
    }
  ]
};

export default MainRoutes;
