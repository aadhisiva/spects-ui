import React from 'react'
import {
  CHILD_ROLES,
  DISTRICT_ASSIGN,
  PHCO_ASSIGN,
  PRIMARY_SCREENING,
  REFRACTIONIST_LOGIN,
  ROLE_ACCESS,
  ROLES,
  SEARCH_REPORTS,
  STATE_AND_DISTRICT_DATA,
  SUBCENTER_ASSIGN,
  TALUK_ASSIGN,
} from './components/utils/routingPath'

const DistrictAssign = React.lazy(() => import('./pages/assignment/districtAssign'))
const PhcoAssign = React.lazy(() => import('./pages/assignment/phcoAssign'))
const SubCenterAssign = React.lazy(() => import('./pages/assignment/subCenterAssign'))
const TalukAssign = React.lazy(() => import('./pages/assignment/talukAssign'))

const Roles = React.lazy(() => import('./pages/Admin/roles'));
const RoleAccess = React.lazy(() => import('./pages/Admin/roleAccess'));
const ChildRoles = React.lazy(() => import('./pages/Admin/childRoles'));

const DashboardPage = React.lazy(() => import('./pages/dashboard'));

const SearchReportsPage = React.lazy(() => import('./pages/reports/searchReports'));
const PrimaryScreeningPage = React.lazy(() => import('./pages/reports/primaryScreeningReports'));
const StateAndDistrictsWiseDataPage = React.lazy(() => import('./pages/reports/stateAndDistrictsWiseData'));
const RefractionisiLoginDataPage = React.lazy(() => import('./pages/reports/refractionisiLoginData'));

const routes = [
  // { path: '/', exact: true, name: 'Dashboard' },
  { path: '/', name: 'Dashboard', element: DashboardPage },
  // { path: '/theme', name: 'Theme', element: Colors, exact: true },
  // { path: '/theme/colors', name: 'Colors', element: Colors },
  // { path: '/theme/typography', name: 'Typography', element: Typography },

  { path: DISTRICT_ASSIGN, name: 'District', element: DistrictAssign },
  { path: SUBCENTER_ASSIGN, name: 'SubCenter', element: SubCenterAssign },
  { path: TALUK_ASSIGN, name: 'Taluk', element: TalukAssign },
  { path: PHCO_ASSIGN, name: 'PHCO', element: PhcoAssign },

  { path: ROLES, name: 'Roles', element: Roles },
  { path: ROLE_ACCESS, name: 'Role Access', element: RoleAccess },
  { path: CHILD_ROLES, name: 'Child Roles', element: ChildRoles },

  { path: SEARCH_REPORTS, name: 'Search Reports', element: SearchReportsPage },
  { path: PRIMARY_SCREENING, name: 'Primary Screening', element: PrimaryScreeningPage },
  { path: STATE_AND_DISTRICT_DATA, name: 'State & District Wise Data', element: StateAndDistrictsWiseDataPage },
  { path: REFRACTIONIST_LOGIN, name: 'Refractionist Login Data', element: RefractionisiLoginDataPage },
]

export default routes
