import React, { useEffect, useState } from 'react'
import { Row, Col, Form, Button, Space, Select } from "antd";
import styles from "./signInComponent.module.scss";
import { TitleBarComponent } from '../../common/titleBar';
import "./signInComponent.custom.scss";
import { InputFeild } from '../../common/InputFeild';
import { OtpInputFeild } from '../../common/otpInputFeild/OtpInputFeild';
import { useNavigate } from "react-router-dom";
import classNames from "classnames";
import { DECRYPT_APIS, LOGIN_APIS } from '../../api/apisSpectacles';
import { NotificationError, NotificationSuccess } from '../../common/Notifications/Notifications';
import { findLoginName } from '../../../utilities/reUsableFun';
// import { decryptFront } from '../../../utilities/reUsableFun';
;

type otpInterFace = {
  role: string,
  mobile_number: string,
  otp1: string,
  otp2: string,
  otp3: string,
  otp4: string,
  otp5: string,
  otp6: string,
}

export const SignInComponent: React.FC = () => {
  const [state, setState] = useState<otpInterFace>({
    role: "",
    mobile_number: "",
    otp1: "",
    otp2: "",
    otp3: "",
    otp4: "",
    otp5: "",
    otp6: ""
  })
  const [minutes, setMinutes] = useState(1);
  const [seconds, setSeconds] = useState(60);
  const [isLogin, setLogin] = useState(false);
  const naviagte = useNavigate();

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

  const onFinish = async () => {
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
  };

  const onFinishFailed = async () => {
      let body: any = {
      mobile_number: state.mobile_number,
      type: state.role,
      otp: state.otp1+ state.otp2 + state.otp3 + state.otp4 + state.otp5 + state.otp6
    }
    let checkLoginData = await LOGIN_APIS("otp_check", body);
    if (checkLoginData.code == 200) {
      let body: any = {
        data : checkLoginData.data
      }
      let decryptData: any = await DECRYPT_APIS(body);
      delete decryptData.data.created_at;
      delete decryptData.data.updated_at;
      delete decryptData.data.otp;
      delete decryptData.data.name;
      delete decryptData.data.id;
      delete decryptData.data.mobile_number;
      let localStoreData = {...decryptData.data, ...{type: state.role}};
      localStorage.setItem('login_user', JSON.stringify(localStoreData));
      NotificationSuccess(checkLoginData.message);
      naviagte("/dashboard")
    } else {
      NotificationError(checkLoginData.message);
    }
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

  const handleClickResendOtp = async() => {
    let body: any = {
      mobile_number: state.mobile_number,
      type: state.role
    }
    let resendOtp = await LOGIN_APIS("resend_otp", body);
    if(resendOtp.code == 200){
      // let data = decryptData(resendOtp.data)
        // localStorage.setItem("login_user", data);
      NotificationSuccess(resendOtp.message);
    } else {
      NotificationError(resendOtp.message);
    }
  };

  const inputFocus = (elmnt: any) => {
    if (elmnt.key === "Delete" || elmnt.key === "Backspace") {
      const next = elmnt.target.tabIndex - 2;
      if (next > -1) {
        elmnt.target.form.elements[next].focus()
      };
    } else {
      const next = elmnt.target.tabIndex;
      if (next < 8) {
        elmnt.target.form.elements[next].focus()
      };
    };
  };

  return (
    <div>
      <TitleBarComponent title={"Login Page"} image={false} />
      <div className={classNames(styles.signInPage, "signin-page")}>
        <Row justify="space-around" align="middle">
          <Col md={13} xs={24} className={styles.box}>
            <div className={styles.cardDetails}>
              <span className={styles.title}>Sign In</span>
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
                  label="Role"
                  name={"role"}
                >
                  <Select
                    value={state?.role}
                    onChange={(e: any) => handleChange(e)}
                  >
                    <Select.Option value="state_admin">State Admin</Select.Option>
                    <Select.Option value="district_officer">District Officer</Select.Option>
                    <Select.Option value="taluka">Taluka</Select.Option>
                    <Select.Option value="subcenter">Sub Center</Select.Option>
                    <Select.Option value="refractionist">Refractionist</Select.Option>
                  </Select>
                </Form.Item>
                <InputFeild
                  type={"text"}
                  tabIndex={2}
                  onChange={(e: any) => handleChange(e)}
                  name={"mobile_number"}
                  value={state.mobile_number}
                  label={"Mobile Number"}
                  autoComplete={"off"}
                />
                {(isLogin) ? (
                  <Form.Item
                    labelCol={{ span: 10 }}
                    wrapperCol={{ span:12 }}
                    style={{ maxWidth: "100%" }}
                    label="OTP"
                    name="otp"
                    rules={[{ required: true, message: 'Please input your otp failed!' }]}
                  >
                    {/* <Space> */}
                    <OtpInputFeild
                      type="text"
                      name='otp1'
                      maxLength={1}
                      tabIndex={3}
                      autoComplete="off"
                      value={state?.otp1 || ""}
                      onChange={handleChange}
                      onKeyUp={(e: any) => inputFocus(e)} />
                    <OtpInputFeild
                      type="text"
                      name='otp2'
                      maxLength={1}
                      tabIndex={4}
                      autoComplete="off"
                      value={state?.otp2 || ""}
                      onChange={handleChange}
                      onKeyUp={(e: any) => inputFocus(e)} />
                    <OtpInputFeild
                      type="text"
                      name='otp3'
                      maxLength={1}
                      tabIndex={5}
                      autoComplete="off"
                      value={state?.otp3 || ""}
                      onChange={handleChange}
                      onKeyUp={(e: any) => inputFocus(e)} />
                    <OtpInputFeild
                      type="text"
                      name='otp4'
                      maxLength={1}
                      tabIndex={6}
                      autoComplete="off"
                      value={state?.otp4 || ""}
                      onChange={handleChange}
                      onKeyUp={(e: any) => inputFocus(e)} />
                    <OtpInputFeild
                      type="text"
                      name='otp5'
                      maxLength={1}
                      tabIndex={7}
                      autoComplete="off"
                      value={state?.otp5 || ""}
                      onChange={handleChange}
                      onKeyUp={(e: any) => inputFocus(e)} />
                    <OtpInputFeild
                      type="text"
                      name='otp6'
                      maxLength={1}
                      tabIndex={8}
                      autoComplete="off"
                      value={state?.otp6 || ""}
                      onChange={handleChange}
                      onKeyUp={(e: any) => inputFocus(e)} />
                    {/* </Space>  */}
                  </Form.Item>
                ) : ("")}
                <Row >
                  <Col sm={12} xs={12} className={styles.buttonPlace}>
                    {(!isLogin) ? (
                      <Button type="primary" htmlType="submit">
                        Send OTP
                      </Button>
                    ) : (
                      <Button type="primary" htmlType="submit">
                        Login
                      </Button>
                    )}
                  </Col>
                  {(isLogin) ? (
                    <Col sm={11} xs={11} className={styles.buttonPlace}>
                      <Space>
                        <a className={styles.resendOtp} onClick={handleClickResendOtp}>Resend OTP</a>
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
