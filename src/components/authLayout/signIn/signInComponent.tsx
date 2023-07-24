import React, { Dispatch, useEffect, useState } from 'react'
import { Row, Col, Form, Button, Space, Select, Input, Spin } from "antd";
import { useSelector, useDispatch } from "react-redux"
import { loginUser, verifyOTP, TLoginUser } from '../../../redux/actions/userActions';
import { dispatchStore, IStoreType } from '../../../redux/store';

import styles from "./signInComponent.module.scss";
import { TitleBarComponent } from '../../common/titleBar';
import "./signInComponent.custom.scss";
import { InputFeild } from '../../common/InputFeild';
import { useNavigate } from "react-router-dom";
import classNames from "classnames";
import { LOGIN_APIS, SESSION_GET_APIS } from '../../../api/apisSpectacles';
import { NotificationError, NotificationSuccess } from '../../common/Notifications/Notifications';
import { useTranslation } from 'react-i18next';
import { SessionTimeout } from '../Sessions/SessionTimeout';
import axios from 'axios';
import { TimingsShow } from '../../common/Timers/timings';

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
  });
  const [minutes, setMinutes] = useState(1);
  const [seconds, setSeconds] = useState(60);
  const [isClickResend, SetClickResend] = useState(true);

  // redux-snippets
  // const dispatch  = useDispatch();
  const { isUserVerified } = useSelector((state: IStoreType) => state.user);
  // const storedata = useSelector((state: IStoreInfo) => state);
  // const { isUserVerified } = storedata;
  // console.log("##isUserVerified: ", storedata);

  // transalation
  const { t } = useTranslation();
  //navigation
  const navigate = useNavigate();

  const onFinish = async () => {
    if (!isUserVerified) {
      let body: any = {
        mobile_number: state.mobile_number,
        type: state.role
      }
      // dispatch(loginUser({ ...body }));
      dispatchStore(loginUser(body));
      // let LoginData = await LOGIN_APIS("login", body);
      // if (LoginData.code == 200) {
      //   setLogin(true);
      //   NotificationSuccess(LoginData.message);
      // } else {
      //   setLogin(false);
      //   NotificationError(LoginData.message);
      // }
    } else {
      let body: any = {
        mobile_number: state.mobile_number,
        type: state.role,
        otp: state.otp
      };

      dispatchStore(verifyOTP(body, () => navigate("/dashboard", { replace: true})));
      // let checkLoginData = await LOGIN_APIS("otp_check", body);
      // if (checkLoginData.code == 200) {
      //   let localStoreData = { ...checkLoginData.data, ...{ type: state.role } };
      //   localStorage.setItem('login_user', JSON.stringify(localStoreData));
      //   NotificationSuccess(checkLoginData.message);
      //   navigate("/dashboard");
      // } else {
      //   NotificationError(checkLoginData.message);
      // }
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

  // useEffect(() => {
  //   (async function () {
  //     let data = await SESSION_GET_APIS('session');
  //     console.log("data?.login", data?.login)
  //     if (data?.login == 200) navigate('/dashboard');
  //     else navigate('/signin');
  //   })()
  // }, []);


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
                  required={true}
                  rules={[{ required: true, message: 'Please input your Role!' }]}
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
                  required={true}
                  tabIndex={2}
                  onChange={(e: any) => handleChange(e)}
                  name={"mobile_number"}
                  value={state.mobile_number}
                  label={t("MOBILE_NUMBER")}
                  autoComplete={"off"}
                />
                {isUserVerified ? (
                  <Form.Item
                    labelCol={{ span: 10 }}
                    wrapperCol={{ span: 12 }}
                    label={t("OTP")}
                    name={"otp"}
                    rules={[
                      { required: true, message: `Please input your otp!` },
                      {
                        pattern: /^[0-9]{1,6}$/,
                        message: `Please enter a valid otp`,
                      }
                    ]}
                  >
                    <Input
                      required={true}
                      type={"number"}
                      tabIndex={3}
                      onChange={(e: any) => handleChange(e)}
                      name={"otp"}
                      maxLength={6}
                      autoComplete={"off"}
                      value={state.otp}
                    />
                  </Form.Item>
                ) : ("")}
                <Row >
                  <Col sm={12} xs={12} className={styles.buttonPlace}>
                    {(!isUserVerified) ? (
                      <Button disabled={seconds == 0 || minutes == 0} type="primary" htmlType="submit">
                        {t("SEND_OTP")}
                      </Button>
                    ) : (
                      <Button disabled={isClickResend ? minutes == 0 && seconds == 0 : false} type="primary" htmlType="submit">
                        {t("LOGIN")}
                      </Button>
                    )}
                  </Col>
                  {(isUserVerified) ? (
                    <Col sm={11} xs={11} className={styles.buttonPlace}>
                      <Space>
                        <a className={styles.resendOtp} style={{ pointerEvents: (minutes == 0 && seconds == 0) ? 'auto' : "none" }} onClick={handleClickResendOtp}>{t("RESEND_OTP")}</a>
                        <TimingsShow isLogin={isUserVerified} styles={styles} setSecondsDup={setMinutes} setMinutesDup={setSeconds} />
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
