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

export const AssignmentTable: React.FC = () => {
  // session user Data  
  const [userData] = useFetchUserData();

  // translation
  const { t } = useTranslation();

  // location
  const location: any = useLocation();

  const Routes = () => {
    if (userData?.name == "State Admin") {
      if (location.state === "district") return <DistrictOfficerTable />
      if (location.state === "taluka") return <TalukaTable />
      if (location.state === "refraction") return <RefractionistTable />
    } else if (userData?.name == "District Officer") {
      if (location.state === "taluka") return <TalukaTable />
      if (location.state === "refraction") return <RefractionistTable />
    } else if (userData?.name == "Taluka") {
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
