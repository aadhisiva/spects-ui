import React, { useState } from 'react';
import styles from "./AssignmentTable.module.scss";
import classNames from 'classnames';
import "./AssignmentTable.custom.scss";
import { TitleBarComponent } from '../../components/common/titleBar';
import { findLoginName } from '../../utilities/reUsableFun';
import { TalukaTable } from '../hierarchy/Taluka';
import { DistrictOfficerTable } from '../hierarchy/District';
import { useLocation } from 'react-router';
import { RefractionistTable } from '../hierarchy/Refractionist/Refractionist';

export const AssignmentTable: React.FC = () => {
    const [loginBY, setLoginBy] = useState(findLoginName());
  const location: any = useLocation();
console.log("location",location)
  const Routes = () => {
    if(loginBY?.type == "State Admin"){
      return(
             <DistrictOfficerTable />
      )
    } else if(loginBY?.type == "District Officer"){
         return (
             <TalukaTable />
         )
    } else if(loginBY?.type == "Taluka"){
      return (
        <RefractionistTable />
      )
    }
  } 
    return (
        <>
            <TitleBarComponent title={"Assignment List"} image={true} />
            <div className={classNames(styles.assignmentTable, "assignment-page-list")}>
               {Routes()}
            </div>
        </>
    )
}
