import { BankOutlined } from '@ant-design/icons';
import Home from 'modules/home';
import FacilityAdd from 'modules/facility-add';
import FacilityList from 'modules/facility-list';
// import Linking from 'modules/linking';
// import ICevents from 'assets/icons/ic-events.svg';

// import DashboardIcon from 'assets/icons/dashboard.svg';

export default [
  {
    sidebarIndex: 1,
    label: 'Facilities',
    // icon: VideoCameraOutlined,
    children: [
      {
        label: 'Profiles',
        path: '/facility/list',
        exact: true,
        // icon: VideoCameraOutlined,
        component: FacilityList
      },
      {
        label: '',
        path: '/facility/add',
        exact: true,
        // icon: VideoCameraOutlined,
        component: FacilityAdd
      },
      {
        label: '',
        path: '/facility/edit/:facilityId',
        // icon: VideoCameraOutlined,
        component: FacilityAdd
      }
      // {
      //   label: 'Linking',
      //   path: '/facility/linking',
      //   exact: true,
      //   // icon: VideoCameraOutlined,
      //   component: Linking
      // }
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
