// assets
import {
  AppstoreAddOutlined,
  AntDesignOutlined,
  BarcodeOutlined,
  ApartmentOutlined,
  FontSizeOutlined,
  LoadingOutlined,
  DropboxOutlined,
  UserOutlined,
  PicRightOutlined
} from '@ant-design/icons';

// icons
const icons = {
  FontSizeOutlined,
  ApartmentOutlined,
  BarcodeOutlined,
  AntDesignOutlined,
  LoadingOutlined,
  AppstoreAddOutlined,
  DropboxOutlined,
  UserOutlined,
  PicRightOutlined
};

// ==============================|| MENU ITEMS - UTILITIES ||============================== //
ApartmentOutlined;
const utilities = {
  id: 'utilities',
  title: 'Cadastro',
  type: 'group',
  children: [
    {
      id: 'util-stock',
      title: 'Fazenda',
      type: 'item',
      url: '/lista-estoque',
      icon: icons.DropboxOutlined
    },
    {
      id: 'util-sub-stock',
      title: 'Estoque',
      type: 'item',
      url: '/lista-sub-estoque',
      icon: icons.PicRightOutlined
    },
    {
      id: 'util-category',
      title: 'Categoria',
      type: 'item',
      url: '/lista-categoria',
      icon: icons.ApartmentOutlined
    },
    {
      id: 'util-produto',
      title: 'Produto',
      type: 'item',
      url: '/lista-produto',
      icon: icons.BarcodeOutlined
    },
    {
      id: 'util-solicitante',
      title: 'Solicitante',
      type: 'item',
      url: '/lista-solicitante',
      icon: icons.UserOutlined
    },
    {
      id: 'util-usuario',
      title: 'Usuário',
      type: 'item',
      url: '/lista-usuario',
      icon: icons.UserOutlined
    }
  ]
};

export default utilities;
