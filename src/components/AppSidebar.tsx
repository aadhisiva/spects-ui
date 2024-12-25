import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import {
  CCloseButton,
  CImage,
  CSidebar,
  CSidebarBrand,
  CSidebarFooter,
  CSidebarHeader,
  CSidebarToggler,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

import { AppSidebarNav } from './AppSidebarNav'
// import { sygnet } from '@root/assets/brand/sygnet'

import Logo from '../assets/images/karnataka.png'
// sidebar nav config
import userSelectedValue from './common/customHooks/userSelectedValue'
import { adminRoutes, districtRoutes, phcoRoutes, superAdminRoutes, talukRoutes } from '../_nav'
import { sideBarOpen, sideBarUnfoldableOpen } from '../pages/redux/features/userReducer'

const AppSidebar = () => {
  const [{ Access, RoleName }] = userSelectedValue()

  const dispatch = useDispatch()

  const [{ sidebarShow, sidebarUnfoldable }] = userSelectedValue()

  let sideBarRoutes =
    Access.District == 'Yes' && Access.Type == 'Admin'
      ? superAdminRoutes
      : Access.District == 'Yes'
        ? adminRoutes
        : Access.Taluk == 'Yes'
          ? districtRoutes
          : Access.Phco == 'Yes'
            ? talukRoutes
            : Access.SubCenter == 'Yes'
              ? phcoRoutes
              : []

  // const imagePath = require(`../assets/images/karmataka.png`).default;
  return (
    <CSidebar
      className="border-end"
      colorScheme="dark"
      position="fixed"
      unfoldable={sidebarUnfoldable}
      visible={sidebarShow}
      onVisibleChange={(visible) => {
        dispatch(sideBarOpen(visible))
      }}
    >
      <CSidebarHeader className="border-bottom">
        <CSidebarBrand to="/">
          <img src={Logo} alt="Karmataka" sizes="10px" width={50} loading="lazy" />
        </CSidebarBrand>
        <span style={{ fontSize: '19px' }}>Spectacles</span>
        <CCloseButton
          className="d-lg-none"
          dark={false}
          onClick={() => dispatch(sideBarOpen(false))}
        />
      </CSidebarHeader>
      <AppSidebarNav items={sideBarRoutes} />
      <CSidebarFooter className="border-top d-none d-lg-flex">
        {RoleName}
        <CSidebarToggler onClick={() => dispatch(sideBarUnfoldableOpen(!sidebarUnfoldable))} />
      </CSidebarFooter>
    </CSidebar>
  )
}

export default React.memo(AppSidebar)
