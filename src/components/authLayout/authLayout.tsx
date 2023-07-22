import React, { useState } from 'react'
import { LayoutComponent } from '../common/Layout/LayoutComponent'
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

const loginUser: any = localStorage.getItem('login_user');
var condition = navigator.onLine;

export const AuthLayout: React.FC = ({t}: any) => {
    const [isModalOpen, setIsModalOpen] = useState(!condition);

      const handleOk = () => {
        setIsModalOpen(false);
      };
    
      const handleCancel = () => {
        setIsModalOpen(false);
      };
    
    const handleShowInfoPage = () => {
        return  <Modal title="Network Error" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
         <Result
            status="warning"
            title={<h4>There are some problems with your Network.</h4>}
        />
      </Modal>
    };
     
    return (
        <div>
            {!condition && handleShowInfoPage()}
                <LayoutComponent loginUser={loginUser}>
                    <BrowserRouter>
                        <Routes>
                            <Route path='/' element={<Navigate to={"/signin"} replace/>} />
                            <Route path='/signin' element={<SignInComponent />} />
                            <Route element={<AuthMiddleware />}>
                                <Route path='/dashboard' element={<DashBoardHierarchy />} />
                                <Route path='/assignment-list' element={<AssignmentTable />} />
                                <Route path='/reports-list' element={<ReportsTable />} />

                                {/* 👇️ only match this when no other routes match */}
                                <Route path='*' element={<PageNotFound />} />
                            </Route>
                        </Routes>
                    </BrowserRouter>
                </LayoutComponent>
        </div>
    )
};
