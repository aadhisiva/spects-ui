import React from 'react'
import { Layout, Row, Col, Image } from "antd";
import styles from "./HeaderComponent.module.scss";
import "./HeaderComponent.custom.scss";
import leftLogo from "../../../assets/Images/HeaderImages/leftLogo.png";
import rightLogo from "../../../assets/Images/HeaderImages/rightLogo.png";

const { Header } = Layout;

export const HeaderCompenent: React.FC = () => {
    return (
        <div className={styles.homePage}>
            <Header className={styles.headerContainer}>
                <Row className={styles.headerRow}>
                    <Col xs={4} sm={3} className={styles.leftSideImage}>
                        <Image
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
                        <p className={styles.title}>Welcome PDO</p>
                        <p className={styles.subTitle}>ಕನ್ನಡ | English</p>
                    </Col>
                    <Col xs={1} sm={2} className={styles.rightSideImage}>
                        <Image
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
