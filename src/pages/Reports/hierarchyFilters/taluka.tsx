import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Form,
  Row,
  Select,
  DatePicker,
  message,
  Spin,
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
const TalukaSelectItems = ({
  styles,
  handleSlickSearchQuery,
  handleClickDownloadToXlsx,
  originalTableData,
}: any) => {
  /** Fitler actions */
  const [talukaOption, setTalukaOption] = useState("");
  const [refraType, setRefraTypes] = useState("");
  const [refraDeatils, setRefraDetails] = useState("");
  const [districtOption, setDistrictOption] = useState("");
  const [villageOption, setVillageOption] = useState("");
  const [subCentreOption, setSubCentreOption] = useState("");
  const [statusOption, setStatusOption] = useState("");
  const [phcoOption, setPhcoOption] = useState("");

  // selected Values
  const [selectedDates, setSelectedDates] = useState("");
  const [statusSelect, setStatusSelect] = useState<publicObjType[]>([]);
  const [talukaSelect, setTalukaSelect] = useState<publicObjType[]>([]);
  const [villageSelect, setVillageSelect] = useState<publicObjType[]>([]);
  const [subCentreSelect, setSubCentreSelect] = useState<publicObjType[]>([]);
  const [districtSelect, setDistrictSelect] = useState<publicObjType[]>([]);
  const [phcoSelected, setPhcoSelected] = useState<publicObjType[]>([]);

  // change langugae
  const { t } = useTranslation();
  // loader
  const [loading, setLoading] = useState(true);

  // auth user
  const [userData] = useFetchUserData();
  const token = userData?.userData?.token;
  const type = userData?.userData?.type;
  const codes = userData?.userData?.codes;

  /* first rendering only  */
  useEffect(() => {
    (async () => {
      let data = await GET_APIS("uniqueDistricts", token);
      if (data?.code) {
        setLoading(false);
        setDistrictSelect(data?.data);
      } else {
        message.info(data.message);
      }
      // }
    })();
  }, []);

  const handleDistrictOption = async (value: string) => {
    if (value !== districtOption) {
      setDistrictOption(value);
      setTalukaOption("");
      setPhcoOption("");
      setSubCentreOption("");
      setSelectedDates("");
      setStatusOption("");
      let bodyData: any = { district: value };
      let data = await POSTAPIS_WITH_AUTH("uniqueDistricts", bodyData, token);
      setTalukaSelect(data?.data);
    }
  };

  const handleTalukaOption = async (value: string) => {
    if (value !== talukaOption) {
      setTalukaOption(value);
      setPhcoOption("");
      setSubCentreOption("");
      setSelectedDates("");
      setStatusOption("");
      let bodyData: any = { taluka: value };
      let data = await POSTAPIS_WITH_AUTH("uniqueDistricts", bodyData, token);
      setPhcoSelected(data?.data);
    }
  };

  const handleSelectedPhco = async (value: string) => {
    if (value !== phcoOption) {
      setPhcoOption(value);
      setSubCentreOption("");
      setSelectedDates("");
      setStatusOption("");
      let bodyData: any = { phc: value };
      let data = await POSTAPIS_WITH_AUTH("uniqueDistricts", bodyData, token);
      setSubCentreSelect(data?.data);
    }
  };

  const handleSubCentreOption = (value: string) => {
    if (value !== subCentreOption) {
      setSubCentreOption(value);
      setSelectedDates("");
      setStatusOption("");
    }
  };

  const handleClickClearFilters = () => {
    setRefraTypes("");
    setDistrictOption("");
    setTalukaOption("");
    setPhcoOption("");
    setSubCentreOption("");
    setVillageOption("");
    setSelectedDates("");
    setStatusOption("");
    setRefraDetails("");
  };

  const handleRefraTypes = (value: string) => {
    if (value !== refraType) {
      setDistrictOption("");
      setTalukaOption("");
      setPhcoOption("");
      setSubCentreOption("");
      setSelectedDates("");
      setStatusOption("");
      setRefraTypes(value);
    }
  };

  const handleStatusOption = (value: string) => {
    if (value !== statusOption) {
      setStatusOption(value);
    }
  };

  const onChangeDate = (va: any, da: any) => {
    if (da !== selectedDates) {
      setStatusOption("");
      setSelectedDates(da);
    }
  };

  const handleSearchQuery = () => {
    let body: any = {
      loginType: type,
      district: districtOption,
      taluka: talukaOption,
      phco: phcoOption,
      sub_centre: subCentreOption,
      date: selectedDates,
      status: statusOption,
      type: refraType,
    };
    handleSlickSearchQuery(body);
  };

  const TotalOrderAndPending = () => {
    let orderPending = originalTableData.filter(
      (obj: publicObjType) => obj.status == "order_pending"
    ).length;
    let delivered = originalTableData.filter(
      (obj: publicObjType) => obj.status == "delivered"
    ).length;
    let totalOrders = originalTableData.length;
    return { orderPending, totalOrders, delivered };
  };

  const renderSelectItems = () => {
    return (
      <div>
        <Form>
          <Row className={styles.selectItemsContainer}>
            <Col sm={6} xs={24}>
              <div className={styles.selecttypes}>
                <Form.Item name={"Select Type"} rules={[{ required: true }]}>
                  <Select
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
                </Form.Item>
              </div>
            </Col>
            {/* <Col sm={6} xs={24}>
              <div className={styles.selecttypes}>
                <Form.Item
                name={'Select District'}
                rules={[{ required: true }]}>
                  <Select
                    placeholder="Select District"
                    onChange={handleDistrictOption}
                    defaultValue={""}
                    value={districtOption}
                  >
                    <Option value="">Select District</Option>
                    {type == "district_officer"
                      ? (codes || []).map((obj: any, i: any) => (
                          <Option key={String(i)} value={obj.unique_name}>
                            {obj.unique_name}
                          </Option>
                        ))
                      : districtSelect.map((obj, i) => (
                          <Option key={String(i)} value={obj.district}>
                            {obj.district}
                          </Option>
                        ))}
                  </Select>
                </Form.Item>
              </div>
            </Col> */}
            <Col sm={6} xs={24}>
              <div className={styles.selecttypes}>
                <Form.Item>
                  <Select
                    allowClear
                    showSearch
                    placeholder="Select taluka"
                    onChange={handleTalukaOption}
                    defaultValue={""}
                    value={talukaOption}
                  >
                    <Option value="">Select taluka</Option>
                    {type == "taluka"
                      ? (codes || []).map((obj: any, i: any) => (
                          <Option key={String(i)} value={obj.unique_name}>
                            {obj.unique_name}
                          </Option>
                        ))
                      : ""}
                  </Select>
                </Form.Item>
              </div>
            </Col>
            <Col sm={6} xs={24}>
              <div className={styles.selecttypes}>
                <Select
                  allowClear
                  showSearch
                  style={{ width: "100%" }}
                  placeholder="Select PHC"
                  onChange={handleSelectedPhco}
                  defaultValue={""}
                  value={phcoOption}
                >
                  <Option value="">Select PHC</Option>

                  {phcoSelected.map((obj, i) => (
                    <Option key={String(i)} value={obj.health_facility}>
                      {obj.health_facility}
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
                    onChange={handleSubCentreOption}
                    defaultValue={""}
                    value={subCentreOption}
                  >
                    <Option value="">Select Sub Centre</Option>
                    {(
                      subCentreSelect.map((item: any) => item.sub_centre) || []
                    ).map((obj, i) => (
                      <Option key={String(i)} value={obj}>
                        {obj}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </div>
            </Col>
            <Col sm={6} xs={24}>
              <div className={styles.selecttypes}>
                <Form.Item
                  name={"From and To Date"}
                  rules={[{ required: false }]}
                >
                  <RangePicker
                    format="YYYY-MM-DD"
                    placeholder={["From Date", "To Date"]}
                    onChange={onChangeDate}
                  />
                </Form.Item>
              </div>
            </Col>
            <Col sm={6} xs={24}>
              <div className={styles.selecttypes}>
                <Form.Item>
                  <Select
                    allowClear
                    showSearch
                    placeholder="Select status"
                    onChange={handleStatusOption}
                    defaultValue={""}
                    value={statusOption}
                  >
                    <Option value="">Select status</Option>
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
                  Target : {originalTableData[0]?.target || 0}
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

export default TalukaSelectItems;
