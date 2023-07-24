import React from 'react';
import styles from "./titleBarComponent.module.scss";
import { Avatar, Button, Col, Dropdown, Image, MenuProps, Row, Space } from 'antd';
import HomeImage from "../../../assets/Images/TitleBar/home.png";
import { UserOutlined } from '@ant-design/icons';
import { findLoginName } from '../../../utilities/reUsableFun';
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import { useFetchUserData } from '../../../utilities/userDataHook';
import { clearSession } from '../../../utilities';
import { dispatchStore } from '../../../redux/store';
import { RESET_APP } from '../../../redux/actionTypes';

type titlePageI = {
    title: string;
    image: boolean;
    loginUser?: string | any;
    timer?: any
};

export const TitleBarComponent: React.FC<titlePageI> = (props) => {
    // translation
    const { t } = useTranslation();
    // session user data
    const [userData] = useFetchUserData();
    
    const navigate = useNavigate();

    const handleLogout = () => {
        clearSession();
        dispatchStore({ type: RESET_APP })
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
                {userData ? (
                    <Col sm={18} xs={12} className={styles.loginUserContainer}>
                        <div className={styles.loginUserTitle}>
                            {t("WELCOME")} {userData?.name == "State Admin" ? t("STATE_ADMIN") :
                                userData?.name == "District Officer" ? "DHO" :
                                userData?.name == "Taluka" ?
                                        "THO" : "PHCO"} | <span style={{ cursor: 'pointer' }} onClick={handleLogout}>{t("LOG_OUT")}</span>
                        </div>
                    </Col>)
                    : ("")
                }
            </Row>
        </div>
    )
}
