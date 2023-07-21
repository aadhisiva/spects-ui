import React, { useEffect, useState } from "react";
import { Row, Col, Image, Button } from "antd";
import styles from "./DashBoardHierarchy.module.scss";
import "./DashBoardHierarchy.custom.scss";
import RefractionistImage from "../../assets/Images/DashBoard/refractionist.png";
import BenificiaryImage from "../../assets/Images/DashBoard/benificary.png";
import { TitleBarComponent } from '../../components/common/titleBar';
import { useNavigate } from "react-router-dom";
import classNames from "classnames";
import { findLoginName } from "../../utilities/reUsableFun";
import { GET_APIS, SESSION_GET_APIS } from "../../components/api/apisSpectacles";
import { NotificationError } from "../../components/common/Notifications/Notifications";
import { useTranslation } from "react-i18next";
import { SessionTimeout } from "../../components/authLayout/Sessions/SessionTimeout";

const loginArrayData = [
    {
        role: "District Officer",
        color: "#62A76C",
        name: "district",
        small: Number(24 / 3),
        image: RefractionistImage,
    },
    {
        role: "Taluka",
        color: "#3399FF",
        name: "taluka",
        small: Number(24 / 3),
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
        small: Number(24 / 3),
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

    // authentication
    const [isAuthenticated, setAuth] = useState(false);

    //timer
    const [minutes, setMinutes] = useState(59);
    const [seconds, setSeconds] = useState(60);

    const {t} = useTranslation();
    const navigate = useNavigate();

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
            let all = await GET_APIS("get_orders_count", loginBY?.token);
            let delivered = await GET_APIS("delivered", loginBY?.token);
            let pending = await GET_APIS("pending", loginBY?.token);
            if(all.code == 200){
                setAllCount(all?.data[0]?.count)
                setPendingCount(pending?.data[0]?.count)
                setDeliveredCount(delivered?.data[0]?.count)
            }
        })()
    },[])

    useEffect(() => {
          const interval = setInterval(() => {
            if (seconds > 0) {
              setSeconds(seconds - 1);
            }
    
            if (seconds === 0) {
              if (minutes === 0) {
                clearInterval(interval);
              } else {
                setSeconds(59);
                setMinutes(minutes - 1);
              }
            }
          }, 1000);
          return () => {
            clearInterval(interval);
          };
      }, [seconds]);

    useEffect(() => {
        SwitchLoginData(findLoginName());
    }, [loginBY])

    const handleClickToNextPage = (role: string, path: string) => {
        navigate(path, {state: role});
    };

    const SessionTimer = () => {
        return <>
        {seconds > 0 || minutes > 0 ? (
            <>
              <span className={styles.timer}>
                {minutes < 10 ? `0${minutes}` : minutes}:
                {seconds < 10 ? `0${seconds}` : seconds}
              </span>
            </>
          ) : ("")}
          </>
    };

    const handleClick = () => {
        // localStorage.removeItem('login_user');
        setAuth(false);
    }

    return (
        <>
            <SessionTimeout isAuthenticated={isAuthenticated} logOut={handleClick} />
            <TitleBarComponent title={t("DASHBOARD")} image={true} timer={<SessionTimer />} />
            <div className={classNames(styles.dashBoardHierarchy, 'dashBoardHierarchy-page')}>
                {/* statistics */}
                <Row>
                    <Col sm={3} xs={24} className={styles.statisticsContainer}>
                        <div className={styles.statistics}>
                            <span className={styles.title}>{t("STATISTICS")}</span>
                        </div>
                    </Col>
                </Row>
                <Row justify="space-around" align={"middle"} className={styles.orderItemsContainer}>
                    <Col sm={6} xs={24}>
                        <div className={styles.titleContainer}>
                            <span className={styles.title}>{t("ORDERS")}</span>
                        </div>
                    </Col>
                    <Col sm={6} xs={24}>
                        <div className={styles.orderItems}>
                            <span className={styles.title}>{t("TOTAL")}</span>
                            <span className={styles.count}>{allCount}</span>
                        </div>
                    </Col>
                    <Col sm={6} xs={24}>
                        <div style={{ backgroundColor: "#3399FF" }} className={styles.orderItems}>
                            <span className={styles.title}>{t("DELIVERED")}</span>
                            <span className={styles.count}>{deliveredCount}</span>
                        </div>
                    </Col>
                    <Col sm={6} xs={24}>
                        <div style={{ backgroundColor: "#AC8FF2" }} className={styles.orderItems}>
                            <span className={styles.title}>{t("PENDING")}</span>
                            <span className={styles.count}>{pendingCount}</span>

                        </div>
                    </Col>
                </Row>
                {/* Assignemnet  */}

                <Row justify={"start"}>
                    <Col sm={4} xs={24} className={styles.statisticsContainer}>
                        <div className={styles.statistics}>
                            <span className={styles.title}>{t("ASSIGNMENT")}</span>
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
                            <span className={styles.title}>{t("REPORTS")}</span>
                        </div>
                    </Col>
                </Row>
                <Row justify="space-around" align={"middle"} className={styles.menuItemsContainer}>
                        <Col sm={8} xs={24}>
                            <a onClick={(e) => navigate("/reports-list")}>
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

