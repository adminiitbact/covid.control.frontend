import { BankOutlined } from '@ant-design/icons';
import Home from 'modules/home';
import FacilityAdd from 'modules/facility-add';

// import ICevents from 'assets/icons/ic-events.svg';

// import DashboardIcon from 'assets/icons/dashboard.svg';

export default [
  {
    sidebarIndex: 1,
    label: 'Facilities',
    // icon: VideoCameraOutlined,
    children: [
      {
        label: 'New',
        path: '/facilities/add',
        // icon: VideoCameraOutlined,
        component: FacilityAdd
      }
    ]
  },
  {
    sidebarIndex: 0,
    label: 'Dashboard',
    path: '/',
    icon: BankOutlined,
    component: Home
  }
];
