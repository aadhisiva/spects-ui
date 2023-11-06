import { FC, FormEvent, useState, useEffect, Dispatch, ChangeEvent } from "react";
import { Form, Input, Button, Checkbox, Card, Typography, Select, Row, Col, Space } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import styles from "./signInComponent.module.scss";
import "./signInComponent.custom.scss";
import classNames from "classnames";
import { LoginTitleBarComponent } from "../../components/common/LoginTitleBar";
import { InputFeild } from "../../components/common/InputFeild";
import { useDispatch, useSelector } from "react-redux";
import { IStateValues } from "../../type";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { LoginUser, reset, verifyOTP } from "../../redux/features/authSlice";
import { OtpValidate } from "../otpValidate/otpValidate";

const { Title } = Typography;

type otpInterFace = {
    role: string,
    mobile_number: string,
    otp: string,
}

export const SignInComponent: FC = () => {
    const [state, setState] = useState<otpInterFace>({
        role: "",
        mobile_number: "",
        otp: ""
    });
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
        let body = {
            mobile_number: state.mobile_number,
            type: state.role
        }
        dispatch(LoginUser(body))
    };
    const handleChange = (e: any) => {
        if (!e?.target) return setState((prev: any) => ({
            ...prev,
            role: e
        }));
        setState((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    };

    return (
        <>
            <LoginTitleBarComponent />
            <div className={classNames(styles.signInPage, "signin-page")}>
                <div className={styles.signinConatiner}>
                    <Card className={styles.cardConatiner}>
                        <div className={styles.cardTitle}>
                            <Title level={2}>{t("SIGNIN")}</Title>
                        </div>
                        <hr className={styles.divider} />
                        <Form
                            name="normal_login"
                            className="login-form"
                            initialValues={{ remember: true }}
                            onFinish={onFinish}
                        >
                            <Form.Item
                                name="role"
                                labelCol={{ span: 10 }}
                                wrapperCol={{ span: 12 }}
                                label={t("ROLE")}
                                rules={[{ required: true, message: "Please input your Role!" }]}
                            >
                                <Select
                                    value={state.role}
                                    onChange={(e) => handleChange(e)}
                                >
                                    <Select.Option value="state_admin">{t("STATE_ADMIN")}</Select.Option>
                                    <Select.Option value="district_officer">{t("DISTRICT_HEALTH_OFFICER")}</Select.Option>
                                    <Select.Option value="taluka">{t("TALUKA_HEALTH_OFFICER")}</Select.Option>
                                    <Select.Option value="phco">{t("MEDICAL_OFFICER")}</Select.Option>
                                    <Select.Option value="refractionist">{t("REFRACTIONIST")}</Select.Option>
                                    {/* <Select.Option disabled={true} value="vendor">Vendor (Coming soon)</Select.Option> */}
                                </Select>
                            </Form.Item>
                            <InputFeild
                                type={"text"}
                                required={true}
                                tabIndex={2}
                                onChange={(e: ChangeEvent) => handleChange(e)}
                                name={"mobile_number"}
                                value={state.mobile_number}
                                label={t("MOBILE_NUMBER")}
                                autoComplete={"off"}
                            />
                            <Row>
                                {(!isLoginCLick) && (
                                    <Col sm={12} xs={12} className={styles.buttonPlace}>
                                        <Button type="primary" htmlType="submit">
                                            {t("SEND_OTP")}
                                        </Button>
                                    </Col>
                                )}
                            </Row>

                        </Form>
                        {(isLoginCLick) && (
                            <OtpValidate state={state} styles={styles} isLoginCLick={isLoginCLick} />
                        )}
                    </Card>
                </div>
            </div>
        </>
    );
};

