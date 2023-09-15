import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  Row,
  Select,
  Spin,
  Table,
  message,
} from "antd";
import type { ColumnsType, TableProps } from "antd/es/table";
import styles from "./ReportsTable.module.scss";
import classNames from "classnames";
import "./ReportsTable.custom.scss";
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
  type: string;
  village: string;
  health_facility: string;
  order_number: string;
  created_at: string;
}

export const ReportsTable: React.FC = () => {
  const [filteredInfo, setFilteredInfo] = useState<
    Record<string, FilterValue | null>
  >({});
  const [sortedInfo, setSortedInfo] = useState<SorterResult<DataType>>({});
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [visible, setVisible] = useState(false);
  const [formData, setFormData] = useState({});
  // select items
  const [selectedDates, setSelectedDates] = useState("");
  const [refraDeatilsSelect, setRefraDetailsSelect] = useState<publicObjType[]>(
    []
  );
  const [statusSelect, setStatusSelect] = useState<publicObjType[]>([]);
  const [talukaSelect, setTalukaSelect] = useState<publicObjType[]>([]);
  const [villageSelect, setVillageSelect] = useState<publicObjType[]>([]);
  const [subCentreSelect, setSubCentreSelect] = useState<publicObjType[]>([]);
  const [districtSelect, setDistrictSelect] = useState<publicObjType[]>([]);
  const [phcoSelected, setPhcoSelected] = useState<publicObjType[]>([]);

  /** data */
  const [originalTableData, setOriginalTableData] = useState<DataType[]>([]);
  const [copyOfOriginalTableData, setCopyOfOriginalTableData] = useState<
    DataType[]
  >([]);

  /** Fitler actions */
  const [talukaOption, setTalukaOption] = useState("");
  const [refraType, setRefraTypes] = useState("");
  const [refraDeatils, setRefraDetails] = useState("");
  const [districtOption, setDistrictOption] = useState("");
  const [villageOption, setVillageOption] = useState("");
  const [subCentreOption, setSubCentreOption] = useState("");
  const [statusOption, setStatusOption] = useState("");
  const [phcoOption, setPhcoOption] = useState("");

  const [rowsPerPage, setRowsPerPage] = useState(100);
  const [queryString, setQueryString] = useState<string>("");

  /* naviagte */
  const navigate = useNavigate();

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

  const bodyData: any = {
    codes: userData?.userData?.codes,
    type: userData?.userData?.type
  };

  /* first rendering only  */
  useEffect(() => {
    (async () => {
      // if (type == "district_officer") {
      //   let result = await POSTAPIS_WITH_AUTH("reports_data", bodyData, token);
      //   if (result.code) {
      //     setLoading(false);
      //     setOriginalTableData(result?.data);
      //     setCopyOfOriginalTableData(result?.data);
      //   } else {
      //     NotificationError(result.message);
      //   }
      // } else if (type == "taluka") {
      //   let result = await POSTAPIS_WITH_AUTH("reports_data", bodyData, token);
      //   if (result.code) {
      //     setLoading(false);
      //     setOriginalTableData(result?.data);
      //     setCopyOfOriginalTableData(result?.data);
      //   } else {
      //     NotificationError(result.message);
      //   }
      // } else if (type == "phco") {
      //   let result = await POSTAPIS_WITH_AUTH("reports_data", bodyData, token);
      //   if (result.code) {
      //     setLoading(false);
      //     setOriginalTableData(result?.data);
      //     setCopyOfOriginalTableData(result?.data);
      //   } else {
      //     NotificationError(result?.message);
      //   }
      // } else {
        // let result = await POSTAPIS_WITH_AUTH("reports_data", bodyData, token);
        let data = await GET_APIS("uniqueDistricts", token);
        // console.log("result", result)
        if (data?.code) {
          setLoading(false);
          setDistrictSelect(data?.data);
          // setTotalCount(result?.data?.total)
          // setOriginalTableData(result?.data.result);
          // setCopyOfOriginalTableData(result?.data.result);
        } else {
          NotificationError(data.message);
        }
      // }
    })();
  }, []);

  // filter operation
  useEffect(() => {
    // filter logic
    let filteredData = originalTableData;
    if (refraType) {
      filteredData = filteredData?.filter((obj) =>
        refraType !== "all" ? obj.type === refraType : obj
      );
    }
    // filter types and district
    if (refraType && districtOption) {
      filteredData = filteredData?.filter((obj) =>
        refraType !== "all"
          ? obj.type === refraType
          : obj && obj.district === districtOption
      );
    }
    // filter types and district and taluka
    if (refraType && districtOption && talukaOption) {
      filteredData = filteredData?.filter((obj) =>
        refraType !== "all"
          ? obj.type === refraType
          : obj &&
            obj.district === districtOption &&
            obj.taluka === talukaOption
      );
    }
    // filter types and district and taluka and phco(health_facility)
    if (refraType && districtOption && talukaOption && phcoOption) {
      filteredData = filteredData?.filter((obj) =>
        refraType !== "all"
          ? obj.type === refraType
          : obj &&
            obj.district === districtOption &&
            obj.taluka === talukaOption &&
            obj.health_facility === phcoOption
      );
    }
    // filter types and district and taluka and phco(health_facility) and sub centre
    if (
      refraType &&
      districtOption &&
      talukaOption &&
      phcoOption &&
      subCentreOption
    ) {
      filteredData = filteredData?.filter((obj) =>
        refraType !== "all"
          ? obj.type === refraType
          : obj &&
            obj.district == districtOption &&
            obj.taluka === talukaOption &&
            obj.health_facility === phcoOption &&
            obj.sub_centre === subCentreOption
      );
    }
    // filter types and district and taluka and phco(health_facility) and sub centre and village
    if (
      refraType &&
      districtOption &&
      talukaOption &&
      phcoOption &&
      subCentreOption
      // &&
      // villageOption
    ) {
      filteredData = filteredData?.filter(
        (obj) =>
          refraType !== "all"
            ? obj.type === refraType
            : obj &&
              obj.district === districtOption &&
              obj.taluka === talukaOption &&
              obj.health_facility === phcoOption &&
              obj.sub_centre === subCentreOption
        // &&
        // obj.village === villageOption
      );
    }
    // filter types and district and taluka and phco(health_facility) and sub centre and village and dates
    if (
      refraType &&
      districtOption &&
      talukaOption &&
      phcoOption &&
      subCentreOption &&
      //  &&
      // villageOption
      selectedDates
    ) {
      filteredData = filteredData?.filter((obj) =>
        refraType !== "all"
          ? obj.type === refraType
          : obj &&
            obj.district === districtOption &&
            obj.taluka === talukaOption &&
            obj.health_facility === phcoOption &&
            obj.sub_centre === subCentreOption &&
            // &&
            // obj.village === villageOption
            obj.created_at.split("T")[0] >= selectedDates[0] &&
            obj.created_at.split("T")[0] <= selectedDates[1]
      );
    }
    // filter types and district and taluka and phco(health_facility) and sub centre and village and status
    if (
      refraType &&
      districtOption &&
      talukaOption &&
      phcoOption &&
      subCentreOption &&
      // villageOption &&
      selectedDates &&
      statusOption
    ) {
      filteredData = filteredData?.filter((obj) =>
        refraType !== "all"
          ? obj.type === refraType
          : obj &&
            obj.district === districtOption &&
            obj.taluka === talukaOption &&
            obj.health_facility === phcoOption &&
            obj.sub_centre === subCentreOption &&
            // obj.village === villageOption &&
            obj.created_at.split("T")[0] >= selectedDates[0] &&
            obj.created_at.split("T")[0] <= selectedDates[1] &&
            statusOption !== "all"
          ? obj.status === statusOption
          : obj
      );
    }
    // filter types and details and district and taluka and phco(health_facility) and sub centre and village and status
    if (
      refraType &&
      districtOption &&
      talukaOption &&
      phcoOption &&
      subCentreOption &&
      // villageOption &&
      selectedDates &&
      statusOption &&
      refraDeatils
    ) {
      filteredData = filteredData?.filter((obj) =>
        refraType !== "all"
          ? obj.type === refraType
          : obj &&
            obj.district === districtOption &&
            obj.taluka === talukaOption &&
            obj.health_facility === phcoOption &&
            obj.sub_centre === subCentreOption &&
            // obj.village === villageOption &&
            obj.created_at.split("T")[0] >= selectedDates[0] &&
            obj.created_at.split("T")[0] <= selectedDates[1] &&
            statusOption !== "all"
          ? obj.status === statusOption
          : obj && obj.details == refraDeatils
      );
    }

    setCopyOfOriginalTableData(filteredData);
  }, [
    talukaOption,
    refraType,
    refraDeatils,
    districtOption,
    // villageOption,
    subCentreOption,
    statusOption,
    selectedDates,
    phcoOption,
  ]);

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
    let body: any = { type: row.type, id: row.id}
    let result = await POSTAPIS_WITH_AUTH('eachDataIdWise', body, token);
    if(result?.code == 200){
      setFormData(result?.data[0])
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

  const handleCh = (value: string) => {
    setRowsPerPage(Number(value));
  };

  const onChangeDate = (va: any, da: any) => {
    if (da !== selectedDates) {
      setStatusOption("");
      setSelectedDates(da);
    }
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
        String(obj.sub_centre)
          .toLowerCase()
          .includes(queryString.toLowerCase())
      );
    }
  });

  const handleSlickSearchQuery = async () => {
    let body: any = {
      district: districtOption,
      taluka: talukaOption,
      phco: phcoOption,
      sub_centre: subCentreOption,
      date: selectedDates,
      status: statusOption,
      type: refraType
    };
    let result = await POSTAPIS_WITH_AUTH("searchData", body, token);
    if(result.code == 200){
      setOriginalTableData(result.data);
      setCopyOfOriginalTableData(result.data);
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

  const handleRefraDetails = (value: string) => {
    if (value !== refraDeatils) {
      setRefraDetails(value);
    }
  };

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
      console.log("data", data);
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

  const handleStatusOption = (value: string) => {
    if (value !== statusOption) {
      setStatusOption(value);
    }
  };
  const handleClickDownloadToXlsx = () => {
    let newDate = new Date().toJSON().split("T")[0];
    const worksheet = XLSX.utils.json_to_sheet(copyOfOriginalTableData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    XLSX.writeFile(workbook, `spectacles_${newDate}.xlsx`);
  };

  const renderReports = () => {
    return (
      <>
        {visible ? FormOpen() : ""}
        <TitleBarComponent title={t("REPORTS_LIST")} image={true} />
        <div className={classNames(styles.reportsTable, "report-page-list")}>
          <div className={styles.table}>
            <Row>
              <Col sm={3} xs={24} className={styles.statisticsContainer}>
                <div className={styles.statistics}>
                  <span className={styles.title}>{t("FILTERS")}</span>
                </div>
              </Col>
            </Row>
            <Row className={styles.selectItemsContainer}>
            <Col sm={6} xs={24}>
                <div className={styles.selecttypes}>
                  <Form.Item>
                    <Select
                      placeholder="Select Types"
                      onChange={(value) => handleRefraTypes(value)}
                      defaultValue={""}
                      value={refraType}
                    >
                      <Option value="">Select Types</Option>
                      <Option value="school">School</Option>
                      <Option value="other">Benificiary</Option>
                    </Select>
                  </Form.Item>
                </div>
              </Col>
              {(type == 'taluka' || type == 'phco')? (""): (
              <Col sm={6} xs={24}>
                <div className={styles.selecttypes}>
                  <Form.Item>
                    <Select
                      placeholder="Select District"
                      onChange={handleDistrictOption}
                      defaultValue={""}
                      value={districtOption}
                    >
                      <Option value="">Select District</Option>
                      { (type == 'district_officer')? 
                      (codes || []).map((obj: any, i: any) => (
                        <Option key={String(i)} value={obj.unique_name}>
                          {obj.unique_name}
                        </Option>
                      )) :
                      (districtSelect).map((obj, i) => (
                        <Option key={String(i)} value={obj.district}>
                          {obj.district}
                        </Option>
                      ))
                      }
                    </Select>
                  </Form.Item>
                </div>
              </Col>
              )}
              {(type == 'phco')? (""): (
              <Col sm={6} xs={24}>
                <div className={styles.selecttypes}>
                  <Form.Item>
                    <Select
                      placeholder="Select taluka"
                      onChange={handleTalukaOption}
                      defaultValue={""}
                      value={talukaOption}
                    >
                      <Option value="">Select taluka</Option>
                      { (type == 'taluka')? 
                      (codes || []).map((obj: any, i: any) => (
                        <Option key={String(i)} value={obj.unique_name}>
                          {obj.unique_name}
                        </Option>
                      )) :
                      (talukaSelect).map((obj, i) => (
                        <Option key={String(i)} value={obj.taluka}>
                          {obj.taluka}
                        </Option>
                      ))
                      }
                    </Select>
                  </Form.Item>
                </div>
              </Col>
              )}
              <Col sm={6} xs={24}>
                <div className={styles.selecttypes}>
                  <Select
                    style={{ width: "100%" }}
                    placeholder="Select PHC"
                    onChange={handleSelectedPhco}
                    defaultValue={""}
                    value={phcoOption}
                  >
                    <Option value="">Select PHC</Option>

                    { (type == 'phco')? 
                      (codes || []).map((obj: any, i: any) => (
                        <Option key={String(i)} value={obj.unique_name}>
                          {obj.unique_name}
                        </Option>
                      )) :
                      (phcoSelected).map((obj, i) => (
                        <Option key={String(i)} value={obj.health_facility}>
                          {obj.health_facility}
                        </Option>
                      ))
                      }
                  </Select>
                </div>
              </Col>
              <Col sm={6} xs={24}>
                <div className={styles.selecttypes}>
                  <Form.Item>
                    <Select
                      placeholder="Select Sub Centre"
                      onChange={handleSubCentreOption}
                      defaultValue={""}
                      value={subCentreOption}
                    >
                      <Option value="">Select Sub Centre</Option>
                      {(
                        subCentreSelect.map((item: any) => item.sub_centre)|| []
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
                    rules={[{ required: true }]}
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
                      placeholder="Select status"
                      onChange={handleStatusOption}
                      defaultValue={""}
                      value={statusOption}
                    >
                      <Option value="">Select status</Option>
                      <Option value="all">All</Option>
                      <Option value="order_pending">Order Pending</Option>
                      <Option value="ready_to_deliver">Ready To Deliver</Option>
                      <Option value="delivered">Delivered</Option>
                    </Select>
                  </Form.Item>
                </div>
              </Col>
              <Col sm={3} xs={24}>
                <div className={styles.selecttypes}>
                  <Button type="primary" onClick={handleSlickSearchQuery}>
                    {"Search Query"}
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
              <Col sm={3} xs={24}>
                <div className={styles.selecttypes}>
                  <Button type="primary" onClick={handleClickDownloadToXlsx}>
                    {t("DOWNLOAD")}
                  </Button>
                </div>
              </Col>
              <Col sm={3} xs={24}>
                <div className={styles.selecttypes}>
                  <span>Total Orders :</span>{originalTableData.length}
                </div>
              </Col>
            </Row>

            {/* search and select rows */}
            {copyOfOriginalTableData.length == 0 ? (
              ""
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
