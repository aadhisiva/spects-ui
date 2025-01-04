import { cilChartPie, cilSpeedometer } from '@coreui/icons'
import { CNavItem, CNavTitle } from '@coreui/react'
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
import CIcon from '@coreui/icons-react'

const _subcenterPath = {
  component: CNavItem,
  name: 'SubCenter',
  to: SUBCENTER_ASSIGN,
  icon: <CIcon icon={cilChartPie} customClassName="nav-icon" />,
}
const _districtPath = {
  component: CNavItem,
  name: 'District',
  to: DISTRICT_ASSIGN,
  icon: <CIcon icon={cilChartPie} customClassName="nav-icon" />,
}

const _talukPath = {
  component: CNavItem,
  name: 'Taluk',
  to: TALUK_ASSIGN,
  icon: <CIcon icon={cilChartPie} customClassName="nav-icon" />,
}

const _phcoPath = {
  component: CNavItem,
  name: 'PHCO',
  to: PHCO_ASSIGN,
  icon: <CIcon icon={cilChartPie} customClassName="nav-icon" />,
}

const _primaryScreenigPath = {
  component: CNavItem,
  name: 'Primary Screening',
  to: PRIMARY_SCREENING,
  icon: <CIcon icon={cilChartPie} customClassName="nav-icon" />,
}

const _stateAndDistrictDataPath = {
  component: CNavItem,
  name: 'State & District Wise Data',
  to: STATE_AND_DISTRICT_DATA,
  icon: <CIcon icon={cilChartPie} customClassName="nav-icon" />,
}

const _refractionistLoginDataPath = {
  component: CNavItem,
  name: 'Refractionist Login Data',
  to: REFRACTIONIST_LOGIN,
  icon: <CIcon icon={cilChartPie} customClassName="nav-icon" />,
}

const _searchReportsPath = {
  component: CNavItem,
  name: 'Search Reports',
  to: SEARCH_REPORTS,
  icon: <CIcon icon={cilChartPie} customClassName="nav-icon" />,
}

export const superAdminRoutes = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    // badge: {
    //   color: 'info',
    //   text: 'NEW',
    // },
  },
  {
    component: CNavTitle,
    name: 'Assignment',
  },
  _districtPath,
  _talukPath,
  _phcoPath,
  _subcenterPath,
  {
    component: CNavTitle,
    name: 'Reports',
  },
  _searchReportsPath,
  _primaryScreenigPath,
  {
    component: CNavTitle,
    name: 'Secondary Screening',
  },
  _stateAndDistrictDataPath,
  _refractionistLoginDataPath,
  {
    component: CNavTitle,
    name: 'Roles',
  },
  {
    component: CNavItem,
    name: 'Roles',
    to: ROLES,
    icon: <CIcon icon={cilChartPie} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Role Access',
    to: ROLE_ACCESS,
    icon: <CIcon icon={cilChartPie} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Add Child Roles',
    to: CHILD_ROLES,
    icon: <CIcon icon={cilChartPie} customClassName="nav-icon" />,
  },
]

export const adminRoutes = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/',
  },
  {
    component: CNavTitle,
    name: 'Assignment',
  },
  _districtPath,
  _talukPath,
  _phcoPath,
  _subcenterPath,
  {
    component: CNavTitle,
    name: 'Reports',
  },
  _searchReportsPath,
  _primaryScreenigPath,
  {
    component: CNavTitle,
    name: 'Secondary Screening',
  },
  _stateAndDistrictDataPath,
  _refractionistLoginDataPath,
]

export const districtRoutes = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/',
  },
  {
    component: CNavTitle,
    name: 'Assignment',
  },
  _talukPath,
  _phcoPath,
  _subcenterPath,
  {
    component: CNavTitle,
    name: 'Reports',
  },
  _searchReportsPath,
  _primaryScreenigPath,
  {
    component: CNavTitle,
    name: 'Secondary Screening',
  },
  _stateAndDistrictDataPath,
  _refractionistLoginDataPath,
]

export const talukRoutes = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/',
    // icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    // badge: {
    //   color: 'info',
    //   text: 'NEW',
    // },
  },
  {
    component: CNavTitle,
    name: 'Assignment',
  },
  _phcoPath,
  _subcenterPath,
  {
    component: CNavTitle,
    name: 'Reports',
  },
  _searchReportsPath,
  _primaryScreenigPath,
  {
    component: CNavTitle,
    name: 'Secondary Screening',
  },
  // _stateAndDistrictDataPath,
  _refractionistLoginDataPath,
]

export const phcoRoutes = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/',
  },
  {
    component: CNavTitle,
    name: 'Assignment',
  },
  _subcenterPath,
  {
    component: CNavTitle,
    name: 'Reports',
  },
  _searchReportsPath,
  _primaryScreenigPath,
  {
    component: CNavTitle,
    name: 'Secondary Screening',
  },
  // _stateAndDistrictDataPath,
  _refractionistLoginDataPath,
]
