import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  Row,
  Spin,
  Table,
  message,
} from "antd";
import type { ColumnsType, TableProps } from "antd/es/table";
import styles from "./refractionistReports.module.scss";
import classNames from "classnames";
import "./refractionistReports.custom.scss";
import { useNavigate } from "react-router";
import { TitleBarComponent } from "../../../components/common/titleBar";
import { FilterValue, SorterResult } from "antd/es/table/interface";
import { NotificationError } from "../../../components/common/Notifications/Notifications";
import SelectRowsPerPage from "../../../components/common/SelectItems/SelectRowsPerPage";
import { POSTAPIS_WITH_AUTH } from "../../../api/apisSpectacles";
import { ViewTableData } from "../../../components/common/ViewTableData";
import { useTranslation } from "react-i18next";
import { useFetchUserData } from "../../../utilities/userDataHook";
import * as XLSX from "xlsx";

const { Search } = Input;

const { RangePicker } = DatePicker;

interface DataType {
  key: string;
  refractionist_name: string;
  refractionist_mobile: string;
  details: string;
  district: string;
  taluka: string;
  sub_centre: string;
  totalSubmit: string;
  health_facility: string;
  updated_at: string;
}


export const RefractionistReports: React.FC = () => {
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

  /** data */
  const [originalTableData, setOriginalTableData] = useState<DataType[]>([]);
  const [copyOfOriginalTableData, setCopyOfOriginalTableData] = useState<
    DataType[]
  >([]);

  /** Fitler actions */
  const [talukaOption, setTalukaOption] = useState("");
  const [refraType, setRefraTypes] = useState("");
  const [districtOption, setDistrictOption] = useState("");
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


  /* first rendering only  */
  useEffect(() => {
    let body: any = {
        loginType: type,
        codes: codes || [],
        dates: selectedDates,
        isToday: 'Yes'
      };
      (async () => {
      let data = await POSTAPIS_WITH_AUTH("refractionistReports", body, token);
      if (data?.code) {
        setLoading(false);
        setOriginalTableData(data.data);
        setCopyOfOriginalTableData(data.data);
      } else {
        NotificationError(data.message);
      }
      // }
    })();
  }, []);

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
      title: t("TABLE_REFRACTIONIST_MOBILE"),
      dataIndex: "refractionist_mobile",
      key: "refractionist_mobile",
      sorter: (a, b) => a.refractionist_mobile?.length - b.refractionist_mobile?.length,
      sortOrder:
        sortedInfo.columnKey === "refractionist_mobile" ? sortedInfo.order : null,
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
      title: t("PHCO"),
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
    {
      title: t("DATE_TIME"),
      key: "updated_at",
      dataIndex: "updated_at",
      sorter: (a, b) => a.updated_at.length - b.updated_at.length,
      sortOrder: sortedInfo.columnKey === "updated_at" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: t("TOTAL_SUBMIT"),
      key: "totalSubmit",
      dataIndex: "totalSubmit",
      sorter: (a, b) => a.totalSubmit.length - b.totalSubmit.length,
      sortOrder: sortedInfo.columnKey === "totalSubmit" ? sortedInfo.order : null,
      ellipsis: true,
    },
  ];

  const handleCh = (value: string) => {
    setRowsPerPage(Number(value));
  };

  let renderItems = copyOfOriginalTableData.filter((obj) => {
    if (queryString === "") {
      return obj;
    } else {
      return (
        String(obj.refractionist_name)
          .toLowerCase()
          .includes(queryString.toLowerCase()) ||
        String(obj.refractionist_mobile).toLowerCase().includes(queryString.toLowerCase()) ||
        String(obj.district)
          .toLowerCase()
          .includes(queryString.toLowerCase()) ||
        String(obj.details).toLowerCase().includes(queryString.toLowerCase()) ||
        String(obj.taluka).toLowerCase().includes(queryString.toLowerCase()) ||
        String(obj.health_facility)
          .toLowerCase()
          .includes(queryString.toLowerCase()) ||
        String(obj.sub_centre).toLowerCase().includes(queryString.toLowerCase())
      );
    }
  });

  const handleSlickSearchQuery = async (data: any) => {
    setLoading(true);
    let result = await POSTAPIS_WITH_AUTH("searchData", data, token);
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
    XLSX.writeFile(workbook, `Refractionist_${newDate}.xlsx`);
  };

  const onChangeDate = (va: any, da: any) => {
    if (da !== selectedDates) {
      setStatusOption("");
      setSelectedDates(da);
    }
  };
  const handleSearchQuery = async () => {
    let body: any = {
      loginType: type,
      codes: codes,
      dates: selectedDates,
      isToday: ''
    };
    setLoading(true);
    let result = await POSTAPIS_WITH_AUTH("refractionistReports", body, token);
    if (result.code == 200) {
      setOriginalTableData(result.data);
      setCopyOfOriginalTableData(result.data);
    }
    setLoading(false);
  };

  const renderReports = () => {
    return (
      <>
        <TitleBarComponent title={t("REPORTS_LIST")} image={true} />
        <div className={classNames(styles.refractionistReportsTable, "refractionist-report-page-list")}>
          <div className={styles.table}>
          <Row>
              <Col sm={3} xs={24} className={styles.statisticsContainer}>
                <div className={styles.statistics}>
                  <span className={styles.title}>{t("FILTERS")}</span>
                </div>
              </Col>
            </Row>
        <Form>
          <Row className={styles.selectItemsContainer}>
            <Col sm={6} xs={24}>
              <div className={styles.selecttypes}>
                <Form.Item
                  name={"From and To Date"}
                  rules={[{ required: false }]}
                >
                  <RangePicker
                    allowClear
                    format="YYYY-MM-DD"
                    placeholder={["From Date", "To Date"]}
                    onChange={onChangeDate}
                  />
                </Form.Item>
              </div>
            </Col>
            <Col sm={3} xs={24}>
              <div className={styles.selecttypes}>
                <Button
                  disabled={selectedDates[0]?.length == 0}    
                  htmlType="submit"
                  type="primary"
                  onClick={handleSearchQuery}
                >
                  {"Search Query"}
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
          </Row>
        </Form>
            {/* search and select rows */}
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
