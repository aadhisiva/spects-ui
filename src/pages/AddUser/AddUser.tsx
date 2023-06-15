import React, { useState } from 'react'
import { TitleBarComponent } from '../../components/common/titleBar'
import styles from "./AddUser.module.scss";
import "./AddUser.custom.scss";
import classNames from "classnames";
import { Button, Cascader, Col, Form, Input, Row, Select, TreeSelect } from 'antd';
import { InputFeild } from '../../components/common/InputFeild';
import { useNavigate } from 'react-router';

export const AddUser = () => {
    const naviage = useNavigate();

    const [componentDisabled, setComponentDisabled] = useState<boolean>(false);
    const handleChange = (e: { target: { value: any; }; }) => {
        console.log(e.target.value)
    };

    const handleClick = (path: string) => {
        naviage(path)
    };

    return (
        <>
            <TitleBarComponent title={"Add User"} image={true} />
            <div className={classNames(styles.addUserPage, "adduser-page")}>
                <div>
                    <Row justify={"center"} className={styles.formContainer}>
                        <Col sm={15} xs={24}>
                            <Form
                                labelCol={{ span: 10 }}
                                wrapperCol={{ span: 10 }}
                                layout="horizontal"
                                disabled={componentDisabled}
                                // style={{ maxWidth: '100%' }}
                                className={styles.form}
                            >
                                <Form.Item label="First Name">
                                    <Input />
                                </Form.Item>
                                <Form.Item label="Last Name">
                                    <Input />
                                </Form.Item>
                                <Form.Item label="Gender">
                                    <Select
                                        value={"Male"}
                                    >
                                        <Select.Option value="demo">Male</Select.Option>
                                        <Select.Option value="demo">Female</Select.Option>
                                        <Select.Option value="demo">Others</Select.Option>
                                    </Select>
                                </Form.Item>
                                <Form.Item label="Phone/Mobile Number">
                                    <Input />
                                </Form.Item>
                                <Form.Item label="Assigned Village">
                                    <Input />
                                </Form.Item>
                                <Form.Item label="Village Code">
                                    <Input />
                                </Form.Item>
                            </Form>
                        </Col>
                    </Row>
                    <div className={styles.footerRow}>
                        <Row>
                            <Col sm={12} xs={12} className={styles.footerLeft}>
                                <Button onClick={(e) =>handleClick("/user-details")}>Back</Button>
                            </Col>
                            <Col sm={12} xs={12} className={styles.footerRight}>
                                <Button onClick={(e) =>handleClick("/beneficiary-details")}>Submit</Button>
                            </Col>
                        </Row>
                    </div>
                </div>

            </div>
        </>
    )
};