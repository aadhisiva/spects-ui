import React from 'react'
import { Col, Form, Modal, Row } from 'antd';
import { ReUseInputFeild } from '../ReUseInputFeild';
import { useLocation } from 'react-router';

type mofdifyModalI = {
    state: any;
    visible: boolean;
    onCancel?: () => void;
    editMode?: boolean,
    districtsData?: any[],
    setRuralOrUrban?: (e: any) => void
}
export const ViewTableData: React.FC<mofdifyModalI> = ({
    state,
    visible,
    onCancel,
    editMode,
    districtsData,
    setRuralOrUrban
}
) => {
    const [form] = Form.useForm();
    const location = useLocation();

    form.setFieldsValue({
        refractionist_name: state.refractionist_name,
        name: state.name,
        phone_number: state.phone_number,
        district: state.district,
        taluka: state.taluka,
        sub_centre: state.sub_centre,
        village: state.village,
        status: state.status,
        details: state.details,
        type: state.type,
    });

    return (
        <div>
            <Modal
                open={visible}
                title={"View Details"}
                cancelText="Cancel"
                onCancel={onCancel}
                centered
                width={1000}
                onOk={() => {
                    form
                        .validateFields()
                        .then(onCancel)
                }}
            >
                <Form
                    form={form}
                    layout="vertical"
                    name="form_in_modal"
                >
                    <Row justify={"space-evenly"}>
                        <Col sm={7} xs={24}>
                            <ReUseInputFeild
                                name={"refractionist_name"}
                                label={"Refractionist Name"}
                                disabled={false}
                            />
                        </Col>
                        <Col sm={7} xs={24}>
                            <ReUseInputFeild
                                name={"name"}
                                label={"Name"}
                                disabled={false}
                            />
                        </Col>
                        <Col sm={7} xs={24}>
                            <ReUseInputFeild
                                name={"phone_number"}
                                label={"Phone Number"}
                                disabled={false}
                            />
                        </Col>
                        <Col sm={7} xs={24}>
                            <ReUseInputFeild
                                name={"type"}
                                label={"Type"}
                                disabled={false}
                            />
                        </Col>
                        <Col sm={7} xs={24}>
                            <ReUseInputFeild
                                name={"details"}
                                label={"Details"}
                                disabled={false}
                            />
                        </Col>
                        <Col sm={7} xs={24}>
                            <ReUseInputFeild
                                name={"district"}
                                label={"District"}
                                disabled={false}
                            />
                        </Col>
                        <Col sm={7} xs={24}>
                            <ReUseInputFeild
                                name={"taluka"}
                                label={"Taluka"}
                                disabled={false}
                            />
                        </Col>
                        <Col sm={7} xs={24}>
                            <ReUseInputFeild
                                name={"sub_centre"}
                                label={"Sub Centre"}
                                disabled={false}
                            />
                        </Col>
                        <Col sm={7} xs={24}>
                            <ReUseInputFeild
                                tabIndex={1}
                                name={"status"}
                                label={"Status"}
                                disabled={false}
                            />
                        </Col>
                    </Row>
                </Form>
            </Modal>
        </div>
    )
};