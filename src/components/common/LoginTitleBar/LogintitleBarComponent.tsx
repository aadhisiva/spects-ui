import React from 'react';
import styles from "./LogintitleBarComponent.module.scss";
import { Col, Row } from 'antd';
import { useTranslation } from 'react-i18next';
import i18n from '../../../utilities/Langugae';

export const LoginTitleBarComponent: React.FC = (props) => {

      // translation
  const { t } = useTranslation();

  const hanndleChange = (type: string) => {
    localStorage.setItem('type', type);
    let language: any = localStorage.getItem('type');
    i18n.changeLanguage(language);
};

    return (
        <div className={styles.loginTitleBarPage}>
            <Row justify={"start"} className={styles.titleBarContainer}>
                <Col sm={3} xs={10} className={styles.titleContainer}>
                    <span className={styles.title}>{t("LOGIN_PAGE")}</span>
                </Col>
                <Col xs={14} sm={5} className={styles.rightSideContent}>
                        <span onClick={() => hanndleChange("ka")}>ಕನ್ನಡ</span> | <span onClick={() => hanndleChange("en")}>English</span>
                        {/* <p className={styles.loginTime}>Logged In :{" "}{userStore?.loginTime}</p> */}
                    </Col>
            </Row>
        </div>
    );
};
