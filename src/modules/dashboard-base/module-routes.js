import { BankOutlined } from '@ant-design/icons';
import Home from 'modules/home';
import FacilityAdd from 'modules/facility-add';
import FacilityList from 'modules/facility-list';
import FacilityEdit from 'modules/facility-edit';
import Profiles from 'modules/profiles';
import PatientDetailList from 'modules/patient-detail-list';
import Reports from 'modules/reports';
import LinkingIssues from 'modules/linking-issues';
import Management from 'modules/management';
// import ICevents from 'assets/icons/ic-events.svg';
// import DashboardIcon from 'assets/icons/dashboard.svg';

export default [
  {
    sidebarIndex: 1,
    label: 'Facilities',
    // icon: VideoCameraOutlined,
    children: [
      {
        label: 'Onboarding',
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
        label: 'Profiles',
        exact: true,
        path: '/facility/profiles',
        // icon: VideoCameraOutlined,
        component: Profiles
      },
      {
        label: 'Management',
        exact: true,
        path: '/management',
        // icon: VideoCameraOutlined,
        component: Management
      },
      {
        label: '',
        exact: true,
        path: '/facility/profiles/linking-issues',
        // icon: VideoCameraOutlined,
        component: LinkingIssues
      },
      {
        label: '',
        path: '/facility/:facilityId',
        exact: true,
        // icon: VideoCameraOutlined,
        component: FacilityEdit
      },
      {
        label: '',
        path: '/facility/:facilityId/edit',
        // icon: VideoCameraOutlined,
        component: FacilityEdit
      }
    ]
  },
  {
    sidebarIndex: 2,
    label: 'Patients',
    // icon: VideoCameraOutlined,
    children: [
      {
        label: 'Details',
        path: '/patients/detail-list',
        exact: true,
        // icon: VideoCameraOutlined,
        component: PatientDetailList
      }
    ]
  },
  {
    sidebarIndex: 3,
    label: '',
    exact: true,
    path: '/reports',
    component: Reports
  },
  {
    sidebarIndex: 0,
    label: 'Dashboard',
    path: '/',
    icon: BankOutlined,
    component: Home
  }
];
