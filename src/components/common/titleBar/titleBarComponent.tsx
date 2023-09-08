import React, { Dispatch } from "react";
import styles from "./titleBarComponent.module.scss";
import { Col, Image, Row } from "antd";
import HomeImage from "../../../assets/Images/TitleBar/home.png";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import { useFetchUserData } from "../../../utilities/userDataHook";
import { useDispatch } from "react-redux";
import { LogOut, reset } from "../../../redux/features/authSlice";

type titlePageI = {
  title: string;
  image: boolean;
  loginUser?: string | any;
  timer?: any;
};

export const TitleBarComponent: React.FC<titlePageI> = (props) => {
  // translation
  const { t } = useTranslation();
  // session user data
  const [user] = useFetchUserData();

  // dispatch
  const dispatch: Dispatch<any> = useDispatch();

  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(LogOut());
    dispatch(reset("logout"));
    navigate("/");
  };

  return (
    <div className={styles.titleBarPage}>
      <Row className={styles.titleBarContainer}>
        <Col sm={2} xs={5}>
          {props.image ? (
            <Image
              onClick={() => navigate("/dashboard")}
              preview={false}
              className={styles.image}
              width={25}
              height={25}
              src={HomeImage}
            />
          ) : (
            <span className={styles.image}></span>
          )}
        </Col>
        <Col sm={4} xs={0} className={styles.titleContainer}>
          <span className={styles.title}>{props.title ? props.title : ""}</span>
        </Col>
        {user?.userData ? (
          <Col sm={17} xs={19} className={styles.loginUserContainer}>
            <div className={styles.loginUserTitle}>
              <span>
                {t("WELCOME")}{" "}
                {user?.userData?.type == "state_admin"
                  ? t("STATE_ADMIN")
                  : user?.userData?.type == "district_officer"
                  ? "DLO"
                  : user?.userData?.type == "taluka"
                  ? "TLO"
                  : user?.userData?.type == "phco"
                  ? "PHCO"
                  : "VENDOR"}{" "}
                |{" "}
              </span>
              <span style={{ cursor: "pointer" }} onClick={handleLogout}>
                {t("LOG_OUT")}
              </span>
            </div>
          </Col>
        ) : (
          ""
        )}
      </Row>
    </div>
  );
};
