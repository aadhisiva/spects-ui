import React from 'react';
import styles from "./titleBarComponent.module.scss";
import { Avatar, Button, Col, Dropdown, Image, MenuProps, Row, Space } from 'antd';
import HomeImage from "../../../assets/Images/TitleBar/home.png";
import { UserOutlined } from '@ant-design/icons';
import { findLoginName } from '../../../utilities/reUsableFun';
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';

type titlePageI = {
    title: string;
    image: boolean;
    loginUser?: string | any;
    timer?: any
};

export const TitleBarComponent: React.FC<titlePageI> = (props) => {
    const navigate = useNavigate();
    const { t } = useTranslation();

    const loginBy: any = findLoginName();

    const handleLogout = () => {
        localStorage.removeItem("login_user");
        navigate("/");

    };

    return (
        <div className={styles.titleBarPage}>
            <Row justify={"start"} className={styles.titleBarContainer}>
                <Col sm={1} xs={5}>
                    {
                        props.image ? (
                            <Image
                                preview={false}
                                className={styles.image}
                                width={25}
                                height={25}
                                src={HomeImage}
                            />
                        ) : <span className={styles.image}></span>}
                </Col>
                <Col sm={4} xs={7} className={styles.titleContainer}>
                    <span className={styles.title}>{props.title ? props.title : ("")}</span>
                </Col>
                {loginBy ? (
                    <Col sm={18} xs={12} className={styles.loginUserContainer}>
                        <div className={styles.loginUserTitle}>
                            {t("WELCOME")} {loginBy?.type == "State Admin" ? t("STATE_ADMIN") :
                                loginBy?.type == "District Officer" ? "DHO" :
                                    loginBy?.type == "Taluka" ?
                                        "THO" : "PHCO"} | <span style={{ cursor: 'pointer' }} onClick={handleLogout}>{t("LOG_OUT")}</span>
                        </div>
                    </Col>)
                    : ("")
                }
            </Row>
        </div>
    )
}
