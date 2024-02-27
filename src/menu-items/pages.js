// assets
import { LoginOutlined, ProfileOutlined, FileJpgOutlined } from '@ant-design/icons';

// icons
const icons = {
  LoginOutlined,
  ProfileOutlined,
  FileJpgOutlined
};

// ==============================|| MENU ITEMS - EXTRA PAGES ||============================== //

const pages = {
  id: 'authentication',
  title: 'Relatórios',
  type: 'group',
  children: [
    {
      id: 'relatorio',
      title: 'Saldo de Estoque',
      type: 'item',
      url: '/relatorio',
      icon: icons.FileJpgOutlined
    }
  ]
};

export default pages;
