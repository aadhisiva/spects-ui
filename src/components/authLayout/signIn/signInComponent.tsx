import React, { EventHandler, useEffect, useState } from 'react'
import { Row, Col, Form, Input, Divider, Button, Space, Select } from "antd";
import styles from "./signInComponent.module.scss";
import { TitleBarComponent } from '../../common/titleBar';
import "./signInComponent.custom.scss";
import { InputFeild } from '../../common/InputFeild';
import { OtpInputFeild } from '../../common/otpInputFeild/OtpInputFeild';
import { useNavigate } from "react-router-dom";
import classNames from "classnames";

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
  // const [otp, setOtp] = useState<otpInterFace>({
  //   otp1: "",
  //   otp2: "",
  //   otp3: "",
  //   otp4: "",
  //   otp5: "",
  //   otp6: ""
  // });
  const [otp1, setOtp1] = useState("");
  const [otp2, setOtp2] = useState("");
  const [otp3, setOtp3] = useState("");
  const [otp4, setOtp4] = useState("");
  const [otp5, setOtp5] = useState("");
  const [otp6, setOtp6] = useState("");
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
  const naviagte = useNavigate();

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     if (seconds > 0) {
  //       setSeconds(seconds - 1);
  //     }

  //     if (seconds === 0) {
  //       if (minutes === 0) {
  //         clearInterval(interval);
  //       } else {
  //         setSeconds(59);
  //         setMinutes(minutes - 1);
  //       }
  //     }
  //   }, 1000);

  //   return () => {
  //     clearInterval(interval);
  //   };
  // }, [seconds]);

  const onFinish = () => {
    console.log("onFinish");
  }
  const onFinishFailed = () => {
    console.log("onFinishFailed");
  }

  const handleChange = (e: any) => {
    // debugger
    if (!e?.target) return setState((prev) => ({
      ...prev,
      role: e
    }));
    // console.log("value", e.target.value)
    // console.log("name", e.target.name)
    setState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  };

  // console.log("ot[", otp1 + otp2 + otp3 + otp4 + otp5 + otp6)
  // console.log("sds", state)

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

  const handleClick = () => {
    naviagte("/dashboard", {state: state})
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
                  wrapperCol={{ span: 8 }}
                  label="Role"
                  name={"role"}
                >
                  <Select
                    value={state?.role}
                    onChange={(e: any) => handleChange(e)}
                  >
                    <Select.Option value="state_admin">State Admin</Select.Option>
                    <Select.Option value="district_officer">District Officer</Select.Option>
                    <Select.Option value="taluk">Taluk</Select.Option>
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
                <Form.Item
                  labelCol={{ span: 10 }}
                  wrapperCol={{ span: 8 }}
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
                <Row >
                  <Col sm={12} xs={12} className={styles.buttonPlace}>
                    <Button type="primary" htmlType="submit" onClick={handleClick}>
                      Send OTP
                    </Button>
                  </Col>
                  <Col sm={11} xs={11} className={styles.buttonPlace}>
                    <Space>
                      <a className={styles.resendOtp}>Resend OTP</a>
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
                </Row>
              </Form>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  )
}
