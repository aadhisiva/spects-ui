import React, { useEffect, useState } from 'react'
import { Row, Col, Form, Button, Space, Select, Input, Spin } from "antd";
import styles from "./signInComponent.module.scss";
import { TitleBarComponent } from '../../common/titleBar';
import "./signInComponent.custom.scss";
import { InputFeild } from '../../common/InputFeild';
import { OtpInputFeild } from '../../common/otpInputFeild/OtpInputFeild';
import { useNavigate } from "react-router-dom";
import classNames from "classnames";
import { DECRYPT_APIS, LOGIN_APIS } from '../../api/apisSpectacles';
import { NotificationError, NotificationSuccess } from '../../common/Notifications/Notifications';
import { useTranslation } from 'react-i18next';

type otpInterFace = {
  role: string,
  mobile_number: string,
  otp: string,
}

export const SignInComponent: React.FC = () => {
  const [state, setState] = useState<otpInterFace>({
    role: "",
    mobile_number: "",
    otp: ""
  })
  const [minutes, setMinutes] = useState(1);
  const [seconds, setSeconds] = useState(60);
  const [isLogin, setLogin] = useState(false);
  const [isClickResend, SetClickResend] = useState(true);
  const { t } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLogin) {
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
    }
  }, [seconds, isLogin]);

  const onFinish = async () => {
    if(!isLogin){
      let body: any = {
        mobile_number: state.mobile_number,
        type: state.role
      }
      let LoginData = await LOGIN_APIS("login", body);
      if (LoginData.code == 200) {
        setLogin(true);
        NotificationSuccess(LoginData.message);
      } else {
        setLogin(false);
        NotificationError(LoginData.message);
      }
    } else {
      let body: any = {
        mobile_number: state.mobile_number,
        type: state.role,
        otp: state.otp
      };
      let checkLoginData = await LOGIN_APIS("otp_check", body);
      console.log("checkLoginData",checkLoginData);
      if (checkLoginData.code == 200) {
          delete checkLoginData.data.created_at;
          delete checkLoginData.data.updated_at;
          delete checkLoginData.data.otp;
          delete checkLoginData.data.name;
          delete checkLoginData.data.id;
          delete checkLoginData.data.mobile_number;
        let localStoreData = { ...checkLoginData.data, ...{ type: state.role } };
        localStorage.setItem('login_user', JSON.stringify(localStoreData));
        NotificationSuccess(checkLoginData.message);
        navigate("/dashboard", { replace: true });
      } else {
        NotificationError(checkLoginData.message);
      }
    }
  };

  const onFinishFailed = async () => {
  };

  const handleChange = (e: any) => {
    if (!e?.target) return setState((prev) => ({
      ...prev,
      role: e
    }));
    setState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  };

  const handleClickResendOtp = async () => {
    SetClickResend(false);
    let body: any = {
      mobile_number: state.mobile_number,
      type: state.role
    }
    let resendOtp = await LOGIN_APIS("resend_otp", body);
    if (resendOtp.code == 200) {
      NotificationSuccess(resendOtp.message);
    } else {
      NotificationError(resendOtp.message);
    }
  };


  return (
    <div>
      <TitleBarComponent title={t("LOGIN_PAGE")} image={false} />
      <div className={classNames(styles.signInPage, "signin-page")}>
        <Row justify="space-around" align="middle">
          <Col md={13} xs={24} className={styles.box}>
            <div className={styles.cardDetails}>
              <span className={styles.title}>{t("SIGNIN")}</span>
              <hr className={styles.divider} />
              <Form
                name="basic"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
              >
                <Form.Item
                  labelCol={{ span: 10 }}
                  wrapperCol={{ span: 12 }}
                  label={t("ROLE")}
                  name={"role"}
                >
                  <Select
                    value={state?.role}
                    onChange={(e: any) => handleChange(e)}
                  >
                    <Select.Option value="state_admin">State Admin</Select.Option>
                    <Select.Option value="district_officer">District Officer</Select.Option>
                    <Select.Option value="taluka">Taluka</Select.Option>
                    {/* <Select.Option value="subcenter">Sub Center</Select.Option> */}
                    {/* <Select.Option value="refractionist">Refractionist</Select.Option> */}
                  </Select>
                </Form.Item>
                <InputFeild
                  type={"text"}
                  tabIndex={2}
                  onChange={(e: any) => handleChange(e)}
                  name={"mobile_number"}
                  value={state.mobile_number}
                  label={t("MOBILE_NUMBER")}
                  autoComplete={"off"}
                />
                {isLogin? (
                <Form.Item
                  labelCol={{ span: 10 }}
                  wrapperCol={{ span: 12 }}
                  label={t("OTP")}
                  name={"otp"}
                  rules={[{ required: true, message: 'Please input your OTP!' }]}
                >
                  <Input
                    type={"number"}
                    tabIndex={3}
                    onChange={(e: any) => handleChange(e)}
                    name={"otp"}
                    maxLength={6}
                    autoComplete={"off"}
                    value={state.otp}
                  />
                </Form.Item>
                ): ("")}
                <Row >
                  <Col sm={12} xs={12} className={styles.buttonPlace}>
                    {(!isLogin) ? (
                      <Button disabled={seconds == 0 || minutes == 0} type="primary" htmlType="submit">
                        {t("SEND_OTP")}
                      </Button>
                    ) : (
                        <Button  disabled={isClickResend ? minutes == 0 && seconds == 0: false} type="primary" htmlType="submit">
                          {t("LOGIN")}
                        </Button>
                    )}
                  </Col>
                  {(isLogin) ? (
                    <Col sm={11} xs={11} className={styles.buttonPlace}>
                      <Space>
                        <a className={styles.resendOtp} style={{pointerEvents: (minutes == 0 && seconds == 0)? 'auto': "none"}} onClick={handleClickResendOtp}>{t("RESEND_OTP")}</a>
                        {seconds > 0 || minutes > 0 ? (
                          <> :
                            <span className={styles.timer}>
                              {minutes < 10 ? `0${minutes}` : minutes}:
                              {seconds < 10 ? `0${seconds}` : seconds}
                            </span>
                          </>
                        ) : ("")}
                      </Space>
                    </Col>
                  ) : ("")}
                </Row>
              </Form>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  )
}
