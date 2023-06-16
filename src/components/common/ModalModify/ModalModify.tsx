import React from 'react'
import classnames from "classnames";
import styles from "./ModalModify.module.scss";
import "./ModalModify.custom.scss";
import { Form, Input, Modal } from 'antd';
import { InputFeild } from '../InputFeild';
import { ReUseInputFeild } from '../ReUseInputFeild';

type mofdifyModalI = {
    state: any;
    visible: boolean;
    onSave?: any;
    onCancel?: () => void;
}
export const ModalModify: React.FC<mofdifyModalI> = ({
    state,
    visible,
    onSave,
    onCancel
}
) => {
    // console.log("state", state.designation)
    const [form] = Form.useForm();

    form.setFieldsValue({
        name: state.name,
        designation: state.designation,
        contact_number: state.contact_number,
        district: state.district,
        sub_center: state.sub_center,
        taluka: state.taluka,
    });

    return (
        <div className={classnames(styles.modifyPage, 'modify-page')}>
            <Modal
                open={visible}
                title="Modify Data"
                okText="Create"
                cancelText="Cancel"
                onCancel={onCancel}
                onOk={() => {
                    form
                        .validateFields()
                        .then((values) => {
                            form.resetFields();
                            onSave(values);
                        })
                        .catch(info => {
                            console.log('Validate Failed:', info);
                        });
                }}
            >
                <Form
                    form={form}
                    layout="vertical"
                    name="form_in_modal"
                >
                    <ReUseInputFeild
                        tabIndex={1}
                        name={"designation"}
                        label={"Designation"}
                        disabled={true}
                    />
                    <ReUseInputFeild
                        tabIndex={2}
                        name={"name"}
                        label={"Name"}
                        required={true}
                    />
                    <ReUseInputFeild
                        tabIndex={3}
                        name={"contact_number"}
                        label={"Contact Number"}
                        required={true}
                    />
                    <ReUseInputFeild
                        tabIndex={4}
                        name={"district"}
                        label={"District"}
                        disabled={true}
                        
                    />
                    <ReUseInputFeild
                        tabIndex={5}
                        name={"taluka"}
                        label={"Taluka"}
                        disabled={true}
                    />
                    <ReUseInputFeild
                        tabIndex={6}
                        name={"sub_center"}
                        label={"Sub Center"}
                        disabled={true}
                    />
                </Form>
            </Modal>
        </div>
    )
};