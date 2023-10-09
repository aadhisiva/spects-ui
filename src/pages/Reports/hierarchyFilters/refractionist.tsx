import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Form,
  Row,
  Select,
  DatePicker,
  Spin,
  message,
} from "antd";
import { useFetchUserData } from "../../../utilities/userDataHook";
import { GET_APIS, POSTAPIS_WITH_AUTH } from "../../../api/apisSpectacles";
import { useTranslation } from "react-i18next";

const { Option } = Select;
const { RangePicker } = DatePicker;

interface publicObjType {
  district: string;
  name: string;
  details: string;
  phone_number: string;
  refractionist_name: string;
  status: string;
  sub_centre: string;
  taluka: string;
  type: string;
  village: string;
  health_facility: string;
  order_number: string;
  created_at: string;
}
const RefractionistSelectItems = ({
  styles,
  handleSlickSearchQuery,
  handleClickDownloadToXlsx,
  originalTableData,
}: any) => {
  /** Fitler actions */
  const [subCentreOption, setSubCentreOption] = useState("");
  const [refraType, setRefraTypes] = useState("");
  const [statusOption, setStatusOption] = useState("");

  // selected Values
  const [subCentreSelect, setSubCentreSelect] = useState<publicObjType[]>([]);

  // change langugae
  const { t } = useTranslation();
  // loader
  const [loading, setLoading] = useState(false);

  // auth user
  const [userData] = useFetchUserData();
  const token = userData?.userData?.token;
  const type = userData?.userData?.type;
  const codes = userData?.userData?.codes;

  const handleRefraTypes = (value: string) => {
    if (value !== refraType) {
      setRefraTypes(value);
      setSubCentreOption("");
      setStatusOption("");
    }
  };

  const handleSubCentreOption = (value: string) => {
    if (value !== subCentreOption) {
      setSubCentreOption(value);
      setStatusOption("");
    }
  };

  const handleClickClearFilters = () => {
    setSubCentreOption("");
  };

  const handleStatusOption = (value: string) => {
    if (value !== statusOption) {
      setStatusOption(value);
    }
  };

  const handleSearchQuery = () => {
    if (!subCentreOption || !statusOption || !refraType)
      return message.error("please Fill Fields.");
    let body: any = {
      loginType: type,
      district: "",
      taluka: "",
      phco: "",
      sub_centre: subCentreOption,
      date: "",
      status: statusOption,
      type: refraType,
    };
    handleSlickSearchQuery(body);
  };

  const renderSelectItems = () => {
    return (
      <div>
        <Form>
          <Row className={styles.selectItemsContainer}>
            <Col sm={6} xs={24}>
              <div className={styles.selecttypes}>
                <Select
                  style={{ width: "100%" }}
                  allowClear
                  showSearch
                  placeholder="Select Types"
                  onChange={(value) => handleRefraTypes(value)}
                  defaultValue={""}
                  value={refraType}
                >
                  <Option value="">Select Types</Option>
                  <Option value="school">School</Option>
                  <Option value="other">Beneficiary</Option>
                </Select>
              </div>
            </Col>
            <Col sm={6} xs={24}>
              <div className={styles.selecttypes}>
                <Select
                  style={{ width: "100%" }}
                  allowClear
                  showSearch
                  placeholder="Select Sub Centre"
                  onChange={handleSubCentreOption}
                  defaultValue={""}
                  value={subCentreOption}
                >
                  <Option value="">Select Sub Centre</Option>
                  {(codes || []).map((obj: any, i: String) => (
                    <Option key={String(i)} value={obj.unique_name}>
                      {obj.unique_name}
                    </Option>
                  ))}
                </Select>
              </div>
            </Col>
            <Col sm={6} xs={24}>
              <div className={styles.selecttypes}>
                <Form.Item>
                  <Select
                    allowClear
                    showSearch
                    placeholder="Select Sub Centre"
                    onChange={handleStatusOption}
                    defaultValue={""}
                    value={statusOption}
                  >
                    <Option value="">Select Status</Option>
                    <Option value="all">Select All</Option>
                    <Option value="order_pending">Order Pending</Option>
                    <Option value="ready_to_deliver">Ready To Deliver</Option>
                    <Option value="delivered">Delivered</Option>
                  </Select>
                </Form.Item>
              </div>
            </Col>
            <Col sm={6} xs={24}>
              <div className={styles.selecttypes}>
                <Button
                  htmlType="submit"
                  type="primary"
                  onClick={handleSearchQuery}
                >
                  {t("SEARCH_QUERY")}
                </Button>
              </div>
            </Col>
            <Col sm={6} xs={24}>
              <div className={styles.selecttypes}>
                <Button type="primary" onClick={handleClickClearFilters}>
                  {t("CLEAR_FILTERS")}
                </Button>
              </div>
            </Col>
            <Col sm={6} xs={24}>
              <div className={styles.selecttypes}>
                <Button type="primary" onClick={handleClickDownloadToXlsx}>
                  {t("DOWNLOAD")}
                </Button>
              </div>
            </Col>
            <Col sm={6} xs={24}>
              <div className={styles.selecttypes}>
                <span className={styles.orderData}>
                  Total Spectacles Applied :{" "}
                  {originalTableData[0]?.totalOrders || 0}{" "}
                </span>
              </div>
            </Col>
            <Col sm={6} xs={24}>
              <div className={styles.selecttypes}>
                <span className={styles.orderData}>
                  Spectacles Delivered :{" "}
                  {originalTableData[0]?.totalDelivered || 0}
                </span>
              </div>
            </Col>
            <Col sm={6} xs={24}>
              <div className={styles.selecttypes}>
                <span className={styles.orderData}>
                  Spectacles Pending: {originalTableData[0]?.totalPending || 0}
                </span>
              </div>
            </Col>
            <Col sm={6} xs={24}>
              <div className={styles.selecttypes}>
                <span className={styles.orderData}>
                  Spectacles Ready To Deliver:{" "}
                  {originalTableData[0]?.totalreadyToDeliver || 0}
                </span>
              </div>
            </Col>
          </Row>
        </Form>
      </div>
    );
  };

  return <Spin spinning={loading}>{renderSelectItems()}</Spin>;
};

export default RefractionistSelectItems;
