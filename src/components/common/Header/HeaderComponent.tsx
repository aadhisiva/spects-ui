import React, { useEffect, useState } from 'react'
import { Layout, Row, Col, Image } from "antd";
import styles from "./HeaderComponent.module.scss";
import "./HeaderComponent.custom.scss";
import leftLogo from "../../../assets/Images/HeaderImages/leftLogo.png";
import rightLogo from "../../../assets/Images/HeaderImages/rightLogo.png";
import { findLoginName } from '../../../utilities/reUsableFun';
import classNames from 'classnames';

const { Header } = Layout;
export const HeaderCompenent: React.FC = () => {
    const [loginUser, setLoginUser ] = useState<any>("");

    const SwitchLoginData = (loginData: any) => {
        switch (loginData) {
            case "State Admin":
                return "State Admin";
            case "District Officer":
                return "DHO";
            case "Taluka":
                return "THO";
            default:
                return "PHCO"
        };
    };
// console.log(localStorUser())
// useEffect(()=>{
//     setLoginUser(localStorUser());
// }, [localStorUser()])
    return (
        <div className={classNames(styles.homePage, 'header-page')}>
            <Header className={styles.headerContainer}>
                <Row className={styles.headerRow}>
                    <Col xs={4} sm={3} className={styles.leftSideImage}>
                        <Image
                            preview={false}
                            width={70}
                            height={55}
                            src={leftLogo}
                        />
                    </Col>
                    <Col xs={15} sm={16}>
                        <div className={styles.centerName}>
                            <p className={styles.title}>GOVT. OF KARNATAKA</p>
                            <p className={styles.subTitle}>Spectcles Distribution</p>
                        </div>
                    </Col>
                    <Col xs={0} sm={3} className={styles.rightSideContent}>
                        <p className={styles.title}>National Health Mission</p>
                        {/* {(localStorUser())? (
                            <p className={styles.title}>Welcome {SwitchLoginData(localStorUser())}</p>
                        ): ("")} */}
                        <p className={styles.subTitle}>ಕನ್ನಡ | English</p>
                    </Col>
                    <Col xs={1} sm={2} className={styles.rightSideImage}>
                        <Image
                            preview={false}
                            width={70}
                            height={55}
                            src={rightLogo}
                        />
                    </Col>
                </Row>
            </Header>
        </div>
    );
};
