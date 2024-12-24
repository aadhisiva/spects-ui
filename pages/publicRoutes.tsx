import React, { FC } from 'react'
import { Outlet, Route } from 'react-router-dom'
import { Navigate } from 'react-router-dom'
import useDocumentTitle from '../components/common/useDocumentTitle'
import userSelectedValue from '../components/common/customHooks/userSelectedValue'
import DefaultLayout from '../layout/DefaultLayout'

interface PrivateRouteProps {
  isLoggedIn?: boolean;
  children?: any;
}

const PublicRoute: FC<PrivateRouteProps> = ({ children }) => {
 const [{ useAuth }] = userSelectedValue();
  
 useDocumentTitle();

  return !useAuth ? children : <Navigate to={'/'} replace /> // SessionTimer component doesn't render anything
}

export default PublicRoute;
