import React from 'react'
import { LayoutComponent } from '../common/Layout/LayoutComponent'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { SignInComponent } from './signIn/signInComponent'
import { DashboardComponent } from '../../pages/Dashboard/DashboardComponent'
import { SchoolList } from '../../pages/SchoolList'
import { TableDatData } from '../../pages/Table'
import { StudentsTable } from '../../pages/Students'
import { BeneficiaryList } from '../../pages/BenficiaryList/BenficiaryList'
import { UserDetails } from '../../pages/UserDetails'
import { AddUser } from '../../pages/AddUser'
import { BeneficiaryDetails } from '../../pages/BeneficiaryDetails'
import { StudentDetails } from '../../pages/StudentDetails'
import { DashBoardHierarchy } from '../../pages/DashBoardHierarchy'
import { AssignmentTable } from '../../pages/AssignmentTable'
import { ReportsTable } from '../../pages/ReportsTable'

const router = createBrowserRouter([
    {
        path: "/",
        element: <SignInComponent />,
    },
    {
        path: "/dashboard",
        element: <DashBoardHierarchy />,
    },
    {
        path: "/school-tracking",
        element: <SchoolList />,
    },
    {
        path: "/student-tracking",
        element: <StudentsTable />,
    },
    {
        path: "/beneficiary-list",
        element: <BeneficiaryList />,
    },
    {
        path: "/user-details",
        element: <UserDetails />,
    },
    {
        path: "/add-user",
        element: <AddUser />,
    },
    {
        path: "/beneficiary-details",
        element: <BeneficiaryDetails />,
    },
    {
        path: "/student-details",
        element: <StudentDetails />,
    },
    {
        path: "/table",
        element: <TableDatData />,
    },
    {
        path: "/assignment-list",
        element: <AssignmentTable />,
    },
    {
        path: "/reports-list",
        element: <ReportsTable />,
    },
])

export const AuthLayout: React.FC = () => {
    return (
        <div>
            <LayoutComponent>
                <RouterProvider router={router} />
            </LayoutComponent>
        </div>
    )
};
