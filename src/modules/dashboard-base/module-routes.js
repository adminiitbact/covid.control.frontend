import { VideoCameraOutlined } from '@ant-design/icons';

import Home from 'modules/home';

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
        label: 'Add',
        path: '/facilities/add',
        icon: VideoCameraOutlined,
        component: Home
      }
    ]
  }
];
