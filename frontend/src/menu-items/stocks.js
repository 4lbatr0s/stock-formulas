// assets
import { LoginOutlined, ProfileOutlined, StockOutlined} from '@ant-design/icons';

// icons
const icons = {
  LoginOutlined,
  ProfileOutlined,
  StockOutlined,
};

// ==============================|| MENU ITEMS - EXTRA PAGES ||============================== //

const pages = {
  id: 'stocks',
  title: 'Stocks',
  type: 'group',
  children: [
    {
      id: 'stocks',
      title: 'Stocks',
      type: 'item',
      url: '/stocks',
      icon: icons.StockOutlined,
      target: true
    }
  ]
};

export default pages;
