import React from "react";
import { Col, Form, Modal, Row, Image } from "antd";
import { ReUseInputFeild } from "../ReUseInputFeild";
import { useLocation } from "react-router";

type mofdifyModalI = {
  state: any;
  visible: boolean;
  onCancel?: () => void;
  editMode?: boolean;
  districtsData?: any[];
  setRuralOrUrban?: (e: any) => void;
};
export const ViewTableData: React.FC<mofdifyModalI> = ({
  state,
  visible,
  onCancel,
}) => {
  const [form] = Form.useForm();

  form.setFieldsValue({
    order_number: state.order_number,
    refractionist_name: state.refractionist_name,
    name: state.name,
    phone_number: state.phone_number,
    district: state.district,
    taluka: state.taluka,
    health_facility: state.health_facility,
    sub_centre: state.sub_centre,
    village: state.village,
    status: state.status,
    details: state.details,
    type: state.type,
    image: state.image,
    frame_size: state.frame_size,
    frame_type: state.frame_type,
    ngo_gov: state.ngo_gov,
    left_eye_sph : state.left_eye_sph,
    left_eye_cyl : state.left_eye_cyl,
    right_eye_sph : state.right_eye_sph,
    right_eye_cyl : state.right_eye_cyl,
    left_eye_axis: state.left_eye_axis,
    left_eye_va: state.left_eye_va,
    right_eye_axis: state.right_eye_axis,
    right_eye_va: state.right_eye_va,
    near_eye_sph: state.near_vision_sph,
    near_eye_va: state.near_vision_va,
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
        onOk={onCancel}
      >
        <Form form={form} layout="vertical" name="form_in_modal">
          <Row justify={"space-evenly"}>
            <Col sm={7} xs={24}>
              <ReUseInputFeild
                name={"ngo_gov"}
                label={"Government/NGO"}
                readOnly={true}
              />
            </Col>
            <Col sm={7} xs={24}>
              <ReUseInputFeild
                name={"refractionist_name"}
                label={"Refractionist Name"}
                readOnly={true}
              />
            </Col>
            <Col sm={7} xs={24}>
              <ReUseInputFeild
                name={"order_number"}
                label={"Order Number"}
                readOnly={true}
              />
            </Col>
            <Col sm={7} xs={24}>
              <ReUseInputFeild name={"name"} label={"Name"} readOnly={true} />
            </Col>
            <Col sm={7} xs={24}>
              <ReUseInputFeild
                name={"phone_number"}
                label={"Phone Number"}
                readOnly={true}
              />
            </Col>
            <Col sm={7} xs={24}>
              <ReUseInputFeild name={"type"} label={"Type"} readOnly={true} />
            </Col>
            <Col sm={7} xs={24}>
              <ReUseInputFeild
                name={"details"}
                label={"Details"}
                readOnly={true}
              />
            </Col>
            <Col sm={7} xs={24}>
              <ReUseInputFeild
                name={"district"}
                label={"District"}
                readOnly={true}
              />
            </Col>
            <Col sm={7} xs={24}>
              <ReUseInputFeild
                name={"taluka"}
                label={"Taluka"}
                readOnly={true}
              />
            </Col>
            <Col sm={7} xs={24}>
              <ReUseInputFeild
                name={"health_facility"}
                label={"PHC/Health Facility"}
                readOnly={true}
              />
            </Col>
            <Col sm={7} xs={24}>
              <ReUseInputFeild
                name={"sub_centre"}
                label={"Sub Centre"}
                readOnly={true}
              />
            </Col>
            <Col sm={7} xs={24}>
              <ReUseInputFeild
                tabIndex={1}
                name={"status"}
                label={"Status"}
                readOnly={true}
              />
            </Col>
            {/* <Col sm={7} xs={24}>
              <ReUseInputFeild
                tabIndex={1}
                name={"plus_minus_lefy_eye_sph"}
                label={"Plus/Minus Left Eye Sph"}
                readOnly={true}
              />
            </Col> */}
            <Col sm={7} xs={24}>
              <ReUseInputFeild
                tabIndex={1}
                name={"left_eye_sph"}
                label={"Left Eye Sph"}
                readOnly={true}
              />
            </Col>
            {/* <Col sm={7} xs={24}>
              <ReUseInputFeild
                tabIndex={1}
                name={"plus_minus_left_eye_cyl"}
                label={"Plus/Minus Left Eye Cyl"}
                readOnly={true}
              />
            </Col> */}
            <Col sm={7} xs={24}>
              <ReUseInputFeild
                tabIndex={1}
                name={"left_eye_cyl"}
                label={"Left Eye Cyl"}
                readOnly={true}
              />
            </Col>
            <Col sm={7} xs={24}>
              <ReUseInputFeild
                tabIndex={1}
                name={"left_eye_axis"}
                label={"Left Eye Axis"}
                readOnly={true}
              />
            </Col>
            <Col sm={7} xs={24}>
              <ReUseInputFeild
                tabIndex={1}
                name={"left_eye_va"}
                label={"Left Eye Va"}
                readOnly={true}
              />
            </Col>
            {/* right eye powers */}
            {/* <Col sm={7} xs={24}>
              <ReUseInputFeild
                tabIndex={1}
                name={"plus_minus__right_eye_sph"}
                label={"Plus/Minus Right Eye Sph"}
                readOnly={true}
              />
            </Col> */}
            <Col sm={7} xs={24}>
              <ReUseInputFeild
                tabIndex={1}
                name={"right_eye_sph"}
                label={"Right Eye Sph"}
                readOnly={true}
              />
            </Col>
            {/* <Col sm={7} xs={24}>
              <ReUseInputFeild
                tabIndex={1}
                name={"plus_minus_right_eye_cyl"}
                label={"Plus/Minus Right Eye Cyl"}
                readOnly={true}
              />
            </Col> */}
            <Col sm={7} xs={24}>
              <ReUseInputFeild
                tabIndex={1}
                name={"right_eye_cyl"}
                label={"Right Eye Cyl"}
                readOnly={true}
              />
            </Col>
            <Col sm={7} xs={24}>
              <ReUseInputFeild
                tabIndex={1}
                name={"right_eye_axis"}
                label={"Right Eye Axis"}
                readOnly={true}
              />
            </Col>
            <Col sm={7} xs={24}>
              <ReUseInputFeild
                tabIndex={1}
                name={"right_eye_va"}
                label={"Right Eye Va"}
                readOnly={true}
              />
            </Col>
            {/* near vision */}
            <Col sm={7} xs={24}>
              <ReUseInputFeild
                tabIndex={1}
                name={"near_eye_sph"}
                label={"Near Vision Sph"}
                readOnly={true}
              />
            </Col>
            {/* <Col sm={7} xs={24}>
              <ReUseInputFeild
                tabIndex={1}
                name={"near_eye_cyl"}
                label={"Near Vision Cyl"}
                readOnly={true}
              />
            </Col>
            <Col sm={7} xs={24}>
              <ReUseInputFeild
                tabIndex={1}
                name={"near_eye_axis"}
                label={"Near Vision Axis"}
                readOnly={true}
              />
            </Col> */}
            <Col sm={7} xs={24}>
              <ReUseInputFeild
                tabIndex={1}
                name={"near_eye_va"}
                label={"Near Vision Va"}
                readOnly={true}
              />
            </Col>
            <Col sm={7} xs={24}>
              <ReUseInputFeild
                tabIndex={1}
                name={"frame_size"}
                label={"Frame Size"}
                readOnly={true}
              />
            </Col>
            <Col sm={7} xs={24}>
              <ReUseInputFeild
                tabIndex={1}
                name={"frame_type"}
                label={"Frame Type"}
                readOnly={true}
              />
            </Col>
            <Col sm={7} xs={24}>
              <ReUseInputFeild
                tabIndex={1}
                name={"image"}
                label={"Image"}
                readOnly={true}
                imageValue={state?.image}
                image={true}
              />
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  );
};
