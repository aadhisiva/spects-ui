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
} from "antd";
import type { ColumnsType, TableProps } from "antd/es/table";
import styles from "./SchoolScreeningReports.module.scss";
import classNames from "classnames";
import "./SchoolScreeningReports.module.scss";
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

export const SchoolScreeningReports: React.FC = () => {
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

  const [rowsPerPage, setRowsPerPage] = useState(10);
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

  const bodyData: any = {
    codes: userData?.userData?.codes,
    type: userData?.userData?.type,
  };

  /* first rendering only  */
  useEffect(() => {
    (async () => {
      if (type == "district_officer") {
        let result = await POSTAPIS_WITH_AUTH("reports_data", bodyData, token);
        if (result.code) {
          setLoading(false);
          setOriginalTableData(result?.data);
          setCopyOfOriginalTableData(result?.data);
        } else {
          NotificationError(result.message);
        }
      } else if (type == "taluka") {
        let result = await POSTAPIS_WITH_AUTH("reports_data", bodyData, token);
        if (result.code) {
          setLoading(false);
          setOriginalTableData(result?.data);
          setCopyOfOriginalTableData(result?.data);
        } else {
          NotificationError(result.message);
        }
      } else if (type == "phco") {
        let result = await POSTAPIS_WITH_AUTH("reports_data", bodyData, token);
        if (result.code) {
          setLoading(false);
          setOriginalTableData(result?.data);
          setCopyOfOriginalTableData(result?.data);
        } else {
          NotificationError(result?.message);
        }
      } else {
        let result = await GET_APIS("reports_data", token);
        if (result.code) {
          setLoading(false);
          setOriginalTableData(result?.data);
          setCopyOfOriginalTableData(result?.data);
        } else {
          NotificationError(result.message);
        }
      }
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
      filteredData = filteredData?.filter((obj) =>
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
      subCentreOption
      //  &&
      // villageOption
       &&
      selectedDates
    ) {
      filteredData = filteredData?.filter((obj) =>
        refraType !== "all"
          ? obj.type === refraType
          : obj &&
            obj.district === districtOption &&
            obj.taluka === talukaOption &&
            obj.health_facility === phcoOption &&
            obj.sub_centre === subCentreOption 
            // &&
            // obj.village === villageOption 
            &&
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
      sortOrder: sortedInfo.columnKey === "refractionist_name" ? sortedInfo.order : null,
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
  const handleModifyForm = (row: object) => {
    setVisible(true);
    setFormData(row);
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
      setSelectedDates(da);
      let reset = villageSelect.filter(
        (obj) =>
          obj.created_at.split("T")[0] > da[0] &&
          obj.created_at.split("T")[0] < da[1]
      );
      setStatusSelect(reset);
    }
  };

  let renderItems = copyOfOriginalTableData.filter(obj => {
    if(queryString === "") {
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
          String(obj.district).toLowerCase().includes(queryString.toLowerCase()) ||
          String(obj.details).toLowerCase().includes(queryString.toLowerCase()) ||
          String(obj.status).toLowerCase().includes(queryString.toLowerCase()) ||
          String(obj.taluka).toLowerCase().includes(queryString.toLowerCase()) ||
          String(obj.health_facility)
            .toLowerCase()
            .includes(queryString.toLowerCase()) ||
          String(obj.sub_centre)
            .toLowerCase()
            .includes(queryString.toLowerCase()) ||
          String(obj.village).toLowerCase().includes(queryString.toLowerCase())
      )
    }
  });

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
      setRefraTypes(value);
      setDistrictOption("");
      setTalukaOption("");
      setPhcoOption("");
      setSubCentreOption("");
      setVillageOption("");
      setSelectedDates("");
      setStatusOption("");
      setRefraDetails("");
      let reset = originalTableData.filter((obj) =>
        value !== "all" ? obj.type == value : obj
      );
      setDistrictSelect(reset);
    }
  };

  const handleRefraDetails = (value: string) => {
    if (value !== refraDeatils) {
      setRefraDetails(value);
    }
  };

  const handleDistrictOption = (value: string) => {
    if (value !== districtOption) {
      setDistrictOption(value);
      setTalukaOption("");
      setPhcoOption("");
      setSubCentreOption("");
      setVillageOption("");
      setSelectedDates("");
      setStatusOption("");
      setRefraDetails("");
      let reset = districtSelect.filter((obj) => obj.district == value);
      setTalukaSelect(reset);
    }
  };

  const handleTalukaOption = (value: string) => {
    if (value !== talukaOption) {
      setTalukaOption(value);
      setPhcoOption("");
      setSubCentreOption("");
      setVillageOption("");
      setSelectedDates("");
      setStatusOption("");
      setRefraDetails("");
      let reset = talukaSelect.filter((obj) => obj.taluka == value);
      setPhcoSelected(reset);
    }
  };

  const handleSelectedPhco = (value: string) => {
    if (value !== phcoOption) {
      setPhcoOption(value);
      setSubCentreOption("");
      setVillageOption("");
      setSelectedDates("");
      setStatusOption("");
      setRefraDetails("");
      let reset = phcoSelected.filter((obj) => obj.health_facility === value);
      setSubCentreSelect(reset);
    }
  };

  const handleSubCentreOption = (value: string) => {
    if (value !== subCentreOption) {
      setSubCentreOption(value);
      setVillageOption("");
      setSelectedDates('');
      setStatusOption("");
      setRefraDetails("");
      let reset = subCentreSelect.filter((obj) => obj.sub_centre == value);
      setVillageSelect(reset);
    }
  };

  // const handleVillageOption = (value: string) => {
  //   if (value !== villageOption) {
  //     setVillageOption(value);
  //   }
  // };

  const handleStatusOption = (value: string) => {
    if (value !== statusOption) {
      setStatusOption(value);
      setRefraDetails("");
      let reset = villageSelect.filter((obj) =>
        value !== "all" ? obj.status == value : obj
      );
      setRefraDetailsSelect(reset);
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
        <div className={classNames(styles.SchoolScreeningReports, "school-primary-report-page-list")}>
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
                      <Option value="all">All</Option>
                      <Option value="school">School</Option>
                      <Option value="otherBenificiary">Benificiary</Option>
                    </Select>
                  </Form.Item>
                </div>
              </Col>
              <Col sm={6} xs={24}>
                <div className={styles.selecttypes}>
                  <Form.Item>
                    <Select
                      disabled={refraType ? false : true}
                      placeholder="Select District"
                      onChange={handleDistrictOption}
                      defaultValue={""}
                      value={districtOption}
                    >
                      <Option value="">Select District</Option>
                      {(
                        Array.from(
                          new Set(
                            districtSelect.map((item: any) => item.district)
                          )
                        ) || []
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
                  <Form.Item>
                    <Select
                      disabled={districtOption ? false : true}
                      placeholder="Select taluka"
                      onChange={handleTalukaOption}
                      defaultValue={""}
                      value={talukaOption}
                    >
                      <Option value="">Select taluka</Option>
                      {(
                        Array.from(
                          new Set(talukaSelect.map((item: any) => item.taluka))
                        ) || []
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
                  <Select
                    style={{ width: "100%" }}
                    placeholder="Select PHC"
                    disabled={talukaOption ? false : true}
                    onChange={handleSelectedPhco}
                    defaultValue={""}
                    value={phcoOption}
                  >
                    <Option value="">Select PHC</Option>
                    {(
                      Array.from(
                        new Set(phcoSelected.map((obj) => obj.health_facility))
                      ) || []
                    )?.map((obj: any, i) => (
                      <Select.Option key={String(i)} value={`${obj}`}>
                        {obj}
                      </Select.Option>
                    ))}
                  </Select>
                </div>
              </Col>
              <Col sm={6} xs={24}>
                <div className={styles.selecttypes}>
                  <Form.Item>
                    <Select
                      disabled={phcoOption ? false : true}
                      placeholder="Select Sub Centre"
                      onChange={handleSubCentreOption}
                      defaultValue={""}
                      value={subCentreOption}
                    >
                      <Option value="">Select Sub Centre</Option>
                      {(
                        Array.from(
                          new Set(
                            subCentreSelect.map((item: any) => item.sub_centre)
                          )
                        ) || []
                      ).map((obj, i) => (
                        <Option key={String(i)} value={obj}>
                          {obj}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </div>
              </Col>
              {/* <Col sm={6} xs={24}>
                <div className={styles.selecttypes}>
                  <Form.Item>
                    <Select
                      disabled={subCentreOption ? false : true}
                      placeholder="Select village/Ward"
                      onChange={handleVillageOption}
                      defaultValue={""}
                      value={villageOption}
                    >
                      <Option value="">Select village/Ward</Option>
                      {(
                        Array.from(
                          new Set(
                            villageSelect.map((item: any) => item.village)
                          )
                        ) || []
                      ).map((obj, i) => (
                        <Option key={String(i)} value={obj}>
                          {obj}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </div>
              </Col> */}
              <Col sm={6} xs={24}>
                <div className={styles.selecttypes}>
                  <Form.Item
                    name={"From and To Date"}
                    rules={[{ required: true }]}
                  >
                    <RangePicker
                      disabled={subCentreOption ? false : true}
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
                      disabled={selectedDates ? false : true}
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
              <Col sm={6} xs={24}>
                <div className={styles.selecttypes}>
                  <Form.Item>
                    <Select
                      disabled={statusOption ? false : true}
                      placeholder="Select Details"
                      onChange={handleRefraDetails}
                      defaultValue={""}
                      value={refraDeatils}
                    >
                      <Option value="">Select Details</Option>
                      {(
                        Array.from(
                          new Set(
                            refraDeatilsSelect.map((item: any) => item.details)
                          )
                        ) || []
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
                  <Button type="primary" onClick={handleClickClearFilters}>
                    {t("CLEAR_FILTERS")}
                  </Button>
                </div>
              </Col>
            </Row>

            {/* search and select rows */}
            <Row>
              <Col sm={12} xs={12} className={styles.slectRows}>
                <SelectRowsPerPage handleCh={handleCh} />
              </Col>
              <Col sm={6} xs={12} className={styles.searchContainer}>
                <Button type="primary" onClick={handleClickDownloadToXlsx}>
                  {t("DOWNLOAD")}
                </Button>
              </Col>
              <Col sm={6} xs={12} className={styles.searchContainer}>
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
                total: renderItems?.length || 0,
              }}
              onChange={handleChange}
            />
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
