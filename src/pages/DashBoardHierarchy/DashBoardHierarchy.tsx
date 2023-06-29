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
import { findLoginName } from "../../utilities/reUsableFun";
import { GET_APIS } from "../../components/api/apisSpectacles";
import { NotificationError } from "../../components/common/Notifications/Notifications";

const loginArrayData = [
    {
        role: "District Officer",
        color: "#62A76C",
        name: "district",
        small: Number(24 / 4),
        image: RefractionistImage,
    },
    {
        role: "Taluka",
        color: "#3399FF",
        name: "taluka",
        small: Number(24 / 4),
        image: BenificiaryImage,
    },
    // {
    //     role: "Sub Center",
    //     color: "#AC8FF2",
    //     small: Number(24 / 4),
    //     image: StudentImage,
    // },
    {
        role: "Refractionist",
        color: "#ce7e7e",
        name: "refraction",
        small: Number(24 / 4),
        image: BenificiaryImage,
    }];

type LoginUserI = {
    role: string,
    color: string,
    small: Number,
    image: any,
    name: string
};

export const DashBoardHierarchy: React.FC = (props) => {
    const [loginBY, setLoginBy] = useState(findLoginName());
    const [loginUser, setLoginUser] = useState<LoginUserI[]>([])
    const [pendingCount, setPendingCount] = useState(0);
    const [deliveredCount, setDeliveredCount] = useState(0);
    const [allCount, setAllCount] = useState(0);
    const naviagte = useNavigate();

    const SwitchLoginData = (loginData: any) => {
        switch (loginData?.type) {
            case "State Admin":
                return setLoginUser(loginArrayData);
            case "District Officer":
                return setLoginUser(loginArrayData.slice(1, 3));
            case "Taluka":
                return setLoginUser(loginArrayData.slice(2, 3));
            case "Sub Centre":
                return setLoginUser(loginArrayData.slice(3, 3));
            default:
                return setLoginUser(loginArrayData.slice(3, 3));
        };
    };
    useEffect(()=> {
        ( async () => {
            let all = await GET_APIS("get_orders_count");
            let delivered = await GET_APIS("delivered");
            let pending = await GET_APIS("pending");
            if(all.code == 200){
                setAllCount(all.data)
                setPendingCount(pending.data)
                setDeliveredCount(delivered.data)
            } else {
                NotificationError("please try again.")
            }
        })()
    },[])

    useEffect(() => {
        SwitchLoginData(findLoginName());
    }, [loginBY])

    const handleClick = () => {
        naviagte("/school-tracking")
    };
    const handleClickToNextPage = (role: string, path: string) => {
        naviagte(path, {state: role});
    };

    return (
        <>
            <TitleBarComponent title={"DashBoard"} image={true} />
            <div className={classNames(styles.dashBoardHierarchy, 'dashBoardHierarchy-page')}>
                {/* statistics */}
                <Row>
                    <Col sm={3} xs={24} className={styles.statisticsContainer}>
                        <div className={styles.statistics}>
                            <span className={styles.title}>Statistics</span>
                        </div>
                    </Col>
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
                            <span className={styles.count}>{allCount}</span>
                        </div>
                    </Col>
                    <Col sm={6} xs={24}>
                        <div style={{ backgroundColor: "#3399FF" }} className={styles.orderItems}>
                            <span className={styles.title}>Delivered</span>
                            <span className={styles.count}>{deliveredCount}</span>
                        </div>
                    </Col>
                    <Col sm={6} xs={24}>
                        <div style={{ backgroundColor: "#AC8FF2" }} className={styles.orderItems}>
                            <span className={styles.title}>Pending</span>
                            <span className={styles.count}>{pendingCount}</span>

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
                            <a onClick={(e) => handleClickToNextPage(obj.name, "/assignment-list")}>
                                <div style={{ backgroundColor: `${obj.color}` }} className={styles.menuItems}>
                                    <Image width={47} height={44} preview={false} src={obj.image} />
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
                        <Col sm={8} xs={24}>
                            <a onClick={(e) => naviagte("/reports-list")}>
                                <div style={{ backgroundColor: "#62A76C" }} className={styles.menuItems}>
                                    <Image width={50} height={50} preview={false} src={BenificiaryImage} />
                                    <p className={styles.title}>{"Reports"}</p>
                                </div>
                            </a>
                        </Col>
                </Row>
            </div>
        </>
    );
};

