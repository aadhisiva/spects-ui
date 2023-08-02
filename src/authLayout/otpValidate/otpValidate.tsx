import React, { Dispatch, FC, MutableRefObject, useRef, useState } from 'react'
import { CustomCaptch } from '../../components/common/cutomCaptch/customCaptch'
import { Button, Col, Form, Input, Row, Space } from 'antd'
import { t } from 'i18next'
import { TimingsShow } from '../../components/common/Timers/timings'
import { LOGIN_APIS } from '../../api/apisSpectacles'
import { NotificationError, NotificationSuccess } from '../../components/common/Notifications/Notifications'
import { verifyOTP } from '../../redux/features/authSlice'
import { useDispatch } from 'react-redux'


type TOtpValidate = {
    isLoginCLick: boolean,
    state: any,
    styles: any
}
export const OtpValidate: FC<TOtpValidate> = ({
    isLoginCLick,
    state,
    styles
}) => {
    const [minutes, setMinutes] = useState(1);
    const [seconds, setSeconds] = useState(60);
    const [isClickResend, SetClickResend] = useState(true);
    const inputRef: any = useRef();

    const [captch, setFreshCaptch] = useState("");
    const [captchValue, setCaptchaValue] = useState('');

    const dispatch: Dispatch<any> = useDispatch();

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

    const onFinish = async () => {
        let body = {
            mobile_number: state.mobile_number,
            type: state.role,
            otp: inputRef.current.input.value
        };
        let originalCaptcha = captch.split(" ").join("");
        if(captchValue.length !== 6){
            alert("Please enter correct captch.")
        }
        // captch checking here
        if (originalCaptcha !== captchValue) {
            alert("Captha Failed. Please try again") 
            return;
        }
        dispatch(verifyOTP(body));
    };
    return (
        <div>
            <Form
                onFinish={onFinish}
            >
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
                        ref={inputRef}
                        name={"otp"}
                        maxLength={6}
                        autoComplete={"off"}
                        value={state.otp}
                    />
                </Form.Item>
                <CustomCaptch setFreshCaptch={setFreshCaptch} setCaptchaValue={setCaptchaValue} captch={captch} captchValue={captchValue} />
                <Row>
                    <Col sm={12} xs={12} className={styles.buttonPlace}>
                        <Button disabled={isClickResend ? minutes == 0 && seconds == 0 : false} type="primary" htmlType="submit">
                            {t("LOGIN")}
                        </Button>
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
    )
}
