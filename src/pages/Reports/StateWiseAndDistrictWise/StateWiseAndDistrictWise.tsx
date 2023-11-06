import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  DatePicker,
  Empty,
  Form,
  Input,
  Row,
  Select,
  Spin,
  Table,
  message,
} from "antd";
import type { ColumnsType, TableProps } from "antd/es/table";
import styles from "./StateWiseAndDistrictWise.module.scss";
import classNames from "classnames";
import "./StateWiseAndDistrictWise.custom.scss";
import { useNavigate } from "react-router";
import { TitleBarComponent } from "../../../components/common/titleBar";
import { FilterValue, SorterResult } from "antd/es/table/interface";
import { NotificationError } from "../../../components/common/Notifications/Notifications";
import SelectRowsPerPage from "../../../components/common/SelectItems/SelectRowsPerPage";
import { GET_APIS, POSTAPIS_WITH_AUTH } from "../../../api/apisSpectacles";
import { ViewTableData } from "../../../components/common/ViewTableData";
import { useTranslation } from "react-i18next";
import { useFetchUserData } from "../../../utilities/userDataHook";
import * as XLSX from "xlsx";
import DistrictSelectItems from "../hierarchyFilters/district";
import {
  ALL_DISTRICTS,
  DISTRICT_LOGIN,
  EVENING_TIME,
  MORNING_TIME,
  PHCO_LOGIN,
  STATE_ADMIN_LOGIN,
  TALUKA_LOGIN,
} from "../../../utilities";
import StateSelectItems from "../hierarchyFilters/state";
import TalukaSelectItems from "../hierarchyFilters/taluka";
import PhcoSelectItems from "../hierarchyFilters/phco";

const { Search } = Input;
const { Option } = Select;
const { RangePicker } = DatePicker;
interface DataType {
  key: string;
  type: string;
  refractionist_name: string;
  details: string;
  district: string;
  taluka: string;
  sub_centre: string;
  village: string;
  status: string;
  school_institute_name: string;
  phone_number: string;
  name: string;
  order_number: string;
  health_facility: string;
  created_at: string;
  totalDelivered: string;
  totalPending: string;
  target: string;
  age: String;
  totalOrders: string;
  totalreadyToDeliver: string;
}

interface publicObjType {
  district: string;
  name: string;
  details: string;
  phone_number: string;
  refractionist_name: string;
  status: string;
  sub_centre: string;
  taluka: string;
  age: String;
  type: string;
  village: string;
  health_facility: string;
  order_number: string;
  created_at: string;
}

export const StateWiseAndDistrictWise: React.FC = () => {
  const [filteredInfo, setFilteredInfo] = useState<
    Record<string, FilterValue | null>
  >({});
  const [sortedInfo, setSortedInfo] = useState<SorterResult<DataType>>({});
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [visible, setVisible] = useState(false);
  const [formData, setFormData] = useState({});
  
  // select items
  const [talukaSelect, setTalukaSelect] = useState<publicObjType[]>([]);
  const [phcoSelected, setPhcoSelected] = useState<publicObjType[]>([]);

  /** data */
  const [originalTableData, setOriginalTableData] = useState<DataType[]>([]);
  const [copyOfOriginalTableData, setCopyOfOriginalTableData] = useState<
    DataType[]
  >([]);

  /** Fitler actions */
  const [talukaOption, setTalukaOption] = useState("");
  const [refraType, setRefraTypes] = useState("");
  const [districtOption, setDistrictOption] = useState("");

  const [rowsPerPage, setRowsPerPage] = useState(100);
  const [queryString, setQueryString] = useState<string>("");

  const locale = 'en';
  const [today, setDate] = React.useState(new Date()); // Save the current date to be able to trigger an update

  /* custom pagination */
  const handleChange: TableProps<DataType>["onChange"] = (
    pagination,
    filters,
    sorter
  ) => {
    setCurrentPage(Number(pagination?.current));
    setRowsPerPage(Number(pagination.pageSize));
    setFilteredInfo(filters);
    setSortedInfo(sorter as SorterResult<DataType>);
  };

  // auth user
  const [userData] = useFetchUserData();
  const token = userData?.userData?.token;
  const type = userData?.userData?.type;
  const codes = userData?.userData?.codes;

  useEffect(() => {
      const timer = setInterval(() => { // Creates an interval which will update the current data every minute
      // This will trigger a rerender every component that uses the useDate hook.
      setDate(new Date());
    }, 60 * 1000);
    return () => {
      clearInterval(timer); // Return a funtion to clear the timer so that it will stop being called on unmount
    }
  }, []);

  const day = today.toLocaleDateString(locale, { weekday: 'long' });
  const date = `${day}, ${today.getDate()} ${today.toLocaleDateString(locale, { month: 'long' })}\n\n`;

  const hour = today.getHours();
  const wish = `Good ${(hour < 12 && 'Morning') || (hour < 17 && 'Afternoon') || 'Evening'}, `;

  const time = today.toLocaleTimeString(locale, { hour: 'numeric', hour12: true, minute: 'numeric' });

  const columns: ColumnsType<DataType> = [
    {
      title: t("TABLE_REFRACTIONIST_NAME"),
      dataIndex: "refractionist_name",
      key: "refractionist_name",
      sorter: (a, b) =>
        a.refractionist_name.length - b.refractionist_name.length,
      sortOrder:
        sortedInfo.columnKey === "refractionist_name" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: t("TABLE_DETAILS"),
      dataIndex: "details",
      key: "details",
      sorter: (a, b) => a.details?.length - b.details?.length,
      sortOrder: sortedInfo.columnKey === "details" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: t("ORDER_NUMBER"),
      dataIndex: "order_number",
      key: "order_number",
      sorter: (a, b) => a.order_number?.length - b.order_number?.length,
      sortOrder:
        sortedInfo.columnKey === "order_number" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: t("TABLE_NAME"),
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name?.length - b.name?.length,
      sortOrder: sortedInfo.columnKey === "name" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: t("AGE"),
      dataIndex: "age",
      key: "age",
      sorter: (a, b) => a.age?.length - b.age?.length,
      sortOrder: sortedInfo.columnKey === "age" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: t("TABLE_MOBILE"),
      dataIndex: "phone_number",
      key: "phone_number",
      sorter: (a, b) => a.phone_number?.length - b.phone_number?.length,
      sortOrder:
        sortedInfo.columnKey === "phone_number" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: t("TABLE_DISTRICT"),
      dataIndex: "district",
      key: "district",
      sorter: (a, b) => a.district.length - b.district.length,
      sortOrder: sortedInfo.columnKey === "district" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: t("TABLE_TALUKA"),
      dataIndex: "taluka",
      key: "taluka",
      sorter: (a, b) => a.taluka.length - b.taluka.length,
      sortOrder: sortedInfo.columnKey === "taluka" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: t("PHC(Health Facility)"),
      dataIndex: "health_facility",
      key: "health_facility",
      sorter: (a, b) => a.health_facility.length - b.health_facility.length,
      sortOrder:
        sortedInfo.columnKey === "health_facility" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: t("TABLE_SUBCENTRE"),
      dataIndex: "sub_centre",
      key: "sub_centre",
      sorter: (a, b) => a.sub_centre.length - b.sub_centre.length,
      sortOrder:
        sortedInfo.columnKey === "sub_centre" ? sortedInfo.order : null,
      ellipsis: true,
    },
    // {
    //   title: t("TABLE_VILLAGE_WARD"),
    //   dataIndex: "village",
    //   key: "village",
    //   sorter: (a, b) => a.village.length - b.village.length,
    //   sortOrder: sortedInfo.columnKey === "village" ? sortedInfo.order : null,
    //   ellipsis: true,
    // },
    {
      title: t("TABLE_STATUS"),
      key: "status",
      dataIndex: "status",
      sorter: (a, b) => a.status.length - b.status.length,
      sortOrder: sortedInfo.columnKey === "status" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: t("TABLE_ACTION"),
      key: "action",
      render: (_, record) => {
        return (
          <Button onClick={() => handleModifyForm(record)} type="primary">
            {t("TABLE_VIEW")}
          </Button>
        );
      },
    },
  ];
  
  /* viewFormData */
  const handleModifyForm = async (row: any) => {
    setVisible(true);
    let body: any = { type: row.type, id: row.id };
    let result = await POSTAPIS_WITH_AUTH("eachDataIdWise", body, token);
    if (result?.code == 200) {
      setFormData(result?.data[0]);
    } else {
      message.warning("Something Went Wrong. Please Try Again");
    }
  };
  /* form Open */
  const FormOpen = () => {
    return (
      <ViewTableData
        state={formData}
        visible={visible}
        onCancel={() => setVisible(false)}
      />
    );
  };

  let renderItems = copyOfOriginalTableData.filter((obj) => {
    if (queryString === "") {
      return obj;
    } else {
      return (
        String(obj.type).toLowerCase().includes(queryString.toLowerCase()) ||
        String(obj.refractionist_name)
          .toLowerCase()
          .includes(queryString.toLowerCase()) ||
        String(obj.name).toLowerCase().includes(queryString.toLowerCase()) ||
        String(obj.phone_number)
          .toLowerCase()
          .includes(queryString.toLowerCase()) ||
        String(obj.district)
          .toLowerCase()
          .includes(queryString.toLowerCase()) ||
        String(obj.details).toLowerCase().includes(queryString.toLowerCase()) ||
        String(obj.status).toLowerCase().includes(queryString.toLowerCase()) ||
        String(obj.taluka).toLowerCase().includes(queryString.toLowerCase()) ||
        String(obj.health_facility)
          .toLowerCase()
          .includes(queryString.toLowerCase()) ||
        String(obj.sub_centre).toLowerCase().includes(queryString.toLowerCase())
      );
    }
  });

  const handleRefraTypes = (value: string) => {
    if (value !== refraType) {
        setRefraTypes(value);
        setDistrictOption("");
        setTalukaOption("");
    }
  };

  const handleDistrictOption = async (value: string) => {
    if (value !== districtOption) {
      setDistrictOption(value);
      setTalukaOption("");
      let bodyData: any = { district: value };
      let data = await POSTAPIS_WITH_AUTH("uniqueDistricts", bodyData, token);
      setTalukaSelect(data?.data);
    }
  };

  const handleClickSearchQuery = async () => {
    let body: any = {
      loginType: type,
      type: refraType,
      district: districtOption,
      taluka: talukaOption,
    }; 
    if (!districtOption || !refraType) return message.error("Please Select Fields.");

    if(type == DISTRICT_LOGIN && !talukaOption) return message.error("Please Select Fields.");
    
    setLoading(true);
    let result = await POSTAPIS_WITH_AUTH(
      "searchDataStateAndDistrictWise",
      body,
      token
    );
    if (result.code == 200) {
      setOriginalTableData(result.data);
      setCopyOfOriginalTableData(result.data);
    }
    setLoading(false);
  };

  const handleClickDownloadToXlsx = () => {
    let newDate = new Date().toJSON().split("T")[0];
    const worksheet = XLSX.utils.json_to_sheet(copyOfOriginalTableData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    XLSX.writeFile(workbook, `spectacles_${newDate}.xlsx`);
  };

  const handleClickClearFilters = () => {
    setRefraTypes("");
    setDistrictOption("");
  };

  const handleTalukaOption = async (value: string) => {
    if (value !== talukaOption) {
      setTalukaOption(value);
      let bodyData: any = { taluka: value };
      let data = await POSTAPIS_WITH_AUTH("uniqueDistricts", bodyData, token);
      setPhcoSelected(data?.data);
    }
  };

  const renderReports = () => {
    return (
      <>
        {visible ? FormOpen() : ""}
        <TitleBarComponent title={t("REPORTS_LIST")} image={true} />
        <div
          className={classNames(
            styles.stateAndDistrictTable,
            "stateAndDistrict-list"
          )}
        >
          <div className={styles.table}>
            <div className={styles.infoTitleContainer}>
            <p className={styles.infoTitle}>{date+", "+time}</p>
            <p className={styles.infoTitle}>Download Option will be available only after 6 pm to 10 am.</p>
            </div>
            <Row>
              <Col sm={3} xs={24} className={styles.statisticsContainer}>
                <div className={styles.statistics}>
                  <span className={styles.title}>{t("SUMMARY")}</span>
                </div>
              </Col>
            </Row>
            <Form>
              <Row className={styles.selectItemsContainer}>
                <Col sm={6} xs={24}>
                  <div className={styles.selecttypes}>
                    <Form.Item>
                      <Select
                        showSearch
                        allowClear
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
                <Col sm={6} xs={24}>
                  <div className={styles.selecttypes}>
                    <Form.Item>
                      <Select
                        showSearch
                        allowClear
                        placeholder="Select District"
                        onChange={handleDistrictOption}
                        defaultValue={""}
                        value={districtOption}
                      >
                        <Option value="">Select District</Option>
                        {type == DISTRICT_LOGIN ? (
                          <>
                            {(codes || []).map((obj: any, i: any) => (
                              <Option key={String(i)} value={obj.unique_name}>
                                {obj.unique_name}
                              </Option>
                            ))}
                          </>
                        ) : (
                          <>
                            <Option value="all">Select All</Option>
                            {ALL_DISTRICTS.map((obj, i) => (
                              <Option key={String(i)} value={obj}>
                                {obj}
                              </Option>
                            ))}
                          </>
                        )}
                      </Select>
                    </Form.Item>
                  </div>
                </Col>
                {type == DISTRICT_LOGIN ? (
                <Col sm={6} xs={24}>
                  <div className={styles.selecttypes}>
                    <Form.Item>
                      <Select
                        showSearch
                        allowClear
                        placeholder="Select taluka"
                        onChange={handleTalukaOption}
                        defaultValue={""}
                        value={talukaOption}
                      >
                        <Option value="">Select taluka</Option>
                        <Option value="all">Select all</Option>
                        {talukaSelect.map((obj, i) => (
                          <Option key={String(i)} value={obj.taluka}>
                            {obj.taluka}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </div>
                </Col>
                ): ("")}
                <Col sm={6} xs={24}>
                  <div className={styles.selecttypes}>
                    <Button
                      htmlType="submit"
                      type="primary"
                      onClick={handleClickSearchQuery}
                    >
                      {t("SEARCH_QUERY")}
                    </Button>
                  </div>
                </Col>
                <Col sm={3} xs={24}>
                  <div className={styles.selecttypes}>
                    <Button type="primary" onClick={handleClickClearFilters}>
                      {t("CLEAR_FILTERS")}
                    </Button>
                  </div>
                </Col>
                  <Col sm={6} xs={24}>
                    <div className={styles.selecttypes}>
                      <Button
                        type="primary"
                        onClick={handleClickDownloadToXlsx}
                      >
                        {t("DOWNLOAD")}
                      </Button>
                    </div>
                  </Col>
                <Col sm={6} xs={24}>
                  <div className={styles.selecttypes}>
                    <span className={styles.orderData}>
                      Total Spectacles Applied : {originalTableData[0]?.totalOrders || 0}{" "}
                    </span>
                  </div>
                </Col>
                <Col sm={6} xs={24}>
                  <div className={styles.selecttypes}>
                    <span className={styles.orderData}>
                    Spectacles Delivered : {originalTableData[0]?.totalDelivered || 0}
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
                    Spectacles Ready To Deliver: {originalTableData[0]?.totalreadyToDeliver || 0}
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

            {/* search and select rows */}
            {!copyOfOriginalTableData[0]?.name ? (
              <Empty />
            ) : (
              <React.Fragment>
                <Row>
                  <Col sm={17} xs={12} className={styles.slectRows}>
                    <SelectRowsPerPage isFixed={true} />
                  </Col>
                  <Col sm={7} xs={12} className={styles.searchContainer}>
                    <Search
                      allowClear
                      placeholder="input search"
                      enterButton
                      onSearch={(e) => setQueryString(e)}
                    />
                  </Col>
                </Row>
                <Table
                  columns={columns}
                  dataSource={renderItems}
                  bordered
                  pagination={{
                    showTotal: (total, range) =>
                      `${range[0]}-${range[1]} of ${total} items`,
                    current: currentPage,
                    pageSize: rowsPerPage,
                    total: renderItems.length || 0,
                  }}
                  onChange={handleChange}
                />
              </React.Fragment>
            )}
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      <Spin spinning={loading}>{renderReports()}</Spin>
    </>
  );
};
