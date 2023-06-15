import React, { ReactNode } from 'react'
import { FooterComponent } from '../Footer/FooterComponent'
import { HeaderCompenent } from '../Header/HeaderComponent';
import styles from "./LayoutComponent.module.scss";
import "./LayoutComponent.custom.scss";
import classNames from "classnames";

type LayoutI = {
    children: ReactNode;
}

export const LayoutComponent: React.FC<LayoutI> = (props) => {
    return (
        <>
            <HeaderCompenent />
            <div className={classNames(styles.layoutPage, 'layout-page')}>
                {props.children}
            </div>
            <FooterComponent />
        </>
    )
}
