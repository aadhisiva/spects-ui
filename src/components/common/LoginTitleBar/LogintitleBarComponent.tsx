import React from 'react';
import styles from "./LogintitleBarComponent.module.scss";
import { Col, Row } from 'antd';
import { useTranslation } from 'react-i18next';

export const LoginTitleBarComponent: React.FC = (props) => {

      // translation
  const { t } = useTranslation();

    return (
        <div className={styles.loginTitleBarPage}>
            <Row justify={"start"} className={styles.titleBarContainer}>
                <Col sm={3} xs={10} className={styles.titleContainer}>
                    <span className={styles.title}>{t("LOGIN_PAGE")}</span>
                </Col>
            </Row>
        </div>
    );
};
