import React from 'react';
import styles from "./titleBarComponent.module.scss";
import { Col, Image, Row, Space } from 'antd';
import HomeImage from "../../../assets/Images/TitleBar/home.png";

type titlePageI = {
    title: string;
    image: boolean;
    loginUser?: string;
};
export const TitleBarComponent: React.FC<titlePageI> = (props) => {
    return (
        <div className={styles.titleBarPage}>
            <Row justify={"start"} className={styles.titleBarContainer}>
                <Col sm={1} xs={5}>
                    {
                        props.image ? (
                            <Image
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
                {props.loginUser ? (
                    <Col sm={18} xs={12} className={styles.loginUserContainer}>
                        Login By : <span className={styles.loginUserTitle}>{props.title ? props.loginUser : ("")}</span>
                    </Col>)
                    : ("")
                }
            </Row>
        </div>
    )
}
