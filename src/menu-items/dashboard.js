// assets
import { DashboardOutlined, BarChartOutlined, HomeOutlined } from '@ant-design/icons';

// icons
const icons = {
  DashboardOutlined,
  BarChartOutlined,
  HomeOutlined
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const dashboard = {
  id: 'group-dashboard',
  title: 'Navegação',
  type: 'group',
  children: [
    {
      id: 'relatorios',
      title: 'Tela Inicial',
      type: 'item',
      url: '/dashboard/default',
      icon: icons.HomeOutlined,
      breadcrumbs: false
    }
  ]
};

export default dashboard;
