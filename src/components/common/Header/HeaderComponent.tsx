import React from 'react'
import { Layout, Row, Col, Image } from "antd";
import styles from "./HeaderComponent.module.scss";
import "./HeaderComponent.custom.scss";
import leftLogo from "../../../assets/Images/HeaderImages/leftLogo.png";
import rightLogo from "../../../assets/Images/HeaderImages/rightLogo.png";
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import i18n from "i18next";

const { Header } = Layout;

type HeaderProps = {
    loginUser?: any
}
export const HeaderCompenent: React.FC<HeaderProps> = ({ loginUser }) => {
    const { t } = useTranslation();
    
    let showTitleByLoginUser = JSON.parse(loginUser);
    
    const hanndleChange = (type: string) => {
        localStorage.setItem('type', type);
        let language: any = localStorage.getItem('type');
        i18n.changeLanguage(language);
    };

    return (
        <div className={classNames(styles.homePage, 'header-page')}>
            <Header className={styles.headerContainer}>
                <Row className={styles.headerRow}>
                    <Col xs={4} sm={5} className={styles.leftSideImage}>
                        <Image
                            preview={false}
                            width={70}
                            height={55}
                            src={leftLogo}
                        />
                    </Col>
                    <Col xs={15} sm={13}>
                        <div className={styles.centerName}>
                            <p className={styles.title}>{t("GOV_NAME")}</p>
                            <p className={styles.subTitle}>{t("PROJECT_TITLE")}</p>
                        </div>
                    </Col>
                    <Col xs={0} sm={4} className={styles.rightSideContent}>
                        <p className={styles.title}>{t("NHM")}</p>
                        {/* {(!showTitleByLoginUser) ? ("") : (
                            <p className={styles.title}>{t("WELCOME")} {
                                showTitleByLoginUser.type == "state_admin" ? t("STATE_ADMIN") :
                                    showTitleByLoginUser.type == "district_officer" ? "DHO" : 
                                    showTitleByLoginUser.type == "taluka" ?
                                        "THO" : "PHCO"
                            }</p>
                        )} */}
                        <p className={styles.subTitle}><a onClick={() => hanndleChange("ka")}>ಕನ್ನಡ</a> | <a onClick={() => hanndleChange("en")}>English</a></p>
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
