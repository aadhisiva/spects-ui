import React, { Dispatch, useEffect, useRef, useState } from 'react'
import { Row, Col, Form, Button, Space, Select, Input, Spin } from "antd";
import { useSelector, useDispatch } from "react-redux"
import styles from "./signInComponent.module.scss";
import "./signInComponent.custom.scss";
import { InputFeild } from '../../common/InputFeild';
import { useNavigate } from "react-router-dom";
import classNames from "classnames";
import { LOGIN_APIS, REACT_APP_SITE_KEY, verifyToken } from '../../../api/apisSpectacles';
import { NotificationError, NotificationSuccess } from '../../common/Notifications/Notifications';
import { useTranslation } from 'react-i18next';
import { TimingsShow } from '../../common/Timers/timings';
import { LoginUser, reset, verifyOTP } from '../../../redux/features/authSlice';
import { IStateValues } from '../../../type';
import { LoginTitleBarComponent } from '../../common/LoginTitleBar';
import ReCAPTCHA from 'react-google-recaptcha';

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

  //captch 
  const captchaRef: any = useRef(null);
  // redux-snippets
  const dispatch: Dispatch<any> = useDispatch();

  const userData: any = useSelector((state: IStateValues) => state?.auth);
  const { isLoginCLick, isOtpVerfity } = userData;

  // transalation
  const { t } = useTranslation();
  //navigation
  const navigate = useNavigate();

  useEffect(() => {
    if (isOtpVerfity) {
      navigate("/dashboard", { replace: true });
    }
    dispatch(reset(''));
  }, [isOtpVerfity]);


  const onFinish = async () => {
    if (!isLoginCLick) {
      let body = {
        mobile_number: state.mobile_number,
        type: state.role
      }
      dispatch(LoginUser(body))
    } else {
      let body = {
        mobile_number: state.mobile_number,
        type: state.role,
        otp: state.otp
      };
      //captch capture
      let token = await captchaRef?.current?.executeAsync();
      captchaRef?.current?.reset();
      let valid_token = await verifyToken(token);
      if (!valid_token?.success) return NotificationError("Sorry!! Invalid Captcha");
      dispatch(verifyOTP(body));
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
      <LoginTitleBarComponent />
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
                {isLoginCLick ? (
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
                <ReCAPTCHA sitekey={REACT_APP_SITE_KEY} ref={captchaRef} size='invisible' />
                <Row >
                  <Col sm={12} xs={12} className={styles.buttonPlace}>
                    {(!isLoginCLick) ? (
                      <Button disabled={seconds == 0 || minutes == 0} type="primary" htmlType="submit">
                        {t("SEND_OTP")}
                      </Button>
                    ) : (
                      <Button disabled={isClickResend ? minutes == 0 && seconds == 0 : false} type="primary" htmlType="submit">
                        {t("LOGIN")}
                      </Button>
                    )}
                  </Col>
                  {(isLoginCLick) ? (
                    <Col sm={11} xs={11} className={styles.buttonPlace}>
                      <Space>
                        <a className={styles.resendOtp} style={{ pointerEvents: (minutes == 0 && seconds == 0) ? 'auto' : "none" }} onClick={handleClickResendOtp}>{t("RESEND_OTP")}</a>
                        <TimingsShow isLogin={isLoginCLick} styles={styles} setSecondsDup={setMinutes} setMinutesDup={setSeconds} />
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
