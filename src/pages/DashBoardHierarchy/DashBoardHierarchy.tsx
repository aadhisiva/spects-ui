import React, { useEffect, useState, Dispatch } from "react";
import { Row, Col, Image } from "antd";
import styles from "./DashBoardHierarchy.module.scss";
import "./DashBoardHierarchy.custom.scss";
import RefractionistImage from "../../assets/Images/DashBoard/refractionist.png";
import BenificiaryImage from "../../assets/Images/DashBoard/benificary.png";
import SchoolImage from "../../assets/Images/DashBoard/school.png";
import { TitleBarComponent } from "../../components/common/titleBar";
import { useNavigate } from "react-router-dom";
import classNames from "classnames";
import { GET_APIS, POSTAPIS_WITH_AUTH } from "../../api/apisSpectacles";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { getMe } from "../../redux/features/authSlice";
import { IStateValues } from "../../type";
import { PhocLoginFirstTIme } from "../../components/common/phcoLoginFirstTime/phocLoginFirstTIme";
import { NotificationError } from "../../components/common/Notifications/Notifications";

const loginArrayData = [
  {
    role: "District",
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
  {
    role: "PHCO",
    color: "#AC8FF2",
    name: "phco",
    small: Number(24 / 4),
    image: BenificiaryImage,
  },
  {
    role: "Refractionist",
    color: "#ce7e7e",
    name: "refraction",
    small: Number(24 / 4),
    image: BenificiaryImage,
  },
];

type LoginUserI = {
  role: string;
  color: string;
  small: Number;
  image: any;
  name: string;
};

export const DashBoardHierarchy: React.FC = (props) => {
  // phco login is first time or not
  const [isPhcoLoginFirstTime, setPhcoLoginFirstTime] =
    useState<boolean>(false);

  const [loginUser, setLoginUser] = useState<LoginUserI[]>([]);
  const [pendingCount, setPendingCount] = useState(0);
  const [deliveredCount, setDeliveredCount] = useState(0);
  const [allCount, setAllCount] = useState(0);

  const userStore: any = useSelector((state: IStateValues) => state?.auth);
  const { isError, user } = userStore;
  //redux session
  // const [userData] = useFetchUserData();
  const token = user?.userData?.token;

  const dispatch: Dispatch<any> = useDispatch();
  // translation
  const { t } = useTranslation();
  // navigate
  const navigate = useNavigate();

  useEffect(() => {
    if (isError) {
      navigate("/signin");
    }
  }, [isError, navigate]);

  useEffect(() => {
    dispatch(getMe(""));
  }, [dispatch]);

  const SwitchLoginData = (loginData: any) => {
    switch (loginData) {
      case "state_admin":
        return setLoginUser(loginArrayData);
      case "district_officer":
        return setLoginUser(loginArrayData.slice(1, 4));
      case "taluka":
        return setLoginUser(loginArrayData.slice(2, 4));
      case "phco":
        return setLoginUser(loginArrayData.slice(3, 4));
      default:
        return setLoginUser(loginArrayData.slice(4, 4));
    }
  };
  const type = user?.userData?.type;
  const bodyData: any = {
    codes: user?.userData?.codes,
    type: user?.userData?.type,
  };

  const GetCounts = async () => {
    if (type == "district_officer") {
      let result = await POSTAPIS_WITH_AUTH(
        `get_orders_count`,
        bodyData,
        token
      );
      let delivered = await POSTAPIS_WITH_AUTH("delivered", bodyData, token);
      let pending = await POSTAPIS_WITH_AUTH("pending", bodyData, token);
      if (result.code == 200) {
        setAllCount(result?.data[0]?.count);
        setPendingCount(pending?.data[0]?.count);
        setDeliveredCount(delivered?.data[0]?.count);
      } else {
        NotificationError(result.message);
      }
    } else if (type == "taluka") {
      let result = await POSTAPIS_WITH_AUTH(
        `get_orders_count`,
        bodyData,
        token
      );
      let delivered = await POSTAPIS_WITH_AUTH("delivered", bodyData, token);
      let pending = await POSTAPIS_WITH_AUTH("pending", bodyData, token);
      if (result.code == 200) {
        setAllCount(result?.data[0]?.count);
        setPendingCount(pending?.data[0]?.count);
        setDeliveredCount(delivered?.data[0]?.count);
      } else {
        NotificationError(result.message);
      }
    } else if (type == "phco") {
      let result = await POSTAPIS_WITH_AUTH(
        `get_orders_count`,
        bodyData,
        token
      );
      let delivered = await POSTAPIS_WITH_AUTH("delivered", bodyData, token);
      let pending = await POSTAPIS_WITH_AUTH("pending", bodyData, token);
      if (result.code == 200) {
        setAllCount(result?.data[0]?.count);
        setPendingCount(pending?.data[0]?.count);
        setDeliveredCount(delivered?.data[0]?.count);
      } else {
        NotificationError(result.message);
      }
    } else {
      let result = await GET_APIS(`get_orders_count`, token);
      let delivered = await POSTAPIS_WITH_AUTH("delivered", bodyData, token);
      let pending = await POSTAPIS_WITH_AUTH("pending", bodyData, token);
      if (result.code == 200) {
        setAllCount(result?.data[0]?.count);
        setPendingCount(pending?.data[0]?.count);
        setDeliveredCount(delivered?.data[0]?.count);
      } else {
        NotificationError(result.message);
      }
    }
  };

  useEffect(() => {
    (async () => {
      if (token !== undefined) {
        await GetCounts();
      }
    })();
  }, [token]);

  useEffect(() => {
    if (user?.userData?.isIntialLogin == "Y") {
      setPhcoLoginFirstTime(true);
    } else {
      setPhcoLoginFirstTime(false);
    }
  }, [user?.userData?.isIntialLogin]);

  useEffect(() => {
    SwitchLoginData(user?.userData?.type);
  }, [user?.success]);

  const handleClickToNextPage = (role: string, path: string) => {
    navigate(path, { state: role });
  };

  const handleCancel = () => {
    setPhcoLoginFirstTime(false);
  };

  const handleSuccess = () => {
    dispatch(getMe(""));
    // setPhcoLoginFirstTime(false);
  };

  const length: number = loginUser?.length == 2 ? 3 : 4;
  return (
    <>
      {isPhcoLoginFirstTime && (
        <PhocLoginFirstTIme
          open={isPhcoLoginFirstTime}
          setOpen={handleCancel}
          onSave={handleSuccess}
        />
      )}
      <TitleBarComponent title={t("DASHBOARD")} image={true} />
      <div
        className={classNames(
          styles.dashBoardHierarchy,
          "dashBoardHierarchy-page"
        )}
      >
        {/* statistics container */}
        <Row>
          {user?.userData?.type !== "state_admin" ? (
            <Col sm={12} md={12} xs={24} className={styles.statisticsLoginUser}>
              <div className={styles.statistics}>
                <span className={styles.title}>
                  {user?.userData?.loginName}
                </span>
              </div>
            </Col>
          ) : (
            ""
          )}
          <Col sm={4} xs={24} className={styles.statisticsContainer}>
            <div className={styles.statistics}>
              <span className={styles.title}>{t("STATISTICS")}</span>
            </div>
          </Col>
          {user?.userData?.type !== "state_admin" ? (
            <Col md={10} xs={24} className={styles.userName}>
              <div className={styles.statistics}>
                <span className={styles.title}>
                  {user?.userData?.loginName}
                </span>
              </div>
            </Col>
          ) : (
            ""
          )}
        </Row>
        <Row
          justify="space-around"
          align={"middle"}
          className={styles.orderItemsContainer}
        >
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
            <div
              style={{ backgroundColor: "#3399FF" }}
              className={styles.orderItems}
            >
              <span className={styles.title}>{t("DELIVERED")}</span>
              <span className={styles.count}>{deliveredCount}</span>
            </div>
          </Col>
          <Col sm={6} xs={24}>
            <div
              style={{ backgroundColor: "#AC8FF2" }}
              className={styles.orderItems}
            >
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
        <Row
          justify="space-around"
          align={"middle"}
          className={styles.menuItemsContainer}
        >
          {loginUser.map((obj, i) => (
            <Col key={i} xl={24 / length} xs={24}>
              <a
                onClick={(e) =>
                  handleClickToNextPage(obj.name, "/assignment-list")
                }
              >
                <div
                  style={{ backgroundColor: `${obj.color}` }}
                  className={styles.menuItems}
                >
                  <Image
                    width={60}
                    height={50}
                    preview={false}
                    src={obj.image}
                  />
                  <p className={styles.title}>
                    {obj.role == "District"
                      ? t("TABLE_DISTRICT")
                      : obj.role == "Taluka"
                      ? t("TABLE_TALUKA")
                      : obj.role == "PHCO"
                      ? t("PHCO_CARD")
                      : t("REFRACTIONIST_TABLE")}{" "}
                  </p>
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
        <Row
          justify="space-around"
          align={"middle"}
          className={styles.menuItemsContainer}
        >
          <Col md={7} xs={24}>
            <a onClick={(e) => navigate("/reports-list")}>
              <div
                style={{ backgroundColor: "#62A76C" }}
                className={styles.menuItems}
              >
                <Image
                  width={60}
                  height={50}
                  preview={false}
                  src={BenificiaryImage}
                />
                <p className={styles.title}>{t("SECONDARY_SCREENING_LIST")}</p>
                {/* <p className={styles.title}>{"Secondary Screening Reports "}</p> */}
              </div>
            </a>
          </Col>
          {/* <Col sm={7} xs={24}>
            <a onClick={(e) => navigate("/school-primary-screening-list")}>
              <div
                style={{ backgroundColor: "#ce7e7e" }}
                className={styles.menuItems}
              >
                <Image
                  width={60}
                  height={50}
                  preview={false}
                  src={SchoolImage}
                />
                <p className={styles.title}>{"School Secondary Screening Reports"}</p>
              </div>
            </a>
          </Col> */}
          {/* {user?.userData?.type == "phco" && */}
          {/* user?.userData?.isIntialLogin !== "Y" ? ( */}
          <Col md={7} xs={24}>
            <a onClick={(e) => navigate("/primary-screening-list")}>
              <div
                style={{ backgroundColor: "#7c4a4a" }}
                className={styles.menuItems}
              >
                <Image
                  width={60}
                  height={50}
                  preview={false}
                  src={BenificiaryImage}
                />
                <p className={styles.title}>{t("PRIMARY_SCREENING_LIST")}</p>
              </div>
            </a>
          </Col>
          {/* ) : (
            ""
          )} */}
        </Row>
      </div>
    </>
  );
};
