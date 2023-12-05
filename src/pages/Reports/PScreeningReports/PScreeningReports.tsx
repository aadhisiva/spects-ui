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
import styles from "./PScreeningReports.module.scss";
import classNames from "classnames";
import "./PScreeningReports.module.scss";
import { useNavigate } from "react-router";
import { TitleBarComponent } from "../../../components/common/titleBar";
import { FilterValue, SorterResult } from "antd/es/table/interface";
import SelectRowsPerPage from "../../../components/common/SelectItems/SelectRowsPerPage";
import { GET_APIS, POSTAPIS_WITH_AUTH } from "../../../api/apisSpectacles";
import { useTranslation } from "react-i18next";
import { useFetchUserData } from "../../../utilities/userDataHook";
import { NotificationError } from "../../../components/common/Notifications/Notifications";
import * as XLSX from "xlsx";

const { Option } = Select;
const { Search } = Input;

interface DataType {
  key: string;
  district: string;
  rural_urban: string;
  taluka: string;
  sub_centre: string;
  village: string;
  total_secondary_screening_required: string;
  health_facility: string;
  total_primary_screening_completed: string;
  primaryCount: string;
}

export const PrimaryScreeningReports: React.FC = () => {
  const [filteredInfo, setFilteredInfo] = useState<
    Record<string, FilterValue | null>
  >({});
  const [sortedInfo, setSortedInfo] = useState<SorterResult<DataType>>({});
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);

  // primary count
  const [primaryCount, setPScreeningCount] = useState<any>(1);

  /** data */
  const [originalTableData, setOriginalTableData] = useState<DataType[]>([]);
  const [copyOfOriginalTableData, setCopyOfOriginalTableData] = useState<
    DataType[]
  >([]);

  // select values
  const [rural_urban, setRuralOrUrban] = useState("");
  const [talukaOption, setTalukaOption] = useState("");
  const [districtOption, setDistrict] = useState("");
  const [subCentreOption, setSubCentreOption] = useState("");
  const [phcoOption, setPhcoOption] = useState("");
  // selected content
  const [districtSelect, setDistrictSelect] = useState<DataType[]>([]);
  const [talukaSelect, setTalukaSelect] = useState<DataType[]>([]);
  const [subCentreSelect, setSubCentreSelect] = useState<DataType[]>([]);
  const [phcoSelected, setPhcoSelected] = useState<DataType[]>([]);

  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [queryString, setQueryString] = useState<string>("");

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
  // let bodyData: any = { codes: userData?.userData?.codes };
  const bodyData: any = {
    codes: userData?.userData?.codes || [],
    type: userData?.userData?.type,
  };

  useEffect(() => {
    let body: any = {
      ...bodyData,
      ...{ district: !districtOption ? "all" : districtOption },
    };
    let isFlag = true;
    (async function () {
      let result = await POSTAPIS_WITH_AUTH(`getPrimaryCount`, body, token);
      if (isFlag) {
        if (result.code === 200) {
          setPScreeningCount(result.data);
        }
      }
      setLoading(false);
    })();
    return () => {
      isFlag = false;
    };
  }, [districtOption]);

  const GetTablData = async () => {
    if (type == "district_officer") {
      let result = await POSTAPIS_WITH_AUTH(
        `get_phco_wise_data`,
        bodyData,
        token
      );
      if (result.code == 200) {
        setLoading(false);
        setOriginalTableData(result?.data);
        setCopyOfOriginalTableData(result?.data);
      } else {
        NotificationError(result.message);
      }
    } else if (type == "taluka") {
      let result = await POSTAPIS_WITH_AUTH(
        `get_phco_wise_data`,
        bodyData,
        token
      );
      if (result.code == 200) {
        setLoading(false);
        setOriginalTableData(result?.data);
        setCopyOfOriginalTableData(result?.data);
      } else {
        NotificationError(result.message);
      }
    } else if (type == "phco") {
      let result = await POSTAPIS_WITH_AUTH(
        `get_phco_wise_data`,
        bodyData,
        token
      );
      if (result.code == 200) {
        setLoading(false);
        setOriginalTableData(result?.data);
        setCopyOfOriginalTableData(result?.data);
      } else {
        NotificationError(result.message);
      }
    } else {
      let result = await GET_APIS(`get_phco_wise_data`, token);
      if (result.code == 200) {
        setLoading(false);
        setOriginalTableData(result?.data);
        setCopyOfOriginalTableData(result?.data);
      } else {
        NotificationError(result.message);
      }
    }
  };

  useEffect(() => {
    (async () => {
      await GetTablData();
    })();
  }, []);

  useEffect(() => {
    let filterData = originalTableData;

    // filter district
    if (districtOption) {
      filterData = filterData.filter((obj) => obj.district === districtOption);
    }
    // district and taluka
    if (districtOption && talukaOption) {
      filterData = filterData.filter(
        (obj) => obj.district === districtOption && obj.taluka === talukaOption
      );
    }
    // filter district and taluka and phco(health facility)
    if (districtOption && talukaOption && phcoOption) {
      filterData = filterData.filter(
        (obj) =>
          obj.district === districtOption &&
          obj.taluka === talukaOption &&
          obj.health_facility === phcoOption
      );
    }
    // filter district and taluka and sub centre
    if (districtOption && talukaOption && subCentreOption) {
      filterData = filterData.filter(
        (obj) =>
          obj.district === districtOption &&
          obj.taluka === talukaOption &&
          obj.sub_centre === subCentreOption
      );
    }
    setCopyOfOriginalTableData(filterData);
  }, [districtOption, talukaOption, subCentreOption, phcoOption]);

  const columns: ColumnsType<DataType> = [
    {
      title: t("TABLE_DISTRICT"),
      dataIndex: "district",
      key: "district",
      sorter: (a, b) => a.district.length - b.district.length,
      sortOrder: sortedInfo.columnKey === "district" ? sortedInfo.order : null,
      ellipsis: true,
      filteredValue: [queryString],
      onFilter: (value: any, record) => {
        return (
          String(record.total_secondary_screening_required)
            .toLowerCase()
            .includes(value.toLowerCase()) ||
          String(record.district).toLowerCase().includes(value.toLowerCase()) ||
          String(record.taluka).toLowerCase().includes(value.toLowerCase()) ||
          String(record.health_facility)
            .toLowerCase()
            .includes(value.toLowerCase()) ||
          String(record.sub_centre)
            .toLowerCase()
            .includes(value.toLowerCase()) ||
          String(record.village).toLowerCase().includes(value.toLowerCase())
        );
      },
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
      title: t("total primary screening completed"),
      dataIndex: "total_primary_screening_completed",
      key: "village",
      sorter: (a, b) => a.village.length - b.village.length,
      sortOrder: sortedInfo.columnKey === "village" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: t("total secondary screening required"),
      dataIndex: "total_secondary_screening_required",
      key: "village",
      sorter: (a, b) => a.village.length - b.village.length,
      sortOrder: sortedInfo.columnKey === "village" ? sortedInfo.order : null,
      ellipsis: true,
    },
  ];

  /* form Open */
  const handleCh = (value: string) => {
    setRowsPerPage(Number(value));
  };

  const handleClickClearFilters = () => {
    setRuralOrUrban("");
    setDistrict("");
    setTalukaOption("");
    setPhcoOption("");
    setSubCentreOption("");
  };

  const handleSelectedDistrict = (value: string) => {
    if (value !== districtOption) {
      setDistrict(value);
      setTalukaOption("");
      setPhcoOption("");
      setSubCentreOption("");
      let reset = originalTableData.filter((obj) => obj.district === value);
      setTalukaSelect(reset);
    }
  };

  const handleSelectedTaluka = (value: string) => {
    if (value !== talukaOption) {
      setTalukaOption(value);
      setPhcoOption("");
      setSubCentreOption("");
      let reset = talukaSelect.filter((obj) => obj.taluka === value);
      setPhcoSelected(reset);
    }
  };

  const handleSelectedPhco = (value: string) => {
    if (value !== phcoOption) {
      setPhcoOption(value);
      setSubCentreOption("");
      let reset = phcoSelected.filter((obj) => obj.health_facility === value);
      setSubCentreSelect(reset);
    }
  };

  const handleSubCentreOption = (value: string) => {
    if (value !== subCentreOption) {
      setSubCentreOption(value);
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
        <TitleBarComponent title={t("PRIMARY_SCREENING_LIST")} image={true} />
        <div
          className={classNames(
            styles.PrimaryReportsPage,
            "primary-report-page-list"
          )}
        >
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
                  <Select
                    showSearch
                    allowClear
                    style={{ width: "100%" }}
                    placeholder="Select District"
                    onChange={handleSelectedDistrict}
                    defaultValue={""}
                    value={districtOption}
                  >
                    <Option value={""}>Select District</Option>
                    {(
                      Array.from(
                        new Set(originalTableData.map((obj) => obj.district))
                      ) || []
                    )?.map((obj: any, i) => (
                      <Option key={String(i)} value={`${obj}`}>
                        {obj?.replace(/\W/g, "")?.replace(/\d/g, "")}
                      </Option>
                    ))}
                  </Select>
                </div>
              </Col>
              <Col sm={6} xs={24}>
                <div className={styles.selecttypes}>
                  <Select
                    showSearch
                    allowClear
                    style={{ width: "100%" }}
                    placeholder="Select Taluka"
                    disabled={districtOption ? false : true}
                    onChange={handleSelectedTaluka}
                    defaultValue={""}
                    value={talukaOption}
                  >
                    <Option value={""}>Select Taluka</Option>
                    {(
                      Array.from(
                        new Set(talukaSelect.map((obj) => obj.taluka))
                      ) || []
                    )?.map((obj: any, i) => (
                      <Option key={String(i)} value={`${obj}`}>
                        {obj?.replace(/\W/g, "")?.replace(/\d/g, "")}
                      </Option>
                    ))}
                  </Select>
                </div>
              </Col>
              <Col sm={6} xs={24}>
                <div className={styles.selecttypes}>
                  <Select
                    showSearch
                    allowClear
                    style={{ width: "100%" }}
                    placeholder="Select Phc"
                    disabled={talukaOption ? false : true}
                    onChange={handleSelectedPhco}
                    defaultValue={""}
                    value={phcoOption}
                  >
                    <Option value={""}>Select PHC</Option>
                    {(
                      Array.from(
                        new Set(phcoSelected.map((obj) => obj.health_facility))
                      ) || []
                    )?.map((obj: any, i) => (
                      <Option key={String(i)} value={`${obj}`}>
                        {obj}
                      </Option>
                    ))}
                  </Select>
                </div>
              </Col>
              <Col sm={6} xs={24}>
                <div className={styles.selecttypes}>
                  <Select
                    showSearch
                    allowClear
                    style={{ width: "100%" }}
                    placeholder="Select Sub Centre"
                    disabled={phcoOption ? false : true}
                    onChange={handleSubCentreOption}
                    defaultValue={""}
                    value={subCentreOption}
                  >
                    <Option value={""}>Select Sub Centre</Option>
                    {(
                      Array.from(
                        new Set(subCentreSelect.map((obj) => obj.sub_centre))
                      ) || []
                    )?.map((obj: any, i) => (
                      <Option key={String(i)} value={`${obj}`}>
                        {obj}
                      </Option>
                    ))}
                  </Select>
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
                    Primary Screening Count : {primaryCount[0]?.target || 0}{" "}
                  </span>
                </div>
              </Col>
              <Col sm={6} xs={24}>
                <div className={styles.selecttypes}>
                  <span className={styles.orderData}>
                    Secondary Screening Count : {primaryCount[0]?.secondaryTarget || 0}{" "}
                  </span>
                </div>
              </Col>
              {/* <Col sm={6} xs={24}>
                <div className={styles.selecttypes}>
                  <span className={styles.orderData}>
                    Pending screening : {(primaryCount[0]?.target - primaryCount[0]?.secondaryTarget) || 0}{" "}
                  </span>
                </div>
              </Col> */}
            </Row>
            {/* search and select rows */}
            <Row>
              <Col sm={17} xs={12} className={styles.slectRows}>
                <SelectRowsPerPage handleCh={handleCh} />
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
              style={{ tableLayout: "auto" }}
              bordered
              columns={columns}
              dataSource={copyOfOriginalTableData}
              pagination={{
                showTotal: (total, range) =>
                  `${range[0]}-${range[1]} of ${total} items`,
                current: currentPage,
                pageSize: rowsPerPage,
                total: copyOfOriginalTableData?.length || 0,
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
