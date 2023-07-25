import React, { ReactNode } from 'react'
import { FooterComponent } from '../components/common/Footer/FooterComponent'
import { HeaderCompenent } from '../components/common/Header/HeaderComponent';
import styles from "./LayoutComponent.module.scss";
import "./LayoutComponent.custom.scss";
import classNames from "classnames";

type LayoutI = {
    children: ReactNode;
    loginUser?: any
}

export const LayoutComponent: React.FC<LayoutI> = ({
    children
}) => {
    return (
        <>
            <HeaderCompenent/>
            <div className={classNames(styles.layoutPage, 'layout-page')}>
                {children}
            </div>
            <FooterComponent />
        </>
    )
}
