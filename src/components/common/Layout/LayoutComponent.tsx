import React, { ReactNode } from 'react'
import { FooterComponent } from '../Footer/FooterComponent'
import { HeaderCompenent } from '../Header/HeaderComponent';
import styles from "./LayoutComponent.module.scss";
import "./LayoutComponent.custom.scss";
import classNames from "classnames";

type LayoutI = {
    children: ReactNode;
    loginUser?: any
}

export const LayoutComponent: React.FC<LayoutI> = ({
    loginUser, 
    children
}) => {
    return (
        <>
            <HeaderCompenent loginUser={loginUser}/>
            <div className={classNames(styles.layoutPage, 'layout-page')}>
                {children}
            </div>
            <FooterComponent />
        </>
    )
}
