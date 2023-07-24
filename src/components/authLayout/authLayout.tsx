import React, { useState } from 'react'
import { LayoutComponent } from '../../Layout/LayoutComponent'
import { Routes, Route, BrowserRouter, redirect, Navigate } from 'react-router-dom'
import { SignInComponent } from './signIn/signInComponent'
import { DashBoardHierarchy } from '../../pages/DashBoardHierarchy'
import { AssignmentTable } from '../../pages/AssignmentTable'
import { ReportsTable } from '../../pages/ReportsTable'
import ErrorBoundary from './ErrorBoundaries/ErrorBoundaries'
import { PageNotFound } from './ErrorBoundaries/PageNotFound'
import { Button, Modal, Result } from 'antd'
import { AuthMiddleware } from './AuthMiddelware'
import { SessionTimeout } from './Sessions/SessionTimeout'
import RequiredAuth from '../RequiredAuthHOC';
import { connect } from "react-redux";
import { clearSession } from '../../utilities'
import { dispatchStore } from '../../redux/store'
import { RESET_APP } from '../../redux/actionTypes'

const loginUser: any = localStorage.getItem('login_user');
var condition = navigator.onLine;

const AuthLayout: React.FC = ({ checked, isAuthenticated }: any) => {
  const [isModalOpen, setIsModalOpen] = useState(!condition);

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleShowInfoPage = () => {
    return <Modal title="Network Error" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
      <Result
        status="warning"
        title={<h4>There are some problems with your Network.</h4>}
      />
    </Modal>
  };
  console.log("##checked", checked);
  const handleLogOut = () => {
    clearSession();
    dispatchStore({ type: RESET_APP })
  }
  return (
    <div>
      {!condition && handleShowInfoPage()}
      <LayoutComponent loginUser={loginUser}>

        <SessionTimeout isAuthenticated={isAuthenticated} logOut={handleLogOut} />
        <BrowserRouter>
          {checked && (
            <Routes>
              <Route path='/' element={<Navigate to={"/signin"} replace />} />
              <Route path='/signin' element={<SignInComponent />} />
              <Route path='/dashboard' Component={RequiredAuth(DashBoardHierarchy)} />
              <Route path='/assignment-list' Component={RequiredAuth(AssignmentTable)} />
              <Route path='/reports-list' Component={RequiredAuth(ReportsTable)} />

              <Route path='*' element={<PageNotFound />} />
            </Routes>
          )}
        </BrowserRouter>
      </LayoutComponent>
    </div>
  )
};

const mapStateToProps = ({ session }: any) => {
  console.log("##checked", session);
  return {
    checked: session?.checked,
    isAuthenticated: session?.authenticated,
  }
};

export default connect(mapStateToProps)(AuthLayout);
