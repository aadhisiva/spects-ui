import React, { Dispatch, useEffect } from "react";
import { LayoutComponent } from "../Layout/LayoutComponent";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import { SignInComponent } from "./signIn/signInComponent";
import { DashBoardHierarchy } from "../pages/DashBoardHierarchy";
import { AssignmentTable } from "../pages/AssignmentTable";
import { ReportsTable } from "../pages/Reports/ReportsTable";
import { SessionTimeout } from "../components/common/Sessions/SessionTimeout";
import { useDispatch, useSelector } from "react-redux";
import { LogOut, reset } from "../redux/features/authSlice";
import { IStateValues } from "../type";
import { ShowInfoPageForOnline } from "../components/common/OnlineOroffline";
import { PrimaryScreeningReports } from "../pages/Reports/PScreeningReports";
import { SchoolScreeningReports } from "../pages/Reports/SchoolScreeningReport";
import { StateWiseAndDistrictWise } from "../pages/Reports/StateWiseAndDistrictWise";
import { RefractionistReports } from "../pages/Reports/refractionistReports";

var condition = navigator.onLine;

const AuthLayout: React.FC = () => {
  // auth user
  const dispatch: Dispatch<any> = useDispatch();

  const userStore: any = useSelector((state: IStateValues) => state?.auth);

  // useEffect(() => {
  //   dispatch(getMe(''));
  // }, [dispatch]);

  const handleLogOut = () => {
    dispatch(LogOut());
    dispatch(reset("logout"));
  };
  return (
    <div>
      {!condition && <ShowInfoPageForOnline />}
      <LayoutComponent>
        <SessionTimeout
          isAuthenticated={userStore?.isSuccess}
          logOut={handleLogOut}
        />
        <BrowserRouter basename="/spects">
          {userStore?.isOtpVerfity ? <PrivateRoutes /> : <PublicRoutes />}
        </BrowserRouter>
      </LayoutComponent>
    </div>
  );
};

const PrivateRoutes = () => {
  return (
    <Routes>
      <Route path="/*" element={<Navigate to={"/dashboard"} replace={true} />} />
      <Route path="/dashboard" element={<DashBoardHierarchy />} />
      <Route path="/assignment-list" element={<AssignmentTable />} />
      <Route path="/reports-list" element={<ReportsTable />} />
      <Route
        path="/primary-screening-list"
        element={<PrimaryScreeningReports />}
      />
      <Route
        path="/stateWiseAndDistrictWise"
        element={<StateWiseAndDistrictWise />}
      />
      <Route
        path="/refractionistLoginReports"
        element={<RefractionistReports />}
      />
      <Route
        path="/school-primary-screening-list"
        element={<SchoolScreeningReports />}
      />
      {/* <Route path='*' element={<PageNotFound />} /> */}
    </Routes>
  );
};

const PublicRoutes = () => {
  return (
    <Routes>
      <Route path="/*" element={<Navigate to={"/signin"} />} />
      <Route path="/signin" element={<SignInComponent />} />
      {/* <Route path='*' element={<PageNotFound />} /> */}
    </Routes>
  );
};

export default AuthLayout;
