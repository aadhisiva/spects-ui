import React, { useState } from 'react';
import styles from "./AssignmentTable.module.scss";
import classNames from 'classnames';
import "./AssignmentTable.custom.scss";
import { TitleBarComponent } from '../../components/common/titleBar';
import { TalukaTable } from '../hierarchy/Taluka';
import { DistrictOfficerTable } from '../hierarchy/District';
import { useLocation } from 'react-router';
import { RefractionistTable } from '../hierarchy/Refractionist/Refractionist';
import { useTranslation } from 'react-i18next';
import { useFetchUserData } from '../../utilities/userDataHook';
import { PhcoTable } from '../hierarchy/phco';

export const AssignmentTable: React.FC = () => {
  // session user Data  
  const [user] = useFetchUserData();

  // translation
  const { t } = useTranslation();

  // location
  const location: any = useLocation();

  const Routes = () => {
    if (user?.userData?.type == "state_admin") {
      if (location.state === "district") return <DistrictOfficerTable />
      if (location.state === "taluka") return <TalukaTable />
      if (location.state === "phco") return <PhcoTable />
      if (location.state === "refraction") return <RefractionistTable />
    } else if (user?.userData?.type == "district_officer") {
      if (location.state === "taluka") return <TalukaTable />
      if (location.state === "phco") return <PhcoTable />
      if (location.state === "refraction") return <RefractionistTable />
    } else if (user?.userData?.type == "taluka") {
      if (location.state === "refraction") return <RefractionistTable />
      if (location.state === "phco") return <PhcoTable />
    } else if (user?.userData?.type == "phco") {
      if (location.state === "refraction") return <RefractionistTable />
    }
  }
  return (
    <>
      <TitleBarComponent title={t("ASSIGNMENT_LIST")} image={true} />
      <div className={classNames(styles.assignmentTable, "assignment-page-list")}>
        {Routes()}
      </div>
    </>
  )
}
