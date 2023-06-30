import React from 'react'
import { TitleBarComponent } from '../../components/common/titleBar';
import styles from "./StudentDetails.module.scss";
import "./StudentDetails.custom.scss";
import classNames from "classnames";
import { Button, Col, Row, Space } from 'antd';
import { useNavigate } from 'react-router';

export const StudentDetails = () => {
    const navigate = useNavigate();

    const handleClick = (path: string) => {
        navigate(path);
    }
    return (
        <>
            <TitleBarComponent title={"Student Deatils"} image={true} />
            <div className={classNames(styles.studentDetailsPage, 'student-details-page')}>
                <div className={styles.detailsContainer}>
                    <Row justify={"space-evenly"}>
                        <Col sm={9} xs={24} className={styles.deatailsCol}>
                            <table style={{ width: "100%" }}>
                                <tr>
                                    <td>footerRow</td>
                                    <td>Smith</td>
                                </tr>
                                <tr>
                                    <td>footerRow</td>
                                    <td>Jackson</td>
                                </tr>
                                <tr>
                                    <td>John</td>
                                    <td>Doe</td>
                                </tr>
                                <tr>
                                    <td>footerRow</td>
                                    <td>Jackson</td>
                                </tr>
                                <tr>
                                    <td>footerRow</td>
                                    <td>Doe</td>
                                </tr>
                                <tr>
                                    <td>footerRow</td>
                                    <td>Jackson</td>
                                </tr>
                                <tr>
                                    <td>footerRow</td>
                                    <td>Doe</td>
                                </tr>
                            </table>
                        </Col>
                        <Col sm={9} xs={24} className={styles.deatailsCol}>
                            <table style={{ width: "100%" }}>
                                <tr>
                                    <td>footerRow</td>
                                    <td>Smith</td>
                                </tr>
                                <tr>
                                    <td>footerRow</td>
                                    <td>Jackson</td>
                                </tr>
                                <tr>
                                    <td>footerRow</td>
                                    <td>Doe</td>
                                </tr>
                                <tr>
                                    <td>footerRow</td>
                                    <td>Jackson</td>
                                </tr>
                                <tr>
                                    <td>footerRow</td>
                                    <td>Doe</td>
                                </tr>
                                <tr>
                                    <td>footerRow</td>
                                    <td>Jackson</td>
                                </tr>
                                <tr>
                                    <td>footerRow</td>
                                    <td>Doe</td>
                                </tr>
                            </table>
                        </Col>
                    </Row>
                </div>
                <div className={styles.footerRow}>
                        <Row>
                            <Col sm={24} xs={24} className={styles.footerRight}>
                                <Button onClick={() =>handleClick("/student-tracking")}>Submit</Button>
                            </Col>
                        </Row>
                    </div>
            </div >
        </>
    )
};
