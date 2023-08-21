import React from 'react'
import classnames from "classnames";
import styles from "./ModalModify.module.scss";
import "./ModalModify.custom.scss";
import { Form, Modal, Select, Spin } from 'antd';
import { ReUseInputFeild } from '../ReUseInputFeild';
import { useLocation } from 'react-router';
import { Option } from 'antd/es/mentions';

type mofdifyModalI = {
    state: any;
    visible: boolean;
    onSave?: any;
    onCancel?: () => void;
    editMode?: boolean,
    loading?: boolean,
    setRuralOrUrban?: (e: any) => void
}
export const ModalModify: React.FC<mofdifyModalI> = ({
    state,
    visible,
    onSave,
    onCancel,
    editMode,
    setRuralOrUrban
}
) => {
    const [form] = Form.useForm();
    const location = useLocation();

    form.setFieldsValue({
        refractionist_name: editMode? state.refractionist_name: "",
        refractionist_mobile: editMode? state.refractionist_mobile: "",
        name: state.name,
        mobile_number: state.mobile_number,
        district: state.district,
        rural_urban: state.rural_urban,
        taluka: state.taluka,
        sub_centre: state.sub_centre,
        village: state.village,
        health_facility: state.health_facility,
    });

const renderForm = () => (
    <div className={classnames(styles.modifyPage, 'modify-page')}>
    <Modal
        open={visible}
        title={(editMode) ? "Modify Data" : "Add New"}
        okText={(editMode) ? "Update" : "Create"}
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
            {location.state == "refraction" ? (
                <>
                    <ReUseInputFeild
                        tabIndex={1}
                        name={"refractionist_name"}
                        label={"Refractionist Name"}
                        required={true}
                        regex={true}
                    />
                    <ReUseInputFeild
                        tabIndex={3}
                        name={"refractionist_mobile"}
                        label={"Refractionist Mobile Number"}
                        required={true}
                        regex={true}
                    />
                </>
            ) : (
                <>
                    <ReUseInputFeild
                        tabIndex={1}
                        name={"name"}
                        label={"Name"}
                        required={true}
                        regex={true}
                    />
                    <ReUseInputFeild
                        tabIndex={3}
                        name={"mobile_number"}
                        label={"Mobile Number"}
                        required={true}
                        regex={true}
                    />
                </>
            )}
            <Form.Item
                name={"rural_urban"}
                label="Rural/Urban"
            >
                <Select
                    placeholder="Rural/Urban"
                    disabled={true}
                    onChange={setRuralOrUrban}
                >
                    <Option value="">--select--</Option>
                    <Option value="rural">Rural</Option>
                    <Option value="urban">Urban</Option>
                </Select>
            </Form.Item>
            <Form.Item
                name={"district"}
                label="District"
            >
                <Select
                    placeholder="Rural/Urban"
                    disabled
                >
                    <Option>--select--</Option>
                </Select>
            </Form.Item>
            {location.state !== "district" ? (
                <>
                    <Form.Item
                        name={"taluka"}
                        label="Taluka"
                    >
                        <Select
                            placeholder="Taluka"
                            disabled
                        >
                            <Option>--select--</Option>
                        </Select>
                    </Form.Item>
                    {location.state !== "taluka" ? (
                        <>
                                <ReUseInputFeild
                                    tabIndex={6}
                                    name={"health_facility"}
                                    label={"PHC/Health Facility)"}
                                    disabled={true}
                                />
                                {location.state !== "phco" ?(
                                    <>
                                    <ReUseInputFeild
                                        tabIndex={6}
                                        name={"sub_centre"}
                                        label={"Sub Centre"}
                                        disabled={true}
                                    />
                                    <ReUseInputFeild
                                        tabIndex={6}
                                        name={"village"}
                                        label={"Village/Ward"}
                                        disabled={true}
                                    />
                                    </>
                                ): ("")}
                        </>
                    ) : ("")}
                </>
            ) : ("")}
        </Form>
    </Modal>
</div>
)

    return (
        <>{renderForm()}</>
    )
};