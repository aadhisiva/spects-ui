import React from 'react'
import { LayoutComponent } from '../common/Layout/LayoutComponent'
import { createBrowserRouter, RouterProvider, Routes, Route, useNavigate } from 'react-router-dom'
import { SignInComponent } from './signIn/signInComponent'
import { AddUser } from '../../pages/AddUser'
import { DashBoardHierarchy } from '../../pages/DashBoardHierarchy'
import { AssignmentTable } from '../../pages/AssignmentTable'
import { ReportsTable } from '../../pages/ReportsTable'
import ErrorBoundary from './ErrorBoundaries/ErrorBoundaries'
import { PageNotFound } from './ErrorBoundaries/PageNotFound'
import ProtectedRoutes from './ErrorBoundaries/ProtectedRoutes'

// const router = createBrowserRouter([
//     {
//         path: "/dashboard",
//         element: <DashBoardHierarchy />,
//     },
//     {
//         path: "/add-user",
//         element: <AddUser />,
//     },
//     {
//         path: "/assignment-list",
//         element: <AssignmentTable />,
//     },
//     {
//         path: "/reports-list",
//         element: <ReportsTable />,
//     },
// ]);

// const routes =  createBrowserRouter([
//     {
//         path: "/",
//         element: <SignInComponent />,
//     },
// ])

const navigate = useNavigate();
const loginUser = localStorage.getItem('login_user');
if (!loginUser) {
    navigate('/')
}
export const AuthLayout: React.FC = () => {
    return (
        <div>
            <ErrorBoundary>
                <LayoutComponent loginUser={loginUser}>
                    <Routes>
                        <Route path='/' element={<SignInComponent />} />
                        <ProtectedRoutes />
                        <Route element={<ProtectedRoutes loginUser={loginUser} />}>
                            <Route path='/dashboard' element={<DashBoardHierarchy />} />
                            <Route path='/assignment-list' element={<AssignmentTable />} />
                            <Route path='/reports-list' element={<ReportsTable />} />
                        </Route>
                        {/* 👇️ only match this when no other routes match */}
                        <Route path='*' element={<PageNotFound />} />
                    </Routes>
                </LayoutComponent>
            </ErrorBoundary>
        </div>
    )
};
