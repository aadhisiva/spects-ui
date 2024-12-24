import React, { FC } from 'react'
import { Outlet, Route } from 'react-router-dom'
import { Navigate } from 'react-router-dom'
import useDocumentTitle from '../components/common/useDocumentTitle'
import userSelectedValue from '../components/common/customHooks/userSelectedValue'
import DefaultLayout from '../layout/DefaultLayout'
import { AppContent, AppFooter, AppHeader, AppSidebar } from '../components'

interface PrivateRouteProps {
  isLoggedIn?: boolean
  children?: any
}

const PrivateRoute: FC<PrivateRouteProps> = ({ isLoggedIn, children }) => {
  const [{ useAuth }] = userSelectedValue()

  useDocumentTitle()

  return useAuth ? (
    children
    // <div>
    //   <AppSidebar />
    //   <div className="wrapper d-flex flex-column min-vh-100">
    //     <AppHeader />
    //     <div className="body flex-grow-1">
    //       <Outlet />
    //     </div>
    //     <AppFooter />
    //   </div>
    // </div>
  ) : (
    <Navigate to={'/login'} replace />
  ) // SessionTimer component doesn't render anything
}

export default PrivateRoute
