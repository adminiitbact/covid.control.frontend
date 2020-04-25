import { VideoCameraOutlined } from '@ant-design/icons';

import Home from 'modules/home';
import FacilityAdd from 'modules/facility-add';

export default [
  {
    label: 'Dashboard',
    path: '/',
    icon: VideoCameraOutlined,
    component: Home
  },
  {
    label: 'Facilities',
    icon: VideoCameraOutlined,
    children: [
      {
        label: 'New',
        path: '/facilities/add',
        icon: VideoCameraOutlined,
        component: FacilityAdd
      }
    ]
  }
];
