import { Row, Col, Image, Button } from "antd";
import styles from "./DashboardComponent.module.scss";
import "./DashboardComponent.custom.scss";
import RefractionistImage from "../../assets/Images/DashBoard/refractionist.png";
import StudentImage from "../../assets/Images/DashBoard/student.png";
import BenificiaryImage from "../../assets/Images/DashBoard/benificary.png";
import { TitleBarComponent } from '../../components/common/titleBar';
import { useNavigate } from "react-router-dom";
import classNames from "classnames";

export const DashboardComponent: React.FC = () => {
    const naviagte = useNavigate();

    const handleClick = () => {
        naviagte("/school-tracking")
    };

    return (
        <>
            <TitleBarComponent title={"DashBoard"} image={true} />
            <div className={classNames(styles.dashboardPage, 'dashboard-page')}>
                <Row justify={"space-around"}>
                    <Col sm={24} xs={24} className={styles.statisticsContainer}>
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
                            <span className={styles.title}>Order</span>
                            <span className={styles.count}>3000</span>
                        </div>
                    </Col>
                    <Col sm={6} xs={24}>
                        <div style={{ backgroundColor: "#3399FF" }} className={styles.orderItems}>
                            <span className={styles.title}>Order</span>
                            <span className={styles.count}>3000</span>
                        </div>
                    </Col>
                    <Col sm={6} xs={24}>
                        <div style={{ backgroundColor: "#AC8FF2" }} className={styles.orderItems}>
                            <span className={styles.title}>Order</span>
                            <span className={styles.count}>3000</span>

                        </div>
                    </Col>
                </Row>
                <Row justify="space-around" align={"middle"} className={styles.menuItemsContainer}>
                    <Col sm={6} xs={24}>
                        <div className={styles.menuItems}>
                            <Image width={80} height={70} preview={false} src={RefractionistImage} />
                            <p className={styles.title}>Refractionist Assignment</p>
                        </div>
                    </Col>
                    <Col sm={6} xs={24}>
                        <div style={{ backgroundColor: "#3399FF" }} className={styles.menuItems}>
                            <Image width={80} height={70} preview={false} src={BenificiaryImage} />
                            <p className={styles.title}>Beneficiary Tracking</p>
                        </div>
                    </Col>
                    <Col sm={6} xs={24}>
                        <div style={{ backgroundColor: "#AC8FF2" }} className={styles.menuItems}>
                            <Image width={80} height={70} preview={false} src={StudentImage} />
                            <p className={styles.title}>Student Tracking</p>
                        </div>
                    </Col>
                </Row>
                <Button  type="primary" onClick={handleClick}>
                    next
                </Button>
            </div>
        </>
    );
};

