// assets
import { EditOutlined, RedoOutlined, AlignCenterOutlined, FormOutlined } from '@ant-design/icons';

// icons
const icons = {
  EditOutlined,
  RedoOutlined,
  AlignCenterOutlined,
  FormOutlined
};

// ==============================|| MENU ITEMS - SAMPLE PAGE & DOCUMENTATION ||============================== //

const support = {
  id: 'support',
  title: 'Negócio',
  type: 'group',
  children: [
    {
      id: 'sample-page',
      title: 'Entrada de Itens',
      type: 'item',
      url: '/lista-entrada-itens',
      icon: icons.EditOutlined
    },
    {
      id: 'saida',
      title: 'Saída de Itens',
      type: 'item',
      url: '/lista-saida-itens',
      icon: icons.RedoOutlined
    },
    {
      id: 'inventario',
      title: 'Inventário',
      type: 'item',
      url: '/inventario',
      icon: icons.FormOutlined
    }
  ]
};

export default support;
