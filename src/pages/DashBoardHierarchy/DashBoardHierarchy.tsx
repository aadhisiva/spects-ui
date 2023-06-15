import React, { useEffect, useState } from "react";
import { Row, Col, Image, Button } from "antd";
import styles from "./DashBoardHierarchy.module.scss";
import "./DashBoardHierarchy.custom.scss";
import RefractionistImage from "../../assets/Images/DashBoard/refractionist.png";
import StudentImage from "../../assets/Images/DashBoard/student.png";
import BenificiaryImage from "../../assets/Images/DashBoard/benificary.png";
import { TitleBarComponent } from '../../components/common/titleBar';
import { useNavigate } from "react-router-dom";
import classNames from "classnames";
import { useLocation } from "react-router";

const loginData = "state_admin"
const loginArrayData = [
    {
        role: "District Officer",
        color: "#62A76C",
        small: Number(24 / 4),
        image: RefractionistImage,
    },
    {
        role: "Taluk",
        color: "#3399FF",
        small: Number(24 / 4),
        image: BenificiaryImage,
    },
    {
        role: "Sub Center",
        color: "#AC8FF2",
        small: Number(24 / 4),
        image: StudentImage,
    },
    {
        role: "Refractionist",
        color: "#ce7e7e",
        small: Number(24 / 4),
        image: BenificiaryImage,
    }];

type LoginUserI = {
    role: string,
    color: string,
    small: Number,
    image: any
};

export const DashBoardHierarchy: React.FC = (props) => {
    const [loginUser, setLoginUser] = useState<LoginUserI[]>([])
    const naviagte = useNavigate();
    const location = useLocation();
   
    // console.log(location)

    const SwitchLoginData = (loginData: string) => {
        switch (loginData) {
            case "state_admin":
                return setLoginUser(loginArrayData);
            case "district_officer":
                return setLoginUser(loginArrayData.slice(1, 4));
            case "taluk":
                return setLoginUser(loginArrayData.slice(2, 4));
            case "subcenter":
                return setLoginUser(loginArrayData.slice(3, 4));
            default:
                return setLoginUser(loginArrayData.slice(3,4));
        };
    };
    const findLoginName = (loginData: string) => {
        switch (loginData) {
            case "state_admin":
                return "State Admin";
            case "district_officer":
                return "District Officer";
            case "taluk":
                return "Taluk";
            case "subcenter":
                return "Sub Center";
            default:
                return "Refractionist";
        };
    };
    useEffect(() => {
        SwitchLoginData(location.state?.role)
    }, [loginData])

    const handleClick = () => {
        naviagte("/school-tracking")
    };
    const handleClickToNextPage = (role: string) => {
        naviagte("/assignment-list")
    };

    return (
        <>
            <TitleBarComponent title={"DashBoard"} image={true} loginUser={findLoginName(location.state?.role)} />
            <div className={classNames(styles.dashBoardHierarchy, 'dashBoardHierarchy-page')}>
                {/* statistics */}
                <Row>
                    <Col sm={3} xs={24} className={styles.statisticsContainer}>
                        <div className={styles.statistics}>
                            <span className={styles.title}>Statistics</span>
                        </div>
                    </Col>
                    {/* <span className={styles.loginBy}>LOGIN BY : </span>
                    <Col sm={3} xs={24} className={styles.loginConatainer}>
                        <div className={styles.statistics}>
                            <span className={styles.title}>{findLoginName(location.state?.role)}</span>
                        </div>
                    </Col> */}
                </Row>
                <Row justify="space-around" align={"middle"} className={styles.orderItemsContainer}>
                    <Col sm={6} xs={24}>
                        <div className={styles.titleContainer}>
                            <span className={styles.title}>Order</span>
                        </div>
                    </Col>
                    <Col sm={6} xs={24}>
                        <div className={styles.orderItems}>
                            <span className={styles.title}>Total</span>
                            <span className={styles.count}>3000</span>
                        </div>
                    </Col>
                    <Col sm={6} xs={24}>
                        <div style={{ backgroundColor: "#3399FF" }} className={styles.orderItems}>
                            <span className={styles.title}>Delivered</span>
                            <span className={styles.count}>3000</span>
                        </div>
                    </Col>
                    <Col sm={6} xs={24}>
                        <div style={{ backgroundColor: "#AC8FF2" }} className={styles.orderItems}>
                            <span className={styles.title}>Pending</span>
                            <span className={styles.count}>3000</span>

                        </div>
                    </Col>
                </Row>
                {/* Assignemnet  */}

                <Row justify={"start"}>
                    <Col sm={4} xs={24} className={styles.statisticsContainer}>
                        <div className={styles.statistics}>
                            <span className={styles.title}>Assignment</span>
                        </div>
                    </Col>
                </Row>
                <Row justify="space-around" align={"middle"} className={styles.menuItemsContainer}>
                    {loginUser.map((obj, i) => (
                        <Col key={i} sm={Number(obj.small)} xs={24}>
                            <a onClick={(e) =>handleClickToNextPage(obj.role)}>
                            <div style={{ backgroundColor: `${obj.color}` }} className={styles.menuItems}>
                                <Image width={50} height={50} preview={false} src={obj.image} />
                                <p className={styles.title}>{obj.role}</p>
                            </div>
                            </a>
                        </Col>
                    ))}
                </Row>

                {/* Reports */}
                <Row justify={"start"}>
                    <Col sm={4} xs={24} className={styles.statisticsContainer}>
                        <div className={styles.statistics}>
                            <span className={styles.title}>Reports</span>
                        </div>
                    </Col>
                </Row>
                <Row justify="space-around" align={"middle"} className={styles.menuItemsContainer}>
                    {loginUser.map((obj, i) => (
                        <Col key={i} sm={Number(obj.small)} xs={24}>
                            <div style={{ backgroundColor: `${obj.color}` }} className={styles.menuItems}>
                                <Image width={50} height={50} preview={false} src={obj.image} />
                                <p className={styles.title}>{obj.role}</p>
                            </div>
                        </Col>
                    ))}
                </Row>
                {/* <Row justify="space-around" align={"middle"} className={styles.menuItemsContainer}>
                    <Col sm={6} xs={24}>
                        <div className={styles.menuItems}>
                            <Image width={50} height={50} preview={false} src={RefractionistImage} />
                            <p className={styles.title}>Refractionist Assignment</p>
                        </div>
                    </Col>
                    <Col sm={6} xs={24}>
                        <div style={{ backgroundColor: "#3399FF" }} className={styles.menuItems}>
                            <Image width={50} height={55} preview={false} src={BenificiaryImage} />
                            <p className={styles.title}>Beneficiary Tracking</p>
                        </div>
                    </Col>
                    <Col sm={6} xs={24}>
                        <div style={{ backgroundColor: "#AC8FF2" }} className={styles.menuItems}>
                            <Image width={50} height={55} preview={false} src={StudentImage} />
                            <p className={styles.title}>Student Tracking</p>
                        </div>
                    </Col>
                </Row> */}
                <Button type="primary" onClick={handleClick}>
                    next
                </Button>
            </div>
        </>
    );
};

